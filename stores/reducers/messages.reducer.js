import { APPEND_MESSAGES, MESSAGE_SEEN, CHANGE_LAST_SEEN, ADD_MESSENGERS, CHANGE_TEMP_MESSAGE, CHANGE_MESSAGE, ADD_MESSAGES, ADD_NOTIFICATION, REDUCE_NOTIFICATION, SET_NOTIFICATION_COUNT, UPDATE_MESSENGERS, UPDATE_ACTIONS, UPDATE_MESSAGES, REMOVE_MESSAGES, REMOVE_MESSENGER } from '../actionsList';



const initialInfo = {
    messages: {},
    notifications: {},
    list: [],
    object: {},
    actionsInfo: {},
};

const messegersReducer = (state = initialInfo, action) => {

    switch (action.type) {
        case ADD_MESSENGERS:
            {

                // console.log("ADD_MESSENGERS")

                let list = state.list //[action.messengerId]
                if (!list) {
                    list = []
                }

                let found = false


                if (action.init) {
                    list = action.messengers
                } else {
                    // list = [...list, ...action.messengers]
                    action.messengers.forEach(messenger => {
                        let found = false
                        list.forEach(oneList => {
                            if (messenger._id == oneList._id) {
                                found = true
                            }
                        });

                        if (!found) {
                            list.push({ ...messenger })
                        }

                    });
                }

                // console.log(action.messengers)
                // console.log(list)
                // list = action.messengers
                // list.forEach((element, index) => {
                //     if (action.messengerId == element._id) {
                //         list[index]['*lastMsg'] = messages[action.messengerId][0]
                //         object[action.messengerId]['*lastMsg'] = messages[action.messengerId][0]
                //     }
                // });


                list = list.sort((a, b) => new Date(b['*lastMsg']?.cDate).getTime() - new Date(a['*lastMsg']?.cDate).getTime())

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

        case UPDATE_MESSENGERS: {
            let list = state.list

            if (!list) {
                list = []
            }
            console.log('messenger action', action)
            console.log('messenger list', list)
            action.messengers?.map((messenger) => {
                let found = false
                let cIndex
                list.map((oneList, index) => {
                    console.log('one desk', oneList)
                    if (messenger._id == oneList._id) {
                        found = true
                        cIndex = index
                    }
                })
                if (found) {
                    console.log('updated', messenger)
                    console.log('last', list[cIndex])
                    list[cIndex] = messenger
                    list[cIndex]['**name'] = messenger.name
                }
            })
            // console.log(key)
            // console.log(list)

            return {
                ...state,
                list: list,
            }
        }
        case APPEND_MESSAGES:
            {
                // console.log("APPEND_MESSAGES")
                // console.log(action)

                // let messages = state.messages
                let messages = state.messages //[action.messengerId]
                if (!messages[action.messengerId]) {
                    messages[action.messengerId] = []
                }

                let newList = []

                if (action.messages) {
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
                }

                // console.log(newList)

                messages[action.messengerId] = [...messages[action.messengerId], ...newList]

                messages[action.messengerId] = messages[action.messengerId].sort((a, b) => new Date(b.cDate).getTime() - new Date(a.cDate).getTime())

                let list = state.list
                let object = state.object

                list.forEach((element, index) => {
                    if (action.messengerId == element._id) {
                        list[index]['*lastMsg'] = messages[action.messengerId][0]
                        object[action.messengerId]['*lastMsg'] = messages[action.messengerId][0]
                    }
                });

                list = list.sort((a, b) => new Date(b['*lastMsg']?.cDate).getTime() - new Date(a['*lastMsg']?.cDate).getTime())



                // console.log(list)
                // console.log(object)


                // console.log(messages)
                return {
                    ...state,
                    messages: messages,
                    list,
                    object
                }

            }
        case UPDATE_MESSAGES: {

            let messages = state.messages //[action.messengerId]
            if (!messages[action.messengerId]) {
                messages[action.messengerId] = []
            }
            // console.log(action.messengerId)
            // console.log(action.messages)
            if (action.messages) {
                action.messages.forEach(message => {
                    let found = false
                    let cIndex
                    messages[action.messengerId].forEach((element, index) => {
                        if (element._id == message.action.message) {
                            found = true
                            cIndex = index
                        }
                    });

                    if (found) {
                        if (message.action.type == 'deleted') {
                            messages[action.messengerId][cIndex].trashed = true
                        }
                        else if (message.action.type == 'deletedForMe') {
                            messages[action.messengerId].splice(cIndex, 1)
                        }
                        else if (message.action.type == 'edited') {
                            messages[action.messengerId][cIndex].text = message.modified.newMsg
                            messages[action.messengerId][cIndex].edited = true
                            // messages[action.messengerId][cIndex].text = message.text
                        }

                    }
                });
            }

            // console.log(newList)


            return {
                ...state,
                messages: messages,
            }
        }
        case REMOVE_MESSAGES: {
            let messages = state.messages //[action.messengerId]
            if (!messages[action.messengerId]) {
                messages[action.messengerId] = []
            }
            // console.log(action.messengerId)
            // console.log(action.messages)
            if (action.messages) {
                console.log(action.messages)
                action.messages.forEach(message => {
                    let found = false
                    let cIndex
                    messages[action.messengerId].forEach((element, index) => {
                        console.log(message, element)
                        if (element._id == message._id) {
                            found = true
                            cIndex = index
                        }
                    });

                    if (found) {
                        messages[action.messengerId].splice(cIndex, 1)

                    }
                });
            }

            // console.log(newList)


            return {
                ...state,
                messages: messages,
            }
        }
        case REMOVE_MESSENGER: {


            let list = state.list //[action.messengerId]
            let object = state.object
            let messages = state.messages

            if (!list) {
                list = []
            }


            // list = [...list, ...action.messengers]
            let newMessages = []
            action.messengers.forEach(messenger => {
                let found = false
                let cIndex
                let messengerId = ''
                list.forEach((oneList, index) => {
                    if (messenger._id == oneList._id) {
                        found = true
                        cIndex = index
                    }
                })

                if (found) {
                    list.splice(cIndex, 1)
                    delete object[messenger._id]
                }
                messages[messenger._id].forEach((oneMessage) => {

                    if (oneMessage.messenger == messenger._id) {
                        messenger.accessLimit.forEach((access) => {
                            if (access.hub == action.myId) {
                                if (oneMessage.sequence > access.seq) {
                                    newMessages.push(oneMessage)
                                }
                            }
                        })
                    }
                    else {
                        newMessages.push(oneMessage)
                    }
                })
            });

            return {
                ...state,
                list: list,
                object: object,
                messages: newMessages
            }
        }
        case ADD_MESSAGES:
            {

                // console.log("ADD_MESSAGES")

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
                            if (oldMessage._id == newMessage._id && newMessage._id) {
                                exist = true
                                // console.log("exist")
                                // console.log(oldMessage._id)
                            }
                        });
                        if (!exist) {
                            newMessages.push(newMessage)
                        }
                    });

                    messages[action.messengerId] = [...newMessages, ...messages[action.messengerId]]
                }

                let list = state.list
                let object = state.object
                list.forEach((element, index) => {
                    if (action.messengerId == element._id) {
                        list[index]['*lastMsg'] = messages[action.messengerId][0]
                        object[action.messengerId]['*lastMsg'] = messages[action.messengerId][0]
                    }
                });

                list = list.sort((a, b) => new Date(b['*lastMsg']?.cDate).getTime() - new Date(a['*lastMsg']?.cDate).getTime())

                // messages[action.messengerId].splice(0, 0, action.message)
                // console.log(action.messages)

                // console.log(list)
                // console.log(action.messengerId)

                return {
                    ...state,
                    list,
                    object,
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
                        if (action.info) {
                            for (const [key, value] of Object.entries(action.info)) {
                                message[key] = value
                            }
                        }
                    }
                });

                let list = state.list
                let object = state.object
                if (object[action.messengerId] && object[action.messengerId]['*lastMsg'] == action.id) {
                    list.forEach((element, index) => {
                        if (action.messengerId == element._id) {
                            list[index]['*lastMsg'] = messages[action.messengerId][0]
                            object[action.messengerId]['*lastMsg'] = messages[action.messengerId][0]
                        }
                    });
                }

                // messages[action.messengerId].splice(0, 0, action.message)

                return {
                    ...state,
                    messages: messages,
                    list,
                    object
                }
            }

        case CHANGE_TEMP_MESSAGE: {

            // console.log("CHANGE_TEMP_MESSAGE")
            // let messages = state.messages

            let messages = state.messages //[action.messengerId]
            if (!messages[action.messengerId]) {
                messages[action.messengerId] = []
            }

            // console.log(messages)
            // console.log(action.tempId)


            messages[action.messengerId].forEach(message => {

                // console.log(message.tempId)

                if (message.tempId === action.tempId && typeof action.info == "object") {
                    if (action.info) {
                        for (const [key, value] of Object.entries(action.info)) {
                            message[key] = value
                        }

                        // console.log("CHANGE_TEMP_MESSAGE")
                        // console.log(action.info)
                        // console.log(message)
                    }
                }
            });

            let list = state.list
            let object = state.object
            if (object[action.messengerId] && object[action.messengerId]['*lastMsg'] == action.id) {
                list.forEach((element, index) => {
                    if (action.messengerId == element._id) {
                        list[index]['*lastMsg'] = messages[action.messengerId][0]
                        object[action.messengerId]['*lastMsg'] = messages[action.messengerId][0]
                    }
                });
            }


            return {
                ...state,
                messages: messages,
                list,
                object
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
                // console.log("CHANGE_LAST_SEEN")
                // console.log(action.messengerId)

                let list = state.list

                let notifications = state.notifications

                // console.log("state", state)
                // console.log("list", list)

                let messenger
                list.forEach(element => {
                    if (element._id == action.messengerId) {
                        messenger = element
                    }
                });
                // console.log(messenger)


                if (messenger) {
                    let currentLastSeen = messenger['lastSeen']
                    // console.log(currentLastSeen)
                    // console.log(action.messageId > currentLastSeen)

                    if (!currentLastSeen || action.messageId > currentLastSeen) {
                        messenger['lastSeen'] = action.messageId

                        let messages = state.messages[action.messengerId]

                        if (!messages) {
                            messages = []
                        }
                        // console.warn(messenger['*lastSeen'])

                        if (action.messageId) {
                            // messages = messages.filter((a) => ((a._id > action.messageId) && (a.userId !== action.ownerId)))
                            messages = messages.filter((a) => (((a.sequence > action.sequence) && (a.sender != action.ownerId))))

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
        case UPDATE_ACTIONS: {
            let object = state.object
            let messenger = action.actionInfo.messenger
            if (!object[messenger].activity) {
                object[messenger].activity = {}
            }
            if (!object[messenger].activity.isTyping) {
                object[messenger].activity.isTyping = []
            }
            let found = false
            let cIndex
            object[messenger].activity.isTyping.forEach((element, index) => {
                if (element.user == action.actionInfo.user) {
                    found = true
                    cIndex = index
                }
            })
            if (found) {
                if (action.actionInfo.value == false) {
                    object[messenger].activity.isTyping.splice(cIndex, 1)
                }
            }
            else {
                object[messenger].activity.isTyping.push({ user: action.actionInfo.user })
            }

            return {
                ...state,
                object: object,
            };
        }

        case MESSAGE_SEEN:
            {
                // console.log("MESSAGE SEEN")

                // console.log(action.messengerId)
                // console.log(action.messageId)

                let messages = state.messages[action.messengerId]
                let list = state.list
                let object = state.object
                // console.log(messages)

                if (messages) {
                    messages.forEach(message => {
                        if (message._id === action.messageId) {
                            message.status = 2
                        }
                    });




                    if (object[action.messengerId] && object[action.messengerId]['*lastMsg']?._id == action.messageId) {
                        list.forEach((element, index) => {
                            if (action.messengerId == element._id) {
                                list[index]['*lastMsg'] = messages[0]
                                object[action.messengerId]['*lastMsg'] = messages[0]
                            }
                        });
                    }
                }

                return {
                    ...state,
                    list,
                    object,
                    ["messages." + [action.messengerId]]: messages
                };
            }

        default:
            return state;
    }
}

export default messegersReducer;