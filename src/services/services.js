import { apiRequest } from "../utils/Helper";

const BASE_URL = "services";

const serviceApi = {
  getServices: async function () {
    try {
      const endpoint = `${BASE_URL}`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default serviceApi;
