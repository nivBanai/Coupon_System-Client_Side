import { CouponModel } from '../../Models/Coupon';

export class CustomerAppState {
    public coupons: CouponModel[] = [];
}

export enum ActionType {
    GOT_ALL_CUSTOMER_COUPONS = "GOT_ALL_CUSTOMER_COUPONS",
    REMOVED_COUPONS = "REMOVED_COUPON",
    PURCHASED_COUPON = "PURCHASED_COUPON"
};

export interface CustomerAction {
    type: ActionType;
    payload: any;
}

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