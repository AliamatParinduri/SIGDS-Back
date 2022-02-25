const User = require('../models/user');
const Pelanggaran = require('../models/pelanggaran');

exports.allUser = async (req,res,next) => {
    try {
        const allUser = await User.find();
        res.status(200).json(allUser)
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.storeUser = async (req,res,next) => {
    const nama = req.body.nama;
    const kelas = req.body.kelas;
    const jurusan = req.body.jurusan;
    const alamat = req.body.alamat;
    const nohp = req.body.nohp;

    try {
        const newUser = new User({
            nama,kelas,jurusan,alamat,nohp,pelanggaranSiswa: [], totalPoint: 100
        })
        
        await newUser.save();
        res.status(200).json({message: "Berhasil Tambah Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.getUserById = async (req,res,next) => {
    const userId = req.params.userId;

    try {
        const allUser = await User.findOne({_id:userId});
        res.status(200).json(allUser)
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.updateUser = async (req,res,next) => {
    const userId = req.params.userId;
    const nama = req.body.nama;
    const kelas = req.body.kelas;
    const jurusan = req.body.jurusan;
    const alamat = req.body.alamat;
    const nohp = req.body.nohp;

    try {
        const user = await User.findOne({_id: userId});
        user.nama = nama;
        user.kelas = kelas;
        user.jurusan = jurusan;
        user.alamat = alamat;
        user.nohp = nohp;
        
        await user.save();
        res.status(200).json({message: "Berhasil Edit Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.deleteUser = async (req,res,next) => {
    const userId = req.params.userId;

    try {
        await User.deleteOne({_id: userId});
        res.status(200).json({message: "Berhasil Hapus Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.addPelanggaranSiswa = async (req,res,next) => {
    const userId = req.params.userId;
    const pelanggaran = req.body.dataPelanggaran;
    let ttlPenguranganPoint = 0;

    try {
        for (const id of pelanggaran) {
            const point = await Pelanggaran.findById(id).select('pointPelanggaran');
            
            ttlPenguranganPoint += point.pointPelanggaran;
        }
        
        const user = await User.findById(userId);
        const newPelanggaran = [...user.pelanggaranSiswa, ...pelanggaran];
        
        user.pelanggaranSiswa = newPelanggaran
        user.totalPoint -= ttlPenguranganPoint
        user.save();

        res.status(200).json({message: "Berhasil Input Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}