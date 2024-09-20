import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { fetchPosts, fetchPostById, addPost } from './postsThunks';

interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  isLoading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addPost.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectPosts = (state: { posts: PostsState }) => state.posts.posts;
export const selectCurrentPost = (state: { posts: PostsState }) => state.posts.currentPost;
export const selectIsPostsLoading = (state: { posts: PostsState }) => state.posts.isLoading;
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error;

export const postsReducer = postsSlice.reducer;