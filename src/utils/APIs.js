import axios from "axios";

// function to hit createUser API endpoint
export const createUser = async (data) => {
  try{
    const user = await axios.post(`${import.meta.env.VITE_SERVER_URI}/users/new`, data);
    console.log(user);
    return;
  }catch(err){
    console.log(err);
  }
}

export const setCookies = (key, value) => {
  document.cookie = `${key}=${value}; SameSite=None; Secure;`;
}

export const removeCookies = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

export const getCookies = (key) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0].trim() === key) {
      return cookie[1];
    }
  }
  return 'null';
}

export const getTime = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
}