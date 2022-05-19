from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CommentEditForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired(message = 'Please provide a comment')])
