import api from "./../api";

const useAuth = () => {
  const auth = JSON.parse(localStorage.getItem("nf-auth"));

  const setAuth = auth => {
    localStorage.setItem("nf-auth", JSON.stringify(auth));

    if (auth && auth.status) {
      console.log("useAuth auth2 Ran");
      const { token } = auth.result;
      api.defaults.headers.common["Authorization"] = token;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }

    window.location.href = "/";
  };

  return { auth, setAuth };
};

export default useAuth;
