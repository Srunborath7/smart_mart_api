const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const path = require('path');
const { Server } = require('socket.io');
require('./models/relationships');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require("./routes/brandRoutes");
const chatRoomRoutes = require('./routes/chatRoomRoutes');
const chatRoutes = require('./routes/chatRoutes');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
app.set('io', io);
io.on('connection', (socket) => {

  console.log('User connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

// 🚀 ONLY ONE CORS CONFIG (IMPORTANT)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/chat-rooms', chatRoomRoutes);
app.use('/api/chat', chatRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Food Delivery API Running'
  });
});

module.exports = app;