export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REDUCE_FROM_CART = 'REDUCE_FROM_CART';
export const CLEAR_ALL_CART = 'CLEAR_ALL_CART';


export function removeFromCart(item) {
    return { type: REMOVE_FROM_CART, item };
}

export function reduceFromCart(item) {
    return { type: REDUCE_FROM_CART, item };
}

export function addToCart(item) {
    return { type: ADD_TO_CART, item };
}

export function clearAllCart() {
    return { type: CLEAR_ALL_CART };
}