const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduleController')

// Create schedule
router.post('/', controller.post);

// Check free space based on schedules
router.get('/check/:start/:end', controller.check);
// List schedules
router.get('/', controller.get);

// Delete schedules
router.delete('/:id', controller.delete);

module.exports = router;