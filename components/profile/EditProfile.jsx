import React from "react";
import Configurer from "../../components/Configurer";
import FormViewer from "../../components/FormViewer";
import LoaderButton from "../../components/LoaderButton";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";
import Edit from "./Edit";
import StagesManager from "../StagesManager";
import Edit2 from "./Edit2";

class EditProfile extends React.Component {

  state = {
    headers: [
      { key: 'image', type: 'ImageInput', information: { placeholder: 'عکس پروفایل', required: false } },
      { key: 'name', type: 'TextInput', information: { label: 'نام', icon: '/images/icons/profile.svg', placeholder: 'نام خود را وارد کنید.', required: true, inputClass: "'d-flex flexc modern-input" } },
      { key: 'phone', type: 'PhoneInput', information: { label: 'شماره موبایل', icon: '/images/icons/phone.svg', placeholder: 'شماره موبایل خود را وارد کنید.', disabled: true, required: true } },
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

    console.log(data)
    if (data) {
      this.setState({ isLoading: true })

      HttpServices.request("updateUserInfo", data, (fetchResult, fetchError) => {
        this.setState({ isLoading: false })
        if (fetchError) {
          this.setState({ errors: fetchError.errors })
          this.props.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
          return
        }
        this.setState({ errors: null })
        this.props.setUser(fetchResult.user, null, true)
        this.props.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })
      })
    }
  }

  changePage = (page) => {
    let path = "/profile/" + page;
    Router.push({ pathname: path });
  };

  render() {

    return (
      <>
        <Configurer
          settingsInfo={{ headerTitle: "Edit Profile", button: { goBack: true } }}
          title={"Edit Profile"}
          description={"This is the dashboard"}
          className="px-3"
          changeOnUnmount={true}
        // parentConfigure={this.props.parentConfigure??null}
        >



          <div className="container">
            <div className="flexcb w-100 mt-3">
              <div className="w-100">
                <p className="text-ultra-big font-bold white">ویرایش پروفایل</p>
              </div>
            </div>


            <StagesManager ref={(el) => (this.stageManager = el)}>

              <Edit
                stage={0}
                stageName={"settings"}
              />

              <Edit2
                stage={1}
                stageName={"edit"}
              />

            </StagesManager>

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
)(withRouter(EditProfile));

