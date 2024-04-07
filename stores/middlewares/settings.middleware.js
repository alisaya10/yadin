import { CHANGE_LANGUAGE } from '../actionsList';
import { changeBodyDirection } from '../../utils/useful'

export function ChangeLanguage(state, action) {
    let language = action.value
    if (language) {
        changeBodyDirection(language)
    }
}

const settings = store => next => action => {
    let result = next(action)
    if (action.type === CHANGE_LANGUAGE) {
        ChangeLanguage(store.getState(), action)
    }
    return result
}

export default settings;