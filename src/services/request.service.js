import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

class RequestService {
  getNewFriendReuest(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/status`;
    return axios.get(url, body, config);
  }
}

export default new RequestService();
