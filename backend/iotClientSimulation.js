const { io } = require("socket.io-client");

const socket = io("http://localhost:5000", {
    transports: ["websocket"]
});

let counter = 0;

socket.on("connect", () => {
    console.log("IoT sensor connected");

    setInterval(() => {
        counter++;

        // Normal values
        let temperature = 22 + Math.random() * 6; // 22–28
        let humidity = 40 + Math.random() * 20;
        let airQuality = 50 + Math.random() * 20;

        // Inject anomaly every 6th reading
        if (counter % 6 === 0) {
            temperature = 45; // anomaly spike
            console.log("🔥 ANOMALY INJECTED");
        }

        const data = {
            temperature,
            humidity,
            airQuality
        };

        socket.emit("sensor-data", data);
        console.log("SENT:", data);
    }, 2000);
});
