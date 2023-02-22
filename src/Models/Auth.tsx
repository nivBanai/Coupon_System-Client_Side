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

export interface RegisterModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePic: string;
}

export interface User {
    token: string;
    name: string;
    profilePic?: string;
}

export interface ActiveUser {
    token: string;
    name: string;
    profilePic?: string;
    clientType: string;
}