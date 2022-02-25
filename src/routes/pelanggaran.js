const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const pelanggaranController = require('../controllers/pelanggaran');
router.get('/pelanggaran', pelanggaranController.allPelanggaran);

router.post('/pelanggaran', [
    body("pelanggaran").isLength({min: 5}).withMessage("minimal harus 5 karakter"),
    body("pointPelanggaran").isNumeric().isLength({min: 1, max: 2}),
], pelanggaranController.storePelanggaran);

router.get('/pelanggaran/:pelanggaranId', pelanggaranController.getPelanggaranById);

router.put('/pelanggaran/:pelanggaranId', [
    body("pelanggaran").isLength({min: 5}).withMessage("minimal harus 5 karakter"),
    body("pointPelanggaran").isNumeric().isLength({min: 1, max: 2}),
], pelanggaranController.updatePelanggaran);

router.delete('/pelanggaran/:pelanggaranId', pelanggaranController.deletePelanggaran);

module.exports = router;