import React from 'react'
import CountiesCodeModal from '../modals/CountriesCodeList'
import { checkTextTranslation } from '../../utils/useful'

class PhoneInput extends React.Component {
    state = {
        selectedCountry: {}
    }

    componentDidMount() {
        this.codeToCountry(this.props.data)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            if (this.props.data) {
                let code = this.props.data.includes('-') ? this.props.data.substring(0, 6) : this.props.data.substring(0, 4)
                if (this.state.selectedCountry?.dial_code !== code) {
                    this.codeToCountry(this.props.data, true)
                }
            }else{
                // this.codeToCountry('0001', true)
            }
        }

    }


    changeInputValue(target) {
        let value = (target?.validity.valid) ? target?.value : null
        if (value !== null && this.state.selectedCountry?.dial_code) {
            value = this.state.selectedCountry.dial_code + value
            this.props.changeValue(this.props.header.key, value,this.props.extra)
        }
    }


    codeToCountry(value, lastAttempt) {
        let code = ""
        if (value) {
            code = value.includes('-') ? value.substring(0, 7) : value.substring(0, 4)
        }
        this.countiesCodeModal.selectByCode(code, lastAttempt)
    }


    openCountiesModal() {
        this.countiesCodeModal.showModal()
    }

    selectCountyCode = (selectedCountry) => {
        this.setState({ selectedCountry }, () => {
            setTimeout(() => {
                this.changeInputValue(this.input)
            }, 100);
        })
    }

    valueToNumber(value) {
        let newValue = value
        if (value) {
            if (this.state.selectedCountry?.dial_code && value !== '') {
                newValue = newValue.substring(newValue.includes('-') ? 7 : 4, newValue.length)
            }
        } else {
            newValue = ""
        }
        return newValue
    }

    valueToCode(value) {
        if (value && value !== "") {
            let newValue = value.includes('-') ? value.substring(3, value.length) : value
            newValue = String(Number(newValue))
            return newValue
        } else {
            return ""
        }
    }

    render() {
        return (
            <div className="w-100 h-100 flexcc" style={{ direction: 'ltr' }}>
                <div onClick={() => { if (!this.props.header.information.disabled) { this.openCountiesModal() } }} className="flexcc cursor-pointer">
                    <p className=" mt-2 white mb-2" style={{ fontSize: 30, lineHeight: '10px' }} >{this.state.selectedCountry?.flag}</p>
                    <p className='white' style={{ fontSize: 15, margin: '0px 7px 0px 10px' }}>+{this.valueToCode(this.state.selectedCountry?.dial_code)}</p>
                </div>
                <input ref={el => this.input = el} autoFocus={this.props.header.information?.autoFocus} disabled={this.props.header.information.disabled} maxLength="10" pattern="[0-9]*" value={this.valueToNumber(this.props.data)} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} className="transpanet-input" />

                <CountiesCodeModal ref={el => this.countiesCodeModal = el} selectCountyCode={this.selectCountyCode} selectedCountry={this.state.selectedCountry} />

            </div>
        )
    }
}

export default (PhoneInput);