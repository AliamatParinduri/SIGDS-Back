const Pelanggaran = require('../models/pelanggaran');

exports.allPelanggaran = async (req,res,next) => {
    try {
        const allPelanggaran = await Pelanggaran.find();
        res.status(200).json(allPelanggaran)
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.storePelanggaran = async (req,res,next) => {
    const jnspelanggaran = req.body.pelanggaran;
    const pointPelanggaran = req.body.pointPelanggaran;

    try {
        const newPelanggaran = new Pelanggaran({
            pelanggaran:jnspelanggaran,pointPelanggaran:pointPelanggaran
        })
        
        await newPelanggaran.save();
        res.status(200).json({message: "Berhasil Tambah Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.getPelanggaranById = async (req,res,next) => {
    const pelanggaranId = req.params.pelanggaranId;

    try {
        const allPelanggaran = await Pelanggaran.findOne({_id:pelanggaranId});
        res.status(200).json(allPelanggaran)
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.updatePelanggaran = async (req,res,next) => {
    const pelanggaranId = req.params.pelanggaranId;
    const newPelanggaran = req.body.pelanggaran;
    const pointPelanggaran = req.body.pointPelanggaran;

    try {
        const pelanggaran = await Pelanggaran.findOne({_id: pelanggaranId});
        pelanggaran.pelanggaran = newPelanggaran;
        pelanggaran.pointPelanggaran = pointPelanggaran;
        
        await pelanggaran.save();
        res.status(200).json({message: "Berhasil Edit Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}

exports.deletePelanggaran = async (req,res,next) => {
    const pelanggaranId = req.params.pelanggaranId;

    try {
        await Pelanggaran.deleteOne({_id: pelanggaranId});
        res.status(200).json({message: "Berhasil Hapus Data!"})
    } catch (err) {
        const error = new Error(err);
        error.statusCode = 422;
        throw error;
    }
}