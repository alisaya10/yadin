import { nanoid } from 'nanoid'
import React from 'react'
import IndoorPickerModal from '../../modals/IndoorPickerModal'
import { checkTextTranslation } from '../../utils/useful'

class IndoorLocationInput extends React.Component {
    state = {
        data: {}
    }


    changeInputValue(target) {
        let value = (target.validity.valid) ? target.value : null
        if (value !== null) {
            this.props.changeValue(this.props.header.key, value, this.props.extra)
        }
    }


    openPicker = () => {
        this.pickerModal.showModal()
    }


    pickerDoneClicked = (prop, cb) => {
        let data = this.state.data
        data.map = prop

        this.setState({ data }, () => {
            if (cb) { cb() }
        })
    }


    addClicked = (cancel) => {
        let description = 'Click on map to place the new pin'
        let currentStatus = "add"
        let color = '#3FAD74'
        if (cancel) {
            description = null; currentStatus = null
            this.touchPlace.removeEventListener('mousedown', this.touchDone);
        } else {
            this.touchPlace.addEventListener('mousedown', this.touchDone);
        }
        this.setState({ description, currentStatus, color })
    }

    moveClicked = (cancel) => {
        let description = 'Click on a pin to move it'
        let currentStatus = "move"
        let color = '#007aff'
        if (cancel) {
            description = null; currentStatus = null
            this.setState({ moveId: null })
            this.touchPlace.removeEventListener('mousedown', this.touchDone);
        }
        this.setState({ description, currentStatus, color })
    }

    removeClicked = (cancel) => {
        let description = 'Click on a pin to remove it'
        let currentStatus = "remove"
        let color = '#ee5050'
        if (cancel) {
            description = null; currentStatus = null
        }
        this.setState({ description, currentStatus, color })
    }



    touchDone = (event) => {
        if (this.touchPlace && this.touchPlace.contains(event.target)) {

            let data = this.state.data
            if (!data.things) {
                data.things = {}
            }

            let bounds = this.touchPlace.getBoundingClientRect()

            let left = event.clientX - bounds.x
            let top = event.clientY - bounds.y

            // console.log("Left: " + left)

            left = (left * 100) / bounds.width
            top = (top * 100) / bounds.height

            // console.log("top: " + top+'%')

            // console.log(bounds)
            let id = this.state.moveId ?? nanoid()
            data.things[id] = { id, left, top }

            this.setState({ moveId: null, data, currentStatus: null })
            // console.log(event)
            // this.setState({ isOpen: false, data: this.props.data })
            // document.removeEventListener('mousedown', this.closeBox);
            this.touchPlace.removeEventListener('mousedown', this.touchDone);
        }
    }

    thingClicked = (prop) => {

        let data = this.state.data
        console.log(prop)
        if (this.state.currentStatus == "remove") {
            delete data.things[prop.id]
            this.setState({ data, currentStatus: null })
        }

        if (this.state.currentStatus == "move") {
            if (!this.state.moveId) {
                let description = 'Click on a new place to move it'
                this.setState({ description, moveId: prop.id })
                this.touchPlace.addEventListener('mousedown', this.touchDone);

            }
        }
    }


    render() {

        return (
            <div className="w-100 h-100">

                {!this.state.data?.map ? (
                    <button className="w-100 h-100 text-start" onClick={() => this.openPicker()}>
                        <p className="placeholder">{checkTextTranslation(this.props.header.information.placeholder)}</p>
                    </button>
                ) : (
                    <div className={'w-100'}>
                        <div className="flexcc">
                            {(this.props.header?.information.maxCount == null || !this.state.data?.things || (this.props.header?.information.maxCount > Object.values(this.state.data?.things).length)) && (
                                <div className="d-flex" style={{ flex: 1 }}>
                                    {this.state.currentStatus != 'add' ? (
                                        <button onClick={() => this.addClicked()} style={{ flex: 1, width: '100%', backgroundColor: '#9ab', color: '#fff', borderRadius: 4 }}><p className="text-smaller">Add Thing</p></button>
                                    ) : (
                                        <button onClick={() => this.addClicked(true)} style={{ flex: 1, width: '100%', backgroundColor: '#3FAD74', color: '#fff', borderRadius: 4 }}><p className="text-smaller">Cancel Add</p></button>
                                    )}
                                </div>
                            )}
                            {this.state.currentStatus != 'move' ? (
                                <button onClick={() => this.moveClicked()} style={{ flex: 1, backgroundColor: '#9ab', color: '#fff', borderRadius: 4 }}><p className="text-smaller">Move Thing</p></button>
                            ) : (
                                <button onClick={() => this.moveClicked(true)} style={{ flex: 1, backgroundColor: '#007aff', color: '#fff', borderRadius: 4 }}><p className="text-smaller">Cancel Move</p></button>
                            )}
                            {this.state.currentStatus != 'remove' ? (
                                <button onClick={() => this.removeClicked()} style={{ flex: 1, backgroundColor: '#9ab', color: '#fff', borderRadius: 4 }}><p className="text-smaller">Remove Thing</p></button>
                            ) : (
                                <button onClick={() => this.removeClicked(true)} style={{ flex: 1, backgroundColor: '#ee5050', color: '#fff', borderRadius: 4 }}><p className="text-smaller">Cancel Remove</p></button>
                            )}
                        </div>
                        {this.state.currentStatus && (
                            <p className="mt-1 mb-1 text-center text-small" style={{ color: this.state.color }}>{this.state.description}</p>
                        )}
                        <div ref={el => this.touchPlace = el} style={{ position: 'relative' }}>
                            <img src={this.state.data.map.image} width={'100%'} />
                            <div style={{ position: 'absolute', pointerEvents: 'none', height: '100%', width: '100%', top: 0, left: 0 }}>
                                {this.state.data?.things && Object.values(this.state.data?.things).map((prop, index) => {
                                    return (
                                        <div onClick={() => this.thingClicked(prop)} style={{ pointerEvents: 'all', position: 'absolute', top: prop.top + '%', left: prop.left + '%', transform: 'translate(-50%,-50%)' }}>
                                            <img src="/images/idea.svg" width={'30px'} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                )}

                <IndoorPickerModal ref={el => this.pickerModal = el} doneClicked={this.pickerDoneClicked} />
                {/* <input  ref={el => this.input = el} spellCheck={this.props.header.information.spellCheck} value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} disabled={this.props.header.information?.disabled} className="transpanet-input" /> */}
            </div>
        )
    }
}

export default IndoorLocationInput;