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
import Homework from "../../components/course/Homework";
import Wallet from "../../components/profile/Wallet";
import Link from "next/link";
import { withRouter } from "next/router";
import Router from "next/router";
import CourseContent from "../../components/course/CourseContent";
import CourseDashboard from "../../components/course/CourseDashboard";
import Notifications from "../../components/course/Notifications";
import CourseFiles from "../../components/course/CourseFiles";

class Profile extends React.Component {
  static async getInitialProps(context) {
    let params = context.query;

    return { query: params };
  }

  state = {
    pages: [
      {
        name: "{{lang}}dashboard-course",
        icon: "/images/icons/chart.svg",
        key: "",
        dontShowInDashboard: true,
      },
      {
        name: "{{lang}}course-content",
        icon: "/images/icons/play-cricle.svg",
        key: "content",
      },
      {
        name: "{{lang}}Lessons",
        icon: "/images/icons/save-2.svg",
        key: "Lessons",
      },
      {
        name: "{{lang}}notifications",
        icon: "/images/icons/notification.svg",
        key: "notifications",
      },
      {
        name: "{{lang}}connections",
        icon: "/images/icons/message.svg",
        key: "connections",
      },
      {
        name: "{{lang}}Exercises-tests-and-notes",
        icon: "/images/icons/clipboard-text.svg",
        key: "homework",
      },
      {
        name: "{{lang}}Course-files",
        icon: "/images/icons/folder-2.svg",
        key: "files",
      },
      {
        name: "{{lang}}profile",
        icon: "/images/icons/user.svg",
        key: "profile",
      },
    ],
  };
  
  componentDidMount() {
    this.checkDefaultTab();
    
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

  componentDidUpdate(newProps) { }

  checkDefaultTab() {
    let pages = this.state.pages;
    if (this.props.user?.info?.partner) {
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

        pages.splice(2, 0, products);
        this.setState({ pages });
      }
    }

    let def = "";

    let pathname = this.props.query?.slug;
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
        { oldPath: this.props.query?.slug, pageStatus: 200 },
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
            return (
              <Link href={"/profile/" + prop.key}>
                <a onClick={() => this.changePage(prop.key)} key={index} className={ "pageSideOption flexc  " + (prop.key == this.state.path ? "selected" : "")}>
                  <img src={prop.icon} width="25px" className="d-flex mrd-3" />
                  <p className="white">{checkTranslation(prop.name)}</p>
                </a>
              </Link>
            );})
          }
        </div>
        <div className="text-right d-flex py-3">
          <button onClick={() => this.logoutAlert()} className=" d-flex py-4 mt-1 mr-3 flexc pageSideOption flexc" >
            <img className="ml-3" style={{width:"25px"}} src="/images/icons/logout.svg"/>
            <p className="text-smaller text-bold text-uppercase text-color-2"> Log out </p>
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

            <div style={{paddingLeft:"50px"}} className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-10">
              <StagesManager ref={(el) => (this.stageManager = el)}>  
              
              
                <CourseDashboard 
                  pages={this.state.pages} 
                  stage={0} 
                  user={this.props.user} 
                  openMobileMenu={this.openMobileMenu} 
                  addNotif={this.addNotif} 
                  stageName={""} 
                />
                <EditProfile
                  pages={this.state.pages}
                  stage={1}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  setUser={this.setUser}
                  addNotif={this.addNotif}
                  stageName={"edit"}
                />
                <Financial
                  pages={this.state.pages}
                  stage={2}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"financial"}
                />
                <Homework
                  pages={this.state.pages}
                  stage={2}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"homework"}
                />
                <Notifications
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"notifications"}
                />
                <CourseContent 
                  pages={this.state.pages} 
                  stage={3} user={this.props.user} 
                  openMobileMenu={this.openMobileMenu} 
                  addNotif={this.addNotif} 
                  stageName={"content"}
                />
                <CourseFiles
                  pages={this.state.pages}
                  stage={3}
                  user={this.props.user}
                  openMobileMenu={this.openMobileMenu}
                  stageName={"files"}
                />
              
              </StagesManager>
            </div>
          </div>
        </PageStatusViewer>

        <Modal maxWidth={350} ref={(el) => (this.logoutModal = el)}>
          <div className="text-center bg-text-color-1 p-5 radius-2">

            <p className="text-big text-semibig">خروج از حساب کاربری</p>
            <p className="text-small">مطمعن هستید میخواهید خارج شوید؟</p>

            <div className="flexcc mt-3">
              <button
                onClick={() => this.logout()}
                className="px-4 py-2 text-bold text-small btn-primary3" style={{whiteSpace:"nowrap"}}>
                <p>بله خارج میشوم</p>
              </button>
              <button
                onClick={() => this.logoutModal.hideModal()}
                className="px-4 py-2 text-small" style={{whiteSpace:"nowrap"}}>
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
