import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import { nanoid } from "nanoid";
// import { socket } from "../../../utils/socket.services";
import Loader from 'react-loader-spinner'
import { checkTextTranslation, checkTranslation, imageAddress, pathMaker, phoneStandardView, priceStandardView, translate } from "../../utils/useful";
import moment from 'jalali-moment'
import HttpServices from "../../utils/Http.services";
import MessengerCreateNew from "./MessengerCreateNew";
import MessageStatusView from "./boxes/MessageStatusView";
import { getBoundingClientRect } from "../../utils/functions";
import Modal from "../Modal";
import store from "../../stores/storeConfig";
import { removeMessenger } from "../../stores/actionsList";
import FormViewer from "../FormViewer-new";

class MessengerList extends React.Component {
    state = {
        data: [],
        show: false,
        showContextMenu: false,
        xPos: "0",
        yPos: "0",
        MessengerContextMenu: [
            { icon: "/assets/icons/messenger/pin.svg", title: "Pin", key: 'pin' },
            { icon: "/assets/icons/messenger/select.svg", title: "Select", key: 'select' },
            { icon: "/assets/icons/messenger/trash.svg", title: "Delete", key: 'delete' },
        ],
        currentMessenger: ''
    }


    componentDidMount() {
        this.init()
        this.setState({ width: window.innerWidth })
        window.addEventListener('resize', this.updateWidth)
        document.addEventListener('click', () => {
            let contextMenu = this.state.contextMenu;
            if (contextMenu) {
                contextMenu.show = false;
                this.setState({
                    showContextMenu: false,
                    contextMenu: contextMenu
                })
            }
        })
    }

    updateWidth = () => {
        this.setState({ width: window.innerWidth })

    }

    replyAction = (key) => {
        if (key == 'delete') {
            this.deletemessage.showModal()
        }
    }

    deleteMessageAction = (item) => {
        this.deletemessage.hideModal()
        HttpServices.request('deleteMessenger', { messenger: item._id, hub: this.state.myId }, (fetchResult, fetchError) => {
            console.log('done')
            let messengers = fetchResult.info
            if (!Array.isArray(messengers)) {
                messengers = [messengers]
            }
            store.dispatch(removeMessenger(messengers, this.state.myId))
            this.props.setData('messenger', null)
        })
    }
    hideModal = () => {
        this.setState({ currentItem: null }, () => {
            this.deletemessage.hideModal()
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page || this.props.user?.info?._id != prevProps.user?.info?._id) {
            // setTimeout(() => {
            this.init()
            // }, 500);
        }
    }



    init() {
        // if (this.props.page) {
        let myId = this.props.isApplet ? this.props.variables?.appletHub?._id : this.props.user?.info?._id

        if (myId) {
            this.setState({ myId, data: [], currentPage: 0, totalCount: null, filter: null }, () => {
                this.fetchData(true)
            })
        }
        // }
    }


    fetchData = (getCount) => {

        // this.props.actions.changeSetting('socketStatus', "updading")

        this.setState({ isLoadingData: true })
        let body = this.props.page?.filter ?? {}
        body.user = this.state.myId

        this.setState({ isLoadingMessengers: true })
        console.log('body', body)
        if (this.props.isTeacher) {

            HttpServices.request('getMyMessengers', body, (fetchResult, fetchError) => {

                // this.props.actions.changeSetting('socketStatus', false)


                this.setState({ isLoadingMessengers: false })
                if (fetchError) {
                    this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                    return
                }
                // console.log(fetchResult)
                // fetchResult.info.sort((a, b) => b.uDate > a.uDate)
                this.setState({ data: [] }, () => {

                    let messengerList = []
                    // console.log('this.props.course.teacher', this.props.course.teacher._id)
                    let teacher = false
                    fetchResult.info.forEach(messenger => {

                        messengerList.push(messenger)

                        let name = messenger.name
                        console.log('msg name', messenger)
                        if (!name) {
                            messenger.users.forEach(element => {
                                if (element._id != this.state.myId) {
                                    name = element?.fullname
                                }

                            })
                        }
                        messenger["**name"] = name
                    });

                    console.log('===== adadad =======', messengerList)

                    this.props.actions.addMessengers(fetchResult.info, true)
                    this.setState({ messengerList })

                    // console.log(this.state.myId)
                    // console.log(fetchResult)
                    // return
                    fetchResult.info.forEach(messenger => {

                        this.props.actions.changeLastSeen(messenger._id, messenger.lastSeen, messenger.sequence, this.state.myId)
                        this.props.actions.setNotificationCount(messenger._id, fetchResult.notifs[messenger._id])
                        this.props.actions.appendMessages(messenger._id, fetchResult.messages[messenger._id])

                    });

                    // this.setState({ data: fetchResult.info })
                })

                if (fetchResult.count != null) {
                    this.setState({ totalCount: fetchResult.count })
                }
            })
        }
    }

    timeToText(time) {
        let timeMoment = moment(time)
        let nowMoment = moment(new Date())

        let text = timeMoment.format('HH:mm')
        if (timeMoment.startOf('day').valueOf() != nowMoment.startOf('day').valueOf()) {
            if (timeMoment.startOf('day').valueOf() == nowMoment.subtract(1, 'days').startOf('day').valueOf()) {
                text = 'yesterday'
            } else {
                text = timeMoment.format('YY/MM/DD')
            }
        }
        return text
    }
    liveChange = (data, initData, key, value, extra, full) => {
        console.log('changed key', key)
        this.props.selectApplet(value)
    }
    onRightClickItem = (event, item, type) => {
        let currentItem = item;
        let corner = getBoundingClientRect(this.cornerDiv)

        this.setState({
            showContextMenu: true,
            contextMenu: {
                xPos: event.pageX - corner.left,
                yPos: event.pageY - corner.top,
                show: true,
                view: type
            },
            currentItem
        })
    }
    render() {
        // console.log(this.props.messengers)
        return (
            <div className="w-100 p-0 m-0 h-100" style={{ backgroundColor: '#181818' }}>
                {/* <div className="col-12 col-md-5 col-lg-4 mb-5 mt-4 w-100 p-0"> */}


                <div className="no-scrollbar w-100">



                    {/* <div style={{ position: "sticky", top: "0", backgroundColor: "#fff", zIndex: "1", borderBottom: "1px solid #f6f6f6" }}>
                        <div className='flexcb pb-3 px-2 pt-3'>
                            <div className="flexc w-100">
                                <img src="/images/Asset 2.svg" height={30} />
                                <div className='ml-2'>
                                    <h2 className="m-0 text-semibig mb-0" style={{ color: "#222" }}>{translate('Messenger')}</h2>
                                    <div style={{ maxWidth: 450 }}>
                                <p className="mt-0 text-smallest color-gray-1" >{translate('Get started commissioning high-level content')}</p>
                            </div>
                                </div>
                            </div>

                        </div>
                        {!this.props.isApplet && (
                            <div>
                                <FormViewer liveChange={this.liveChange} ref={el => this.form = el} headers={this.state.headers} inputClass={"modern-input"} />
                            </div>
                        )}


                    </div> */}

                    {/* <button onClick={() => this.openFilterModal()} className="flexc px-4 mrd-3 w-100 py-2" style={{ flex: 1, color: '#000', backgroundColor: '#00000007' }}>
                        <img className=" " src="/images/search.svg" alt="" width="16px" />
                        <span className="text-small mx-1  text-bold" >Filter</span>
                    </button> */}



                    {/* <div className="flexc px-2">
                        {this.state.filter && Object.values(this.state.filter).map((prop, index) => {
                            if ((prop.key != 'location') && (prop.key != 'location1')) {

                                return (
                                    <div className="flexcc mrd-2 mb-1 mt-2" key={prop.key} style={{ backgroundColor: '#f2f6f8', borderRadius: 4, padding: '4px 10px' }}>
                                        <button onClick={() => this.removeFilter(prop, null)} className="p-0 m-0 flexcc">
                                            <img className="mrd-2 opacity-7" src="/images/close.svg" alt="" width="10px" />
                                        </button>
                                        <p className="text-smaller">{checkTranslation(this.filterLabelCreator(prop))}</p>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="flexcc mrd-2 mb-1 mt-2" key={prop.key} style={{ backgroundColor: '#f2f6f8', borderRadius: 4, padding: '4px 10px' }}>
                                        <button onClick={() => this.removeFilter(prop, null)} className="p-0 m-0 flexcc">
                                            <img className="mrd-2 opacity-7" src="/images/close.svg" alt="" width="10px" />
                                        </button>
                                        <p className="text-smaller">LAT {prop.value.lat} - LNG {prop.value.lng} {prop.value.radius ? (" - Radius " + priceStandardView(prop.value.radius) + ' meters') : ""} </p>
                                    </div>
                                )
                            }
                        }
                        )}  

                    </div> */}


                    {/* {this.state.data.map((item, index) => { */}
                    {console.log('Isssteacher', this.props.isTeacher)}
                    {this.props.isTeacher ? (

                        this.state.messengerList?.map((item, index) => {
                            let name = item["**name"]
                            let image

                            return (

                                <div className="single-ticket p-3 flexc w-100 my-3" style={{ transition: 'all 0.5s', cursor: 'pointer', backgroundColor: this.props.messenger?._id == item._id ? '#242424' : '#202020', borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }} onClick={() => this.props.openOne(item)}>
                                    <div style={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1 }}></div>
                                    <div className='w-100 flexc' >
                                        <div className="px-2 w-100">
                                            <div className="flexcb">
                                                <div>
                                                    <p className="mb-0" style={{ fontSize: 20, fontWeight: 500, color: '#e0e0e0' }}>{name}</p>
                                                </div>
                                                <div>
                                                    <div className=" flexcc" style={{}}>
                                                        <img src={imageAddress(image, "profile", 'thumb')} style={{ width: 50, height: 50, borderRadius: 40, objectFit: 'cover' }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            < div className="single-ticket p-3 flexc w-100 my-3" style={{ transition: 'all 0.5s', cursor: 'pointer', backgroundColor: this.props.messenger?.type == 'teacher' ? '#242424' : '#202020', borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }} onClick={() => this.props.openOne(this.props.course?.teacher?._id, true)}>
                                {console.log('this.props.messenger?._id!', this.props.messenger?._id)}
                                {console.log('this.props.course?.teacher?._id!', this.props.course?.teacher?._id)}
                                <div style={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1 }}></div>
                                <div className='w-100 flexc' >
                                    <div className="px-2 w-100">
                                        <div className="flexcb">
                                            <div>
                                                <p className="mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#e0e0e0' }}>{this.props.course?.teacher?.fullname}</p>
                                            </div>
                                            <div>
                                                <div className=" flexcc" style={{}}>
                                                    <img src={imageAddress(this.props.course?.teacher?.image, "profile", 'thumb')} style={{ width: 50, height: 50, borderRadius: 40, objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="single-ticket p-3 flexc w-100 my-3" style={{ transition: 'all 0.5s', cursor: 'pointer', backgroundColor: this.props.messenger?._id == this.props.course?.group?._id ? '#242424' : '#202020', borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }} onClick={() => this.props.openOne(this.props.course?.group)}>
                                <div style={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1 }}></div>
                                <div className='w-100 flexc' >
                                    <div className="px-2 w-100">
                                        <div className="flexcb">
                                            <div>
                                                <p className="mb-0" style={{ fontSize: 18, fontWeight: 500, color: '#e0e0e0' }}>{this.props.course?.group?.name}</p>
                                            </div>
                                            <div>
                                                <div className=" flexcc" style={{}}>
                                                    <img src={imageAddress(this.props.course?.teacher?.image, "profile", 'thumb')} style={{ width: 50, height: 50, borderRadius: 40, objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ) */}


                    {/* })} */}
                    {/* {this.state.showContextMenu && (
                        <div style={{ position: "fixed", top: this.state.contextMenu.yPos, left: this.state.contextMenu.xPos, zIndex: "100000" }}>
                            <div className='shadow-2 px-3 py-1 br-10' style={{ width: "150px", backgroundColor: "#fff", }}>
                                {this.state.MessengerContextMenu.map((prop, index) => {
                                    return (
                                        <button className='flexcb w-100 py-2' style={{ borderBottom: "1px solid #eee" }} onClick={() => this.replyAction(prop.key)}>
                                            <p>{prop.title}</p>
                                            <img width={22} src={prop.icon} />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )} */}
                    {/* <Modal className="blur-bg-side" ref={el => this.deletemessage = el} maxWidth={400} style={{}}>
                        <div className='flexcc p-4 br-15 flex-column m-5' style={{ backgroundColor: "#fff" }}>
                            <p className='text-center'>Are you sure you want to Delete this Messenger?</p>
                            <div className='mt-3'>
                                <button className='px-3 py-2 br-10 mx-2 red-box-fill' onClick={() => this.deleteMessageAction(this.state.currentItem)}>
                                    <p className='font-size-14'>Yes</p>
                                </button>
                                <button className='px-3 py-2 br-10 mx-2' style={{ backgroundColor: "#eee" }} onClick={() => this.hideModal()}>
                                    <p className='font-size-14'>Cancel</p>
                                </button>
                            </div>
                        </div>
                    </Modal> */}


                    {
                        !this.state.isLoadingMessengers && (!this.props.messengers?.list || this.props.messengers?.list.length == 0) && (
                            <div className="px-3 flexcc flex-column mt-5">
                                <img src="/images/robot.png" height={50} />
                                <p className="text-center text-small text-semibold mt-2">No Message is available</p>
                                <p className="text-center text-smaller mt-1"> You can find users and hubs and start communication throught chat with them.</p>
                            </div>
                        )
                    }

                    {/* <div className="mt-3">
                        <Pagination currentPage={this.state.currentPage} totalCount={this.state.totalCount} limit={this.state.limit} changePage={this.changePage} />
                    </div> */}
                </div>



                {/* <MessengerCreateNew isApplet={this.props.isApplet} variables={this.props.variables} ref={el => this.MessengerCreateNew = el} width={this.props.width} openOne={this.props.openOne} myId={this.state.myId} setMessenger={this.props.setMessenger} /> */}


            </div >
        )
    }

}



const mapStateToProps = state => ({ settings: state.settings, user: state.user, messengers: state.messengers })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessengerList);
