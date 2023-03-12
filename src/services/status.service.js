import axios from "axios";

const URL = import.meta.env.VITE_API_URL

class StatusService {
  postStatus(body) {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `${URL}/posts/status`;
    return axios.post(url, body, config);
  }

  getStatutus() {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const url = `${URL}/posts/status`;
    return axios.get(url, config);
  }
}
export default new StatusService();
