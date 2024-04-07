import { SET_USER, LOGOUT_USER, CHANGE_BALANCE } from '../actionsList';

const initialSettings = {
    loggedin: false,
    info: {}
};

const userReducer = (state = initialSettings, action) => {
    // console.log(action.type)

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedin: (action.loggedin != null) ? action.loggedin : state[action.loggedin],
                role: (action.role != null) ? action.role : state[action.role],
                info: action.info
            }
        case LOGOUT_USER:
            return {
                ...state,
                loggedin: false,
                info: {}
            }

        case CHANGE_BALANCE:

            return {
                ...state,
                info: {
                    ...state.info,
                    balance: action.data.balance,
                    selfBalance: action.data.selfBalance
                }
            }

        default:
            return state;
    }
}






export default userReducer;