import axios from 'axios';
import getUserInfomation from '../utils/getUserInfomation';
const URL = import.meta.env.VITE_API_URL;

class RequestService {
  getNewFriendReuest() {
    const token = localStorage.getItem('token') || '';
    const user = getUserInfomation(token);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params: {
        id: user.id,
      },
    };
    const url = `${URL}/request/getnewfriendrequest/`;
    return axios.get(url, config);
  }
}

export default new RequestService();
