import React from 'react'
import inputComponents from './inputs/inputComponents'
import { checkTextTranslation, getObject, setObject } from '../utils/useful'

class FormViewer extends React.Component {
    state = {
        errors: {},
        data: {},
        valid: {},
        dependencies: {},
        headers: [],
        width: 400
    }

    componentDidMount() {

        this.init()
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.setFormWidth);
            this.setState({width:window.innerWidth})
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.setFormWidth)
        }
    }

    componentDidUpdate(prevProps) {

        if ((this.props.initData !== prevProps.initData) || (this.props.headers !== prevProps.headers)) {

            this.init()
        }
    }



    checkDependencies = () => {

        if (this.state.headers) {

            this.state.headers?.forEach(header => {
                let hasDependency = (header.dependencies && header.dependencies.length > 0)
                if (hasDependency) {
                    let dependencies = this.state.dependencies
                    header.dependencies?.forEach(dependency => {


                        let newDependency = JSON.parse(JSON.stringify(dependency))
                        newDependency.target = header.key

                        if (!dependencies[dependency.refKey]) {
                            dependencies[dependency.refKey] = []
                        }

                        dependencies[dependency.refKey].push(newDependency)
                        this.state.dependencies = dependencies

                    })
                }
            })

            if (this.state.data) {
                this.state.headers?.forEach(prop => {
                    this.changeDependency(prop.key, this.state.data[prop.key], true)
                })
                this.changeDependency('*', null, true)

            }
        }
    }



    changeDependency(key, value, init) {
        let dependencies = this.state.dependencies
        // console.log("changeDependency")
        // console.log(dependencies)
        if (dependencies[key]) {

            // console.log(key)

            dependencies[key]?.forEach(dependency => {

                let conditions = dependency.conditions
                let variables = { data: this.state.data }
                // console.log(variables)
                let result = this.checkConditionGroup(conditions.root, variables)

                let headers = this.state.headers

                if (dependency.show != null) {
                    headers?.forEach(header => {
                        if (dependency.targetKey == header.key) {
                            header.hideComponent = !result
                        }
                    });
                    this.setState({ headers })
                }

                if (dependency.changeValue != null) {
                    let data = this.state.data

                    let dependencyResult = true
                    if (dependency.changeValue.conditions) {
                        dependencyResult = this.checkConditionGroup(dependency.changeValue.conditions.root, variables)
                    }

                    if (dependencyResult) {
                        data[dependency.changeValue.targetKey] = dependency.changeValue.refKey ? data[dependency.changeValue.refKey] : dependency.changeValue.value
                        this.setState({ data })
                    }
                }


                if (dependency.changeHeader != null) {
                    headers?.forEach(header => {
                        if (dependency.targetKey == header.key) {
                            // console.log(this.checkValueForVariables(dependency.changeHeader.value, variables))
                            // console.log(dependency.changeHeader.value)
                            // console.log(variables)
                            let newValue = this.checkValueForVariables(dependency.changeHeader.value, variables)
                            // console.log(newValue)
                            if (dependency.changeHeader?.converts) {
                                newValue = this.convertObject(newValue, dependency.changeHeader?.converts)
                            }
                            setObject(header, dependency.changeHeader.key, newValue)
                        }
                    })
                    this.setState({ headers })
                }



                if (dependency.init != null) {
                    if (this["component-" + dependency.targetKey] && this["component-" + dependency.targetKey].init) {
                        this["component-" + dependency.targetKey].init()
                    }
                }





            });

            this.setState({ dependencies })

        }
    }


    convertObject = (object, convert) => {
        let newObject

        if (Array.isArray(object)) {

            newObject = []
            object?.forEach(oneInArray => {
                let tempNewObject = this.convertOneOfObject(oneInArray, convert)
                newObject.push(tempNewObject)
            });
        } else {
            newObject = this.convertOneOfObject(object, convert)
        }
        // console.log("return")
        return newObject

    }

    convertOneOfObject(object, convert) {
        let newObject = { ...object }
        convert?.forEach(oneConvert => {
            newObject[oneConvert.targetKey] = newObject[oneConvert.valueKey]
        })

        // convert.forEach(oneConvert => {
        //     delete newObject[oneConvert.valueKey]
        // })


        return newObject
    }


    checkConditionGroup = (group, variables) => {
        let result = false
        if (group.action && group.action == 'and') {
            result = true
        }
        for (const [key, value] of Object.entries(group.conditions)) {
            if (this.checkOneCondition(value, variables) != result) {
                return !result
            }
        }

        return result
    }




    checkOneCondition = (condition, variables) => {
        let action = condition.action
        if (action) {
            return this.checkConditionGroup(condition, variables)
        } else {
            // source operator target
            let source = this.checkValueForVariables(condition.source.value, variables)
            let operator = condition.operator.value
            let target = this.checkValueForVariables(condition.target.value, variables)

            return this.checkOperator(source, operator, target)

        }
    }


    checkOperator(v1, operator, v2) {

        switch (operator) {
            case '==':
                return (v1 == v2)
            case '===':
                return (v1 === v2)
            case '!=':
                return (v1 != v2)
            case '!==':
                return (v1 !== v2)
            case '<':
                return (Number(v1) < Number(v2))
            case '<=':
                return (Number(v1) <= Number(v2))
            case '>':
                return (Number(v1) > Number(v2))
            case '>=':
                return (Number(v1) >= Number(v2))
            case '&&':
                return (v1 && v2)
            case '||':
                return (v1 || v2)
            default:
                return false
        }
    }


    checkValueForVariables = (value, variables) => {
        let newValue = value

        if (typeof newValue == "string") {
            newValue = value.split(' ')

            for (let i = 0; i < newValue.length; i++) {
                const element = newValue[i]
                if (element.startsWith('@')) {
                    // console.log(this.getValueOfVariable(element, variables))
                    newValue[i] = this.getValueOfVariable(element, variables)
                }
            }
            if (newValue.length > 1) {
                newValue = newValue.join(' ')
            } else {
                newValue = newValue[0]
            }
        }

        return newValue

    }

    getValueOfVariable(element, variables) {
        // console.log(element)
        let key = element.substring(1)
        key = key.split('.')
        let variableSource = key[0]
        key.splice(0, 1)
        key = key.join('.')

        return getObject(variables[variableSource], key)
    }



    getForm = () => {
        // console.log(this.state.data)
        if (this.validator(this.state.headers, this.state.data).valid) {
            // console.log(this.state.data)

            return this.state.data ? this.state.data : {}
        } else {
            return null
        }
    }



    init = () => {
        // console.log(this.props.initData)

        if (this.props.headers) {
            let headers = JSON.parse(JSON.stringify(this.props.headers))
            this.setState({ headers }, () => {
                this.makeInitValue(this.props.initData)

            })
        }
    }


    validator(headers, data) {
        let valid = true
        let errors = {}
        headers?.forEach(header => {

            let value = getObject(data, header.key)
// console.log('ttttttttttttvalid', header.type);

            if (header.information?.required) {


                if (header.type == 'ImageInput' || header.type == 'FileInput' || header.type == 'ProfileImageInput') {

                    if (!value || value === '') {
                        value = getObject(data, ('**files.' + header.key), 1)
                    }
                    if (!value || value === '') {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                } else {
                    // let value = getObject(data, header.key)
                    if (value == null || value === '') {
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
                if (header.type == 'PasswordInput') {
                    // let value = getObject(this.state.data, header.key)
                    if (!value) {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    }
                    if ( value?.length < 8) {
                        valid = false
                        errors[header.key] = '{{lang}}errors.at-least-eight-characters'
                    }
                }

                if (header.type == 'SubformInput') {
                    if (!value || value.length < 1) {
                        valid = false
                        errors[header.key] = '{{lang}}errors.required-field'
                    } else {
                        value?.forEach(subValue => {
                            // header.information.headers.forEach(subHeader => {
                            // console.log(subHeader)
                            let validator = this.validator(header.information.headers, subValue)
                            if (!validator.valid) {
                                valid = false
                                // console.log(validator)
                                errors[header.key] = '{{lang}}errors.required-field'

                                // errors[header.key] = validator.errors
                            }
                            // });
                        });
                    }
                }


            }
        })

        this.setState({ errors })
        return { valid, errors }
    }




    makeInitValue(rawData) {
        // console.log("makeInitValue")
        // console.log(rawData)
        // let newData = {}
        // this.setState({ data: newData, show: false }, () => {
        //     if (data) {
        //         for (const [key, value] of Object.entries(data)) {
        //             this.state.headers.forEach(header => {
        //                 if (header.key === key) {
        //                     newData[key] = value
        //                 }
        //             });
        //         }
        //     }
        let data = rawData
        if (data == null) {
            data = {}
        }
        let isEditing = true
        if (Object.keys(data).length == 0) {
            isEditing = false
        }

        if (this.props.isEditing != null) {
            isEditing = this.props.isEditing
        }



        if (!isEditing && this.state.headers) {
            
            this.state.headers.forEach(header => {

                if (data[header.key] == null && header.information?.default != null) {
                    setObject(data, header.key, header.information?.default)
                    // data[header.key] = header.information?.default
                }

                // console.log(header.key)
                // console.log(header.information?.default)

            });
        }

        this.setState({ data: data, show: true }, () => {
            this.setFormWidth()
            this.checkDependencies()
            if (this.props.liveChange) {
                this.props.liveChange(data, true)
            }
        })
    }

    setFormWidth = () => {
        if (this.form) {
            this.setState({ width: this.form.getBoundingClientRect().width })
        }
    }

    changeFiles = (value, key, extra) => {
        let data = this.state.data ?? {}

        if (data['**files'] == null) {
            data['**files'] = {}
        }
        if (value) {


            this.state.headers?.forEach(header => {
                if (header.key == key) {
                    value.formType = header.type
                    // value.single = header.information?.single
                }
            });
        }
        // console.log("changeFiles")
        data['**files'][key] = value
        // console.log(data)
        this.setState({ data })
    }

    changeValue = (key, value, extra) => {

        // console.log(key)
        // console.log(value)
        let data = { ...this.state.data }
        data = setObject(data, key, value, extra?.append)
        // console.log(data)
        this.setState({ data }, () => {
            this.changeDependency(key, value)
        })
        // console.log(this.props.liveChange)
        if (this.props.liveChange) {
            this.props.liveChange(data)
        }
    }


    // setError = (key, value) => {
    //     let errors = this.state.errors
    //     errors[key] = value
    //     this.setState({ errors })

    // }

    // setValid = (key, value) => {
    //     let valid = this.state.valid
    //     valid[key] = value
    //     this.setState({ valid })
    // }


    setStatus = (type, key, value) => {
        let errors = this.state.errors
        let valid = this.state.valid


        delete errors[key]
        delete valid[key]

        if (type == 'error') {
            errors[key] = value
        }
        if (type == 'valid') {
            valid[key] = value
        }

        this.setState({ errors, valid })

    }



    formColBuilder(col) {
        let finalCol = 'col-12'

        if (600 < this.state.width && col) {
            finalCol = 'col-' + col
        }

        return finalCol
    }





    render() {
        if (this.state.show && this.state.headers) {
            return (
                <section className={"w-100 form "+(this.props.formClass?? '')} ref={(el) => this.form = el}>
                    <div className="row ">
                        {this.state.headers && this.state.headers.map((header, index) => {
                            let Component = inputComponents[header.type]
                            let data = getObject(this.state.data, header.key)//this.state.data[header.key] ? this.state.data[header.key] : ''
                            let files
                            if (this.state.data && this.state.data['**files']) {
                                files = getObject(this.state.data['**files'], header.key)//this.state.data[header.key] ? this.state.data[header.key] : ''
                            }


                            // console.log(header.information?.default)

                            // if (data == null && header.information?.default != null) {
                            //     // console.log(header.information?.default)

                            //     data = header.information?.default
                            // }

                            if (header.type == 'SectionInput') {
                                return (
                                    <div className="col-12 mb-1 text-start">
                                        <Component ref={el => this["component-" + header.key] = el} header={header} data={data} files={files} changeFiles={this.changeFiles} changeValue={this.changeValue} setStatus={this.setStatus} variables={this.props.variables} optionsList={this.props.optionsList} />
                                    </div>
                                )
                            }

                            else if (Component && !header.hideComponent) {
                                return (
                                    <div key={index} className={" " + this.formColBuilder(header.col) + (index !== header.length - 1 ? ' mb-2' : '')}>
                                        <div className="row">
                                            {header.information?.label && (
                                                <div className="col-12 my-3 text-start">
                                                    <label className={' mr-1 ml-1 white ' + (header.information?.required ? 'required' : '')}>{checkTextTranslation(header.information?.label)}</label>
                                                </div>
                                            )}
                                            <div className="col-12">
                                                <div className={"flexc " + (header.information.inputClass ?? (this.props.inputClass ? this.props.inputClass : 'default-input-view ')) + ' ' + ((this.state.valid[header.key] ? ' valid-input ' : ' ') + (this.state.errors[header.key] ? ' error-input ' : ' '))} >
                                                    {header.information?.icon && (
                                                        <img className="mrd-3" src={header.information?.icon} height="25px" alt="icon" />
                                                    )}
                                                    <Component ref={el => this["component-" + header.key] = el} header={header} data={data} files={files} changeFiles={this.changeFiles} changeValue={this.changeValue} setStatus={this.setStatus} variables={this.props.variables} optionsList={this.props.optionsList} />
                                                </div>
                                            </div>

                                            {header.information?.hint && (
                                                <div className="col-12 mt-1 mld-2 text-start">
                                                    <small style={{ color: '#9ab', fontSize: 12 }}>{checkTextTranslation(header.information?.hint)}</small>
                                                </div>
                                            )}

                                            {this.props.errors && this.props.errors[header.key] && (
                                                <div className="col-12 mt-1 mld-2 text-start">
                                                    <small style={{ color: '#ee5050' }}>{checkTextTranslation(this.props.errors[header.key])}</small>
                                                </div>
                                            )}

                                            {this.state.errors && this.state.errors[header.key] && (!this.props.errors || !this.props.errors[header.key]) && (
                                                <div className="col-12 mt-1 mld-2 text-start">
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

export default FormViewer;