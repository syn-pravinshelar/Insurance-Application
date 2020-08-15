const express = require('express');

const controller = require('../../controllers/v1/form');

const router = express.Router();

router.get('/:id', controller.get);
router.post('', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/list', controller.list);

module.exports = router;
