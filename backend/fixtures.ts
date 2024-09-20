import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [userOne, userTwo] = await User.create(
    {
      username: 'user1',
      password: 'password1',
    },
    {
      username: 'user2',
      password: 'password2',
    }
  );

  const [postOne, postTwo] = await Post.create(
    {
      title: 'First Post',
      description: 'This is the first post.',
      author: userOne._id,
    },
    {
      title: 'Second Post',
      image: 'fixtures/test.jpg',
      author: userTwo._id,
    }
  );

  await Comment.create(
    {
      post: postOne._id,
      author: userOne._id,
      text: 'Great post!',
    },
    {
      post: postOne._id,
      author: userTwo._id,
      text: 'Thanks for sharing!',
    },
    {
      post: postTwo._id,
      author: userOne._id,
      text: 'Interesting thoughts!',
    },
    {
      post: postTwo._id,
      author: userTwo._id,
      text: 'I completely agree with you!',
    }
  );

  await db.close();
};

run().catch(console.error);
