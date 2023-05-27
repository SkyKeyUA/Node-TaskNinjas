/** @format */

import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      require: true,
      unique: true,
    },
    realName: {
      type: String,
      require: true,
    },
    originDescription: {
      type: String,
      require: true,
    },
    superpowers: {
      type: String,
      require: true,
    },
    catchPhrase: {
      type: String,
      require: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);
