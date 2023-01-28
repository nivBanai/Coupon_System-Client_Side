import { AxiosResponse } from "axios";
import { CompanyModel, CompanyPayloadModel } from "../../Models/Company";
import { CustomerModel, CustomerPayloadModel } from "../../Models/Customer";
import tokenAxios from "../AxiosToken";
import global from "../ConstService";

class AdminWebApi {

    private companyApi = global.urls.companies;
    private customerApi = global.urls.customers;

    public addCompany(company: CompanyPayloadModel): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.post<CompanyModel>(this.companyApi, company);
    }

    public updateCompany(id: number, company: CompanyPayloadModel): Promise<AxiosResponse<CompanyModel>> {
        return tokenAxios.put<CompanyModel>(this.companyApi + "/" + id, company);
    }

    public deleteCompany(id: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.companyApi + "/" + id);
    }

    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>> {
        return tokenAxios.get<CompanyModel[]>(this.companyApi);
    }

    // public getSingleCompanies(id: number): Promise<AxiosResponse<CompanyModel>> {
    //     return tokenAxios.get<CompanyModel>(this.companyApi + "/" + id);
    // }

    public addCustomer(customer: CustomerPayloadModel): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.post<CustomerModel>(this.customerApi, customer);
    }

    public updateCustomer(id: number, customer: CustomerPayloadModel): Promise<AxiosResponse<CustomerModel>> {
        return tokenAxios.put<CustomerModel>(this.customerApi + "/" + id, customer);
    }

    public deleteCustomer(id: number): Promise<AxiosResponse<any>> {
        return tokenAxios.delete<any>(this.customerApi + "/" + id);
    }

    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>> {
        return tokenAxios.get<CustomerModel[]>(this.customerApi);
    }

    // public getSingleCustomer(id: number): Promise<AxiosResponse<CompanyModel>> {
    //     return tokenAxios.get<CompanyModel>(this.companyApi + "/" + id);
    // }
}

const adminWebApi = new AdminWebApi();
export default adminWebApi;