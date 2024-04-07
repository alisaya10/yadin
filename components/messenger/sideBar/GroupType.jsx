import React, { Component } from 'react'
import TextInput from '../../../inputs/TextInput'





export default class GroupType extends Component {
  state = {
    copySuccess: '',
  }



  openSidebar = () => {
    this.sidebarView.openSidebar()
  }

  openFirstView = () => {
    this.firstView.showView()
  }



  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };


  render() {
    return (
      <div className='h-100'>


        <div className='flexcb px-2 py-3' style={{ borderBottom: "1px solid #ddd" }}>
          <button className='flexc' onClick={() => this.props.changeStage("manage")}>
            <img width={18} src='/assets/icons/arrow-left-blue.svg' />
            <p className='font-size-12' style={{ color: "#0085ff" }}>Manage Group</p>
          </button>
          <div className='px-2'>
            <p className='font-size-16 weight-500' style={{ color: "#222" }}>Group Type</p>
          </div>
        </div>


        <div className='p-3' style={{ borderBottom: "1px solid #ddd" }}>

          <div className='' style={{ maxWidth: "200px", }}>
            <button className='d-flex text-start'>
              <img src='/assets/icons/messenger/circle-blue.svg' />
              <div className=''>
                <p className='font-size-14 weight-500' style={{ color: "#444" }}>Public Group</p>
                <p style={{ color: "#666" }}>Anyone can find the group in search and join, Chat history is available to everybody.</p>
              </div>
            </button>
            <button className='d-flex text-start mt-3'>
              <img src='/assets/icons/messenger/circle-fill-blue.svg' />
              <div className=''>
                <p className='font-size-14 weight-500' style={{ color: "#444" }}>Priver Group</p>
                <p style={{ color: "#666" }}>People can only join if they are added or have an invite link.</p>
              </div>
            </button>
          </div>
        </div>


        <div className='p-3' style={{ borderBottom: "1px solid #ddd" }}>
          <div className='px-2'>
            <p className='font-size-14 weight-500' style={{ color: "#222" }}>Primery Link</p>
          </div>
          <div className='mt-3'>
            <div>
              <p className='font-size-10 mx-1' style={{color:"#777"}}>Anyone who has telegram installed will be able to join your group by following this link.</p>
            </div>
            <div className='w-100 mt-3'>
              <p className='w-100 copy-input br-10 p-2' style={{ outline: "none", resize: "none", color: "#666" }} ref={(textarea) => this.textArea = textarea}>Some link Will be here To copy</p>
            </div>
            <div className='flexc mt-3'>
              <button className='blue-btn px-3 py-2 white br-10 w-100 mrd-2' onClick={this.copyToClipboard}>
                <p>Copy Link</p>
              </button>
              <button className='blue-btn px-3 py-2 white br-10 w-100 mld-2' onClick={this.copyToClipboard}>
                <p>Share Link</p>
              </button>
            </div>
          </div>
        </div>


      </div>
    )
  }
}
