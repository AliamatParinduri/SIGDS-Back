const mongoose = require('mongoose');

const pelanggaran = mongoose.Schema({
    pelanggaran: {
        type: String,
        required: true
    },
    pointPelanggaran: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('pelanggaran', pelanggaran);