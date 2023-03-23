import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

class UserService {
  updateUserProfile(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/users/update-profile`;
    return axios.post(url, body, config);
  }
}
export default new UserService();
