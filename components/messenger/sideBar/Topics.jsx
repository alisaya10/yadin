import React, { Component } from 'react'
import HttpServices from '../../../../utils/Http.services'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'





export default class Topics extends Component {
    state = {
        permissions: [
            { title: "Send Messages" },
            { title: "Send Media" },
            { title: "Add Members" },
            { title: "Creat Topics" },
            { title: "Pin Messages" },
            { title: "change Group info" },
        ],
        topic: ""


    }


    createTopic = (messenger) => {
        let users = []
        let data = {}
        if (this.form1) {
            users = this.form1.getForm()
            data.users = users
        }
        data.topic = this.state.topicName
        data.messenger = messenger
        HttpServices.request('createTopic', data, (fetchResult, fetchError) => {

        })

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
                            <p className='font-size-14' style={{ color: "#777" }}>Choose the first topic to activate the topic feature</p>
                        </div>
                        <div className='flexcb'>
                            <div className='px-3 py-3'>
                                <p className='font-size-14' style={{ color: "#0085FF" }}>Title</p>
                                <TextInput data={this.state.topic} changeValue={this.changeValue} header={{ key: 'topic', information: { rows: 1, placeholder: 'write the description' }, }} />
                            </div>
                            <button className='blue-btn px-3 py-2 br-10' onClick={() => this.createTopic(this.props.messenger._id)}>
                                <p className='font-size-12 white'>Done</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-100 flexcc mt-3'>
                    <button className='blue-btn py-2 mx-2 px-5 br-10'>
                        <p className='white font-size-12'>Add more Topic</p>
                    </button>
                </div>
            </div>
        )
    }
}
