import express, {NextFunction} from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';
import auth, {RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import {PostMutation} from '../types';

const postsRouter = express.Router();

postsRouter.get('/', auth, async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }
    const posts = await Post.find().populate('author', 'username').sort({createdAt: -1});
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get('/:id', auth, async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});


postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }
    const postData: PostMutation = {
      title: req.body.title,
      description: req.body.description || null,
      image: req.file ? req.file.path : null,
      author: req.user._id.toString(),
    };

    const post = new Post(postData);
    await post.save();

    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default postsRouter;
