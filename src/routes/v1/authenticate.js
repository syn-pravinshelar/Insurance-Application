const express = require('express');

const controller = require('../../controllers/v1/authenticate');

const router = express.Router();

router.post('', controller.get);

module.exports = router;
