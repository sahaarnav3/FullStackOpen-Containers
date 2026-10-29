const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  redis.set("added_todos", todos.length);
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });
  const currentVal = await redis.get("added_todos") || 0;
  redis.set("added_todos", currentVal + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  const status = await Todo.findByIdAndDelete(req.todo._id);
  if(status)
    res.sendStatus(200);
  else
    res.sendStatus(400);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.todo._id, {
    text: req.body.text,
    done: req.body.done
  })
  if (updated) res.sendStatus(200);
  else res.sendStatus(400);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
