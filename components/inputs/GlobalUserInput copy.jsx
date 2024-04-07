import React from 'react'
import { checkTextTranslation, imageAddress } from '../../utils/useful'

class GlobalUserInput extends React.Component {
    state = {
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value, this.props.extra)
        }
    }

    init = () => {
        // console.log("TEST")
    }


    render() {
        return (
            <div className="w-100 h-100 flexc py-1">
                <div className="flexcc">
                    <img src={imageAddress(this.props.data?.image, 'profile', 'small')} width="60px" style={{ border: '1px solid #eee', borderRadius: 50, height: 60, objectFit: 'cover' }} />
                </div>
                <div className="mld-3">
                    <p className="text-normal">{this.props.data?.fullname}</p>
                    <p className="text-small" style={{ color: '#789' }}>@{this.props.data?.username}</p>
                </div>
            </div>
        )
    }
}

export default (GlobalUserInput);