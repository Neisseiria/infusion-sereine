// src/api/orderService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/orders/`;

// La fonction n'a plus besoin du paramètre 'token'
const createOrder = (orderData) => {
  return axios.post(API_URL, orderData);
};

const orderService = {
  createOrder,
};

export default orderService;