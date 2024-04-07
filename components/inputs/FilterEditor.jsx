import React from 'react'
import { checkTextTranslation } from '../../utils/useful'
import Modal from '../Modal'
import FixedView from '../FixedView'
import { nanoid } from 'nanoid'
import inputComponents from './inputComponents'

class FilterEditor extends React.Component {
    state = {

        data: {
            root: {
                id: 'root',
                action: 'and',
                conditions: {}
            }
        },

        tempData: {},


        inputHeader: {
            type: 'TextInput', information: {}
        },

        //  optionsList: [
        //     { key: 'variables', label: 'variables' },
        //     { key: 'calculator', label: 'calculator11' },
        //     { key: 'function-name', label: 'Function Name' },
        //     { key: 'function-test', label: 'Function test' },
        // ]
    }

    componentDidMount() {
        // console.log(this.props.optionsList)
        let current = { level: 0, groupId: 'root', parents: [] }
        if (this.props.data) {
            // console.log(this.props.data)
            this.setState({ data: this.props.data })
        } else {
            this.setState({ current }, () => {
                this.doAdd('con')
            })
        }

        // console.log(this.props.data)

    }


    openEditor = () => {
        if (!this.props.header?.information?.disabled && !this.props.disabled) {
            this.setState({ tempData: this.state.data })
            this.modal.showModal()
        }
    }

    doDone = () => {
        this.setState({ tempData: -1 }, () => {
            // console.log(this.state.data)
            this.props.changeValue(this.props.header.key, this.state.data, this.props.extra)
            //    console.log(this.state.data)
            this.modal.hideModal()
        })
    }

    hideModal = () => {
        if (this.state.tempData != -1) {
            this.setState({ data: this.state.tempData }, () => {

            })
        }
    }


    openAdd = (id, parents, level) => {
        this.setState({ currentNode: this['add-' + id], current: { level, groupId: id, parents } }, () => {
            this.fixedView.showView()
        })
    }


    openActionsView = (id, parents, level) => {
        this.setState({ currentNode: this['action-' + id], current: { level, groupId: id, parents } }, () => {
            this.actionsView.showView()
        })
    }


    doAdd = (type) => {
        if (this.fixedView) {
            this.fixedView.hideView()
        }
        let id = nanoid(10)

        let newCondition
        if (type == 'con') {
            newCondition = { id, source: null, operator: '=', target: null }
        } else {
            newCondition = { id, action: 'and' }
        }
        let data = this.state.data
        let current = this.state.current
        current.id = id

        this.actionOnChild(data, current, newCondition, 'add', 0)


        this.setState({ data: data })
    }


    changeAction = (type) => {

        let data = this.state.data
        let current = this.state.current

        this.actionOnChild(data, current, type, 'changeOperator', 0)
        this.setState({ data: data })
        if (this.actionsView) {
            this.actionsView.hideView()
        }
    }



    removeRow = (groupId, id, parents) => {
        let current = { groupId, id, parents }
        let data = this.state.data

        this.actionOnChild(data, current, null, 'remove', 0)
        this.setState({ data: data })

    }

    openInput = (key, id, groupId, parents) => {
        let current = { groupId, id, parents, key }
        let data = this.state.data
        let value = this.actionOnChild(data, current, null, 'get', 0)

        let inputHeader = { type: 'SmartInput', information: {} }

        if (key == 'operator') {
            inputHeader = {
                type: 'SelectInput', information: {
                    type: 'local', items: [
                        { title: 'Equal', value: '=' },
                        { title: 'Less Than', value: '<' },
                        { title: 'More Than', value: '>' },
                        { title: 'Equal of less than', value: '<=' },
                        { title: 'Equal of more than', value: '>=' },
                        { title: 'Contains', value: 'Contains' },
                    ]
                }
            }
        }

        this.setState({ inputHeader, currentNode: this[key + '-' + id], current: { id, groupId, parents, key, value } }, () => {
            this.inputView.showView()
        })
    }


    changeInputValue = (key, value) => {

        // console.log(value)
        let current = this.state.current
        let data = this.state.data
        // let value = target.value

        this.actionOnChild(data, current, value, 'update', 0)
        current.value = value//target.value
        console.log(data)
        this.setState({ data, current })
    }


    actionOnChild(data, current, value, action, index) {

        if (index == current.parents.length) {

            if (action == 'add') {

                if (!data[current.groupId]) {
                    data[current.groupId] = {}
                }
                if (!data[current.groupId].conditions) {
                    data[current.groupId].conditions = {}
                }
                data[current.groupId].conditions[current.id] = value

            }

            if (action == 'remove') {
                if (current.id == null) {
                    delete data[current.groupId]
                } else {
                    delete data[current.groupId].conditions[current.id]
                }
            }

            if (action == 'changeOperator') {
                data[current.groupId].action = value
            }

            if (action == 'update') {
                data[current.groupId].conditions[current.id][current.key] = value
            }

            if (action == 'get') {
                return data[current.groupId].conditions[current.id][current.key]
            }

        } else if (index < current.parents.length) {
            let newData = data[current.parents[index]]
            if (newData) {
                return this.actionOnChild(newData.conditions, current, value, action, index + 1)
            }
        }
    }







    getLabel(prop, key) {
        let label = prop[key]
        let hasValue = true
        if (!label) {
            label = 'Choose ...'
            hasValue = false
        }
        return { label, hasValue }
    }




    renderGroup(data, parents, level) {
        if (data) {
            return (

                <div className="mb-2" >
                    {data.action && (
                        <div className="flexc mt-1">
                            {level != 0 && (
                                <button onClick={() => this.removeRow(data.id, null, parents, level)} className="mr-2 flexcc" style={{ backgroundColor: "#e4e8f0", padding: 5, borderRadius: 20 }}>
                                    <img className="" style={{ opacity: 0.3 }} src="/images/icons/eraser.svg" width="13px" />
                                </button>
                            )}
                            <button ref={el => this['action-' + data.id] = el} onClick={() => this.openActionsView(data.id, parents, level)} style={{ background: '#000', color: '#fff', padding: '4px 15px', borderRadius: 4 }}>
                                <span className="text-small text-bold text-uppercase" >{data.action}</span>
                            </button>
                            <div ref={el => this['add-' + data.id] = el} className="position-relative">
                                <button onClick={() => this.openAdd(data.id, parents, level)} className="ml-2 flexcc" style={{ backgroundColor: "#007aff", padding: 5, borderRadius: 20 }}>
                                    <img className="invert" src="/images/plus.svg" width="11px" />
                                </button>
                            </div>

                        </div>
                    )}
                    <div style={{ paddingLeft: 25 }}>
                        {data.conditions && Object.values(data.conditions).map((prop, index) => {
                            if (prop) {
                                if (prop.action) {
                                    return (
                                        <div key={prop.id} >
                                            {this.renderGroup(prop, [...parents, data.id], level + 1)}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={prop.id} className={"my-1 flexc "}>

                                            <button onClick={() => this.removeRow(data.id, prop.id, parents, level)} className="mr-2 flexcc" style={{ backgroundColor: "#e4e8f0", padding: 5, borderRadius: 20, maxWidth: 300 }}>
                                                <img className="" style={{ opacity: 0.3 }} src="/images/icons/eraser.svg" width="13px" />
                                            </button>

                                            <button ref={el => this['source-' + prop.id] = el} className="p-0 m-0" onClick={() => this.openInput('source', prop.id, data.id, parents)}>
                                                <p className="text-smaller text-start" style={{ background: this.getLabel(prop, "source").hasValue ? "#0062C7" : '#789', color: '#fff', padding: '5px 15px', borderRadius: 4 }}>{this.getLabel(prop, "source").label}</p>
                                            </button>

                                            <button ref={el => this['operator-' + prop.id] = el} className="p-0 m-0" onClick={() => this.openInput('operator', prop.id, data.id, parents)}>
                                                <p className="text-smaller ml-1" style={{ background: this.getLabel(prop, "operator").hasValue ? "#009A7C" : '#789', color: '#fff', padding: '5px 15px', borderRadius: 4 }}>{this.getLabel(prop, "operator").label}</p>
                                            </button>

                                            <button ref={el => this['target-' + prop.id] = el} className="p-0 m-0" onClick={() => this.openInput('target', prop.id, data.id, parents)} style={{ maxWidth: 300 }}>
                                                <p className="text-smaller ml-1 text-start" style={{ background: this.getLabel(prop, "target").hasValue ? "#007F83" : '#789', color: '#fff', padding: '5px 15px', borderRadius: 4 }}>{this.getLabel(prop, "target").label}</p>
                                            </button>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>

                </div>
            )
        }
    }


    generateVisual(data) {
        if (data) {
            return this.generateGroupVisual(data.root)
        } else {
            return " "
        }
    }

    generateGroupVisual(group) {
        let text = ""
        // console.log(group)
        if (typeof group.conditions == 'object') {
            text = '('
            Object.values(group.conditions).forEach((oneInGroup, index) => {

                if (index != 0) {
                    // console.log(group.action)
                    if (group.action == 'and') {
                        text = text + " & "
                    }
                    if (group.action == 'or') {
                        text = text + " | "
                    }
                }

                if (oneInGroup.action) {
                    text = text + this.generateGroupVisual(oneInGroup)
                } else {

                    text = text + oneInGroup.source + " " + oneInGroup.operator + " " + oneInGroup.target
                }
            });
            text = text + ")"
        }
        return text
    }


    render() {

        let Component = inputComponents[this.state.inputHeader.type]


        return (
            <div className="w-100 h-100">
                {(this.props.data && this.props.data != '') ? (
                    <div onClick={() => this.openEditor()} ref={el => this.input = el} className="transpanet-input " style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
                        <p className="placeholder text-start" style={{ color: '#345' }}>{this.generateVisual(this.props.data)}</p>
                    </div>
                ) : (
                    <div onClick={() => this.openEditor()} ref={el => this.input = el} className="transpanet-input" style={{ whiteSpace: 'nowrap', overflow: 'auto' }}>
                        <p className="placeholder text-start">{(!this.props.header?.information?.disabled && !this.props.disabled) ? checkTextTranslation(this.props.header.information.placeholder): ''}</p>
                    </div>
                )}



                <Modal ref={el => this.modal = el} maxWidth={500} onHide={() => this.hideModal()}>
                    <div className="w-100 " style={{ backgroundColor: '#ffffffee', borderRadius: 8, }}>
                        <div className="w-100 flexcb" style={{ padding: '8px 15px', position: 'sticky', top: 0, borderBottom: '0px #eee solid', backgroundColor: '#f2f6f8ee', background: 'linear-gradient(to right,#d7e2f7dd,#dad6e4dd)', backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(10px) saturate(180%)', borderRadius: '8px 8px 0px 0px' }}>

                            <div className="text-start">
                                <p className="text-smallest mt-2 opacity-5" style={{ lineHeight: 0.5 }}>Filter Editor</p>
                                <p>Filter Editor</p>
                            </div>

                            <div className="flexc">
                                <button onClick={() => this.doDone()} className=" flexc px-3 mx-1 flexcc" style={{ height: 30, background: '#ffffff50', borderRadius: 20 }}>
                                    <p className="text-normal">Done</p>
                                </button>

                                <div className="cursor-pointer flexcc" onClick={() => this.modal.hideModal()} style={{ width: 30, height: 30, borderRadius: '50%', backgroundColor: '#ffffff50' }}>
                                    <img style={{ width: 14, height: 14 }} src="/images/close.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <p className="text-smaller description-text mt-3 px-2">You can configure filter using below fields</p>

                        <div className=" px-4 pb-4" style={{ minHeight: 150, overflow: 'auto' }}>
                            <div className="text-start mt-3">
                                {this.renderGroup(this.state.data.root, [], 0)}

                            </div>


                        </div>


                        <FixedView ref={el => this.fixedView = el} nodeRef={this.state.currentNode}  >
                            <div className="blur-back mt-2 ml-3 py-3 px-5 text-center flexcc flex-column" style={{ boxShadow: '0px 0px 15px #00000010', backgroundColor: '#ffffffdd', borderRadius: 4 }}>
                                <p className="text-small tex-uppercase text-bold">Add New</p>
                                <button className="w-100" onClick={() => this.doAdd('con')}>
                                    <p className="text-small mt-1">Condition</p>
                                </button>
                                <button className="w-100" onClick={() => this.doAdd('group')}>
                                    <p className="text-small mt-1">Group</p>
                                </button>
                            </div>
                        </FixedView>


                        <FixedView ref={el => this.actionsView = el} nodeRef={this.state.currentNode}  >
                            <div className="blur-back mt-2 ml-3 py-3 px-4 text-center flexcc flex-column" style={{ boxShadow: '0px 0px 15px #00000010', backgroundColor: '#ffffffdd', borderRadius: 4 }}>
                                {/* <p className="text-small tex-uppercase text-bold">Add New</p> */}
                                <button className="w-100" onClick={() => this.changeAction('and')}>
                                    <p className="text-small mt-1">AND</p>
                                </button>
                                <button className="w-100" onClick={() => this.changeAction('or')}>
                                    <p className="text-small mt-1">OR</p>
                                </button>
                            </div>
                        </FixedView>




                        <FixedView ref={el => this.inputView = el} nodeRef={this.state.currentNode} showFocus={false} >
                            <div className="blur-back flexcc flex-column" style={{ boxShadow: '0px 0px 30px #00000020', maxWidth: 250, marginTop: 30, backgroundColor: '#ffffffdd', borderRadius: 4, minHeight: 35, borderRadius: 4 }}>
                                <div style={{ border: 'none', flex: 1, padding: '5px 10px', borderRadius: 4,position:'relative' }}>
                                    <Component optionsList={this.props.optionsList} header={this.state.inputHeader} data={this.state.current?.value ? this.state.current?.value : ''} changeValue={this.changeInputValue} />
                                </div>
                            </div>
                        </FixedView>



                    </div>
                </Modal>




            </div>
        )
    }
}

export default FilterEditor;