import mongoose, {Types} from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    }
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
