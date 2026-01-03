const { io } = require("socket.io-client");

const socket = io("http://localhost:5000", {
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("IoT sensor connected");

    setInterval(() => {
        const data = {
            temperature: 20 + Math.random() * 15,
            humidity: 40 + Math.random() * 30,
            airQuality: 50 + Math.random() * 60
        };

        socket.emit("sensor-data", data);
        // console.log("SENT SENSOR DATA", data);
    }, 2000);
});
