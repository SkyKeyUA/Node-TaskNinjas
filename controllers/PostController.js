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

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({
        message: 'The article was not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to remove an article',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      nickname: req.body.nickname,
      realName: req.body.realName,
      originDescription: req.body.originDescription,
      superpowers: req.body.superpowers,
      catchPhrase: req.body.catchPhrase,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to create an article',
    });
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
