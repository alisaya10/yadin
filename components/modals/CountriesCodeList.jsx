import React from "react";
import Modal from '../Modal1'
import { countriesCode } from '../../variables/countries'


class CountriesCodeList extends React.Component {
    state = {
        countries: []
    }

    componentDidMount() {
        this.setState({ countries: countriesCode })

    }

    showModal = () => {
        this.setState({ countries: countriesCode })
        this.countiesCodeModal.showModal()
        document.addEventListener("keydown", this._handleKeyDown);
    }

    hideModal = () => {
        this.countiesCodeModal.hideModal()
        document.removeEventListener("keydown", this._handleKeyDown);

    }

    _handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            this.hideModal()
        }
    }



    selectByCode = (code, lastAttempt) => {
        let codeWithoutZeros = String(this.removeCodeZeros(code))
        let country = countriesCode.filter((e) => e.dial_code === codeWithoutZeros)[0]
        if (country) {
            country = { ...country }
            country.dial_code = this.addCodeZeros(country.dial_code)
            this.props.selectCountyCode(country)
        } else if (!lastAttempt) {
            this.selectByCode('0098', true)
        }
    }



    selectCountyCode = (selectedCountry) => {
        selectedCountry.dial_code = this.addCodeZeros(selectedCountry.dial_code)
        this.props.selectCountyCode(selectedCountry)
        this.hideModal()
    }


    removeCodeZeros(code) {
        let prefix = ''
        let stripCode = code
        if (code.includes('-')) {
            prefix = code.substring(0, 3)
            stripCode = code.substring(3, code.length)
        }

        stripCode = String(Number(stripCode))
        stripCode = prefix + stripCode
        return stripCode
    }

    addCodeZeros(code) {
        let prefix = ''
        let stripCode = code
        if (code.includes('-')) {
            prefix = code.substring(0, 3)
            stripCode = code.substring(3, code.length)
        }
        let zeros = ''
        for (let index = 0; index < 4 - stripCode.length; index++) {
            zeros = zeros + '0'
        }
        stripCode = prefix + zeros + stripCode
        return stripCode
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


    searchCountries(value) {
        let countries = []
        countries = countriesCode.filter(e => e.name.toLowerCase().includes(value.toLowerCase()) || e.dial_code.toLowerCase().includes(value.toLowerCase()))
        this.setState({ countries })
    }


    render() {
        return (

            <Modal ref={el => this.countiesCodeModal = el} maxWidth={400}>
                <div className="pb-5 w-100 h-100">
                    <div className="w-100 h-100" style={{ backgroundColor: '#fff', overflow: 'auto', borderRadius: 8 }}>
                        <div className="w-100" style={{ zIndex: 1, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, borderBottom: '0px #eee solid', backgroundColor: '#f2f6f8ee', background: 'linear-gradient(to right,#d7e2f7dd,#dad6e4dd)', backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(10px) saturate(180%)', borderRadius: '8px 8px 0px 0px' }}>

                            <p>Select Country Code</p>

                            <div className="cursor-pointer" onClick={() => this.hideModal()} style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img style={{ width: 14, height: 14 }} src="/images/close.svg" alt="" />
                            </div>

                        </div>

                        <div className="w-100 mt-1 mb-1 pl-3 pr-3 pt-2 pb-1" style={{position:'sticky',top:50,backgroundColor:'#fff'}}>
                            <input onChange={(e) => this.searchCountries(e.target.value)} placeholder="Search country ..." className="w-100" style={{ height: 40, fontSize: 15, padding: '5px 15px', background: '#f2f4f6', borderRadius: 4, border: '1px solid #eee' }} />
                        </div>

                        <div className="w-100 text-start" >
                            {this.state.countries.map((prop, index) => {
                                return (
                                    <div key={index} onClick={() => this.selectCountyCode(prop)} className="flexcb backHover pl-3 pr-4 pb-2 pt-2 cursor-pointer" style={{ borderBottom: '1px solid #f2f4f6' }}>
                                        <div className='flexcc mrd-3'>
                                            {/* <img className="ml-1 mr-1" src={prop.image} width="30px" alt={prop.name} /> */}
                                            <p className="mrd-3 mt-1" style={{ fontSize: 20 }} >{prop.flag}</p>

                                            <span>{prop.name}</span>
                                        </div>

                                        <span>{this.valueToCode(prop.dial_code)}</span>
                                    </div>
                                )
                            })}

                            {this.state.countries.length === 0 && (
                                <p className="text-center mt-3 mb-3">Found nothing</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        );

    }
}


export default CountriesCodeList;
