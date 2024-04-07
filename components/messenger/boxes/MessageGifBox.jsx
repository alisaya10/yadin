import React, { Component } from 'react'
import CircularProgress from "../../useful/CircularProgress";


class MessageGifBox extends Component {
    render() {
        return (
            <div style={{ width: 250 }}>
                <div style={{ width: 250, background: "#E9ECF6", borderRadius: 20, borderBottomRightRadius: 0, }}>
                    <div style={{ width: 250, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <video  controlsList="nodownload" controls={false} width="250" height="auto" autoplay={this.props.progress == 100 ? true : false} loop style={{ borderRadius: 15 }} >
                            <source src="/images/video/videoBcg.mp4" type="video/mp4" />
                        </video>
                        <div style={{ position: "absolute", zIndex: 2, }}>
                            <CircularProgress size={27} strokeWidth={2} progress={50} />
                        </div>

                    </div>
                    <p style={{ color: "#000", fontSize: 13, textAlign: "left", padding: 10 }}>okay thank you very much for speed 👌</p>
                    <div style={{ position: "absolute", top: 10, left: 25, background: "rgba(0,0,0,0.5)", width: 30, textAlign: "center", borderRadius: 2 }}>
                        <p style={{ fontSize: 10, color: "#fff" }}>GIF</p>
                    </div>

                </div>
                <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", marginLeft: 10 }}>
                    <p style={{ color: "gray", fontSize: 12 }}>4:20PM</p>
                    <img style={{ width: 15, height: 15 }} src='/images/sent.png' />
                </div>
            </div>


        )
    }
}

export default MessageGifBox;