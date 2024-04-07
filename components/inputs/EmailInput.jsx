import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class EmailInput extends React.Component {
    state = {
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {

            this.props.changeValue(this.props.header.key, value != '' ? value : null, this.props.extra)
            this.setState({data:value})

        }else{
            this.props.changeValue(this.props.header.key, null, this.props.extra)
            this.setState({data:target.value})
        }
    }


    render() {
        return (
            <div className="w-100 h-100">
                <input ref={el => this.input = el} type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" autoFocus={this.props.header.information?.autoFocus} value={this.props.data != null ? this.props.data : this.state.data} maxLength={this.props.header.information.maxLength} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} className="transpanet-input" />
            </div>
        )
    }
}

export default EmailInput;