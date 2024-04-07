import React from "react";
import Configurer from "../Configurer";
import FormViewer from "../FormViewer";
import LoaderButton from "../LoaderButton";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";
import { imageAddress } from "../../utils/useful";
import { translate } from "../../utils/useful";
import ImageModal from "../modals/ImageModal";



class Edit extends React.Component {

  state = {
    headers: [
      // { key: 'email', type: 'SwitchInput', information: { label: 'دریافت ایمیل برای اعلان ها'} },
      { key: 'name', type: 'SelectListInput', information: { label: 'دریافت ایمیل', type: "local" } },
      { key: 'usecases', type: 'SelectListInput', information: { label: '{{lang}}Usecases', type: 'local', items: [], sort: { name: -1 }, searchable: false, placeholder: '{{lang}}insert', required: true } },

      // { key: 'phone', type: 'PhoneInput', information: { label: 'شماره موبایل', icon: '/images/icons/phone.svg', placeholder: 'شماره موبایل خود را وارد کنید.', disabled: true, required: true } },

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

  editImageModal = () => {
    this.ImageModal.showModal()
  }

  render() {

    return (
      <>




        <div className="box px-3 py-3" style={{ maxWidth: "300px" }}>
          <div className="flex-column h-100 flexcc">
            <div className="flexcc flex-column flex-1">

              <div className="position-relative">
                {/* <div> */}
                <img src={imageAddress(this.props.user?.info.image, 'profile', 'thumb')} style={{ height: 140, width: 140, borderRadius: "50%" }} />
                {/* </div> */}
                <div className="position-absolute flexcc" style={{ top: "90%", left: "50%", transform: "translate(-50%, -50%)", background: "#181818", borderRadius: "50%", width: "30px", height: "30px" }}>
                  <button className="flexcc" onClick={() => this.editImageModal()}>
                    <img src="/images/edit.svg" />
                  </button>
                </div>
              </div>
              <div className="flex-column flexcc">
                <p className="text-color-2 pt-3 pb-1">کاربر از {this.props.user?.cdate}</p>
                <p className="text-color-2 py-1">{this.props.user?.info.fullname}</p>
                <p className="text-color-2 text-small py-1">{translate(this.props.user?.info.status)}</p>
                <p className="text-color-2 py-1">{this.props.user?.info.phone}</p>
                <p className="text-color-2 py-1">{this.props.user?.info.email}</p>
              </div>

              <div className="py-2">
                <FormViewer ref={el => this.form = el} headers={this.state.headers} initData={this.props.user.info} errors={this.state.errors} inputClass={'modern-input'} formClass={"normalForm"} />
              </div>
            </div>


            <div className="">
              <LoaderButton
                onClick={() => { this.props.changeStage("edit") }}
                isLoading={this.state.isLoading}
                text={"ویرایش اطلاعات کاربری"}
                type={"Oval"}
                className="mt-4"
                buttonClassName="btn-primary5"
                buttonStyle={{ outline: 'none', }}
                width={40}
                height={40}
                color={'#C97EF5'}
              />
            </div>
          </div>

          <div>
          </div>
        </div>


        <ImageModal ref={el => this.ImageModal = el} data={this.props?.user?.info} />



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
)(withRouter(Edit));

