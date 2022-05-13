from app.models import db

class Post(db.Model):
  __tablename__ = 'posts'

  id = db.Column(db.Integer,primary_key=True)
  user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
  photo_url = db.Column(db.String(500), nullable=False)
  caption = db.Column(db.String(2200))
  created_at = db.Column(db.DateTime(timezone=True))


  comments = db.relationship('Comment', back_populates='post')
  user = db.relationship('User', back_populates='post')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'photo_url': self.photo_url,
      'caption': self.caption,
      'created_at': self.created_at,
      'user_name': self.user.to_dict(),
    }
