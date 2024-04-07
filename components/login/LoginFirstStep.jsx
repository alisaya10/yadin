import React from "react";
import LoaderButton from "../LoaderButton";
import FormViewer from "../FormViewer";
import { translate } from "../../utils/useful";
import { languagesInfo, siteTheme } from "../../variables/config";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import i18n from "i18next";

class LoginFirstStep extends React.Component {
  state = {
    key: "",
    selectedCountry: {},
    data: {},
    isLoading: false,
    formHeaders: [],
  };

  componentDidMount() {
    let formHeaders = [
      {
        key: "phone",
        type: "NumberInput",
        information: { autoFocus: true, placeholder: "{{lang}}phonenumber", required: true },
      },
    ];
    if (
      this.props.initData.indicatorType &&
      this.props.initData.indicatorType === "email"
    ) {
      formHeaders = [
        {
          key: "email",
          type: "EmailInput",
          information: { autoFocus: true, placeholder: "{{lang}}phonenumber", required: true },
        },
      ];
    }
    document.addEventListener("keydown", this._handleKeyDown);
    this.setState({ formHeaders });
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this._handleKeyDown);
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.postUserIndicator();
    }
  };

  postUserIndicator = () => {
    let data = this.form.getForm();
    console.log(data)
    if (data) {

      // data.phone = '0098'+data.phone

      this.setState({ isLoading: true, errors: {} });
      this.props.setData(data, () => {
        this.props.postUserIndicator((result, err) => {
          if (err) {
            this.setState({ errors: err });
          }
          this.setState({ isLoading: false });
        });
      });
    }
  };

  toggleLanguagesBox() {
    if (!this.state.showLanguagesBox) {
      document.addEventListener("mousedown", this.closeBox);
      this.setState({ showLanguagesBox: true });
    } else {
      this.closeBox();
    }
  }

  closeBox = (event) => {
    if (
      !event ||
      (this.language_select_box &&
        !this.language_select_box.contains(event.target))
    ) {
      document.removeEventListener("mousedown", this.closeBox);
      let box = document.querySelectorAll(".language-select-box");
      if (box) {
        box[0].classList.add("fadeout");
      }

      setTimeout(() => {
        this.setState({ showLanguagesBox: false });
      }, 400);
    }
  };

  changeLanguage = (key, value) => {
    i18n.changeLanguage(value);
    this.closeBox();
  };

  render() {
    return (
      <div className="flexcc px-4">
        {this.props.settings.mode === "forgotPassword" ? (
          <h2 className="mt-4 ">Forgot Password</h2>
        ) : (
          ""
        )}
        <div className="w-100" style={{ maxWidth: 350 }}>
          <div>
            <p className="text-color-2 pb-5 flexcc text-ultra-big">ورود</p>
          </div>
          <FormViewer
            ref={(el) => (this.form = el)}
            headers={this.state.formHeaders}
            initData={this.props.initData}
            errors={this.state.errors}
            inputClass={"modern-input"}
          />

          <div className="text-center">
            <LoaderButton
              onClick={this.postUserIndicator}
              isLoading={this.state.isLoading}
              text="مرحله بعد"
              type={"Oval"}
              className="mt-4 mb-3"
              buttonClassName="button-class"
              width={20}
              height={20}
              color={'#a0a0a0'}
            />
          </div>
        </div>



      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginFirstStep);
