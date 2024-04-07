import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class IconManagerInput extends React.Component {
    state = {
    }





    render() {
        return (
            <div className="w-100 h-100">
                <button>
                    <p>Choose icon</p>
                </button>
                {/* <input  ref={el => this.input = el} value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} disabled={this.props.header.information?.disabled} className="transpanet-input" /> */}
            </div>
        )
    }
}

export default IconManagerInput;