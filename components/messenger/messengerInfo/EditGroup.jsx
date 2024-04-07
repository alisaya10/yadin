import React from "react"
import { imageAddress } from "../../../../utils/useful"
import TextInput from "../../../inputs/TextInput"
import Modal from "../../../Modal"

class EditGroup extends React.Component {
    state = {
        messengerName: '',
        userInfo: false
    }
    changeValue = (key, value) => {
        console.log('key', key, 'value', value)
        this.setState({ [key]: value })
    }
    userInfo = (messenger, item) => {
        if (!item) {
            item = {}
        }
        item.messenger = messenger._id
        this.props.openUserInfo(item)
    }
    render() {
        return (
            <div className="w-100 flexcc " style={{ position: 'absolute', left: 0, top: 45, zIndex: '2', }}>
                <div className="w-100 px-3 py-3" style={{ backgroundColor: '#fff', }}>
                    <TextInput data={this.state.messengerName} changeValue={this.changeValue} header={{ key: 'messengerName', information: { rows: 1, placeholder: '{{lang}}Group Name' } }} />
                    {/* <FormViewer ref={el => this.form1 = el} initData={{ hubs: this.state.messengerUsers }} headers={this.state.header} inputClass={'modern-input'} /> */}
                    <div onClick={() => this.props.editGroup(this.props.messenger._id, this.state.messengerName)}>
                        <button style={{ backgroundColor: '#00A4bb' }}>
                            <p style={{ fontSize: '16px' }}>Submit</p>
                        </button>
                    </div>
                    {this.props.messenger.users?.map((item, index) => {
                        console.log('item is ', item)
                        return (

                            <div className="single-ticket py-2 flexc w-100 " style={{ transition: 'all 0.5s', borderBottom: "1px solid #f6f6f6" }} >
                                <div className="single-ticket  flexc w-100 " style={{ transition: 'all 0.5s' }} >

                                    <div>
                                        <div className=" flexcc" style={{}}>
                                            <img src={imageAddress(item?.image, "", 'thumb')} style={{ width: 30, height: 30, borderRadius: 100, objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div className="px-2 w-100">
                                        <div className="flexcb w-100">
                                            <p className="mb-0 text-semibold" style={{ fontSize: 13, color: '#202020' }}>{item.fullname}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ transition: 'all 0.5s', cursor: 'pointer' }} onClick={() => this.userInfo(this.props.messenger, item)}>
                                    <img src="/assets/icons/applets/messenger/fi-rr-trash.svg" style={{ width: '20px' }} />
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>

        )
    }
}
export default EditGroup;