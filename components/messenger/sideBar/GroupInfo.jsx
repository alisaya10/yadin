import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'
import Modal from '../../../Modal'
import Members from '../sideBar/Members'
import * as actions from '../../../../stores/actionsList';





class GroupInfo extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        show: false,
        fixed: false,
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

        option: [
            { icon: "/assets/icons/manage-gray.svg", title: "Manage Group", color: "#444", key: "manage" },
            // { icon: "/assets/icons/leave-red.svg", title: "Leave Group", color: "#E61515", key: "leave" },
        ],
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({ fixed: true })
        }, 100);
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
    setAction = (key) => {
        if (key == 'leave') {
            this.leaveGroup(key)
        }
        else if (key == 'manage') {
            this.props.changeStage(key)
        }
    }
    leaveGroup = (type) => {
        console.log('===========')
        console.log('user', this.props.user)
        console.log('messenger', this.props.messenger)
        let data = {}
        if (type == 'leave') {
            data = { messenger: this.props.messenger._id }
        }
        else {
            data = { hub: this.props.user.hub._id, fullname: this.props.user.hub.fullname, messenger: this.props.messenger._id }
        }
        data.type = type
        // console.log(data)
        this.props.removeUser(data)
    }
    showLeaveModal() {
        this.leaveModal.showModal()
    }

    render() {
        let type = this.state.type
        return (
            <div className='h-100'>
                <div className='pb-3 h-100'>
                    <div className='flexcb py-2 h-100 px-3 position-sticky top-0 blur-bg-side' style={{ borderBottom: "1px solid #eee" }} ref={el => this.firstCurrentNode = el}>
                        <p>Group Info</p>
                        <button onClick={() => this.openFirstView()}>
                            <img width={25} src='/assets/icons/more-v-black.svg' />
                        </button>
                    </div>
                    <div className='flexc px-3 py-3' style={{ borderBottom: "1px solid #ddd" }}>
                        <button>
                            <img width={35} src='/assets/icons/profile-icon.svg' />
                        </button>
                        <div className='mld-4'>
                            <p className='font-size-18 weight-500' style={{ color: "#444" }}>{this.props.messenger?.name}</p>
                            <p className='font-size-14 weight-300' style={{ color: "#999" }}>{this.props.messenger?.users?.length} members</p>
                        </div>
                    </div>
                    <div className='flexcb px-3 py-3' style={{ borderBottom: "1px solid #ddd" }}>
                        <div className='flexc'>
                            <img src='/assets/icons/notification-gray.svg' />
                            <p className='mld-4' style={{ color: "#444" }}>Notification</p>
                        </div>
                        <button>
                            <SwitchInput header={{ information: {} }} />
                        </button>
                    </div>
                    <div className='px-3 py-3' style={{ borderBottom: "1px solid #ddd" }}>
                        <div className='flexcb'>
                            <div className='flexc'>
                                <img src='/assets/icons/people-gray.svg' />
                                <p className='mld-4' style={{ color: "#444" }}>{this.props.messenger?.users?.length} Members</p>
                            </div>
                            <button onClick={() => this.props.changeStage("search")}>
                                <img src='/assets/icons/add-member-gray.svg' />
                            </button>
                        </div>
                        <div className='mt-4'>
                            {console.log('this.props.messenger.users', this.props.messenger?.users)}
                            {this.props.messenger?.users?.map((prop, index) => {
                                return (
                                    <div className='flexcb w-100 py-2'>
                                        <Members myId={this.props.myId} leaveGroup={this.leaveGroup} removeUser={this.props.removeUser} user={prop} messenger={this.props.messenger} data={{ name: prop?.hub.fullname, img: prop?.hub.image }} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {this.state.fixed && (

                        <FixedView ref={el => this.firstView = el} nodeRef={this.firstCurrentNode} showFocus={false} topOffset={0} xOffset={-220} zIndex={10} >
                            <div className='shadow-2 px-3 py-1 br-10' style={{ backgroundColor: "#fff", width: "max-Content" }}>
                                {this.state.option.map((prop, index) => {
                                    return (
                                        <div className='my-2'>
                                            <button className='flexc' onClick={() => this.setAction(prop.key)}>
                                                <img src={prop.icon} />
                                                <p className='mld-3' style={{ color: prop.color }}>{prop.title}</p>
                                            </button>
                                        </div>
                                    )
                                })}
                                <button className='flexc' onClick={() => this.showLeaveModal()}>
                                    <img src='/assets/icons/leave-red.svg' />
                                    <p className='mld-3' style={{ color: "#E61515" }}>Leave Group</p>
                                </button>
                            </div>
                        </FixedView>
                    )}

                    <Modal className="blur-bg-side" ref={el => this.leaveModal = el} maxWidth={700} style={{}}>
                        <div className='flexcc p-4 br-15 flex-column m-5' style={{ backgroundColor: "#fff" }}>
                            <p className='text-center'>Are you sure you want to Leave the Group?</p>
                            <div className='mt-3'>
                                <button className='px-3 py-2 br-10 mx-2 red-box-fill'>
                                    <p className='font-size-14'>Leave</p>
                                </button>
                                <button className='px-3 py-2 br-10 mx-2' style={{ backgroundColor: "#eee" }}>
                                    <p className='font-size-14'>Cancel</p>
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div >
            </div >
        )
    }
}
const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupInfo);

