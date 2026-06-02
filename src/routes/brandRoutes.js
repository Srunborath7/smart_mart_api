const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");
const brandController = require("../controllers/brandController");
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
    '/',
    upload.single('logo'),authMiddleware, roleMiddleware('admin'),
    brandController.store
);
router.get("/:id", brandController.show);
router.put(
    "/:id",
    upload.single('logo'),authMiddleware, roleMiddleware('admin'),
    brandController.update
);
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware('admin'),
    brandController.destroy
);
router.get("/", brandController.index);


module.exports = router;