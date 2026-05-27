const router = require('express').Router();

const chatController = require('../controllers/chatController');

router.get('/', chatController.index);
router.post('/', chatController.store);

module.exports = router;