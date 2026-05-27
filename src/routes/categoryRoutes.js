const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get("/", categoryController.getAll);
router.post('/', authMiddleware, roleMiddleware('admin'), categoryController.store);
router.put("/:id", authMiddleware, roleMiddleware('admin'), categoryController.update);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), categoryController.destroy);
module.exports = router;