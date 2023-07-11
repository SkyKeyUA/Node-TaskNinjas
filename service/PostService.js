/** @format */
import { ApiError } from '../exceptions/apiError.js';
import PostModel from '../models/Post.js';
import { PostDto } from '../dtos/postDto.js';

class PostService {
  async getPages(page, limit) {
    const count = await PostModel.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const posts = await PostModel.find()
      .populate('user', '-passwordHash')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (!posts) {
      throw ApiError.BadRequest(`posts not found`);
    }
    return { posts, totalPages, currentPage: page };
  }
  async getOne(id) {
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { $inc: { viewsCount: 1 } },
      { new: true },
    ).populate('user', '-passwordHash');

    if (!post) {
      throw ApiError.BadRequest(`The article was not found`);
    }

    return post;
  }

  async create(postData) {
    const postDto = new PostDto(postData);
    const doc = new PostModel(postDto);

    const post = await doc.save();
    return post;
  }

  async remove(id) {
    const doc = await PostModel.findOneAndDelete({ _id: id });
    if (!doc) {
      throw ApiError.BadRequest(`The article was not found`);
    }

    return { success: true };
  }

  async update(id, updateData) {
    const doc = await PostModel.updateOne({ _id: id }, updateData);
    if (!doc) {
      throw ApiError.BadRequest(`The article was not found`);
    }
    return updateData;
  }
}

const postService = new PostService();

export { postService };
