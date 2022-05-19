from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User
# import re

# regex = re.compile(r"([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])")

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_length_s(form, field):
    # Checking if username is already in use
    password = field.data
    if len(password) < 5:
        raise ValidationError('Password must be 5 characters or more long.')
    if len(password) > 15:
        raise ValidationError('Password must be 15 characters or less.')


# def isValid_email(form, field):
#     email = field.data
#     if re.fullmatch(regex, email):
#         return None
#     else:
#         raise ValidationError('Please use a valid email.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[DataRequired(), password_length_s, EqualTo('repeat_password', message="Passwords don't match")])
    repeat_password = StringField('repeat_password', validators=[DataRequired(), password_length_s])
