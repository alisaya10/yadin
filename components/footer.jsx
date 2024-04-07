import React from "react";
import { languagesInfo, siteTheme } from "../variables/config";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../stores/actionsList";
import i18n from "../i18n";
import Link from "next/link";
import { checkTranslation } from "../utils/useful";
import Router, { withRouter } from 'next/router'
import Head from "next/head";

class Footer extends React.Component {
  state = {};
  componentDidMount() {

  }
  changeLanguage = (key, value) => {
    i18n.changeLanguage(value);
    this.closeBox();
  };
  makePath = () => {
    // setPathName(null)
    let path = window.location.pathname
    // console.log('098', path);
    // setPathName(path)
    Router.push("/login" + '?ref=' + path)

  }
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

  render() {
    return (
      <div className="main-footer" style={{ bottom: 0 }}>
        <div className="container">
          <div className="row m-0" style={{ display: "flex", justifyContent: "center" }}>
            <div className="col-lg-3 col-md-3 col-12 mt-5" style={{}}>
              <div>
                <Link href="/Guide-to-passing-courses">
                  <a className="footer-button">
                    <img src={"/images/icons/arrow-left.png"} style={{ width: "30px" }} />
                    راهنمای گذراندن یادین ها
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/about_us">
                  <a className="footer-button">
                    <img src={"/images/icons/arrow-left.png"} style={{ width: "30px" }} />
                    درباره ما
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/contactus">
                  <a className="footer-button">
                    <img src={"/images/icons/arrow-left.png"} style={{ width: "30px" }} />
                    ارتباط با ما
                  </a>
                </Link>
              </div>
              <div>

                <div className="mt-3">
                  <a className="" href="javascript:showZPTrust();" id="zarinpal">
                    <img src="https://cdn.zarinpal.com/badges/trustLogo/1.svg" border="0" alt="دروازه پرداخت معتبر"></img>
                  </a>
                </div>

                {/* <Head> */}
                <script src="https://www.zarinpal.com/webservice/TrustCode" type="text/javascript"></script>

                {/* </Head> */}


              </div>
              {/* <div>
                <Link href="/contact-us">
                  <a className="footer-button">
                    <img src={"/images/icons/namad1.png"} style={{ width: "50px" }} />
                  </a>
                </Link>
              </div> */}
            </div>
            <div className="d-flex flex-column m-0 flexcc w-50" style={{ paddingTop: "10px", }} >
              <img src={"/images/logo-footer.png"} style={{ width: 60 }} />
              <p className="footer-title">
                چرخ را از نو اختراع کن!
              </p>
              <p className="footer-description" style={{ maxWidth: "500px", lineHeight: 1.7 }}>
                یادگیری دیگه نیازمند کلاس نیست، بلکه سرعتش، مکانش، زمانش و محتواش باید توسط خود شما که بالغی و خودت رو خوب می‌شناسی مشخص بشه و به شما کمک کنه تا به جای اینکه با سرعت بالا اطلاعات کسب کنی، بخش‌های آموزشی کوچیک ببینی و سعی کنی با تعمق کردن روی اون‌ها، کامل یادشون بگیری. به امید اون زمان شکوهمندی که تو هم یه چرخی رو از نو اختراع می‌کنی. تا اون زمان، یادین همراهته
              </p>
            </div>
            <div className="col-lg-3 col-md-3 col-12 mt-5 mt-lg-5">
              <div className="footer-button-bigger">
                {/* <Link href="/social-media-title"> */}
                  {/* <a className="footer-button-bigger"> */}
                    با ما همراه شوید
                  {/* </a> */}
                {/* </Link> */}
              </div>
              <div style={{ marginTop: "10px" }}>
                <Link href="https://www.instagram.com/yaadin_com/">
                  <a className="footer-button">
                    <img src={"/images/icons/instagram.png"} style={{ width: "30px", paddingLeft: "5px" }} />
                    اینستاگرام
                  </a>
                </Link>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Link href="https://www.linkedin.com/company/yaadin/">
                  <a className="footer-button">
                    <img src={"/images/icons/linkedin.png"} style={{ width: "30px", paddingLeft: "5px" }} />
                    لینکدین
                  </a>
                </Link>
              </div>

              {/* <div className=" email-input px-1 py-2 mx-0.5 " style={{ marginTop: 20, }}>
                <button className="p-0">
                  <img src="/images/icons/sms.png" style={{ width: "25px", display: "flex", justifyContent: "center", }} />
                </button>
                <input type={"Text"} placeholder="آدرس ایمیل..." className="search-input"
                  style={{ width: '100%', color: "#fff", background: "transparent", border: "none", paddingRight: "5px" }} />
              </div>

              <div onClick={() => this.makePath()} className="subscription" style={{ marginTop: 20, }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <a style={{ display: "flex", flexWrap: "nowrap" }}>
                    عضویت در خبرنامه
                  </a>
                </div>
              </div> */}

            </div>
            <div>
              {/* <div className="flexc px-2 mt-4 d-none d-lg-block">
                {languagesInfo[this.props.settings.language] && (
                  <div className=" " style={{ position: "relative" }}>
                    <button
                      onClick={() => this.toggleLanguagesBox()}
                      className="flexcc language-but p-0"
                    >
                      <img
                        className=""
                        src={languagesInfo[this.props.settings.language].icon}
                        height="20px"
                        alt=""
                      />
                      <span
                        className=" mld-2"
                        style={{ color: siteTheme.themeColors.headerFont }}
                      >
                        {languagesInfo[this.props.settings.language].name}
                      </span>
                    </button>

                    {this.state.showLanguagesBox && (
                      <div
                        ref={(el) => (this.language_select_box = el)}
                        className="blur-back language-select-box fadein"
                      >
                        {Object.values(languagesInfo).map((prop, index) => {
                          return (
                            <button
                              key={index}
                              className={
                                " flexc language-select-option " +
                                (index !== 0 ? "mt-3" : "")
                              }
                              onClick={() =>
                                this.changeLanguage("language", prop.shortName)
                              }
                            >
                              unive
                              <img
                                className="mrd-2"
                                src={prop.icon}
                                alt={"language-" + prop.name}
                              />
                              <div>{prop.name}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div> */}
            </div>
          </div>
          <div className="copyright-bar container flexcc flex-column flex-md-row">
            <div>
              <p className="copyright-description">
                © {new Date().getFullYear()} Yaadin.com - All rights reserved
              </p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
