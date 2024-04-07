import React from "react";
// import { siteConfig, siteTheme } from "../../../variables/config";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../stores/actionsList';
import { nanoid } from "nanoid";
import { socket } from "../utils/socket.services";
import Loader from 'react-loader-spinner'
import { checkTranslation, imageAddress } from "../utils/useful";
import moment from 'jalali-moment'
import HttpServices from "../utils/Http.services";
import FormViewer from "./FormViewer";
import Cookies from 'universal-cookie';
import MessageBox from "./boxes/MessageBox";
const cookies = new Cookies();


class Messenger extends React.Component {

    state = {
        text: '',
        headers: [
            { key: 'name', type: 'TextInput', col: '12', information: { label: '{{lang}}Name', placeholder: '{{lang}}Name', required: true } },
            { key: 'phone', type: 'TextInput', col: '12', information: { label: '{{lang}}Phone', placeholder: '{{lang}}Phone', required: true }, showMain: false },

        ],

    }

    componentDidMount() {
        this.init()

        this.setState({ width: window.innerWidth })
        window.addEventListener('resize', this.updateWidth)
        this.messagesContainer.addEventListener('scroll', this.scrollChanged)

    }

    scrollChanged = (e) => {
        // console.log(this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight)
        // console.log(this.messagesContainer.scrollHeight)
        // console.log(this.messagesContainer.offsetHeight)
        // console.log(this.messagesContainer.scrollY)

        // console.log(this.messagesContainer.scrollTop)
        // console.log('------')

        if (this.messagesContainer.scrollTop < 200 && this.messagesContainer.scrollTop >= -1 && !this.state.isOnLast && !this.state.isLoadingInfo) {
            // e.preventDefault()
            // this.messagesContainer.style.overflow = 'hidden'
            if (this.messagesContainer.scrollTop < 1) {
                // this.messagesContainer.scrollTop = 1
                this.messagesContainer.scrollTo({ top: 1, behavior: 'auto' })
                // console.log("HEREE")
            }
            // console.log("HRE!!!")
            // setTimeout(() => {
            this.fetchData()

            // }, 500);

            // console.log(this.messagesContainer.scrollTop)
            // if (this.messagesContainer.scrollTop < 100) {
            //     this.messagesContainer.scrollTop = 100
            // }
        }

    }

    updateWidth = () => {
        this.setState({ width: window.innerWidth })
    }



    componentDidUpdate(prevProps) {
        if (this.props.messenger?._id !== prevProps.messenger?._id) {
            this.init()
        }

        // console.log(prevProps.messengers?.object[prevProps.messenger?._id]['*lastMsg']?._id)
        // console.log(this.lastMsg)
        if (prevProps?.messenger) {
            if (!this.props.messengers?.object[prevProps.messenger?._id]?.['*lastMsg']?._id || this.props.messengers?.object[prevProps.messenger?._id]?.['*lastMsg']?._id != this.lastMsg) {
                if (this.props.messengers?.object[prevProps.messenger?._id]) {
                    this.lastMsg = this.props.messengers?.object[prevProps.messenger?._id]['*lastMsg']?._id
                }
                // console.log("*******")
                // console.log(this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight)
                // console.log(this.messagesContainer.scrollHeight)
                // console.log(this.messagesContainer.offsetHeight)
                // console.log(this.messagesContainer.scrollY)

                // console.log(this.messagesContainer.scrollTop)
                if (this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight < 250) {
                    this.scrollToBottom()
                }

            }
        }


        // if (this.props.messenger?._id !== prevProps.messenger?._id) {
        //     this.init()
        // }

    }


    init() {
        // console.log("INIT")
        // console.log(this.props.messenger)
        if (this.props.messenger) {
            this.setState({ showNewMessagesBox: null, data: [], currentPage: 0, totalCount: null, filter: null, isOnLast: false }, () => {
                let scrollToBottom = true
                let newMessagesCount = this.props.messengers.notifications[this.props.messenger?._id]
                if (newMessagesCount && newMessagesCount != 0) {
                    this.setState({ showNewMessagesBox: this.props.messenger.lastSeen })
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







    fetchData = (init) => {

        let item = this.props.messenger

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
            // console.log(body.lastMsg)

            if (typeof body.lastMsg != 'object') {

                // console.log("fetchData1")

                this.setState({ isLoadingInfo: true, oneDataList: [] })

                // let currentBottomHeight = this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop //- this.messagesContainer.offsetHeight

                // let page = this.props.page

                // console.log("fetchData")
                // console.log(page.fetchOneUrl)
                HttpServices.request('getMessengerMessages', body, (fetchResult, fetchError) => {
                    // setTimeout(() => {


                    // if (this.messagesContainer.scrollTop < 1) {
                    //     console.log("JJSD")
                    //     this.messagesContainer.scrollTop = 200
                    //     // this.messagesContainer.scrollTo({ y: 100 })
                    // }

                    // }, 500);
                    // console.log(fetchError)


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

                        // console.log(this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight)

                        this.setState({ isLoadingInfo: false }, () => {
                        })

                        if (fetchError) {
                            this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                            return
                        }

                        // let stayPoint = null
                        // console.log(fetchResult)
                        // setTimeout(() => {

                        // console.log("*******")
                        // console.log(this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight)
                        // console.log(this.messagesContainer.scrollHeight)
                        // console.log(this.messagesContainer.scrollTop)

                        // if (this.messagesContainer.scrollTop < 10) {
                        //     // this.messagesContainer.style.overflow = 'hidden'

                        //     stayPoint = this.messagesContainer.scrollHeight
                        //     // console.log(stayPoint)
                        //     // this.messagesContainer.scrollTop = 10
                        //     // this.messagesContainer.scrollTo({top:1000})
                        // }

                        // console.log(currentBottomHeight)


                        // let prevHeight = this.messagesContainer.scrollHeight

                        // console.log("prevHeight")
                        // console.log(prevHeight)

                        let NewBottomHeight = this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop //- this.messagesContainer.offsetHeight

                        // console.log("NewBottomHeight")
                        // console.log(NewBottomHeight)


                        // console.log("currentBottomHeight")

                        // console.log(currentBottomHeight)

                        this.props.actions.appendMessages(item._id, fetchResult.info)


                        let newHeight = this.messagesContainer.scrollHeight
                        // console.log(prevHeight)
                        // console.log(newHeight)

                        // console.log( newHeight - NewBottomHeight  )

                        // if (currentBottomHeight > 0 && NewBottomHeight > currentBottomHeight) {
                            // setTimeout(() => {
                                this.messagesContainer.scrollTo({ top: newHeight - NewBottomHeight  , behavior: 'auto' })
                            // }, 200);
                        // }






                        // this.setState({ oneDataList: [] }, () => {
                        //     this.setState({ oneDataList: fetchResult.info }, () => {
                        if (!fetchResult.info || fetchResult.info.length < 20) {
                            this.setState({ isOnLast: true },()=>{
                                newHeight = this.messagesContainer.scrollHeight
                                this.messagesContainer.scrollTo({ top: newHeight - NewBottomHeight  , behavior: 'auto' })
                            })
                        }

                        // console.log("*******")
                        // console.log(this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight)
                        // console.log(this.messagesContainer.scrollHeight)
                        // console.log(this.messagesContainer.scrollTop)

                        // setTimeout(() => {
                        //     // this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight - stayPoint
                        //     // this.messagesContainer.style.overflow = 'scroll'
                        // }, 1000);


                        // console.log(this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight)
                        if (init || this.messagesContainer.scrollHeight - this.messagesContainer.scrollTop - this.messagesContainer.offsetHeight < 250) {
                            // console.log("scrollToBottom")
                            this.scrollToBottom()

                            setTimeout(() => {
                                this.scrollToBottom()
                            }, 5);
                        }
                        // else{
                        //     if (this.newMessagesBox) {
                        //         this.newMessagesBox.scrollIntoView()
                        //     }

                        // }

                    }, timer);
                    // }, 10);

                })
            }

        }
        // this.setState({ data: [1,1,1,1,1,1,1,1,1] })

        // })

        // if (fetchResult.count != null) {
        //     this.setState({ totalCount: fetchResult.count })
        // }
        // })
    }



    updateInput(element) {
        // element.style.height = "5px";
        // console.log(element.scrollHeight)
        element.style.height = 'inherit';
        element.style.height = (element.scrollHeight) + "px";
        this.setState({ text: element.value })
    }

    sendTextMessage = () => {

        this.input.style.height = 'inherit';
        let message = {
            text: this.state.text,
        }

        // console.log(message)

        // if (!this.props.messenger?._id) {
        //     this.emitCreateMesseger(0, 1, {}, (info) => {
        //         message.messenger = info.messenger._id
        //         if (info.user) {
        //             localStorage.setItem('msgUser', info.user)
        //             cookies.set('vtoken', auth.token, { path: '/' })
        //         }
        //         this.emitMessage(0, 1, message)
        //     })
        // } else {


        // }

        // this.emitMessage(0, 1, message)
        // this.scrollToBottom(true)
        this.sendMessage(message)
        this.setState({ text: '' })
        this.input.focus()
    }

    sendMessage = (rawmessage) => {

        let message = {
            messenger: this.props.messenger?._id,
            tempId: nanoid(),
            cDate: new Date().getTime(),
            isAdmin: false
        }

        message = { ...message, ...rawmessage }

        this.props.actions.addMessages(this.props.messenger?._id, [message])

        this.emitMessage(0, 1, message)
        this.scrollToBottom(true)
    }


    emitCreateMesseger = (time, tryTime, message, cb) => {
        setTimeout(() => {
            if (socket?.connected) {
                socket.emit('createMesseger', message, (info, err) => {
                    // message.messenger = info.messenger._id
                    if (info.user) {
                        localStorage.setItem('msgUser', JSON.stringify(info.user))
                        localStorage.setItem('messenger', info.messenger._id)
                        let days = 365
                        let maxAge = days * 24 * 60 * 60

                        let expires = new Date((new Date().getTime() + (maxAge * 1000)))

                        cookies.set('vtoken', info.token, { path: '/', expires })
                        // this.setState({ messenger: info.messenger }, () => {
                        //     cb()
                        // })

                        actions.addMessengers(info.messenger)
                        setTimeout(() => {
                            this.props.setMessenger(info.messenger, () => {
                                cb()
                            })
                        }, 50);

                    }
                });
            } else {
                if (tryTime < 10) {
                    this.emitCreateMesseger(time + 5, tryTime + 1, message)
                }
            }

        }, time * 1000);
    }

    submitForm = () => {
        let data = this.form.getForm()
        if (data) {
            // console.log(data)

            this.emitCreateMesseger(0, 1, data, (info) => {

                // console.log(info)
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
                // console.log(form)
                let message = { form }
                this.sendMessage(message)


                // message.messenger = info.messenger._id
                // if (info.user) {
                //     localStorage.setItem('msgUser', info.user)
                // }
                // this.emitMessage(0, 1, message)
            })

        }
    }





    emitMessage = (time, tryTime, message) => {
        setTimeout(() => {
            if (socket?.connected) {
                socket.emit('message', message, (messageId, err) => {
                    if (messageId) {
                        // console.log(messageId)
                        this.replaceTempMessage(message.tempId, messageId, message.messenger)
                    }
                });
            } else {
                if (tryTime < 10) {
                    this.emitMessage(time + 5, tryTime + 1, message)
                }
            }

        }, time * 1000);
    }








    replaceTempMessage(tempId, newId, messenger) {
        // let count = 0
        // let data = this.state.data
        // data.forEach(message => {
        //     if (message.tempId === tempId) {

        let messengerId = messenger//this.props.route?.params?.id

        this.props.actions.changeTempMessage(messengerId, tempId, { _id: newId, status: 1 })

        // this.sendSeenToServer(messengerId,newId)   
        this.updateLastSeenOnServer(0, 1, newId, messengerId)

        // console.warn(count)
        //         return
        //     }
        // });

        // this.setState({ data })
    }


    onViewableItemsChanged = (msg) => {
        if (this.state.userId || true) {
            // viewableItems.forEach(viewableItem => {
            // if (msg.userId != this.state.userId && msg.status != 2) {
            if (msg.isAdmin && msg.status != 2) {

                // console.log(msg.text)
                // this.props.actions.c
                this.changeMessageToSeen(msg.messenger, msg._id)
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
    //     if (this.state.userId) {
    //         viewableItems.forEach(viewableItem => {
    //             if (viewableItem.item.userId != this.state.userId && viewableItem.item.status != 2 && viewableItem.item._id) {
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



    changeMessageToSeen(messengerId, messageId) {
        // let messengerId = this.props.route?.params?.id

        this.props.actions.changeMessage(messengerId, messageId, { status: 2 })
        this.props.actions.changeLastSeen(messengerId, messageId, this.state.userId)
        this.sendSeenToServer(messengerId, messageId)
    }

    sendSeenToServer = (messengerId, messageId) => {
        // console.log("PRS##N")
        if (socket?.connected) {
            socket.emit('messageSeen', { messengerId, messageId }, (ok, err) => {
                console.log("messageSeen")
            });
        } else {
            setTimeout(() => {
                this.sendSeenToServer(messengerId, messageId)
            }, 2000);
        }

    }


    updateLastSeenOnServer = (time, tryTime, messageId, messengerId) => {
        setTimeout(() => {
            if (socket?.connected) {

                socket.emit('messegerSeenUpdate', { messengerId, messageId }, (ok, err) => {
                })

            } else {
                if (tryTime < 10) {
                    this.updateLastSeenOnServer(time + 5, tryTime + 1, messageId,messengerId)
                }
            }

        }, time * 1000);
    }



    scrollToBottom = (smooth) => {
        // console.log(this.messagesContainer.offsetTop)
        setTimeout(() => {
            if (this.messagesContainer) {
                this.messagesContainer.scrollTo({ top: this.messagesContainer.scrollHeight, behavior: smooth ? 'smooth' : 'auto' })
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


    render() {
        let hasText = this.state.text && this.state.text != ''
        let messenger = this.props.messenger
        // console.log(messenger)
        // console.log(this.props.messengers)
        // console.log(this.props.messenger)
        return (
            <div ref={el => this.messagesContainer = el} id={'messenger'} className="messenger " style={{ borderRadius: '15px 15px 0px 0px', scrollSnapAlign: 'start' }} >

                {this.props.adminView && !this.props.messenger && (
                    <div className='text-center w-100' style={{ paddingTop: 100 }}>
                        <img src='/images/nothing.png' width={80} />
                        <p className="mt-2" style={{ fontWeight: 'bold', fontSize: 20 }}>Chat is Not Selected</p>
                        <p className='mt-1' style={{ fontSize: 14 }}>Select a chat to see the information</p>
                    </div>
                )}



                {(messenger || !this.props.adminView) && (
                    <>
                        <div className={"row position-relative m-0 p-0" + (this.state.width > 767 ? ' ' : '')}>
                            <div className="col-md-12 p-0  detail order-lg-1 order-2 pb-2">
                                <div className="detail-header flexcb " style={{ position: 'sticky', top: 0, backgroundColor: '#ffffffdd', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)', zIndex: 1 }}>
                                    <div>
                                        {(this.props.showBack && this.state.stage == 2 && this.state.width < 768) && (
                                            <button onClick={() => this.setState({ stage: 1 })} className="mt-2"><img src={'/images/nexts.png'} height="18px" className=" rotate-180" /></button>
                                        )}

                                        <div className=" flexc">
                                            <div className="flexcc">
                                                <img src={imageAddress(messenger?.creator?.image, 'profile', 'small')} style={{ height: 36, width: 36, objectFit: 'cover', borderRadius: 20 }} />
                                            </div>
                                            <div className="mx-2">
                                                {!this.props.adminView && (
                                                    <p className=" m-0 text-small">IoTSmile Team</p>
                                                )}

                                                {this.props.adminView && (
                                                    <p className=" m-0 text-small">{messenger?.visitor?.fullname}</p>
                                                )}

                                                {/* <p className="text-smallest" style={{ color: '#789', lineHeight: 1 }}>Status Online</p> */}
                                            </div>
                                        </div>
                                    </div>

                                    {(this.props.showClose) && (
                                        <button onClick={() => this.props.close()} className="mt-2"><img src={'/images/close.png'} height="18px" /></button>
                                    )}

                                </div>
                                <div className="d-flex w-100" style={{ alignItems: 'flex-end', minHeight: 'calc(' + this.props.height + "px - 109px)" }}>
                                    <div className="px-3 w-100">
                                        <div className="pb-2 pt-1 w-100">





                                            {this.props.askForForm && !messenger && (
                                                <div className="px-3 py-3" style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                                                    <p className="text-smaller px-1 mb-2">Welcome to IoTSmile support service. Please fill in the form below before starting the chat.</p>
                                                    <FormViewer ref={el => this.form = el} headers={this.state.headers} theme={"modern"} inputClass={"modern-input"} />
                                                    <button onClick={() => this.submitForm()} className="white w-100 px-2 py-2 mt-2" style={{ borderRadius: 8, background: 'linear-gradient(to left,#7b00f7,#a912eb)' }}>Start the chat</button>
                                                </div>
                                            )}

                                            {this.state.isOnLast && (
                                                <p className="text-center py-1 text-smallest mt-2" style={{ color: '#9ab' }}>No More Messages</p>
                                            )}


                                            {this.props.messengers.messages[this.props.messenger?._id]?.map((prop, index) => {
                                                // let isOther = false
                                                // if (prop.isAdmin) {
                                                //     isOther = true
                                                // }
                                                // let name = this.props?.messenger?.visitor?.fullname

                                                // if (isOther) {
                                                //     name = 'Operator'
                                                // }
                                                // console.log(prop)
                                                return (
                                                    <div key={prop._id}>

                                                        <MessageBox key={prop._id} data={prop} messenger={this.props?.messenger} onViewableItemsChanged={this.onViewableItemsChanged} />

                                                        {this.state.showNewMessagesBox == prop._id && prop._id != null && (
                                                            this.newMessages()
                                                        )}

                                                    </div>
                                                    // <div className="d-flex mt-3" key={prop._id}>
                                                    //     <div className="mt-2">
                                                    //         <img src={imageAddress(prop?.creator?.image, 'tickeProfile', 'small')} className=" profile-img1" />
                                                    //     </div>
                                                    //     <div>
                                                    //         <p className="text-smallest text-uppercase px-2 text-bold" style={{ color: '#9ab' }}>{name} - {moment(prop?.cDate).format('YYYY/MM/DD HH:mm')}</p>
                                                    //         <div className={"chatbox  " + (isOther ? 'other' : '')} >
                                                    //             {prop.text && (
                                                    //                 <p className="chatbox-desc" >{prop.text}</p>
                                                    //             )}

                                                    //             {prop.form && Object.values(prop.form).map((fprop, findex) => {
                                                    //                 return (
                                                    //                     <p className="chatbox-desc" >{checkTranslation(fprop.label)}: {checkTranslation(fprop.value)}</p>
                                                    //                 )
                                                    //             })}

                                                    //             <div style={{ position: 'absolute', right: -15, bottom: 0, }}>
                                                    //                 {(prop.status == 0 || prop.status == null) && (
                                                    //                     <img src="/images/clock.png" width={10} style={{ opacity: 0.5 }} />
                                                    //                 )}

                                                    //                 {(prop.status == 1) && (
                                                    //                     <img src="/images/sent.png" width={10} style={{ opacity: 0.5, filter: 'saturate(0%)' }} />
                                                    //                 )}

                                                    //                 {(prop.status == 2) && (
                                                    //                     <img src="/images/read.png" width={10} style={{ opacity: 1, filter: 'saturate(0%)' }} />
                                                    //                 )}

                                                    //             </div>

                                                    //         </div>
                                                    //     </div>
                                                    // </div>

                                                )
                                            }).reverse()}

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

                        {messenger && (
                            <div className=" flexc w-100 " style={{ padding: '4px 0px 10px 0px', position: 'sticky', left: 0, bottom: 0, backgroundColor: '#ffffffdd', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)', zIndex: 1 }}>

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
                                <div className="w-100 flexc mx-3" style={{ padding: '0px 10px', backgroundColor: '#f2f6f8', borderRadius: 20, border: '1px solid #f0f2f6', }}>
                                    <textarea ref={el => this.input = el} rows={1} value={this.state.text} onChange={(e) => this.updateInput(e.target)} className="w-100 mt-0" style={{ padding: '8px 5px', outline: 'none', resize: 'none', border: 'none', backgroundColor: 'transparent', fontSize: 14, height: 'inherit', minHeight: 37, maxHeight: 100, }} placeholder="Message ..." />
                                    <button onClick={() => { if (hasText) { this.sendTextMessage() } }} className="px-2 flexcc">
                                        <img src={'/assets/send-f.png'} style={{ opacity: hasText ? 1 : 0.5, filter: hasText ? '' : 'saturate(0%)', transition: '0.3s all' }} height={20} />
                                    </button>
                                </div>
                            </div>
                        )}




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
)(Messenger);
