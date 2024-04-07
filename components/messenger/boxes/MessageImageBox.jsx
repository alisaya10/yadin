import React, { Component } from 'react'
import { imageAddress } from '../../../../utils/useful';
import CircularProgress from "../../../useful/CircularProgress";
import MessageStatusView from './MessageStatusView';


class MessageImageBox extends Component {
    render() {
        let data = this.props.data
        let address = ''
        if (data?.image) {
            address = imageAddress(data.image, null, 'small')
        } else if (data.tempFile) {

            if (this.state?.address) {
                address = this.state.address
            } else {
                address = URL.createObjectURL(data.tempFile)
                this.setState({ address })
            }

        }
        // console.log(data)
        return (
            <div style={{ width: 250 }}>
                <div style={{ width: 250, background: "#E9ECF6", borderRadius: 15, borderBottomRightRadius: 0, }}>
                    <div style={{ width: 250, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

                        {(data.tempFile) && (
                            <div className='flexcc ' style={{ padding: 2, border: '0px solid #eee', boxShadow: '0px 0px 30px #10101040', backgroundColor: '#ffffffcc', borderRadius: 80, position: "absolute", zIndex: 1, }}>
                                <CircularProgress size={34} strokeWidth={3} progress={data.precentage} />
                            </div>
                        )}

                        <img src={address} style={{ width: 250, height: 138, objectFit: "cover", borderRadius: 10 }} />
                    </div>

                    {data.text && (
                        <p style={{ color: "#000", fontSize: 13, textAlign: "left", padding: 10 }}>{data.text}</p>
                    )}
                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", marginLeft: 10, justifyContent: this.props.isOther ? 'flex-end' : null, marginLeft: this.props.isOther ? 0 : 10 }}>
                    <p className='mld-2' style={{ color: "gray", fontSize: 12 }}>{this.props.time}</p>
                    {!this.props.isOther && (
                        <MessageStatusView status={data.status} />
                    )}
                    {/* <img style={{ width: 15, height: 15 }} src='/images/sent.png' /> */}
                </div>
            </div>

        )
    }
}

export default MessageImageBox;