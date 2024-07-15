export const api = "http://127.0.0.1:4000/api/";

export const apiRequest = async (endpoint, method, payload = null) => {
    const apiUrl = `${api}${endpoint}`;
    let parametros = {
       headers: {
          'Content-Type': 'application/json'
       },
       method: method
    };
    if (payload) {
       parametros.body = JSON.stringify(payload);
    }
    try {
       const response = await fetch(apiUrl, parametros);
       if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
       }
       return await response.json();
    } catch (error) {
       console.error("Error in apiRequest:", error);
       throw error;
    }
 };