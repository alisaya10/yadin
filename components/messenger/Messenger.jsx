import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

import MessengerList from './MessengerList';
import MessengerView from './MessengerView';
import HttpServices from '../../utils/Http.services';
import Responsive from '../Responsive.';
import { conditionalWidth } from '../../utils/useful';
import store from '../../stores/storeConfig';
import socketServices from '../../utils/socket.services';
// import { Socket } from 'socket.io-client';

class Messenger extends React.Component {
    state = {
        stage: 1,
        messengerInfo: false,
    }




    componentDidMount() {
        this.init()
        let myId = this.props.user?.info?._id
        this.setState({ myId })
        let messenger = this.props.course?.group
        if (!Array.isArray(messenger)) {
            messenger = [messenger]
        }
        store.dispatch(actions.addMessengers(messenger))
        setTimeout(() => {
            this.setMessenger(this.props.course?.group)
        }, 100);

        // this.setState({ width: window.innerWidth })
        // window.addEventListener('resize', this.updateWidth)
        this.updateWidth()
    }



    componentDidUpdate(prevProps) {
        if (this.props?.data !== prevProps.data) {
            // setTimeout(() => {
            this.init()
            // }, 500);
        }

        if (prevProps.height != this.props.height) {
            this.updateWidth()

        }

    }


    init() {
        let data = this.props?.data
        console.log(data)
        if (data?.path?.length > 1) {
            let id = data.path[1]
            if (id.startsWith("h=")) {
                console.log("IS a user")
            } else {
                console.log("IS a umessser")
            }
            // this.stageManager.changeStage('room', null, null, true)
        } else {
            // this.stageManager.changeStage('home', null, null, true)
        }
    }

    setData = (key, value) => {
        console.log(this.state[key])
        this.setState({ [key]: value }, () => {
            console.log(this.state[key])

        })
    }


    updateWidth = () => {
        // this.setState({ width: window.innerWidth })

        if (this.MessengerView) {
            let bound = this.MessengerView.getBoundingClientRect()
            this.setState({ mwidth: bound.width, mheight: bound.height })
        }

    }


    checkIfMessengerExists = (potentialUser, time, tryTime, cb) => {

        console.log("checkIfMessengerExists")


        if (time == null) {
            time = 0
        }
        if (tryTime == null) {
            tryTime = 10
        }

        setTimeout(() => {

            console.log('Point 2')
            console.log(socketServices.socket?.connected)
            
            if (socketServices.socket?.connected) {
                console.log('Point 3')


                console.log("Socket.emit")
                socketServices.emit('checkIfMessengerExists', { potentialUser }, null, (info, err) => {

                    console.log("checkIfMessengerExists")
                    console.log(info)

                    // return
                    if (info.messenger) {
                        console.log('true')
                        console.log(info.messenger)
                        let messenger = info.messenger
                        messenger.type = 'teacher'
                        if (!Array.isArray(messenger)) {
                            messenger = [messenger]
                        }
                        actions.addMessengers(messenger)
                        setTimeout(() => {
                            this.setMessenger(info.messenger, () => {

                            })
                        }, 50);
                    }
                })

            } else {

                if (tryTime < 10) {
                    this.checkIfMessengerExists(potentialUser, time + 5, tryTime + 1, cb)
                }
            }

        }, time * 100);



    }

    openOne = (potentialUser, needCheck) => {

        this.setState({ stage: 2, potentialUser })

        // this.setMessenger(item, () => {
        console.log('this.props.messengers', this.props.messengers)
        if (needCheck) {
            console.log('Point 1')
            this.checkIfMessengerExists(potentialUser, 1, 10, () => {
                this.updateWidth()
            })
        }
        else {
            console.log('potentialuser',potentialUser)
            this.setMessenger(potentialUser, () => {
                this.updateWidth()
            })
        }
        // })


        // this.props.changeWindow('messenger', { type: 'messenger', path: ['messenger', id] })

        // this.fetchOne(item)
    }

    closeOne = () => {
        // console.log("closeOne")
        this.setState({ stage: 1, messenger: null, potentialUser: null }, () => {
        })
    }


    changePage = (index) => {
        this.setState({ currentPage: index }, () => {
            this.fetchData()
            this.closeOne()
        })
    }

    removeUser = (item) => {
        console.log('done', item)
        HttpServices.request('removeUser', item, (fetchResult, fetchError) => {
            if (fetchError) {
                return
            }
            let userInfo = this.state.userInfo
            let currentMessenger = this.state.currentMessenger
            userInfo = {}
            currentMessenger = {}
            console.log('fetchResult', fetchResult)
            if (fetchResult.info) {
                let messenger = fetchResult.info
                if (!Array.isArray(messenger)) {
                    messenger = [messenger]
                }
                actions.updateMessengers(messenger)
                setTimeout(() => {
                    console.log('==========================')
                    this.setMessenger(fetchResult.info, () => {
                        console.log('this.messenger', this.state.messenger)
                    })
                }, 50);
            }
            this.setState({ userInfo, currentMessenger })
        })
    }

    fetchRemove = () => {
        this.setState({ isLoadingRemove: true })
        let id = this.state.messenger._id

        console.log(id)
        HttpServices.request(this.props.page.removeUrl, { "id": id }, (fetchResult, fetchError) => {
            this.setState({ isLoadingRemove: false })

            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.removeFailed', description: fetchError.message })
                return
            }
            let data = this.state.data
            data.splice(this.state.currentIndex, 1)
            this.setState({ data })
            this.removeModal.modal.hideModal()
            this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.removedSuccesfully', description: '{{lang}}info.dataRemovedSuccessfully' })
            this.fetchData(true)
            this.closeOne()

        })

    }




    setMessenger = (messenger, cb) => {

        console.log("setMessenger")
        console.log(messenger)

        this.setState({ messenger: messenger }, () => {
            console.log('setmessenger done')
            if (cb) {
                cb()
            }
        })

        // let token = ''//getVToken()

        // subscribeAdmin(this.state.topicId, token, 'visitor', this.visitorInfoUpdate)
    }
    getOnlineStatus = (messenger, cb, time = 1, tryTime = 0) => {
        console.log('getOnlineStatus')
        setTimeout(() => {

            if (socketServices?.socket?.connected) {
                if (messenger) {
                    socketServices?.emit('getHubStatus', { messengerId: messenger?._id }, null, (info, err) => {
                        // console.log('info', info)
                        // console.log('err', err)
                        // console.log('done true111')

                        cb()
                    })
                }
                else {
                    cb()
                }
            }
            else {
                if (tryTime < 10) {
                    this.getOnlineStatus(messenger, cb, time + 5, tryTime + 1)
                }
            }
        }, time * 1000);

    }
    selectPotentialUser = () => {
        let potentialUser = this.props.applet
        this.setState({ potentialUser })
    }
    selectApplet = (value) => {
        this.setState({ currentApplet: value })
    }

    sendNotif = (type, value, messenger, time = 1, tryTime = 0, cb) => {
        setTimeout(() => {
            console.log(socketServices)
            if (socketServices?.socket?.connected) {
                socketServices?.emit('handleNotif', { type, value, messenger }, null, (info, err) => {
                    if (cb)
                        cb()
                })
            }
            else {
                if (tryTime < 10) {
                    this.sendNotif(type, value, messenger, time + 5, tryTime + 1, cb)
                }
            }
        }, time * 1000);
    }



    render() {
        return (
            <div className="w-100 d-flex Messenger window-content-radius h-100" style={{ backgroundColor: "#181818", borderRadius: "20px" }} >
                <div className=' w-100  h-100 bg-white window-content-radius'>
                    <div className="row m-0 h-100 d-flex">
                        <div className='col-4 py-4 pr-4 pl-0 h-100 scroll-no-scrollbar  w-100 d-flex flex-column'>
                            <MessengerList isTeacher={this.props.isTeacher} course={this.props.course} setData={this.setData} selectApplet={this.selectApplet} currentApplet={this.state.currentApplet} page={this.props.page} openOne={this.openOne} closeOne={this.closeOne} messenger={this.state.messenger} width={this.props.width} fetchRemove={this.fetchRemove} changePage={this.changePage} updateWidth={this.updateWidth} selectPotentialUser={this.selectPotentialUser} stage={this.state.stage} data={this.props.data} init={this.init} setMessenger={this.setMessenger} />
                        </div>

                        <div ref={el => this.MessengerView = el} className="w-100 h-100 position-relative p-0 col-8" >
                            <div className="w-100 h-100 py-4 pl-4 pr-0" >
                                <MessengerView page={this.props?.page}
                                    sendNotif={this.sendNotif}
                                    setMessenger={this.setMessenger}
                                    messenger={this.state.messenger}
                                    potentialUser={this.state.potentialUser}
                                    height={this.state.mheight}
                                    currentApplet={this.state.currentApplet}
                                    setData={this.setData}
                                    messengerInfo={this.state.messengerInfo}
                                    adminView={true}
                                    showClose={false}
                                    showBack={conditionalWidth(this.props.width, { xs: true, sm: true, md: true, lg: false })}
                                    close={() => this.setState({ showMessenger: false }, () => this.updateWidth())}
                                    askForForm={false}
                                    closeOne={this.closeOne}
                                    width={this.props.width}
                                    fetchRemove={this.fetchRemove} changePage={this.changePage} openOne={this.openOne} updateWidth={this.updateWidth} selectPotentialUser={this.selectPotentialUser} stage={this.state.stage} data={this.props?.data} init={this.init} />
                            </div>
                        </div>
                    </div>
                </div>
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