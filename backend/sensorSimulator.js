module.exports = function startSensorSimulation(callback) {
    setInterval(() => {
        const data = {
            temperature: 20 + Math.random() * 15,
            humidity: 40 + Math.random() * 30,
            airQuality: 50 + Math.random() * 60
        };
        callback(data);
    }, 2000);
};
