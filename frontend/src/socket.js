import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    autoConnect: true
});

socket.on("connect", () => {
    console.log("SOCKET CONNECTED:", socket.id);
});

socket.on("disconnect", () => {
    console.log("SOCKET DISCONNECTED");
});

export default socket;
