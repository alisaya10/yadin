export const ADD_NOTIF = 'ADD_NOTIF';
export const REMOVE_NOTIF = 'REMOVE_NOTIF';

export function addNotif(options) {
    return { type: ADD_NOTIF, options };
}

export function removeNotif(id) {
    return { type: REMOVE_NOTIF, id };
}