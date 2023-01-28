import { CompanyModel, CompanyPayloadModel } from '../../Models/Company';
import { CustomerModel } from '../../Models/Customer';
export class AdminAppState {
    // Step 1 - create the app state object
    public companies: CompanyModel[] = [];
    public customers: CustomerModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
    GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
    ADDED_COMPANY = "ADDED_COMPANY",
    UPDATED_COMPANY = "UPDATED_COMPANY",
    DELETED_COMPANY = "DELETED_COMPANY",
    GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
    GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
    ADDED_CUSTOMER = "ADDED_CUSTOMER",
    UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
    DELETED_CUSTOMER = "DELETED_CUSTOMER",
}

// Step 3 - define what is action in terms of data
export interface AdminAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function addedCompanyAction(company: CompanyModel): AdminAction {
    return {
        type: ActionType.ADDED_COMPANY,
        payload: company
    };
}

export function updatedCompanyAction(company: CompanyModel): AdminAction {
    return {
        type: ActionType.UPDATED_COMPANY,
        payload: company
    };
}

export function deletedCompanyAction(id: number): AdminAction {
    return {
        type: ActionType.DELETED_COMPANY,
        payload: id
    }
}

export function gotAllCompaniesAction(companies: CompanyModel[]): AdminAction {
    return {
        type: ActionType.GOT_ALL_COMPANIES,
        payload: companies
    };
}

export function gotSingleCompanyAction(company: CompanyModel): AdminAction {
    return {
        type: ActionType.GOT_SINGLE_COMPANY,
        payload: company
    };
}

export function addedCustomerAction(customer: CustomerModel): AdminAction {
    return {
        type: ActionType.ADDED_CUSTOMER,
        payload: customer
    };
}

export function updatedCustomerAction(customer: CustomerModel): AdminAction {
    return {
        type: ActionType.UPDATED_CUSTOMER,
        payload: customer
    };
}

export function deletedCustomerAction(id: number): AdminAction {
    return {
        type: ActionType.DELETED_CUSTOMER,
        payload: id
    }
}

export function gotAllCustomersAction(customers: CustomerModel[]): AdminAction {
    return {
        type: ActionType.GOT_ALL_CUSTOMERS,
        payload: customers
    };
}

export function gotSingleCustomerAction(customer: CustomerModel): AdminAction {
    return {
        type: ActionType.GOT_SINGLE_CUSTOMER,
        payload: customer
    };
}

// Step 5 - Reducer function perform the required action
export function adminReducer(currentState: AdminAppState = new AdminAppState(), action: AdminAction): AdminAppState {

    const newState = { ...currentState };

    switch (action.type) {

        case ActionType.ADDED_COMPANY: {
            newState.companies.push(action.payload);
            break;
        }

        case ActionType.UPDATED_COMPANY: {
            const idx = newState.companies.findIndex(comp => comp.id === action.payload.id);
            newState.companies[idx] = action.payload;
            break;
        }

        case ActionType.DELETED_COMPANY: {
            newState.companies = newState.companies.filter(comp => comp.id !== action.payload);
            break;
        }

        case ActionType.GOT_ALL_COMPANIES: {
            newState.companies = action.payload;
            break;
        }

        case ActionType.ADDED_CUSTOMER: {
            newState.customers.push(action.payload);
            break;
        }

        case ActionType.UPDATED_CUSTOMER: {
            const idx = newState.customers.findIndex(cus => cus.id === action.payload.id);
            newState.customers[idx] = action.payload;
            break;
        }

        case ActionType.DELETED_CUSTOMER: {
            newState.customers = newState.customers.filter(cus => cus.id !== action.payload);
            break;
        }

        case ActionType.GOT_ALL_CUSTOMERS: {
            newState.customers = action.payload;
            break;
        }
    }

    return newState;
}