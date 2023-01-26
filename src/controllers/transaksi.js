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

// get all data request
controllerTransaksis.getAll = async (req, res) => {
  await models.transaksi.hasOne(models.perusahaan, {
    sourceKey: "id_perusahaan",
    foreignKey: {
      name: "id",
      allowNull: true,
    },
  });

  await models.transaksi.hasOne(models.barang, {
    sourceKey: "id_barang",
    foreignKey: {
      name: "id",
      allowNull: true,
    },
  });

  try {
    const transaksis = await models.transaksi.findAll({
      include: [{ model: models.perusahaan }, { model: models.barang }],
    });
    if (transaksis.length > 0) {
      res.status(200).json({
        succes: true,
        message: "Semua data transaksi ditemukan",
        data: transaksis,
      });
    } else {
      res.status(404).json({
        succes: false,
        message: "Data transaksi tidak ditemukan",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "internal server error",
    });
  }
};

module.exports = controllerTransaksis;
