const express = require('express');
const swaggerController = require('../controllers/swagger.controller');

const router = express.Router();

router.use('/swagger', swaggerController.serve);
router.get('/swagger', swaggerController.setup);

module.exports = router;
