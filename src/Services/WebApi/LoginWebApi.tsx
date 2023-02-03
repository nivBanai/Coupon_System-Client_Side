import axios, { AxiosResponse } from "axios";
import { Credentials, User } from "../../Models/Auth";
import global from "../ConstService";

class LoginWebApi {

    private loginApi = global.urls.base + "/" + "login";

    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        return axios.post<User>(this.loginApi, credentials);
    }
}

const loginWebApi = new LoginWebApi();
export default loginWebApi;