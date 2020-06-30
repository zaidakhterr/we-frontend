import { useState, useEffect } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState(
    () => window.localStorage.getItem("nedian-auth") || null
  );

  useEffect(() => {
    let authObj = window.localStorage.getItem("nedian-auth");
    if (authObj) {
      setAuth(authObj);
    }
  }, []);

  return auth;
};

export default useAuth;
