import React, { Component } from 'react'
import { getBoundingClientRect } from '../../../../utils/functions';
import { translate } from '../../../../utils/useful';
import SidebarView from '../../../SidebarView';
import StagesManager from '../../../StagesManager';
import Administrators from '../sideBar/Administrators';
import ChatSetting from '../sideBar/ChatSetting';
import GroupInfo from '../sideBar/GroupInfo';
import GroupType from '../sideBar/GroupType';
import ManageGroup from '../sideBar/ManageGroup';
import MessengerPermission from '../sideBar/MeesengerPermission';
import MembersList from '../sideBar/MembersList';
import Topics from '../sideBar/Topics';




export default class GroupInformation extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        contextMenu: {},


        option: [
            { icon: "/assets/icons/manage-gray.svg", title: "Manage Group", color: "#444", key: "manage" },
            { icon: "/assets/icons/leave-red.svg", title: "Leave Group", color: "#E61515", key: "leave" },
        ],

        MessengerContextMenu: [
            { icon: "/assets/icons/messenger/reply.svg", title: "Reply" },
            { icon: "/assets/icons/messenger/copy.svg", title: "Copy" },
            { icon: "/assets/icons/messenger/edit.svg", title: "Edit" },
            { icon: "/assets/icons/messenger/pin.svg", title: "Pin" },
            { icon: "/assets/icons/messenger/forward.svg", title: "Forward" },
            { icon: "/assets/icons/messenger/select.svg", title: "Select" },
            { icon: "/assets/icons/messenger/trash.svg", title: "Delete" },
        ]
    }

    componentDidMount = () => {
        this.openSidebar()
        // document.addEventListener("mousedown", this.handleClickOutside);

    }

    openSidebar = () => {
        this.sidebarView.openSidebar()
    }

    openFirstView = () => {
        this.firstView.showView()
    }



    onClosed = () => {
        this.props.setData('messengerInfo', !this.props.messengerInfo)
    }


    render() {
        let type = this.state.type
        return (
            <div ref={el => this.container = el} className='w-100 window-content-radius h-100 d-flex flex-column scroll-no-scrollbar' style={{ background: "#f6f6f6" }}>
                <div className="">
                    <SidebarView onClosed={this.onClosed} hight={"100%"} width={this.props.width} ref={el => this.sidebarView = el} hideOverlay={false} widthCondition={{ xs: "100%", sm: "100%", md: '50%', lg: "33.3%", xl: "25%" }}>
                        <div className='w-100 h-100 scroll-no-scrollbar'>
                            <StagesManager ref={el => this.stageManager = el} fast={true}>
                                <GroupInfo width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} removeUser={this.props.removeUser} changeStage={this.changePage} stage={0} stageName={'info'} />
                                <ManageGroup width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'manage'} />
                                <GroupType width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'grouptype'} />
                                <ChatSetting width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'chatsetting'} />
                                <MessengerPermission width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'permission'} />
                                <Administrators width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'adminestators'} />
                                <MembersList width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'members'} />
                                <Topics width={this.props.width} myId={this.props.myId} messenger={this.props.messenger} changeStage={this.changePage} stage={1} stageName={'topic'} />
                            </StagesManager>
                        </div>
                    </SidebarView>
                </div>
                {this.state.showContextMenu && (
                    <div style={{ position: "fixed", top: this.state.contextMenu.yPos, left: this.state.contextMenu.xPos }}>
                        <div className='shadow-2 px-3 py-1 br-10 blur-bg' style={{ width: "150px" }}>
                            {this.state.MessengerContextMenu.map((prop, index) => {
                                return (
                                    <button className='flexcb w-100 py-2' style={{ borderBottom: "1px solid #eee" }}>
                                        <p>{prop.title}</p>
                                        <img width={22} src={prop.icon} />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
