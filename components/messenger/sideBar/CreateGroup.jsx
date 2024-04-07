import React, { Component } from 'react'
import FormViewer from '../../FormViewer-new'
import TextInput from '../../input/TextInput'





export default class CreateGroup extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        show: false,
        groupName: '',
        description: '',
        headers: [
            { key: 'hubs', type: 'MultiSelectInput', col: '12', information: { label: '{{lang}}hubs', address: 'searchHubs', fields: { title: 'username', value: '_id', image: 'image' }, filter: { applet: '{{appletId}}', appletHub: '{{appletHub}}' }, type: 'api', isSearchable: false, placeholder: '{{lang}}Select', required: true } },
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

    createGroup = () => {
        if (this.state.groupName) {
            let form = this.form.getForm()
            let data = {}
            data.hubs = form.hubs
            data.hubs.push(this.props.myId)
            data.groupName = this.state.groupName
            data.description = this.state.description
            console.log(data)
            this.props.createGroup(data)
        }
    }


    render() {
        let type = this.state.type
        return (
            <div className='h-100 scroll-no-scrollbar'>
                <div className='pb-3 h-100' >

                    <div className='px-3 py-3'>
                        <div className='flexcb '>
                            <button className='mx-2 hover-btn'>
                                <p style={{ color: "#FF0000" }}>Discard</p>
                            </button>
                            <button className='mx-2' onClick={() => this.createGroup()}>
                                <p style={{ color: "#007AFF" }}>Save</p>
                            </button>
                        </div>
                    </div>

                    <div className='flexc px-3 py-3'>
                        <button className='flexcc'>
                            <img src='/assets/icons/editpic.svg' />
                        </button>
                        <div className='mld-4 messenger-input text-start'>
                            <p className='font-size-12' style={{ color: "#0085FF" }}>Group Name</p>
                            <TextInput data={this.state.groupName} changeValue={this.changeValue} header={{ key: 'groupName', information: { rows: 1, placeholder: 'write you preferd name' }, }} />
                        </div>
                    </div>
                    <div className='px-3 py-3 messenger-input text-start'>
                        <p className='font-size-12' style={{ color: "#0085FF" }}>Description (Optional)</p>
                        <TextInput data={this.state.description} changeValue={this.changeValue} header={{ key: 'description', information: { rows: 1, placeholder: 'write the description' }, }} />
                    </div>
                    <div className='navbar-search py-2 px-3 mx-3 br-10'>
                        <div className='d-flex flexcb'>
                            {/* <input className="w-100" onChange={e => this.changeValue(e)} value={this.state.search} type="text" placeholder={translate(`Search for members`)} style={{ backgroundColor: 'transparent', }} />
                            <img style={{ width: '25px', height: '25px' }} src="/images/icons/search.svg" /> */}
                            <FormViewer variables={this.props.variables} ref={el => this.form = el} headers={this.state.headers} />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
