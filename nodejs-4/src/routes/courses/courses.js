const express = require('express');
const pug = require('pug');
const router = express.Router();
const coursesRepo = require('../../service/courses');


router.get('/', async (req, res) => {
  const courses = await coursesRepo.findAll();
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/courses.pug', { courses }));
});

router.put('/', async (req, res) => {
  try {
    const course = await coursesRepo.createCourse(req.body);
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.post('/:id', async (req, res) => {
  try {
    const course = await coursesRepo.updateCourse(req.params.id, req.body);
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

module.exports = router;