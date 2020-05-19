const express = require('express');
const pug = require('pug');
const router = express.Router();
const userRepo = require('../../service/user');

router.put('/', async (req, res) => {
  try {
    const { _id } = await userRepo.create(req.body);
    res.status(200).send({ id: _id });
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userRepo.findAll();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userRepo.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const user = await userRepo.updateUser(req.params.id, req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

module.exports = router;