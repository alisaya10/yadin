import React, { Component } from 'react'
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'
import SidebarView from '../../../SidebarView'
import Members from '../sideBar/Members'





export default class ContactInfo extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        show: false,
        option: [
            { icon: "/assets/icons/manage-gray.svg", title: "Edit Contact", color: "#444", key: "manage" },
            { icon: "/assets/icons/messenger/share-contact.svg", title: "Share Contact", color: "#444", key: "share" },
            { icon: "/assets/icons/messenger/block.svg", title: "Block User", color: "#E61515", key: "block" },
        ],
        contactUser: {},
        userinfo: { username: "@Gedrich98", des: "this is a test bio description that's it the rest is just a usless words just to make this test a little bit longer for testing the UI.", number: "+989021377118" }
    }
    componentDidMount() {
        this.sidebarView.openSidebar()
        let contactUser = {}
        this.props.messenger.users.forEach(user => {
            if (this.props.myId != user._id) {
                contactUser.username = user.hub?.username
                contactUser.fullname = user.hub?.fullname
                contactUser.phone = user.hub?.phone
            }
        });
        this.setState({contactUser})
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
            <div className='w-100 h-100 scroll-no-scrollbar'>
                <SidebarView onClosed={this.onClosed} hight={"100%"} width={this.props.width} ref={el => this.sidebarView = el} hideOverlay={false} widthCondition={{ xs: "100%", sm: "100%", md: '50%', lg: "33.3%", xl: "25%" }}>

                    <div className='pb-3 h-100' >
                        <div className='flexcb py-2 h-100 px-3 position-sticky top-0 blur-bg-side' style={{ borderBottom: "1px solid #eee" }} ref={el => this.firstCurrentNode = el}>
                            <p>User Info</p>
                            <button onClick={() => this.openFirstView()}>
                                <img width={25} src='/assets/icons/more-v-black.svg' />
                            </button>
                        </div>
                        <div className='flexc px-3 py-3' style={{ borderBottom: "1px solid #eee" }}>
                            <button className='flexcc'>
                                <img width={35} src='/assets/icons/profile-icon.svg' />
                            </button>
                            <div className='mld-4'>
                                <p className='font-size-16 weight-500' style={{ color: "#444" }}>{this.state.contactUser.fullname}</p>
                                <p className='font-size-10 weight-300' style={{ color: "#999" }}>Last Seen Status</p>
                            </div>
                        </div>
                        <div className='flexcb px-3 py-3' style={{ borderBottom: "1px solid #eee" }}>
                            <div className='d-flex flex-column'>
                                <button className='text-start'>
                                    <p className='font-size-14'>{this.state.contactUser.username}</p>
                                </button>
                                <p className='font-size-12' style={{ color: "#777" }}>Username</p>

                                <button className='text-start mt-4'>
                                    <p className='font-size-14 '>{this.state.contactUser.phone}</p>
                                </button>
                                <p className='font-size-12' style={{ color: "#777" }}>Phone Number</p>

                                {/* <button className='text-start mt-4'>
                                    <p className='font-size-14 '>{this.props.messenger.des}</p>
                                </button>
                                <p className='font-size-12' style={{ color: "#777" }}>Bio</p> */}

                            </div>
                        </div>
                        <div className=' px-3 py-3' style={{ borderBottom: "1px solid #eee" }}>
                            <div className='flexcb'>
                                <div className='flexc'>
                                    <img src='/assets/icons/notification-gray.svg' />
                                    <p className='mld-4' style={{ color: "#444" }}>Notification</p>
                                </div>
                                <button>
                                    <SwitchInput header={{ information: {} }} />
                                </button>
                            </div>
                            <button className='blue-btn w-100 mt-3 p-2 br-10'>
                                <p className='white font-size-14'>Send Meesage</p>
                            </button>
                        </div>
                        <FixedView ref={el => this.firstView = el} nodeRef={this.firstCurrentNode} showFocus={false} topOffset={0} xOffset={-220} zIndex={10} >
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
                        </FixedView>
                        <FixedView ref={el => this.memberView = el} nodeRef={this.memberNode} showFocus={false} topOffset={-150} xOffset={70} zIndex={10} >
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
                        </FixedView>
                    </div>
                </SidebarView>
            </div>
        )
    }
}
