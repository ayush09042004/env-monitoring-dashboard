import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function Charts({ data }) {
    return (
        <LineChart width={800} height={400} data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis
                dataKey="timestamp"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()}
            />

            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#ff0000" />
            <Line type="monotone" dataKey="humidity" stroke="#0000ff" />
            <Line type="monotone" dataKey="airQuality" stroke="#00aa00" />
        </LineChart>
    );
}
