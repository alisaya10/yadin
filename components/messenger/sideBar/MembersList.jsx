import React, { Component } from 'react'
import { translate } from '../../../../utils/useful'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'
import Members from './Members'





export default class MembersList extends Component {
    state = {

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

    }



    openSidebar = () => {
        this.sidebarView.openSidebar()
    }

    openFirstView = () => {
        this.firstView.showView()
    }






    render() {
        return (
            <div className='h-100'>


                <div className='flexcb px-2 py-3' style={{ borderBottom: "1px solid #ddd" }}>
                    <button className='flexc' onClick={() => this.props.changeStage("manage")}>
                        <img width={18} src='/assets/icons/arrow-left-blue.svg' />
                        <p className='font-size-12' style={{ color: "#0085ff" }}>Manage Group</p>
                    </button>
                    <div className='px-2'>
                        <p className='font-size-16 weight-500' style={{ color: "#222" }}>Members</p>
                    </div>
                </div>


                <div className='p-3' style={{ borderBottom: "1px solid #ddd" }}>
                    <div className=''>
                        <div className='navbar-search py-2 px-3 br-10'>
                            <div className='d-flex flexcb'>
                                <input className="w-100" onChange={e => this.changeValue(e)} value={this.state.search} type="text" placeholder={translate(`Search in Yonnect and beyond`)} style={{ backgroundColor: 'transparent', }} />
                                <img style={{ width: '25px', height: '25px' }} src="/images/icons/search.svg" />
                            </div>
                        </div>
                        <div className='flexc w-100'>
                            <div className='mt-4 w-100'>
                                {this.props.messenger.users.map((prop, index) => {
                                    return (
                                        <div className='flexcb w-100 py-2'>
                                            <Members user={prop} messenger={this.props.messenger} data={{ name: prop?.hub.fullname, img: prop?.hub.image }} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
