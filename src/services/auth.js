const BASE_URL = "http://127.0.0.1:4000/api/auth/";
const authService = {
   register: async function (payload) {
      return new Promise((resolve) => {
         fetch(`${BASE_URL}register`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(payload)
             })
             .then(async(response) => {
                 const estado = response.status;
                 const resp = await response.json();
                 resolve({ estado, resp });
             })
             .catch((error) => {
                 resolve({ error });
             });
     });
   },

   login: async function (payload) {
      return new Promise((resolve) => {
         fetch(`${BASE_URL}login`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify(payload)
             })
             .then(async(response) => {
                 const estado = response.status;
                 const resp = await response.json();
                 resolve({ estado, resp });
             })
             .catch((error) => {
                 resolve({ error });
             });
     });
   },
};

export default authService;
