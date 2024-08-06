  
import os
from flask_admin import Admin
from .models import db, Artist, Creations, BookData, LineFetched, LineStamped #falta agregar resto de modelos
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the Artist model to the admin
    admin.add_view(ModelView(Artist, db.session))
    admin.add_view(ModelView(Creations, db.session))
    admin.add_view(ModelView(BookData, db.session))
    admin.add_view(ModelView(LineFetched, db.session))
    admin.add_view(ModelView(LineStamped, db.session))
    # agregar resto de modelos

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))