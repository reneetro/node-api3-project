const User = require('../users/users-model');
const Post = require('../posts/posts-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  let timestamp = new Date().getTime()
  console.log(req.method, req.url, timestamp)
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  User.getById(req.params.id)
    .then(user => {
      if(user == null){
        res.status(404).json({ message: 'user not found' });
        return;
      }
      req.user = user;

      next();
    })
    .catch(error => next(error));
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  let { name } = req.body;
  if (typeof name !== 'string' || name.trim() === '') {
    next({ status: 400, message: 'missing required name field' });
    return;
  }
  
  req.user = { name: name.trim() };

  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  let { text } = req.body;
  if (typeof text !== 'string' || text.trim() === '') {
    next({ status: 400, message: 'missing required text field' });
    return;
  }
  
  req.user = { text: text.trim() };

  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}