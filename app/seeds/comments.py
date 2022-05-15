from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment_1 = Comment(
        user_id= 1,
        post_id= 2,
        comment = "Remind us to never answer Dwight's knock knock jokes.")
    comment_2 = Comment(
        user_id= 1,
        post_id= 2,
        comment = "Remind us to never answer Dwight's knock knock jokes.")
    comment_3 = Comment(
        user_id= 1,
        post_id= 3,
        comment = "Remind us to never answer Dwight's knock knock jokes.")
    comment_4 = Comment(
        user_id= 1,
        post_id= 3,
        comment = "Remind us to never answer Dwight's knock knock jokes.")
    comment_5 = Comment(
        user_id= 1,
        post_id= 2,
        comment = "Remind us to never answer Dwight's knock knock jokes.")
    comment_6 = Comment(
        user_id= 1,
        post_id= 4,
        comment = "Remind us to never answer Dwight's knock knock jokes.")
    comment_7 = Comment(
        user_id= 2,
        post_id= 3,
        comment = "user 2 Remind us to never answer Dwight's knock knock jokes.")
    comment_8 = Comment(
        user_id= 2,
        post_id= 3,
        comment = "Remind user 2 us to never answer Dwight's knock knock jokes.")
    comment_9 = Comment(
        user_id= 2,
        post_id= 4,
        comment = "Remind us user 2 to never answer Dwight's knock knock jokes.")


    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
