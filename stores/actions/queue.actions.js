export const ADD_QUEUE_FILE = 'ADD_QUEUE_FILE';
export const CANCEL_QUEUE_FILE = 'CANCEL_QUEUE_FILE';
export const ADD_QUEUE_MESSAGE = 'ADD_QUEUE_MESSAGE';
export const CANCEL_QUEUE_MESSAGE = 'CANCEL_QUEUE_MESSAGE';

export const UPDATE_QUEUE_FILE = 'UPDATE_QUEUE_FILE';
export const UPDATE_QUEUE_MESSAGE = 'UPDATE_QUEUE_MESSAGE';
// export const CHANGE_TEMP_FILE = 'CHANGE_TEMP_FILE';


// export function changeTempFile(messengerId, tempId, info) {
//     return { type: CHANGE_TEMP_MESSAGE, messengerId, tempId, info };
// }


export function addQueueFile(file,tempId, source, quequeType) {
    return { type: ADD_QUEUE_FILE, file,tempId, source, quequeType };
}

export function cancelQueueFile(tempId, source, quequeType) {
    return { type: CANCEL_QUEUE_FILE, tempId, source, quequeType };
}


export function addQueueMessage(tempId,message, source) {
    return { type: ADD_QUEUE_MESSAGE, tempId,message, source };
}

export function cancelQueueMessage(tempId, source, quequeType) {
    return { type: CANCEL_QUEUE_MESSAGE, tempId, source, quequeType };
}


export function updateQueueFile(tempId, status,quequeType) {
    return { type: UPDATE_QUEUE_FILE, tempId, status ,quequeType};
}


export function updateQueueMessage(tempId, status,quequeType) {
    return { type: UPDATE_QUEUE_MESSAGE, tempId, status ,quequeType};
}