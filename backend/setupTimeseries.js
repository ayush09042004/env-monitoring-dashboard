require("dotenv").config();
const mongoose = require("mongoose");

async function setup() {
    await mongoose.connect(process.env.MONGO_URI);

    const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

    const exists = collections.find(c => c.name === "sensordatas");

    if (!exists) {
        await mongoose.connection.db.createCollection("sensordatas", {
            timeseries: {
                timeField: "timestamp",
                granularity: "seconds"
            }
        });
        console.log("Time-series collection created");
    } else {
        console.log("Time-series collection already exists");
    }

    process.exit();
}

setup();
