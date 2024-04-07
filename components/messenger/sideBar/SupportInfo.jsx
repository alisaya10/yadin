import React, { Component } from 'react'
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'
import Members from '../sideBar/Members'





export default class SupportInfo extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        show: false,

        Members: [
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            // { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
        ],

        // option: [
        //     { icon: "/assets/icons/manage-gray.svg", title: "Add Admine", color: "#444", key: "manage" },
        //     { icon: "/assets/icons/leave-red.svg", title: "Leave Group", color: "#E61515", key: "leave" },
        // ],

        manage: [
            // { icon: "/assets/icons/messenger/group.svg", name: "Group Type", state: "Private", key: "grouptype" },
            // { icon: "/assets/icons/messenger/chat.svg", name: "Chat history for new members", state: "Visible", key: "chatsetting" },
            // { icon: "/assets/icons/messenger/topic.svg", name: "Topics", state: "", key: "topic" },
            // { icon: "/assets/icons/messenger/like.svg", name: "Reaction", state: "All", key:"grouptype" },
            { icon: "/assets/icons/messenger/key.svg", name: "Permissions", state: "8/8", key: "permission" },
            // { icon: "/assets/icons/messenger/link.svg", name: "Invite links", state: "1", key:"grouptype" },
            { icon: "/assets/icons/messenger/shield.svg", name: "Adminestators", state: "1", key: "adminestators" },
            { icon: "/assets/icons/messenger/statistic.svg", name: "Statistics", state: "4", key: "statistics" },
            { icon: "/assets/icons/messenger/setting.svg", name: "Setting", state: "4", key: "setting" },
            // { icon: "/assets/icons/messenger/bolt.svg", name: "Recent actions", state: "", key:"grouptype" },
        ]
    }



    openSidebar = () => {
        this.sidebarView.openSidebar()
    }

    openFirstView = () => {
        this.firstView.showView()
    }

    openMemberView = () => {
        this.memberView.showView()
    }




    render() {
        let type = this.state.type
        return (
            <div className='h-100'>
                <div className='pb-3 h-100'>
                    <div className='flexcb py-2 h-100 px-3 position-sticky top-0 blur-bg-side' style={{ borderBottom: "1px solid #eee" }} ref={el => this.firstCurrentNode = el}>
                        <p>Support Info</p>
                        {/* <button onClick={() => this.openFirstView()}>
                            <img width={25} src='/assets/icons/more-v-black.svg' />
                        </button> */}
                    </div>
                    <div className='flexc px-3 py-3' style={{ borderBottom: "1px solid #eee" }}>
                        <button className='flexcc'>
                            <img width={35} src='/assets/icons/profile-icon.svg' />
                        </button>
                        <div className='mld-4'>
                            <p className='font-size-18 weight-500' style={{ color: "#444" }}>Support Name</p>
                            <p className='font-size-10 weight-300' style={{ color: "#999" }}>Number of Support Adminestatores</p>
                        </div>
                    </div>
                    <div className='px-3 py-3' style={{ borderBottom: "1px solid #eee" }}>
                        <div className=''>
                            {this.state.manage.map((prop, index) => {
                                return (
                                    <button className='flexcb py-3 w-100 text-start' onClick={() => this.props.changeStage(prop.key)}>
                                        <div className='flexc'>
                                            <img className='mrd-3' width={22} src={prop.icon} />
                                            <p>{prop.name}</p>
                                        </div>
                                        <p style={{ color: "#0085ff" }}>{prop.state}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    {/* <FixedView ref={el => this.firstView = el} nodeRef={this.firstCurrentNode} showFocus={false} topOffset={0} xOffset={-220} zIndex={10} >
                        <div className='shadow-2 px-3 py-1 br-10' style={{ backgroundColor: "#fff", width: "max-Content" }}>
                            {this.state.option.map((prop, index) => {
                                return (
                                    <div className='my-2'>
                                        <button className='flexc' onClick={() => this.props.changeStage(prop.key)}>
                                            <img src={prop.icon} />
                                            <p className='mld-3' style={{ color: prop.color }}>{prop.title}</p>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </FixedView> */}
                </div>
            </div>
        )
    }
}
