import axios, { AxiosResponse } from "axios";
import { Credentials, RegisterModel, User } from "../../Models/Auth";
import { CustomerPayloadModel } from "../../Models/Customer";
import tokenAxios from "../AxiosToken";
import global from "../ConstService";

class LoginWebApi {

    private loginApi = global.urls.base + "/" + "login";
    private logoutApi = global.urls.base + "/" + "logout";
    private registerApi = global.urls.base + "/" + "register";

    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        return axios.post<User>(this.loginApi, credentials);
    }

    public logout(): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.logoutApi);
    }

    public register(customer: CustomerPayloadModel): Promise<AxiosResponse<any>> {
        return axios.post<any>(this.registerApi, customer);
    }
}

const loginWebApi = new LoginWebApi();
export default loginWebApi;