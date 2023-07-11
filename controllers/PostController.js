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

export const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatePost = await postService.update(id, req.body);

    res.json(updatePost);
  } catch (e) {
    next(e);
  }
};
