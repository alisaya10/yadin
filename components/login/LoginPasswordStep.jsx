import React from 'react'
import LoaderButton from '../LoaderButton'
import FormViewer from '../FormViewer'
// import TLink from '../../components/TLink'
import Link from 'next/link'
import { translate } from '../../utils/useful'

class LoginPasswordStep extends React.Component {
  state = {
    errors: {},
    formHeaders: [{ key: 'password', type: 'PasswordInput' ,information: { autoFocus: true, placeholder: '{{lang}}insertPasword', required: true } }]
  }


  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
    // console.log('this.props.reject',this.props.settings )
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.postPassword()
    }
  }



  postPassword = () => {
    this.setState({ isLoading: true, errors: {} })
    let data = this.form.getForm()
    this.props.setData(data, () => {
      this.props.postPassword((result, err) => {
        if (err) { this.setState({ errors: err }) }
        this.setState({ isLoading: false })
      })
    })
  }


  forgotPassword = () => {
    this.props.forgotpassword()
  }


  render() {
    return (

      <div className="flexcc flex-column login-background px-4">

        <h2 className="text-color-1 pb-5 " style={{ fontSize: 27 }}>ورود</h2>

        <div className="w-100 " style={{ maxWidth: 400 }}>
          <FormViewer ref={el => this.form = el} headers={this.state.formHeaders} initData={this.props.initData} errors={this.state.errors} inputClass={'modern-input'} />

          <div className="">
            <LoaderButton
              onClick={this.postPassword}
              isLoading={this.state.isLoading}
              text='ورود'
              type={"Oval"}
              className="mt-4 mb-4 button-class"
              buttonStyle={{ fontSize: 15, fontWeight: 'bold', }}
              width={20}
              height={20}
              color={'#000'}
            />
          </div>
          {this.props.settings.mode != "forgotPassword" && (
            <button onClick={() => this.forgotPassword()} className="text-color-2 w-100 text-center">
              
            کلمه عبور خود را فراموش کرده اید؟
          </button>
            )}
          {this.props.settings.mode == "forgotPassword" && (
            <p  className="text-color-2 w-100 text-center">
              
            کلمه عبور جدید خود را وارد کنید 
          </p>
            )}

          {/* <div className="w-100 text-center mt-2">
            <button className="text-color-2 mb-3" onClick={() => this.props.lastStage()} style={{ fontSize: 13, }}>{translate('back-one-stage')}</button>
          </div> */}
        </div>
      </div>

    )
  }
}

export default LoginPasswordStep;