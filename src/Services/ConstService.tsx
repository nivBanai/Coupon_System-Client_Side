abstract class Config{

}

class Development extends Config{
    public urls = {
        "base":"http://localhost:8080/api/coupon_system"
    }
}

class Production extends Config{
    public urls = {
        "base":"http://localhost:8080/api/coupon_system"
    }
}

const global = process.env.NODE_ENV === "development" ? new Development() : new Production();
export default global;