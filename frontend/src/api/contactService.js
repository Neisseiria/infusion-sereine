// src/api/contactService.js
import axios from 'axios';
const API_URL = `${import.meta.env.VITE_API_URL}/contact/`;

const sendMessage = (contactData) => {
  return axios.post(API_URL, contactData);
};

const contactService = { sendMessage };
export default contactService;