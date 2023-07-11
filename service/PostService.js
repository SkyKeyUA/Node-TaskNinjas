/** @format */
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
}

const postService = new PostService();

export { postService };
