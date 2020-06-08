require('dotenv').config()
const express = require('express');
const cluster = require('cluster');
const app = express();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < process.env.NUM_CPU; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.use("/", express.static('./pages/'));

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/main.html');
  });
  
  app.listen(process.env.PORT, () => console.log('listening on 3000'));
  console.log(`Worker ${process.pid} started`);
}



