import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class TextInput extends React.Component {
    state = {
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value, this.props.extra)
        }
    }


    render() {
        return (
            <div className="w-100 h-100">
                <input pattern={this.props.header.information.pattern} autoFocus={this.props.header.information?.autoFocus}  maxLength={this.props.header.information.maxLength} ref={el => this.input = el} spellCheck={this.props.header.information.spellCheck} value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} disabled={this.props.disabled || this.props.header.information?.disabled} className="transpanet-input" />
            </div>
        )
    }
}

export default TextInput;