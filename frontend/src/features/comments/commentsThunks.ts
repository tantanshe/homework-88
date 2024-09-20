import {createAsyncThunk} from '@reduxjs/toolkit';
import {Comment} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (postId) => {
    const response = await axiosApi.get(`/comments/${postId}`);
    return response.data;
  }
);

export const addComment = createAsyncThunk<Comment, { post: string; text: string }>(
  'comments/createComment',
  async ({post, text}, {getState}) => {
    const state: any = getState();
    const token = state.users.user.token;

    const response = await axiosApi.post(`/comments/${post}`, {text}, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  }
);