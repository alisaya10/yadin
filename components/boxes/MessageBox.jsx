import React from "react";

import { checkTranslation, imageAddress } from "../../utils/useful";
import moment from 'jalali-moment'


class MessageBox extends React.Component {

    state = {

    }

    componentDidMount() {
        let options = {
            root: document.querySelector('#messenger'),
            rootMargin: '0px 0px -50px 0px',
            threshold: 1.0
        }

        let observer = new IntersectionObserver(this.observerAction, options);

        let target = document.querySelector('#messenger');
        observer.observe(this.messageContainer);

    }

    observerAction = (entries) => {
        if (entries && entries[0] && entries[0].isIntersecting) {

            // console.log(this.props.data?._id)
            // console.log(entries)
            let top = false
            if (entries[0].intersectionRect && entries[0].intersectionRect.top < 10) {
                top = true
            }
            this.props.onViewableItemsChanged(this.props.data, entries[0].isIntersecting, top)

        }


    }


    render() {

        let prop = this.props.data

        let isOther = false
        if (this.props.myId != prop.sender) {
            isOther = true
        }
        let name = this.props?.messenger?.visitor?.fullname

        if (isOther) {
            name = 'Operator'
        }

        return (



            <div id={'msg-' + this.props.data?._id} ref={el => this.messageContainer = el} className={"d-flex mt-3 " + (isOther ? 'chatboxOther' : '')} key={prop._id}>
                <div className="mt-2">
                    <img src={imageAddress(prop?.creator?.image, 'tickeProfile', 'small')} className=" profile-img1 mt-2" style={{ height: 30, width: 30 }} />
                </div>
                <div className="d-flex flex-column">
                    <div>
                        <p className="text-smallest  px-2 " style={{ color: '#a0a0a0' }}>{moment(prop?.cDate).format('YYYY-MM-DD HH:mm')}</p>
                    </div>
                    <div className="d-flex">
                        <div className="d-flex flex-column">
                            <div className={"chatbox " + (isOther ? 'other' : '')} >
                                {prop.text && (
                                    <p className="chatbox-desc" >{prop.text}</p>
                                )}

                                {prop.form && Object.values(prop.form).map((fprop, findex) => {
                                    return (
                                        <p key={findex} className="chatbox-desc"  >{checkTranslation(fprop.label)}: {checkTranslation(fprop.value)}</p>
                                    )
                                })}

                                {!prop.isAdmin && (

                                    <div style={{ position: 'absolute', right: -15, bottom: 0, }}>
                                        {(prop.status == 0 || prop.status == null) && (
                                            <img src="/images/clock.png" width={10} style={{ opacity: 0.5 }} />
                                        )}

                                        {(prop.status == 1) && (
                                            <img src="/images/sent.png" width={10} style={{ opacity: 0.5, filter: 'saturate(0%)' }} />
                                        )}

                                        {(prop.status == 2) && (
                                            <img src="/images/read.png" width={10} style={{ opacity: 1, filter: 'saturate(0%)' }} />
                                        )}

                                    </div>

                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

}


export default MessageBox
