const BASE_URL = "auth/";
import { apiRequest } from '../utils/Helper'
const authService = {
   register: async function (payload) {
      return apiRequest(`${BASE_URL}register`, 'POST', payload);
   },

   login: async function (id) {
      await sleep(500);
      const apiUrl = `${BASE_URL}/${id}`;
      try {
         const response = await fetch(apiUrl);
         if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
         }
         return await response.json();
      } catch (error) {
         console.error("Error in getById:", error);
         throw error;
      }
   },
};

const sleep = (t) => new Promise((r) => setTimeout(r, t));

export default authService;
