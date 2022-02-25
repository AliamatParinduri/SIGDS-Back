const bcrypt = require('bcryptjs');

const Admin = require('../models/admin');

module.exports = async (req, res, next) => {
    const admin = await Admin.findOne();
    if (!admin) {
        const newAdmin = new Admin({
            name: "Your Name",
            username: "username",
            password: await bcrypt.hash('1234', 12)
        })
        try {
            await newAdmin.save();
            console.log("success add new administrator");
        } catch (err) {
            throw new Error("failed add new administrator");
        }
    }
    next();
}