export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Post {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  author: User;
  createdAt: string;
}

export interface Comment {
  _id: string;
  postId: string;
  author: User;
  text: string;
  createdAt: string;
}


export interface PostMutation {
  title: string;
  description?: string;
  image?: File | null;
}

export interface CommentMutation {
  postId: string;
  text: string;
}