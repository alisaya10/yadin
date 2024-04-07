import { combineReducers } from 'redux';
import settingsReducer from './reducers/settings.reducer';
import userReducer from './reducers/user.reducer';
import cartReducer from './reducers/cart.reducer';
import notifsReducer from './reducers/notifs.reducer';
import messengersReducer from './reducers/messages.reducer';

import resourceReducer from './reducers/resource.reducer';
import quequeReducer from './reducers/queque.reducer';

// import shoppingCartReducer from './reducers/shppoingCart.reducer.js';

export default combineReducers({
    messengers: messengersReducer,
    settings: settingsReducer,
    user: userReducer,
    cart: cartReducer,
    resource: resourceReducer,
    notifs: notifsReducer,
    queque: quequeReducer,



    // shoppingCart: shoppingCartReducer
});