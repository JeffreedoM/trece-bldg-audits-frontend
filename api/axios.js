import axios from "axios";

// const BASE_URL = "http://localhost:5000/";
// const BASE_URL = "https://trece-bldg-audits-api.onrender.com/";
const BASE_URL = "https://trece-bldg-audits-backend.vercel.app/";

// axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });
