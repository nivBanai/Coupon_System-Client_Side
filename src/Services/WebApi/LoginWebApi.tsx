import axios, { AxiosResponse } from "axios";
import { Credentials, User } from "../../Models/Auth";
import global from "../ConstService";

class LoginWebApi {

    private baseUrl = global.urls.base;
    
    public login(credentials: Credentials): Promise<AxiosResponse<User>> {
        return axios.post<User>(this.baseUrl + "/" + "login", credentials);
    }
}

const loginWebApi = new LoginWebApi();
export default loginWebApi;