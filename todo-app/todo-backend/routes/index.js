const express = require('express');
const redis = require("../redis");
const router = express.Router();
const { Todo } = require("../mongo");

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++
  const response = await Todo.find({});
  redis.set("added_todos", response.length);
  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async(req, res) => {
  const response = await redis.get("added_todos");
  res.status(200).json({ added_todos: response });
})

module.exports = router;
