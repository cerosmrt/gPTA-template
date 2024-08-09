"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints.
"""

import re 
import json
from flask import Flask, request, jsonify, Blueprint, render_template_string
from api.models import db, Artist, Creations, BookData, TextVoided, LineStamped, LineFetched, Scroll
from api.utils import APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import random
from api.email_sender import send_email
from api.save_text_to_file import save_text_to_file

# Create a blueprint named 'api'
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Define a simple test route
@api.route('/', methods=['POST', 'GET'])
def testing_function():
    response_body = {
        "message": "In the end..."
    }
    return jsonify(response_body), 200

# Define the register route
@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    # Validate the data
    if not email or not name or not password:
        return jsonify({'msg': 'All fields are required'}), 400
    
    # Check if email already exists
    if Artist.query.filter_by(email=email).first():
        return jsonify({'msg': 'Email already exists'}), 400
    
    #Hash the password
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    # Create a new artist and save to database
    new_artist = Artist(name=data['name'], email=data['email'], password=hashed_password, is_active=True)
    db.session.add(new_artist)
    db.session.commit()
    
    return jsonify({"msg": "Artist created"}), 200

# Define the login route
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'msg': 'All fields are required'}), 400
    artist = Artist.query.filter_by(email=data['email']).first()
    # artist = Artist.query.get(email=data['email']).first()
    print(artist)
    if artist:
        # Compare the provided password with the stored password
        if check_password_hash(artist.password, data['password']):
            token = create_access_token(identity=artist.artist_id)
            # Log the artist's ID, name, and token
            print(f"Artist ID: {artist.artist_id}, Name: {artist.name}, Token: {token}")
            return jsonify({'token': token, 'name': artist.name, 'artist_id': artist.artist_id}), 200

    return jsonify({'msg': 'Wrong name or password'}), 401

# Define the reset-password route
@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('new_password')

    artist = Artist.query.filter_by(email=data['email']).first()
    if artist:
        hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256')
        artist.password = hashed_password
        db.session.commit()
        return jsonify({'msg': 'Password updated'}), 200
    return jsonify({'msg': 'Artist not found'}), 404

# Define the save_text route (saving new content created by the user)
@api.route('/texts', methods=['POST'])
@jwt_required()
def save_text():
    data = request.get_json()
    user_id = get_jwt_identity()
    print(f"User ID: {user_id}")
    print(f"Data: {data}")
    new_text = Creations(artist_id=user_id, MetaDataUser=data['metadata'], is_public=data.get('is_public', True))
    db.session.add(new_text)
    db.session.commit()
    print("Text saved successfully")
    return jsonify({"message": "Text saved successfully"}), 201

# Define the get_text route
@api.route('/texts/<int:text_id>', methods=['GET'])
def get_text(text_id):
    text = Creations.query.get_or_404(text_id)
    return jsonify({
        'artist_id': text.artist_id,
        'MetaDataUser': text.MetaDataUsed,
        'is_public': text.is_public
    }), 200


# Define the get_books route
@api.route('/books', methods=['GET'])
def get_books():
    books = BookData.query.all()
    return jsonify([{
        'BookDataID': book.BookDataID,
        'Authors': book.Authors,
        'Title': book.Title,
        'Year': book.Year,
        'Subjects': book.Subjects,
        'Bookshelves': book.Bookshelves,
    } for book in books]), 200

# Define the get_book route
@api.route('/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = BookData.query.get_or_404(book_id)
    return jsonify({
        'BookDataID': book.BookDataID,
        'Authors': book.Authors,
        'Title': book.Title,
        'Year': book.Year,
        'Subjects': book.Subjects,
        'Bookshelves': book.Bookshelves,
    }), 200

# Define the delete_user route
@api.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user_id = get_jwt_identity()
    user = Artist.query.get_or_404(user_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    
    if current_user_id != user_id:
        return jsonify({'msg': 'Unauthorized'}), 401
    
    db.session.delete(user)
    db.session.commit()
    return jsonify({'msg': 'User deleted successfully'}), 200

# Define the delete_text route with a DELETE method and a text_id parameter
@api.route('/text/<int:text_id>', methods=['DELETE'])
@jwt_required()  # Ensure that the user is authenticated with a valid JWT token
def delete_text(text_id):
    # Get the user ID from the JWT token
    current_user_id = get_jwt_identity()
    
    # Retrieve the text entry from the database using the provided text_id
    text = Creations.query.get_or_404(text_id)
    
    # Check if the text entry exists
    if not text:
        # Return a 404 error if the text is not found
        return jsonify({'msg': 'Text not found'}), 404
    
    # Check if the current user is authorized to delete the text
    if text.artist_id != current_user_id:
        # Return a 403 error if the user is not authorized
        return jsonify({'msg': 'Unauthorized'}), 403
    
    # Delete the text entry from the database
    db.session.delete(text)
    
    # Commit the transaction to save changes
    db.session.commit()
    
    # Return a success message indicating the text was deleted
    return jsonify({'msg': 'Text deleted successfully'}), 200

# send_email route/"error": "Failed to send email"
@api.route('/send_email', methods=['POST'])
def send_email_handler():
    data = request.get_json()
    to_email = data['to']
    subject = data['subject']
    body = data['body']

    if send_email(to_email, subject, body):
        return jsonify({'message': 'Email sent successfully'}), 200
    else:
        return jsonify({'error': 'Failed to send email'}), 500

# random-paragraph route/tested on postman
@api.route('/random-paragraph', methods=['GET'])
def random_paragraph():
    min_id = 1
    max_id = 68560

    # Generate a random ID within the specified range
    random_id = random.randint(min_id, max_id)

    # Format the URL with the randomly chosen ID
    url = f"https://www.gutenberg.org/cache/epub/{random_id}/pg{random_id}-images.html"

    # Send GET request
    response = requests.get(url)

    # Check if request was successful
    if response.status_code == 200:
        # Parse HTML content
        html_content = response.content
        soup = BeautifulSoup(html_content, 'html.parser')

        # Extract all <p> tags
        paragraphs = soup.find_all('p')
        # seleccionar parrafo de mas de tantos caracteres y menos de tantos caracteres
        # Select a random <p> tag
        if paragraphs:
            random_paragraph = random.choice(paragraphs).text
            print(random_paragraph)
            # return render_template_string('<p>{{ paragraph }}</p>', paragraph=random_paragraph)
            return random_paragraph
        else:
            return "No <p> tags found."
    else:
        return f"Failed to retrieve HTML. Status code: {response.status_code}"

# Simulated database for stored lines
stored_lines = []

# Process the text here (e.g., save to database, perform operations)
def save_text_to_db(text):
    new_entry = TextVoided(text=text)  # Create a new model instance with the text
    db.session.add(new_entry)  # Add the instance to the session
    db.session.commit()  # Commit the session to save the instance to the database
    stored_lines.append({"text": text})  # Add the text to the simulated database

# submit-text route/tested on postman
@api.route('/voided-lines', methods=['POST'])
def void_new_lines():
    data = request.get_json()
    text = data.get('text')
        
    save_text_to_db(text) # function to save text to the database

    return jsonify({"message": "Text received", "text": text}), 200

@api.route('/voided-lines', methods=['GET'])
def get_voided_lines():
    return jsonify(stored_lines), 200


# Define the fetch_user_details route
@api.route('/user', methods=['GET'])
@jwt_required()  # Ensure that the user is authenticated with a valid JWT token
def fetch_user_details():
    # Get the user ID from the JWT token
    user_id = get_jwt_identity()
    
    # Retrieve the user details from the database using the user ID
    user = Artist.query.get_or_404(user_id)
    
    # Check if the user exists
    if not user:
        # Return a 404 error if the user is not found
        return jsonify({'msg': 'User not found'}), 404
    
    # Return the user details as a JSON response
    return jsonify({
        'name': user.name,
        'email': user.email,
        'is_active': user.is_active
    }), 200

# Define the get_compositions route
@api.route('/compositions', methods=['GET'])
@jwt_required()
def get_compositions():
    artist_id = get_jwt_identity()
    compositions = Creations.query.filter_by(artist_id=artist_id).all()
    return jsonify([{
        'id': comp.id,
        'title': comp.title,
        'content': comp.content
    } for comp in compositions]), 200

# Define the get_composition route (to retrieve a single artist composition)
@api.route('/compositions/<int:composition_id>', methods=['GET'])
@jwt_required()
def get_composition(composition_id):
    artist_id = get_jwt_identity()
    composition = Creations.query.filter_by(id=composition_id, artist_id=artist_id).first()
    if composition:
        return jsonify({
            'id': composition.id,
            'title': composition.title,
            'content': composition.content
        }), 200
    return jsonify({'msg': 'Composition not found'}), 404

# Define the create_composition route (to save a new composition)
@api.route('/compositions', methods=['POST'])
@jwt_required()
def create_composition():
    data = request.get_json()
    artist_id = get_jwt_identity()
    new_composition = Creations(
        title=data['title'],
        content=data['content'],
        artist_id=artist_id
    )
    db.session.add(new_composition)
    db.session.commit()
    return jsonify({'msg': 'Composition created successfully'}), 201

# Define the update_composition route (to update an existing composition)
@api.route('/compositions/<int:composition_id>', methods=['PUT'])
@jwt_required()
def update_composition(composition_id):
    data = request.get_json()
    artist_id = get_jwt_identity()
    composition = Creations.query.filter_by(id=composition_id, artist_id=artist_id).first()
    if composition:
        composition.title = data['title']
        composition.content = data['content']
        db.session.commit()
        return jsonify({'msg': 'Composition updated successfully'}), 200
    return jsonify({'msg': 'Composition not found'}), 404

# Define the delete_composition route (to delete an existing composition)
@api.route('/compositions/<int:composition_id>', methods=['DELETE'])
@jwt_required()
def delete_composition(composition_id):
    artist_id = get_jwt_identity()
    composition = Creations.query.filter_by(id=composition_id, artist_id=artist_id).first()
    if composition:
        db.session.delete(composition)
        db.session.commit()
        return jsonify({'msg': 'Composition deleted successfully'}), 200
    return jsonify({'msg': 'Composition not found'}), 404

def format_editor_state(editor_state):
    # Use regular expression to replace the HTML tags
    formatted_content = re.sub(r'<p class="ql-align-center">\s*(.*?)\s*</p>', r'\1.', editor_state).strip()
    return formatted_content

@api.route('/<int:artist_id>/chest/scrolls', methods=['POST'])
@jwt_required()
def create_scroll(artist_id):
    data = request.get_json()
    if not data or not data.get('content'): 
        return jsonify({'msg': 'Missing data'}), 400
    
    content = data.get('content')
    if not content: 
        return jsonify({'msg': 'Content required'}), 400
    
    # Format the content
    formatted_content = format_editor_state(content)
    
    # Get artist_id from JWT if it's not passed in the URL (optional, based on your design)
    jwt_artist_id = get_jwt_identity()
    if artist_id != jwt_artist_id:
        return jsonify({'msg': 'Artist ID mismatch'}), 403

    new_scroll = Scroll(
        content=formatted_content,
        artist_id=artist_id,
        title="0"
    )
    db.session.add(new_scroll)
    db.session.commit()
    return jsonify({'msg': 'Scroll created successfully', 'scroll_id': new_scroll.id}), 201

@api.route('/<int:artist_id>/chest/scrolls', methods=['GET'])  # Define the route for GET requests to fetch scrolls for a specific artist
@jwt_required()  # Require a valid JWT token to access this endpoint
def get_scrolls(artist_id):
    jwt_artist_id = get_jwt_identity()  # Get the artist ID from the JWT token
    if artist_id != jwt_artist_id:  # Check if the artist ID from the URL matches the JWT artist ID
        return jsonify({'msg': 'Artist ID mismatch'}), 403  # Return an error if IDs do not match

    scrolls = Scroll.query.filter_by(artist_id=artist_id).all()  # Query the database to get all scrolls for the specified artist ID
    scrolls_data = [{'id': scroll.id, 'content': scroll.content, 'title': scroll.title} for scroll in scrolls]  # Format scrolls data into a list of dictionaries

    return jsonify(scrolls_data), 200  # Return the formatted scrolls data as JSON with a 200 OK status


# @api.route('/artist/chest/scrolls/<int:scroll_id>', methods=['PUT'])
