import React from "react";
import Loader from 'react-loader-spinner'
// import { getBoundingClientRect } from "../../utils/functions";
import HttpService from '../../utils/Http.services';
import { checkTextTranslation, translate,getBoundingClientRect } from "../../utils/useful";


class MultiSelectInput extends React.Component {

    state = {
        isOpen: false,
        data: [],
        title: '',
        tempData: [],
        options: [],
        isLoading: false,
        choosen: [],
        lastNewId: 0

    }

    toggleOpen = (open) => {
        // console.log("HERE")
        let openState = open != null ? open : !this.state.isOpen

        if (openState) {
            document.addEventListener('mousedown', this.closeBox);
            window.addEventListener('scroll', this.getPosition, true);
            this.getPosition()

        } else {
            document.removeEventListener('mousedown', this.closeBox);
            window.removeEventListener('scroll', this.getPosition);

        }
        // this.refs.icon.classList.toggle("rotate-180")

        this.setState({ isOpen: openState, data: this.props.data })

    }

    // openBox = () => {

    //     if (!this.state.isOpen) {
    //         document.addEventListener('mousedown', this.closeBox);
    //     }
    //     // this.refs.icon.classList.toggle("rotate-180")

    //     this.setState({ isOpen: true, data: this.props.data })

    // }

    closeBox = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpen) {
            this.setState({ isOpen: false, data: this.props.data })
            document.removeEventListener('mousedown', this.closeBox);
            window.removeEventListener('scroll', this.getPosition);

            // this.refs.icon.classList.toggle("rotate-180")

        }
    }


    getPosition = () => {
        // console.log("getPosition")
        let rect = getBoundingClientRect(this.wrapperRef)
        this.setState({ top: rect.top + 35, left: rect.left - 10 })
    }


    changeItem = (prop, selected, dontChangeValue) => {

        // console.log("CHANGE")
        var choosen = this.state.choosen
        this.setState({ title: '' }, () => {
            if (this.refs.input)
                this.refs.input.focus()
        })


        if (selected) {
            for (let i = 0; i < choosen.length; i++) {

                if (choosen[i].value == prop.value) {
                    choosen.splice(i, 1)
                }
            }
        } else {
            choosen.push(prop)
        }

        this.setState({ choosen }, () => {
            if (!dontChangeValue) this.changeValue()
        })

        setTimeout(() => {
            this.toggleOpen(true)
        }, 1);

        // setTimeout(
        //     function () {
        //         this.toggleOpen()
        //     }
        //         .bind(this),
        //     1
        // );


        if (this.state.tempData.length > 0)
            this.setState({ options: this.state.tempData })

        // this.changeFilter(prop.value)

    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    componentDidMount() {
        this.mounted = true
        // console.log(this.props.data)
        this.init()

    }

    componentDidUpdate(prevProps) {
        // console.log(this.props.data)

        if (prevProps.data != this.props.data && this.mounted) {
            // this.init()
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }


    init() {
        if (this.props.header.information) {
            if (this.props.header.information.type == "local") {

                let options = []
                let choosen = []

                if (this.props.header.information.items && this.props.header.information.items.length > 0) {
                    options = this.props.header.information.items
                }

                if (this.props.data && Array.isArray(this.props.data)) {
                    this.props.data.forEach(element => {
                        choosen.push({ title: element, value: element })
                    });
                }
                // console.log(this.props.title)
                this.setState({ options, choosen })
            } else if (this.props.header.information.type == "api") {
                // console.log(this.props.title)
                this.fetch()
            }
        }
    }


    fetch() {
        this.setState({ isLoading: true })
        let address = this.props.header.information.address
        let filter = typeof this.props.header.information.filter == "string" ? JSON.parse(this.props.header.information.filter) : this.props.header.information.filter

        for (const [key, value] of Object.entries(filter)) {
            if (/\{\{(.*?)\}\}/.test(value)) {
                if (this.props.variables) {
                    filter[key] = this.props.variables[value.replace(/{/g, '').replace(/}/g, '')]
                }
            }
        }
        console.log(filter)


        HttpService.request(address, filter, (fetchResult, fetchError) => {
            console.log(fetchError)
            if (fetchError) { return }

            console.log(fetchResult)
            // fetch(address, {
            //     method: 'POST',
            //     body: JSON.stringify(filter),
            //     headers: headers
            // }).then(response => response.json()).then(data => {
            // console.log(data)
            // if (data.status == 200 && this.mounted) {
            var newData = []
            fetchResult.info.forEach(element => {

                var newTitle = this.spliter(element, this.props.header.information.fields.title)
                var newValue = this.spliter(element, this.props.header.information.fields.value)

                newData.push({ value: newValue, title: newTitle })
                // var newTitle = this.spliter(element, this.props.header.information.fields.title)
                // var newValue = this.spliter(element, this.props.header.information.fields.value)

                // newData.push({ value: newValue, title: newTitle })
            });

            // console.log(this.props.data)

            if (Array.isArray(this.props.data)) {
                let choosen = []
                this.props.data.forEach(oneTitle => {
                    let oneTitleId = typeof oneTitle == 'object' ? oneTitle._id : oneTitle
                    newData.forEach(oneNewData => {

                        if (oneNewData.value == oneTitleId) {
                            choosen.push({ title: oneNewData.title, value: oneTitleId })
                        }
                    });

                })
                this.setState({ choosen })
                // console.log(choosen)


            }

            this.setState({
                options: newData,
                isLoading: false
            })
        })

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
            this.toggleOpen()
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
            // console.log(this.state.tempData)
            this.state.tempData.forEach(element => {
                if (String(element.title).toLowerCase().includes(String(value).toLowerCase())) {
                    values.push(element)
                }
            })
            // console.log(values)

            this.setState({ options: values })

            // }
        }
    }


    removeItem(index) {
        let choosen = [...this.state.choosen]
        choosen.splice(index, 1)
        this.setState({ choosen }, () => {
            this.changeValue()
        })
    }


    addTag() {
        let tempData = [...this.state.tempData]
        let choosen = [...this.state.choosen]

        let item = { title: this.state.title, value: this.state.title }
        tempData.push(item)
        // choosen.push(item)
        this.setState({ tempData }, () => {
            this.changeItem(item, false)
        })
        this.refs.input.focus()
    }

    changeValue() {
        let choosen = []
        this.state.choosen.forEach(element => {
            choosen.push((typeof element.value == 'object' ? element.value._id : element.value))
            // choosen.push((element.value))

        });
        // console.log(choosen)
        this.props.changeValue(this.props.header.key, choosen, this.props.extra)
    }


    render() {

        return (
            <div ref={ref => this.setWrapperRef(ref)} className='mt-0 w-100  flexc' style={{ position: 'relative',flex:1 }} onClick={() => this.toggleOpen(true)} >
                <span style={{ opacity: 0 }}>0</span>

                {this.props.header.information.placeholder && !this.state.choosen?.length && (
                    <div className="h-100 flexc" style={{ position: 'absolute', top: 0 }}>
                        <label className={' mr-1 ml-1 placeholder '}>{checkTextTranslation(this.props.header.information.placeholder)}</label>
                    </div>
                )}

                <div className="wrapper w-100"  >
                    <div style={{ flexWrap: 'wrap', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        {this.state.choosen.map((prop, index) => {
                            return (
                                <div key={index} className="" style={{ display: 'inline-flex', alignItems: 'center', paddingTop: 2, paddingBottom: 2 }}>
                                    <div className="flexcc" key={index} style={{ padding: 5, backgroundColor: '#78b2d020', borderRadius: 4, marginRight: 2, marginLeft: 2, flexWrap: 'nowrap', paddingLeft: 7, paddingRight: 7 }}>
                                        <p style={{ whiteSpace: 'nowrap', marginBottom: 0, marginRight: 2, marginLeft: 2, fontSize: 12, marginTop: 0, color: '#202020' }}>{prop.title}</p>
                                        <img src="/images/close.svg" onClick={() => this.removeItem(index)} style={{ padding: 2, paddingLeft: 0, color: '#78b2d0', width: 18, height: 18 }} />
                                    </div>
                                    {/* {index != this.state.choosen.length - 1 && (
                                        <i className="fa fa-arrow-right" style={{ color: '#78b2d0' }}></i>

                                    )} */}
                                </div>
                            )
                        })}
                        {/* <div className={"position-relative mt-0 ml-1 "}> */}
                        {/* {!this.state.isFinal && (
                                <input ref={'input'} value={this.state.title} onFocus={() => { this.toggleOpen() }} onInput={event => this.search(event.target.value)} onChange={e => { this.props.changeValue(this.props.headerkey, e.target.value) }} className='nofocus mediumiransansfont' style={{ backgroundColor: 'transparent', minWidth: 100, width: this.state.title.length * 9, border: 'none' }} />
                            )} */}
                        {this.state.isLoading && (
                            <div style={{ position: 'absolute', top: 7, right: 5 }}>
                                <Loader
                                    type="Oval"
                                    color="rgba(0,122,255,1)"
                                    height="20"
                                    width="20"
                                />
                            </div>
                        )}
                        {/* </div> */}
                        {this.state.isFinal && (<i className="fa fa-check-circle ml-1" style={{ color: '#78b2d0', fontSize: 20 }}></i>)}

                    </div>

                    {this.state.isOpen && (
                        <div style={{ display: 'flex', position: 'fixed', top: this.state.top, left: this.state.left, width: '100%', maxWidth: 300, zIndex: 40 }}>
                            <div className={'search-drop-down blur-back'} style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#ffffffdd', borderColor: '#eee', borderRadius: 4, maxHeight: 250, overflow: 'auto', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                                {this.props.header.information.isSearchable && (<input onChange={event => this.search(event.target.value)} placeholder={translate("placeholders.search")} style={{ fontSize: 13, alignSelf: 'stratch', padding: 5, margin: 5, height: 35, backgroundColor: '#f7f7f7', borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: '#eee', marginTop: 5 }} className={'text-start'} />)}

                                {this.state.options.map((prop, index) => {
                                    let selected = false
                                    for (var i = 0; i < this.state.choosen.length; i++) {

                                        if (prop.value == this.state.choosen[i].value)
                                            selected = true
                                    }
                                    // console.log(prop)

                                    // console.log(selected)
                                    return (
                                        <div key={index} onClick={() => this.changeItem(prop, selected)} style={{ cursor: 'pointer', padding: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomStyle: 'solid', borderBottomWidth: 1, backgroundColor: selected ? '#f7f7f7' : '#fff' }}>
                                            <p style={{ textAlign: 'center', margin: 0, color: '#000', opacity: 0.5, fontSize: 13 }}>{prop.title}</p>
                                        </div>
                                    )
                                })}

                                {this.state.options.length == 0 && (
                                    <div style={{ cursor: 'pointer', padding: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomStyle: 'solid', borderBottomWidth: 1 }}>
                                        <p style={{ textAlign: 'center', margin: 0, color: '#000', opacity: 0.5, fontSize: 13 }}>{translate("useful.foundNothing")}</p>
                                        {this.props.header.information.tag && this.state.title != '' && (<p onClick={() => this.addTag()} style={{ textAlign: 'center', margin: 0, color: '#007aff', fontSize: 13, marginTop: 5, marginBottom: 5, cursor: 'pointer' }}>+ ADD THIS</p>)}

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


export default MultiSelectInput;
