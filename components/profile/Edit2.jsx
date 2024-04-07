import React from "react";
import Configurer from "../Configurer";
import FormViewer from "../FormViewer";
import LoaderButton from "../LoaderButton";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";

class Edit2 extends React.Component {

  state = {
    headers: [
      { key: 'image', type: 'ProfileImageInput', theme: 'transparent', information: { label: null, placeholder: null , placeHolderImage: '', inputClass: 'none', required: false, cropper: true, ratio: '1:1', single: true } },
      { key: 'name', type: 'TextInput', information: { autoFocus: true, icon: '/images/icons/person.svg', placeholder: '{{lang}}insertName', required: true } },
      { key: 'family', type: 'TextInput', information: { icon: '/images/icons/person.svg', placeholder: '{{lang}}insertFamily', required: true } },
      { key: 'phone', type: 'PhoneInput', information: { distabled: true, label: 'شماره موبایل', icon: '/images/icons/phone.svg', placeholder: 'شماره موبایل خود را وارد کنید.', disabled: true, required: true } },
      { key: 'email', type: 'TextInput', information: { label: 'ایمیل', icon: '/images/icons/email.svg', placeholder: 'ایمیل خود را وارد کنید.' } },

      // { key: 'socialNumber', type: 'NumberInput', col: '6', information: { label: '{{lang}}socailNumber', maxLength: 10, icon: '/images/inputdef.svg', placeholder: '{{lang}}insert', required: false } },
      // { key: 'bankAccount', type: 'NumberInput', col: '6', information: { label: '{{lang}}socailNumber',maxLength:10, icon: '/images/inputdef.svg', placeholder: '{{lang}}insert', required: false } },

    ]
  }

  componentDidMount() {
    // console.log(this.props.user)
  }


  updateUserInfo = () => {
    let data = this.form.getForm()

    // console.log('ppppppppppdataaaaaa', data)
    if (data) {
      this.setState({ isLoading: true })

      HttpServices.request("updateUserInfo", data, (fetchResult, fetchError) => {
        this.setState({ isLoading: false })
        if (fetchError) {
          this.setState({ errors: fetchError.errors })
          // console.log('ppppppp', fetchError)
          // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
          return
        }
        this.setState({ errors: null })
        this.props.actions.setUser(fetchResult.user, null, true)
  
        // this.props.changeStage("settings") 
        Router.push('/profile');
        // this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })
      })
    }
  }

  render() {

    return (
      <>
        <Configurer
          settingsInfo={{ headerTitle: "Edit Profile", button: { goBack: true } }}
          title={"Edit Profile"}
          description={"This is the dashboard"}
          className="px-3"
          changeOnUnmount={true}
        >



          <div className="box px-3 mt-5 pb-3" style={{ maxWidth: "400px" }}>

            <div className="pt-3">
              <FormViewer ref={el => this.form = el} headers={this.state.headers} initData={this.props.user.info} errors={this.state.errors} inputClass={'modern-input'} formClass={"normalForm"} />
            </div>

            <div className="row m-0">

              <div className="text-center col-6">
                <LoaderButton
                  onClick={this.updateUserInfo}
                  isLoading={this.state.isLoading}
                  text={"ذخیره تغییرات"}
                  type={"Oval"}
                  className="mt-4 mb-4"
                  buttonClassName="btn-primary2"
                  buttonStyle={{ outline: 'none', maxWidth: 200 }}
                  width={40}
                  height={40}
                  color={'#C97EF5'}
                />
              </div>

              <div className="col-6 mt-4 mb-4" style={{}}>
                <button className="btn-primary5"
                  onClick={() => { this.props.changeStage("settings") }}>
                  انصراف
                </button>
              </div>
            </div>
          </div>





        </Configurer>
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  settings: state.settings,
  cart: state.cart,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit2));

