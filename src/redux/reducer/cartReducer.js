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

export const calculatorPrice = (state, coupon) => {
    let total = 0
    let totalDiscount = 0
    let finalPrice = 0
    state.cartItems.map(item => {
        total += Number(item.quantity)
        finalPrice += Number(item.price) * Number(item.quantity)
    })
    const couponAmount = coupon === null ? 0 : parseFloat(coupon.amount)
    if (coupon !== null) {
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
            const newData = action.payload.data
            let outputValue = null
            if (newData !== null && newData.length > 0) {
                state.cartItems = newData
                outputValue = calculatorPrice(state, state.coupon)
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
            } else {
                return Object.assign(
                    {},
                    state,
                    {
                        cartItems: newData,
                        total: 0,
                        totalPrice: 0,
                        totalDiscount: 0
                    }
                )
            }
        case ADD_CART_ITEM: {
            // const isExisted = state.cartItems.findIndex(p => p.product_id === action.payload.product_id) > -1 ? true : false;
            // return Object.assign(
            //     {},
            //     state,
            //     isExisted ? {
            //         cartItems: state.cartItems.map((item) => {
            //             if (item.product_id === action.payload.product_id) {
            //                 item.quantity = Number(action.payload.quantity);
            //             }
            //             return item;
            //         })
            //     } : { cartItems: [...state.cartItems, action.payload] },
            //     {
            //         total: state.total + Number(action.payload.quantity),
            //         totalPrice: state.totalPrice + Number(action.payload.price)
            //     }
            // );

            // let total = 0;
            // let totalPrice = 0;
            // let totalDiscount = 0;
            // const newData = action.payload.data;
            // //const newData = state.cartItems.concat(action.payload.data);
            // if (newData !== null && newData.length > 0) {
            //     newData.map(item => {
            //         total += Number(item.quantity);
            //         totalPrice += Number(item.price) * Number(item.quantity);
            //     })
            // }
            // return Object.assign(
            //     {},
            //     state,
            //     {
            //         cartItems: newData,
            //         total: total,
            //         totalPrice: totalPrice,
            //         totalDiscount: totalDiscount
            //     }
            // )
            const newData = action.payload.data
            let outputValue = null
            if (newData !== null && newData.length > 0) {
                state.cartItems = newData
                outputValue = calculatorPrice(state, state.coupon)
            }
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
        case DELETE_CART_ITEM:
            {
                // const newData = [...state.cartItems];
                // const index = newData.indexOf(action.payload);
                // if (index !== -1) {
                //     newData.splice(index, 1);
                //     return Object.assign(
                //         {},
                //         state,
                //         { cartItems: newData },
                //         {
                //             total: state.total - Number(action.payload.quantity),
                //             totalPrice: state.totalPrice - Number(action.payload.price)
                //         }
                //     );
                // }
                // return { ...state };
                // let total = 0;
                // let totalPrice = 0;
                // const newData = action.payload.data;
                // if (newData !== null && newData.length > 0) {
                //     newData.map(item => {
                //         total += Number(item.quantity);
                //         totalPrice += Number(item.price) * Number(item.quantity);
                //     })
                // }
                // return Object.assign(
                //     {},
                //     state,
                //     {
                //         cartItems: newData,
                //         total: total,
                //         totalPrice: totalPrice
                //     }
                // );
                const newData = action.payload.data
                let outputValue = null
                if (newData !== null && newData.length > 0) {
                    state.cartItems = newData
                    outputValue = calculatorPrice(state, state.coupon)
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
                } else {
                    return Object.assign(
                        {},
                        state,
                        {
                            cartItems: newData,
                            total: 0,
                            totalPrice: 0,
                            totalDiscount: 0,
                            coupon: null
                        }
                    )
                }
            }
        case UPDATE_CART_ITEM:
            {
                // let total = 0;
                // let totalPrice = 0;
                // const newData = action.payload.data;
                // newData.map(item => {
                //     total += Number(item.quantity);
                //     totalPrice += Number(item.price) * Number(item.quantity);
                // });
                // return Object.assign(
                //     {},
                //     state,
                //     {
                //         cartItems: newData,
                //         total: total,
                //         totalPrice: totalPrice
                //     }
                // );
                const newData = action.payload.data
                let outputValue = null
                if (newData !== null && newData.length > 0) {
                    state.cartItems = newData
                    outputValue = calculatorPrice(state, state.coupon)
                }
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
        case EMPTY_CART_ITEM:
            return { ...state };
        case SUCCESS_PAYMENT:
            return INITIAL_STATE;
        case COUPON_CODE_FETCHING:
            return { ...state, isFetching: true };
        case COUPON_CODE_CANCEL:
            {
                let outputValue = null
                state.coupon = null
                outputValue = calculatorPrice(state, state.coupon)
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
                                let outputValue = calculatorPrice(state, coupon)
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
                            let outputValue = calculatorPrice(state, coupon)
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