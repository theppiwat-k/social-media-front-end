import getAvartar from '../utils/getAvatar';

export default class PostBoxModel {
  constructor(response, userId) {
    this.id = response.id;
    this.authorUsername = response.author.username;
    this.access = response.author.id === userId ? true : false;
    this.message = response.message;
    this.authorAvatar = getAvartar(response.author);
    this.date = response.date;
    this.comments = response.commentofpost;
    this.likes = response.likes;
  }
}
