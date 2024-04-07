import React from "react";
import HttpService from '../../utils/Http.services';
import { siteConfig, siteTheme } from "../../variables/config";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
// import TabBar from "../views/TabBar";
import Configurer from "../../components/Configurer";
// import ProfileImage from "../../components/partials/ProfileImage";
// import TableViewer from "../../components/TableViewer";
// import { v4 as uuidv4 } from 'uuid';
// import ItemModal from "../../modals/ItemModal";
import HttpServices from "../../utils/Http.services";
// import RemoveModal from "../../modals/RemoveModal";
import { checkTextTranslation, checkTranslation, imageAddress, pathMaker, phoneStandardView, priceStandardView } from "../../utils/useful";
// import FilterModal from "../../modals/FilterModal";
// import Pagination from "../../components/Pagination";
// import OptionsListModal from "../../modals/OptionsListModal";
// import Loader from 'react-loader-spinner'
// import Modal from "../../components/Modal";
import { saveAs } from 'file-saver';
// import RemoveConfirmationModal from "../../modals/RemoveConfirmationModal";
// import WikiAskModal from "../../modals/WikiAskModal";
import moment from 'jalali-moment'
// import Collapsible from "react-collapsible";
// import FormViewer from "../../components/FormViewer";
// import SelectInput from "../../components/inputs/SelectInput";
// import { Link } from "react-router-dom";
// import { nanoid } from "nanoid";
// import { socket } from "../../utils/socket.services";
import MessengersList from "./MessengerApplet/MessengersList";
import Messenger from "./MessengerApplet/Messenger";
// import { subscribeAdmin } from "../../utils/Socket.services";

class AdminMessengerApplet extends React.Component {


    openEditModal = (prop, index) => {
        // console.log(prop)
        this.itemModal.modal.showModal()
        this.setState({ currentItem: prop, currentIndex: index })
    }

    openRemoveModal = (prop, index) => {
        this.removeModal.modal.showModal()
        this.setState({ currentItem: prop, currentIndex: index })
    }

    state = {
        data: [],
        actions: {
            add: { key: "edit", label: '{{lang}}edit', color: '#677dc4', function: this.openEditModal },
            edit: { key: "remove", label: '{{lang}}remove', color: '#ee5050', function: this.openRemoveModal }
        },
        currentPage: 0,
        stage: 1,
        limit: 20,

        replyHeaders: [
            // { type: 'TextInput', key: 'title',col: '6',  information: { label: '{{lang}}title', placeholder: '{{lang}}title', required: true } },
            // { key: 'category', type: 'SelectInput',col: '6',  information: { label: '{{lang}}Category', address: 'getContents', filter: { lng: this.props?.lng, page: 'TicketingCategories' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}category', required: true }, showMain: true },
            { key: 'body', type: 'EditorInput', col: '12', information: { label: '{{lang}}Body', placeholder: '{{lang}}body', required: true, inputClass: 'null' }, showMain: false },
            { key: 'attachments', type: 'FileInput', col: '12', information: { label: '{{lang}}Attachments', placeholder: '{{lang}}Attachments', required: false, inputClass: 'null' }, showMain: false },

        ],


        options: [
            // { name: 'Export', icon: '/images/eye.svg', function: this.openExport },
            // { name: 'Edit', icon: '/images/settings.svg', function: this.openEdit },
            // { name: 'Connect', icon: '/images/settings.svg', function: this.fetchConnect },
            // { name: 'Remove', description: 'remove this data', icon: '/images/remove.svg', function: this.openRemoveModal },
        ]
    }


    componentDidMount() {
        this.init()
        this.setState({ width: window.innerWidth })
        window.addEventListener('resize', this.updateWidth)

    }



    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            // setTimeout(() => {
            this.init()
            // }, 500);
        }
    }




    updateWidth = () => {
        this.setState({ width: window.innerWidth })

        if (this.floatMessenger) {
            let bound = this.floatMessenger.getBoundingClientRect()
            this.setState({ mwidth: bound.width, mheight: bound.height })
        }

    }


    init() {
        if (this.props.page) {
            this.setState({ data: [], currentPage: 0, totalCount: null, filter: null }, () => {
                // this.fetchData(true)
            })
        }
    }

    // fetchData = (getCount) => {


    //     this.setState({ isLoadingData: true })
    //     let body = this.props.page.filter ?? {}
    //     let page = this.props.page
    //     body.page = page.key
    //     body.limit = this.state.limit
    //     body.skip = this.state.currentPage

    //     body.filter = this.state.filter ?? {}

    //     // console.log(this.state.filter)

    //     for (const [key, value] of Object.entries(body)) {
    //         if (/\{\{(.*?)\}\}/.test(value)) {

    //             if (this.props.variables) {
    //                 body[key] = this.props.variables[value.replace(/{/g, '').replace(/}/g, '')]
    //             }
    //         }
    //     }

    //     if (this.state.totalCount == null || getCount) {
    //         body.getCount = true
    //     }

    //     // console.log(body)
    //     // console.log(page.fetchUrl)

    //     HttpServices.request(page.fetchUrl, body, (fetchResult, fetchError) => {
    //         this.setState({ isLoadingData: false })
    //         // console.log(fetchError)
    //         if (fetchError) {
    //             this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
    //             return
    //         }
    //         // console.log(fetchResult)
    //         this.setState({ data: [] }, () => {
    //             this.setState({ data: fetchResult.info })
    //             // this.setState({ data: [1,1,1,1,1,1,1,1,1] })

    //         })

    //         if (fetchResult.count != null) {
    //             this.setState({ totalCount: fetchResult.count })
    //         }
    //     })
    // }



    // updateStatus = (key, value, extra) => {


    //     // this.setState({ isLoadingInfo: true, oneDataList: [] })
    //     let body = this.state.info
    //     body.status = value
    //     let page = this.props.page


    //     HttpServices.request(page.addUrl, body, (fetchResult, fetchError) => {
    //         this.setState({ isLoadingInfo: false })
    //         // console.log(fetchError)
    //         if (fetchError) {
    //             this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
    //             return
    //         }
    //         this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
    //         console.log(fetchResult)
    //         this.setState({ info: fetchResult.info })

    //         let data = this.state.data
    //         data.forEach((element, index) => {
    //             if (element._id == body._id) {
    //                 data[index] = fetchResult.info
    //             }
    //         });
    //         this.setState({ data })

    //     })
    // }





    // fetchOne = (item) => {


    //     this.setState({ isLoadingInfo: true, oneDataList: [] })
    //     let body = { messenger: item._id }
    //     let page = this.props.page

    //     // console.log(body)
    //     HttpServices.request(page.fetchOneUrl, body, (fetchResult, fetchError) => {
    //         this.setState({ isLoadingInfo: false })
    //         // console.log(fetchError)
    //         if (fetchError) {
    //             this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
    //             return
    //         }
    //         console.log(fetchResult)
    //         this.setState({ oneDataList: [] }, () => {
    //             this.setState({ oneDataList: fetchResult.info }, () => {
    //                 this.scrollToBottom()

    //                 setTimeout(() => {
    //                     this.scrollToBottom()
    //                 }, 5);
    //             })
    //             // this.setState({ data: [1,1,1,1,1,1,1,1,1] })

    //         })

    //         // if (fetchResult.count != null) {
    //         //     this.setState({ totalCount: fetchResult.count })
    //         // }
    //     })
    // }



    openOne = (item, index) => {
        this.setState({ stage: 2, info: item, currentItem: item, currentIndex: index, oneDataList: [] })
        this.setMessenger(item, () => {
            this.updateWidth()
        })
        // this.fetchOne(item)
    }

    closeOne() {
        this.setState({ stage: 1, info: null, currentItem: null, currentIndex: null, oneDataList: [] }, () => {
        })
    }


    changePage = (index) => {
        this.setState({ currentPage: index }, () => {
            this.fetchData()
            this.closeOne()
        })
    }



    fetchRemove = () => {
        this.setState({ isLoadingRemove: true })
        let id = this.state.currentItem._id

        console.log(id)
        HttpServices.request(this.props.page.removeUrl, { "id": id }, (fetchResult, fetchError) => {
            this.setState({ isLoadingRemove: false })

            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.removeFailed', description: fetchError.message })
                return
            }
            let data = this.state.data
            data.splice(this.state.currentIndex, 1)
            this.setState({ data })
            this.removeModal.modal.hideModal()
            this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.removedSuccesfully', description: '{{lang}}info.dataRemovedSuccessfully' })
            this.fetchData(true)
            this.closeOne()

        })

    }



    fetchExport = () => {
        // this.setState({ isLoadingRemove: true })
        // let id = this.state.currentItem._id
        HttpServices.request(this.props.page?.extra?.export?.url, {}, (fetchResult, fetchError) => {
            // this.setState({ isLoadingRemove: false })
            // console.log(fetchError)
            // console.log(fetchResult)
            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.removeFailed', description: fetchError.message })
                return
            }
            // let data = this.state.data
            // data.splice(this.state.currentIndex, 1)
            // this.setState({ data })
            // console.log(siteConfig.assetsDomain + fetchResult.info)
            saveAs(siteConfig.assetsDomain + fetchResult.info)

            this.exportModal.hideModal()
            this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.removedSuccesfully', description: '{{lang}}info.dataRemovedSuccessfully' })
        })
    }


    itemAdded = (newItem) => {
        if (newItem) {
            let data = this.state.data
            data.splice(0, 0, newItem)
            // console.log(newItem)
            // console.log(data)
            this.setState(data)
        }
    }

    itemEdited = (editedItem) => {
        // console.log(editedItem)
        let data = this.state.data
        this.state.data.forEach((element, index) => {
            let id = element.id ?? element._id
            let currentId = this.state.currentItem.id ?? this.state.currentItem._id
            if (id === currentId) {
                // console.log(id)
                data[index] = Object.assign({}, editedItem)
            }
        });
        this.setState({ data }, () => {
            // console.log(editedItem)
            // console.log(data)
            // this.TableViewer.forceUpdateData()
        })
    }

    updateData = (data) => {
        this.setState(data)
    }


    openAddNew = () => {
        if (this.props.page?.addNew) {
            let newPage = this.props.page?.addNew
            if (this.props.page?.addNew.includes('../')) {
                newPage = this.props.route + this.props.page?.addNew.replace('..', '')
            }
            // console.log(newPage)
            this.props.history.push({ pathname: pathMaker(newPage), search: '?ref=' + pathMaker('/' + this.props.route + '/' + this.props.page?.key), state: { isAdmin: true } })
        } else {
            this.openEditModal()
        }
    }

    openFilterModal() {
        this.filterModal.showModal()
    }

    doFilter = (data) => {
        console.log(data)
        this.setState({ currentPage: 0, filter: data }, () => {
            this.fetchData(true)
            this.filterModal.modal.hideModal()

        })
    }


    filterLabelCreator(rawprop) {
        let prop = JSON.parse(JSON.stringify(rawprop))
        // console.log(prop)
        let isArray = false
        if (Array.isArray(prop.value)) {
            isArray = true
        }

        // let label
        let value = prop.value
        if (prop.type == 'PhoneInput') {
            value = phoneStandardView(value)
        }


        if (prop.type == 'DateInput') {
            if (Array.isArray(value)) {
                value.forEach((element, index) => {
                    value[index] = moment(element).format('jYYYY/jMM/jDD')

                });
            } else {
                value = moment(value).format('jYYYY/jMM/jDD')

            }
        }


        if (prop.dictionary) {

            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    const element = value[i];
                    if (prop.dictionary[element]) {
                        value[i] = prop.dictionary[element]
                    }
                }
            } else {
                if (prop.dictionary[value]) {
                    value = prop.dictionary[value]
                }
            }
        }

        let label = checkTranslation(prop.label) + ' ' + prop.operator + ' ' + value


        return label
    }


    removeFilter = (prop) => {
        let filter = this.state.filter
        delete filter[prop.key]
        // console.log(filter)
        this.setState({ filter }, () => {
            this.fetchData(true)
        })
    }


    // openOptions = (prop, index) => {
    //     // console.log(prop)

    //     let options = []

    //     Object.values(this.props.page?.extra).forEach(element => {
    //         let option = { ...element }
    //         option.function = this[option.function]
    //         options.push(option)
    //     });
    //     console.log(options)
    //     // { name: 'Export', icon: '/images/eye.svg', function: this.openExport },
    //     // { name: 'Edit', icon: '/images/settings.svg', function: this.openEdit },
    //     // { name: 'Connect', icon: '/images/settings.svg', function: this.fetchConnect },
    //     // { name: 'Remove', description: 'remove this data', icon: '/images/remove.svg', function: this.openRemoveModal },
    //     // ]

    //     this.setState({ options, currentItem: prop, currentIndex: index }, () => {
    //         this.optionsModal.modal.showModal()
    //     })

    // }

    // openExport = () => {
    //     this.exportModal.showModal()
    //     this.fetchExport()
    //     // console.log("TEST")
    // }

    // askForWikiChanges = (data) => {
    //     if (!data._id) {
    //         this.itemModal.postValue()
    //     } else {
    //         this.wikiAksModal.modal.showModal()
    //     }
    // }
    // submitWikiChanges = (postFilter) => {
    //     this.itemModal.postValue(postFilter)
    //     this.wikiAksModal.modal.hideModal()
    // }

    // getStatusInfo(status) {
    //     switch (status) {
    //         case '0':
    //             return { label: '{{lang}}Pending', color: '#EE5050', icon: '' }
    //             break;

    //         case '2':
    //             return { label: '{{lang}}Waiting for answer', color: '#EE5050', icon: '' }
    //             break;

    //         case '3':
    //             return { label: '{{lang}}Answered', color: '#35A45C', icon: '' }
    //             break;

    //         case '-1':
    //             return { label: '{{lang}}Closed', color: '#789', icon: '' }
    //             break;

    //         default:
    //             return { label: '{{lang}}Pending', color: '#EE5050', icon: '' }
    //             break;
    //     }
    // }


    setMessenger = (messenger, cb) => {
        // addTopic()
        this.setState({ messenger: messenger }, () => {
            if (cb) {
                cb()
            }
        })

        let token = ''//getVToken()

        // subscribeAdmin(this.state.topicId, token, 'visitor', this.visitorInfoUpdate)
    }



    render() {
        // let hasText = this.state.text && this.state.text != ''
        return (
            <>
                <Configurer
                    settingsInfo={{ showFooter: true, showTabBar: true, showHeader: true, headerTitle: checkTextTranslation(this.props.page?.title), button: { goBack: false } }}
                    title={checkTextTranslation(this.props.page?.title)}
                    description={checkTextTranslation(this.props.page?.description)}
                    className=""
                    style={{ position: 'sticky', top: 44 }}
                >

                    <div className="p-0"  >
                        <div className="row m-0" >

                            {(this.state.stage == 1 || this.state.width > 767) && (
                                <MessengersList page={this.props.page} openOne={this.openOne} closeOne={this.closeOne} messenger={this.state.messenger} />
                                // <div className="col-md-5 col-lg-3 p-0 m-0" style={{ backgroundColor: '#fafbfc' }}>
                                //     {/* <div className="col-12 col-md-5 col-lg-4 mb-5 mt-4 w-100 p-0"> */}


                                //     <div className="no-scrollbar w-100" style={{ height: this.state.width > 767 ? 'calc(100vh - 44px)' : '', overflow: this.state.width > 767 ? 'auto' : '' }}>

                                //         <button onClick={() => this.openFilterModal()} className="flexc px-4 mrd-3 w-100 py-2" style={{ flex: 1, color: '#000', backgroundColor: '#00000007' }}>
                                //             <img className=" " src="/images/search.svg" alt="" width="16px" />
                                //             <span className="text-small mx-1  text-bold" >Filter</span>
                                //         </button>



                                //         <div className="flexc px-2">
                                //             {this.state.filter && Object.values(this.state.filter).map((prop, index) => {
                                //                 console.log(prop)
                                //                 if ((prop.key != 'location') && (prop.key != 'location1')) {

                                //                     return (
                                //                         <div className="flexcc mrd-2 mb-1 mt-2" key={prop.key} style={{ backgroundColor: '#f2f6f8', borderRadius: 4, padding: '4px 10px' }}>
                                //                             <button onClick={() => this.removeFilter(prop, null)} className="p-0 m-0 flexcc">
                                //                                 <img className="mrd-2 opacity-7" src="/images/close.svg" alt="" width="10px" />
                                //                             </button>
                                //                             <p className="text-smaller">{checkTranslation(this.filterLabelCreator(prop))}</p>
                                //                         </div>
                                //                     )
                                //                 } else {
                                //                     return (
                                //                         <div className="flexcc mrd-2 mb-1 mt-2" key={prop.key} style={{ backgroundColor: '#f2f6f8', borderRadius: 4, padding: '4px 10px' }}>
                                //                             <button onClick={() => this.removeFilter(prop, null)} className="p-0 m-0 flexcc">
                                //                                 <img className="mrd-2 opacity-7" src="/images/close.svg" alt="" width="10px" />
                                //                             </button>
                                //                             <p className="text-smaller">LAT {prop.value.lat} - LNG {prop.value.lng} {prop.value.radius ? (" - Radius " + priceStandardView(prop.value.radius) + ' meters') : ""} </p>
                                //                         </div>
                                //                     )
                                //                 }
                                //             }
                                //             )}

                                //         </div>


                                //         {this.state.data.map((item, index) => {
                                //             let status = this.getStatusInfo(item.status)
                                //             return (

                                //                 <div className="single-ticket py-2 px-3 flexc w-100 " style={{ cursor: 'pointer' }} onClick={() => this.openOne(item, index)}>
                                //                     <div>
                                //                         <div className="ticket-situation flexcc" style={{ backgroundColor: status.color }}>
                                //                             <img src={'/images/pending.svg'} className="ticket-img1" />
                                //                         </div>
                                //                     </div>
                                //                     <div className="px-2">
                                //                         <p className="ticket-desc">#{item.id} , {checkTranslation(status.label)}</p>
                                //                         <p className="ticket-name">{item.title}</p>

                                //                         {/* <p className="ticket-desc">{item.description?.substr(0, 70)}{item.description?.length > 70 ? ' ...' : ''} </p> */}
                                //                         <p className="ticket-date">{moment(item.uDate).format("MMM YYYY, DD HH:mm")}</p>
                                //                     </div>

                                //                 </div>
                                //             )
                                //         }
                                //         )}

                                //         {!this.state.isLoadingData && (!this.state.data || this.state.data.length == 0) && (
                                //             <p className="text-center text-smaller text-bold mt-3">Found Nothing</p>
                                //         )}


                                //         {this.state.isLoadingData && (
                                //             <div className="flexcc w-100 mt-3" style={{ alignItems: 'center' }}>
                                //                 <Loader
                                //                     type="ThreeDots"
                                //                     color="#789"
                                //                     height="40"
                                //                     width="40"
                                //                 />
                                //             </div>
                                //         )}

                                //         <div className="mt-3">
                                //             <Pagination currentPage={this.state.currentPage} totalCount={this.state.totalCount} limit={this.state.limit} changePage={this.changePage} />
                                //         </div>
                                //     </div>


                                // </div>
                            )}



                            {(this.state.stage == 2 || this.state.width > 767) && (
                                <div ref={el => this.floatMessenger = el} className="col-12 col-md-7 col-lg-9 no-scrollbar position-relative p-0" >
                                    <div className="w-100 h-100" >
                                        <div style={{ height: 'calc(100vh - 42px)' }} >
                                            <Messenger page={this.props.page} setMessenger={this.setMessenger} messenger={this.state.messenger} width={this.state.mwidth} height={this.state.mheight} adminView={true} showClose={false} close={() => this.setState({ showMessenger: false }, () => this.updateWidth())} askForForm={false} />
                                        </div>
                                    </div>
                                </div>
                                // <div ref={el => this.messagesContainer = el} className="col-12 col-md-7 col-lg-9 no-scrollbar position-relative p-0" style={{ height: this.state.width > 767 ? 'calc(100vh - 44px)' : 'calc(100vh - 104px)', overflow: this.state.width > 767 ? 'auto' : 'auto' }}>

                                //     {!this.state.info && (

                                //         <div className='text-center w-100' style={{ paddingTop: 100 }}>
                                //             <img src='/images/nothing.png' width={80} />
                                //             <p className="mt-2" style={{ fontWeight: 'bold', fontSize: 20 }}>Chat is Not Selected</p>
                                //             <p className='mt-1' style={{ fontSize: 14 }}>Select a chat to see the information</p>

                                //         </div>

                                //     )}
                                //     {this.state.info && (
                                //         <>
                                //             <div className={"row position-relative m-0 p-0" + (this.state.width > 767 ? ' ' : '')}>
                                //                 <div className="col-md-12 p-0  detail order-lg-1 order-2 pb-2">
                                //                     <div className="detail-header flexc " style={{ position: 'sticky', top: 0, backgroundColor: '#ffffffdd', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)', zIndex: 1 }}>
                                //                         {(this.state.stage == 2 && this.state.width < 768) && (
                                //                             <button onClick={() => this.setState({ stage: 1 })} className="mt-2"><img src={'/images/nexts.png'} height="18px" className=" rotate-180" /></button>
                                //                         )}

                                //                         <div className=" flexc">
                                //                             <img src={imageAddress(this.state.info?.creator?.image, 'profile', 'small')} style={{ heigth: 36, width: 36, objectFit: 'cover', borderRadius: 20 }} />
                                //                             <div className="mx-2">
                                //                                 <p className="detail-desc1 m-0">{this.state.info?.creator?.fullname}</p>
                                //                                 <p className="text-smaller" style={{ color: '#789', lineHeight: 1 }}>Status Online</p>
                                //                             </div>
                                //                         </div>
                                //                     </div>
                                //                     <div className="d-flex w-100" style={{ alignItems: 'flex-end', minHeight: this.state.width > 767 ? "calc(100vh - 150px)" : 'calc(100vh - 200px)' }}>
                                //                         <div className="px-3 w-100">
                                //                             <div className=" pb-2 pt-1 w-100">

                                //                                 {this.state.oneDataList?.map((prop, index) => {
                                //                                     let isOther = true
                                //                                     if (prop.isAdmin) {
                                //                                         isOther = false
                                //                                     }
                                //                                     // console.log(prop)
                                //                                     return (

                                //                                         <div className="d-flex mt-3" key={prop._id}>
                                //                                             <div className="mt-2">
                                //                                                 <img src={imageAddress(prop?.creator?.image, 'tickeProfile', 'small')} className=" profile-img1" />
                                //                                             </div>
                                //                                             <div>
                                //                                                 <p className="text-smallest text-uppercase px-2 text-bold" style={{ color: '#789' }}>{prop?.creator?.fullname} - {moment(prop?.cDate).format('MMM YYYY, DD HH:mm')}</p>
                                //                                                 <div className={"chatbox  " + (isOther ? 'other' : '')} >
                                //                                                     <p className="chatbox-desc" >{prop.text}</p>


                                //                                                 </div>
                                //                                             </div>
                                //                                         </div>

                                //                                     )
                                //                                 }).reverse()}

                                //                                 {this.state.isLoadingInfo && (
                                //                                     <div className="flexcc w-100 mt-3 w-100" style={{ alignItems: 'center' }}>
                                //                                         <Loader
                                //                                             type="Oval"
                                //                                             color="#789"
                                //                                             height="40"
                                //                                             width="40"
                                //                                         />
                                //                                     </div>
                                //                                 )}

                                //                                 <div ref={el => this.messagesEndRef = el} />




                                //                             </div>
                                //                         </div>
                                //                     </div>




                                //                 </div>

                                //             </div>

                                //             <div className=" flexc w-100 " style={{ padding: '4px 0px 10px 0px', position: 'sticky', left: 0, bottom: 0, backgroundColor: '#ffffffdd', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)', zIndex: 1 }}>
                                //                 <div className="w-100 flexc mx-3" style={{ padding: '0px 10px', backgroundColor: '#f2f6f8', borderRadius: 20, border: '1px solid #f0f2f6', }}>
                                //                     <textarea value={this.state.text} onChange={(e) => this.updateInput(e.target)} className="w-100" style={{ padding: '8px 5px', outline: 'none', resize: 'none', border: 'none', backgroundColor: 'transparent', fontSize: 14, height: 35, minHeight: 37, maxHeight: 100, }} placeholder="Message ..." />
                                //                     <button onClick={() => { if (hasText) { this.sendTextMessage() } }} className="px-2 flexcc">
                                //                         <img src={'/images/send-f.png'} style={{ opacity: hasText ? 1 : 0.5, filter: hasText ? '' : 'saturate(0%)', transition: '0.3s all' }} height={20} />
                                //                     </button>
                                //                 </div>
                                //             </div>


                                //         </>
                                //     )}


                                // </div>
                            )}



                        </div>





                    </div>
                </Configurer>



                {/* <FilterModal
                    ref={el => this.filterModal = el}
                    initData={this.state.filter}
                    page={this.props.page}
                    headers={this.props.page?.headers}
                    doFilter={this.doFilter} />


                <ItemModal
                    ref={el => this.itemModal = el}
                    page={this.props.page}
                    headers={this.props.page?.headers}
                    initData={this.state.currentItem}
                    variables={this.props.variables}
                    itemAdded={this.itemAdded}
                    itemEdited={this.itemEdited}
                    width={this.props.page?.modalWidth}
                    submitForm={this.props.page?.onSubmit ? this[this.props.page?.onSubmit] : null}
                    showDates={true}
                />


                <RemoveModal
                    isLoading={this.state.isLoadingRemove}
                    removeFunction={this.fetchRemove}
                    ref={el => this.removeModal = el}
                />


                <WikiAskModal
                    isLoading={this.state.isLoadingLeave}
                    confirmed={this.submitWikiChanges}
                    ref={el => this.wikiAksModal = el}
                    title={"Change Things"}
                    option={'Change Things'}
                    description={"Do You want to update related things to this wiki?"}
                />

                <OptionsListModal ref={el => this.optionsModal = el}
                    options={this.state.options}
                />

                <Modal ref={el => this.exportModal = el} maxWidth={300}>
                    <div className="pb-5 w-100 h-100">
                        <div className="w-100 h-100" style={{ backgroundColor: '#fff', overflow: 'auto', borderRadius: 8 }}>
                            <div className="w-100" style={{ zIndex: 1, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0px #eee solid', backgroundColor: '#f2f6f8ee', background: 'linear-gradient(to right,#d7e2f7dd,#dad6e4dd)', backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(10px) saturate(180%)', borderRadius: '8px 8px 0px 0px' }}>

                                <p className="text-bold mb-0 text-normal ">Export</p>

                                <div className="cursor-pointer" onClick={() => this.optionsModal.hideModal()} style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img style={{ width: 14, height: 14 }} src="/images/close.svg" alt="" />
                                </div>

                            </div>
                            <div className="py-4 px-3 pb-2 w-100 text-center">
                                <Loader
                                    type="Oval"
                                    color="#789"
                                    height="50"
                                    width="50"
                                />
                                <p>Exporting in process ...</p>
                                <p className="text-smaller" style={{ color: '#789' }}>Wait till it is completed</p>

                            </div>

                        </div>
                    </div>

                </Modal> */}

            </>
        )
    }


}



const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMessengerApplet);
