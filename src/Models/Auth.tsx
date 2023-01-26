export interface LoginModel {
    email: string;
    password: string;
    clientType: string;
}

export interface Credentials {
    email: string;
    password: string;
    clientType: string;
}

export interface User {
    token: string;
    // name: string;
}