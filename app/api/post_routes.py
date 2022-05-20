import datetime
from crypt import methods
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Post, db
from app.forms.add_post_form import AddPost
from app.forms.edit_post_form import EditPost
from app.s3_functions import (upload_file_to_s3, allowed_file, get_unique_filename)
from app.api.auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
# @login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

@post_routes.route('/<int:id>')
# @login_required
def post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('<int:id>', methods=["DELETE"])
def delete_post(id):
    post = db.session.query(Post).filter(Post.id == id).first()
    db.session.delete(post)
    db.session.commit()
    return "Post deleted"

@post_routes.route('/new', methods=['POST'])
# @login_required
def new_post():
    form = AddPost()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # if "image" not in request.files:
        #     return {"errors": ["image required"]}, 400

        image = request.files["image"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]
        post = Post(
            photo_url = url,
            caption = form.caption.data,
            user_id = current_user.id,
            created_at = datetime.datetime.now()
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return  {"errors": validation_errors_to_error_messages(form.errors)},401

@post_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def edit_post(id):
    post = Post.query.get(id)
    form = EditPost()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post.caption = form.data['caption']
        db.session.commit()
        return post.to_dict()
