const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();
const userRoutes = require("./routes/user");
const perusahaanRoutes = require("./routes/perusahaan");
const barangRoutes = require("./routes/barang");
const transaksiRoutes = require("./routes/transaksi");

//initialize express
const app = express();

// use packages
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", userRoutes);
app.use("/", perusahaanRoutes);
app.use("/", barangRoutes);
app.use("/", transaksiRoutes);

// server listening
const PORT = process.env.PORT || 7022;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
