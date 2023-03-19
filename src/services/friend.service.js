import axios from 'axios';
import getUserInfomation from '../utils/getUserInfomation';
const URL = import.meta.env.VITE_API_URL;

class FriendService {

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
    const url = `${URL}/friends/getnewfriendrequest/`;
    return axios.get(url, config);
  }
  
  sendFriendRequest(recipient) {
    const token = localStorage.getItem('token') || '';
    const user = getUserInfomation(token);
    const body = {
      requester:user.id,
      recipient:recipient
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/friends/newfriendrequest/`;
    return axios.post(url,body, config);
  }

  acceptNewFriendRequest(id,requesterId) {
    const token = localStorage.getItem('token') || '';
    const user = getUserInfomation(token);
    const body = {
      recipientId:user.id,
      requesterId:requesterId,
      requestId: id,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body:body
    };
    const url = `${URL}/friends/accecptnewfriend/`;
    return axios.put(url, body,config);
  }

  rejectNewFriendRequest(id) {
    const token = localStorage.getItem('token') || '';
    const user = getUserInfomation(token);
    const body = {
      recipientId:user.id,
      requesterId:'',
      requestId: id,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/friends/rejectnewfriend/`;
    return axios.put(url,body, config);
  }

  getSuggestFriend() {
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
    const url = `${URL}/friends/suggest-friend/`;
    return axios.get(url, config);
  }
}

export default new FriendService();
