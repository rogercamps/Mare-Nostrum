import datetime
from crypt import methods
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Post, db
from app.forms.add_post_form import AddPost

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
    # print('------>>',post.to_dict())
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
        post = Post(
            photo_url = form.data['photo_url'],
            caption = form.data['caption'],
            user_id = current_user.id,
            created_at=datetime.datetime.now()

            # photo_url = form.photo_url,
            # caption = form.caption,
            # user_id = current_user.id
        )
        db.session.add(post)
        db.session.commit()
        # print(post.to_dict(), '+++++++++++++post route')
        return post.to_dict()
