const express = require('express')
const pug = require('pug');
const router = express.Router()
const coursesRepo = require('../../service/courses')


router.get('/:courseId/:lessonId', (req, res) => {
  console.log(+req.params.courseId)
  console.log(+req.params.lessonId)
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/lesson.pug', {course}))
})

module.exports = router