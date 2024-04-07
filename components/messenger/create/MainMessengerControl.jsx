import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actionsList';

import { checkTextTranslation, checkTranslation, imageAddress, pathMaker, phoneStandardView, priceStandardView, translate } from "../../../utils/useful";

class MainMessengerControl extends React.Component {

    render() {
        return (
            <div className="w-100 h-100 pt-3 px-3 pb-3 scroll-no-scrollbar">
                <p className=" text-small text-semibold px-1">{translate("New Chat")}</p>

                <div className=" mt-2 w-100">
                    <div style={{ backgroundColor: '#f6f6f6', borderRadius: 6 }}>
                        <input className="py-2 px-2 w-100" placeholder={translate('Search ...')} style={{ backgroundColor: 'transparent', border: 'none' }} />
                    </div>
                </div>

                <div className=" mt-2">
                    <button className="flexc px-1 w-100 pb-2 pt-1 mb-1" style={{ borderBottom: "1px solid #f6f6f6" }} onClick={() => this.props.changeStage('createGroup')}>
                        <img src={'/assets/icons/applets/messenger/group.png'} height="20px" />
                        <p className="mx-2 text-small text-semibold" style={{ color: '#009aff' }}>New Group</p>
                    </button>
                    {/* {this.props.isApplet && (
                        <button className="flexc px-1 w-100 pb-2 pt-1 mb-1" style={{ borderBottom: "1px solid #f6f6f6" }} onClick={() => this.props.changeStage('createSupport')}>
                            <img src={'/assets/icons/applets/messenger/group.png'} height="20px" />
                            <p className="mx-2 text-small text-semibold" style={{ color: '#009aff' }}>New Support</p>
                        </button>
                    )} */}

                    <button className="flexc px-1 w-100 pb-2 pt-1 mb-1" style={{ borderBottom: "1px solid #f6f6f6" }}>
                        <img src={'/assets/icons/applets/messenger/createContact.png'} height="20px" />
                        <p className="mx-2 text-small text-semibold" style={{ color: '#009aff' }}>New Contact</p>
                    </button>

                    <button className="flexc px-1 w-100 pb-2 pt-1 mb-1" style={{ borderBottom: "1px solid #f6f6f6" }}>
                        <img src={'/assets/icons/applets/messenger/broudcast.png'} height="20px" />
                        <p className="mx-2 text-small text-semibold" style={{ color: '#009aff' }}>New Broadcast</p>
                    </button>


                </div>

                <div>
                    {this.props.contactsList?.map((item, index) => {
                        console.log('item10', item)
                        return (

                            <div className="single-ticket py-2 flexc w-100 " style={{ transition: 'all 0.5s', cursor: 'pointer', borderBottom: "1px solid #f6f6f6" }} onClick={() => this.props.openOne(item)}>
                                <div>
                                    <div className=" flexcc" style={{}}>
                                        <img src={imageAddress(item?.image, "profile", 'thumb')} style={{ width: 30, height: 30, borderRadius: 30, objectFit: 'cover' }} />
                                    </div>
                                </div>
                                <div className="px-2 w-100">
                                    <div className="flexcb w-100">
                                        <p className="mb-0 text-semibold" style={{ fontSize: 13, color: '#202020' }}>{checkTranslation(item?.name)}</p>

                                        {/* {this.props.messengers?.notifications[item?._id] != null && this.props.messengers?.notifications[item?._id] != 0 && (
                            <div className='white flexcc mld-2' style={{ borderRadius: 20, minWidth: 20, height: 20, lineHeight: 1, backgroundColor: '#ee5050', right: 0 }}>
                                <span className='text-smaller'>{this.props.messengers.notifications[item?._id]}</span>
                            </div>
                        )} */}
                                    </div>
                                    <p className="" style={{ color: '#567', fontSize: 11 }}>@{item.hub?.username}</p>

                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user, messengers: state.messengers })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(MainMessengerControl);