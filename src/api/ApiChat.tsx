import axios from "axios";

export const apiChat = axios.create({
  baseURL: "http://localhost:3500/api",
});

apiChat.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem("token");
  if (token) {
    //asi le mandamos el token que esta esperando nuestro backend
    config.headers!["x-token"] = token;
  } else {
    console.log("No hay token");
  }
  return config;
});
// axios.interceptors.request['use': ]
