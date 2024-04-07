import React from 'react'
import LoaderButton from '../LoaderButton'
import FormViewer from '../FormViewer'
import { translate } from '../../utils/useful'
// import HttpService from '../../utils/Http.services';

class LoginInfoStep extends React.Component {
  state = {
    errors: {},
    formHeaders: [
      { key: 'name', type: 'TextInput', information: { autoFocus: true, icon: '/images/icons/person.svg', placeholder: '{{lang}}insertName', required: true } },
      { key: 'family', type: 'TextInput', information: { icon: '/images/icons/person.svg', placeholder: '{{lang}}insertFamily', required: true } },
      { key: 'password', type: 'PasswordInput', information: { placeholder: '{{lang}}insertPassword', required: true } },
      { key: 'email', type: 'TextInput', information: { icon: '/images/icons/mail.svg', placeholder: '{{lang}}insertEmail', required: true } },
    ]
  }

  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown);
  }


  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
    document.removeEventListener("keydown", this._handleKeyDown);

  }



  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.postUserInfo();
    }
  };

  postUserInfo = () => {
    let data = this.form.getForm()

    if (data) {
      this.setState({ isLoading: true, errors: {} })

      console.log("this is data from server", data)

      this.props.setData(data, () => {
        this.props.postUserInfo((result, err) => {

          // if


          if (err) { this.setState({ errors: err }) }


          this.setState({ isLoading: false })
        })
      })
    }
  }


  render() {
    return (

      <div className="flexcc flex-column login-background px-4 pb-3" >

        <h2 className="mt-4 mb-0 text-color-1" style={{ fontSize: 27 }}>{translate("information")}</h2>
        <p className="mb-4 mt-0 text-color-2" style={{ fontSize: 15 }}>{translate('insert-information')}</p>

        <div className="w-100" style={{ maxWidth: 400 }}>

          <FormViewer ref={el => this.form = el} headers={this.state.formHeaders} initData={this.props.initData} errors={this.state.errors} inputClass={'modern-input'} />

          <div className="text-center">
            <LoaderButton
              onClick={this.postUserInfo}
              isLoading={this.state.isLoading}
              // text={translate("signup").toUpperCase()}
              text='ثبت'
              type={"Oval"}
              className="mt-4 mb-4 button-class"
              buttonStyle={{ fontSize: 15, fontWeight: 'bold', }}
              width={20}
              height={20}
              color={'#000'}
            />
          </div>

          <div className="w-100 text-center">
            <button className="mb-3 text-color-2" onClick={() => this.props.lastStage()} style={{ fontSize: 13, }}>{translate('back-one-stage')}</button>
          </div>

        </div>
      </div>

    )
  }
}

export default LoginInfoStep;