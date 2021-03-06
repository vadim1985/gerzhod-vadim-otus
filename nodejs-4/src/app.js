const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

require('./config/passport/passport');
require('../src/bootstrap')
const app = express();

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', require('./routes/users/user'));
app.use('/auth', require('./routes/auth/auth'));
app.use('/courses', require('./routes/courses/courses'));
app.use('/course', require('./routes/courseInfo/courseInfo'));
app.use('/', require('./routes/root/root'));

module.exports = app;