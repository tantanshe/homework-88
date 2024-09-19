import {ObjectId} from 'mongoose';

export interface UserFields {
  _id: ObjectId;
  username: string;
  password: string;
  token: string;
}
export interface PostMutation {
  title: string;
  description?: string | null;
  image?: string | null;
  author: string;
}

export interface CommentMutation {
  post: string;
  author: string;
  text: string;
}