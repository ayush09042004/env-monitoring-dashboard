import { useEffect, useState } from "react";
import socket from "./socket";
import Charts from "./charts";
import "./dashboard.css";

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [alertMsg, setAlertMsg] = useState("");
    const [aiInsight, setAiInsight] = useState("");

    const latest = data[data.length - 1] || {};

    useEffect(() => {
        socket.on("sensor-update", (payload) => {
            setData((prev) => [...prev.slice(-19), payload]);
        });

        socket.on("anomaly-alert", (msg) => {
            setAlertMsg("Anomaly detected");
            setAiInsight(msg);
        });

        return () => {
            socket.off("sensor-update");
            socket.off("anomaly-alert");
        };
    }, []);

    const setTempThreshold = async () => {
        try {
            const res = await fetch("http://backend:5000/thresholds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    metric: "temperature",
                    max: 35
                })
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const result = await res.json();
            console.log("Threshold response:", result);

            window.alert("Temperature threshold set to 35°C");
        } catch (err) {
            console.error("Threshold error:", err);
            window.alert("Failed to connect to backend");
        }
    };




    return (
        <div className="dashboard">
            <h1>Environmental Monitoring Dashboard</h1>

            {alertMsg && <div className="alert">⚠ {alertMsg}</div>}

            {aiInsight && (
                <div className="ai-insight">
                    <strong>AI Insight:</strong> {aiInsight}
                </div>
            )}

            <div className="cards">
                <div className="card">
                    <h3>Temperature (°C)</h3>
                    <p>{latest.temperature?.toFixed(2) || "--"}</p>
                </div>

                <div className="card">
                    <h3>Humidity (%)</h3>
                    <p>{latest.humidity?.toFixed(2) || "--"}</p>
                </div>

                <div className="card">
                    <h3>Air Quality</h3>
                    <p>{latest.airQuality?.toFixed(2) || "--"}</p>
                </div>
            </div>

            <div className="chart-section">
                <Charts data={data} />
            </div>

            <div className="controls">
                <button onClick={setTempThreshold}>
                    Set Temperature Threshold (35°C)
                </button>
            </div>
        </div>
    );
}
