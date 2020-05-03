var express = require('express')
var router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body.username)
  console.log(req.body.password)
  res.send({token: 'aksldjlkasd'})
})

module.exports = router