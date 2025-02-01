const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const {
  receiveSensorData,
  sendSensorData,
} = require("./controllers/sensorController");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// API Routes
app.post("/api/sensor-data", receiveSensorData);
app.get("/api/sensor-data", sendSensorData);

// Database connection
mongoose
  .connect(
    "mongodb+srv://yashpancholi001:yashDB@cluster0.yu28qo6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server Log
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
