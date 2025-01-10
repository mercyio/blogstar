const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const { clearHash } = require('../services/cache');
const cleanCache = require('../middlewares/cleanCache');

const Blog = mongoose.model('Blog');


module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id })
      // .cache({ key: req.user.id });

    res.send(blogs);
  })

  // app.get('/api/blogs', requireLogin, async (req, res) => {
  //   const redis = require('redis');
  //   const redisUrl = 'redis://127.0.0.1:6379';
  //   const client = redis.createClient(redisUrl);
  //   const util = require('util')
  //   //  promisify : we can pass it into another function and it will return a new function

  //    // so we promisify the client.get function to return a new function instead of using the callback function method

  //   client.get = util.promisify(client.get);
    

  //   // check if we cached data in redis related to this query. if yes, then response to this request immediately
  //   const cacheBlog =  await client.get(req.user.id);

   
  //   // if no we need to respond to request and update our cache to store the data
  //   if (cacheBlog) {
  //     console.log('serving from cache')
  //     return res.send(JSON.parse(cacheBlog));
  //   }

  //   const blogs = await Blog.find({ _user: req.user.id });
  //   console.log('serving from mongodb')
  //   res.send(blogs);

  //   client.set(req.user.id,JSON.stringify(blogs));
  // });

  app.post('/api/blogs', requireLogin, cleanCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }

    // clearHash(req.user.id)
  });
};



