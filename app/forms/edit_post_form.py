import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, DateField, BooleanField, SelectField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post

class EditPost(FlaskForm):
  user_id = IntegerField("user_id")
  caption = StringField("caption")
  # created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
