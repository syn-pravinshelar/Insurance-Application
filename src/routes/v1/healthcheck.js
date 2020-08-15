const express = require('express');

const controller = require('../../controllers/v1/healthcheck');

const router = express.Router();

router.get('', controller.get);

module.exports = router;
