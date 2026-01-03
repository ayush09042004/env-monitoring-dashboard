const mongoose = require("mongoose");

const ThresholdSchema = new mongoose.Schema({
    metric: {
        type: String,
        enum: ["temperature", "humidity", "airQuality"],
        required: true
    },
    min: Number,
    max: Number
});

module.exports = mongoose.model("Threshold", ThresholdSchema);
