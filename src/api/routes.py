"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TextCreated, BookData, LineFetched, LineStamped
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "in the beginning there was the word"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')  
    new_user = User(Username=data['Username'], Email=data['Email'], password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 200

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(Username=data['Username']).first()
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.UserID)
        return jsonify({'token': token}), 200
    return jsonify({'msg': 'Bad username or password'}), 401

@api.route('/reset-password', methods=['POST'])
def reset_password():
    data=request.get_json()
    user=User.query.filter_by(Username=data['Username']).first()
    if user:
        hashed_password = generate_password_hash(data['new_password'], method='sha256')
        user.password=hashed_password
        db.session.commit()
        return jsonify({'msg': 'Password updated'}), 200
    return jsonify({'msg': 'User not found'}), 404 

@api.route('/texts', methods=['POST'])
@jwt_required()
def save_text():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_text = TextCreated(UserID=user_id, MetaDataUser=data['metadata'], is_public=data.get('is_public', True))
    db.session.add(new_text)
    db.session.commit()
    return jsonify({"message": "Text saved succesfully"}), 201

@api.route('/texts/<int:text_id>', methods=['GET'])
def get_text(text_id):
    text = TextCreated.query.get_or_404(text_id)
    return jsonify({
        'UserID': text.UserID,
        'MetaDataUser': text.MetaDataUsed,
        'is_public': text.is_public
    }), 200

@api.route('/compositions', methods=['GET'])
def get_compositions():
    compositions = TextCreated.query.all()
    return jsonify([{
        'TextCreatedID': text.TextCreatedID,
        'UserID': text.UserID,
        'MetaDataUsed': text.MetaDataUsed,
        'is_public': text.is_public
    } for text in compositions]), 200

@api.route('compositions/<int:text_id>', methods=['GET'])
def get_composition(text_id):
    composition = TextCreated.query.get_or_404(text_id)
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
    user = User.query.get_or_404(user_id)
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
    text = TextCreated.query.get_or_404(text_id)
    if not text:
        return jsonify({'msg': 'Text not found'}), 404
    
    if  text.UserID != current_user_id:
        return jsonify({'msg': 'Unauthorized'}), 403
    
    db.session.delete(text)
    db.session.commit()
    return jsonify({'msg': 'Text deleted succesfully'}), 200

# # Create a URL route in our application for "/"
# @app.route('/users/<user_id>', methods=['GET', 'POST', 'DELETE'])
# def user(user_id):
#     if request.method == 'GET':
#         """return the information of user"""
#         userId = request.args.get('user_id')
#     elif request.method == 'POST':
#         """modify/update the information for <user_id>"""
#         data = request.form  # a multidict containing POST data
#     elif request.method == 'DELETE':
#         """delete user with ID <user_id>"""
#         userId = request.args.get('user_id')
#     else:
#         # Error 405 Method Not Allowed
#         pass

app = Flask(__name__)