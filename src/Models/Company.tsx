import { CouponModel } from "./Coupon";

export interface CompanyModel {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePic: string;
    coupons: CouponModel[];
}

export interface CompanyPayloadModel {
    name: string;
    email: string;
    password: string;
    profilePic: string;
}
