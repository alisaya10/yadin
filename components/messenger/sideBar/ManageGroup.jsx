import React, { Component } from 'react'
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'
import Modal from '../../../Modal'





export default class ManageGroup extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        show: false,
        groupName: '',
        description: '',


        Members: [
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
        ],

        option: [
            { icon: "/assets/icons/manage-gray.svg", title: "Manage Group", color: "#444", key: "manage" },
            // { icon: "/assets/icons/leave-red.svg", title: "Leave Group", color: "#E61515", key: "leave" },
        ],

        manage: [
            { icon: "/assets/icons/messenger/group.svg", name: "Group Type", state: "Private", key: "grouptype" },
            { icon: "/assets/icons/messenger/chat.svg", name: "Chat history for new members", state: "Visible", key: "chatsetting" },
            { icon: "/assets/icons/messenger/topic.svg", name: "Topics", state: "", key: "topic" },
            // { icon: "/assets/icons/messenger/like.svg", name: "Reaction", state: "All", key:"grouptype" },
            { icon: "/assets/icons/messenger/key.svg", name: "Permissions", state: "8/8", key: "permission" },
            // { icon: "/assets/icons/messenger/link.svg", name: "Invite links", state: "1", key:"grouptype" },
            { icon: "/assets/icons/messenger/shield.svg", name: "Adminestators", state: "1", key: "adminestators" },
            { icon: "/assets/icons/messenger/members.svg", name: "Members", state: "4", key: "members" },
            // { icon: "/assets/icons/messenger/bolt.svg", name: "Recent actions", state: "", key:"grouptype" },
        ]
    }

    componentDidMount = () => {
        this.setState({ groupName: this.props.messenger.name, description: this.props.messenger?.description })
        let manage =this.state.manage
        manage.forEach((item) => {
            if (item.key == 'members') {
                item.state = this.props.messenger.users.length        
            }
        })
        this.setState({manage})
    }

    openSidebar = () => {
        this.sidebarView.openSidebar()
    }

    openFirstView = () => {
        this.firstView.showView()
    }

    changeValue = (key, value) => {
        this.setState({ [key]: value })
    }

    createGroup = () => {
        let hubs = this.form.getForm()
        if (this.state.groupName && hubs.hubs.length != 0) {
            let data = {}
            data.hubs = hubs.hubs
            data.groupName = this.state.groupName
            this.props.createGroup(data)
        }
    }



    render() {
        return (
            <div className='h-100 scroll-no-scrollbar'>
                <div style={{ borderBottom: "1px solid #ddd" }}>
                    <div className='flexcb px-3 py-3'>
                        <button className='flexc' onClick={() => this.props.changeStage("info")}>
                            <img width={20} src='/assets/icons/arrow-left-blue.svg' />
                            <p className='font-size-12' style={{ color: "#0085ff" }}>Group Info</p>
                        </button>
                        <div>
                            <button className='mx-2 hover-btn'>
                                <p style={{ color: "#FF0000" }}>Discard</p>
                            </button>
                            <button className='mx-2'>
                                <p style={{ color: "#007AFF" }}>Save</p>
                            </button>
                        </div>
                    </div>
                    <div className='flexc px-3 py-3'>
                        <button className='flexcc'>
                            <img src='/assets/icons/editpic.svg' />
                        </button>
                        <div className='mld-4'>
                            <p className='font-size-14' style={{ color: "#0085FF" }}>Group Name</p>
                            <TextInput data={this.state.groupName} changeValue={this.changeValue} header={{ key: 'groupName', information: { rows: 1, placeholder: 'write you preferd name' }, }} />
                        </div>
                    </div>
                    <div className='px-3 py-3'>
                        <p className='font-size-14' style={{ color: "#0085FF" }}>Description (Optional)</p>
                        <TextInput data={this.state.description} changeValue={this.changeValue} header={{ key: 'description', information: { rows: 1, placeholder: 'write the description' }, }} />
                    </div>
                </div>
                <div className='px-3'>
                    {this.state.manage.map((prop, index) => {
                        return (
                            <button className='flexcb py-3 w-100' onClick={() => this.props.changeStage(prop.key)}>
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
        )
    }
}
