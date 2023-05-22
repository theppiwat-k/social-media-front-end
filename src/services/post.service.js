import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

class PostService {
  createPost(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/status`;
    return axios.post(url, body, config);
  }

  getPost(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/getstatus`;
    return axios.post(url, body, config);
  }

  getCommentOfPostByOne(postId) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/getcommentbyone/${postId}`;
    return axios.get(url, config);
  }

  commentPost(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/comment`;
    return axios.post(url, body, config);
  }

  likePost(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/like`;
    return axios.post(url, body, config);
  }

  editPost(body) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/edit`;
    return axios.post(url, body, config);
  }

  deletePost(postId) {
    const token = localStorage.getItem('token') || '';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const url = `${URL}/posts/delete/${postId}`;
    return axios.delete(url, config);
  }
}
export default new PostService();
