import { CouponModel } from '../../Models/Coupon';

export class CompanyAppState {
    public coupons: CouponModel[] = [];
}

export enum ActionType {
    GOT_ALL_COMPANY_COUPONS = "GOT_ALL_COMPANY_COUPONS",
    ADDED_COUPON = "ADDED_COUPON",
    UPDATED_COUPON = "UPDATED_COUPON",
    DELETED_COUPON = "DELETED_COUPON",
    REMOVED_COUPONS = "REMOVED_COUPON"
};

export interface CompanyAction {
    type: ActionType;
    payload: any;
}

export function addedCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.ADDED_COUPON,
        payload: coupon
    };
}

export function updatedCouponAction(coupon: CouponModel): CompanyAction {
    return {
        type: ActionType.UPDATED_COUPON,
        payload: coupon
    };
}

export function deletedCouponAction(id: number): CompanyAction {
    return {
        type: ActionType.DELETED_COUPON,
        payload: id
    }
}

export function gotAllCompanyCouponsAction(coupons: CouponModel[]): CompanyAction {
    return {
        type: ActionType.GOT_ALL_COMPANY_COUPONS,
        payload: coupons
    };
}

export function removeCoupons(): CompanyAction {
    return {
        type: ActionType.REMOVED_COUPONS,
        payload: {}
    }
}

export function companyReducer(currentState: CompanyAppState = new CompanyAppState(), action: CompanyAction): CompanyAppState {

    const newState = { ...currentState };

    switch (action.type) {

        case ActionType.ADDED_COUPON: {
            newState.coupons.push(action.payload);
            break;
        }

        case ActionType.UPDATED_COUPON: {
            const idx = newState.coupons.findIndex(coup => coup.id === action.payload.id);
            newState.coupons[idx] = action.payload;
            break;
        }

        case ActionType.DELETED_COUPON: {
            newState.coupons = newState.coupons.filter(coup => coup.id !== action.payload);
            break;
        }

        case ActionType.GOT_ALL_COMPANY_COUPONS: {
            newState.coupons = action.payload;
            break;
        }

        case ActionType.REMOVED_COUPONS: {
            newState.coupons = [];
            break;
        }
    }

    return newState;
}