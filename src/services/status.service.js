import axios from "axios";

const URL = "http://localhost:4000";

class StatusService {
  postStatus(body) {
    const url = `${URL}/status/postStatus`;
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return axios.post(url, body, config);
  }

  getStatutus(body) {
    const url = `${URL}/status/getStatus`;
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return axios.post(url, body, config);
  }
}
export default new StatusService();
