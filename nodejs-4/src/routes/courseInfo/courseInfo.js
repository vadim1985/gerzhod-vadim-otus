const express = require('express')
const pug = require('pug');
const router = express.Router()
const coursesRepo = require('../../service/courses')


router.get('/:id', (req, res) => {
  const course = coursesRepo.getCourseById(+req.params.id)
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/courseInfo.pug', {course}))
})

router.get('/:courseId/:lessonId', (req, res) => {
  const lesson = coursesRepo.getLessonById(+req.params.courseId, +req.params.lessonId)
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/lesson.pug', {courseId: req.params.courseId, lesson}))
})

router.post('/:courseId/:lessonId', (req, res) => {
  const lesson = coursesRepo.getLessonById(+req.params.courseId, +req.params.lessonId)
  lesson.comment=req.body.comment
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/lesson.pug', {courseId: req.params.courseId, lesson}))
})

module.exports = router