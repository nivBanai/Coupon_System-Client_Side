abstract class Config{

}

class Development extends Config{
    public urls = {
        "base":"http://localhost:8080/api/coupon_system",
        "companies":"http://localhost:8080/api/coupon_system/companies",
        "customers":"http://localhost:8080/api/coupon_system/customers"
    }
}

class Production extends Config{
    public urls = {
        "base":"http://localhost:8080/api/coupon_system",
        "companies":"http://localhost:8080/api/coupon_system/companies",
        "customers":"http://localhost:8080/api/coupon_system/customers"
    }
}

const global = process.env.NODE_ENV === "development" ? new Development() : new Production();
export default global;