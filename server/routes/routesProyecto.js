const { Router } = require('express');
const controller = require('../controller/controller');

const router = Router();

router.get('/getDatos', controller.getDatos);
router.post('/registrar', controller.registrar);
router.put('/actualizar', controller.actualizar);
router.delete('/eliminar/:id', controller.eliminar);


module.exports = router;