import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Configurer from "../../components/Configurer";
import Dashboard from "../../components/profile/Dashboard";
import StagesManager from "../../components/StagesManager";
import {
  checkTranslation,
  getToken,
  imageAddress,
  pathMaker,
} from "../../utils/useful";
import EditProfile from "../../components/profile/EditProfile";
import Cookies from "universal-cookie";
import PageStatusViewer from "../../components/PageStatusViewer";
import ChangePasword from "../../components/profile/ChangePasword";
import Financial from "../../components/profile/Financial";
import Modal from "../../components/Modal1";
import Wallet from "../../components/profile/Wallet";
import Link from "next/link";
import { withRouter } from "next/router";
import Router from "next/router";
import Notes from "../../components/profile/Notes";
// import QuizesAndPractices from "../../components/profile/QuizesAndPractices";
import Notifications from "../../components/profile/Notifications";
import Favorites from "../../components/profile/Favorites"
import ProfileDashboard from "../../components/profile/ProfileDashboard";
import Courses from "../../components/profile/Courses";
import ProfYadins from "../../components/profile/ProfYadins";
import Yadins from "../../components/profile/Yadins";
import ProfFinancial from "../../components/profile/ProfFinancial";
import ProfSupport from "../../components/profile/ProfSupport"
import CourseContent from "../../components/course/CourseContent";
import Certificates from "../../components/profile/Certificates";
import OrganizationDashboard from "../../components/organization/OrganizationDashboard";

class Profile extends React.Component {
  static async getInitialProps(context) {
    let params = context.query;

    return { query: params };
  }

  state = {
    pages: [
      {
        name: "پنل سازمانی",
        icon: "/images/icons/organ2.png",
        key: "organization",
      },
      {
        name: "داشبورد",
        icon: "/images/icons/chart.svg",
        key: "",
        dontShowInDashboard: true,
      },
      {
        name: "مسیر یادگیری",
        icon: "/images/icons/routing1.svg",
        key: "courses",
      },
      {
        name: "یادگیره‌ها",
        icon: "/images/icons/save-2.svg",
        key: "notes",
      },
      {
        name: "علاقه‌مندی‌ها",
        icon: "/images/icons/heart2.svg",
        key: "favorites",
      },
      // {
      //   name: "اعلان‌ها",
      //   icon: "/images/icons/notification.svg",
      //   key: "notifications",
      // },
      {
        name: "یادنامه‌ها",
        icon: "/images/icons/verify.svg",
        icon2: "/images/verify.svg",
        key: "certificates",
      },
      {
        name: "گزارشات مالی",
        icon: "/images/icons/card.svg",
        key: "financial",
      },
      {
        name: "کیف پول",
        icon: "/images/icons/card.svg",
        key: "wallet",
        hideInList: true
      },
      {
        name: "تنظیمات حساب",
        icon: "/images/icons/setting-2.svg",
        key: "settings",
      },
      {
        name: "یادین ها",
        icon: "/images/icons/notification.svg",
        key: "yadins",
      },
      {
        name: "یادین های استاد",
        icon: "/images/icons/notification.svg",
        key: "prof-yadins",
      },
      {
        name: "گزارشات مالی استاد",
        icon: "/images/icons/notification.svg",
        key: "prof-financial",
      },
      {
        name: "پشتیبانی",
        icon: "/images/icons/notification.svg",
        key: "prof-support",
      },
    ],
  };

  componentDidMount() {
    this.checkDefaultTab();
    console.log('firsttppp', this.props.user?.info)
    // let token = getToken()
    // if (token) {
    //     this.setState({ isLoading: true })
    //     this.waitForId(10)
    // } else {
    //     this.setState({ pageStatus: 401 })
    // }
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  waitForId = (leftAttempt) => {
    if (this.props.user?.info?._id) {
      this.setState({ isLoading: false }, () => {
        this.checkDefaultTab();
      });
    } else {
      setTimeout(() => {
        if (leftAttempt != 0) {
          this.waitForId(leftAttempt - 1);
        } else {
          this.setState({ pageStatus: 401 });
        }
      }, 500);
    }
  };

  componentDidUpdate(prevProps) {
    console.log(this.state.oldPath)
    if (this.state.oldPath && this.state.oldPath != Router.query?.slug) {
      if (this.props.user?.info) {
        this.setState({ oldPath: Router.query?.slug }, () => {
          this.checkDefaultTab()
        })
      }
    }

  }

  checkDefaultTab() {
    let pages = this.state.pages;
    if (this.props.user?.info?.status != 'teachers') {
      let found = false;
      pages.forEach((element) => {
        if (element.key == "Dashboard") {
          found = true;
        }
      });
      if (!found) {
        let products = {
          name: "{{lang}}Products",
          icon: "/images/delivery-box.png",
          key: "Dashboard",
        };

      }
      pages.splice(10, 3);
      this.setState({ pages });
    }

    let def = "";

    let pathname = Router.query?.slug;
    console.log(pathname);
    def = pathname;
    let pageIsValid = false;

    pages.forEach((tab) => {
      if (tab.key.toLowerCase() === def?.toLowerCase()) {
        pageIsValid = true;
      }
    });
    if (!def) {
      def = "";
    }
    if (pageIsValid || def === "") {
      this.setState(
        { oldPath: Router.query?.slug, pageStatus: 200 },
        () => {
          this.setState({ path: def }, () => {
            this.stageManager.changeStage(def, () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
          });
        }
      );
    } else {
      this.setState({ pageStatus: 404 });
    }
  }

  changePage = (page) => {
    let path = "/profile/" + page;
    Router.push({ pathname: path });
    if (this.mobileMenuModal) {
      this.mobileMenuModal.hideModal();
    }

  };

  setUser = (data) => {
    this.props.actions.setUser(data, null, true);
  };

  addNotif = (options) => {
    this.props.actions.addNotif(options);
  };

  logoutAlert = () => {
    this.logoutModal.showModal();
  };

  logout = () => {
    this.props.actions.logoutUser();
    this.props.history.push(pathMaker("/"));
    this.logoutModal.hideModal();
  };

  openMobileMenu = () => {
    this.mobileMenuModal.showModal();
  };

  showMenu() {
    return (

      <div className="pt-5 pb-5 bg-gray-color-3 radius-1">
        <div className="pr-3">
          {this.state.pages.map((prop, index) => {
            {
              if (prop.hideInList !== true) {

                return (
                  <Link href={"/profile/" + prop.key}>
                    <a onClick={() => this.changePage(prop.key)} key={index} className={"pageSideOption flexc position-relative " + (prop.key == this.state.path ? "selected" : "")}>
                      <img src={prop.key == "certificates" && this.state.path == "certificates" ? prop.icon2 : prop.icon} width="25px" className="d-flex mrd-3" />
                      <p className="white">{checkTranslation(prop.name)}</p>
                    </a>
                  </Link>

                );
              }
            }
          })
          }
        </div>
        <div className="text-right d-flex py-3">
          <button onClick={() => this.logoutAlert()} className=" d-flex py-4 mt-1 mr-3 flexc pageSideOption flexc" >
            <img className="ml-3" style={{ width: "25px" }} src="/images/icons/logout.svg" />
            <p className="text-color-2">خروج از حساب</p>
          </button>
        </div>

      </div>
    );
  }

  render() {
    return (
      <Configurer
        settingsInfo={{
          showFooter: true,
          showTabBar: true,
          showHeader: true,
          headerTitle: "Profile",
          button: {},
        }}
        title={"Profile"}
        description={"Profile Description"}
        className="p-0 min-full-height "
        ref={(el) => (this.configurer = el)}
      >
        <PageStatusViewer status={this.state.pageStatus} query={this.props.query}>
          <div className="row m-0">
            <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-2 pageSide px-0 d-md-block d-none">
              {this.showMenu()}
            </div>

            <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
              <StagesManager ref={(el) => (this.stageManager = el)}>


                <OrganizationDashboard
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"organization"}
                />

                <ProfileDashboard
                  pages={this.state.pages}
                  stage={0}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  setUser={this.setUser}
                  addNotif={this.addNotif}
                  stageName={""}
                />
                <CourseContent
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"content"}
                />
                <Notes
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"notes"}
                />
                <Notifications
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"notifications"}
                />
                <Courses
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"courses"}
                />
                <Financial
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"financial"}
                />
                <Wallet
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"wallet"}
                />

                <Favorites
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"favorites"}
                />
                <EditProfile
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"settings"}
                />

                <Certificates
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"certificates"}
                />
                <Yadins
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"yadins"}
                />

                <ProfYadins
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"prof-yadins"}
                />
                {/* {this.props.user.teacher && ( */}
                <ProfFinancial
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"prof-financial"}
                />
                {/* )} */}
                {/* {this.props.user.teacher && ( */}

                <ProfSupport
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"prof-support"}
                />
                {/* )} */}

              </StagesManager>
            </div>
          </div>
        </PageStatusViewer>

        <Modal maxWidth={350} ref={(el) => (this.logoutModal = el)}>
          <div className="text-center bg-gray-color-1 p-5 radius-2">

            <p className="text-big text-color-1 text-semibig">خروج از حساب کاربری</p>
            <p className="text-small pt-3 text-color-2">مطمعن هستید میخواهید خارج شوید؟</p>

            <div className="flexcc mt-3">
              <button
                onClick={() => this.logout()}
                className="px-4 py-2 text-bold text-small btn-primary3" style={{ whiteSpace: "nowrap", border: "none" }}>
                <p>بله خارج میشوم</p>
              </button>
              <button
                onClick={() => this.logoutModal.hideModal()}
                className="px-4 py-2 text-small text-color-2" style={{ whiteSpace: "nowrap" }}>
                خیر خارج نشوم
              </button>
            </div>
          </div>
        </Modal>

        <Modal ref={(el) => (this.mobileMenuModal = el)} maxWidth={300}>
          <div className="pageSide gray-color-3">
            {this.showMenu()}
          </div>
        </Modal>
      </Configurer>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
