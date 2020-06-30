import axios from "axios";

const instance = axios.create({
  baseURL: "https://2w2knta9ag.execute-api.ap-south-1.amazonaws.com/dev",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
