import { apiRequest } from "../utils/Helper";

const BASE_URL = "users";

const userApi = {
  getArtists: async function () {
    try {
      const endpoint = `${BASE_URL}/tattoo_artist`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getProfile: async function (token) {
    try {
      const endpoint = `${BASE_URL}/profile`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async function (token, payload) {
    try {
      const endpoint = `${BASE_URL}/profile`;
      const method = 'PUT';
      const response = await apiRequest(endpoint, method, token, payload);
      return response;
    } catch (error) {
      throw error;
    }
  },
  userAll: async function (token) {
    try {
      const endpoint = `${BASE_URL}`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async function (token, id) {
    try {
      const endpoint = `${BASE_URL}/${id}`;
      const method = 'DELETE';
      const response = await apiRequest(endpoint, method, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
