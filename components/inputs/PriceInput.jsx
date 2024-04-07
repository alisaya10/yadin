import React from "react";
import { checkTextTranslation } from "../../utils/useful";

// used for making the prop types of this component
// import PropTypes from "prop-types";

class PriceInput extends React.Component {
    state = {
        value: '',
        showValue: ''
    }

    componentDidMount() {
        if (this.props.data != null) {
            this.setState({ value: this.props.data, showValue: this.changeToPriceValue(this.props.data) })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            // console.log(this.changeToPriceValue(this.props.data))
            if (this.props.data != null || this.state.showValue != '-')
                this.setState({ value: this.props.data, showValue: this.changeToPriceValue(this.props.data) })
        }
    }

    handleChange(evt) {
        if (evt.target.validity.valid) {
            if (!evt.target.value.includes('-') || evt.target.value.lastIndexOf('-') == 0) {
                let value = ''
                let minus = false
                if (evt.target.value != "") {
                    value = evt.target.value.replace(new RegExp(',', 'g'), '')
                    if (value != '-') {
                        // value = Number(value)
                        minus = (Number(value) < 0) ? true : false

                    } else {
                        minus = true

                    }
                } else {
                    value = ''
                    minus = false
                }

                this.setState({ minus: minus })
                // console.log(value)
                let newValue = parseFloat(value)
                if (isNaN(newValue)) {
                    newValue = null
                }

                // if (newValue != null) {
                // this.setState({ value, showValue: this.changeToPriceValue(String(value)) });
                this.props.changeValue(this.props.header.key, newValue, this.props.extra)
                // }
                if (value === '-' && this.props.header.information?.negativeAllowed) {
                    newValue = '-'
                }
                // console.log(this.changeToPriceValue(newValue) )
                this.setState({ value, showValue: this.changeToPriceValue(newValue) });

            }
        }
    }

    conditionalSettings(param, condition) {
        if (this.props.header.information.settings) {
            if (this.props.header.information.settings[param] == condition) {
                return true
            }
        }
        return false
    }



    changeToPriceValue(Svalue) {
        let value = String(Svalue)
        // console.log(value)
        let final = ''
        let minus = false

        if (Svalue != null) {
            if (parseFloat(value) < 0) {
                // console.log(value)
                minus = true
                value = value.replace('-', '')
            }

            let fullValue = String(value).split('.')
            // console.log(fullValue[0])
            let newValue = fullValue[0]

            newValue = String(newValue).split('')
            let count = 0
            for (let i = newValue.length - 1; i >= 0; i--) {
                final = newValue[i] + final
                count++
                if (count == 3 && i != 0) {
                    final = ',' + final
                    count = 0
                }
            }

            final = final + (value.includes('.') ? ('.' + (fullValue[1] ? fullValue[1] : '')) : '')
        } else {
            return ''
        }
        // console.log(minus ? ('-' + final) : final)
        return minus ? ('-' + final) : final
    }


    render() {
        let info = this.props.header.information
        let pattern = "^[.,0-9]+$"
        if (info.negativeAllowed) {
            pattern = "^[-.,0-9]+$"
        }
        return (
            <div className='mt-0 w-100' >
                <input style={{color:"#a0a0a0"}} pattern={pattern} step="0.01" onInput={this.handleChange.bind(this)} onChange={() => { }} disabled={info?.disabled} value={this.state.showValue ? this.state.showValue : ''} placeholder={checkTextTranslation(info.placeholder)} className="transpanet-input input" />
            </div>
        );
    }
}

export default PriceInput;
