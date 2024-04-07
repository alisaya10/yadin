import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class TextFilterInput extends React.Component {

    state = {
        operator: 'contains'
    }

    changeInputValue(target) {
        console.log(target.value)
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
        }
    }


    render() {
        return (
            <div className="w-100 h-100">
                <input ref={el => this.input = el} spellCheck={false}  value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)}  className="transpanet-input" />
            </div>
        )
    }
}

export default TextFilterInput;