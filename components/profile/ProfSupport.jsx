// import logo from './logo.svg';
// import './Ticketing.css';
// import './components/modal.css';
import React from 'react';
// import Footer from '../../components/footer';
// import Slider from "react-slick";
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";
// import { Line, Bar } from 'react-chartjs-2';
import moment from 'jalali-moment';
import Modal5 from '../Modal5';
import Collapsible from 'react-collapsible';
import FormViewer from '../FormViewer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
// import Router from 'next/Router';
import HttpServices from '../../utils/Http.services';
import Pagination from '../Pagination';
import { checkTextTranslation, checkTranslation, imageAddress, translate } from '../../utils/useful';
import Loader from 'react-loader-spinner'
import Link from 'next/link';
import LoaderButton from '../LoaderButton';



class ProfSupport extends React.Component {

  state = {
    hoveredIndex: 0,
    stage: 1,
    clickedCount: 0,
    limit: 20,
    currentPage: 0,


    headers: [
      { type: 'TextInput', key: 'title', col: '6', information: { label: '{{lang}}title', placeholder: '{{lang}}title', required: true } },
      { key: 'course', type: 'SelectInput', col: '6', information: { label: 'یادین مرتبط', address: 'getCourses', filter: {}, fields: { title: 'title', value: '_id' }, type: 'api', isSearchable: true, placeholder: 'یادین', required: true }, showMain: true },
      { col: '6', key: 'topic', type: 'SelectInput', information: { label: ' موضوع تیکت', required: true, type: 'local', placeholder: ' موضوع تیکت', items: [{ title: "تمرین های ارسالی", value: "تمرین های ارسالی" }, { title: "یادین ها", value: 'یادین ها' }, { title: ' گزارشات مالی', value: 'گزارشات مالی' }, { title: 'مشکل سیستمی', value: 'مشکل سیستمی' }] }, showMain: true, inExport: true },
      // { key: 'category', type: 'SelectInput', col: '6', information: { label: '{{lang}}Category', address: 'getContents', filter: { lng: this.props?.lng, page: 'TicketingCategories' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}category', required: true }, showMain: true },
      { key: 'email', col: 6, type: 'EmailInput', information: { autoFocus: true, label: 'ایمیل ', placeholder: 'example@email.com', required: true } },
      { key: 'phone', col: 6, type: 'PhoneInput', information: { autoFocus: true, label: 'شماره همراه', placeholder: '۰۹۱۲۰۰۰۰۰۰۰', required: true } },
      { key: 'body', type: 'TextAreaInput', col: '12', information: { label: 'متن تیکت', placeholder: 'متن تیکت', required: true, inputClass: 'null' }, showMain: false },
      { key: 'attachments', type: 'FileInput', col: '12', information: { label: '{{lang}}Attachments', placeholder: '{{lang}}Attachments', required: false }, showMain: false },

    ],

    replyHeaders: [
      // { type: 'TextInput', key: 'title',col: '6',  information: { label: '{{lang}}title', placeholder: '{{lang}}title', required: true } },
      // { key: 'category', type: 'SelectInput',col: '6',  information: { label: '{{lang}}Category', address: 'getContents', filter: { lng: this.props?.lng, page: 'TicketingCategories' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}category', required: true }, showMain: true },
      { key: 'body', type: 'EditorInput', col: '12', information: { label: '{{lang}}Body', placeholder: '{{lang}}body', required: true, inputClass: 'null' }, showMain: false },
      { key: 'attachments', type: 'FileInput', col: '12', information: { label: '{{lang}}Attachments', placeholder: '{{lang}}Attachments', required: false, inputClass: 'null' }, showMain: false },

    ],


  }



  componentDidMount() {

    this.setState({ width: window.innerWidth })
    window.addEventListener('resize', this.updateWidth);
    this.init();

  }


  init() {
    this.setState({ data: [], currentPage: 0, totalCount: null, filter: null }, () => {
      this.fetchData(true)
    })

  }


  fetchData = (getCount) => {


    this.setState({ isLoadingData: true })
    let body = {}
    // let page = this.props.page
    // body.page = page.key
    body.limit = this.state.limit
    body.skip = this.state.currentPage


    if (this.state.totalCount == null || getCount) {
      body.getCount = true
    }

    console.log(body)
    // console.log(page.fetchUrl)

    HttpServices.request('getMyTickets', body, (fetchResult, fetchError) => {
      this.setState({ isLoadingData: false })
      console.log(fetchResult)
      if (fetchError) {
        this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
        return
      }
      console.log(fetchResult)
      this.setState({ data: [] }, () => {
        this.setState({ data: fetchResult.info })
        // this.setState({ data: [1,1,1,1,1,1,1,1,1] })

      })

      if (fetchResult.count != null) {
        this.setState({ totalCount: fetchResult.count })
      }
    })
  }



  updateStatus = (key, value, extra) => {


    // this.setState({ isLoadingInfo: true, oneDataList: [] })
    let body = this.state.info
    body.status = '-1'
    let page = this.props.page


    HttpServices.request('postTicket', body, (fetchResult, fetchError) => {
      this.setState({ isLoadingInfo: false })
      // console.log(fetchError)
      if (fetchError) {
        this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
        return
      }
      this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
      console.log(fetchResult)
      this.setState({ info: fetchResult.info })

      let data = this.state.data
      data.forEach((element, index) => {
        if (element._id == body._id) {
          data[index] = fetchResult.info
        }
      });
      this.setState({ data })

    })
  }





  fetchOne = (item) => {


    this.setState({ isLoadingInfo: true, oneDataList: [] })
    let body = { _id: item._id }
    let page = this.props.page


    HttpServices.request('getOneTicket', body, (fetchResult, fetchError) => {
      this.setState({ isLoadingInfo: false })
      // console.log(fetchError)
      if (fetchError) {
        this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
        return
      }
      console.log(fetchResult)
      this.setState({ oneDataList: [] }, () => {
        this.setState({ info: fetchResult.info, oneDataList: fetchResult.answers })
        // this.setState({ data: [1,1,1,1,1,1,1,1,1] })

      })

      // if (fetchResult.count != null) {
      //     this.setState({ totalCount: fetchResult.count })
      // }
    })
  }



  postReply = () => {

    let data = this.form.getForm()

    if (data) {

      this.setState({ isLoadingPostReply: true, replyData: data })
      let page = this.props.page

      let body = data
      body.ticket = this.state.info._id


      HttpServices.request('postTicketReply', body, (fetchResult, fetchError) => {
        this.setState({ isLoadingPostReply: false })
        // console.log(fetchError)
        if (fetchError) {
          this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })
          return
        }
        let oneDataList = this.state.oneDataList
        oneDataList.splice(0, 0, fetchResult.info)

        this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
        this.setState({ replyData: {}, oneDataList, info: fetchResult.parent, showReply: false })
        console.log(fetchResult)


        let data = this.state.data
        data.forEach((element, index) => {
          if (element._id == this.state.info._id) {
            data[index] = fetchResult.parent
          }
        });
        this.setState({ data })

      })

    }


  }




  updateWidth = () => {
    this.setState({ width: window.innerWidth })

  }


  data = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: '#',
        data: [2, 5, 8, 70, 30, 50],
        fill: false,
        backgroundColor: '#5B1AC5',
        borderColor: '#5B1AC5',
      },
    ],
  };

  options = {
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
    },
    bezierCurve: true,
    responsive: true,
    elements: {
      line: {
        tension: 0.4
      }
    },

    scales: {

      yAxes: [
        {

          ticks: {
            beginAtZero: true,
          },

        },

      ],
      xAxes: [{

        gridLines: {
          display: false
        },

      }]
    },
  };


  postForm = () => {
    let data = this.form.getForm()

    if (data) {
      data.lng = this.props.lng
      console.log(data)

      this.setState({ isPostingData: true })

      HttpServices.request('postTicket', data, (fetchResult, fetchError, fetchStatus) => {
        this.setState({ isPostingData: false })
        console.log(fetchError)

        if (fetchError) {
          this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })
          return
        }

        this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })


        console.log(fetchResult)
        let data = this.state.data
        data.splice(0, 0, fetchResult.info)
        this.setState({ data }, () => {
          this.openOne(fetchResult.info, 0)
        })

        this.addModal.hideModal()
        // Router.push('/forums/question/' + fetchResult.info?._id);

        // console.log(fetchResult)
        // this.setState({ searchResults: fetchResult.info })
      })
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



  getStatusInfo(status) {
    switch (status) {
      case '0':
        return { label: 'در انتظار', color: '#EE5050', icon: '' }
        break;

      case '2':
        return { label: 'در انتظار پاسخ', color: '#EE5050', icon: '' }
        break;

      case '3':
        return { label: 'پاسخ داده شده', color: '#35A45C', icon: '' }
        break;

      case '-1':
        return { label: 'بسته شده', color: '#000', icon: '' }
        break;

      default:
        return { label: 'در انتظار', color: '#EE5050', icon: '' }
        break;
    }
  }



  openOne = (item, index) => {
    this.setState({ stage: 2, info: item, currentItem: item, currentIndex: index, oneDataList: [] })
    this.fetchOne(item)
  }

  closeOne() {
    this.setState({ stage: 1, info: null, currentItem: null, currentIndex: null, oneDataList: [] }, () => {
    })
  }




  render() {


    // if (!this.props.user || !this.props.user.loggedin) {

    //   return (
    //     <div className='py-5'>
    //       <div className='text-center px-2 py-5' style={{ backgroundColor: '#fff', borderRadius: 15 }}>
    //         <img src={'/images/padlock.svg'} height={60} />
    //         <p className='text-big text-bold mt-2 mb-1' style={{}}>Log in</p>
    //         <p>You need to be logged in to be able to use ticketing system</p>

    //         <div className='flexcc mt-3'>
    //           <Link href={'/login'}>
    //             <a className='mx-1' style={{ color: '#fff', backgroundColor: '#007aff', borderRadius: 4, padding: '4px 15px' }}>
    //               <p style={{ color: '#fff', }}>Log in</p>
    //             </a></Link>

    //           <Link href={'/login'}>
    //             <a className='mx-1' style={{ color: '#789', backgroundColor: '#eee', borderRadius: 4, padding: '4px 15px' }}>
    //               <p style={{ color: '#789', }}>Sign up</p>
    //             </a></Link>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // } else {

    return (
      <div className="p-0 container-fluid"  >
        <div className="row m-0" >


          {(this.state.stage == 1 || this.state.width > 767) && (
            <div className="col-md-5 col-lg-3 p-0 m-0 mt-4 " style={{ backgroundColor: '#dddddd', borderRight: '1px solid #eee', borderLeft: '1px solid #eee', borderRadius: "10px" }}>
              {/* <div className="col-12 col-md-5 col-lg-4 mb-5 mt-4 w-100 p-0"> */}


              <div className="no-scrollbar w-100  " style={{ height: this.state.width > 767 ? 'calc(100vh - 50px)' : '', overflow: this.state.width > 767 ? 'auto' : '' }}>


                {/* <button onClick={() => this.openFilterModal()} className="flexc px-4 mrd-3 w-100 py-2" style={{ flex: 1, color: '#000', backgroundColor: '#00000007' }}>
                  <img className=" " src="/images/search.svg" alt="" width="16px" />
                  <span className="text-small mx-1  text-bold" >Filter</span>
                </button> */}

                <div className='flexcc'>
                  <div className='px-3 py-1 pb-2 pt-2 w-100' style={{ borderBottom: '1px solid #d4d1d1' }}>
                    <h1 className='text-semibig mt-2 mb-1 text-bold'>{translate("Support Tickes")}</h1>
                    <p className='text-smaller mb-2'>{translate("ticket-desc")}</p>
                    <button onClick={() => this.addModal.showModal()} className="flexcc text-center px-2   py-2" style={{ borderRadius: 4, flex: 1, color: '#fff', backgroundColor: '#000' }}>
                      {/* <img className="invert" src="/images/search.svg" alt="" width="16px" /> */}
                      <span className="text-small mx-1  text-bold" >+ {translate('Add New Ticket')}</span>
                    </button>
                  </div>
                </div>

                {/* <div className="flexc px-2">
                    {this.state.filter && Object.values(this.state.filter).map((prop, index) => {
                      if ((prop.key != 'location') && (prop.key != 'location1')) {

                        return (
                          <div className="flexcc mrd-2 mb-1 mt-2" key={prop.key} style={{ backgroundColor: '#f2f6f8', borderRadius: 4, padding: '4px 10px' }}>
                            <button onClick={() => this.removeFilter(prop, null)} className="p-0 m-0 flexcc">
                              <img className="mrd-2 opacity-7" src="/images/close.svg" alt="" width="10px" />
                            </button>
                            <p className="text-smaller">{checkTextTranslation(this.filterLabelCreator(prop))}</p>
                          </div>
                        )
                      } else {
                        return (
                          <div className="flexcc mrd-2 mb-1 mt-2" key={prop.key} style={{ backgroundColor: '#f2f6f8', borderRadius: 4, padding: '4px 10px' }}>
                            <button onClick={() => this.removeFilter(prop, null)} className="p-0 m-0 flexcc">
                              <img className="mrd-2 opacity-7" src="/images/close.svg" alt="" width="10px" />
                            </button>
                            <p className="text-smaller">LAT {prop.value.lat} - LNG {prop.value.lng} {prop.value.radius ? (" - Radius " + priceStandardView(prop.value.radius) + ' meters') : ""} </p>
                          </div>
                        )
                      }
                    }
                    )}

                  </div> */}


                {this.state.data?.map((item, index) => {
                  let status = this.getStatusInfo(item.status)
                  return (

                    <div className="single-ticket flexc w-100 " style={{ cursor: 'pointer', backgroundColor: this.state.info?._id == item._id ? '#00000010' : 'transparent' }} onClick={() => this.openOne(item, index)}>
                      <div>
                        <div className="ticket-situation flexcc" style={{ backgroundColor: status.color }}>
                          <img src={item.status != '-1' ? '/images/pending.svg' : '/images/flag.png'} className="ticket-img1 invert" />
                        </div>
                      </div>
                      <div className="px-2">
                        <p className="ticket-desc">#{item.id} , {checkTranslation(status.label)}</p>
                        <p className="ticket-name">{item.title}</p>

                        {/* <p className="ticket-desc">{item.description?.substr(0, 70)}{item.description?.length > 70 ? ' ...' : ''} </p> */}
                        <p className="ticket-date">{moment(item.uDate).locale('fa').format("jDD,  jMMM, jYYYY (HH:mm)")}</p>
                      </div>

                    </div>
                  )
                }
                )}

                {!this.state.isLoadingData && (!this.state.data || this.state.data.length == 0) && (
                  <p className="text-center text-smaller text-bold mt-3">Found Nothing</p>
                )}

                {this.state.isLoadingData && (
                  <div className="flexcc w-100 mt-3" style={{ alignItems: 'center' }}>
                    <Loader
                      type="ThreeDots"
                      color="#789"
                      height="40"
                      width="40"
                    />
                  </div>
                )}

                <div className="mt-3">
                  <Pagination currentPage={this.state.currentPage} totalCount={this.state.totalCount} limit={this.state.limit} changePage={this.changePage} />
                </div>
              </div>

            </div>
          )}



          {(this.state.stage == 2 || this.state.width > 767) && (

            <div className="col-12 col-md-7 col-lg-9 no-scrollbar " style={{ height: this.state.width > 767 ? 'calc(100vh - 50px)' : '', overflow: this.state.width > 767 ? 'auto' : '' }}>

              {!this.state.info && (

                <div className='text-center w-100' style={{ paddingTop: 100 }}>
                  <img src='/images/nothing.png' width={80} />
                  <p className="mt-2" style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>تیکتی انتخاب نشده </p>
                  <p className='mt-1' style={{ fontSize: 14, color: 'white' }}>تیکت مورد نظر را انتخاب کنید</p>


                </div>

              )}
              {this.state.info && (
                <div className={"row mt-2 mt-md-4" + (this.state.width > 767 ? ' ' : '')}>
                  <div className=" col-md-12 col-lg-8 detail order-lg-1 order-2 " style={{}}>
                    <div className="detail-header flexc " style={{ position: 'sticky', borderRadius: "10px", top: 25, backgroundColor: '#ffffffdd', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)', zIndex: 1 }}>
                      <div className="px-2">
                        <p className="detail-desc1">#{this.state.info?.id} , <span style={{ fontSize: 14, fontWeight: 400 }}>{this.state.info?.title}</span></p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className=" py-3">

                          <div className="px-0 mb-4 ">
                            <div onClick={() => this.setState({ showReply: !this.state.showReply })} className="cursor-pointer w-100 px-2 py-2 flexcb" style={{ transition: '0.5s all', backgroundColor: '#000', color: '#fff', borderRadius: this.state.showReply ? "4px 4px 0px 0px" : 4 }}>
                              <p className="mx-1 text-bold text-small">{translate("Reply")}</p>
                              <img className={"invert " + (this.state.showReply ? 'rotate-90' : '')} style={{ transition: '0.5s All' }} src={'/images/nexts.png'} height={14} />
                            </div>

                            <Collapsible open={this.state.showReply}>
                              <div className="w-100 px-2 py-1 pt-3" style={{ backgroundColor: '#f8fafb', border: '1px solid #f2f6f8', borderRadius: this.state.showReply ? '0px 0px 4px 4px' : 4 }}>
                                <FormViewer initData={this.state.replyData} ref={el => this.form = el} headers={this.state.replyHeaders} inputClass={"modern-input"} />
                                <div className='d-flex justify-content-end'>

                                  {this.state.isLoadingPostReply ? (
                                    <div className='px-2'>
                                      <Loader
                                        type="Oval"
                                        color="#007aff"
                                        height="40"
                                        width="40"
                                      />
                                    </div>
                                  ) : (
                                    <button onClick={() => this.postReply()} style={{ color: '#fff', backgroundColor: '#000', borderRadius: 4 }} className="text-small text-bold px-3 py-1 mt-3">Submit</button>
                                  )}
                                </div>

                              </div>
                            </Collapsible>
                          </div>





                          {/* <p className="detail-desc2">{this.state.info?.title}</p> */}
                          {/* <p className="detail-desc3">It enables device connectivity via industry standard IoT protocols</p> */}
                          {/* <p className="mt-4 detail-desc4">Comment</p> */}
                          {this.state.oneDataList?.map((prop, index) => {
                            return (

                              <div className="d-flex mt-3" key={prop._id} style={prop.creator?._id == this.props.user.info._id ? {} : { direction: "ltr" }}>
                                <div className="mt-2">
                                  <img src={imageAddress(prop?.creator?.image, 'profile', 'small')} className=" profile-img1" />
                                </div>
                                <div>
                                  <p className="text-smallest text-uppercase px-2 text-bold" style={{ color: '#789' }}>{prop?.creator?.fullname} - {moment(prop?.cDate).locale('fa').format("jDD,  jMMM, jYYYY (HH:mm)")}</p>
                                  <div className="ticketBox  " style={prop.creator?._id == this.props.user.info._id ? { borderRadius: "15px 0 15px 15px" } : {}}>
                                    <div className='ck-content'>
                                      <p className="chatbox-desc" dangerouslySetInnerHTML={{ __html: prop?.body }}></p>
                                    </div>
                                    <div className="flexc flex-wrap ">
                                      {prop?.attachments && prop?.attachments.map((attachment, index) => {
                                        return (
                                          <a href={imageAddress(attachment)} target="_blank" className="mrd-1 mt-1">
                                            <div className="flexc" style={{ backgroundColor: '#00000010', borderRadius: 4, padding: '2px 5px' }}>
                                              <div className="flexcc">
                                                <img src="/images/attachment.png" height={14} />
                                              </div>
                                              <p className="text-smaller mx-1">{attachment.extension} File</p>
                                            </div>
                                          </a>
                                        )
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>

                            )
                          })}
                          <div className="d-flex mt-3" style={this.state.info?.creator?._id == this.props.user.info._id ? {} : { direction: "ltr" }}>
                            <div className="mt-2">
                              <img src={imageAddress(this.state.info?.creator?.image, 'profile', 'small')} className=" profile-img1" />
                            </div>
                            <div>
                              <p className="text-smallest text-uppercase px-2 text-bold" style={{ color: '#789' }}>{this.state.info?.creator?.fullname} - {moment(this.state.info?.cDate).locale('fa').format("jDD,  jMMM, jYYYY (HH:mm)")}</p>
                              <div className="ticketBox  " style={this.state.info?.creator?._id == this.props.user.info._id ? { borderRadius: "15px 0 15px 15px" } : {}}>
                                <div className='ck-content'>
                                  <p className="text-small" dangerouslySetInnerHTML={{ __html: this.state.info?.body }}></p>
                                </div>
                                <div className="flexc flex-wrap ">
                                  {this.state.info?.attachments && this.state.info?.attachments.map((attachment, index) => {
                                    return (
                                      <a href={imageAddress(attachment)} target="_blank" className="mrd-1 mt-1">
                                        <div className="flexc" style={{ backgroundColor: '#00000010', borderRadius: 4, padding: '2px 5px' }}>
                                          <div className="flexcc">
                                            <img src="/images/attachment.png" height={14} />
                                          </div>
                                          <p className="text-smaller mx-1">{attachment.extension} File</p>
                                        </div>
                                      </a>
                                    )
                                  })}
                                </div>


                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-4 order-1 order-lg-2 mb-2 mb-lg-0" style={{}}>

                    <div className="" style={{ position: 'sticky', top: 25, }}>


                      <div className="profile1 d-flex mb-2 mb-md-0" style={{ justifyContent: "end" }}>
                        {(this.state.stage == 2 && this.state.width < 768) && (
                          <button onClick={() => this.setState({ stage: 1 })} className=" rotate-180"><img src='/images/icons/arrow-left2.svg' height="20px" className=" rotate-180" /></button>
                        )}
                        {/* 
                          <img src={imageAddress(this.state.info?.creator?.image, 'profile', 'small')} className="profile1-img" />
                          <div className="mx-2">
                            <p className="profile1-desc1">{this.state.info?.creator?.fullname}</p>
                            <p className="profile1-desc2 white">بازگشت</p>
                          </div> */}
                      </div>

                      {/* <div className="status p-2">

                                                <div className="h-100">
                                                    <img src={'/images/status.svg'} className="status-img h-100" />
                                                </div>
                                                <div className="p-2">
                                                    <p className="status-desc1">Status</p>
                                                    <p className="status-desc2">Inprocress</p>
                                                </div>
                                            </div> */}


                      {/* <div className=" py-3 w-100 container" style={{backgroundColor: '#fff'}}>
                       
                        <div>
                                                    <img src={'/images/menu.svg'} className="prof-img" />
                                                </div>
                      </div> */}
                      {/* <div style={{ height: 1, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                      </div> */}
                      <div className="px-2 " style={{ backgroundColor: '#ddd', borderRadius: "10px" }}>
                        <Collapsible open={this.state.showList || this.state.width > 991}>

                          <div className="ticketing-information px-2 pt-2">

                            <div className=" ticketing-priority ">
                              <p className=" ticketing-side-info">وضعیت</p>
                              <p className="ticketing-duedate-date1 mld-4" style={{ color: this.getStatusInfo(this.state.info?.status).color }}>{checkTranslation(this.getStatusInfo(this.state.info?.status).label)}</p>
                            </div>
                            <div className="ticketing-duedate ">
                              <p className="ticketing-side-info">تاریخ ایجاد تیکت</p>
                              <p className="ticketing-duedate-date1 mld-4 text-end">{moment(this.state.info?.cDate).locale('fa').format("jDD,  jMMM, jYYYY (HH:mm)")}</p>
                            </div>

                            <div className="ticketing-duedate">
                              <p className="ticketing-side-info">تاریخ آخرین تغییر</p>
                              <p className="ticketing-duedate-date1 mld-4 text-end">{moment(this.state.info?.uDate).locale('fa').format("jDD,  jMMM, jYYYY  (HH:mm)")}</p>
                            </div>

                            {/* <div className=" ticketing-reporter">
                              <p className=" ticketing-side-info">کاربر</p>
                              <p className="ticketing-duedate-date1 mld-4">{this.state.info?.creator?.fullname}</p>
                            </div> */}


                            {/* <div className=" ticketing-reporter">
                                                        <p className=" ticketing-side-info">User Phone</p>
                                                        <p className="ticketing-reporter-desc2">{this.state.info?.creator?.phone}</p>
                                                    </div> */}



                            {/* <div className="px-1 pb-2">
                                                        <button className="ticketing-learnmore-button">Show More</button>
                                                    </div> */}
                          </div>

                          {/* 
                          <div className="px-1 mt-1 flexc">

                            {this.state.info?.status != '-1' && (
                                <button onClick={() => this.setState({ showChangeStatus: !this.state.showChangeStatus })} className="px-1 py-2 text-center mx-1 w-100" style={{ backgroundColor: '#9ab', color: '#fff', borderRadius: 4 }}>
                                  <p className="text-smaller text-bold">Close Ticket</p>

                                </button>
                              )}


                            <button onClick={() => this.setState({ showRemoveTicket: !this.state.showRemoveTicket })} className="px-1 py-2 text-center mx-1 w-100" style={{ backgroundColor: '#ee5050', color: '#fff', borderRadius: 4 }}>
                                <p className="text-smaller text-bold">Remove Ticket</p>

                              </button>

                          </div> */}

                          <Collapsible open={this.state.showChangeStatus}>
                            <div className="mt-2 px-2">
                              <div className="py-2 px-2" style={{ backgroundColor: '#f2f6f8', color: '#000', borderRadius: 4, fontSize: 14 }}>
                                <p className='px-2'>Are You sure you want to close this ticket?</p>
                                <button onClick={() => this.updateStatus()} className="px-1 mt-2 py-2 text-center mx-1 w-100" style={{ backgroundColor: '#ee5050', color: '#fff', borderRadius: 4 }}>
                                  <p className="text-smaller text-bold">Yes, Close Ticket</p>
                                </button>

                                {/* <SelectInput data={this.state.info?.status} changeValue={this.updateStatus} header={{ key: 'status', information: { type: 'local', items: [{ value: '0', title: '{{lang}}Pending' }, { value: '2', title: '{{lang}}Waiting for answer' }, { value: '3', title: '{{lang}}Answered' }, { value: '-1', title: '{{lang}}Closed' }], } }} /> */}
                              </div>
                            </div>
                          </Collapsible>



                          <Collapsible open={this.state.showRemoveTicket}>
                            <div className="mt-2 px-2">
                              <div className="py-2 px-2" style={{ backgroundColor: '#f2f6f8', color: '#000', borderRadius: 4, fontSize: 14 }}>
                                <p>Are You sure you want to remove this ticket?</p>

                                <button onClick={() => this.fetchRemove()} className="px-1 py-2 text-center mx-1 w-100" style={{ backgroundColor: '#ee5050', color: '#fff', borderRadius: 4 }}>
                                  <p className="text-smaller text-bold">Yes, Remove Ticket</p>
                                </button>

                              </div>
                            </div>
                          </Collapsible>


                          {/* <div className=" d-flex ticketing-tags">
                                                    <p className="ticketing-tags-desc1">Tags</p>
                                                    <div className="d-flex flex-wrap">
                                                        {['started', 'Developers', 'Courses', 'Contact us'].map((prop, index) => {
                                                            return (
                                                                <div className="px-1">
                                                                    <button className="ticketing-tags-button1">{prop}</button>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div> */}

                        </Collapsible>


                        {this.state.width < 992 && (
                          <p onClick={() => this.setState({ showList: !this.state.showList })} className="collaps-p py-2 px-0 m-0" style={{ color: '#222', cursor: 'pointer' }}>{this.state.showList ? "پنهان کردن" : "نشان دادن"} اطلاعات</p>
                        )}
                      </div>

                    </div>
                  </div>
                </div>

              )}
            </div>
          )}



        </div>



        <Modal5 ref={el => this.addModal = el} >
          <div style={{}}>
            <div className="container">
              <div className="box px-3 pb-3" style={{ maxWidth: "500px", }}>
                <div className="border-bottom-gray flexcc">
                  <h3 className="text-color-1">فرم درخواست پشتیبانی</h3>
                </div>

                <div className="">
                  <FormViewer ref={el => this.form = el} headers={this.state.headers} initData={this.props.initData} errors={this.state.errors} inputClass={'modern-input'} formClass={"normalForm"} />
                </div>

                <div className="flexcb">

                  <div className="text-center">
                    <LoaderButton
                      onClick={() => this.postForm()}
                      isLoading={this.state.isLoading}
                      text={"{{lang}}send"}
                      type={"Oval"}
                      className="mt-4 mb-4"
                      buttonStyle={{ outline: 'none', backgroundColor: '#222', cursor: 'pointer', padding: '10px 70px', borderRadius: 10, fontSize: 15, fontWeight: 'bold', color: '#fff', border: '1px solid #a0a0a0' }}
                      width={40}
                      height={40}
                      color={'#202020'}
                    />
                  </div>

                  <div className="text-center">
                    <LoaderButton
                      onClick={() => this.addModal.hideModal()}
                      isLoading={this.state.isLoading}
                      text={"{{lang}}cancel"}
                      type={"Oval"}
                      className="mt-4 mb-4"
                      buttonStyle={{ outline: 'none', backgroundColor: '#222', cursor: 'pointer', padding: '10px 70px', borderRadius: 10, fontSize: 15, fontWeight: 'bold', color: '#fff', border: '1px solid #a0a0a0' }}
                      width={40}
                      height={40}
                      color={'#202020'}
                    />
                  </div>
                </div>

              </div>
            </div>
            {/* <div className='py-2 px-4' style={{ backgroundColor: '#e0e2e6', borderRadius: '12px 12px 0px 0px' }}>
              <p style={{ color: '#000', fontWeight: 500 }}>New Ticket</p>
              <p style={{ color: '#789', fontSize: 12 }}>IoTSmile ticketing service</p>

            </div> */}

            {/* <div>
              <p className="p-1 modal-title">Title</p>
              <input className="modal-title-input w-100" placeholder="title ..." />
            </div>
            <div className="pt-3">
              <p className="p-1 modal-desc">Description</p>
              <textarea className="w-100 modal-desc-textarea" placeholder="description" rows="6" />
            </div>
            <div className="pt-3">
              <p className="p-1 modal-attach-desc">Attachment</p>
              <input type="file" />
            </div> */}
            {/* <div className=''> */}
            {/* <FormViewer ref={el => this.form = el} headers={this.state.headers} inputClass={"modern-input"} /> */}
            {/* <ProfSupport /> */}
            {/* <div className='d-flex justify-content-end'>
                <button onClick={() => this.postForm()} className="modal-submite-button mt-3">{translate("Submit")}</button>
              </div>

            </div> */}
          </div>
        </Modal5>


      </div>
    );
    // }
  }
}
const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfSupport);