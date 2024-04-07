import React, { Component } from 'react'
import MessageStatusView from './MessageStatusView';


class MessageTextBox extends Component {
    render() {
        let data = this.props.data
        return (
            <div style={{}}>
                <div style={{ maxWidth: 350, background: "#E9ECF6", padding: '10px 15px', display: "flex",flexDirection:'column', alignItems: "center", justifyContent: "center", borderRadius: 15, borderBottomRightRadius: 0, }}>
                    <p style={{ color: "#000", fontSize: 13, textAlign: "left" }}>{data.text}</p>
                    {console.log('data 00000',data)}
                    {data.edited && (
                        <p style={{ color: "#000", fontSize: 10, textAlign: "left" }}>Edited</p>
                    )}
                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", marginLeft: 10 }}>
                    <p className='mld-2' style={{ color: "gray", fontSize: 12 }}>{this.props.time}</p>
                    {!this.props.isOther && (
                        <MessageStatusView status={data.status} />
                    )}
                </div>
            </div>
        )
    }
}

export default MessageTextBox;