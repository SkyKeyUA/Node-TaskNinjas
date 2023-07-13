/** @format */
import { ApiError } from '../exceptions/apiError.js';
import PostModel from '../models/Post.js';

class PostService {
  async getPages(page, limit) {
    const count = await PostModel.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const posts = await PostModel.find()
      .populate('user', '-passwordHash')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
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
}

const postService = new PostService();

export { postService };
