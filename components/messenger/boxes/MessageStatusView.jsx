import React, { Component } from 'react'


class MessageStatusView extends Component {
    render() {
        let status = this.props.status
        return (
            <div style={{  }}>
                {(status == 0 || status == null) && (
                    <img src="/assets/icons/applets/messenger/clock.png" width={10} style={{ opacity: 0.5 }} />
                )}

                {(status == 1) && (
                    <img src="/assets/icons/applets/messenger/sent.png" width={10} style={{ opacity: 0.5, }} />
                )}

                {(status == 2) && (
                    <img src="/assets/icons/applets/messenger/read.png" width={10} style={{ opacity: 1, }} />
                )}
            </div>

        )
    }
}

export default MessageStatusView;