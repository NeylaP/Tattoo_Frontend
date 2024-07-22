import { apiRequest } from "../utils/Helper";

const BASE_URL = "appointments";

const citasApi = {
  misCitas: async function (token) {
    try {
      const endpoint = `${BASE_URL}`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  addCita: async function (token, payload) {
    try {
      const endpoint = `${BASE_URL}`;
      const method = 'POST';
      const response = await apiRequest(endpoint, method, token, payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateCita: async function (token, payload) {
    try {
      const endpoint = `${BASE_URL}`;
      const method = 'PUT';
      const response = await apiRequest(endpoint, method, token, payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getCita: async function (token, id) {
    try {
      const endpoint = `${BASE_URL}/${id}`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default citasApi;
