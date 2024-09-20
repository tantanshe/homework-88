import {createAsyncThunk} from '@reduxjs/toolkit';
import {Comment, CommentMutation} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (postId) => {
    const response = await axiosApi.get(`/comments/${postId}`);
    return response.data;
  }
);

export const addComment = createAsyncThunk<Comment, { postId: string; commentData: CommentMutation }>(
  'comments/createComment',
  async ({postId, commentData}, {getState}) => {
    const state: any = getState();
    const token = state.users.user.token;

    const response = await axiosApi.post(`/comments/${postId}`, commentData, {
      headers: {Authorization: `Bearer ${token}`},
    });

    return response.data;
  }
);