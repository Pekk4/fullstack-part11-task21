const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (_, response) => {
  const fields = { username: 1, name: 1, id: 1 };
  const blogs = await Blog.find({}).populate('user', fields);

  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;

  if (!request.user) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(request.user);

  if (!user) {
    return response.status(401).json({ error: 'invalid token or user not found' });
  }

  body.user = user._id;

  const blog = new Blog(body);
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (!user || blog.user.toString() !== user) {
    return response.status(401).json({ error: 'invalid token' });
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const fields = { username: 1, name: 1, id: 1 };
  const res = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', fields);

  response.json(res);
});

module.exports = blogsRouter;
