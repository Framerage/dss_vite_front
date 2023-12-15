import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    // "Cache-Control": "public, no-cache, must-revalidate, max-age=600000",
  },
  // baseURL: "http://127.0.0.1:3333",
});
export default instance;
