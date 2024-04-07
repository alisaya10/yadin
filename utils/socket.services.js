import io from "socket.io-client";
import { siteConfig } from '../variables/config';
import { getToken, pathMaker } from "./useful";
import * as actions from '../stores/actionsList';
import store from '../stores/storeConfig';
import Security from './Security.services'
import { nanoid } from "nanoid";


const requestSecurity = new Security()

class SocketServices {


    socket = null
    userId
    acticeTopics = {}
    openSocket = false
    disconnected = false

    emit = (topic, message, extra, cb) => {

        // console.log("emit")
        // console.log(topic)
        // console.log(message)
        // console.log(this.socket)

        // return
        if (this.socket?.connected) {
            // console.log("TP2")
            // return
            delete message.tempFile

            this.socket.emit(topic, message, (info, err) => {

                // console.log("EMIT CB")
                // console.log(info)
                // console.log(err)

                if (cb) {
                    cb(info, err)
                }
            })
        }
    }


    sendMessage(messenger, message) {

        console.log('sendMessage')
        console.log(message)

        if (message) {

            console.log("tp1")
            let tempId = message?.tempId ?? nanoid()

            console.log(tempId)

            store.dispatch(actions.addQueueMessage(tempId, message, { messenger, type: 'message' }))

            console.log("tp2")

            setTimeout(() => {
                this.checkMessageQueque()
            }, 10);
        }

        // this.emit('sendMessage', message, null, () => {

        // })

    }


    checkMessageQueque = () => {

        console.log("checkMessageQueque")

        let messages = store.getState().queque?.messages
        console.log(messages)
        if (Array.isArray(messages) && messages.length > 0) {

            if (this.currentMessageIndex == null) {

                this.currentMessageIndex = true
                let current = messages[0]
                console.log(current)
                console.log("checkMessageQueque")

                if (current.source?.type == 'message') {

                    console.log("HERE!!")
                    console.log("HERE!!")
                    this.emit('sendMessage', current.message, null, (info, err) => {


                        console.log(info)
                        console.log(err)


                        store.dispatch(actions.updateQueueMessage(current.tempId, 'done', 'uploads'))
                        store.dispatch(actions.changeTempMessage(current.source.messenger, current.tempId, info))


                        setTimeout(() => {
                            this.currentMessageIndex = null

                            console.log("FINISHED")
                            this.checkMessageQueque()

                        }, 50);

                    })

                }


            }
        }

    }



    sendTheTempMessage(tempId, source) {

        let messages = store.getState().messengers?.messages
        let message

        if (messages && source.messenger) {
            messages[source.messenger].forEach(element => {
                if (element.tempId == tempId) {
                    message = element
                }
            })

            console.log("sendTheTempMessage")
            if (message) {
                this.sendMessage(message.messenger, message)
            }

        }
    }




    addTopic(moduleId, id, type, settings, updateFunction) {

        if (!this.acticeTopics[type + '-' + id]) {
            this.acticeTopics[type + '-' + id] = { id, type }
            this.subscribeTopic({ id, type, settings })

            if (!this.acticeTopics[type + '-' + id].modules) {
                this.acticeTopics[type + '-' + id].modules = {}
            }
        }

        this.acticeTopics[type + '-' + id].modules[moduleId] = { id: moduleId, settings, updateFunction }

    }


    removeTopic(moduleId, id, type, settings) {

        if (this.acticeTopics[type + '-' + id] && this.acticeTopics[type + '-' + id].modules) {

            delete this.acticeTopics[type + '-' + id].modules[moduleId]

            if (Object.keys(this.acticeTopics[type + '-' + id].modules).length == 0) {
                delete this.acticeTopics[type + '-' + id]
                this.unsubscribeTopic({ id, type, settings })
            }
        }

        // console.log(this.acticeTopics)
    }


    subscribeTopic(topic) {
        console.log("FEEDBACK")
        console.log(this.socket)
        console.log(topic)

        if (this.socket) {
            this.socket.emit('subscribeTopic', topic, () => {
                console.log("FEEDBACK")
            })
        }
    }


    unsubscribeTopic(topic) {
        if (this.socket) {
            this.socket.emit('unsubscribeTopic', topic, () => {
                // console.log("FEEDBACK")
            })
        }
    }


    initTopic() {
        console.log("initTopic")
        Object.values(this.acticeTopics).forEach(acticeTopic => {
            this.subscribeTopic(acticeTopic)
        });
    }



    closeSocket() {
        if (this.socket) {
            console.log("CLOSE SOCKET")
            this.socket.disconnect()
            this.socket.close()
            this.socket = null
        }
    }

    handleTaskRequest = (config) => {
        if (config.task) {
            let task = config.task
            console.log('task', task);
            if (!Array.isArray(task)) {
                task = [config.task]
            }
            store.dispatch(actions.appendInbox(task, 'tasks'))
        }
        else {
            if (!Array.isArray(config)) {
                config = [config]
            }
            store.dispatch(actions.appendReservation(config))
        }
    }
    inboxUpdated = (config) => {
        console.log('inbox is ', config)
        if (!Array.isArray(config)) {
            config = [config]
        }
        store.dispatch(actions.updateInbox(config))
    }
    handleNewTask = (config) => {
        console.log('task', config)
        store.dispatch(actions.appendTask([config]))
    }
    taskUpdated = (config) => {
        console.log('task', config)
        console.log('updated task')
        if (!Array.isArray(config)) {
            config = [config]
        }
        store.dispatch(actions.updateTask(config))
    }
    messengerUpdated = (config) => {
        console.log('messenger0000', config)
        if (!Array.isArray(config)) {
            config = [config]
        }
        store.dispatch(actions.updateMessengers(config))
    }
    handleNotif = (config) => {
        console.log(config)
        store.dispatch(actions.updateActions(config))
    }

    async initSocket() {
        console.log("INITSOCKET")

        // store.dispatch(store.dispatch)
        // console.log(store.dispatch())
        // console.log(store.getState())

        this.closeSocket()

        // if (!openSocket) {
        this.openSocket = true

        let token = await getToken()

        const opts = {
            'path': '/users',
            'reconnection': true,
            'reconnectionDelay': 3000,
            'reconnectionDelayMax': 5000,
            'reconnectionAttempts': 5,
            // 'pingTimeout': 5000,
            // 'pingInterval': 8000,
            // secure: true, reconnection: true, rejectUnauthorized: false,
            // transport : ['websocket'] ,
            // transports: ['websocket', 'polling', 'flashsocket'],
            // transports: ['websocket'], upgrade: false,
            extraHeaders: {
                'authorization': 'bearer ' + token,
            },
        }

        this.socket = io(siteConfig.socketDomain, opts);

        this.socket.on("connect", () => {
            console.log(this.socket.id);
            store.dispatch(actions.changeSetting('socketStatus', true))
            this.initTopic()
        });

        this.socket.on("message", (message, cb) => {
            console.log(message);
            if (cb) {
                cb('OK!!!')
            }
        });

        this.socket.on("disconnect", () => {
            console.log("DISCONNECT"); // undefined
            store.dispatch(actions.changeSetting('socketStatus', false))
            this.disconnected = true

        })

        this.socket.on('reconnect', () => {

            setTimeout(() => {
                if (!this.socket.connected) {
                    store.dispatch(actions.changeSetting('socketStatus', 'connecting'))
                }
            }, 5000);


            // console.log("reconnect"); // undefined
        })

        this.socket.on('connecting', function () {
            console.log("SOCKET connecting")
            setTimeout(() => {
                if (!this.socket.connected) {
                    store.dispatch(actions.changeSetting('socketStatus', 'connecting'))
                }
            }, 5000);

        });




        this.socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        })

        this.socket.on("logout", (cb) => {
            console.log("FORCE LOG OUT")
            // store.dispatch(actions.logoutUser())
            // store.dispatch(actions.addNotif({ type: 'error', title: '{{lang}}errors.forceLogout', description: '{{lang}}errors.forceLogoutDesc' }))
            // setTimeout(() => {
            //     window.location = pathMaker('/login')
            // }, 500);
            cb("OK")
        })



        this.socket.on("changeBalance", (message) => {
            // console.log("changeBalance")
            store.dispatch(actions.changeBalance(message))

        })

        this.socket.on("changebalance", (message) => {
            // console.log("changeBalance")
            store.dispatch(actions.changeBalance(message))

        })







        this.socket.on("updateTopic", (message) => {
            console.log("updateTopic")
            console.log(this.acticeTopics)
            console.log(message)
            console.log(message.type + '-' + message.id)
            if (this.acticeTopics[message.type + '-' + message.id] && this.acticeTopics[message.type + '-' + message.id].modules) {
                // console.log(this.acticeTopics[message.type + '-' + message.id].updateFunction);
                Object.values(this.acticeTopics[message.type + '-' + message.id].modules).forEach(module => {

                    module.updateFunction(message.data)

                });
            }

        });





        this.socket.on("newMsg", (info) => {


            let message = info?.message
            console.log('info is', info)
            let myId = store.getState()?.user?.info?._id
            if (info.messenger) {
                console.log('here')

                let name = info.messenger?.name
                if (!name) {
                    info.messenger.users.forEach(element => {
                        console.log('elementss', element)
                        let userElement = typeof element == Object ? element._id : element
                        if (userElement != myId) {
                            name = element.fullname
                        }

                    })
                }
                info.messenger["**name"] = name
                let messenger = info.messenger
                if (!Array.isArray(messenger)) {
                    messenger = [messenger]
                }
                if (info.message?.type != 'action') {
                    store.dispatch(actions.addMessengers(messenger))
                }
                else {
                    if (info?.message) {

                        let message = info.message
                        if (!Array.isArray(message)) {
                            message = [message]
                        }
                        console.log('new messenger', info.messenger)
                        console.log('new message', message)
                        store.dispatch(actions.updateMessages(info.messenger._id, message))
                    }
                }
            }

            if (info?.socket != this.socket.id) {
                if (info.message?.type != 'action' && info.message?.type != 'systeminfo') {
                    store.dispatch(actions.appendMessages(message.messenger, [message]))
                    if (myId != message?.sender) {
                        store.dispatch(actions.addNotification(message.messenger))
                    }
                }
            }
        });
        this.socket.on('newInbox', this.handleTaskRequest)
        this.socket.on('inboxUpdated', this.inboxUpdated)
        this.socket.on("newTask", this.handleNewTask)
        this.socket.on('approvedTaskFeedback', this.taskUpdated)
        this.socket.on('messengerUpdated', this.messengerUpdated)
        this.socket.on('useNotif', this.handleNotif)
        this.socket.on("msgSeen", (info) => {
            // console.log("msgSeen")
            // console.log(info)
            store.dispatch(actions.messageSeen(info?.messenger, info?.message))

        });


        // socket.emit('heartbeat', 'alive', () => {
        //     console.log("FEEDBACK")
        // })
        // socket.emit('heartbeat', { name: 'alive' })


        // }

    }


}




// function sendHeartBeat() {

//     setTimeout(() => {
//         // console.log("EMIT")
//         socket.emit('heartbeat', 'alive', () => {
//             console.log("FEEDBACK")
//         })
//         sendHeartBeat()
//     }, 1000);
// }


// function getMessengers(isUpdating, cb) {
//     store.dispatch(actions.changeSetting('socketStatus', "updading"))
//         // this.setState({ isLoading: true })
//     console.log("ISUPDATING")
//     HttpService.request('getMessengers', { isUpdating }, (fetchResult, fetchError) => {
//         // console.warn(fetchError)
//         store.dispatch(actions.changeSetting('socketStatus', false))

//         // console.warn(fetchResult)

//         // this.setState({ isLoading: false })

//         if (fetchError) { this.setState({ error: fetchError.message }); return }

//         store.dispatch(actions.addMessengers(fetchResult.info, true)) //.then(()=>{

//         if (fetchResult.messages) {
//             for (const [key, value] of Object.entries(fetchResult.messages)) {
//                 store.dispatch(actions.addMessages(key, value))
//             }
//         }

//         setTimeout(() => {
//             fetchResult.info.forEach(messenger => {
//                 // console.log("TRY")
//                 messenger.participants.forEach(participant => {
//                     if (participant === userId) {
//                         // console.warn("CHANGE")
//                         store.dispatch(actions.changeLastSeen(messenger._id, (messenger.lastSeen ? messenger.lastSeen[participant] : null)))
//                     }
//                 });
//             })
//         }, 500);



//     });

//     // })



//     // this.setState({ data: fetchResult.info })
//     // })
// }



// })


// const mapStateToProps = state => ({ settings: state.settings, user: state.user, resource: state.resource });
// const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

// export const mysocket = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(socket);

// export const myinitSocket = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(initSocket);



// export { socket, initSocket, closeSocket, addTopic, removeTopic }
export default new SocketServices();