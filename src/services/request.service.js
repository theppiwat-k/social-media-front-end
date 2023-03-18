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

  acceptNewFriendRequest(id) {
    const token = localStorage.getItem('token') || '';
    const body = {
      requestId: id,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body:body
    };
    console.log(config)
    const url = `${URL}/request/accecptnewfriend/`;
    return axios.put(url, body,config);
  }

  rejectNewFriendRequest(id) {
    const token = localStorage.getItem('token') || '';
    const body = {
      requestId: id,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    console.log(config)
    const url = `${URL}/request/rejectnewfriend/`;
    return axios.put(url,body, config);
  }
}

export default new RequestService();
