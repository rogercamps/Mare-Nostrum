from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.comment_form import CommentForm
from app.forms.comment_edit_form import CommentEditForm
from app.models import Comment, db
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>')
def get_comment(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}


@comment_routes.route('/all', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            comment = form.comment.data,
            user_id = form.user_id.data,
            post_id = form.post_id.data
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return  {"errors": validation_errors_to_error_messages(form.errors)},401

@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    form = CommentEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        if comment:
            comment.comment = form.comment.data
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return  {"errors": validation_errors_to_error_messages(form.errors)},401

@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return delete_comment.to_dict()
