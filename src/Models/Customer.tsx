import { CouponModel } from "./Coupon";

export interface CustomerModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string;
    coupons: CouponModel[];
}

export interface CustomerPayloadModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePic: string;
}