export{}// import { CouponModel } from "../../Models/Coupon";

// export class CouponAppState {
//     // Step 1 - create the app state object
//     public allCoupons: CouponModel[] = [];
// }

// // Step 2 - define all required actions
// export enum ActionType {
//     GOT_ALL_COUPONS = "GOT_ALL_COUPONS"
// };

// // Step 3 - define what is action in terms of data
// export interface CouponAction {
//     type: ActionType;
//     payload: any;
// }

// // Step 4 - creator functions - gets payload regarding the action
// export function gotAllCouponsAction(coupons: CouponModel[]): CouponAction {
//     return {
//         type: ActionType.GOT_ALL_COUPONS,
//         payload: coupons
//     };
// }

// // Step 5 - Reducer function perform the required action
// export function couponReducer(currentState: CouponAppState = new CouponAppState(), action: CouponAction): CouponAppState {

//     const newState = { ...currentState };

//     switch (action.type) {

//         case ActionType.GOT_ALL_COUPONS: {
//             newState.allCoupons = action.payload;
//             break;
//         }
//     }

//     return newState;
// }