import React, { Component } from 'react'
import { imageAddress, sizeConvertor, translate } from '../../../../utils/useful';
import CircularProgress from "../../../useful/CircularProgress";
import MessageStatusView from './MessageStatusView';


class MessageFileBox extends Component {
    state = {
        fileName: "this is document one for"
    }
    render() {
        let data = this.props.data
        return (
            <div style={{ width: 250 }}>
                <div className='py-1' style={{ width: 250, borderRadius: 10, borderBottomRightRadius: 0, background: "#E9ECF6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className='flexcb w-100 py-1 px-1' style={{ borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img style={{ width: 20, height: 20, marginLeft: 7 }} src='/images/document.png' />
                                <div className='mld-2'>
                                    <p className="text-smaller">{data.file?.orgName}</p>
                                    <p className="text-smallest opacity-5">{translate("File Size")} {sizeConvertor(data.file?.size)}</p>
                                </div>
                                {/* <p style={{ color: "#000", fontSize: 13, marginLeft: 8 }}>{this.state.fileName.length > 18 ? this.state.fileName.substring(0, 18) + "..." : this.state.fileName}</p> */}
                            </div>
                            {(data.tempFile) && (
                                <div style={{ position: "absolute", zIndex: 0, }}>
                                    <CircularProgress size={27} strokeWidth={2} progress={data.precentage} />
                                </div>
                            )}
                        </div>

                        {(!data.tempFile) && (
                            <a href={imageAddress(data.file)} target={"_blank"}>
                                <img style={{ width: 20, height: 20, marginRight: 7, cursor: "pointer" }} src='/images/download.png' />
                            </a>
                        )}


                    </div>
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

export default MessageFileBox;