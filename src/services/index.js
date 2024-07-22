import authService from "./auth";
import citasApi from "./cita";
import serviceApi from "./services";
import userApi from "./user";

const authenticationService = {
   auth: authService,
};

export const apiUsers = {
   user: userApi,
};

export const apiServices = {
   service: serviceApi,
};

export const apiCitas = {
   cita: citasApi,
};

export default authenticationService;
