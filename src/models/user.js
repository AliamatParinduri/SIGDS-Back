const mongoose = require('mongoose');

const user = mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    kelas: {
        type: String,
        required: true,
    },
    jurusan: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    nohp: {
        type: String,
        required: true,
    },
    pelanggaranSiswa: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "pelanggaran",
        required: true
    }],
    totalPoint: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('user', user);