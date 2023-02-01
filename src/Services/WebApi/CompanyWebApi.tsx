import { AxiosResponse } from "axios";
import { CompanyModel, CompanyPayloadModel } from "../../Models/Company";
import { CouponModel, CouponPayloadModel } from "../../Models/Coupon";
import tokenAxios from "../AxiosToken";
import global from "../ConstService";

class CompanyWebApi {

    private companyApi = global.urls.companies;
    private couponApi = global.urls.companies + "/coupons";

    public addCoupon(coupon: CouponPayloadModel): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.post<CouponModel>(this.couponApi, coupon);
    }

    public updateCoupon(id: number, coupon: CouponPayloadModel): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.put<CouponModel>(this.couponApi + "/" + id, coupon);
    }

    public deleteCoupon(id: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.couponApi + "/" + id);
    }

    public getAllCompanyCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.couponApi);
    }

    public getCompanyCouponsByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.couponApi + "/filter/categories/" + category);
    }

    public getCompanyCouponsByPrice(price: number): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.couponApi + "/filter/price/max-price?price=" + price);
    }

    public getCompanyDetails(): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.get<CompanyModel>(this.companyApi + "/details");
    }
}

const companyWebApi = new CompanyWebApi();
export default companyWebApi;