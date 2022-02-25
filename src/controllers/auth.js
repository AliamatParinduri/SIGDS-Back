const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');

exports.postLogin = async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const admin = await Admin.findOne({username});
        const result = await bcrypt.compare(password, admin.password);
        
        const token = jwt.sign({admin}, "secret", {expiresIn: '1hr'})
        res.status(200).json({message: "Berhasil Login!", token, admin})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}