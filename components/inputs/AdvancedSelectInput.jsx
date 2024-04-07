import React from "react";
import Loader from 'react-loader-spinner'
import FilterModal from "../../modals/FilterModal";
// import { getBoundingClientRect } from "../../utils/functions";
import HttpService from '../../utils/Http.services';
import { checkTextTranslation, checkTranslation, filterLabelCreator, imageAddress, translate,getBoundingClientRect } from "../../utils/useful";
// import FilterViewer from "../FilterViewer";
// import FilterModal from '../modals/FilterModal';
// import Modal from "../Modal";


class AdvancedSelectInput extends React.Component {

    state = {
        isOpen: false,
        data: [],
        title: '',
        tempData: [],
        options: [],
        isLoading: false,
        choosen: [],
        lastNewId: 0,
        search: ''

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
        console.log("getPosition")
        let rect = getBoundingClientRect(this.wrapperRef)
        this.setState({ top: rect.top + 35, left: rect.left - 10 })
    }



    changeItem = (prop, selected, dontChangeValue) => {

        // console.log(prop)
        // var choosen = this.state.choosen
        this.setState({ title: '', search: '', choosen: prop }, () => {
            this.changeValue()
            if (this.state.tempData.length > 0)
                this.setState({ options: this.state.tempData })

            // if (this.refs.input)
            //     this.refs.input.focus()
        })


        // if (selected) {
        //     for (let i = 0; i < choosen.length; i++) {

        //         if (choosen[i].value == prop.value) {
        //             choosen.splice(i, 1)
        //         }
        //     }
        // } else {
        //     choosen.push(prop)
        // }

        // this.setState({ choosen }, () => {
        //     if (!dontChangeValue) 
        // })

        setTimeout(() => {
            this.toggleOpen(false)
        }, 1);

        // setTimeout(
        //     function () {
        //         this.toggleOpen()
        //     }
        //         .bind(this),
        //     1
        // );




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

                if (this.props.title && Array.isArray(this.props.title)) {
                    this.props.title.forEach(element => {
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
        // console.log("FETCH")
        this.setState({ isLoading: true })
        let address = this.props.header.information.address
        let body = typeof this.props.header.information.filter == "string" ? JSON.parse(this.props.header.information.filter) : this.props.header.information.filter
        // console.log(filter)

        if (this.state.filter) {
            if (!body) {
                body = {}
            }
            body.filter = this.state.filter
        }


        for (const [key, value] of Object.entries(body)) {
            if (/\{\{(.*?)\}\}/.test(value)) {

                if (this.props.variables) {
                    body[key] = this.props.variables[value.replace(/{/g, '').replace(/}/g, '')]
                }
                // console.log("VAR")
            }
        }
        // console.log(this.props.variables)
        // console.log(address)
        // console.log(filter)



        HttpService.request(address, body, (fetchResult, fetchError) => {
            if (fetchError) { return }

            console.log(fetchResult)
            // fetch(address, {
            //     method: 'POST',
            //     body: JSON.stringify(filter),
            //     headers: headers
            // }).then(response => response.json()).then(data => {
            // console.log(data)
            // if (data.status == 200 && this.mounted) {
            let newData = []
            let newParents = []

            fetchResult.info.sort((a, b) => { return a.values?.parent - b.values?.parent })

            // console.log(fetchResult)
            fetchResult.info.forEach(element => {

                let newTitle = this.spliter(element, this.props.header.information.fields.title)
                let newValue = this.spliter(element, this.props.header.information.fields.value)
                let newImage
                let newDescription
                if (this.props.header.information.fields.image) {
                    newImage = this.spliter(element, this.props.header.information.fields.image)
                }
                if (this.props.header.information.fields.description) {
                    newDescription = this.spliter(element, this.props.header.information.fields.description)
                }
                let parent = this.spliter(element, this.props.header.information.fields.parent)

                // if (parent && parent != '') {
                newData.push({ value: newValue, title: newTitle, image: newImage, description: newDescription, parent: (typeof parent == 'object' ? parent._id : parent) })
                // } else {
                //     newParents.push({ value: newValue, title: newTitle,image:newImage, parent: (typeof parent == 'object' ? parent._id : parent) })
                // }

            });



            newParents.sort((a, b) => { return a.values?.name - b.values?.name })


            // console.log(this.props.data)

            if (this.props.data) {

                let data = this.props.data
                if (Array.isArray(data)) {
                    data = data[0]
                }
                if(typeof data == 'object'){
                    data = data._id
                }

                newData.forEach(oneNewData => {
                    if (oneNewData.value == data) {
                        this.setState({ choosen: oneNewData })
                        // choosen.push({ title: oneNewData.title, value: oneTitleId })
                    }
                });
            }

            // if (Array.isArray(this.props.data)) {
            //     let choosen = []
            //     this.props.data.forEach(oneTitle => {
            //         let oneTitleId = typeof oneTitle == 'object' ? oneTitle._id : oneTitle
            //         newData.forEach(oneNewData => {

            //             if (oneNewData.value == oneTitleId) {
            //                 choosen.push({ title: oneNewData.title, value: oneTitleId })
            //             }
            //         });

            //     })
            //     this.setState({ choosen })
            //     // console.log(choosen)


            // }

            this.setState({
                options: newData,
                parents: newParents,
                isLoading: false
            })
        })

        // }).catch(error => this.setState({ error, isLoading: false }));
    }


    spliter(source, string) {
        if (string) {
            var stringArray = string.split('.')
            var finalString = source
            stringArray.forEach(element => {
                if (finalString) {
                    finalString = finalString[element]
                }else{
                    return null
                }
            });
        }
        return finalString
    }




    search = async (value) => {
        // console.log("SEARCH")

        // console.log(this.state.options)
        this.setState({ title: value })
        this.setState({ search: value })

        if (!this.state.isOpen) {
            this.toggleOpen()
        }

        if (value == "") {
            await this.setState({ options: this.state.tempData }, async () => {
                await this.setState({ tempData: [] })
            })
        } else {
            if (this.state.tempData.length == 0) {
                // console.log("HERE")
                await this.setState({ tempData: this.state.options }, () => {
                    // console.log(this.state.tempData)
                })
            }
            var values = []
            // var values = this.props.data.filter((e) => e.title === value)
            // console.log(this.state.tempData)
            this.state.tempData.forEach(element => {
                // console.log(element)

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
        // let choosen = [...this.state.choosen]
        // choosen.splice(index, 1)
        this.setState({ choosen: '' }, () => {
            this.changeValue()
        })
    }



    changeValue() {
        // let choosen = []
        // this.state.choosen.forEach(element => {
        //     choosen.push((typeof element.value == 'object' ? element.value._id : element.value))
        //     // choosen.push((element.value))

        // });
        // console.log(choosen)
        // console.log(this.state.choosen)
        let finalValue = (typeof (this.state.choosen == 'object' && !Array.isArray(this.state.choosen)) ? this.state.choosen.value : this.state.choosen)
        // console.log(finalValue)
        // console.log(this.props.header.key)

        // if(this.props.header.information?.sendArray){
        //     finalValue = [finalValue]
        // }

        this.props.changeValue(this.props.header.key, finalValue, this.props.extra)
    }

    openFilter = () => {
        this.filterModal.modal.showModal()
    }


    doFilter = (filter) => {
        console.log(filter)
        this.setState({ currentPage: 0, filter: filter }, () => {
            this.fetch(true)
            this.filterModal.modal.hideModal()

        })
    }



    removeFilter = (prop) => {
        let filter = this.state.filter
        delete filter[prop.key]
        // console.log(filter)
        this.setState({ filter }, () => {
            this.fetch(true)
        })
    }

    render() {
        // console.log(this.props.data)
        return (
            <div className='mt-0 w-100 h-100 flexc ' style={{ position: 'relative' }}  >

                <div ref={ref => this.setWrapperRef(ref)} className="w-100" >

                    <div className="flexcb w-100 h-100">
                        <div onClick={() => this.toggleOpen(true)} style={{ flex: 1, cursor: 'pointer' }}>
                            {(!this.props.data || this.props.data == '' || !this.state.choosen?.title) && (
                                <div className="h-100 flexc" style={{ flex: 1 }}>
                                    <label className={' mr-1 ml-1 placeholder '}>{this.props.header.information.placeholder ? checkTextTranslation(this.props.header.information.placeholder) : 'Select'}</label>
                                </div>
                            )}

                            {(this.props.data && this.props.data != '' && this.state.choosen?.title) && (
                                <div className="flexc text-start" style={{ flexWrap: 'nowrap', cursor: 'pointer', flex: 1 }}>
                                    <p style={{ whiteSpace: 'nowrap' }}>{this.state.choosen.title}</p>
                                </div>
                            )}
                        </div>

                        {this.props.header.information?.search && (
                            <button onClick={() => this.openFilter()} className="flexcc">
                                <img src="/images/filter.svg" height="20px" />
                            </button>
                        )}
                    </div>


                    {this.state.isLoading && (
                        <div style={{ position: 'absolute', top: 3, right: 5 }}>
                            <Loader
                                type="Oval"
                                color="#FF6C00"
                                height="20"
                                width="20"
                            />
                        </div>
                    )}



                    {this.state.isOpen && (
                        <div className="text-start" style={{ top: this.state.top, left: this.state.left, display: 'flex', position: 'fixed', width: '100%', zIndex: 5, maxWidth: 300 }}>
                            <div className={'search-drop-down blur-back'} style={{ paddingBottom: 20, display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#ffffffee', borderRadius: 4, maxHeight: 300, overflow: 'auto', boxShadow: '0px 0px 30px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
                                {this.props.header.information.isSearchable && (
                                    <input className="" value={this.state.search} onChange={event => this.search(event.target.value)} placeholder={translate("useful.searchPlaceholder")} style={{ zIndex: 1, fontSize: 14, alignSelf: 'stratch', padding: '8px 10px', margin: 5, backgroundColor: '#fff', borderRadius: 4, border: '#e0e2e6 solid 1px', marginTop: 0, position: 'sticky', top: 5 }} />
                                )}

                                {this.state.filter && Object.values(this.state.filter).length > 0 && (
                                    <div className="flexc mt-2 px-1 flex-wrap">
                                        {Object.values(this.state.filter).map((prop, index) => {
                                            return (
                                                <div key={index} className="flexcc mrd-1 mb-1" style={{ backgroundColor: 'rgba(103, 125, 196, 0.082)', color: 'rgba(103, 125, 196, 0.8)', borderRadius: 20, padding: '3px 10px', fontSize: 12, }}>
                                                    {filterLabelCreator(prop)}
                                                    <button onClick={() => this.removeFilter(prop)} className="p-0 mld-2" style={{ color: 'rgba(103, 125, 196, 0.8)', fontSize: 12 }}>
                                                        <span className="flexcc">X</span>
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}



                                {this.state.options.length != 0 && (
                                    <div className="mt-2" onClick={() => this.changeItem({ value: '' })} style={{ cursor: 'pointer', backgroundColor: 'transparent', opacity: 0.5, padding: '5px 20px' }}>
                                        <p style={{ margin: 0, color: '#456', fontSize: 13 }}>{checkTranslation(this.props.header?.information?.defaultPlaceholder ?? "{{lang}}useful.choosePlaceholder")}</p>
                                    </div>
                                )}

                                {/* {this.state.parents?.map((prop, index) => {
                                    let selectableParent = this.props.header.information?.selectableParent
                                    let selected = false
                                    return (
                                        <div key={index}>
                                            {(!this.state.search || this.state.search == '') && (
                                                <div onClick={() => { if (selectableParent) this.changeItem(prop, selected) }} style={{ padding: '10px 20px', borderBottom: '1px solid #eee', marginBottom: 5, cursor: selectableParent ? 'pointer' : '' }}>
                                                    <p style={{ margin: 0, color: '#789', fontSize: 13 }}>{prop.title}</p>
                                                </div>
                                            )} */}
                                {this.state.options?.map((cprop, cindex) => {
                                    let cselected = false

                                    // if (cprop.parent == prop.value) {
                                    return (
                                        <div className="">
                                            <div className="flexc " key={cindex} onClick={() => this.changeItem(cprop, cselected)} style={{ cursor: 'pointer', backgroundColor: cselected ? '#f7f7f7' : '#transparent', padding: '5px 20px' }}>
                                                {this.props.header.information?.fields?.image && (
                                                    <div className="flexcc">
                                                        <img className="mrd-3" src={imageAddress(cprop.image, 'resource', 'small')} width="30px" height="30px" alt="" style={{ borderRadius: 40, objectFit: 'cover' }} />
                                                    </div>
                                                )}
                                                <div className="d-flex flex-column justify-content-center">
                                                    <p className="text-bold" style={{ margin: 0, color: '#000', fontSize: 15 }}>{cprop.title}</p>
                                                    <p style={{ margin: 0, color: '#789', fontSize: 12, lineHeight: 1.2 }}>{cprop.description}</p>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                    // }
                                })}
                                {/* </div> */}
                                {/* )
                                })} */}

                                {this.state.options.length == 0 && (
                                    <div className="px-2 pt-3">
                                        <p style={{ textAlign: 'center', margin: 0, color: '#000', opacity: 0.5, fontSize: 13 }}>{translate("useful.foundNothing")}</p>
                                        {/* {this.props.header.information.tag && this.state.title != '' && (<p onClick={() => this.addTag()} style={{ textAlign: 'center', margin: 0, color: '#007aff', fontSize: 13, marginTop: 5, marginBottom: 5, cursor: 'pointer' }}>+ ADD THIS</p>)} */}

                                    </div>
                                )}

                            </div>
                        </div>
                    )}

                </div>
                {/* {this.props.header.information?.search && ( */}
                <FilterModal ref={el => this.filterModal = el} headers={this.props.header.information?.search?.headers} initData={this.state.filter} doFilter={this.doFilter} />
                {/* )} */}

            </div>
        );
    }
}


export default AdvancedSelectInput;
