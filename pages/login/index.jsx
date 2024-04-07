import React from "react";
import HttpService from '../../utils/Http.services';
import { siteConfig, siteTheme } from "../../variables/config";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
// import TLink from "../components/TLink";
import Link from "next/link";
// import RandomBack from "../components/RandomBack";
import StagesManager from "../../components/StagesManager";
import LoginFirstStep from "../../components/login/LoginFirstStep";
import LoginCodeStep from "../../components/login/LoginCodeStep";
import LoginPasswordStep from "../../components/login/LoginPasswordStep";
import LoginInfoStep from "../../components/login/LoginInfoStep";
import LoginWelcomeStep from "../../components/login/LoginWelcomeStep";
import { chooseWallpaper, fetchWallpaper, getToken, pathMaker, translate } from "../../utils/useful";
import Configurer from '../../components/Configurer'
import Router from "next/router";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // colors: ['d7e2f7', 'eee1ff', 'fedfe7', 'dad6e4', 'f7dbd7', 'fff2e1'],
      loginInfo: {},
      stage: 0,
      canResend: true,
      errors: [],
      data: {},
      phone: '',
      settings: { indicatorType: 'phone', mode: 'login', loginWithCode: false, passwordRequired: true }
    }
  }


  componentDidMount() {
// console.log('usssssseee-----eeeeerrrr',this.props.location)
    // this.stageManager.changeStage("welcome")

    // if (this.props.location?.state?.from) {
    //   window.history.pushState(null, null, pathMaker('/login/') + '?ref=' + this.props.location.state.from.pathname);
    // }

    // if (this.props.user.loggedin) {
    //   // this.props.history.push(pathMaker('/profile'))
    // } else {
    //   let settings = this.state.settings
    //   // let pathname = this.props.location.pathname.split('/')
    //   // pathname = pathname[pathname.length - 1]
    //   // if (pathname.toLowerCase() === 'forgotpassword') {
    //   //     settings.mode = 'forgotPassword'
    //   // }
    //   // this.setState({ data: { 'userIndicator': '0098', indicatorType: settings.indicatorType, settings } })
    //   // this.setState({ data: {  indicatorType: settings.indicatorType, settings } })
      
    // }
    if (this.props.user && this.props.user.loggedin) {
      // this.goHome()
      console.log('hereeeeeeeeeeeeeeeeee')
      Router.push("/profile")
    }
    
    fetchWallpaper('login', {}, (wallpaper) => {
      console.log(wallpaper)
      this.setState({ wallpaper })
    })
    // this.props.actions.changeSetting('hideTabBar', true)

  }

  goToInitPage = () => {
    this.changeStage('init')
  }

  componentDidUpdate(prevProps) {
    if (this.props.user != prevProps.user) {
      setTimeout(() => {
        // this.checkLogin()
      }, 4000);
    }
  }


  checkLogin() {
    if (this.props.user.loggedin) {
      // this.setState({})
      if (getToken()) {
        this.props.history.push(pathMaker('/me'))
      }
    }

  }
//   reSend = () => {
//     let settings = this.state.settings
//     settings.loginWithCode = true
//     console.log('--------------',settings);
// this.setState({settings})
//   }

  reSend = (cb) => {
    let data = { ...this.state.data }

    console.log("postUserIndicator")
    console.log(data.phone)
    if (data.phone) {

      console.log("postUserIndicator!!")

      data.phone = '0098' + data.phone
      HttpService.request("postForgotPassword", data, (fetchResult, fetchError) => {
        if (fetchError) { if (cb) { cb(null, fetchError.message) }; return }
        this.setData({ exist: fetchResult.exist })
      
          this.changeStage('code')
        
        if (cb) { cb() }
      })
    } else {
      if (this.state.settings.indicatorType === 'phone') {
        cb(null, { userIndicator: "{{lang}}errors.phoneLength" })
      }
      if (this.state.settings.indicatorType === 'email') {
        cb(null, { userIndicator: "{{lang}}errors.emailPattern" })
      }
    }
  }
  postUserIndicator = (cb) => {
    let data = { ...this.state.data }

    console.log("postUserIndicator")
    console.log(data.phone)
    if (data.phone) {

      console.log("postUserIndicator!!")

      data.phone = '0098' + data.phone
      HttpService.request("checkUserExist", data, (fetchResult, fetchError) => {
        if (fetchError) { if (cb) { cb(null, fetchError.message) }; return }
        this.setData({ exist: fetchResult.exist })
        if (fetchResult.exist && !this.state.settings.loginWithCode) {
          this.changeStage('password')
        } else {
          this.changeStage('code')
        }
        if (cb) { cb() }
      })
    } else {
      if (this.state.settings.indicatorType === 'phone') {
        cb(null, { userIndicator: "{{lang}}errors.phoneLength" })
      }
      if (this.state.settings.indicatorType === 'email') {
        cb(null, { userIndicator: "{{lang}}errors.emailPattern" })
      }
    }
  }

  postForgotPassword = (cb) => {
    let data = { ...this.state.data }
    if (data.phone) {

      data.phone = '0098' + data.phone

      HttpService.request("postForgotPassword", data, (fetchResult, fetchError) => {
        if (fetchError) { if (cb) { cb(null, fetchError.message) }; return }
        this.changeStage('code')
        if (cb) { cb() }
      })
    } else {
      if (this.state.settings.indicatorType === 'phone') {
        cb(null, { userIndicator: "{{lang}}errors.phoneLength" })
      }
      if (this.state.settings.indicatorType === 'email') {
        cb(null, { userIndicator: "{{lang}}errors.emailPattern" })
      }
    }
  }


  postActicationCode = (cb) => {

    let data = { ...this.state.data }
    if (data.phone && data.code && String(data.code).length >= 4) {

      console.log("postActicationCode")
      data.phone = '0098' + data.phone

      HttpService.request((this.state.data.exist || this.state.settings.mode === "forgotPassword") ? "forgotPasswordVerifyCode" : 'userSendVerifyCode', data, (fetchResult, fetchError) => {
        if (fetchError) { if (cb) { cb(null, fetchError.message) }; return }
        if (this.state.data.exist || this.state.settings.mode === "forgotPassword") {
          if (this.state.settings.passwordRequired || this.state.settings.mode === "forgotPassword") {
            this.changeStage('password')
          } else {
            // LOGIN
            this.loginDone(fetchResult)
          }
        } else {
          this.changeStage('info')
        }
        if (cb) { cb() }
      })
    } else {
      cb(null, { code: "{{lang}}errors.codeLength" })
    }
  }

  forgotpassword = () => {
    let settings = this.state.settings
    if (!settings) {
      settings = {}
    }
    settings.mode = "forgotPassword"
    this.setState({settings})
    this.postForgotPassword()
  }


  postPassword = (cb) => {

    let data = { ...this.state.data }
    if (data.phone) {
      data.phone = '0098' + data.phone

      HttpService.request(this.state.settings.mode === 'forgotPassword' ? "forgotPasswordPostPassword" : 'login', data, (fetchResult, fetchError) => {
        if (fetchError) { if (cb) { cb(null, fetchError.message) }; return }
        this.loginDone(fetchResult)
        if (cb) { cb() }
      })
    } else {
      cb(null, { code: "{{lang}}errors.codeLength" })
    }
  }


  postUserInfo = (cb) => {
    let data = { ...this.state.data }
    console.log("this is dataaaaaaaaaaa from server", data)
    if (data.phone && data.code && String(data.code).length >= 4) {

      data.phone = '0098' + data.phone

      HttpService.request("userPostInfo", data, (fetchResult, fetchError) => {


        if (fetchError) {
          // this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.userCreatedSuccessfully', description: '{{lang}}info.needActivation' })
          setTimeout(() => {
            this.changeStage('init')
          }, 1000);
        }

        if (fetchError) { if (cb) { cb(null, fetchError.message) }; return }
        this.loginDone(fetchResult)
        if (cb) { cb() }
      })
    } else {
      cb(null, { code: "{{lang}}errors.codeLength" })
    }
  }


  loginDone = (data) => {
    this.setData(data.user)
    console.log(data)
    if (data.auth?.token) {
      this.props.actions.setUser(data.user, data.auth, true)
      this.changeStage('welcome')
    }
  }


  setData = (data, cb) => {
    if (data) {
      let newData = this.state.data
      for (const [key, value] of Object.entries(data)) {
        newData[key] = value
      }
      this.setState({ data: newData }, () => {
        if (cb) { cb() }
      })
    }
  }



  changeStage = (newStage, cb) => {
    if (this.stageManager) {
      this.stageManager.changeStage(newStage, cb)
    }
  }

  lastStage = () => {
    if (this.stageManager) {
      this.stageManager.lastStage()
    }
  }
  goHome = () => {
    Router.push('/');
  }



  render() {
    return (

      <Configurer
        settingsInfo={{ showFooter: true, showTabBar: false, showHeader: false, headerTitle: '' }}
        title={"Login"}
        description={"Login"}
      >

        <section className="d-flex w-100 position-relative login-background " style={{ backgroundRepeat: 'no-repeat', backgroundPosition: 'right top', backgroundImage: "url('/images/pattern.svg')", padding: '0px', minHeight: '100vh', backgroundColor: '#121212' }}>

          <section className="row w-100 m-0">



            {/* <section className="d-none d-md-block col-12 col-md-5 col-lg-4" style={{ position: 'sticky', top: 0, padding: '100px 30px 20px 30px', textAlign: 'center' }}>
                            <div className="h-100 w-100" style={{ background: '#00000050', position: 'absolute', top: 0, left: 0 }}></div>
                            <div style={{ position: 'relative' }}>
                                <img className="invert mb-2" src={siteTheme.logo} width={'90px'} />
                                <h1 className="text-ultra-big white">{siteConfig.siteName}</h1>
                                <h1 className="text-big white mt-2" style={{ whiteSpace: 'nowrap' }}>{translate('Signin-Signup')}</h1>
                                <p className="white opacity-7" style={{ cursor: 'pointer', fontSize: 15, marginTop: 10, }}>{translate('cookie-warning')}</p>
                            </div>
                        </section> */}

            <section className="col-12  pb-5" style={{ opacity: this.state.mainOpacity, transition: 'all 0.5s', flex: '1 1 auto', paddingTop: 100 }}>

              <div style={{ margin: '0 auto', }} className=" box-5 login-box ">
                <div className=" flexcb row login-height" style={{}}>

                  <div className="col-12 col-xl-7 flexcc order-2 order-md-1 ">

                    <StagesManager ref={el => this.stageManager = el} >
                      <LoginFirstStep initData={this.state.data} setData={this.setData} settings={this.state.settings} postUserIndicator={this.state.settings.mode == "forgotPassword" ? this.postForgotPassword : this.postUserIndicator} stage={0} stageName={'init'} info={this.state.loginInfo} type={'phone'} />
                      <LoginCodeStep initData={this.state.data} setData={this.setData} reSend= {this.reSend} postUserIndicator={this.postUserIndicator} postActicationCode={this.postActicationCode} stage={1} stageName={'code'} />
                      <LoginPasswordStep initData={this.state.data} setData={this.setData} settings={this.state.settings} postPassword={this.postPassword} forgotpassword={this.forgotpassword} stage={2} stageName={'password'} />
                      <LoginInfoStep initData={this.state.data} actions={this.props.actions} setData={this.setData} postUserInfo={this.postUserInfo} stage={3} stageName={'info'} />
                      <LoginWelcomeStep initData={this.state.data} settings={this.state.settings} goToInitPage={this.goToInitPage} stage={4} stageName={'welcome'} />
                    </StagesManager>
                  </div>
                  <div className="bg-main-color-2 h-100 d-none d-xl-flex col-md-5 flexcc radius-2 order-1 order-md-2">
                    <img className="flexcc" style={{ width: "150px" }} src="/images/Logo-login.png" />
                  </div>
                </div>



                {/* <div className="d-block d-xl-none" style={{ height: '400px' }}> */}

                {/* <div className="col-12 flexcc" >

                    <StagesManager ref={el => this.stageManager = el} >
                      <LoginFirstStep initData={this.state.data} setData={this.setData} settings={this.state.settings} postUserIndicator={this.state.settings.mode == "forgotPassword" ? this.postForgotPassword : this.postUserIndicator} stage={0} stageName={'init'} info={this.state.loginInfo} type={'phone'} />
                      <LoginCodeStep initData={this.state.data} setData={this.setData} postUserIndicator={this.postUserIndicator} postActicationCode={this.postActicationCode} stage={1} stageName={'code'} />
                      <LoginPasswordStep initData={this.state.data} setData={this.setData} postPassword={this.postPassword} forgotpassword={this.forgotpassword} stage={2} stageName={'password'} />
                      <LoginInfoStep initData={this.state.data} actions={this.props.actions} setData={this.setData} postUserInfo={this.postUserInfo} stage={3} stageName={'info'} />
                      <LoginWelcomeStep initData={this.state.data} settings={this.state.settings} goToInitPage={this.goToInitPage} stage={4} stageName={'welcome'} />
                    </StagesManager>
                  </div> */}

                {/* </div> */}
              </div>
            </section>

          </section>
        </section>

      </Configurer>

    )
  }
}


const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);