import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectPosts, selectIsPostsLoading, selectPostsError} from './postsSlice';
import {AppDispatch} from '../../app/store';
import {Link} from 'react-router-dom';
import {CircularProgress, Grid, Typography, Card, CardContent, CardMedia} from '@mui/material';
import {fetchPosts} from './postsThunks';
import DescriptionIcon from '@mui/icons-material/Description';
import dayjs from 'dayjs';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return <CircularProgress/>;
  }

  if (error) {
    return <Typography color="error">Failed to load posts.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Posts</Typography>
      </Grid>
      {posts.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" color="textSecondary">
            No posts yet.
          </Typography>
        </Grid>
      ) : (
        posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              <CardContent>
                {post.image ? (
                  <CardMedia
                    component="img"
                    height="300"
                    image={`http://localhost:8000/${post.image}`}
                    alt={post.title}
                    style={{objectFit: 'cover'}}
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary" style={{textAlign: 'center'}}>
                    <DescriptionIcon style={{fontSize: '48px'}}/>
                  </Typography>
                )}
                <Typography variant="h6">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post.author.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(post.createdAt).format('MMMM D, YYYY')}
                </Typography>
                <Typography variant="body2">{post.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default HomePage;
