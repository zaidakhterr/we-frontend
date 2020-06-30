import { useState, useEffect } from "react";

import api from "./../api";

const useAuth = () => {
  const [auth, setAuth] = useState(
    () => window.localStorage.getItem("nf-auth") || null
  );

  useEffect(() => {
    window.localStorage.setItem("nf-auth", auth);

    if (auth && auth.status) {
      const { token } = auth;
      api.defaults.headers.common["Authorization"] = token;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [auth]);

  return { auth, setAuth };
};

export default useAuth;
