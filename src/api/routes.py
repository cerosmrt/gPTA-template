"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Artist, Creations, BookData, LineFetched, LineStamped
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from email_sender import send_email

api = Blueprint('api', __name__)

app = Flask(__name__)

# Configure JWT settings (optional)
app.config['JWT_SECRET_KEY'] = 'your_secret_key'


# Initialize JWTManager
jwt = JWTManager(app)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def testing_function():

    response_body = {
        "message": "in the beginning there was the word"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')  
    new_artist = Artist(name=data['name'], email=data['email'], password=hashed_password, is_active=True)
    db.session.add(new_artist)
    db.session.commit()
    return jsonify({"msg": "Artist created"}), 200

@api.route('/login', methods=['POST'])
# @jwt_required()
def login():
    data = request.get_json()
    artist = Artist.query.filter_by(name=data['name']).first()
    if artist and check_password_hash(artist.password, data['password']):
        token = create_access_token(identity=artist.artist_id)
        return jsonify({'token': token}), 200
    return jsonify({'msg': 'Wrong name or password'}), 401

@api.route('/reset-password', methods=['POST'])
def reset_password():
    data=request.get_json()
    artist=Artist.query.filter_by(name=data['name']).first()
    if artist:
        hashed_password = generate_password_hash(data['new_password'], method='sha256')
        artist.password=hashed_password
        db.session.commit()
        return jsonify({'msg': 'Password updated'}), 200
    return jsonify({'msg': 'Artist not found'}), 404 

@api.route('/texts', methods=['POST'])
@jwt_required()
def save_text():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_text = Creations(UserID=user_id, MetaDataUser=data['metadata'], is_public=data.get('is_public', True))
    db.session.add(new_text)
    db.session.commit()
    return jsonify({"message": "Text saved succesfully"}), 201

@api.route('/texts/<int:text_id>', methods=['GET'])
def get_text(text_id):
    text = Creations.query.get_or_404(text_id)
    return jsonify({
        'UserID': text.artist_id,
        'MetaDataUser': text.MetaDataUsed,
        'is_public': text.is_public
    }), 200

@api.route('/compositions', methods=['GET'])
def get_compositions():
    compositions = Creations.query.all()
    return jsonify([{
        'TextCreatedID': text.TextCreatedID,
        'UserID': text.UserID,
        'MetaDataUsed': text.MetaDataUsed,
        'is_public': text.is_public
    } for text in compositions]), 200

@api.route('compositions/<int:text_id>', methods=['GET'])
def get_composition(text_id):
    composition = Creations.query.get_or_404(text_id)
    return jsonify({
        'TextCreatedID': composition.TextCreatedID,
        'UserID': composition.UserID,
        'MetaDataUsed': composition.MetaDataUsed,
        'is_public': composition.is_public
    }), 200

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

@api.route('/user/<int:user_id>/texts', methods=['GET'])
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
    return jsonify({'msg': 'User deleted succesfully'}), 200

@api.route('/text/<int:text_id>', methods=['DELETE'])
@jwt_required()
def delete_text(text_id):
    current_user_id = get_jwt_identity()
    text = Creations.query.get_or_404(text_id)
    if not text:
        return jsonify({'msg': 'Text not found'}), 404
    
    if  text.UserID != current_user_id:
        return jsonify({'msg': 'Unauthorized'}), 403
    
    db.session.delete(text)
    db.session.commit()
    return jsonify({'msg': 'Text deleted succesfully'}), 200

from flask import request, jsonify
from email_sender import send_email

# send email endpoint
@app.route('/send_email', methods=['POST'])
def send_email_handler():
    data = request.get_json()
    to_email = data['to']
    subject = data['subject']
    body = data['body']

    if send_email(to_email, subject, body):
        return jsonify({'message': 'Email sent successfully'}), 200
    else:
        return jsonify({'error': 'Failed to send email'}), 500
