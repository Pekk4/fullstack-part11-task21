const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');

const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

describe('When creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('password cannot be shorter than 3 characters', async () => {
    const newUser = {
      username: 'Paavo',
      name: 'Pesusieni',
      password: 'sa',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(Object.hasOwn(response.body, 'error'));
  });

  test('three characters long password is accepted', async () => {
    const newUser = {
      username: 'Paavo',
      name: 'Pesusieni',
      password: 'sal',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    assert(Object.hasOwn(response.body, 'username'));
  });

  test('password cannot be empty', async () => {
    const newUser = {
      username: 'Paavo',
      name: 'Pesusieni',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(Object.hasOwn(response.body, 'error'));
  });

  test('username cannot be shorter than 3 characters', async () => {
    const newUser = {
      username: 'Pa',
      name: 'Pesusieni',
      password: 'sal',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(Object.hasOwn(response.body, 'error'));
  });

  test('three characters long username is accepted', async () => {
    const newUser = {
      username: 'Pav',
      name: 'Pesusieni',
      password: 'sal',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.username, newUser.username);
  });

  test('usernames must be unique', async () => {
    const newUser = {
      username: 'Paavo',
      name: 'Pesusieni',
      password: 'salasana666',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(response.body.error.includes('unique'));
  });

  test('username cannot be empty', async () => {
    const newUser = {
      username: '',
      name: 'Pesusieni',
      password: 'salasana666',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    assert(response.body.error.includes('required'));
  });
});

after(async () => {
  await mongoose.connection.close();
});
