import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

import api from "./../api";

const authState = atom({
  key: "productListState",
  default: JSON.parse(localStorage.getItem("nf-auth")) || null,
});

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (auth === null) {
      localStorage.removeItem("nf-auth");
    } else {
      localStorage.setItem("nf-auth", JSON.stringify(auth));

      if (auth.status) {
        const { token } = auth.result;
        api.defaults.headers.common["Authorization"] = token;
      } else {
        delete api.defaults.headers.common["Authorization"];
      }
    }
  }, [auth]);

  return { auth, setAuth };
};

export default useAuth;
