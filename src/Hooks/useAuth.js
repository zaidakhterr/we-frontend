import { useState, useEffect } from "react";

import api from "./../api";

const useAuth = () => {
  const [auth, setAuth] = useState(
    () => JSON.parse(window.localStorage.getItem("nf-auth")) || null
  );

  useEffect(() => {
    window.localStorage.setItem("nf-auth", JSON.stringify(auth));

    if (auth && auth.status) {
      const { token } = auth.result;
      api.defaults.headers.common["Authorization"] = token;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }

    return () => (window.location.href = "/");
  }, [auth]);

  return { auth: JSON.parse(window.localStorage.getItem("nf-auth")), setAuth };
};

export default useAuth;
