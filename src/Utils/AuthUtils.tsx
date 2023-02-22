import { ActiveUser } from "../Models/Auth";

class AuthUtils {

    public isLoggedIn(user: ActiveUser): boolean {
        return (user.token) ? true : false;
    }

    public isValidAdmin(user: ActiveUser): boolean {
        return (user.token && user.clientType === "ADMINISTRATOR") ? true : false;
    }

    public isValidCompany(user: ActiveUser): boolean {
        return (user.token && user.clientType === "COMPANY") ? true : false;
    }

    public isValidCustomer(user: ActiveUser): boolean {
        return (user.token && user.clientType === "CUSTOMER") ? true : false;
    }
}

const authUtils = new AuthUtils();
export default authUtils;