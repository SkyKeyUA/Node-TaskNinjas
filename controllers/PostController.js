/** @format */
import PostModel from '../models/Post.js';
import { postService } from '../service/postService.js';

export const getPages = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const posts = await postService.getPages(page, limit);
    res.json(posts);
  } catch (e) {
    next(e);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const post = await postService.getOne(id);
    res.json(post);
  } catch (e) {
    next(e);
  }
};

export const create = async (req, res, next) => {
  try {
    const createPost = await postService.create(req.body);

    res.json(createPost);
  } catch (e) {
    next(e);
  }
};

export const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const removePost = await postService.remove(id);
    res.json(removePost);
  } catch (e) {
    next(e);
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.updateOne(
      { _id: postId },
      {
        nickname: req.body.nickname,
        realName: req.body.realName,
        originDescription: req.body.originDescription,
        superpowers: req.body.superpowers,
        catchPhrase: req.body.catchPhrase,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );
    if (!doc) {
      return res.status(404).json({
        message: 'The article was not found',
      });
    }
    res.json({
      seccuss: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update an article',
    });
  }
};
