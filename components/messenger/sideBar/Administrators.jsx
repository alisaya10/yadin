import React, { Component } from 'react'
import { imageAddress, translate } from '../../../../utils/useful'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'





export default class Administrators extends Component {
    state = {

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
                        <p className='font-size-16 weight-500' style={{ color: "#222" }}>Administrators</p>
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
                        <div className='flexc mt-3'>
                            {this.props.messenger.users?.map((item) => {
                                return (
                                    <>
                                        {console.log('users role', item)}
                                        {(item.role == 'creator' || item.role == 'admin') && (
                                            <>
                                                <img src={imageAddress(item.hub?.image, 'profile', 'thumb')} />
                                                <div className='mld-3'>
                                                    <p>{item.hub.fullname}</p>
                                                    <p className='font-size-10' style={{ color: "#555" }}>{item.role}</p>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
