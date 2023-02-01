import { CouponModel } from '../../Models/Coupon';

export class CustomerAppState {
    // Step 1 - create the app state object
    public coupons: CouponModel[] = [];
}

// Step 2 - define all required actions
export enum ActionType {
    GOT_ALL_CUSTOMER_COUPONS = "GOT_ALL_CUSTOMER_COUPONS",
    REMOVED_COUPONS = "REMOVED_COUPON",
    PURCHASED_COUPON = "PURCHASED_COUPON"
};

// Step 3 - define what is action in terms of data
export interface CustomerAction {
    type: ActionType;
    payload: any;
}

// Step 4 - creator functions - gets payload regarding the action

export function gotAllCustomerCouponsAction(coupons: CouponModel[]): CustomerAction {
    return {
        type: ActionType.GOT_ALL_CUSTOMER_COUPONS,
        payload: coupons
    };
}

export function removeCoupons(): CustomerAction {
    return {
        type: ActionType.REMOVED_COUPONS,
        payload: {}
    }
}

export function purchasedCouponAction(coupon: CouponModel): CustomerAction {
    return {
        type: ActionType.PURCHASED_COUPON,
        payload: coupon
    };
}

// Step 5 - Reducer function perform the required action
export function customerReducer(currentState: CustomerAppState = new CustomerAppState(), action: CustomerAction): CustomerAppState {

    const newState = { ...currentState };

    switch (action.type) {

        case ActionType.GOT_ALL_CUSTOMER_COUPONS: {
            newState.coupons = action.payload;
            break;
        }

        case ActionType.REMOVED_COUPONS: {
            newState.coupons = [];
            break;
        }

        case ActionType.PURCHASED_COUPON: {
            newState.coupons.push(action.payload);
            break;
        }
    }

    return newState;
}