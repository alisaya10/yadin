const STORAGE_KEY = 'SHOPERA';


const callMiddlewares = state => {
    // MIDDLEWARES
}


export const saveState = (state) => {
    try {
        let stateFilter = JSON.parse(JSON.stringify(state))
        const rawState = JSON.stringify(stateFilter);
        localStorage.setItem(STORAGE_KEY, rawState);

    } catch (err) {}
};


export const persistedState = (() => {
    try {
        const rawState = localStorage.getItem(STORAGE_KEY);
        if (rawState === null) return undefined;
        const state = JSON.parse(rawState);
        delete state.resource
        delete state.notifs
        delete state.settings
        delete state.messengers


        callMiddlewares(state);
        return state;
    } catch (err) {
        return undefined;
    }
})()