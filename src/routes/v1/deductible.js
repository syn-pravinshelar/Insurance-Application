const express = require('express');

const controller = require('../../controllers/v1/deductible');

const router = express.Router();

router.get('/:id', controller.get);
router.post('', controller.list);
router.put('', controller.create);
router.patch('', controller.update);
router.delete('', controller.remove);

module.exports = router;
