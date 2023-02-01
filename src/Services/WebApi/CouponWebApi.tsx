import { AxiosResponse } from "axios";
import { CouponModel } from "../../Models/Coupon";
import tokenAxios from "../AxiosToken";
import global from "../ConstService";

class CouponWebApi {

    private couponApi = global.urls.coupons;

    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.couponApi);
    }

    public purchaseCoupon(id: number): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.post<CouponModel>(this.couponApi + "/purchase/" + id);
    }
}

const couponWebApi = new CouponWebApi();
export default couponWebApi;