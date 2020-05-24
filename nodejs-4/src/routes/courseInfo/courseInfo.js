const express = require('express');
const pug = require('pug');
const router = express.Router();
const coursesRepo = require('../../service/courses');
const passport = require('passport')


router.get('/:id',
passport.authenticate('jwt', { session: false }),
async (req, res) => {
  try {
    const course = await coursesRepo.getCourseById(req.params.id);
    res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/courseInfo.pug', { course }));
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.get('/:courseId/lesson/:lessonId', 
passport.authenticate('jwt', { session: false }),
async (req, res) => {
  try {
    const lesson = await coursesRepo.getLessonById(req.params.courseId, req.params.lessonId);
    res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/lesson.pug', { courseId: req.params.courseId, lesson }));
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.put('/:courseId/lesson/', 
passport.authenticate('jwt', { session: false }),
async (req, res) => {
  try {
    const course = await coursesRepo.addLesson(req.params.courseId, req.body);
    res.status(201).send(course);
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

router.post('/:courseId/lesson/:lessonId', 
passport.authenticate('jwt', { session: false }),
async (req, res) => {
  try {
    await coursesRepo.addComment(req.params.courseId, req.params.lessonId, req.body);
    const lesson = await coursesRepo.getLessonById(req.params.courseId, req.params.lessonId);
    res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/lesson.pug', { courseId: req.params.courseId, lesson }));
  } catch (err) {
    res.status(400).send({ error: err.errmsg });
  }
});

module.exports = router;