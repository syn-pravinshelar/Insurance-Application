const express = require('express');

const controller = require('../../controllers/v1/deductible');

const router = express.Router();

router.get('/:id', controller.get);
router.post('', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('', controller.getAll);

module.exports = router;
