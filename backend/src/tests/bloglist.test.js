const { test, describe } = require('node:test');
const assert = require('node:assert');
const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];
const listWithOneBlog = [...blogs.slice(0, 1)];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, listWithOneBlog[0].likes);
  });

  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test('of a bigger list is computed right', () => {
    const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0);
    assert.strictEqual(listHelper.totalLikes(blogs), totalLikes);
  });
});

describe('Most likes', () => {
  test('of a bigger list is computed right', () => {
    const mostLikes = listHelper.favoriteBlog(blogs);
    assert.strictEqual(mostLikes.likes, 12);
  });

  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.strictEqual(result.likes, 7);
  });
});

describe('Most blogs', () => {
  test('of a bigger list is computed right', () => {
    const mostBlogs = listHelper.mostBlogs(blogs);
    assert.strictEqual(mostBlogs.blogs, 3);
  });

  test('of a list with only one blog is computed right', () => {
    const mostBlogs = listHelper.mostBlogs(listWithOneBlog);
    assert.strictEqual(mostBlogs.blogs, 1);
  });
});

describe('Most likes', () => {
  test('of a bigger list is computed right', () => {
    const mostLikes = listHelper.mostLikes(blogs);
    assert.strictEqual(mostLikes.likes, 17);
  });

  test('of a list with only one author is computed right', () => {
    const newBlogs = [...blogs.slice(3, 6)];

    const mostLikes = listHelper.mostLikes(newBlogs);
    assert.strictEqual(mostLikes.likes, 12);
  });

  test('of a list with only one blog is computed right', () => {
    const mostLikes = listHelper.mostLikes(listWithOneBlog);
    assert.strictEqual(mostLikes.likes, 7);
  });
});
