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
import { checkTranslation } from '../../utils/useful';


class ContactSales extends React.Component {
  state = {
    hoveredIndex: 0,
    success: false,
    headers: [
      { type: 'TextInput', key: 'values.name', information: { label: "{{lang}}First Name", placeholder: "{{lang}}Name", required: true }, },
      { type: 'TextInput', key: 'values.family', information: { label: "{{lang}}Last Name", placeholder: "{{lang}}Family", required: true }, },
      { type: 'TextInput', key: 'values.email', information: { label: "{{lang}}Work Email", placeholder: "{{lang}}Work Email", required: false }, },
      { type: 'TextInput', key: 'values.Phone', information: { label: "{{lang}}Work Phone", placeholder: "{{lang}}Phone Number", required: true }, },
      // { type: 'TextInput', key: 'values.website', information: { label: "{{lang}}Company Website", placeholder: "{{lang}}Website", }, },

      { type: 'SelectInput', key: 'values.country', information: { label: "{{lang}}Country", type: 'local', items: [{ title: "USA", value: "USA" }, { title: "Iran", value: "Iran" }, { title: "United Kingdom", value: "United Kingdom" }, { title: "Germany", value: "Germany" }, { title: "United Arab Emirates", value: "United Arab Emirates" }], }, },
      { type: 'TextInput', key: 'values.city', information: { label: "{{lang}}City", placeholder: "{{lang}}city",type: 'local', items: [{ title: "1-99", value: "1-99" }, { title: "100-999", value: "100-999" }, { title: "1000-4999", value: "1000-4999" }, { title: "5000+", value: "5000+" }], }, },
      { type: 'TextInput', key: 'values.address', information: { label: "{{lang}}address", placeholder: "{{lang}}address", }, },

      // { type: 'TextAreaInput', key: 'values.peyment', information: { label: "Title", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
      { type: 'TextAreaInput', key: 'values.other', information: {rows:10, label: "{{lang}}Description", placeholder: "{{lang}}Tell us more about your project, needs and timeline.", required: true }, },
      { type: 'FileInput', key: 'values.file', col: '12', information: { label: '{{lang}}Additional-file', single: true, cropper: true, ratio: '1:1', placeholder: '{{lang}}Upload your logo', required: false } },

    ]
  }



  postForm = () => {

    let data = this.form.getForm()
    if (data) {

      this.setState({ isLoadingPost: true, success: false })

      data.page = 'Requests'

      HttpServices.request('postContent', data, (fetchResult, fetchError) => {

        this.setState({ isLoadingPost: false })

        if (fetchError) {
          this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })

          return
        }

        this.setState({ success: true })

        this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })



      })
    }

  }



  render() {

    return (
      <div className="contactsales-bg w-100">
        <div className="flexcc flex-column py-5 text-center container">
          <h1 className="contactsales-header">{checkTranslation('{{lang}}Request-Service')}</h1>
          <p className='mt-2' style={{ maxWidth: 700 }}>{checkTranslation('{{lang}}request-servise-desc')}</p>
        </div>
        <div className="container-fluid position-relative">
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


                  <FormViewer ref={el => this.form = el} headers={this.state.headers} theme={"modern"} inputClass={'modern-input'} />

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

                  {this.state.success && (
                    <div className="d-flex justify-content-end mt-3 text-center">
                      <p className='text-normal' style={{color:'#0052cc'}}>{checkTranslation('{{lang}}submit-request-form-partners-pag')}</p>
                    </div>
                  )}

                </div>


              </div>
              <div className="col-12 col-lg-5  flex-column d-flex justify-content-center px-3 mt-5 mt-lg-0 p-lg-5">
                <p className="contactsales-desc1 mb-2">{checkTranslation('{{lang}}With-IoTSmile-you-can')}:</p>
                <div className="d-flex">
                  <img src="/images/icons/tick.svg" className="ontactsales-img" />
                  <p className="ontactsales-desc2 m-2">{checkTranslation('{{lang}}with-iotsmile-sec-1')}</p>

                </div>
                <div className="d-flex">
                  <img src="/images/icons/tick.svg" className="ontactsales-img" />
                  <p className="ontactsales-desc2 m-2">{checkTranslation('{{lang}}with-iotsmile-sec-2')}</p>

                </div>
                <div className="d-flex">
                  <img src="/images/icons/tick.svg" className="ontactsales-img" />
                  <p className="ontactsales-desc2 m-2">{checkTranslation('{{lang}}with-iotsmile-sec-3')}</p>

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
                <div className="flexcc  ">
                  <img src={'/images/icons/headphones.svg'} className="contactsales-img2" />
                  <div className="mld-4">
                    <p className="contactsales-desc3">{checkTranslation('{{lang}}contactus')}</p>
                    <p className="contactsales-desc4 mt-1">{checkTranslation('{{lang}}under-contact-us-in-partenrs-page')}<a href="#" className="contactsales-a">  {checkTranslation('{{lang}}contactus')}</a> {checkTranslation('{{lang}}page')}</p>
                  </div>
                </div>
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