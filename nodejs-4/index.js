require('dotenv').config({path: './env/.env.dev'})
const app = require('./src/app');
require('./src/config/mongoConnect');

app.listen(process.env.APP_PORT, () => {
  console.log(`app listening ${process.env.APP_PORT}`);
});