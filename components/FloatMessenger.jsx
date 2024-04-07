

import React, { Component } from 'react'
import HttpServices from '../utils/Http.services';
import { addTopic, initSocket, subscribeVisitor } from '../utils/socket.services';
import { getVToken } from '../utils/useful';
import Messenger from './Messenger';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../stores/actionsList';
import { nanoid } from 'nanoid';


class FloatMessenger extends Component {
    state = {
        topicId: nanoid(),
        showMessenger: false
    }


    componentDidMount() {
        this.initSocket()
        window.addEventListener('resize', this.updateWidth)
        this.updateWidth()
        this.checkMessenger()
    }

    updateWidth = () => {
        if (this.floatMessenger) {
            let bound = this.floatMessenger.getBoundingClientRect()
            // console.log(bound)
            this.setState({ width: bound.width, height: bound.height })
        }
    }


    initSocket() {
        // initSocket()
    }

    checkMessenger = () => {
        // let messenger = localStorage.getItem('messenger')
        let token = getVToken()
        // console.log(token)
        if (token) {

            if (token) {
                HttpServices.request('getMessengers', { token }, (fetchResult, fetchError) => {
                    // console.log("fetchError")
                    // console.log(fetchError)
                    // console.log(fetchResult)

                    if (fetchError) {
                        // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                        return
                    }

                    // console.log(fetchResult.info)
                    if (fetchResult.info) {
                        // console.log(this.props.actions.addMessengers)
                        this.props.actions.addMessengers(fetchResult.info, true)
                        // console.log(fetchResult)
                        fetchResult.info.forEach(messenger => {
                            // console.log(messenger.lastSeen)
                            // console.log(fetchResult.notifs[messenger._id])

                            this.props.actions.changeLastSeen(messenger._id, messenger.lastSeen)
                            this.props.actions.setNotificationCount(messenger._id, fetchResult.notifs[messenger._id])
                            this.props.actions.appendMessages(messenger._id, fetchResult.messages[messenger._id])

                        });
                        // console.log("HR")
                        this.setMessenger(fetchResult.info[0])
                    } else {
                        this.setState({ askForForm: true })
                    }

                })
            }
        } else {
            this.setState({ askForForm: true })
        }
    }

    setMessenger = (messenger, cb) => {
        // addTopic()
        this.setState({ messenger: messenger }, () => {
            if (cb) {
                cb()
            }
        })

        let token = getVToken()

        subscribeVisitor(this.state.topicId, token, 'visitor', this.visitorInfoUpdate)
    }


    visitorInfoUpdate = (data) => {
        // console.log(data)
    }







    render() {
        return (
            <div className="floatMessenger" style={{ zIndex: 100, position: 'fixed', bottom: 20, right: 20 }}>
                {!this.state.showMessenger && (
                    <div className='position-relative'>
                        <button onClick={() => this.setState({ showMessenger: true }, () => this.updateWidth())} className='flexcc position-relative' style={{ background: 'linear-gradient(to left,#7b00f7,#a912eb)', borderRadius: 50, height: 50, width: 50 }}>
                            <img className='invert' src="/images/messenger.png" height={30} />

                            {this.props.messengers?.notifications[this.state.messenger?._id] != null && this.props.messengers?.notifications[this.state.messenger?._id] != 0 && (

                                <div className='position-absolute white flexcc' style={{ borderRadius: 20, minWidth: 24, height: 24, lineHeight: 1, backgroundColor: '#ee5050', top: -12, right: 0 }}>
                                    <span className='text-small'>{this.props.messengers.notifications[this.state.messenger?._id]}</span>
                                </div>
                            )}
                        </button>
                    </div>
                )}

                {this.state.showMessenger && (
                    <div style={{ position: 'fixed', bottom: 20, right: 20, height: '80vh', maxHeight: 600, width: '90%', maxWidth: 300, backgroundColor: '#fff', borderRadius: 15, boxShadow: '0px 0px 50px #00000050' }}>
                        <div ref={el => this.floatMessenger = el} style={{ height: 'calc(100% - 25px)' }}>
                            <Messenger setMessenger={this.setMessenger} messenger={this.state.messenger} type={'float'} width={this.state.width} height={this.state.height} adminView={false} showClose={true} close={() => this.setState({ showMessenger: false }, () => this.updateWidth())} askForForm={this.state.askForForm} />
                        </div>
                        <div className='flexcc py-1' style={{ height: '25px', borderRadius: '0px 0px 15px 15px', width: '100%', backgroundColor: 'rgb(240, 240, 240)', color: '#789' }}>
                            <p className='text-smallest'>Powered by <span style={{ background: 'linear-gradient(to left,#7b00f7,#a912eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} className='text-smaller'>IoTSmile.com</span></p>
                        </div>
                    </div>
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
)(FloatMessenger);

