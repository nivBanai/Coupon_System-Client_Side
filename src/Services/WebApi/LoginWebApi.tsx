import axios, { AxiosResponse } from "axios";
import { ActiveUser, Credentials, User } from "../../Models/Auth";
import store from "../../Redux/Store";
import tokenAxios from "../AxiosToken";
import global from "../ConstService";

class LoginWebApi {

    private loginApi = global.urls.base + "/" + "login";
    private logoutApi = global.urls.base + "/" + "logout";

    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        return axios.post<User>(this.loginApi, credentials);
    }

    public logout(): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.logoutApi);
    }
}

const loginWebApi = new LoginWebApi();
export default loginWebApi;