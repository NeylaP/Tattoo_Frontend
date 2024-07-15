import { apiRequest } from "../utils/Helper";

const BASE_URL = "users/";

const userApi = {
  getArtists: async function () {
    try {
      const endpoint = `${BASE_URL}tattoo_artist`;
      const method = 'GET';
      const response = await apiRequest(endpoint, method);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
