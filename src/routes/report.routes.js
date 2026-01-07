const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const reportController = require('../controllers/report.controller');

router.get('/category-wise', auth, reportController.categoryWise);

module.exports = router;
