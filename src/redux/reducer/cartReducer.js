import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    DELETE_CART_ITEM,
    EMPTY_CART_ITEM,
    UPDATE_CART_ITEM,
    FETCHING_CART_ITEM,
    SUCCESS_PAYMENT,
    COUPON_CODE_FETCHING,
    COUPON_CODE_SUCCESS,
    COUPON_CODE_ERROR,
    COUPON_CODE_VALIDATE,
    COUPON_CODE_CANCEL
} from '../constants/actionTypes';

const INITIAL_STATE = {
    isFetching: false,
    cartItems: [],
    total: 0,
    totalPrice: 0,
    totalDiscount: 0,
    couponCodes: [],
    coupon: null,
    handleCouponError: null
};

export const calculatorPrice = (cartItems, coupon) => {
    let total = 0
    let totalDiscount = 0
    let finalPrice = 0
    if (cartItems !== undefined){
        //Tính tổng số lượng món hàng và giá tổng thành tiền 
        cartItems.map(item => {
            total += Number(item.quantity)
            finalPrice += Number(item.price) * Number(item.quantity)
        })
    }
    const couponAmount = coupon === null ? 0 : parseFloat(coupon.amount)
    if (coupon !== null) {
        //Tính số tiền giảm và tổng tiền giảm khi sử dụng Counpon Code
        if (coupon.discount_type == 'percent') {
            totalDiscount = finalPrice * couponAmount / 100.0
            finalPrice = finalPrice - totalDiscount
        } else {
            totalDiscount = couponAmount
            finalPrice = finalPrice - couponAmount
        }
    }
    return {
        coupon,
        total,
        totalDiscount,
        finalPrice
    }
}

export default cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_CART_ITEM:
        case ADD_CART_ITEM:
        case DELETE_CART_ITEM:
        case UPDATE_CART_ITEM: {
            const newData = action.payload.data
            let outputValue = null
            outputValue = calculatorPrice(newData, state.coupon)
            return Object.assign(
                {},
                state,
                {
                    cartItems: newData,
                    total: outputValue.total,
                    totalPrice: outputValue.finalPrice,
                    totalDiscount: outputValue.totalDiscount
                }
            )
        }
        case REMOVE_CART_ITEM:
            return { ...state };
        case EMPTY_CART_ITEM:
            return { ...state };
        case SUCCESS_PAYMENT:
            return INITIAL_STATE;
        case COUPON_CODE_FETCHING:
            return { ...state, isFetching: true };
        case COUPON_CODE_CANCEL: {
            let outputValue = null
            state.coupon = null
            outputValue = calculatorPrice(state.cartItems, state.coupon)
            return Object.assign(
                {},
                state,
                {
                    total: outputValue.total,
                    totalPrice: outputValue.finalPrice,
                    totalDiscount: outputValue.totalDiscount
                }
            )
        }
        case COUPON_CODE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                couponCodes: action.payload
            }
        case COUPON_CODE_ERROR:
            return {
                ...state,
                isFetching: false,
                handleCouponError: action.payload
            }
        case COUPON_CODE_VALIDATE: {
            const { code } = action.payload;
            if (code != undefined && state.couponCodes.length > 0) {
                const index = state.couponCodes.findIndex(function (obj) {
                    return obj.code === code;
                });
                if (index > -1) {
                    const coupon = state.couponCodes[index];
                    if (coupon !== undefined) {
                        const date_expires = new Date(coupon.date_expires);
                        const current_date = new Date();
                        if (date_expires < current_date) {
                            return {
                                ...state,
                                handleCouponError: {
                                    code: 'Coupon_Expired',
                                    message: 'Mã giảm giá đã hết hạn sử dụng',
                                    status: -99
                                }
                            }
                        }
                        else if (coupon.usage_limit !== null) {
                            const usage_count = coupon.usage_count;
                            const usage_limit = coupon.usage_limit;
                            if (usage_count >= usage_limit) {
                                return {
                                    ...state,
                                    handleCouponError: {
                                        code: 'Coupon_Usage_Limit',
                                        message: 'Mã giảm giá đã hết lượt sử dụng',
                                        status: -99
                                    }
                                }
                            } else {
                                let outputValue = calculatorPrice(state.cartItems, coupon)
                                return {
                                    ...state,
                                    total: outputValue.total,
                                    totalDiscount: outputValue.totalDiscount,
                                    totalPrice: outputValue.finalPrice,
                                    coupon: outputValue.coupon,
                                    handleCouponError: null
                                }
                            }
                        }
                        else {
                            let outputValue = calculatorPrice(state.cartItems, coupon)
                            return {
                                ...state,
                                total: outputValue.total,
                                totalDiscount: outputValue.totalDiscount,
                                totalPrice: outputValue.finalPrice,
                                coupon: outputValue.coupon,
                                handleCouponError: null
                            }
                        }
                    }
                } else {
                    return {
                        ...state,
                        handleCouponError: {
                            code: 'Coupon_Not_Found',
                            message: 'Mã giảm giá không tồn tại',
                            status: -99
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    handleCouponError: {
                        code: 'Unknown_error',
                        message: 'Lỗi không xác định',
                        status: -99
                    }
                }
            }
        }
        default:
            return state;
    }
}