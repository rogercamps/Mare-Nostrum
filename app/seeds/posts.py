from app.models import db, Post

# Adds a demo user, you can add other users here if you want
def seed_posts():
    post_1 = Post(
      user_id= 1,
      photo_url='https://i0.heartyhosting.com/www.surfer.com/wp-content/uploads/2019/12/greg-long.jpg?resize=2000%2C1333&ssl=1',
      caption='North Shore action the past week with @rosswilliamshawaii and friends.')

    post_2 = Post(
      user_id= 1,
      photo_url='https://2juqzz48eubg5ceks3aq3tcz-wpengine.netdna-ssl.com/wp-content/uploads/2018/09/surfcamp-costa-rica.jpg',
      caption='Every athlete has one defining moment. Excited to be featured alongside some of the world’s most exceptional athletes in the new seven mini-episode series')

    post_3 = Post(
      user_id= 2,
      photo_url='https://media.cntraveller.com/photos/611bf7a8f902cc2d167b4b8b/1:1/w_1280,h_1280,c_limit/surfing-at-tropicsurf-four-seasons-kuda-huraa-maldives-conde-nast-traveller-14june16-pr.jpg',
      caption='They say you can pick your friends, and you can pick your nose, but you can’t pick your friend’s nose...unless they’re a really good friend. @sunnygarcia...miss you, buddy. It’s been a tough year but here’s to hoping all the stars align and we get you back in the water with us some day soon. ')

    post_4 = Post(
      user_id= 2,
      photo_url='https://s.hdnux.com/photos/01/24/11/42/22059158/6/1200x0.jpg',
      caption="Thank you to the crew at @hbosports and 24/7 for joining me in Hawaii to cover surfing for the first time. I’ve been a huge fan of the show for years. The insights they give to the athletes, especially in the lead up to boxing matches they’ve covered, has been unparalleled. I was rightfully a bit intimidated to do this show for fear of not living up to the comparisons of other shows and sports they’ve done but I couldn’t be happier that we got together and did it, and today we were nominated for 4 Sports Emmy’s...Outstanding Edited Sports Special or Series, Outstanding Camera Work, Outstanding Editing - Long Form, and The Dick Schaap Outstanding Writing Award. Congratulations and thank you to Bentley and her crew. Special thanks to @alekparker for helping on my end with logistics on the ground and at home. Thank you to the crew at @wsl for all their assistance. Also a huge thanks to @terryahue, @fluid_vision, and a bunch of people I’m sure I will remember after I post this for being so gracious and helpful on the north shore during the Triple Crown events. What a blessing it’s been")


    db.session.add(post_1)
    db.session.add(post_2)
    db.session.add(post_3)
    db.session.add(post_4)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
