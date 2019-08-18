const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController')

router.post('/', controller.post);
router.get('/:dev', controller.get);
router.get('/', controller.get);
router.delete('/:id', controller.delete);

module.exports = router;