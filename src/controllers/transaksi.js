const { perusahaan } = require(".");
const models = require("../configs/models/index");
const controllerTransaksis = {};
var data_exporter = require("json2csv").Parser;

// post request
controllerTransaksis.post = async (req, res) => {
  const { id_perusahaan, id_barang, total_barang } = req.body;

  if (!(id_perusahaan && id_barang && total_barang)) {
    return res.status(400).json({
      message: "Data belum lengkap",
    });
  }

  // get harga barang and calculate grand_total
  const barang = await models.barang.findAll({ where: { id: id_barang } });
  let grand_total = barang[0].dataValues.harga * total_barang;

  // update stock barang
  let currentStock = barang[0].dataValues.stock;
  let updatedStock = currentStock - total_barang;
  const updateBarang = await models.barang.update(
    {
      stock: updatedStock,
    },
    {
      where: {
        id: id_barang,
      },
    }
  );

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

// export csv
controllerTransaksis.exportCSV = async (req, res) => {
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
      const dataTransaksi = transaksis.map((transaksi) => ({
        tanggal_input: transaksi.createdAt,
        nama_perusahaan: transaksi.perusahaan.nama_perusahaan,
        nama_barang: transaksi.barang.nama_barang,
        total_barang: transaksi.total_barang,
        harga_barang: transaksi.barang.harga,
        grand_total: transaksi.grand_total,
        sisa_barang: transaksi.barang.stock,
      }));

      const mysql_data = JSON.parse(JSON.stringify(dataTransaksi));
      const file_header = [
        "Tanggal Input",
        "Nama Perusahaan",
        "Nama Barang",
        "Total Barang",
        "Harga Barang",
        "Grand Total",
        "Sisa Barang",
      ];

      const json_data = new data_exporter({ file_header });
      const csv_data = json_data.parse(mysql_data);

      res.setHeader("Content-Type", "text/csv");

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=data-transaksi.csv"
      );

      res.status(200).end(csv_data);
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
      message: error.message,
      // "internal server error",
    });
  }
};

module.exports = controllerTransaksis;
