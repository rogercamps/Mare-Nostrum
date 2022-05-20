import datetime
from tokenize import Imagnumber
from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, DateField, DateTimeField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post
import datetime

class AddPost(FlaskForm):
  image = StringField("image", validators=[DataRequired(message= '- Must provide an image')])
  caption = StringField("caption", validators=[DataRequired('- This field is required')])
  created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
