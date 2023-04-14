import axios from "axios";

const instance = axios.create({
  baseURL: "https://643801d2894c9029e8cc2d59.mockapi.io",
});

export default instance;
