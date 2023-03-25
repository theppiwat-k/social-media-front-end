const URL = import.meta.env.VITE_API_URL;

const getAvartar = (userinformation) => {
  if (userinformation.avatar) {
    const avatar = `${URL}/avatars/${userinformation.id}.jpg?v=${Date.now()}`;
    return avatar;
  }
  return `${URL}/avatars/avatar-unknow.png`;
};

export default getAvartar;
