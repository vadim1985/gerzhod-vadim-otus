const express = require('express');
const pug = require('pug');
const router = express.Router();
const userRepo = require('../../service/user');

router.get('/', (req, res) => {
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/auth.pug'));
});

module.exports = router;