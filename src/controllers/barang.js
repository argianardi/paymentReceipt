const models = require("../configs/models/index");
const controllerBarangs = {};

// post request
controllerBarangs.post = async (req, res) => {
  const { nama_barang, harga, stock } = req.body;

  if (!(nama_barang && harga && stock)) {
    return res.status(400).json({
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
      message: "Barang berhasil ditambahkan",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = controllerBarangs;
