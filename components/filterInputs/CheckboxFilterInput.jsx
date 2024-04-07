import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class CheckboxFilterInput extends React.Component {
    state = {
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.checked : null
        // console.log(value)
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value)
        }
    }


    render() {

        return (
            <div className="w-100 h-100">

                <label className="checkbox-container " >
                    <input type="checkbox" onChange={(e) => this.changeInputValue(e.target)} checked={this.props.data ? Boolean(this.props.data) : false} />
                    <p className="checkmark"></p>
                    <span className="mx-1 text-small">Yes</span>
                </label>

                {/* <label className="checkbox-container " >
                    <input type="checkbox" onChange={(e)=>this.changeInputValue(e.target)} checked={this.props.data?this.props.data:false}   />
                    <p className="radioMark"></p>
                    <span className="mx-1 text-small">Yes</span>
                </label> */}


                {/* <input ref={el => this.input = el} value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} className="transpanet-input" /> */}
            </div>
        )
    }
}

export default CheckboxFilterInput;