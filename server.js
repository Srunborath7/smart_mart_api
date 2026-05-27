require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');

const app = require('./src/app');
const sequelize = require('./src/config/db');

const server = http.createServer(app);

/**
 * SOCKET.IO MUST BE ATTACHED HERE
 */
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

/**
 * SOCKET EVENTS
 */
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log("DB synced");

    server.listen(PORT, () => {
      console.log(`Server running on http://127.0.0.1:${PORT}`);
    });

  })
  .catch(err => {
    console.log("DB error:", err);
  });