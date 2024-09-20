import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {selectCurrentPost, selectIsPostsLoading, selectPostsError} from './postsSlice';
import {CircularProgress, Grid, Typography, Card, CardMedia, CardContent, TextField, Button} from '@mui/material';
import {fetchPostById} from './postsThunks';
import {addComment, fetchComments} from '../comments/commentsThunks';
import {selectComments, selectCommentsError, selectIsCommentsLoading} from '../comments/commentsSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSlice';

const PostDetails: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const isPostLoading = useAppSelector(selectIsPostsLoading);
  const postError = useAppSelector(selectPostsError);
  const comments = useAppSelector(selectComments);
  const isCommentsLoading = useSelector(selectIsCommentsLoading);
  const commentsError = useSelector(selectCommentsError);
  const user = useAppSelector(selectUser);

  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    dispatch(addComment({post: id!, text: comment}))
      .then(() => {
        dispatch(fetchComments(id!));
        setComment('');
      });
  };

  if (isPostLoading) {
    return <CircularProgress/>;
  }

  if (postError || !post) {
    return <Typography color="error">Failed to load post.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          {post.image && (
            <CardMedia
              component="img"
              image={`http://localhost:8000/${post.image}`}
              alt={post.title}
              height="300"
            />
          )}
          <CardContent>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body1">{post.description}</Typography>
            <Typography variant="subtitle1">Author: {post.author.username}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Comments</Typography>
        {isCommentsLoading ? (
          <CircularProgress/>
        ) : commentsError ? (
          <Typography color="error">Failed to load comments.</Typography>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <Typography key={comment._id} variant="body2">
              {comment.text} - {comment.author.username}
            </Typography>
          ))
        ) : (
          <Typography variant="body2">No comments yet.</Typography>
        )}
      </Grid>

      {user && (
        <Grid item xs={12}>
          <Typography variant="h6">Add a Comment</Typography>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Grid>
      )}
    </Grid>
  );
};

export default PostDetails;
