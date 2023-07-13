import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});