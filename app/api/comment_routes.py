from flask import Blueprint, jsonify, request
# from flask_login import login_required
from app.forms.comment_form import CommentForm
from app.models import Comment, db


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/posts/<int:id>')
def get_comment_by_post_id(id):
    comments = Comment.query.filter(Comment.post_id == id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/posts/<int:id>', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            comment = form.data['comment'],
            user_id = form.data['user_id'],
            post_id = form.data['post_id']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    updated_comment = request.get_json(force=True)
    comment = Comment.query.get(id)
    comment.content = updated_comment['comment']
    db.session.commit()
    return  comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return delete_comment.to_dict()
