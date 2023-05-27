/** @format */
import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user', '-passwordHash').exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to get articles',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true },
    ).populate('user', '-passwordHash');

    if (!doc) {
      return res.status(404).json({
        message: 'The article was not found',
      });
    }

    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed to get an article',
    });
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
