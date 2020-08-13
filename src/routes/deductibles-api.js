const express = require('express');

const DeductibleApiController = require('../controllers/deductible-api-controller');

const router = express.Router();

router.post('', DeductibleApiController.createDeductible);
router.get('/:id', DeductibleApiController.getDeductible);

module.exports = router;
