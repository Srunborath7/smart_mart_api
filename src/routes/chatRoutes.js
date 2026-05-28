const router = require('express').Router();

const chatController = require('../controllers/chatController');

router.get('/', chatController.index);
router.post('/', chatController.store);
router.get('/room/:room_id', chatController.getByRoom);

module.exports = router;