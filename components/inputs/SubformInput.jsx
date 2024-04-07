import React from 'react'
import inputComponents from './inputComponents'
import { checkTextTranslation, getObject, setObject, translate } from '../../utils/useful'

class SubformInput extends React.Component {
    state = {
        errors: {},
        data: {},
        width: window.innerWidth
    }

    componentDidMount() {
        this.init()
        window.addEventListener('resize', this.setFormWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setFormWidth)
    }

    componentDidUpdate(prevProps) {


        if ((this.props.initData !== prevProps.initData) || (this.props.headers !== prevProps.headers)) {

            this.init()
        }
    }

    getForm = () => {
        // console.log(this.validator())
        if (this.validator()) {
            return this.state.data ? this.state.data : {}
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
        this.props.headers.forEach(header => {
            if (header.information?.required) {

                let value = getObject(this.state.data, header.key)

                if (header.type == 'ImageInput' || header.type == 'FileInput') {

                    if (!value || value === '') {
                        value = getObject(this.state.data, ('**files.' + header.key), 1)
                    }
                    if (!value || value === '') {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                } else {
                    // let value = getObject(this.state.data, header.key)
                    if (!value || value === '') {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                }
                if (header.type == 'PhoneInput') {
                    // let value = getObject(this.state.data, header.key)
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

    makeInitValue(rawData) {
        // console.log(rawData)
        let data = rawData
        if (data == null) {
            data = {}
        }
        if (this.props.headers) {

            this.props.headers.forEach(header => {
                if (data[header.key] == null && header.information?.default != null) {
                    data[header.key] = header.information?.default
                }
            });
        }

        this.setState({ data: data, show: true }, () => {
            this.setFormWidth()
        })

    }

    setFormWidth = () => {
        if (this.form) {
            this.setState({ width: this.form.getBoundingClientRect().width })
        }
    }



    addNew = () => {
        let data = this.props.data
        if (!Array.isArray(data)) {
            data = []
        }
        data.push({})
        // data.splice(0,0,{})
        this.props.changeValue(this.props.header.key, data)
    }

    removeRow = (index) => {
        let data = this.props.data
        // if (!Array.isArray(data)) {
        //     data = []
        // }
        // data.push({})
        data.splice(index, 1)
        this.props.changeValue(this.props.header.key, data)
    }


    changeFiles = (files, key, extra) => {
        // let data = this.state.data ?? {}

        // if (data['**files'] == null) {
        //     data['**files'] = {}
        // }
        // value.formType = ''

        // this.props.header.information.headers.forEach(header => {
        //     if (header.key == key) {
        //         value.formType = header.type
        //         // value.single = header.information?.single
        //     }
        // });

        // data['**files'][key] = value
        // console.log(data)
        // this.setState({ data })
        console.log(extra)
        // console.log(files)

        this.props.changeValue('**files', { [this.props.header.key + '.' + extra?.index + "~" + key]: files }, { append: 'object' })
        // this.props.changeValue('**files.' + this.props.header.key + '.' + extra?.index + "~" + key, files)

        // this.props.changeValue('**files', { [this.props.header.key+'!!' + '.' + key ]: files })

    }


    changeValue = (key, value, extra) => {

        let data = this.props.data
        let index = extra.index
        if (Array.isArray(data)) {
            data = setObject(data, key, value, false, index)
            this.props.changeValue(this.props.header.key, data)
        }
    }



    formColBuilder(col) {
        let finalCol = 'col-12'

        if (100 < this.state.width && col) {
            finalCol = 'col-' + col
        }

        return finalCol
    }

    renderHeader(headers) {
        if (headers) {
            return (headers.map((header, index) => {
                return (
                    <div key={index} className={" mb-1 text-center p-0 text-capitalize text-bold " + this.formColBuilder(header.col)}>
                        <label className={'text-small mr-1 ml-1  ' + (header.information?.required ? 'required' : '')}>{checkTextTranslation(header.information?.label)}</label>
                        {header.information?.hint && (
                            <div className="mx-1 text-start text-smallest">
                                <div style={{ color: '#9ab', fontWeight: '500' }}>{checkTextTranslation(header.information?.hint)}</div>
                            </div>
                        )}
                    </div>
                )
            }))
        }
    }


    renderBody(headers, rawData, index) {
        return (
            // <div className="flexcc p-1">

            // {
            headers && headers.map((header, hindex) => {
                let Component = inputComponents[header.type]
                // console.log(rawData)
                let data = getObject(rawData, header.key)//data[header.key] ? data[header.key] : ''
                let files
                if (rawData && rawData['**files']) {
                    files = getObject(rawData['**files'], header.key)//this.state.data[header.key] ? this.state.data[header.key] : ''
                }


                if (data == null && header.information?.default != null) {
                    data = header.information?.default
                }

                // let headerClone = JSON.parse(JSON.stringify({...header})) 
                let disabled = false
                if(rawData!= null && rawData.disabled && rawData.disabled[header.key]){
                    // console.log("DISABLED")
                    // console.log('*****')
                    // console.log(index)

                    disabled = true
                }

                if (Component) {
                    return (
                        <div key={hindex} className={" mb-0 " + this.formColBuilder(header.col)} style={{ padding: 0 }}>

                            <div className="row m-0">

                                <div className="col-12 p-0">
                                    <div className={"flexc " + (header.information.inputClass ?? (this.props.inputClass ? this.props.inputClass : 'default-subinput-view'))} >
                                        {header.information?.icon && (
                                            <img className="mrd-3" src={header.information?.icon} height="25px" alt="icon" />
                                        )}
                                        <Component extra={{ index }} header={header} data={data} files={files} changeFiles={this.changeFiles} changeValue={this.changeValue} variables={this.props.variables} optionsList={this.props.optionsList} disabled={disabled}/>
                                    </div>
                                </div>



                                {this.props.errors && this.props.errors[header.key] && (
                                    <div className="col-12 mt-1 mld-2 text-start">
                                        <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.props.errors[header.key])}</small>
                                    </div>
                                )}

                                {this.state.errors && this.state.errors[header.key] && (
                                    <div className="col-12 mt-1 mld-2 text-start">
                                        <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.state.errors[header.key])}</small>
                                    </div>
                                )}

                            </div>
                        </div>
                    )
                }
            })
            //     }
            // </div>

        )
    }




    render() {
        let headers = this.props.header.information?.headers
        // console.log(this.props.data)
        if (this.state.show) {
            return (
                <section className="w-100 subform pb-2 pt-2" ref={(el) => this.form = el}>
                    <div className={"pb-2"} style={{ overflow: 'auto' }}>

                        <div className="flexc w-100">
                            {!this.props.header.information?.removeDisabled && (
                                <button className="flexcc p-1">
                                    <img src="/images/remove.png" width="18px" style={{ opacity: 0 }} />
                                </button>
                            )}
                            <div className="row m-0 w-100" style={{ flexWrap: 'nowrap' }}>
                                {this.renderHeader(headers)}
                            </div>
                        </div>


                        {Array.isArray(this.props.data) && this.props.data?.map((prop, index) => {
                            return (
                                <div className="flexc w-100" key={index}>
                                    {(!this.props.header.information?.removeDisabled) && (
                                        <>
                                            {!prop['**notRemoveable'] && (
                                                <button onClick={() => this.removeRow(index)} className="flexcc p-1" >
                                                    <img src="/images/remove.png" width="15px" />
                                                </button>
                                            )}

                                            {prop['**notRemoveable'] && (
                                                <div style={{ width: 28 }}></div>
                                            )}
                                        </>
                                    )}
                                    <div key={index} className="row m-0 w-100" style={{ flexWrap: 'nowrap' }}>
                                        {this.renderBody([...headers], prop, index)}
                                    </div>
                                </div>

                            )
                        })}
                    </div>

                    {(!Array.isArray(this.props.data) || this.props.data.length == 0) && (
                        <p className="text-smaller text-center mt-0 mb-3">{translate('useful.foundNothing')}</p>
                    )}
                    {!this.props.header.information?.addDisabled && (
                        <div className="flexcc">
                            <button onClick={() => this.addNew()} className="px-2 py-1" style={{ backgroundColor: '#000510', borderRadius: 4 }}>
                                <p className="white text-smaller text-uppercase text-bold">{translate("useful.addNew")}</p>
                            </button>
                        </div>
                    )}
                    {this.props.errors && (typeof this.props.errors == 'string') && (
                        <div className="col-12 text-start">
                            <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.props.errors)}</small>
                        </div>
                    )}

                </section>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default SubformInput;