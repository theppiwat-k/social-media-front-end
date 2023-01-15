import axios from "axios";

const URL = "http://localhost:4000";
class AuthenticationService {
  login(body) {
    const url = `${URL}/users/login`;
    return axios.post(url, body);
  }

  logout() {
    const url = `${URL}/users/logout`;
    return axios.post(url, body);
  }

  register(body) {
    const url = `${URL}/users/register`;
    return axios.post(url, body);
  }

  userProfile() {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `${URL}/users/user-profile`;
    const parseJwt = (tokenValue) => {
      let base64Url = tokenValue.split(".")[1];
      console.log(base64Url)
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    };
    const data = parseJwt(token);
    let body = {
      username: data.data,
    };
    return axios.post(url, body, config);
  }

  authorization() {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `${URL}/users/authorization`;
    return axios.get(url, config);
  }
}
export default new AuthenticationService();