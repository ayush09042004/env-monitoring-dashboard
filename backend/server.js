require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const SensorData = require("./models/SensorData");
const Threshold = require("./models/Threshold");
const thresholdRoutes = require("./routes/thresholds");
const detectAnomaly = require("./anomalyDetector");
const aiAnalyze = require("./aiAnalyzer");
const sendSMS = require("./alerts/twilio");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

/* ---------------- Middleware ---------------- */
app.use(cors());
app.use(express.json());
app.use("/thresholds", thresholdRoutes);

/* ---------------- MongoDB ---------------- */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

let buffer = [];

/* ---------------- Socket.io ---------------- */
io.on("connection", (socket) => {
    console.log("Client connected");

    /**
     * This event is emitted by the simulated IoT sensor
     */
    socket.on("sensor-data", async (data) => {
        const payload = {
            temperature: data.temperature,
            humidity: data.humidity,
            airQuality: data.airQuality,
            timestamp: new Date()
        };

        /* ---- Store time-series data ---- */
        buffer.push(payload);
        if (buffer.length > 20) buffer.shift();

        await SensorData.create(payload);

        /* ---- Broadcast to dashboard ---- */
        io.emit("sensor-update", payload);


        /* ---- Threshold rules ---- */
        const thresholds = await Threshold.find();
        for (const rule of thresholds) {
            const value = payload[rule.metric];
            if (
                (rule.min !== undefined && value < rule.min) ||
                (rule.max !== undefined && value > rule.max)
            ) {
                const msg = `${rule.metric} threshold breached`;
                io.emit("anomaly-alert", msg);
                sendSMS(msg);
            }
        }

        /* ---- AI anomaly analysis ---- */
        if (buffer.length === 20) {
            const result = detectAnomaly(buffer.slice(0, 19), payload);
            if (result.isAnomaly) {
                const explanation = await aiAnalyze(result);
                io.emit("anomaly-alert", explanation);
            }
        }
    });
});

/* ---------------- Server ---------------- */
server.listen(5000, () => {
    console.log("Server running on port 5000");
});
