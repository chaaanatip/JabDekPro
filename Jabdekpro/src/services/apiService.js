// src/services/apiService.js

import axios from "axios"

const API_REGISTER = "http://localhost:3000/api/users/register"

const API_LOGIN = "http://localhost:3000/api/users/login" // เปลี่ยนเป็น URL ของ backend ของคุณ

export const registerUser = (email, password) => {
  return axios.post(`${API_REGISTER}/register`, { email, password })
}

export const loginUser = (email, password) => {
  return axios.post(`${API_LOGIN}/login`, { email, password })
}
