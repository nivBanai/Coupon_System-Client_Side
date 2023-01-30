import { AxiosResponse } from "axios";
import { CompanyModel, CompanyPayloadModel } from "../../Models/Company";
import { CouponModel, CouponPayloadModel } from "../../Models/Coupon";
import { CustomerModel } from "../../Models/Customer";
import tokenAxios from "../AxiosToken";
import global from "../ConstService";

class CustomerWebApi {

    private customerApi = global.urls.customers;
    private customerCouponApi = global.urls.customers + "/coupons";
    private couponApi = global.urls.coupons;

    public purchaseCoupon(coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
        return tokenAxios.post<CouponModel>(this.customerCouponApi, coupon);
    }

    public getAllCustomerCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerCouponApi);
    }

    public getAllPurchasableCoupons(): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.couponApi);
    }

    public getCouponsByCategory(category: string): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerCouponApi + "/filter/categories/" + category);
    }

    public getCouponsByPrice(price: number): Promise<AxiosResponse<CouponModel[]>> {
        return tokenAxios.get<CouponModel[]>(this.customerCouponApi + "/filter/price/max-price?price=" + price);
    }

    public getCustomerDetails(): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.get<CustomerModel>(this.customerApi + "/details");
    }
}

const customerWebApi = new CustomerWebApi();
export default customerWebApi;