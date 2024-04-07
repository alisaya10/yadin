// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
// import Footer from '../../Components/footer';
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { Line, Bar } from 'react-chartjs-2';
// import './contactsales.css'
import FormViewer from '../../components/FormViewer';
import FancyCircle from '../../components/FancyCircle';
import HttpServices from '../../utils/Http.services';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import Loader from 'react-loader-spinner';
import FancySquare from '../../components/FancySquare';
import Link from 'next/link';
import { checkTranslation } from '../../utils/useful';


class ContactSales extends React.Component {
  state = {
    hoveredIndex: 0,
    success: false,

    list: [
      { name: '{{lang}}Sell-Data', link: '#data', ref: 'data', image: "/images/icons/sellData.png", adress: '', button: '{{lang}}learn-more', description: '{{lang}}sell-data', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },
      { name: '{{lang}}Do-Services', link: '#services', ref: 'services', image: "/images/icons/sellService.png", button: '{{lang}}learn-more', adress: '', description: '{{lang}}do-servic-desc', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      { name: '{{lang}}Sell-devices', link: '#devices', ref: 'devices', image: '/images/icons/sellDevices.png', description: '{{lang}}sell-data-desc', button: '{{lang}}learn-more', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

    ],

    initData:{},

    headers: [
      { type: 'TextInput', key: 'name', information: { label: "Business name", placeholder: "Business name", required: true }, },
      // { type: 'TextInput', key: 'family', information: { label: "Last Name", placeholder: "Family", required: true }, },
      { type: 'TextInput', key: 'email', information: { label: "Work Email", placeholder: "Work Email", required: true }, },
      { type: 'TextInput', key: 'phone', information: { label: "Work Phone", placeholder: "Phone Number", required: true }, },
      { type: 'TextInput', key: 'address', information: { label: "Address", placeholder: "Address", }, },
      // { type: 'SelectInput', key: 'size', information: { label: "Company size", type: 'local', items: [{ title: "1-99", value: "1-99" }, { title: "100-999", value: "100-999" }, { title: "1000-4999", value: "1000-4999" }, { title: "5000+", value: "5000+" }], }, },
      // { type: 'SelectInput', key: 'country', information: { label: "Country", type: 'local', items: [{ title: "USA", value: "USA" }, { title: "Iran", value: "Iran" }, { title: "United Kingdom", value: "United Kingdom" }, { title: "Germany", value: "Germany" }, { title: "United Arab Emirates", value: "United Arab Emirates" }], }, },
      // { type: 'SelectInput', key: 'peyment', information: { label: "Peyment Volume", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
      { type: 'TextAreaInput', key: 'reqdescription', information: { label: "Description", placeholder: "Tell us more about your project, needs and timeline.", required: true }, },
      { type: 'ImageInput', key: 'image', col: '12', information: { label: '{{lang}}Logo', single: true, cropper: true, ratio: '1:1', placeholder: '{{lang}}Upload your logo', required: false } },
      { type: 'FileInput', key: 'file', col: '12', information: { label: '{{lang}}Additional-file', single: true, cropper: true, ratio: '1:1', placeholder: '{{lang}}Upload your logo', required: false } },

    ]
  }



  postForm = () => {

    if (true || this.props.user && this.props.user?.loggedin) {
      let data = this.form.getForm()
      if (data) {

        this.setState({ isLoadingPost: true, success: false,initData:data })


        HttpServices.request('postPartner', data, (fetchResult, fetchError) => {

          this.setState({ isLoadingPost: false })

          if (fetchError) {
            this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })

            return
          }

          this.setState({ success: true,initData:{} })

          this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })



        })
      }
    }
  }



  scrollTo = (ref) => {
    this[ref].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }




  render() {

    return (
      <div className="contactsales-bg w-100">
        <div className="contactus-hero">

          <div className="contactus-hero-bg">

          </div>

          <div className="flexcc flex-column container position-relative mb-5">
            <p className="contactus-header">{checkTranslation('{{lang}}Partners')}</p>
            <p className="contactus-desc">{checkTranslation('{{lang}}partners-page-desc-down-title')}</p>
          </div>

          <div className="w-100" style={{ overflow: 'hidden', position: 'absolute', top: '0%', left: 0, zIndex: 0, opacity: 0.2 }}>
            {[1, 1, 1, 1, 1, 1, 1].map(() => {
              return (
                <div className="flexc w-100 mt-0">
                  {[1, 1, 1, 1, 1, 1, 1].map(() => {
                    return (
                      <FancySquare />
                    )
                  })}
                </div>

              )
            })}
          </div>


          <div className="w-100" style={{ overflowX: 'hidden', position: 'absolute', height: "200%", top: 0, left: 0, zIndex: 0, opacity: 0.2 }}>
            {[1, 1, 1, 1, 1].map(() => {
              return (
                <div className="flexc w-100 mt-5">
                  {[1, 1, 1, 1, 1, 1, 1, 1].map(() => {
                    return (
                      <FancyCircle />
                    )
                  })}
                </div>

              )
            })}
          </div>




          <div className="container">
            <div className="row position-relative ">
              {this.state.list.map((item, index) => {
                return (
                  <div className="col-12 mb-2 col-md-4">
                    <div className="contactus-box  h-100  flexcc flex-column">
                      <div className="h-100 flexcc flex-column">

                        <img src={item.image} className="contactus-box-img mt-4" />
                        <div className="px-5  flexcc flex-column mt-2">
                          <p className="contactus-box-name mt-2">{checkTranslation(item.name)}</p>
                          <p className="contactus-box-desc m-1 text-center ">{checkTranslation(item.description)}</p>
                        </div>
                      </div>
                      <Link href={item.link}>
                        <a onClick={() => this.scrollTo(item.ref)} className="contactus-box-button p-3 mt-3 text-center">{checkTranslation(item.button)}</a>
                      </Link>
                    </div>
                  </div>
                )
              }
              )}

            </div>
          </div>
        </div>



        <div id="#data" ref={el => this.data = el} style={{ background: 'rgb(247,249,252)' }}>
          <div className="container py-4">
            <div className="row py-3 flexcc w-100  ">
              <div className="col-12 col-md-6 flexcc px-4 order-1 order-md-2">
                <img src="/images/sellData.jpg" className="w-100" style={{ borderRadius: "8px" }} />
              </div>
              <div className="col-12 col-md-6 px-4 order-2">
                <p className="joinus-desc1 my-0" style={{ fontSize: 26 }}><span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#0052cc)',padding:'6px 4px', color: "#fff" }}>{checkTranslation('{{lang}}Sell-Data')}</span> {checkTranslation('{{lang}}in-platform')}</p>
                <p className="joinus-desc2">{checkTranslation('{{lang}}sell-data-desc-in-partners-page')}</p>

              </div>
            </div>
          </div>
        </div>



        <div id="#services" ref={el => this.services = el} style={{ background: '#fff' }}>
          <div className="container py-4">
            <div className="row py-3 flexcc w-100  ">

              <div className="col-12 col-md-6 px-4 order-2">
                <p className="joinus-desc1 my-0" style={{ fontSize: 26 }}><span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#0052cc)',padding:'6px 4px', color: "#fff" }}>{checkTranslation('{{lang}}Do-Services')}</span> {checkTranslation('{{lang}}as-a-partner')}</p>
                <p className="joinus-desc2">{checkTranslation('{{lang}}do-service-desc-partners-page')} </p>

              </div>

              <div className="col-12 col-md-6 flexcc px-4 order-1 order-md-2">
                <img src="/images/sellServices.jpg" className="w-100" style={{ borderRadius: "8px" }} />
              </div>

            </div>
          </div>
        </div>


        <div id="#devices" ref={el => this.devices = el} style={{ background: 'rgb(247,249,252)' }}>
          <div className="container py-4">
            <div className="row py-3 flexcc w-100  ">
              <div className="col-12 col-md-6 flexcc px-4 order-1 order-md-2">
                <img src="/images/sellDevices.jpg" className="w-100" style={{ borderRadius: "8px" }} />
              </div>
              <div className="col-12 col-md-6 px-4 order-2">
                <p className="joinus-desc1 my-0" style={{ fontSize: 26 }}><span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#0052cc)',padding:'6px 4px', color: "#fff" }}>{checkTranslation('{{lang}}Sell-Devices')}</span> {checkTranslation('{{lang}}in-shop')}</p>
                <p className="joinus-desc2">{checkTranslation('{{lang}}sell-device-desc-page-partners')} </p>
                {/* <div className='mt-3'>
                                    <Link href={"/developers"}>
                                        <a className="box2-button2" style={{ backgroundColor: 'rgb(208, 216, 224)' }}>Visit developers section</a>
                                    </Link>
                                </div> */}
              </div>
            </div>
          </div>
        </div>




        <div className="container-fluid position-relative mt-4">
          <div className="cntactsales-bg1"></div>
          <div className="w-100" style={{ overflowX: 'hidden', position: 'absolute', height: "100%", top: 0, left: 0, zIndex: 0, opacity: 0.3 }}>
            {[1, 1, 1, 1, 1].map(() => {
              return (
                <div className="flexc w-100 mt-5">
                  {[1, 1, 1, 1, 1, 1, 1, 1].map(() => {
                    return (
                      <FancyCircle />
                    )
                  })}
                </div>

              )
            })}
          </div>





          <div className="container position-relative">
            <div className="row w-100 m-0">
              <div className="col-12 col-lg-7 flexcc">
                <div className="contactsales-box w-100 p-4">

                  <div className='mx-1 mb-3'>
                    <p className='text-normal mb-1'>{checkTranslation('{{lang}}Request-to-become-a-partner')}</p>
                    <p className='text-smaller mb-1' style={{ color: '#ee5050' }}>{checkTranslation('{{lang}}Only-for-selling-devices-and-doing-services')}</p>
                    {(!this.props.user || !this.props.user?.loggedin) && (
                      <p className='text-small' style={{ color: '#ee5050' }}>{checkTranslation('{{lang}}You-need-to-be-logged')}</p>
                    )}
                  </div>


                  <FormViewer ref={el => this.form = el} initData={this.state.initData} headers={this.state.headers} theme={"modern"} inputClass={'modern-input'} />

                  <div className="d-flex justify-content-end mt-3">
                    {this.state.isLoadingPost ? (
                      <div className='pt-1 px-2'>
                        <Loader
                          type="Oval"
                          color="#7b00f7"
                          height="34"
                          width="34"
                        />
                      </div>
                    ) : (
                      <button onClick={() => this.postForm()} className=" contactsales-button">{checkTranslation('{{lang}}Submit-Request')}</button>
                    )}


                  </div>

                  {(!this.props.user || !this.props.user?.loggedin) && (
                    <div className="d-flex justify-content-end mt-3 text-center">
                      <p className='text-small' style={{ color: '#ee5050' }}>{checkTranslation('{{lang}}You-need-to-be-logged')}</p>
                    </div>
                  )}

                  {this.state.success && (
                    <div className="d-flex justify-content-end mt-3 text-center">
                      <p className='text-normal' style={{ color: '#0052cc' }}>{checkTranslation('{{lang}}submit-request-form-partners-page')}.</p>
                    </div>
                  )}

                </div>


              </div>


              <div className="col-12 col-lg-5  flex-column d-flex justify-content-center px-3 mt-5 mt-lg-5 p-lg-5">
                <p className="contactsales-desc1 mb-2">{checkTranslation('{{lang}}how-to-become-a-partner')}</p>
                <div className="d-flex">
                  <img src="/images/icons/tick.svg" className="ontactsales-img" />
                  <p className="ontactsales-desc2 m-2">{checkTranslation('{{lang}}how-to-be-come-partner-desc1')}</p>

                </div>
                <div className="d-flex">
                  <img src="/images/icons/tick.svg" className="ontactsales-img" />
                  <p className="ontactsales-desc2 m-2">{checkTranslation('{{lang}}how-to-be-come-partner-desc2')}</p>

                </div>
                <div className="d-flex">
                  <img src="/images/icons/tick.svg" className="ontactsales-img" />
                  <p className="ontactsales-desc2 m-2">{checkTranslation('{{lang}}how-to-be-come-partner-desc3')}</p>

                </div>

              </div>

            </div>
            <div className="row w-100 m-0 py-5">
              <div className="col-12 col-md-6">
                <div className="flexcc  ">
                  <img src={'/images/icons/communication.svg'} className="contactsales-img2" />
                  <div className="mld-4">
                    <p className="contactsales-desc3">{checkTranslation('{{lang}}Use-Live-Messenger')}</p>
                    <p className="contactsales-desc4 mt-1">{checkTranslation('{{lang}}use-live-messanger-desc')}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 mt-4 mt-md-0">
                <Link href={'/about_us'}>
                <div className="flexcc cursor-pointer ">
                  <img src={'/images/icons/headphones.svg'} className="contactsales-img2" />
                  <div className="mld-4">
                    <p className="contactsales-desc3">{checkTranslation('{{lang}}contactus')}</p>
                    <p className="contactsales-desc4 mt-1"> {checkTranslation('{{lang}}under-contact-us-in-partenrs-page')}<a href="#" className="contactsales-a"> {checkTranslation('{{lang}}aboutus')}</a> {checkTranslation('{{lang}}page')}</p>
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </div >
    );
  }
}


const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactSales);