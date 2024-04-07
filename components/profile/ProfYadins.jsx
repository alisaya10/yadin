import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import HttpServices from "../../utils/Http.services";
import { imageAddress } from "../../utils/useful";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";
class ProfYadins extends React.Component {

  state = {

    course: [
      {
        image: "/images/coursimage.png",
        title: "تیم سازی",
        users: "50",
        score: "4.5",
        personalMsg: "1",
        groupMsg: "3",
        practice: "2",
        quiz: "3"
      },

      {
        image: "/images/coursimage.png",
        title: "تیم سازی",
        users: "50",
        score: "4.5",
        personalMsg: "1",
        groupMsg: "3",
        practice: "2",
        quiz: "3"
      }
    ],

    data: [],
    info: {},
  }
  componentDidMount() {

    this.getTeacher()
    this.getUserCourses()

    // console.log('this is course info', this.props.course);




  }
  getTeacher = () => {

    if (this.props.user.info.status == 'teachers') {


      HttpServices.request('getTeacher', { id: this.props.user.info._id }, (fetchResult, fetchError) => {
        console.log(fetchResult);

        if (fetchError) {
          return console.log("fetch error", fetchError)
        }
        if (fetchResult) {
          console.info("id", fetchResult)
        }

        this.setState({ teacher: fetchResult.info, teacherCourses: fetchResult?.courses })

      })
    }

  }
  getUserCourses() {

    console.log("TP!")

    HttpServices.request('getUserCourses', {}, (fetchResult, fetchError) => {

      console.log('scsdccacsccs', fetchResult)
      console.log('00000000000000000', fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ userCourses: fetchResult.info })
    })


  }

  updateUserPassword = () => {
    let data = this.form.getForm();
    if (data) {
      this.setState({ isLoading: true, errors: {}, message: null });
      HttpService.request(
        "updateUserPassword",
        data,
        (fetchResult, fetchError) => {
          console.log(fetchError);
          this.setState({ isLoading: false });
          if (fetchError) {
            this.setState({ errors: fetchError.errors });
            this.props.addNotif({
              type: "error",
              title: "{{lang}}errors.profileNotUpdated",
              description: fetchError.message,
            });
            return;
          }
          this.props.addNotif({
            type: "success",
            title: "{{lang}}info.profileUpdated",
            description: "{{lang}}info.profileUpdatedSuccessfully",
          });
        }
      );
    }
  };

  render() {
    return (
      <>
        {this.props.user?.info?.status != 'teachers' ? (


          <Configurer
            settingsInfo={{
              headerTitle: "ProfYadins",
              button: { goBack: true },
            }}
            title={"Yadins"}
            description={"Yadins"}
            className=""
            style={{ padding: '0px 3% 0px 3%' }}
            changeOnUnmount={true}
          >


            <div className="container">

              <div className="box p-4 mt-4">
                <div className="row m-0">
                  <div className="col-12 col-lg-6 col-xl-3 flexc pb-2 pb-xl-0">
                    <img className="pl-3" src="/images/icons/video-play.svg" />
                    <p className="text-color-1 text-semibig">تعداد یادین: {this.state?.userCourses?.length}</p>
                  </div>

                  <div className="col-12 col-lg-6 col-xl-2 flexc text-center pb-2 pb-xl-0">
                    <img className="pl-3" src="/images/icons/message-2.svg" />
                    <p className="text-color-2">تعداد پیام جدید: ۳</p>
                  </div>

                  <div className="col-12 col-lg-6 col-xl-2 flexc text-center pb-2 pb-xl-0">
                    <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                    <p className="text-color-2">تعداد تمرین جدید: ۳</p>
                  </div>

                  <div className="col-12 col-lg-6 col-xl-2 flexc text-center pb-2 pb-xl-0">
                    <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                    <p className="text-color-2">تعداد آزمون جدید: ۳</p>
                  </div>

                  <div className="col-12 col-lg-6 col-xl-2 flexc text-center">
                    <img className="pl-3" src="/images/icons/profile-2user.svg" />
                    <p className="text-color-2">تعداد دانشجو: ۵۰</p>
                  </div>

                </div>
              </div>


              {Array.isArray(this.state.userCourses) && this.state?.userCourses.map((item, index) => {
                return (
                  <div className="box p-4">
                    <div className="row m-0">

                      <div className="col-12 col-lg-6 col-xl-3 flexcc" style={{ height: "fit-content" }}>
                        <img src={imageAddress(item?.course?.image, null, 'thumb')} style={{ objectFit: "contain" }} class=" radius-1 w-100 h-100" />
                      </div>

                      <div className="col-12 col-lg-6 col-xl-3 px-4" style={{ paddingRight: "70px" }}>
                        <div className="pt-3 pb-3 pb-lg-4 ">
                          <p className="text-color-1 text-semibig justify-content-start"> {item.course.title} </p>
                        </div>

                        <div className="flexc pb-3 py-lg-4">
                          <img style={{ marginLeft: 10 }} src="/images/icons/profile-2user.svg" />
                          <p className="text-color-2 text-start ">{item.course?.userCount} کاربر</p>
                        </div>

                        <div className="flexc py-lg-4">
                          <img style={{ marginLeft: 10 }} src="/images/icons/star-2.svg" />
                          <p className="text-color-2">امتیاز: {(item.course?.score).toFixed(1)}</p>
                        </div>
                      </div>


                      <div className="col-12 col-lg-12 col-xl-6">
                        <div className="p-0" style={{ justifyContent: "flex-end", width: "100%", display: "flex" }}>
                          <button>
                            <Link href={`/course/${item?.course._id}`}>
                              <a className="flexcc">
                                <p className="text-color-2 text-normal">صفحه دوره</p>
                                <img className="pr-2" src="/images/icons/arrow-left.svg" />
                              </a>
                            </Link>
                          </button>
                        </div>
                        <div className="row m-0 mt-5">
                          <div className="col-12 col-md-6 pb-4 pb-md-0">
                            <div className="box-1" style={{ borderLeft: "8px solid #AC8E68" }}>
                              <div className="flexcc">
                                <img className="pl-3" src="/images/icons/message-2.svg" />
                                <p className="text-color-2">{item.personalMsg} پیام شخصی جدید</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="box-1" style={{ borderLeft: "8px solid #AC8E68" }}>
                              <div className="flexcc">
                                <img className="pl-3" src="/images/icons/message-2.svg" />
                                <p className="text-color-2">{item.groupMsg} پیام گروهی جدید</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row m-0 my-4">
                          <div className="col-12 col-md-6 pb-4 pb-md-0">
                            <div className="box-1" style={{ borderLeft: "8px solid #40C8E0" }}>
                              <div className="flexcc">
                                <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                                <p className="text-color-2">{item.practice} تمرین جدید</p>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <div className="box-1" style={{ borderLeft: "8px solid #EA6C80" }}>
                              <div className="flexcc">
                                <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                                <p className="text-color-2">{item.quiz} آزمون جدید</p>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                )
              })}

            </div>

          </Configurer>
        ) : (

          <>
            <Configurer
              settingsInfo={{
                headerTitle: "ProfYadins",
                button: { goBack: true },
              }}
              title={"Yadins"}
              description={"Yadins"}
              className=""
              style={{ padding: '0px 3% 0px 3%' }}
              changeOnUnmount={true}
            >


              <div className="container">

                <div className="box p-4 mt-4">
                  <div className="row m-0">
                    <div className="col-12 col-lg-6 col-xl-3 flexc pb-2 pb-xl-0">
                      <img className="pl-3" src="/images/icons/video-play.svg" />
                      <p className="text-color-1 text-semibig">تعداد یادین: {this.state?.teacherCourses?.length}</p>
                    </div>

                    <div className="col-12 col-lg-6 col-xl-2 flexc text-center pb-2 pb-xl-0">
                      <img className="pl-3" src="/images/icons/message-2.svg" />
                      <p className="text-color-2">تعداد پیام جدید: ۳</p>
                    </div>

                    <div className="col-12 col-lg-6 col-xl-2 flexc text-center pb-2 pb-xl-0">
                      <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                      <p className="text-color-2">تعداد تمرین جدید: ۳</p>
                    </div>

                    <div className="col-12 col-lg-6 col-xl-2 flexc text-center pb-2 pb-xl-0">
                      <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                      <p className="text-color-2">تعداد آزمون جدید: ۳</p>
                    </div>

                    <div className="col-12 col-lg-6 col-xl-2 flexc text-center">
                      <img className="pl-3" style={{ marginLeft: 10 }} src="/images/icons/profile-2user.svg" />
                      <p className="text-color-2">تعداد دانشجو: ۵۰</p>
                    </div>

                  </div>
                </div>
                {console.log('this is course info', this.state.teacher)}

                {Array.isArray(this.state.teacherCourses) && this.state?.teacherCourses.map((item, index) => {
                  return (
                    <div className="box p-4">
                      {console.log("teacherCourse", this.state.teacherCourses)}
                      <div className="row m-0 flexc">
                        <div className="col-12 col-lg-6 col-xl-3 flexcc">
                          <img src={imageAddress(item.image, null, 'thumb')} class=" radius-1" style={{ maxWidth: 250 }} />
                        </div>

                        <div className="col-12 col-lg-6 col-xl-3 px-4" style={{ paddingRight: "70px" }}>
                          <div className="pt-3">
                            <p className="text-color-1 text-semibig justify-content-start"> {item.title} </p>
                          </div>

                          <div className="flexc pt-3 ">
                            <img style={{}} src="/images/icons/profile-2user.svg" />
                            <p className="text-color-2 text-start ">{item.userCount} کاربر</p>
                          </div>

                          <div className="flexc pt-3">
                            <img style={{}} src="/images/icons/star-2.svg" />
                            <p className="text-color-2 text-start">امتیاز: {item.course?.score}</p>
                          </div>
                        </div>


                        <div className="col-12 col-lg-12 col-xl-6">
                          <div className="row m-0 mt-5">
                            <div className="col-12 col-md-6 pb-4 pb-md-0">
                              <div className="box-1" style={{ borderLeft: "8px solid #AC8E68" }}>
                                <div className="flexcc">
                                  <img className="pl-3" src="/images/icons/message-2.svg" />
                                  <p className="text-color-2">{item.personalMsg} پیام شخصی جدید</p>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6">
                              <div className="box-1" style={{ borderLeft: "8px solid #AC8E68" }}>
                                <div className="flexcc">
                                  <img className="pl-3" src="/images/icons/message-2.svg" />
                                  <p className="text-color-2">{item.groupMsg} پیام گروهی جدید</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row m-0 my-4">
                            <div className="col-12 col-md-6 pb-4 pb-md-0">
                              <div className="box-1" style={{ borderLeft: "8px solid #40C8E0" }}>
                                <div className="flexcc">
                                  <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                                  <p className="text-color-2">{item.practice} تمرین جدید</p>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6">
                              <div className="box-1" style={{ borderLeft: "8px solid #EA6C80" }}>
                                <div className="flexcc">
                                  <img className="pl-3" src="/images/icons/clipboard-text-2.svg" />
                                  <p className="text-color-2">{item.quiz} آزمون جدید</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>

            </Configurer>
          </>



        )}
      </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfYadins));