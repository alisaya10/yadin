import React from "react";
import Loader from 'react-loader-spinner'
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import HttpService from '../../utils/Http.services';
import { siteConfig, siteTheme } from "../../variables/config";
import { checkTranslation, getUserInfo, translate } from "../../utils/useful";
import PageStatusViewer from "../../components/PageStatusViewer";
import Configurer from "../../components/Configurer";
import Router from "next/router";


class VerifyPayment extends React.Component {

  state = {
    isLoading: true,
    list: [],
    success: false,
    refId: ''
  }

  componentDidMount() {

    this.fetch()
  }


  fetch = () => {


    let id = Router.query?.id
    let authority = Router.query?.Authority
    
    // let search = this.props.location.search;
    // let params = new URLSearchParams(search);
    // let id = params.get('id');
    // let authority = params.get('Authority');
    
    // return
    if (Router.query?.Status == "OK") {
      if (id) {
        this.setState({ isLoading: true })
        
        // console.log('Authority', Router.query?.Status)
        HttpService.request('verifyIncrease', { id: id, authority: authority }, (fetchResult, fetchError) => {
          this.setState({ isLoading: false })
          console.log(fetchResult)
          console.log(fetchError)

          if (fetchError) {
            this.setState({
              isLoading: false,
              success: false,
              message: fetchError.message
            })
            return
          }
          if (fetchResult) {
            this.setState({
              // list: fetchResult.list,
              info: fetchResult.info,

              isLoading: false,
              success: true,
              refId: fetchResult?.refId
            })

            getUserInfo((fetchResult,fetchError)=>{
              console.log(fetchResult)
              this.props.actions.setUser(fetchResult.user, null, true)
            })
           

            // this.props.clearAllCart()
          }
        })

      } else {

        this.setState({
          isLoading: false,
          success: false,
          message: 'شناسه مورد قبول نمیباشد'

        })
      }

    } else {
      this.setState({
        isLoading: false,
        success: false,
        message: "پرداخت انجام نشد."
      })
    }
  }


  render() {
    return (

      <Configurer
        settingsInfo={{ showFooter: true, showTabBar: true, showHeader: true, headerTitle: "Payment Done", button: {} }}
        title={"Payment done"}
        description={"Payment Verification"}
        className="p-0 "
        ref={el => this.configurer = el}
      >


        <div className=" flexcc pb-5" style={{ backgroundColor: '#121212', minHeight: 'calc(100vh - 60px)', paddingTop: 0, paddingBottom: 0 }}>

          <div style={{ textAlign: 'center', backgroundColor: '#262626', boxShadow: '0px 0px 35px rgba(0,0,0,0.1)', borderRadius: 15, width: '90%', maxWidth: '700px', margin: 'auto', padding: '60px 40px' }}>

            {!this.state.isLoading && (
              <div>
                {this.state.success && (
                  <div>
                    <img src={siteTheme.logo_s} width="150px" className="mb-1 " />

                    <div style={{ backgroundColor: '#262626', borderRadius: 15, padding: '30px 20px', marginBottom: 10 }}>
                      <p className="text-bold text-big" style={{ textAlign: "center", color: '#fff', }}>پرداخت با موفقیت انجام شد!</p>
                      <p className="mt-2 text-small opacity-5" >{translate('refId', { id: this.state.refId })}</p>
                      <p className="mt-2 text-small opacity-5">{translate('shopping-thanks')} - {siteConfig.name}</p>
                    </div>
                    <div>
                    </div>
                  </div>
                )}
                {!this.state.success && (
                  <div className="flexc flex-column">
                    <img src={'/images/icons/paymentfaild.svg'} width="150px" className="mb-1 " />

                    <p className="text-big text-bold mb-2 mt-3 text-color-1" style={{ textAlign: "center" }}>متاسفیم. پرداخت انجام نشد.</p>
                    {/* <p style={{ textAlign: "center", fontSize: 14, opacity: 0.7 }}>{checkTranslation('payment-error')}</p> */}
                    <p className="mt-2 text-small text-color-2" style={{}}>{checkTranslation(this.state.message)}</p>
                    <p className="mt-2 text-smaller" style={{ color: '#6C6C6C', maxWidth: 300 }}>درصورت عدم برگشت وجه طی ۷۲ ساعت، با پشتیبانی تماس بگیرید.</p>


                  </div>
                )}
              </div>
            )}

            {this.state.isLoading && (
              <div style={{ textAlign: 'center' }}>
                <Loader
                  type="Oval"
                  color="rgba(0,122,255,1)"
                  height="40"
                  width="40"
                />
              </div>
            )}

          </div>
        </div>

      </Configurer>

    );
  }
}

const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPayment);
