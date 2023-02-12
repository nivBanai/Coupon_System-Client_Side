import { CouponModel } from "../../Models/Coupon";

export class CouponAppState {
    // Step 1 - create the app state object
    public allCoupons: CouponModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
    COMPANY_ADDED_COUPON = "COMPANY_ADDED_COUPON",
    COMPANY_UPDATED_COUPON = "COMPANY_UPDATED_COUPON",
    COMPANY_DELETED_COUPON = "COMPANY_DELETED_COUPON",
    DELETED_COMPANY_COUPONS = "DELETED_COMPANY_COUPONS"
};

// Step 3 - define what is action in terms of data
export interface CouponAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action
export function gotAllCouponsAction(coupons: CouponModel[]): CouponAction {
    return {
        type: ActionType.GOT_ALL_COUPONS,
        payload: coupons
    };
}

export function addedCompanyCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.COMPANY_ADDED_COUPON,
        payload: coupon
    };
}

export function updatedCompanyCouponAction(coupon: CouponModel): CouponAction {
    return {
        type: ActionType.COMPANY_UPDATED_COUPON,
        payload: coupon
    };
}


export function deletedCompanyCouponAction(id: number): CouponAction {
    return {
        type: ActionType.COMPANY_DELETED_COUPON,
        payload: id
    };
}



export function deletedCompanyCouponsAction(coupons: CouponModel[]): CouponAction {
    return {
        type: ActionType.DELETED_COMPANY_COUPONS,
        payload: coupons
    };
}

// Step 5 - Reducer function perform the required action
export function couponReducer(currentState: CouponAppState = new CouponAppState(), action: CouponAction): CouponAppState {

    const newState = { ...currentState };

    switch (action.type) {

        case ActionType.GOT_ALL_COUPONS: {
            newState.allCoupons = action.payload;
            break;
        }

        case ActionType.COMPANY_ADDED_COUPON: {
            newState.allCoupons.push(action.payload);
            break;
        }

        case ActionType.COMPANY_UPDATED_COUPON: {
            const idx = newState.allCoupons.findIndex(coup => coup.id === action.payload.id);
            newState.allCoupons[idx] = action.payload;
            break;
        }

        case ActionType.COMPANY_DELETED_COUPON: {
            newState.allCoupons = newState.allCoupons.filter(coup => coup.id !== action.payload);
            break;
        }

        case ActionType.DELETED_COMPANY_COUPONS: {
            newState.allCoupons = newState.allCoupons.filter(coupon => !action.payload.map((coup: { id: number}) => coup.id).includes(coupon.id));
            break;
        }
    }

    return newState;
}