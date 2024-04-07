import { createStore, applyMiddleware } from 'redux';
import { persistedState, saveState } from './preloadedState.js';
import reducers from './reducersList';
import middlewares from './middlewaresList'

// export default function configureStore() {

const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(
        ...middlewares
    )
);



store.subscribe(() => {
    saveState(store.getState());
});

// return store;

// }

export default store