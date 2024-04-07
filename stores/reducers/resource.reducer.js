import { SET_RESOURCE } from '../actionsList';

const initialSettings = {
    // loggedin: false,
    data: {}
};

const resourceReducer = (state = initialSettings, action) => {
    // console.log(action)

    switch (action.type) {
        case SET_RESOURCE:
            return {
                ...state,
                data: action.data,
            }

        default:
            return state;
    }
}

export default resourceReducer;