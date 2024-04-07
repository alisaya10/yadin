export const TOGGLE_SETTING = 'TOGGLE_SETTING';
export const CHANGE_SETTING = 'CHANGE_SETTING';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';


export function changeSetting(name, value) {
    return { type: CHANGE_SETTING, name, value };
}

export function changeLanguage(name, value) {
    return { type: CHANGE_LANGUAGE, name, value };
}

export function toggleSetting(name) {
    return { type: TOGGLE_SETTING, name };
}