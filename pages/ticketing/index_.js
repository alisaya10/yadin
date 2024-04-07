// import logo from './logo.svg';
// import './Ticketing.css';
// import './components/modal.css';
import React from 'react';
import Footer from '../../components/footer';
// import Slider from "react-slick";
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";
// import { Line, Bar } from 'react-chartjs-2';
import moment from 'jalali-moment';
import Modal1 from '../../components/Modal1';
import Collapsible from 'react-collapsible';
import FormViewer from '../../components/FormViewer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
// import Router from 'next/Router';
import HttpServices from '../../utils/Http.services';



class Ticketing extends React.Component {
  state = {
    hoveredIndex: 0,
    stage: 1,
    clickedCount: 0,

    headers: [
      { type: 'TextInput', key: 'title', col: '6', information: { label: '{{lang}}title', placeholder: '{{lang}}title', required: true } },
      { key: 'category', type: 'SelectInput', col: '6', information: { label: '{{lang}}Category', address: 'getContents', filter: { lng: this.props?.lng, page: 'TicketingCategories' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}category', required: true }, showMain: true },
      { key: 'body', type: 'EditorInput', col: '12', information: { label: '{{lang}}Body', placeholder: '{{lang}}body', required: true, inputClass: 'null' }, showMain: false },
      { key: 'attachments', type: 'FileInput', col: '12', information: { label: '{{lang}}Attachments', placeholder: '{{lang}}Attachments', required: false }, showMain: false },

    ],


    list: [
      { name: 'Smart ', image: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)', date: 1630146700104 },
      { name: 'Smart ', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      { name: 'Sensors', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

      { name: 'Headphone', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Headphone', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Headphone', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },
      { name: 'Sensor', image: '', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' }


    ],
  }



  componentDidMount() {

    this.setState({ width: window.innerWidth })
    window.addEventListener('resize', this.updateWidth)

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


        this.addModal.hideModal()
        // Router.push('/forums/question/' + fetchResult.info?._id);

        // console.log(fetchResult)
        // this.setState({ searchResults: fetchResult.info })
      })
    }

  }




  render() {

    return (
      <div className="tickwting-main-header">
        <div className="container tickwting-header ">
          <div className="header-contain1 flexc">
            {(this.state.stage == 2 && this.state.width < 768) && (
              <button onClick={() => this.setState({ stage: 1 })} className="contain1-bttn1"><img src={'/images/icons/previous.svg'} height="18px" className="contain1-bttn1" /></button>
            )}
            <p className="contain1-desc1">Tickets</p>
            <p className="contain1-desc2">52 Issues</p>
          </div>
          <div className="header-contain2 flexc">
            <p className="contain2-sesc1">1-50 pages</p>
            <button onClick={() => this.addModal.showModal()} className="contain2-button">Add new +</button>
          </div>
        </div>
        <div className="">
          <div className="container main-contain mb-5">
            <div className="row">
              {(this.state.stage == 1 || this.state.width > 767) && (
                <div className="col-md-5 col-lg-3 p-0 ">
                  <div className='input-box' style={{ position: 'sticky', zIndex: 1, top: 0, backgroundColor: '#ffffffee', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
                    <input className="search w-100" placeholder="Search ..." />
                  </div>
                  <div style={{ position: 'sticky', top: 0, }}>
                    <div style={{ height: this.state.width > 767 ? 'calc(100vh - 50px)' : '', overflow: this.state.width > 767 ? 'auto' : '' }}>

                      {this.state.list.map((item, index) => {
                        return (

                          <div className="single-ticket flexc w-100" onClick={() => this.setState({ stage: 2 })}>
                            <div>
                              <div className="ticket-situation flexcc">
                                <img src={'/images/icons/pending.svg'} className="ticket-img1" />
                              </div>
                            </div>
                            <div className="px-2">
                              <p className="ticket-name">{item.name}</p>
                              <p className="ticket-desc">{item.description.substr(0, 70)}{item.description?.length > 70 ? ' ...' : ''} </p>
                              <p className="ticket-date">{moment(item.date).format("MMM YYYY, DD")}</p>
                            </div>

                          </div>
                        )
                      }
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(this.state.stage == 2 || this.state.width > 767) && (

                <div className="col-md-7 col-lg-9">

                  <div className="row h-100">
                    <div className="col-md-12 col-lg-8 p-0  detail order-lg-1 order-2">
                      <div className="detail-header flexc" style={{ position: 'sticky', top: 0, backgroundColor: '#ffffffdd', WebkitBackdropFilter: 'blur(20px)', backdropFilter: 'blur(20px)' }}>
                        <p className="detail-desc1">Smart</p>
                      </div>
                      <div className="">
                        <div className="container">
                          <div className=" py-3">
                            <p className="detail-desc2">#Test</p>
                            <p className="detail-desc3">It enables device connectivity via industry standard IoT protocols</p>
                            <p className="mt-4 detail-desc4">Comment</p>
                            <div className="d-flex mt-2">
                              <div>
                                <img src={'/images/woman.svg'} className=" profile-img1" />
                              </div>
                              <div className="chatbox  mt-2">
                                <p className="chatbox-desc">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                              </div>
                            </div>
                            <div className="d-flex mt-2">
                              <div>
                                <img src={'/images/man.svg'} className=" profile-img1" />
                              </div>
                              <div className="chatbox  mt-2">
                                <p className="chatbox-desc">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                              </div>
                            </div>
                            <div className="d-flex mt-2">
                              <div>
                                <img src={'/images/woman.svg'} className=" profile-img1" />
                              </div>
                              <div className="chatbox  mt-2">
                                <p className="chatbox-desc">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4 p-0 order-1 order-lg-2">

                      <div style={{ position: 'sticky', top: 0, }}>

                        <div className="status p-2">

                          <div className="h-100">
                            <img src={'/images/icons/status.svg'} className="status-img h-100" />
                          </div>
                          <div className="p-2">
                            <p className="status-desc1">Status</p>
                            <p className="status-desc2">Inprocress</p>
                          </div>
                        </div>


                        <div className="prof p-3 w-100">
                          <div className="profile1 ">
                            <img src={'/images/man.svg'} className="profile1-img" />
                            <div className="mx-2">
                              <p className="profile1-desc1">Pouya Pezhman</p>
                              <p className="profile1-desc2">Assinee</p>
                            </div>
                          </div>
                          <img src={'/images/icons/menu.svg'} className="prof-img" />
                        </div>
                        {this.state.width < 992 && (
                          <p onClick={() => this.setState({ showList: !this.state.showList })} className="collaps-p m-2 px-2" style={{ color: '#007aff' }}>{this.state.showList ? "Hide" : "Show"} information</p>
                        )}
                        <Collapsible open={this.state.showList || this.state.width > 991}>

                          <div className="ticketing-information">

                            <div className=" ticketing-priority mt-3">
                              <p className=" ticketing-priority-desc1">Priority</p>
                              <p className="ticketing-priority-desc2">Highest</p>
                            </div>
                            <div className="ticketing-duedate">
                              <p className="ticketing-duedate-desc1">Due Date</p>
                              <p className="ticketing-duedate-date1">{moment(new Date()).format("MMM YYYY, DD")}</p>
                            </div>
                            <div className=" ticketing-reporter">
                              <p className=" ticketing-reporter-desc1">Reporter</p>
                              <p className="ticketing-reporter-desc2">Peter Brown</p>
                            </div>

                            <div className=" ticketing-link">
                              <p className="ticketing-link-desc1">Epic Link</p>
                              <a className="ticketing-link-link1" href="#">anp-co.com</a>
                            </div>

                            <div className="px-1 pb-2">
                              <button className="ticketing-learnmore-button">Show More</button>
                            </div>
                          </div>

                          <div className=" d-flex ticketing-tags">
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
                          </div>

                        </Collapsible>

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Modal1 ref={el => this.addModal = el} maxWidth={800}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 0, width: "102%" }}>

            <div className='py-2 px-4' style={{ backgroundColor: '#e0e2e6', borderRadius: '12px 12px 0px 0px' }}>
              <p style={{ color: '#000', fontWeight: 500 }}>New Ticket</p>
              <p style={{ color: '#789', fontSize: 12 }}>IoTSmile ticketing service</p>

            </div>

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
            <div className='px-4 py-4'>
              <FormViewer ref={el => this.form = el} headers={this.state.headers} inputClass={"modern-input"} />
              <div className='d-flex justify-content-end'>
                <button onClick={() => this.postForm()} className="modal-submite-button mt-3">Submit</button>
              </div>

            </div>
          </div>
        </Modal1>
        <Footer />
      </div>
    );
  }
}

// export default Ticketing;

const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ticketing);