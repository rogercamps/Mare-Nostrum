import datetime
from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField, DateField, BooleanField, SelectField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Post


class AddPost(FlaskForm):
  user_id = IntegerField("user_id")
  photo_url = StringField("photo_url")
  caption = StringField("caption")
  # created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)



# fetch(`/api/posts/new`, {
#     method: "POST",
#     headers: {
#       'Accept': 'application/json',
#       "Content-Type": "application/json",
#     },
#     body: {
#         photo_url: 'https://coresites-cdn-adm.imgix.net/surfeurope_new/wp-content/uploads/2015/06/greg-noll-changed-4.jpg?fit=crop',
#         caption: 'jdsfjldsfldsjfdslfjdslkf',

#     }
#   })
