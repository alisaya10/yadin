import React from 'react'
import LoaderButton from '../LoaderButton'
import FormViewer from '../FormViewer'
import { chooseWallpaper, phoneStandardView, translate } from "../../utils/useful";

// import HttpService from '../../utils/Http.services';

class LoginCodeStep extends React.Component {
  state = {
    key: '',
    selectedCountry: {},
    resendTime: 60,
    resendRequested: false,
    // errors:{},
    initData : {},
    formHeaders: [{ key: 'code', type: 'NumberInput', information: { autoFocus: true, placeholder: '{{lang}}activationCode', required: true } }]
  }

  componentDidMount() {
    // this.changeResendTime()
    this.timer = setInterval(this.checkResendTime, 1000);
    document.addEventListener("keydown", this._handleKeyDown);

  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
    document.removeEventListener("keydown", this._handleKeyDown);

  }



  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.postActicationCode();
    }
  };

  postActicationCode = () => {
    this.setState({ isLoading: true, errors: {} })
    let data = this.form.getForm()
    if (data) {
      this.props.setData(data, () => {
        this.props.postActicationCode((result, err) => {
          if (err) { this.setState({ errors: err }) }
          this.setState({ isLoading: false, initData : {} })
        })
      })
    }
  }

  requestResend() {
    if (!this.state.resendRequested) {
      this.setState({ resendRequested: true })
      // this.props.reSend()
      this.props.reSend((result, err) => {
        this.setState({ resendRequested: false })
        if (err) { return }
        this.setState({ canResend: false, resendTime: 60, initData : {}  })
      })
    }
  }

  checkResendTime = () => {
    if (this.state.resendTime > 0) {
      this.setState({ resendTime: this.state.resendTime - 1 })
    } else { this.setState({ canResend: true }) }
  }




  render() {
    return (

      <div className="flexcc flex-column login-background px-4">

        <div style={{ flexDirection: 'column', width: '300px', textAlign: 'center' }} className='d-flex align-items-center mb-2'>

          <p className='my-3 text-color-1' style={{ fontWeight: '600', fontSize: '30px' }}>ورود</p>

        </div>
        <div className="w-100" style={{ maxWidth: 400, width: '80%', margin: '0 auto' }}>

          <FormViewer ref={el => this.form = el} headers={this.state.formHeaders} initData={this.state.initData ?? this.props.initData} errors={this.state.errors} inputClass={'modern-input'} />

          <div className="text-center">

            <div onClick={() => this.props.changeStage('init')} className='d-flex justify-content-center align-items-center mt-3'>
              <button className='text-color-2' style={{ fontWeight: '600', borderBottom: '1px solid #252525' }}>تغییر شماره ؟ {phoneStandardView(String(this.props.initData?.phone))}</button>
            </div>
            <LoaderButton
              onClick={this.postActicationCode}
              isLoading={this.state.isLoading}
              text='ارسال'
              type={"Oval"}
              className="mt-4 mb-4 button-class"
              buttonStyle={{ fontSize: 15, fontWeight: 'bold', }}
              width={20}
              height={20}
              color={'#000'}
            />
            {/* <LoaderButton
                            onClick={this.postActicationCode}
                            isLoading={this.state.isLoading}
                            text='ارسال مجدد'
                            type={"Oval"}
                            className="mt-4 mb-4  "
                            buttonStyle={{color:'#fff' , fontSize: 15, fontWeight: 'medium',}}
                            width={40}
                            height={40}
                            color={'#fff'}
                        /> */}


            <p className='text-color-2' style={{ fontSize: 13, opacity: 0.5, marginTop: 0 }}>{translate('if-not-recived-code')}</p>
            {this.state.canResend ? (
              <button onClick={() => this.requestResend()} className="flatButton mt-2 text-color-2" style={{ fontSize: 13, opacity: this.state.resendRequested ? 0.5 : 1, transition: 'all 0.4s', marginTop: 0 }}>{translate('request-resend')}</button>
            ) : (
              <p className="mt-2 text-color-2" style={{ fontSize: 13, opacity: 0.5, marginTop: 0 }}>{translate('resend-code-in', { seconds: this.state.resendTime })}</p>
            )}

          </div>
        </div>
      </div>

    )
  }
}

export default LoginCodeStep;