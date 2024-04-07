import React, { Component } from 'react'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'





export default class MessengerPermission extends Component {
    state = {
        permissions: [
            { title: "Send Messages" },
            { title: "Send Media" },
            { title: "Add Members" },
            { title: "Creat Topics" },
            { title: "Pin Messages" },
            { title: "change Group info" },
        ]


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
                        <p className='font-size-16 weight-500' style={{ color: "#222" }}>Permissions</p>
                    </div>
                </div>


                <div className='p-3' style={{ borderBottom: "1px solid #ddd" }}>
                    <div className=''>
                        <div>
                            <p className='font-size-14' style={{ color: "#007AFF" }}>What Can member of this group do?</p>
                        </div>
                        {this.state.permissions.map((prop, index) => {
                            return (
                                <div className='flexcb py-2'>
                                    <p>{prop.title}</p>
                                    <button>
                                        <SwitchInput header={{ information: {} }} />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
