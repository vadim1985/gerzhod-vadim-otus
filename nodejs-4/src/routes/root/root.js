var express = require('express')
const pug = require('pug');
var router = express.Router()

router.get('/', (req, res) => {
  res.status(200).set('Content-Type', 'text/html').send(pug.renderFile(__dirname + '/view/auth.pug'))
})

module.exports = router