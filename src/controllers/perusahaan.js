const models = require("../configs/models/index");
const controllerPerusahaans = {};

// post request
controllerPerusahaans.post = async (req, res) => {
  const { nama_perusahaan } = req.body;

  if (!nama_perusahaan) {
    return res.status(400).json({
      message: "Data belum lengkap",
    });
  }

  try {
    const perusahaan = await models.perusahaan.create({
      nama_perusahaan,
    });
    res.status(201).json({
      message: "Perusahaan berhasil ditambahkan",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// get all data
controllerPerusahaans.getAll = async (req, res) => {
  try {
    const perusahaans = await models.perusahaan.findAll();
    if (perusahaans.length > 0) {
      res.status(200).json({
        message: "Semua perusahaan berhasil ditemukan",
        data: perusahaans,
      });
    } else {
      res.status(404).json({
        message: "Data perusahaan tidak ditemukan",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = controllerPerusahaans;
