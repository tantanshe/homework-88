import express, {NextFunction} from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment';
import Post from '../models/Post';
import auth, {RequestWithUser} from '../middleware/auth';
import {CommentMutation} from '../types';

const commentsRouter = express.Router();

commentsRouter.get('/:postId', auth, async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found'});
    }
    const comments = await Comment.find({post: req.params.postId}).populate('author', 'username').sort({createdAt: -1});
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post('/:postId', auth, async (req: RequestWithUser, res, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'User not found.'});
    }

    const {text} = req.body;
    if (!text) {
      return res.status(400).send('Comment text is required');
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send('Post not found');
    }

    const commentData: CommentMutation = {
      post: req.params.postId,
      author: req.user._id.toString(),
      text,
    };

    const comment = new Comment(commentData);
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default commentsRouter;
