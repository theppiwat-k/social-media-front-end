import axios from "axios";
import getUserInfomation from '../utils/getUserInfomation';

const URL = import.meta.env.VITE_API_URL
class AuthenticationService {
  login(body) {
    const url = `${URL}/users/login`;
    return axios.post(url, body);
  }

  logout(body) {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `${URL}/users/logout`;
    return axios.post(url, body,config);
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
    const user = getUserInfomation(token);
    let body = {
      username: user.email,
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
