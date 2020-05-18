const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/',
  passport.authenticate('local', { session: false, failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.SECRET_KEY, { expiresIn: '10 days' });
    res.send({ token });
  });

module.exports = router;