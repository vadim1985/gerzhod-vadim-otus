const express = require('express')
const pug = require('pug');
const router = express.Router()
const coursesRepo = require('../../service/courses')


router.get('/', (req, res) => {
  const courses = coursesRepo.findAll()
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/courses.pug', {courses}))
})

module.exports = router