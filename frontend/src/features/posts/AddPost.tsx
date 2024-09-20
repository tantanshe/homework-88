import React, {useState} from 'react';
import {TextField, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {AppDispatch} from '../../app/store';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addPost} from './postsThunks';
import FileInput from '../../UI/FileInput/FileInput';
import {PostMutation} from '../../types';
import {Navigate} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';

const AddPost = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.title) return;

    dispatch(addPost(state))
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Failed to add post:', error);
      });
  };

  return (
    <>
      {user ? (
        <div>
          <Typography variant="h4">Add New Post</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={state.description}
              onChange={(e) => setState({ ...state, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <FileInput
              onChange={fileInputChangeHandler}
              name="image"
              label="Upload Image"
            />
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};


export default AddPost;
