import axios from "axios";

const URL = "http://localhost:4000";

class AuthenticationService {
  login(body) {
    const url = `${URL}/users/login`;
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
    const url = `${URL}/users/user-Profile`;
    return axios.get(url, config);
  }
}
export default new AuthenticationService();
