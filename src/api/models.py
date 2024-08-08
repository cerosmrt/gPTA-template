from datetime import datetime
from flask_sqlalchemy import SQLAlchemy # This is the database object that we will use to interact with the database
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()
    
class Artist(db.Model):
    __tablename__='artists'
    artist_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), index=True, nullable = False)
    email = db.Column(db.String(120), nullable = False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    creations = db.relationship('Creations', backref='artists', lazy=True)

class Creations(db.Model):
    __tablename__ = 'creations'
    creation_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.artist_id'), nullable=False)
    meta_data_used = db.Column(db.String(255), nullable=False)
    is_public = db.Column(db.Boolean, nullable=False)
    lines_stamped = db.relationship('LineStamped', backref='creations', lazy=True)

class BookData(db.Model):
    __tablename__='book_data'
    book_data_id = db.Column(db.Integer, primary_key=True)
    authors = db.Column(db.String(255), nullable = False)
    title = db.Column(db.String(255), nullable = False)
    year = db.Column(db.Integer, nullable = False)
    subjects = db.Column(db.String(255), nullable = False)
    bookshelves = db.Column(db.String(255), nullable = False)
    copyright = db.Column(db.Boolean, nullable = False)
    lines_fetched = db.relationship('LineFetched', backref='book_data', lazy=True)

class TextVoided(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String, nullable=False)

    def __init__(self, text):
        self.text = text

class LineFetched(db.Model):
    __tablename__='line_fetched'
    line_fetched_id = db.Column(db.Integer, primary_key=True)
    book_data_id = db.Column(db.Integer, db.ForeignKey('book_data.book_data_id'), nullable = False)
    excerpt = db.Column(db.Text, nullable = False)
    lines_stamped = db.relationship('LineStamped', backref='line_fetched', lazy=True)

class LineStamped(db.Model):
    __tablename__='line_stamped'
    line_stamped_id = db.Column(db.Integer, primary_key=True)
    creation_id = db.Column(db.Integer, db.ForeignKey('creations.creation_id'), nullable = False)
    line_fetched_id = db.Column(db.Integer, db.ForeignKey('line_fetched.line_fetched_id'), nullable = False)

class Scroll(db.Model):
    __tablename__ = 'scrolls'
    
    id = db.Column(db.Integer, primary_key=True)
    title = Column(Text, nullable=True)  # Optional title
    content = db.Column(db.Text, nullable=False)
    artist_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, content, artist_id, title):
        self.content = content
        self.artist_id = artist_id
        self.title = title
