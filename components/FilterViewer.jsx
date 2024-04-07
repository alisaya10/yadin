import React from 'react'
import inputComponents from './filterInputs'
import { checkTextTranslation, getObject, setObject } from '../utils/useful'

class FilterViewer extends React.Component {
    state = {
        errors: {},
        data: {},
        width: 400
    }

    componentDidMount() {
        this.init()
        if (typeof window !== 'undefined') {
            this.setState({width:window.innerWidth})
            window.addEventListener('resize', this.setFormWidth);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.setFormWidth)
        }
    }

    componentDidUpdate(prevProps) {

        // console.log("UPDATE")
        if ((this.props.initData !== prevProps.initData) || (this.props.headers !== prevProps.headers)) {
            // console.log("INIT")

            // this.init()
        }
    }

    getForm = () => {
        // console.log(this.validator())
        if (this.validator()) {
            return this.props.data ? this.props.data : {}
        } else {
            return null
        }
    }



    init = () => {
        this.makeInitValue(this.props.initData)
    }


    validator() {
        let valid = true
        let errors = {}
        // console.log(this.props.data)
        this.props.headers.forEach(header => {
            if (header.information?.required) {

                if (header.type == 'ImageInput' || header.type == 'FileInput') {
                    let value = getObject(this.props.data, ('files**.' + header.key))
                    if (!value || value === '') {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                } else {
                    let value = getObject(this.props.data, header.key)
                    if (!value || value === '') {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                }
                if (header.type == 'PhoneInput') {
                    let value = getObject(this.props.data, header.key)
                    if (!value || value.length < 14) {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                }
            }
        })

        this.setState({ errors })
        return valid
    }

    makeInitValue(data) {

        this.setState({ data: data, show: true }, () => {
            this.setFormWidth()
        })

    }

    setFormWidth = () => {
        if (this.form) {
            this.setState({ width: this.form.getBoundingClientRect().width })
        }
    }



    changeValue = (key, value, extra) => {
        // let data = { ...this.props.data }
        // data = setObject(data, key, value)
        // console.log(data)
        // this.setState({ data })
        this.props.changeFilter(key, value, extra)
    }



    formColBuilder(col) {
        let finalCol = 'col-12'

        if (600 < this.state.width && col) {
            finalCol = 'col-' + col
        }

        return finalCol
    }


    render() {
        // console.log(this.props.data)

        if (this.state.show) {
            return (
                <section className="w-100 filter" ref={(el) => this.form = el}>
                    <div className="row m-0">
                        {this.props.headers.map((header, index) => {
                            let Component = inputComponents[header.type]

                            // console.log(header.key)
                            let data = this.props.data ? this.props.data[header.key] : null//getObject(this.props.data, header.key)//this.props.data[header.key] ? this.props.data[header.key] : ''

                            let files
                            if (this.props.data && this.props.data['**files']) {
                                files = getObject(this.props.data['**files'], header.key)//this.props.data[header.key] ? this.props.data[header.key] : ''
                            }

                            if (data) {
                                data = data.value
                            }

                            if (Component && !header.hideInfilter) {
                                return (
                                    <div key={index} className={"p-0 " + this.formColBuilder('6') + (index !== header.length - 1 ? ' mb-0' : '')} >
                                        <div className="m-0 row pt-2 pb-2" >
                                            {/* style={{ borderBottom: '1px solid #eee' }} */}
                                            {header.information?.label && (
                                                <div className="p-0 col-12 mb-1 text-start mx-0 w-100 text-start">
                                                    <p className={'text-small mr-1 ml-1 text-bold  text-start w-100'}>{checkTextTranslation(header.information?.label)}</p>
                                                </div>
                                            )}
                                            <div className="col-12 mx-0 p-0">
                                                <div className={"flexc " + (header.information.inputClass ?? (this.props.inputClass ? this.props.inputClass : 'default-filter-view'))} >
                                                    {header.information?.icon && (
                                                        <img className="mrd-3" src={header.information?.icon} height="25px" alt="icon" />
                                                    )}
                                                    <Component header={header} data={data} files={files} changeFiles={this.changeFiles} changeValue={this.changeValue} />
                                                </div>
                                            </div>

                                            {/* {header.information?.hint && (
                                                <div className="col-12 mt-1 mld-2">
                                                    <small style={{ color: '#9ab', fontSize: 12 }}>{checkTextTranslation(header.information?.hint)}</small>
                                                </div>
                                            )} */}

                                            {this.props.errors && this.props.errors[header.key] && (
                                                <div className="col-12 mt-1 mld-2 text-start">
                                                    <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.props.errors[header.key])}</small>
                                                </div>
                                            )}

                                            {this.state.errors && this.state.errors[header.key] && (
                                                <div className="col-12 mt-1 mld-2">
                                                    <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.state.errors[header.key])}</small>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                )
                            }
                        })}
                        {this.props.errors && (typeof this.props.errors == 'string') && (
                            <div className="col-12 text-start">
                                <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.props.errors)}</small>
                            </div>
                        )}
                    </div>

                </section>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default FilterViewer;