module.exports = function detectAnomaly(history, latest) {
    const avgTemp =
        history.reduce((sum, d) => sum + d.temperature, 0) / history.length;

    const deviation = Math.abs(latest.temperature - avgTemp);

    if (deviation > 8) {
        return {
            isAnomaly: true,
            avgTemp,
            latestTemp: latest.temperature,
            deviation
        };
    }

    return { isAnomaly: false };
};
