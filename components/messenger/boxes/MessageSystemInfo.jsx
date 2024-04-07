import React, { Component } from 'react'


class MessageSystemInfo extends Component {
    render() {
        let data = this.props.data
        return (
            <div className='w-100 flexcc' style={{ background: "#fff" }}>
                <p style={{ color: "#000", fontSize: 13, textAlign: "left" }}>{data.systemInfo.name + ' ' + data.systemInfo.type}</p>
            </div>
        )
    }
}

export default MessageSystemInfo;