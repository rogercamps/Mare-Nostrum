from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
# @login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}

# @post_routes.route('/', methods=['POST'])
# # @login_required
# def posts():
#     form =


@post_routes.route('/<int:id>')
# @login_required
def post(id):
    post = Post.query.get(id)
    print('------>>',post.to_dict())
    return post.to_dict()
