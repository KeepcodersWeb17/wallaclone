import { io } from "socket.io-client";

const socket = io("https://api.wallaclone.keepcoders.duckdns.org", {
  withCredentials: true,
  autoConnect: false
});

export default socket;
