import { ADD_TO_CART, REMOVE_FROM_CART, REDUCE_FROM_CART, CLEAR_ALL_CART } from '../actionsList';

const initialSettings = {
    items: [],
    count: 0
};

const settingsReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            let done = false
            let items = state.items
            items.forEach((item, index) => {
                // console.log("OLD")
                // console.log(item)
                if (item.data?._id === action.item?.data?._id && item.color?.code === action.item?.color?.code && item.type === action.item?.type) {

                    done = true
                    item.count++
                }
            });


            if (!done) {
                items.push({ data: action.item?.data, count: 1, color: action.item.color, type: action.item.type })
            }
            return {
                ...state,
                items: items
            }
        }

        case REDUCE_FROM_CART: {
            let items = state.items
            
            items.forEach((item, index) => {
                if (item.data?._id === action.item?.data?._id && item.color?.code === action.item?.color?.code && item.type === action.item?.type) {
                    if (item.count > 1) {
                        item.count--
                    } else {
                        items.splice(index, 1)
                    }
                }
            });
            return {
                ...state,
                items: items
            }
        }
        case REMOVE_FROM_CART: {
            let items = state.items
            items.forEach((item, index) => {
                if (item.data?._id === action.item?.data?._id && item.color === action.item?.color && item.type === action.item?.type) {
                    items.splice(index, 1)
                }
            });
            return {
                ...state,
                items: items
            }
        }

        case CLEAR_ALL_CART:
            return {
                ...state,
                items: [],
                count: 0
            };
        default:
            return state;
    }
}

export default settingsReducer;