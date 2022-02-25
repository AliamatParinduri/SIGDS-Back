const express = require('express');
const {body} = require('express-validator');

const router = express.Router();

const userController = require('../controllers/user');

router.get('/user', userController.allUser);

router.post('/user', [
    body("nama").isLength({min: 2}).withMessage("minimal harus 2 karakter"),
    body("kelas").isLength({min: 3}).withMessage("minimal harus 3 karakter"),
], userController.storeUser);

router.get('/user/:userId', userController.getUserById);

router.put('/user/:userId', [
    body("nama").isLength({min: 2}).withMessage("minimal harus 2 karakter"),
    body("kelas").isLength({min: 3}).withMessage("minimal harus 3 karakter"),
], userController.updateUser);

router.put('/addPelanggaranSiswa/:userId', userController.addPelanggaranSiswa);

router.delete('/user/:userId', userController.deleteUser);

module.exports = router;