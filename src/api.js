import axios from "axios";

const instance = axios.create({
  baseURL: "https://4jxly1sdz5.execute-api.ap-south-1.amazonaws.com/dev/",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
