import { APPEND_MESSAGES, MESSAGE_SEEN, CHANGE_LAST_SEEN, ADD_MESSENGERS, CHANGE_TEMP_MESSAGE, CHANGE_MESSAGE, ADD_MESSAGES, ADD_NOTIFICATION, REDUCE_NOTIFICATION, SET_NOTIFICATION_COUNT } from '../actionsList';



const initialInfo = {
    messages: {},
    notifications: {},
    list: [],
    object: {}
};

const messegersReducer = (state = initialInfo, action) => {

    switch (action.type) {
        case ADD_MESSENGERS:
            {

                let list = state.list //[action.messengerId]
                if (!list) {
                    list = []
                }

                if (action.init) {
                    list = action.messengers
                } else {
                    list = [...list, ...action.messengers]
                }
                list = action.messengers

                list = list.sort((a, b) => new Date(b.uDate).getTime() - new Date(a.uDate).getTime())

                let object = {}

                list.forEach(element => {
                    object[element._id] = element
                });
                // console.log(list)
                return {
                    ...state,
                    list: list,
                    object
                }
            }


        case APPEND_MESSAGES:
            {
                // console.log("APPEND_MESSAGES")
                // let messages = state.messages
                let messages = state.messages //[action.messengerId]
                if (!messages[action.messengerId]) {
                    messages[action.messengerId] = []
                }

                let newList = []

                action.messages.forEach(message => {
                    let found = false
                    messages[action.messengerId].forEach(element => {
                        if (element._id == message._id) {
                            found = true
                        }
                    });

                    if (!found) {
                        newList.push(message)
                    }
                });


                messages[action.messengerId] = [...messages[action.messengerId], ...newList]

                messages[action.messengerId] = messages[action.messengerId].sort((a, b) => new Date(b.cDate).getTime() - new Date(a.cDate).getTime())

                let list = state.list
                let object = state.object


                list.forEach((element, index) => {
                    if (action.messengerId == element._id) {
                        list[index]['*lastMsg'] = messages[action.messengerId][0]
                        object[action.messengerId]['*lastMsg'] = messages[action.messengerId][0]

                        // console.log("NW LAST")
                        // console.log( messages[action.messengerId][0])
                        // console.log( messages[action.messengerId])


                    }
                });

                // console.log(messages)
                return {
                    ...state,
                    messages: messages,
                    list,
                    object
                }

            }
        case ADD_MESSAGES:
            {
                // let messages = state.messages
                let messages = state.messages //[action.messengerId]
                if (!messages[action.messengerId]) {
                    messages[action.messengerId] = []
                }

                if (action.init) {
                    // console.log("INIT")
                    messages[action.messengerId] = action.messages
                } else {
                    // console.log("UPDATE")


                    let newMessages = []
                    action.messages.forEach((newMessage, index) => {
                        let exist = false
                        messages[action.messengerId].forEach(oldMessage => {
                            if (oldMessage._id == newMessage._id) {
                                exist = true
                            }
                        });
                        if (!exist) {
                            newMessages.push(newMessage)
                        }
                    });

                    messages[action.messengerId] = [...newMessages, ...messages[action.messengerId]]
                }

                // messages[action.messengerId].splice(0, 0, action.message)
                // console.log(action.messages)

                // console.log(messages)
                // console.log(action.messengerId)

                return {
                    ...state,
                    // ["messages." + action.messengerId]: messages
                    // ["messages." + [action.messengerId]]: messages
                    messages: messages
                }
            }

        case CHANGE_MESSAGE:
            {
                // let messages = state.messages
                let messages = state.messages //[action.messengerId]
                if (!messages[action.messengerId]) {
                    messages[action.messengerId] = []
                }

                // console.log("CHANGE_MESSAGE")

                messages[action.messengerId].forEach(message => {
                    if (message._id === action.id && typeof action.info == "object") {
                        for (const [key, value] of Object.entries(action.info)) {
                            message[key] = value
                        }
                    }
                });

                // messages[action.messengerId].splice(0, 0, action.message)

                return {
                    ...state,
                    messages: messages
                }
            }

        case CHANGE_TEMP_MESSAGE:
            {
                // let messages = state.messages
                let messages = state.messages //[action.messengerId]
                if (!messages[action.messengerId]) {
                    messages[action.messengerId] = []
                }

                // console.log(CHANGE_TEMP_MESSAGE)

                messages[action.messengerId].forEach(message => {
                    if (message.tempId === action.tempId && typeof action.info == "object") {
                        for (const [key, value] of Object.entries(action.info)) {
                            message[key] = value

                        }
                        // console.log(message)
                    }
                });

                return {
                    ...state,
                    messages: messages
                }
            }

        case ADD_NOTIFICATION:
            {
                let notifications = state.notifications

                let count = action.count ? action.count : 1
                notifications[action.messengerId] = notifications[action.messengerId] ? notifications[action.messengerId] + count : count

                    return {
                    ...state,
                    notifications: notifications
                };
            }
        case REDUCE_NOTIFICATION:
            {
                let notifications = state.notifications

                let count = action.count ? action.count : 1
                notifications[action.messengerId] = notifications[action.messengerId] ? notifications[action.messengerId] - count : 0
                    // console.log(notifications)
                return {
                    ...state,
                    notifications: notifications
                };
            }

        case SET_NOTIFICATION_COUNT:
            {
                let notifications = state.notifications

                notifications[action.messengerId] = action.count

                return {
                    ...state,
                    notifications: notifications
                };
            }

        case CHANGE_LAST_SEEN:
            {
                // console.warn(action.messageId)

                let list = state.list
                let notifications = state.notifications

                let messenger
                list.forEach(element => {
                    if (element._id == action.messengerId) {
                        messenger = element
                    }
                });
                // console.warn(messenger)


                if (messenger) {
                    let currentLastSeen = messenger['lastSeen']
                        // console.log("**CHANGE_LAST_SEEN")

                    if (!currentLastSeen || action.messageId > currentLastSeen) {
                        messenger['lastSeen'] = action.messageId

                        let messages = state.messages[action.messengerId]

                        if (!messages) {
                            messages = []
                        }
                        // console.warn(messenger['*lastSeen'])

                        if (action.messageId) {
                            // messages = messages.filter((a) => ((a._id > action.messageId) && (a.userId !== action.ownerId)))
                            messages = messages.filter((a) => ((a._id > action.messageId) && (a.isAdmin)))

                        }
                        // console.log("CHANGE_LAST_SEEN")
                        // console.log(messages)
                        // console.warn(messenger['*lastSeen'])
                        // console.warn(messages[0]._id > messenger['*lastSeen'])
                        notifications[action.messengerId] = messages ? messages.length : 0


                    }
                    // messenger = action.count

                }

                return {
                    ...state,
                    list: list,
                    notifications: notifications
                };

            }


        case MESSAGE_SEEN:
            {
                // console.log("MESSAGE SEEN")

                let messages = state.messages[action.messengerId]
                messages.forEach(message => {
                    if (message._id === action.messageId) {
                        message.status = 2
                    }
                });

                return {
                    ...state,
                    ["messages." + [action.messengerId]]: messages
                };
            }

        default:
            return state;
    }
}

export default messegersReducer;