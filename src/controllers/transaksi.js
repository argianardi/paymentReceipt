const models = require("../configs/models/index");
const controllerTransaksis = {};

// post request
controllerTransaksis.post = async (req, res) => {
  const { id_perusahaan, id_barang, total_barang, grand_total } = req.body;

  if (!(id_perusahaan && id_barang && total_barang && grand_total)) {
    return res.status(400).json({
      message: "Data belum lengkap",
    });
  }

  try {
    const transaksi = await models.transaksi.create({
      id_perusahaan,
      id_barang,
      total_barang,
      grand_total,
    });
    res.status(201).json({
      message: "Transaksi berhasil ditambahkan",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = controllerTransaksis;
