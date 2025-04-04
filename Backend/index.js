const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const fertilizerRoutes = require("./routes/fertilizerRoutes");
const pesticideRoutes = require("./routes/pesticideRoutes");
const contactUsRoute = require("./routes/contactUsRoute");
const soilDataRoutes = require("./routes/soilDataRoutes");
const soilRoutes = require("./routes/soilRoutes");
const insectRoutes = require("./routes/insectRoutes");
const faqRoutes = require("./routes/faqRoutes");
const coldStorageRoutes = require("./routes/coldStorageRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);
app.use("/fertilizers", fertilizerRoutes);
app.use("/pesticides", pesticideRoutes);
app.use("/contact", contactUsRoute);
app.use("/soildata", soilDataRoutes);
app.use("/soil", soilRoutes);
app.use("/insects", insectRoutes);
app.use("/faqs", faqRoutes);
app.use("/cold-storages", coldStorageRoutes);

// Listening Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
