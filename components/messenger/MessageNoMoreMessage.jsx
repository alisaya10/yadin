import React from "react";

import { checkTranslation, imageAddress, translate } from "../../utils/useful";
import moment from 'jalali-moment'


class MessageNoMoreMessage extends React.Component {

    state = {

    }

    componentDidMount() {
        let options = {
            root: document.querySelector('#messenger'),
            rootMargin: '-17px 0px 0px 0px',
            threshold: 1.0
        }

        let observer = new IntersectionObserver(this.observerAction, options);

        let target = document.querySelector('#messenger');
        observer.observe(this.messageContainer);

    }

    observerAction = (entries) => {


        if (entries && entries[0]) {

            this.props.onMoreVisibilityChanged(entries[0].isIntersecting)

        }


    }


    render() {


        return (

            <p ref={el => this.messageContainer = el} className="text-center py-1 text-smallest mt-2" style={{ color: '#a0a0a0' }}>{translate("No More Messages")}</p>


        )
    }

}


export default MessageNoMoreMessage
