import {createAsyncThunk} from '@reduxjs/toolkit';
import {Post, PostMutation} from '../../types';
import axiosApi from '../../axiosApi';


export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const response = await axiosApi.get('/posts');
    return response.data;
  }
);

export const fetchPostById = createAsyncThunk<Post, string>('posts/fetchPostById', async (postId) => {
  const response = await axiosApi.get(`/posts/${postId}`);
  return response.data;
});

export const addPost = createAsyncThunk<Post, PostMutation>(
  'posts/createPost',
  async (postData, { getState }) => {
    const state: any = getState();
    const token = state.users.user.token;

    const formData = new FormData();
    formData.append('title', postData.title);
    if (postData.description) formData.append('description', postData.description);
    if (postData.image) formData.append('image', postData.image);

    const response = await axiosApi.post('/posts', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
);