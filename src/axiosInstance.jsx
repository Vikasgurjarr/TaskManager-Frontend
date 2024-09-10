import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Adjust URL as per your server configuration
  timeout: 10000, // Adjust timeout as needed
  withCredentials: true, // If your API requires credentials (cookies, auth tokens, etc.)
});

export default instance;


