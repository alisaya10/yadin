export const APPEND_MESSAGES = 'APPEND_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const REMOVE_MESSAGES = 'REMOVE_MESSAGES';
export const REMOVE_MESSENGER = 'REMOVE_MESSENGER';
export const UPDATE_MESSENGERS = 'UPDATE_MESSENGERS';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const CHANGE_TEMP_MESSAGE = 'CHANGE_TEMP_MESSAGE';
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
export const ADD_MESSENGERS = 'ADD_MESSENGERS';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REDUCE_NOTIFICATION = 'REDUCE_NOTIFICATION';
export const SET_NOTIFICATION_COUNT = 'SET_NOTIFICATION_COUNT';

export const CHANGE_LAST_SEEN = 'CHANGE_LAST_SEEN';
export const MESSAGE_SEEN = 'MESSAGE_SEEN';
export const UPDATE_ACTIONS = 'UPDATE_ACTIONS';


// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
// export const REDUCE_FROM_CART = 'REDUCE_FROM_CART';
// export const CLEAR_ALL_CART = 'CLEAR_ALL_CART';

export function addMessengers(messengers, init) {
    return { type: ADD_MESSENGERS, messengers, init };
}
export function updateMessengers(messengers) {
    return { type: UPDATE_MESSENGERS, messengers };
}

export function appendMessages(messengerId, messages) {
    return { type: APPEND_MESSAGES, messengerId, messages };
}
export function updateMessages(messengerId, messages) {
    return { type: UPDATE_MESSAGES, messengerId, messages };
}
export function removeMessages(messengerId, messages) {
    return { type: REMOVE_MESSAGES, messengerId, messages };
}
export function removeMessenger(messengers, myId) {
    return { type: REMOVE_MESSENGER, messengers, myId };
}

export function addMessages(messengerId, messages, init) {
    return { type: ADD_MESSAGES, messengerId, messages, init };
}

export function changeTempMessage(messengerId, tempId, info) {
    return { type: CHANGE_TEMP_MESSAGE, messengerId, tempId, info };
}

export function changeMessage(messengerId, id, info) {
    return { type: CHANGE_MESSAGE, messengerId, id, info };
}


export function addNotification(messengerId, count) {
    return { type: ADD_NOTIFICATION, messengerId, count };
}

export function updateActions(actionInfo) {
    return { type: UPDATE_ACTIONS, actionInfo };
}

export function reduceNotification(messengerId, count) {
    return { type: REDUCE_NOTIFICATION, messengerId, count };
}

export function setNotificationCount(messengerId, count) {
    return { type: SET_NOTIFICATION_COUNT, messengerId, count };
}

export function changeLastSeen(messengerId, messageId, sequence, ownerId) {
    return { type: CHANGE_LAST_SEEN, messengerId, messageId, sequence, ownerId };
}

export function messageSeen(messengerId, messageId) {
    return { type: MESSAGE_SEEN, messengerId, messageId };
}