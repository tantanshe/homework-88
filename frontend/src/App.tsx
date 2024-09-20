import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import HomePage from './features/posts/HomePage';
import AddPost from './features/posts/AddPost';
import PostDetails from './features/posts/PostDetails';

function App() {

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="lg" component="main">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/posts/addPost" element={<AddPost/>}/>
          <Route path="/posts/:id" element={<PostDetails/>} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
