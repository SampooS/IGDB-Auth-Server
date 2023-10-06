import mongoose from 'mongoose';
import {User} from '../../interfaces/User';

/**
 * Define a Mongoose schema for the "User" model.
 */
const userModel = new mongoose.Schema<User>({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    default: 'https://i.imgur.com/2WZtVXx.png',
  },
  favourite_games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
    },
  ],
});

/**
 * Duplicate the "_id" field as a virtual "id" field.
 */
userModel.virtual('id').get(function () {
  return this._id.toHexString();
});

/**
 * Ensure that virtual fields are serialized in JSON responses.
 */
userModel.set('toJSON', {
  virtuals: true,
});

/**
 * Create a Mongoose model for the "User" schema.
 * This model represents the "User" collection in the database.
 */
export default mongoose.model<User>('User', userModel);
