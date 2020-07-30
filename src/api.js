import axios from "axios";

const instance = axios.create({
  baseURL: "https://ybt3cab2ci.execute-api.ap-south-1.amazonaws.com/dev",
});

instance.defaults.headers.post["Content-Type"] = "application/json";

export default instance;
