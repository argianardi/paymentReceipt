const models = require("../configs/models/index");
const controllerBarangs = {};

// post request
controllerBarangs.post = async (req, res) => {
  const { nama_barang, harga, stock } = req.body;

  if (!(nama_barang && harga && stock)) {
    return res.status(400).json({
      success: false,
      message: "Data belum lengkap",
    });
  }

  try {
    const barang = await models.barang.create({
      nama_barang,
      harga,
      stock,
    });
    res.status(201).json({
      success: true,
      message: "Barang berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all data
controllerBarangs.getAll = async (req, res) => {
  try {
    const barangs = await models.barang.findAll();
    if (barangs.length > 0) {
      res.status(200).json({
        success: true,
        message: "Semua barang berhasil ditemukan",
        data: barangs,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data barang tidak ditemukan",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = controllerBarangs;
