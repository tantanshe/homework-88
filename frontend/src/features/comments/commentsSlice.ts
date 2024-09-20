import {createSlice} from '@reduxjs/toolkit';
import {Comment} from '../../types';
import {fetchComments, addComment} from './commentsThunks';

interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectComments = (state: { comments: CommentsState }) => state.comments.comments;
export const selectIsCommentsLoading = (state: { comments: CommentsState }) => state.comments.isLoading;
export const selectCommentsError = (state: { comments: CommentsState }) => state.comments.error;

export const commentsReducer = commentsSlice.reducer;