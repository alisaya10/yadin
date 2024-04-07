import React, { Component } from 'react'
import { translate } from '../../../../utils/useful'
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'
import Members from '../sideBar/Members'





export default class MemberSearch extends Component {
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
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
        ],

        option: [
            { icon: "/assets/icons/manage-gray.svg", title: "Edit Contact", color: "#444", key: "manage" },
            { icon: "/assets/icons/messenger/share-contact.svg", title: "Share Contact", color: "#444", key: "share" },
            { icon: "/assets/icons/messenger/block.svg", title: "Block User", color: "#E61515", key: "block" },
        ],

        userinfo: { username: "@Gedrich98", des: "this is a test bio description that's it the rest is just a usless words just to make this test a little bit longer for testing the UI.", number: "+989021377118" }
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

    changeValue = (key, value) => {
        this.setState({ [key]: value })
    }




    render() {
        let type = this.state.type
        return (
            <div className='h-100'>
                <div className='pb-3 h-100' >
                    <div className='h-100 position-sticky top-0 py-3 blur-bg-side'>
                        <div className='px-3 pb-3'>
                            <div className='flexcb '>
                                <button className='mx-2 hover-btn'>
                                    <p style={{ color: "#FF0000" }}>Discard</p>
                                </button>
                                <button className='mx-2'>
                                    <p style={{ color: "#007AFF" }}>Save</p>
                                </button>
                            </div>
                        </div>
                        <div className='navbar-search py-2 px-3 mx-3 br-10'>
                            <div className='d-flex flexcb'>
                                <input className="w-100" onChange={e => this.changeValue(e)} value={this.state.search} type="text" placeholder={translate(`Search for members`)} style={{ backgroundColor: 'transparent', }} />
                                <img style={{ width: '25px', height: '25px' }} src="/images/icons/search.svg" />
                            </div>
                        </div>
                    </div>
                    <div className=' px-3 py-3'>
                        {this.state.Members.map((prop, index) => {
                            return (
                                <div className='flexcb w-100 py-2'>
                                    <Members data={prop} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
