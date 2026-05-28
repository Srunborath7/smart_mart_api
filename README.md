# 🛒 SmartMart API

SmartMart API is a backend system for a **Smart Mart / POS + Inventory + Real-time Chat + Telegram Notification system** built with Node.js, Express, Sequelize, Socket.io, and Telegram Bot API.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL / PostgreSQL
- Socket.io (Real-time communication)
- Telegram Bot API
- REST API

---

## ✨ Features

### 🔐 Authentication
- User login & register
- JWT authentication (optional)
- Role-based access control (Admin / Staff / Driver)

---

### 📦 Inventory System
- Product management (CRUD)
- Category & Brand system
- Stock IN / OUT tracking
- Inventory update on order

---

### 🧾 POS / Order System
- Create orders
- Order items management
- Payment processing (cash)
- Invoice generation (optional)

---

### 💬 Real-time Chat System
- Socket.io chat (live messaging)
- Room-based chat system
- Admin ↔ Driver communication
- Message stored in database
- Real-time message broadcast

---

### 🔔 Telegram Bot Notification
Automatically sends Telegram messages when:
- New chat message created
- New order placed
- Driver notification sent

---

## 🤖 Telegram Bot Example

💬 NEW MESSAGE

💬 NEW MESSAGE

👤 Admin  
🛡 ADMIN  

💬 Hello driver, please pick up order #1001  

---

## 🔄 System Flow

Frontend → API → Database → Socket.io → Telegram Bot → User Notification  

---

## 📡 API Endpoints

### 💬 Chat API

#### Get Messages by Room

GET /api/chat?room_id=ROOM_ID


#### Send Message

POST /api/chat


### Request Body
```json
{
  "room_id": "70007cca-ed6a-46cf-9c38-45b78fabfeed",
  "sender_name": "Admin",
  "sender_role": "ADMIN",
  "message": "Hello driver, please pick up order #1001"
}
```
--
#### Chat Rooms

Get All Rooms
```
GET /api/chat-rooms
```
Create Room
```
POST /api/chat-rooms
```
⚡ Socket.io Events
Join Room
```
socket.emit("joinRoom", roomId);
Send Message
socket.emit("sendMessage", {
  room_id,
  sender_name,
  sender_role,
  message
});
```
Receive Message
```
socket.on("receiveMessage", (data) => {
  console.log(data);
});
```
🏗 Project Structure
```
smart_mart_api/
```
```
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── user.js
│   │   ├── message.js
│   │   ├── chatRoom.js
│   │
│   ├── controllers/
│   │   └── chatController.js
│   │
│   ├── services/
│   │   └── chatService.js
│   │
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   ├── chatRoomRoutes.js
│   │
│   ├── utils/
│   │   └── telegram.js
│   │
│   ├── app.js
│
├── server.js
├── package.json
├── .env
```
 ---
 ## 🔔 Telegram Bot Setup

1. Create Bot
https://t.me/BotFather

---

2. Get Token
```
env
TELEGRAM_BOT_TOKEN=your_token
```
3. Get Chat ID
```
https://api.telegram.org/bot<token>/getUpdates
```
4. Add to .env
```
TELEGRAM_BOT_TOKEN=xxxxx
TELEGRAM_CHAT_ID=xxxxx
```
⚙️ Environment Variables
```
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=smart_mart

JWT_SECRET=your_secret

TELEGRAM_BOT_TOKEN=xxxxx
TELEGRAM_CHAT_ID=xxxxx
```
---
🚀 Run Project Locally
```
Install dependencies
npm install
Start server
npm run dev
```
Server runs at:
```
http://localhost:3000
```
🌍 Deployment (Render)
Fix Error: Cannot find module index.js

Update package.json:
```
"scripts": {
  "start": "node server.js"
}
```
🌐 Production URL
```
https://smart-mart-api.onrender.com
```
