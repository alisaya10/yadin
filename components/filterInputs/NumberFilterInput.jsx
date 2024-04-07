import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class NumberFilterInput extends React.Component {
    state = {
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value != '' ? Number(value) : null, this.props.extra)
        }
    }


    render() {
        return (
            <div className="w-100 h-100">
                <input ref={el => this.input = el} pattern="[0-9]*" value={this.props.data != null ? this.props.data : ''} maxLength={this.props.header.information.maxLength} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} className="transpanet-input" />
            </div>
        )
    }
}

export default NumberFilterInput;