import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class TextAreaInput extends React.Component {
    state = {
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value,this.props.extra)
        }
    }

    init=()=>{
        // console.log("TEST")
    }


    render() {
        return (
            <div className="w-100 h-100">
                <textarea className="w-100 transpanet-input" rows={this.props.header.information.rows} ref={el => this.input = el} value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)}  style={{resize: "vertical"}}/>
            </div>
        )
    }
}

export default (TextAreaInput);