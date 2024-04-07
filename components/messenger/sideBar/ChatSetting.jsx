import React, { Component } from 'react'
import TextInput from '../../../inputs/TextInput'





export default class ChatSetting extends Component {
  state = {
    copySuccess: '',
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
            <p className='font-size-16 weight-500' style={{ color: "#222" }}>Chat History</p>
          </div>
        </div>


        <div className='p-3' style={{ borderBottom: "1px solid #ddd" }}>

          <div className='' style={{ maxWidth: "200px", }}>
            <button className='d-flex text-start'>
              <img src='/assets/icons/messenger/circle-blue.svg' />
              <div className=''>
                <p className='font-size-14 weight-500' style={{ color: "#444" }}>Visible</p>
                <p style={{ color: "#666" }}>Members will be able to see previous chats.</p>
              </div>
            </button>
            <button className='d-flex text-start mt-3'>
              <img src='/assets/icons/messenger/circle-fill-blue.svg' />
              <div className=''>
                <p className='font-size-14 weight-500' style={{ color: "#444" }}>Hidden</p>
                <p style={{ color: "#666" }}>Previus chats will be hidden to new users.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
