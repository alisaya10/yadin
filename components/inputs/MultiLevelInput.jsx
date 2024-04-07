import React from "react";
// import { domain, headers } from '../../Variables'
import Loader from 'react-loader-spinner'
// import AutosizeInput from 'react-input-autosize';
// import { siteConfig } from "../../variables/config";
import HttpServices from "../../utils/Http.services";
import { checkTranslation } from "../../utils/useful";

class MultiLevelInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            data: [],
            title: '',
            tempData: [],
            options: [],
            choosen: [],
            isLoading: false,
            isFinal: false,
        }
    }


    toggleOpen = (makeOpen) => {

        let final = makeOpen != null ? makeOpen : !this.state.isOpen
        if (final != this.state.isOpen) {
            if (!this.state.isOpen) {
                document.addEventListener('mousedown', this.closeBox);
            } else {
                document.removeEventListener('mousedown', this.closeBox);

            }
        }


        this.setState({ isOpen: final, data: this.props.data }, () => {
            // this.changePositionOnOpen()
        })

    }

    closeBox = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpen) {
            this.setState({ isOpen: false, data: this.props.data })
            document.removeEventListener('mousedown', this.closeBox);
            if (this.refs.icon)
                this.refs.icon.classList.toggle("rotate-180")

        }
    }


    changeItem = (prop, selected, dontChangeValue) => {
        console.log("CHANGE")
        // console.log(prop)
        var choosen = this.state.choosen
        this.setState({ title: '' }, () => {
            if (this.refs.input)
                this.refs.input.focus()
        })
        // this.toggleOpen()


        if (selected) {
            for (let i = 0; i < choosen.length; i++) {
                // console.log("HERE")

                if (choosen[i] == prop.title) {
                    choosen.splice(i, 1)
                }
            }
        } else {
            let tempProp = prop
            // if(typeof prop == "object"){
            //     tempProp = prop._id
            // }
            choosen.push(tempProp)
        }
        console.log(choosen)
        this.setState({ choosen }, () => {
            if (!dontChangeValue) this.changeValue()
        })


        setTimeout(
            function () {
                this.toggleOpen(true)
            }
                .bind(this),
            1
        );


        if (this.state.tempData.length > 0)
            this.setState({ options: this.state.tempData })

        this.changeFilter(prop.value)

    }

    // setWrapperRef(node) {
    //     this.wrapperRef = node;
    // }


    componentDidMount() {
        if (this.props.header.information) {
            // console.log("HERE")
            // if (this.props.type == "local") {
            //     this.setState({ options: this.props.header.information.items })
            // } else if (this.props.type == "api") {
            // this.setState({data:[]})
            // console.log(this.props.data)
            if (this.props.data && this.props.data.length > 0) {
                // this.loopInit(-1)
            } else {
                this.changeFilter()
            }
            // }
        }

        if (this.props.data && this.props.data.length > 0) {

            this.loopInit(-1)
        }
    }


    componentDidUpdate(prevProps) {

        // console.log(prevProps.data)
        // console.log(this.props.data)

        if ((prevProps.data != this.props.data) && (this.state.choosen.length != this.props.data.length)) {
            if (this.props.data.length > 0) {
                // console.log("INIT")
                this.loopInit(-1)
            }
        }
    }


    loopInit = (count) => {

        // console.log("LOOPINIT")
        console.log(this.props.data)
        // console.log(this.props.data.length)
        // console.log(count)
        if (count < this.props.data.length || !this.props.data) {
            // console.log("HERE")
            let refFilter = this.props.data[count]
            if (typeof refFilter == "object") {
                refFilter = refFilter._id
            }
            this.changeFilter(refFilter, (result) => {

                if (result != -1) {
                    console.log("!@#")
                    result.forEach(element => {
                        let tempData = this.props.data[count + 1]
                        if (typeof tempData == "object") {
                            tempData = tempData._id
                        }
                        console.log(tempData)
                        if (element.value == tempData) {
                            this.changeItem(element, false, true)
                        }
                    });
                    this.loopInit(count + 1)
                }
            }, true)
        }

    }


    changeFilter(refValue, cb, init) {
        if (this.props.header.information && this.props.header.information.filter) {
            // console.log('**')

            let newFilter = this.props.header.information.filter
            // console.log(newFilter)
            newFilter[this.props.header.information.reference] = refValue ? refValue : this.props.header.information.root //? this.props.header.information.root : '')



            this.fetch(newFilter, cb ? cb : null, init)
        }
    }



    fetch(filter, cb, init) {
        // console.log("FETCH")
        this.setState({ options: [] })
        this.setState({ isLoading: true })

        let address = this.props.header.information.address
        // let filter = typeof this.props.header.information.filter == "string" ? JSON.parse(this.props.header.information.filter) : this.props.header.information.filter
        console.log(filter)
        console.log(filter)
        HttpServices.request(address, { filter: filter }, (fetchResult, fetchError) => {
            if (fetchError) { return }
            // console.log(this.props.header.key)
            // console.log(fetchResult)
            // console.log(this.state.choosen)
            var newData = []
            if (fetchResult.info.length > 0) {
                fetchResult.info.forEach(element => {

                    var newTitle = this.spliter(element, this.props.header.information.fields.title)
                    var newValue = this.spliter(element, this.props.header.information.fields.value)

                    newData.push({ value: newValue, title: newTitle })
                });
                this.setState({
                    options: newData,
                    tempData: newData,
                    isLoading: false
                })
                if (cb) {
                    // console.log("FETCH DONE")
                    // console.log(newData)
                    cb(newData)
                }
            } else {
                if (this.state.choosen.length > 0) {
                    this.setState({ isFinal: true }, () => {
                        if (!init) {
                            this.changeValue()
                        }
                        this.toggleOpen(false)
                    })
                }
                this.setState({
                    isLoading: false
                }, () => {

                    if (cb) {
                        cb(-1)
                    } else {
                        // this.changeValue()
                    }
                })
            }


        })


        // fetch(address, {
        //     method: 'POST',
        //     body: JSON.stringify({ filter: filter }),
        //     headers: headers
        // }).then(response => response.json()).then(data => {
        //     // console.log(data)
        //     if (data.status == 200) {

        //     }

        // }).catch(error => this.setState({ error, isLoading: false }));
    }


    spliter(source, string) {
        var stringArray = string.split('.')
        var finalString = source
        stringArray.forEach(element => {
            finalString = finalString[element]
        });
        return finalString
    }


    conditionalSettings(param, condition) {
        if (this.props.settings) {
            if (this.props.settings[param] == condition) {
                return true
            }
        }
        return false
    }


    search = async (value) => {

        // console.log(value)
        this.setState({ title: value })
        if (!this.state.isOpen) {
            this.toggleOpen(true)
        }

        if (value == "") {
            await this.setState({ options: this.state.tempData })
            await this.setState({ tempData: [] })
        } else {
            if (this.state.tempData.length == 0) {
                await this.setState({ tempData: this.state.options })
            }
            var values = []
            // var values = this.props.data.filter((e) => e.title === value)
            this.state.tempData.forEach(element => {
                if (element.title.toLowerCase().includes(value.toLowerCase())) {
                    values.push(element)
                }
            })

            this.setState({ options: values })

        }
    }


    removeItem(index) {
        let newChoosen = [...this.state.choosen]
        newChoosen.splice(index, this.state.choosen.length - index)
        this.setState({ choosen: newChoosen, isFinal: false }, () => {
            this.changeFilter(this.state.choosen.length ? this.state.choosen[this.state.choosen.length - 1].value : this.props.header.information.root)
            this.changeValue(this.props.updateAfterSelect ? false : true)

        })
        this.toggleOpen()
    }


    changeValue(empty) {
        let choosen = []
        // console.log(this.state.choosen)
        if (!empty || !this.props.updateAfterSelect) {
            this.state.choosen.forEach(element => {
                choosen.push(element.value)
            });
        }
        // console.log(choosen)
        this.props.changeValue(this.props.header.key, choosen, { isFinal: this.state.isFinal })
    }


    render() {

        return (
            <div className='mt-0' style={{ width: '100%', position: 'relative' }} >

                {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stratch', height: '100%', }}>
                    <label className={'mb-2 mr-1 ml-1 boldiransansfont ' + (this.conditionalSettings('required', true) ? 'required' : '')} style={{ marginBottom: 3, fontSize: 13, marginTop: 5, color: '#456', fontWeight: 'bold' }}>{this.props.label}</label>
                </div> */}
                {(!this.state.choosen || this.state.choosen.length == 0) && (
                    <p className="placeholder position-absolute px-1" style={{ pointerEvents: 'none', top: 3 }}>{checkTranslation(this.props.header.information.placeholder ?? 'Select ...')}</p>
                )}


                <div ref={ref => this.wrapperRef = ref} >
                    <div onClick={() => { if (this.refs.input) this.refs.input.focus() }} style={{ flexWrap: 'wrap', borderRadius: 4, cursor: 'pointer', display: 'flex', backgroundColor: 'transparent', alignItems: 'center' }}>

                        {this.state.choosen.map((prop, index) => {
                            return (
                                <div className="" style={{ display: 'inline-flex', alignItems: 'center', paddingTop: 2, paddingBottom: 2 }}>
                                    <div key={index} style={{ padding: 5, backgroundColor: '#78b2d020', borderRadius: 4, marginRight: 2, marginLeft: 2, display: 'flex', flexWrap: 'nowrap', alignItems: 'center', paddingLeft: 7, paddingRight: 7 }}>
                                        <p style={{ whiteSpace: 'nowrap', marginBottom: 0, marginRight: 2, marginLeft: 2, fontSize: 12, marginTop: 0, color: '#202020' }}>{prop.title}</p>
                                        <div onClick={() => this.removeItem(index)} className="p-1 flexcc" >
                                            <img src={'/images/close.svg'} height="8px" />
                                        </div>
                                        {/* <i className="fa fa-times"  style={{ padding: 2, paddingLeft: 0, color: '#78b2d0' }}></i> */}
                                    </div>
                                    {index != this.state.choosen.length - 1 && (
                                        <img src={'/images/nexts.png'} height="15px" />

                                        // <i className="fa fa-arrow-right" style={{ color: '#78b2d0' }}></i>

                                    )}
                                </div>
                            )
                        })}
                        <div className={"position-relative mt-0 ml-1 "}>
                            {!this.state.isFinal && (
                                <input ref={'input'} value={this.state.title} onFocus={() => this.toggleOpen(true)} onInput={event => this.search(event.target.value)} className='nofocus mediumiransansfont' style={{ backgroundColor: 'transparent', minWidth: 100, width: this.state.title.length * 9, border: 'none' }} />
                            )}
                            {this.state.isLoading && (
                                <div style={{ position: 'absolute', top: 1, left: 5 }}>
                                    <Loader
                                        type="Oval"
                                        color="rgba(0,122,255,1)"
                                        height="20"
                                        width="20"
                                    />
                                </div>
                            )}
                        </div>
                        {this.state.isFinal && (
                            <img src={'/images/check.svg'} height="20px" />

                            // <i className="fa fa-check-circle ml-1" style={{ color: '#78b2d0', fontSize: 20 }}></i>
                        )}

                    </div>

                    {this.state.isOpen && (
                        <div style={{ display: 'flex', position: 'absolute', width: '100%', zIndex: 40 }}>
                            <div className={'search-drop-down'} style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#fff', borderColor: '#eee', borderRadius: 4, maxHeight: 250, overflow: 'auto', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                                {/* {this.props.isSearchable && (<input changeValue={event => this.search(event.target.value)} placeholder={"جست و جو ..."} style={{ fontSize: 13, textAlign: 'center', direction: 'rtl', alignSelf: 'stratch', padding: 5, margin: 5, height: 35, backgroundColor: '#f7f7f7', borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: '#eee', marginTop: 5 }} className={'mediumiransansfont'} />)} */}

                                {this.state.options.map((prop, index) => {
                                    let selected = false
                                    for (var i = 0; i < this.state.choosen.length; i++) {

                                        if (prop.title == this.state.choosen[i])
                                            selected = true
                                    }
                                    return (
                                        <div key={index} onClick={() => this.changeItem(prop, selected, this.props.header.information?.updateAfterSelect ? false : true)} style={{ cursor: 'pointer', padding: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomStyle: 'solid', borderBottomWidth: 1, backgroundColor: selected ? '#f7f7f7' : '#fff' }}>
                                            <p style={{ textAlign: 'center', margin: 0, color: '#000', opacity: 0.5, fontSize: 13 }}>{prop.title}</p>
                                        </div>
                                    )
                                })}

                                {this.state.options.length == 0 && (
                                    <div style={{ cursor: 'pointer', padding: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                                        <p style={{ textAlign: 'center', margin: 0, color: '#000', opacity: 0.5, fontSize: 13 }}>Found Nothing</p>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}

                </div>



            </div>
        );
    }
}


export default MultiLevelInput;
