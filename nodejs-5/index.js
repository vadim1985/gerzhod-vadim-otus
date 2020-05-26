require('dotenv').config();
const position = require('./mongo-connect');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use("/html", express.static('./html/'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', async (socket) => {
  const coordinates = [];
  console.log('user connected');
  socket.on('setPosition', (msg) => {
    coordinates.push([
      msg.position.lat,
      msg.position.lng
    ]);
  });
  socket.on('end', async () => {
    const path = await position.create({
      date: new Date(),
      location: {
        type: "Point",
        coordinates
      }
    });
    socket.emit('pathReady', { path });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on 3000');
});