const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const fertilizerRoutes = require("./routes/fertilizerRoutes");
const pesticideRoutes = require("./routes/pesticideRoutes");
const contactUsRoute = require("./routes/contactUsRoute");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fertilizers", fertilizerRoutes);
app.use("/api/pesticides", pesticideRoutes);
app.use("/api/contact", contactUsRoute);

// Listening Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
