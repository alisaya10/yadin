import React from "react";
// import { siteConfig, siteTheme } from "../../../variables/config";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import { nanoid } from "nanoid";
import Loader from 'react-loader-spinner'
import { checkTranslation, imageAddress, nameShortener, sizeConvertor, translate } from "../../utils/useful";
import moment from 'jalali-moment'
import HttpServices from "../../utils/Http.services";
// import FormViewer from "../../FormViewer";
import { getBoundingClientRect } from "../../utils/functions";
import MessengerAttachments from "./MessengerAttachments";
import Dropzone from "react-dropzone";
import MessengerDropModal from "./MessengerDropModal";
import StickersView from "./StickersView";
import Modal from "../Modal";
import FormViewer from "../FormViewer-new";
import MessageNoMoreMessage from "./MessageNoMoreMessage";
import MessageBox from "../boxes/MessageBox";
import socketServices from "../../utils/socket.services";
// import store from '../../stores/storeConfig';


class MessengerView extends React.Component {

    state = {
        text: '',
        messengerId: nanoid(),
        topicId: nanoid(),
        headers: [
            { key: 'name', type: 'TextInput', col: '12', information: { label: '{{lang}}Name', placeholder: '{{lang}}Name', required: true } },
            { key: 'phone', type: 'TextInput', col: '12', information: { label: '{{lang}}Phone', placeholder: '{{lang}}Phone', required: true }, showMain: false },

        ],
        inputHeight: 37,
        visibleList: {},

        attachmentsList: [
            { name: 'Album', icon: '/assets/icons/useful/album.svg', function: null },
            { name: 'File', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Camera', icon: '/assets/icons/useful/camera.svg', function: null },
            { name: 'Command', icon: '/assets/icons/useful/command.svg', function: null },

            { name: 'Location', icon: '/assets/icons/useful/location.svg', function: null },
            { name: 'Contact', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Form', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Drive', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Task', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Reminder', icon: '/assets/icons/useful/reminder.svg', function: null },
            { name: 'Calendar', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Room', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Format', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Products', icon: '/assets/icons/useful/save.svg', function: null },
            { name: 'Applets', icon: '/assets/icons/useful/save.svg', function: null },


        ],
        messengerInformation: false,
        header: [
            { key: 'users', type: 'GlobalUserMultiInput', information: { label: '{{lang}}Add Hubs', address: 'searchUser', filter: {}, fields: { title: 'fullname', description: 'username', value: '_id', image: 'image' }, type: 'api', isSearchable: true, placeholder: '{{lang}}select', required: false, } },
            // { key: 'assignee', type: 'MultiSelectInput', information: { label: '{{lang}}Assignee', address: 'searchUser', filter: {}, fields: { title: 'fullname', description: 'username', value: '_id', image: 'image' }, type: 'api', isSearchable: true, placeholder: '{{lang}}select', required: false, } },
        ],
        // isLoading: true,
        parents: {},
        messengerName: '',
        messengerUsers: [],
    }

    componentDidMount() {
        console.log('messengerView2131')
        this.init()
        this.checkParent()
        this.setMessengerInfo()
        window.addEventListener('resize', this.updateWidth)

    }
    componentWillUnmount = () => {
        this.unSubscribeTopic()
    }
    convertDate = (status, cb) => {
        if (status?.la) {
            console.log(status.la)
            console.log(moment(new Date()).valueOf())
            // let date = moment.unix(status.la).format('MM/DD/YYYY')
            let date = moment(Number(status.la)).format("MM/DD/YYYY")

            status.la = date
            cb(status)
        }
    }
    getOnlineStatus = (hub, cb, time = 1, tryTime = 0) => {
        console.log('getOnlineStatus')
        setTimeout(() => {

            if (socketServices.socket?.connected) {
                if (hub) {
                    console.log('000000000')
                    socketServices.emit('getHubStatus', { hub: hub }, null, (info, err) => {
                        this.convertDate(info, (status) => {

                            this.setState({ hubStatus: status }, () => {
                                console.log('hubstatus is ', this.state.hubStatus)
                                cb()
                            })
                        })
                    })
                }
                else {
                    console.log('onelse')
                    cb()
                }
            }
            else {
                if (tryTime < 10) {
                    this.getOnlineStatus(hub, cb, time + 5, tryTime + 1)
                }
            }
        }, time * 1000);

    }
    unSubscribeTopic = () => {
        let hub
        if (this.props.messenger) {
            for (let i = 0; i < this.props.messenger.intractiveUsers?.length; i++) {
                if (this.props.messenger.intractiveUsers[i].hub != this.props.user?.info?._id) {
                    hub = this.props.messenger.intractiveUsers[i].hub
                }
            }
        }
        else if (this.props.potentialUser) {
            hub = this.props.potentialUser?.creator
        }
        if (hub) {
            socketServices.removeTopic(this.state.topicId, this.props.user?.info?._id, 'user:' + hub, null)
        }
    }
    checkParent = () => {
        console.log('check parent', this.props.messenger)
        if (this.props.messenger) {
            let parents = []
            for (let i = 0; i < this.props.messengers.list.length; i++) {
                if (this.props.messengers.list[i]?.parent == this.props.messenger._id) {
                    if (parents.length == 0) {
                        parents.push(this.props.messenger)
                    }
                    parents.push(this.props.messengers.list[i])

                }

            }
            this.setState({ parents }, () => {
                console.log('parents--', this.state.parents)
                this.setState({ isLoading: false })
            })

            console.log(this.props.messengers.list)

            // for (let i = 0; i < array.length; i++) {
            //     const element = array[i];

            // }

            // HttpServices.request('getParents', { _id: this.props.messenger._id }, (fetchResult, fetchError) => {
            //     if (fetchError) {
            //         return
            //     }
            //     let parents = this.state.parents
            //     if (!parents[this.props.messenger]) {
            //         console.log('parents this.props.messenger', this.props.messenger)
            //         parents[this.props.messenger._id] = []
            //     }
            //     parents[this.props.messenger._id] = fetchResult.info
            //     this.setState({ parents }, () => {
            //         console.log('parents', this.state.parents)
            //         this.setState({ isLoading: false })
            //     })
            // })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.messenger?._id !== prevProps.messenger?._id) {
            console.log(this.props.messenger?._id)
            console.log(prevProps.messenger?._id)
            console.log('updated1')
            console.log('messengerView2131')


            // return
            this.init()
            this.checkParent()
            this.subscribeTopic()

            this.setMessengerInfo()
        }

        if (this.props.potentialUser !== prevProps.potentialUser) {
            console.log('updated2')

            // this.checkParent()

            this.subscribeTopic()

            this.setMessengerInfo()
        }

        // console.log(prevProps.messengers?.object[prevProps.messenger?._id]['*lastMsg']?._id)
        // console.log(this.lastMsg)
        if (prevProps?.messenger) {
            if (!this.props.messengers?.object[prevProps.messenger?._id]?.['*lastMsg']?._id || this.props.messengers?.object[prevProps.messenger?._id]?.['*lastMsg']?._id != this.lastMsg) {
                if (this.props.messengers?.object[prevProps.messenger?._id]) {
                    this.lastMsg = this.props.messengers?.object[prevProps.messenger?._id]['*lastMsg']?._id
                }

                if (this.messagesContainer && (this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight < 250)) {
                    this.scrollToBottom(true)  // SHOULD ADD
                }

            }
        }


    }
    subscribeTopic = () => {
        let hub
        if (this.props.messenger) {
            for (let i = 0; i < this.props.messenger.intractiveUsers?.length; i++) {
                if (this.props.messenger.intractiveUsers[i].hub != this.props.user?.info?._id) {
                    hub = this.props.messenger.intractiveUsers[i].hub
                }
            }

        }
        else if (this.props.potentialUser) {
            hub = this.props.potentialUser?.creator
        }
        if (hub) {
            console.log('user:' + hub)
            socketServices.addTopic(this.state.topicId, hub, 'user', null, this.updateStatus)
            this.getOnlineStatus(hub, () => {

            })

        }

        console.log('variables', this.props.messenger)
        console.log('poten', this.props.potentialUser?.creator)
        // console.log('',this.props.potentialUser)

    }
    openUserInfo = (item) => {
        this.setState({ userInfo: item }, () => {
            this.userInfoModal.showModal()
        })
    }
    // removeUser = (item) => {
    //     console.log('done', item)
    //     HttpServices.request('removeUser', item, (fetchResult, fetchError) => {
    //         if (fetchError) {
    //             return
    //         }
    //         let userInfo = this.state.userInfo
    //         let currentMessenger = this.state.currentMessenger
    //         userInfo = {}
    //         currentMessenger = {}
    //         this.setState({ userInfo, currentMessenger })
    //     })
    // }
    checkIfMessengerExists = (time, tryTime) => {

        console.log("checkIfMessengerExists")
        console.log(this.props.messenger)
        console.log(this.props.potentialUser)
        if (!this.props.messenger && this.props.potentialUser) {


            if (time == null) {
                time = 0
            }

            setTimeout(() => {


                if (socketServices.socket?.connected) {


                    let potentialApplet = typeof this.props.potentialUser == Object ? this.props.potentialUser._id : this.props.potentialUser
                    let userApplet = this.props.currentApplet
                    console.log("Socket.emit")
                    socketServices.emit('checkIfMessengerExists', { userApplet, potentialApplet }, null, (info, err) => {

                        console.log("checkIfMessengerExists")
                        console.log(info)

                        // return
                        if (info.messenger) {

                            actions.addMessengers(info.messenger)
                            setTimeout(() => {
                                this.props.setMessenger(info.messenger, () => {

                                })
                            }, 50);
                        }
                    })

                } else {

                    if (tryTime < 10) {
                        this.checkIfMessengerExists(time + 5, tryTime + 1)
                    }
                }

            }, time * 1000);

        }


    }


    scrollChanged = (e) => {

        if (this.messagesContainer && (this.messagesContainer.scrollTop < 200 && this.messagesContainer.scrollTop >= -1 && !this.state.isOnLast && !this.state.isLoadingInfo)) {

            if (this.messagesContainer.scrollTop < 1) {
                this.messagesContainer.scrollTo({ top: 1, behavior: 'auto' })
            }

            this.fetchData()


        }

    }




    setMessengerInfo = () => {
        console.log('setMessengerInfo')
        let messenger = this.props.messenger
        let potentialUser = this.props.potentialUser
        let myId = this.state.myId
        if (this.props.isApplet == true) {
            myId = this.props.variables?.appletHub?._id

        }
        else {
            myId = this.props.user?.info?._id
            console.log(myId)
        }
        this.setState({ myId }, () => {

            let messengerInfo = {}
            let chatUsers = {}

            if (!messenger) {
                if (potentialUser) {
                    console.log('step2', potentialUser)
                    messengerInfo = {
                        name: potentialUser?.fullname ? potentialUser?.fullname : potentialUser?.hub?.fullname,
                        type: potentialUser?.type ? potentialUser?.type : potentialUser?.hub?.type,
                        role: potentialUser?.role ? potentialUser?.role : potentialUser?.hub?.role,
                        image: potentialUser?.image ? potentialUser?.image : potentialUser?.hub?.image,
                    }
                    console.log('messenger info', messengerInfo)
                }
            } else {

                let users = messenger.users
                let user
                users?.forEach(element => {
                    let userElement = typeof element == Object ? element._id : element
                    if (userElement != myId) {
                        user = element
                    }
                    chatUsers[element._id] = element
                })

                if (messenger.type == 'group') {
                    messengerInfo = {
                        name: messenger.name,
                        type: messenger.type,
                        role: messenger.role,
                        image: messenger.image,
                    }
                }

                if (messenger.type != 'group') {



                    messengerInfo = {
                        name: user?.fullname,
                        type: user?.type,
                        role: user?.role,
                        image: user?.image,
                    }
                }


            }





            this.setState({ myId, messengerInfo, chatUsers }, () => {
                this.checkIfMessengerExists()
            })
        })

    }





    init() {
        console.log("INIT")
        console.log(this.props.messenger)
        if (!this.props.isApplet && !this.props.messenger) {
            this.props.setMessenger()
        }
        if (this.props.isApplet) {
            this.props.selectApplet(this.props.variables?.applet?._id)
        }
        this.setData()

        this.visibleList = {}
        if (this.props.messenger) {

            if (!this.props.messengers?.object || !this.props.messengers?.object[this.props.messenger?._id]) {
                this.props.actions.addMessengers([JSON.parse(JSON.stringify(this.props.messenger))])
            }
            this.messagesContainer.removeEventListener('scroll', this.scrollChanged)
            this.messagesContainer.addEventListener('scroll', this.scrollChanged)

            this.setState({ showNewMessagesBox: null, data: [], currentPage: 0, totalCount: null, filter: null, isOnLast: false }, () => {
                let scrollToBottom = true
                let newMessagesCount = this.props.messengers.notifications[this.props.messenger?._id]
                if (newMessagesCount && newMessagesCount != 0) {
                    this.setState({ showNewMessagesBox: this.props.messenger.alastSeen })
                    // console.log("showNewMessagesBox")
                    // console.log(this.props.messenger.lastSeen)
                    scrollToBottom = false
                } else {
                    this.scrollToBottom()
                }
                this.fetchData(true)
            })
        }
    }

    updateStatus = (statusInfo) => {
        this.convertDate(statusInfo, (status) => {
            this.setState({ hubStatus: status })
            console.log('pppppppppp', status)
        })
    }





    fetchData = (init) => {

        let item = this.props.messenger
        console.log('prop messenger', this.props.messenger)

        let time = new Date().getTime()

        // console.log("fetchData")
        if (item && !this.state.isLoadingInfo && !this.state.isOnLast) {


            let body = { messenger: item._id }

            if (this.props.messengers?.messages[this.props.messenger?._id]) {
                let lng = this.props.messengers?.messages[this.props.messenger?._id]?.length
                // console.log(lng)
                if (lng) {
                    body.lastMsg = this.props.messengers?.messages[this.props.messenger?._id][lng - 1]
                    // console.log(body.lastMsg)
                }
            }


            if (body.lastMsg?._id) {
                body.lastMsg = body.lastMsg._id
            }

            if (typeof body.lastMsg != 'object') {


                this.setState({ isLoadingInfo: true, oneDataList: [] })
                console.log(body)

                HttpServices.request('getMessengerMessages', body, (fetchResult, fetchError) => {

                    console.log('==============================')
                    console.log(fetchResult)

                    let timer = 600 - (new Date().getTime() - time)
                    if (timer < 0 || init) {
                        timer = 0
                    }

                    if (this.messagesContainer.scrollTop < 1 && !init) {
                        this.messagesContainer.scrollTo({ top: 1, behavior: 'auto' })
                        // console.log("TP1")
                    }

                    setTimeout(() => {

                        if (this.messagesContainer.scrollTop < 1 && !init) {
                            this.messagesContainer.scrollTo({ top: 1, behavior: 'auto' })
                            // console.log("TP2")

                        }

                        this.setState({ isLoadingInfo: false }, () => {
                        })

                        if (fetchError) {
                            // console.log("errors.loadDataFailed!!")
                            this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                            return
                        }


                        let NewBottomHeight = this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop //- this.messagesContainer.offsetHeight



                        this.props.actions.appendMessages(item._id, fetchResult.info)


                        let newHeight = this.messagesContainer.scrollHeight

                        this.messagesContainer.scrollTo({ top: newHeight - NewBottomHeight, behavior: 'auto' })

                        if (!fetchResult.info || fetchResult.info.length < 20) {

                            this.setState({ isOnLast: true }, () => {
                                newHeight = this.messagesContainer.scrollHeight
                                this.messagesContainer.scrollTo({ top: newHeight - NewBottomHeight, behavior: 'auto' })

                            })
                        }

                        if (init || this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight < 250) {
                            this.scrollToBottom()

                            setTimeout(() => {
                                this.scrollToBottom()
                            }, 5);
                        }


                    }, timer);


                })
            }

        }

    }



    updateInput = (element) => {

        let shadow = this.inputShadow
        console.log(element)
        this.setState({ text: element.value }, () => {
            // console.log('---messenger ',this.props.messenger)
            // this.sendNotifToServer(this.props.messenger._id)
            shadow.style.height = 'inherit';
            shadow.style.height = (shadow.scrollHeight) + "px";

            let height = getBoundingClientRect(shadow).height
            if (!element.style) {
                element.style = {}
            }
            element.style.height = height + 'px'
            this.setState({ inputHeight: height })
            if (this.state.text && this.props.messenger) {
                this.props.sendNotif('isTyping', true, this.props.messenger._id, () => {
                    console.log('done')
                })
            }
            else if (!this.props.text && this.props.messenger) {
                this.props.sendNotif('isTyping', false, this.props.messenger._id, () => {
                    console.log('done')
                })
            }
        })

    }

    sendFileMessage = (files, key) => {


        console.log("hi")

        console.log(files)
        for (let i = 0; i < files.length; i++) {
            const file = files[i];



            let myKey = key
            if (key == 'album') {

                if (file.type.startsWith('image')) {
                    myKey = 'image'
                }

                if (file.type.startsWith('video')) {
                    myKey = 'video'
                }

                // console.log(file)
                // console.log(myKey)

                // return
            }


            let rawmessage = {
                key: myKey,
                tempFile: file,
                // ['temp-' + myKey]: file,
            }

            console.log("key")
            console.log(key)


            this.createMessage(rawmessage, (message) => {

                this.props.actions.addMessages(this.props.messenger?._id, [message])
                HttpServices.addUploadQueque(file, { messenger: this.props.messenger?._id, type: 'message', key: myKey }, message.tempId)

                this.scrollToBottom(true)

            })


        }

    }

    sendTextMessage = () => {

        let rawmessage = {
            text: this.state.text,
        }

        this.setState({ text: '' }, () => {

            this.inputShadow.style.height = 'inherit'
            this.input.style.height = 'inherit';



            console.log('rawMessage', rawmessage)
            this.input.focus()

            this.createMessage(rawmessage, (message) => {
                this.sendMessageToServer(message)
            })

        })
    }

    createMessage = (rawmessage, cb) => {
        console.log("createMessage")
        console.log(this.props.messenger)
        if (this.props.messenger) {
            console.log('second')

            const timezoneOffset = (new Date()).getTimezoneOffset();
            console.log('++myId++', this.state.myId)
            let message = {
                sender: this.state.myId,
                senderHub: this.props.variables?.appletHub._id,
                applet: this.props.currentApplet ? this.props.currentApplet : this.props.variables?.applet?._id,
                messenger: this.props.messenger?._id,
                tempId: nanoid(),
                status: 0,
                cDate: new Date().getTime(),
                tz: timezoneOffset,
                trashed: false
            }

            message = { ...message, ...rawmessage }
            cb(message)

        } else {
            this.requestCreateMesseger(0, 1, rawmessage, (info) => {
                console.log('first')
                this.createMessage(rawmessage, cb)
            })
        }

    }

    sendMessageToServer = (message) => {

        console.log(message)
        console.log("sendMessageToServer")
        console.log(this.props.messenger?._id)

        this.props.actions.addMessages(this.props.messenger?._id, [message])

        socketServices.sendMessage(this.props.messenger?._id, message)
        // this.props.sendNotif('isTyping', false, this.props.messenger._id, () => {
        //     console.log('done')
        // })
        this.scrollToBottom(true)

    }


    requestCreateMesseger = (time, tryTime, message, cb) => {
        console.log("requestCreateMesseger")
        setTimeout(() => {
            console.log(socketServices.socket)
            if (socketServices.socket?.connected) {
                socketServices.emit('createMesseger', { userApplet: this.props.currentApplet, potentialApplet: this.props.potentialUser?._id }, null, (info, err) => {

                    if (info.messenger) {
                        let name = info.messenger?.name
                        if (!name) {
                            info.messenger.users.forEach(element => {
                                if (element._id != this.state.myId) {
                                    name = element.fullname
                                }

                            })
                        }
                        info.messenger["**name"] = name
                        let messenger = info.messenger
                        if (!Array.isArray(messenger)) {
                            messenger = [messenger]
                        }
                        console.log('final info', info.messenger)
                        this.props.actions.addMessengers(messenger)

                        setTimeout(() => {
                            this.props.setMessenger(info.messenger, () => {
                                console.log('done true')
                                cb()
                            })
                        }, 50);

                    } else {
                        this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.failedToSendDate', description: "Failed" })
                    }
                });
            } else {
                if (tryTime < 10) {
                    this.requestCreateMesseger(time + 5, tryTime + 1, message)
                }
            }

        }, time * 1000);
    }

    submitForm = () => {
        console.log('submit FORM')
        let data = this.form.getForm()
        if (data) {
            this.requestCreateMesseger(0, 1, data, (info) => {

                let form = {}

                for (const [key, value] of Object.entries(data)) {

                    let label = ''
                    this.state.headers.forEach(header => {
                        if (header.key == key) {
                            label = header.information.label
                        }
                    });
                    form[key] = { key, value, label }
                }
                let message = { form }
                this.createMessage(message)

            })

        }
    }











    onViewableItemsChanged = (msg, isIntersecting, top) => {

        console.log("onViewableItemsChanged")
        console.log(msg)
        console.log(isIntersecting)

        // let toppestDate = this.state.toppestDate
        let id = msg?._id ?? msg?.tempId

        if (!isIntersecting) {
            delete this.visibleList[id]
        } else {
            this.visibleList[id] = msg
        }
        let toppestDate = this.state.toppestDate
        let newDate
        let newDataObj
        console.log('visibleList', this.visibleList)
        Object.values(this.visibleList).forEach(element => {
            // console.log(new Date(element.cDate).getTime() < new Date(newDate).getTime())

            if (element && (new Date(element.cDate).getTime() < new Date(newDate).getTime() || !newDate)) {
                newDate = new Date(element.cDate).getTime()
                newDataObj = element
            }
        });
        // console.log(msg.text)
        // console.log(isIntersecting)
        // console.log(this.visibleList)
        if (newDate != toppestDate) {
            // console.log(newDataObj)
            this.setState({ toppestDate: newDate })

        }

        if (newDataObj) {
            // setTimeout(() => {
            let newObjectId = newDataObj?._id ?? newDataObj?.tempId
            let result = this.isInViewport(newObjectId)
            console.log('result is ', result)
            if (!result) {
                // console.log(result)
                // console.log(newDataObj.text)
                delete this.visibleList[newObjectId]
                // setTimeout(() => {
                this.onViewableItemsChanged(newDataObj, false)
                // }, 2000);
            }

            // }, 1);

        }

        // console.log(this.visibleList)






        // this.visibleList[]
        // console.log(msg)
        // console.log(msg.text)
        // console.log(top)

        // if (!toppestDate || top) {
        //     this.setState({ toppestDate: msg.cDate })
        // }


        console.log('isIntersecting',isIntersecting)
        // console.log(this.state.myId)
        // console.log(msg.status)

        if (isIntersecting && (this.state.myId)) {
            // viewableItems.forEach(viewableItem => {
            // if (msg.myId != this.state.myId && msg.status != 2) {
            // console.log("onViewableItemsChanged")
            // console.log(msg.isApplet)
            // console.log(msg.status)
            if ((msg.sender != this.state.myId && msg.status != 2) || (msg?.type == 'action' || msg?.type == 'system')) {

                // console.log(msg.text)
                // this.props.actions.c
                this.changeMessageToSeen(msg.messenger, msg._id, msg.sequence)
            }
            // console.log("tempLastSeen")
            // console.log(this.tempLastSeen)
            // console.log(viewableItem.item)
            if (!this.tempLastSeen || (this.tempLastSeen < msg._id)) {
                // UPDATE MESSENGER LAST SEEN
                this.tempLastSeen = msg._id
                // console.log("SHOULD UPDATE")
                this.updateLastSeenOnServer(msg._id)
            }
            // });
        }
        // console.log(viewableItems)
        // viewableItems will show you what items are in view
    }


    // onViewableItemsChanged = ({ viewableItems }) => {
    //     if (this.state.myId) {
    //         viewableItems.forEach(viewableItem => {
    //             if (viewableItem.item.myId != this.state.myId && viewableItem.item.status != 2 && viewableItem.item._id) {
    //                 // console.log(viewableItem.item.text)
    //                 // this.props.actions.c
    //                 this.changeMessageToSeen(viewableItem.item._id)
    //             }
    //             console.log("tempLastSeen")
    //             console.log(this.tempLastSeen)
    //             console.log(viewableItem.item)
    //             if (!this.tempLastSeen || (this.tempLastSeen < viewableItem.item._id) && viewableItem.item._id) {
    //                 // UPDATE MESSENGER LAST SEEN
    //                 console.log("SHOULD UPDATE")
    //                 this.updateLastSeenOnServer(viewableItem.item._id)
    //             }
    //         });
    //     }
    //     // console.log(viewableItems)
    //     // viewableItems will show you what items are in view
    // }


    isInViewport(id, offset = 0) {
        if (!id) return false;
        let element = document.getElementById("msg-" + id)
        let messageContainerTop = getBoundingClientRect(this.messagesContainer).top

        // console.log(element)
        if (element) {
            const top = element.getBoundingClientRect().top;
            // console.log(top)
            // console.log(messageContainerTop)
            return (top - offset) >= (messageContainerTop - 30);
        }

    }


    changeMessageToSeen(messengerId, messageId, sequence) {
        // let messengerId = this.props.route?.params?.id
        // console.log("changeMessageToSeen")
        this.props.actions.changeMessage(messengerId, messageId, { status: 2 })
        this.props.actions.changeLastSeen(messengerId, messageId, sequence, this.state.myId)
        this.sendSeenToServer(messengerId, messageId, sequence)
    }

    sendSeenToServer = (messengerId, messageId, sequence) => {
        // console.log("sendSeenToServer")
        if (socketServices.socket?.connected) {
            socketServices.emit('messageSeen', { messengerId, messageId, sequence }, null, (ok, err) => {
                console.log("messageSeen")
            });
        } else {
            setTimeout(() => {
                this.sendSeenToServer(messengerId, messageId, sequence)
            }, 2000);
        }

    }


    updateLastSeenOnServer = (time, tryTime, messageId, messengerId) => {
        console.log('updateLastSeenOnServer')
        setTimeout(() => {
            if (socketServices.socket?.connected) {

                socketServices.emit('messegerSeenUpdate', { messengerId, messageId }, null, (ok, err) => {
                })

            } else {
                if (tryTime < 10) {
                    this.updateLastSeenOnServer(time + 5, tryTime + 1, messageId, messengerId)
                }
            }

        }, time * 1000);
    }
    // sendNotifToServer = (messengerId) => {
    //     console.log('oo', messengerId)
    //     if (Socket.socket?.connected) {
    //         Socket.emit('notif', { type: 'isTyping', messengerId }, null, (ok, err) => {
    //         });
    //     } else {
    //         setTimeout(() => {
    //             this.sendNotifToServer(messengerId)
    //         }, 2000);
    //     }
    // }



    scrollToBottom = (smooth) => {
        console.log("scrollToBottom")
        // console.log(this.messagesContainer.scrollTop)
        // console.log(this.messagesContainer.scrollHeight)
        setTimeout(() => {
            // console.log(this.messagesContainer)
            // console.log(this.messagesContainer.scrollHeight)
            if (this.messagesContainer) {
                this.messagesContainer.scrollTo({ top: (this.messagesContainer.scrollHeight + 100), behavior: smooth ? 'smooth' : 'auto' })
            } else {
                this.scrollToBottom()
            }
        }, 1);
        // this.messagesEndRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    newMessages() {
        return (
            <div ref={el => this.newMessagesBox = el}>
                <p className="text-center text-smaller w-100 py-1 mt-3" style={{ backgroundColor: '#fff', color: '#789', borderRadius: 4 }}>{this.props.messengers.notifications[this.props.messenger?._id] != 0 ? this.props.messengers.notifications[this.props.messenger?._id] : ''} New Messages</p>
            </div>
        )
    }

    showAttachments = (status) => {
        if (this.MessengerAttachments) {
            this.MessengerAttachments.showAttachments(status)
        }
    }

    showDropZone = (e, type) => {
        // console.log(type)
        this.showDropZoneTime = new Date().getTime()
        // console.log("showDropZone")
        let messenger = this.props.messenger
        let potentialUser = this.props.potentialUser

        if ((messenger || potentialUser) && !this.state.showDropZone) {
            this.onFilesOver(e)
        }
    }



    onFilesOver = (e) => {
        let showCompressionOption = false
        let showDropZone = false
        // console.log(e)
        // console.log(e.nativeEvent.dataTransfer)
        // console.log(e.nativeEvent.dataTransfer.items)
        // console.log(e.nativeEvent.dataTransfer.files)
        // console.log(e.nativeEvent.dataTransfer.types)

        // console.log(e.dataTransfer.items.item)
        // console.log(e.dataTransfer.files.item)
        // console.log(e.dataTransfer.types)

        if (e.dataTransfer?.items) {
            showDropZone = true
            Object.values(e.dataTransfer.items).forEach(element => {
                if (element.type.startsWith('image/') || element.type.startsWith('video/')) {
                    showCompressionOption = true
                }
                if (element.type.startsWith('text/uri-list')) {
                    showDropZone = false
                }
                console.log(element.type)

            });
        }

        // console.log("showCompressionOption:" + showCompressionOption)
        this.setState({ showCompressionOption, showDropZone })
        // console.log(e.dataTransfer?.items[0])
        // console.log(e.dataTransfer?.files)

        // this.hideDropZone()
        // this.MessengerDropModal.showModal(files)
        // this.setState({ droppedFiles: files })
    }


    hideDropZone = () => {
        // console.log("hideDropZone")
        if (this.state.showDropZone) {
            setTimeout(() => {
                let now = new Date().getTime()
                // console.log(this.showDropZoneTime)
                // console.log(now)
                // console.log(now - this.showDropZoneTime)
                if ((now - this.showDropZoneTime) > 95) {
                    this.setState({ showDropZone: false })
                }
            }, 100);
        }
    }


    onDrop = (files, withCompression) => {
        // console.log(files)
        this.hideDropZone()
        this.MessengerDropModal.showModal(files, withCompression)
        // this.setState({ droppedFiles: files })
    }

    passAttachFiles = (files, withCompression) => {
        this.MessengerDropModal.showModal(files, withCompression)
    }

    startRecording = () => {
        this.setState({ showRecording: true })
    }

    showStickersList = () => {

    }

    onStickerSelect = (type, prop) => {
        if (type == 'emoji') {
            let input = this.input
            // input.focus();

            this.insertAtCursor(input, prop.emoji)
            // let sel = document.selection.createRange();
            // sel.text = myValue;

            // console.log(sel)
        }
    }


    insertAtCursor(myField, myValue) {
        let text = this.state.text

        // console.log(myValue)
        // console.log(String(myField.id) != String(document.activeElement.id))
        // if (myField.id == document.activeElement.id) {
        //     console.log("FOCUS")
        myField.focus();
        // }
        // console.log(myField.id)
        // console.log(document.activeElement.id)
        //IE support
        if (document.selection) {
            // myField.focus();
            let sel = document.selection.createRange();
            // sel.text = myValue;
        }
        //MOZILLA and others
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            // console.log(startPos)
            // console.log(endPos)
            // console.log(myField.value.substring(0, startPos))

            text = myField.value.substring(0, startPos)
                + myValue
                + myField.value.substring(endPos, myField.value.length);
        } else {
            text += myValue;
        }

        // console.log(text)

        this.setState({ text }, () => {
            myField.selectionStart = startPos + myValue.length
            myField.selectionEnd = startPos + myValue.length



            // console.log(myField.getSelection())
            // let sel = myField.createRange();
            // sel.selectionStart = startPos+1
            // sel.selectionEnd = startPos+1

            // myField.clearSelection()
            // textArea.current.selectionStart = startPos

            // myField.setSelectionRange(startPos,startPos) //= startPos+1
            // myField.selectionEnd = startPos+1

        })
    }

    onMoreVisibilityChanged = (isIntersecting) => {
        this.setState({ hideToppestDate: isIntersecting })
    }

    openInfoMessenger = () => {
        this.props.setData('messengerInfo', !this.props.messengerInfo)
        // this.setState({ messengerInformation: !this.state.messengerInformation })
    }

    createTopic = (messenger) => {
        let users = []
        let data = {}
        if (this.form1) {
            users = this.form1.getForm()
            data.users = users
        }
        data.topic = this.state.topicName
        data.messenger = messenger
        HttpServices.request('createTopic', data, (fetchResult, fetchError) => {

        })

    }
    setData = () => {
        let messengerName = this.props.messenger?.name
        let messengerUsers = []
        for (let i = 0; i < this.props.messenger?.users?.length; i++) {
            messengerUsers.push(this.props.messenger?.users[i]?.hub?._id)
        }
        this.setState({ messengerName, messengerUsers })
    }
    changeStage = (stage) => {
        this.stageManager.changeStage(stage)
    }
    changeValue = (key, value) => {
        console.log('key', key, 'value', value)
        this.setState({ [key]: value })
    }

    editGroup = (messengerId, info) => {
        console.log('messengerid', messengerId)
        console.log('info', info)
        let data = {}
        data.messengerName = info.name
        data.messengerUsers = info.users
        data._id = messengerId
        HttpServices.request('createGroup', data, (fetchResult, fetchError) => {
            if (fetchError) {
                return
            }
        })
    }
    deleteMessage = (message, messenger, hub, type, cb) => {
        HttpServices.request('deleteMessage', { message, messenger, hub, type }, (fetchResult, fetchError) => {
            console.log('done')
            cb()
        })
    }
    editMessageAction = (item) => {
        this.setState({ onEdit: item }, () => {
        })
    }
    editMessage = (message, messenger, newMsg) => {
        HttpServices.request('editMessage', { message, messenger, newMsg }, (fetchResult, fetchError) => {
            this.setState({ onEdit: null, text: '' }, () => {
                if (fetchError) {
                    console.log(fetchError)
                    return
                }
                // let msg = fetchResult.info
                // if (!Array.isArray(msg)) {
                //     msg = [msg]
                // }
                // store.dispatch(actions.updateMessages(fetchResult.info.messenger, msg))

            })
        })
    }
    render() {
        let hasText = this.state.text && this.state.text != ''


        return (
            <div id={'messenger'} className="messenger flex-column d-flex h-100 window-content-radius" style={{ scrollSnapAlign: 'start', backgroundColor: '#242424', borderRadius: "10px", overflow: "hidden" }} onDragEnter={(e) => this.showDropZone(e, '0')}  >

                {/* {!(this.props.messenger || this.props.potentialUser) && (
                    <div className='text-center w-100' style={{ paddingTop: 100 }}>
                        <img src='/images/nothing.png' width={80} />
                        <p className="mt-2" style={{ fontWeight: 'bold', fontSize: 20 }}>Chat is Not Selected</p>
                        <p className='mt-1' style={{ fontSize: 14 }}>Select a connection to start the chat</p>
                    </div>
                )} */}


                {(this.props.messenger || this.props.potentialUser) && (
                    <>

                        {/* {this.state.parents[this.props.messenger?._id]?.length != 0 && ( */}
                        <>
                            <div ref={el => this.messagesContainer = el} className={"w-100 position-relative m-0 p-0 flex-1"} style={{ overflow: 'auto' }}>



                                <div className="w-100 p-0  detail order-lg-1 order-2 ">





                                    <div className="d-flex flex-column w-100 pb-2" style={{ alignItems: 'flex-end' }}>

                                        <div className="px-3 w-100 h-100 ">
                                            <div className="pb-2 pt-1 w-100 h-100">

                                                {this.props.askForForm && !this.props.messenger && (
                                                    <div className="px-3 py-3" style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                                                        <p className="text-smaller px-1 mb-2">Welcome to bot support service. Please fill in the form below before starting the chat.</p>
                                                        <FormViewer ref={el => this.form = el} headers={this.state.headers} theme={"modern"} inputClass={"modern-input"} />
                                                        <button onClick={() => this.submitForm()} className="white w-100 px-2 py-2 mt-2" style={{ borderRadius: 8, background: 'linear-gradient(to left,#7b00f7,#a912eb)' }}>Start the chat</button>
                                                    </div>
                                                )}

                                                {this.state.isOnLast && (
                                                    <MessageNoMoreMessage onMoreVisibilityChanged={this.onMoreVisibilityChanged} />
                                                )}
                                                {/* {this.state.messengerInformation && (
                                                    // <StagesManager ref={el => this.stageManager = el} fast={true}>
                                                    //     <div stage={0} stageName={'info'} className="w-100 flexcc " style={{ position: 'absolute', left: 0, top: 30, zIndex: '2', }}>
                                                    //         <div className="w-100 px-3 py-3" style={{ backgroundColor: '#fff', }}>
                                                    //             <div className="w-100 px-3 py-3" onClick={() => this.changeStage('createTopic')}>
                                                    //                 <button>
                                                    //                     <p style={{ fontSize: '16px' }}>Create Topic</p>
                                                    //                 </button>
                                                    //             </div>
                                                    //             {(this.props.messenger?.type == 'group' || this.props.messenger?.type == 'support') && (

                                                    //                 <div className="w-100 px-3 py-3" onClick={() => { this.changeStage('editGroup') }}>
                                                    //                     <button>
                                                    //                         <p style={{ fontSize: '16px' }}>Edit Group</p>
                                                    //                     </button>
                                                    //                 </div>
                                                    //             )}
                                                    //         </div>
                                                    //     </div>
                                                    //     <div stage={1} stageName={'createTopic'} className="w-100 flexcc " style={{ position: 'absolute', left: 0, top: 45, zIndex: '2', }}>
                                                    //         <div className="w-100 px-3 py-3" style={{ backgroundColor: '#fff', }}>
                                                    //             <TextInput data={this.state.topicName} changeValue={this.changeValue} header={{ key: 'topicName', information: { rows: 1, placeholder: '{{lang}}Topic Name' } }} />
                                                    //             {this.props.messenger?.type == "group" ? (<FormViewer ref={el => this.form1 = el} headers={this.state.header} inputClass={'modern-input'} />) : ''}
                                                    //             <div onClick={() => this.createTopic(this.props.messenger._id)}>
                                                    //                 <button style={{ backgroundColor: '#00A4bb' }}>
                                                    //                     <p style={{ fontSize: '16px' }}>Submit</p>
                                                    //                 </button>
                                                    //             </div>
                                                    //         </div>
                                                    //     </div>
                                                    //     <EditGroup stage={1} stageName={'editGroup'} messenger={this.props.messenger} editGroup={this.editGroup} openUserInfo={this.openUserInfo} />

                                                    // </StagesManager>
                                                    <GroupInfo />
                                                )} */}

                                                {this.props.messengers.messages[this.props.messenger?._id]?.map((prop, index) => {

                                                    let nextMsg = this.props.messengers.messages[this.props.messenger?._id][index + 1]
                                                    let prevMsg = this.props.messengers.messages[this.props.messenger?._id][index - 1]

                                                    let days
                                                    if (nextMsg) {
                                                        days = (moment(prop.cDate).endOf('day')).diff((moment(nextMsg.cDate).endOf('day')), 'days')
                                                    }
                                                    return (
                                                        <div key={String(prop?._id)}>
                                                            {(days > 0 || !nextMsg) && (
                                                                <div className="w-100 flexcc mt-2">
                                                                    <div className="px-2" style={{ backgroundColor: '#202020', borderRadius: 20, boxShadow: '0px 0px 5px #10101010' }}>
                                                                        <p className="px-2 py-1" style={{ color: "#e0e0e0", fontSize: "12px" }}>{moment(prop.cDate).format('DD MMMM')}</p>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <MessageBox updateInput={this.updateInput} editMessageAction={this.editMessageAction} deleteMessage={this.deleteMessage} chatUsers={this.state.chatUsers} myId={this.state.myId} key={prop._id} data={prop} messenger={this.props?.messenger} onViewableItemsChanged={this.onViewableItemsChanged} />

                                                            {this.state.showNewMessagesBox == prop._id && prop._id != null && (
                                                                this.newMessages()
                                                            )}
                                                        </div>
                                                    )
                                                }).reverse()}
                                                <div className="flexcc w-100 " >
                                                    <Modal ref={el => this.userInfoModal = el} centerMode={true} >
                                                        <div className="flexcc br-10" style={{ backgroundColor: '#fff', }}  >
                                                            <div className="p-2" style={{ backgroundColor: '#F70C0C', cursor: 'pointer', color: '#fff', borderRadius: '5px' }} onClick={() => this.removeUser(this.state.userInfo)}>
                                                                Remove
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </div>
                                                {this.state.isLoadingInfo && (
                                                    <div className="flexcc w-100  " style={{ alignItems: 'center', position: 'absolute', top: 60, zIndex: 0, left: 0 }}>
                                                        <div className="flexcc" style={{ backgroundColor: '#fff', borderRadius: 40, width: 34, height: 34, padding: 4, boxShadow: '0px 0px 10px #10101010' }}>
                                                            <div className="flexcc flex-column loader-container">
                                                                <Loader
                                                                    type="Oval"
                                                                    color="#007aff"
                                                                    height="25"
                                                                    width="25"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div ref={el => this.messagesEndRef = el} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="  w-100 window-content-radius-bottom position-relative" style={{ padding: '6px 0px 6px 0px', position: 'sticky', left: 0, bottom: 0, backgroundColor: '#202020', zIndex: 1 }}>


                                {this.props.messengers.notifications[this.props.messenger?._id] != null && this.props.messengers.notifications[this.props.messenger?._id] != 0 && (
                                    <div onClick={() => this.scrollToBottom()} className="flexcc" style={{ position: 'absolute', top: -37, right: 10, zIndex: 10, backgroundColor: '#fff', borderRadius: 30, padding: '5px 8px', boxShadow: '0px 0px 10px #10101010', width: 32, height: 32 }}>
                                        <div className="flexcc" style={{ position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: -20, backgroundColor: '#007aff', borderRadius: 30, padding: '2px 8px', }}>
                                                <p className="text-smallest white">{this.props.messengers.notifications[this.props.messenger?._id]}</p>
                                            </div>
                                            <img src="/images/nexts.png" className="rotate-90 opacity-5" width={16} />
                                        </div>
                                    </div>
                                )}

                                <div className="flexc w-100">




                                    <div className="w-100 flexc mrd-3 position-relative" style={{ padding: '0px 0px', borderRadius: 8, }}>

                                        {/* <button onClick={() => { this.showAttachments() }} className="px-2 flexcc">
                                            <img src={'/assets/paperclip.svg'} style={{ opacity: 0.5, transition: '0.3s all' }} height={20} />
                                        </button> */}

                                        <div className="position-relative flex-1 flexc">
                                            <div className="position-absolute w-100" style={{ zIndex: -1, bottom: 0 }}>
                                                <textarea ref={el => this.inputShadow = el} rows={1} value={this.state.text} className="w-100 mt-0" style={{ opacity: 0, padding: '8px 20px', outline: 'none', resize: 'none', border: 'none', backgroundColor: 'transparent', fontSize: 14, height: 'inherit', maxHeight: 100, color:"#fff"}} placeholder="Message ..." />
                                            </div>
                                            <textarea id={"input-" + this.state.inputId} ref={el => this.input = el} rows={1} value={this.state.text} onChange={(e) => this.updateInput(e.target)} className="w-100 mt-0" style={{ padding: '8px 20px', outline: 'none', resize: 'none', border: 'none', backgroundColor: 'transparent', fontSize: 14, height: 'inherit', maxHeight: 100,color:'#fff' }} placeholder="Message ..." />
                                        </div>

                                        <StickersView onSelect={this.onStickerSelect} />

                                        <div className="flexcc" style={{ width: 30 }}>



                                            {hasText && (
                                                <>
                                                    {console.log('this.state.onEdit', this.state.onEdit)}
                                                    {this.state.onEdit ? (
                                                        <button onClick={() => { if (hasText) { this.editMessage(this.state.onEdit._id, this.props.messenger._id, this.state.text) } }} className="px-1 flexcc">
                                                            <img src={'/assets/send-2.svg'} style={{ opacity: hasText ? 1 : 0.5, filter: hasText ? '' : 'saturate(0%)', transition: '0.3s all' }} height={20} />
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => { if (hasText) { this.sendTextMessage() } }} className="px-1 flexcc">
                                                            <img src={'/assets/send-2.svg'} style={{ opacity: hasText ? 1 : 0.5, filter: hasText ? '' : 'saturate(0%)', transition: '0.3s all' }} height={20} />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>



                                    </div>
                                </div>


                                {/* <MessengerAttachments ref={el => this.MessengerAttachments = el} height='100%' passAttachFiles={this.passAttachFiles} /> */}


                                {/* {this.state.showAttachments && (
                                <div className="flexc px-2 w-100" style={{ overflow: "auto" }} >
                                    {this.state.attachmentsList.map((prop, index) => {
                                        return (
                                            <button className="flexcc flex-column my-0 mrd-3 px-1 pb-0" key={index}>
                                                <img src={prop.icon} height="26px" />
                                                <p className="text-smallest mt-1">{prop.name}</p>
                                            </button>
                                        )
                                    })}
                                </div>
                            )} */}
                            </div>
                            {/* {this.state.showDropZone && !this.state.showCompressionOption && (
                                <div className="position-absolute w-100 h-100 top-0 left-0" style={{ zIndex: 1 }}  >
                                    <Dropzone
                                        // disabled={this.props.disabled}
                                        ref={el => this.dropzoneRef = el}
                                        multiple={true}
                                        // accept='image/jpeg'
                                        onDrop={(e) => this.onDrop(e, false)}

                                        style={{ flex: 1, cursor: 'pointer', outline: 'none' }}
                                    >
                                        {({ getRootProps, getInputProps }) => (

                                            <div className=" w-100 h-100 outline-none flexcc p-3" {...getRootProps()} onDragLeave={this.hideDropZone} style={{ backgroundColor: '#fff' }}>
                                                <input {...getInputProps()} />
                                                <div className="w-100 h-100 flexcc flex-column" style={{ border: '3px dashed #eee', borderRadius: 8, pointerEvents: 'none' }}>
                                                    <img className="" src={'/assets/paperclip.svg'} height={40} draggable={false} />
                                                    <p className="text-semibold text-semibig mt-3">{translate("Drop Files Here")}</p>
                                                    <p className="text-small mt-1 opacity-5">{translate("To Send them in this chat")}</p>

                                                </div>
                                            </div>

                                        )}

                                    </Dropzone>
                                </div>
                            )} */}




                            {/* {this.state.showDropZone && this.state.showCompressionOption && (
                                <div className="d-flex flex-column position-absolute w-100 h-100 top-0 left-0" style={{ zIndex: 1, backgroundColor: '#fff' }} onDragLeave={this.hideDropZone}  >
                                    <Dropzone
                                        // disabled={this.props.disabled}
                                        ref={el => this.dropzoneRef = el}
                                        multiple={true}
                                        // accept='image/jpeg'
                                        onDragOver={(e) => this.showDropZone(e, '1')}
                                        // onDragLeave={this.hideDropZone}
                                        onDrop={(e) => this.onDrop(e, true)}
                                        style={{ flex: 1, cursor: 'pointer', outline: 'none', }}
                                    >
                                        {({ getRootProps, getInputProps }) => (

                                            <div className=" w-100 flex-1 outline-none flexcc px-3 pt-3 pb-2" {...getRootProps()} style={{ backgroundColor: '#fff' }}>
                                                <input {...getInputProps()} />
                                                <div className="w-100 h-100 flexcc flex-column" style={{ border: '3px dashed #eee', borderRadius: 8, pointerEvents: 'none' }}>
                                                    <img className="" src={'/assets/paperclip.svg'} height={40} draggable={false} />
                                                    <p className="text-semibold text-semibig mt-3">{translate("Send With Compression")}</p>
                                                    <p className="text-small mt-1 opacity-5">{translate("Drop Files Here")}</p>

                                                </div>
                                            </div>

                                        )}

                                    </Dropzone>



                                    <Dropzone
                                        // disabled={this.props.disabled}
                                        ref={el => this.dropzoneRef = el}
                                        multiple={true}
                                        // onDragLeave={this.hideDropZone}
                                        // accept='image/jpeg'
                                        onDrop={(e) => this.onDrop(e, false)}
                                        onDragOver={(e) => this.showDropZone(e, '2')}
                                        style={{ flex: 1, cursor: 'pointer', outline: 'none' }}
                                    >
                                        {({ getRootProps, getInputProps }) => (

                                            <div className=" w-100 flex-1 outline-none flexcc px-3 pb-3 pt-2" {...getRootProps()} style={{ backgroundColor: '#fff' }}>
                                                <input {...getInputProps()} />
                                                <div className="w-100 h-100 flexcc flex-column" style={{ border: '3px dashed #eee', borderRadius: 8, pointerEvents: 'none' }}>
                                                    <img className="" src={'/assets/paperclip.svg'} height={40} draggable={false} />
                                                    <p className="text-semibold text-semibig mt-3">{translate("Send Original")}</p>
                                                    <p className="text-small mt-1 opacity-5">{translate("Drop Files Here")}</p>
                                                </div>
                                            </div>

                                        )}

                                    </Dropzone>

                                </div>
                            )} */}



                            <MessengerDropModal ref={el => this.MessengerDropModal = el} height={this.props.height} sendFileMessage={this.sendFileMessage} />
                        </>
                        {/* )} */}

                    </>


                )}


            </div>
        )
    }




}



const mapStateToProps = state => ({ settings: state.settings, user: state.user, messengers: state.messengers })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessengerView);
