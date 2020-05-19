const express = require('express');
const bodyParser = require('body-parser');

require('./config/passport/passport');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', require('./routes/users/user'));
app.use('/auth', require('./routes/auth/auth'));
app.use('/courses', require('./routes/courses/courses'));
app.use('/course', require('./routes/courseInfo/courseInfo'));
app.use('/', require('./routes/root/root'));

module.exports = app;