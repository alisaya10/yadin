import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import HttpServices from "../../utils/Http.services";
import { imageAddress } from "../../utils/useful";
import Collapsible from 'react-collapsible';
import Router from "next/router";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

class Homework extends React.Component {

  state = {
    filesOpenStatus: {},
    exams: [
      { title: "تمرین شماره 1 : ", type: "اسنک 2", description: "نحوه پیدا کردن فرد مناسب تیم", score: "10/-" },
      // { title: "آزمون شماره 2 : ", type: "اسنک 3", description:"نحوه پیدا کردن فرد مناسب تیم", score:"10/-"},
      // { title: "تمرین شماره 3 : ", type: "اسنک 5", description:"نحوه پیدا کردن فرد مناسب تیم", score:"10/-"},
      // { title: "آزمون شماره 4 : ", type: "اسنک 6", description:"نحوه پیدا کردن فرد مناسب تیم", score:"10/-"},
      // { title: "تمرین شماره 2 : ", type: "اسنک 8", description:"نحوه پیدا کردن فرد مناسب تیم", score:"10/-"},
    ],
    data: [],
    info: {}
  }
  componentDidMount() {
    let id = Router.query.id
    this.setState({ id }, () => {
      HttpServices.request('getPractices', { filter: { course: this.state.id } }, (fetchResult, fetchError) => {

        // console.log(fetchResult)
        console.log(fetchError)

        if (fetchError) {
          return
        }
        console.info(fetchResult)
        this.setState({ practices: fetchResult.info },()=>{
          // console.log('ppppppppppppppppp',this.state.practices);
        })
      })

      HttpServices.request('getQuizes', { filter: { course: this.state.id } }, (fetchResult, fetchError) => {

        console.log(fetchResult)
        console.log(fetchError)

        if (fetchError) {
          return
        }
        console.log(fetchResult)
        this.setState({ quizes: fetchResult.info })
      })
      this.getUserPractices()
      this.getUserQuizes()
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

  changeOpenStatus = (item, index) => {
    let filesOpenStatus = this.state.filesOpenStatus

    filesOpenStatus[index] = !filesOpenStatus[index]

    console.log(filesOpenStatus)
    this.setState({ filesOpenStatus })
  }

  getUserQuizes = () => {
    HttpServices.request('getUserQuizes', { filter: { course: this.state.id } }, (fetchResult, fetchError) => {
      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ userQuizes: fetchResult.info })
    })
  }

  getUserPractices = () => {
    HttpServices.request('getUserPractices', { filter: { course: this.state.id } }, (fetchResult, fetchError) => {
      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ userQuizes: fetchResult.info })
    })
  }

  render() {
    let exams = this.state.exams;

    return (
      <Configurer
        settingsInfo={{
          headerTitle: "homework",
          button: { goBack: true },
        }}
        title={"homework"}
        description={"homework"}
        className=""
        style={{ padding: '0px 3% 0px 3%' }}
        changeOnUnmount={true}
      >

        <div className="container">

          <div className="flexc mt-3 d-md-none">
            <div className="">
              <button onClick={() => this.props.openMobileMenu()} className="flexcc">
                <img className=" " src="/images/icons/menu-3.svg" alt="" />
              </button>
            </div>
            <div>
              <p className="white">تمارین و آزمون ها</p>
            </div>
          </div>

          <div className="row m-0">
            <div className="box col-12 col-md-8 p-0">
              <div className="px-3 py-3 mb-3 ">
                <p className="pb-2 border-bottom-gray text-color-1 text-semibig" >نمرات تمارین</p>

                {/* <div className="row m-0 "> */}
                <div className="p-0">
                  <p className="text-color-2 pt-3">نمره ای برای نمایش وجود ندارد.</p>
                </div>
                {/* </div> */}
              </div>
            </div>

            {this.props.userCourse?.score ? (

              <div className="col-12 col-md-4 pr-0 pr-md-3 pl-0">
                <div className="box px-3 pb-3">
                  <p className="pt-3 pb-2 border-bottom-gray text-color-1 text-semibig font-light" >نمره آزمون</p>
                  <div className="text-color-2 ">
                    <p className="py-3">{this.props.userCourse?.score}</p>
                  </div>
                  <div className="flexcc">
                    <button className="flexcc btn-primary7 mt-3" style={{ maxWidth: "200px" }}>
                      <Link href="/">
                        <a className="flexcc">
                          درخواست یادنامه
                          <img className="pr-1 " src="/images/icons/verify.svg" />
                        </a>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ) : (

              <div className="col-12 col-md-4 pr-0 pr-md-3 pl-0">
                <div className="box px-3 pb-3">
                  <p className="pt-3 pb-2 border-bottom-gray text-color-1 text-semibig font-light" >نمره آزمون</p>
                  <div className="text-color-2 ">
                    <p className="py-3">هنوز آزمون نداده اید.</p>
                  </div>
                  {/* <div className="flexcc">
                    <button className="flexcc btn-primary7 mt-3" style={{ maxWidth: "200px" }}>
                      <Link href="/">
                        <a className="flexcc">
                          درخواست یادنامه
                          <img className="pr-1 " src="/images/icons/verify.svg" />
                        </a>
                      </Link>
                    </button>
                  </div> */}
                </div>
              </div>
            )}
          </div>


          <div className="box px-3 mb-3 pb-3">
            <div className="border-bottom-gray">
              <div className="row m-0">
                <div className="col-7 col-xl-7 py-3">
                  <p className="text-color-1 text-semibig">عنوان</p>
                </div>
                <div className="d-none d-xl-block col-xl-2 py-3">
                  <p className="text-color-1 text-semibig">ارتباط</p>
                </div>
                {/* <div className="d-none d-xl-block col-xl-2 py-3">
                  <p className="text-color-1 text-semibig">نمره</p>
                </div> */}
                <div className="col-xl-2">
                  <p></p>
                </div>
              </div>
            </div>

            <div style={{ borderBottom: '1px solid #eee' }}>
              {this.state.practices?.map((item, index) => {
                return (
                  <div className="row m-0 py-3 flexc">
                    <div className="col-7 col-xl-7 text-color-2">
                      <p className="">{item.title}</p>
                    </div>
                    <div className="d-none d-xl-block col-xl-3 text-color-2">
                      <p>{item.lesson.title}</p>
                    </div>
                    {/* <div className="d-none d-xl-block col-xl-2  text-color-2">
                      <p className="">{item.score}</p>
                    </div> */}
                    <div className="col-5 col-xl-2">
                      {(!item.locked || this.props.user.info.status == "admins" ) && (

                        <button className="btn-primary5 text-color-2 flexcc" style={{ maxWidth: "170px" }}>
                          <Link href={'/practice/' + item?._id} >
                            <a className="">مشاهده جزئیات</a>
                          </Link>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="">
              <div>
                <div>
                  <div>
                    {this.state.quizes?.map((item, index) => {
                      return (
                        <div className="row m-0 py-3 flexc">
                          <div className="col-7 col-xl-6 text-color-2" style={{ fontSize: 18, color: '#eee' }}>
                            <p className="">{item.title}</p>
                          </div>

                          <div className="d-none d-xl-block col-xl-2 text-color-2 " style={{ fontSize: 18, color: '#eee' }}>
                            <p>{item.course?.title}</p>
                          </div>
                          <div className="d-none d-xl-block col-xl-2  text-color-2 " style={{ fontSize: 18, color: '#eee' }}>
                            <p className="">{this.props.userCourse?.score ?? 'آزمون نداده اید'}</p>
                          </div>
                          <div className="col-5 col-xl-2">


                            <button className="btn-primary5 text-color-2 flexcc " style={{ maxWidth: "170px", fontSize: 18, color: '#eee' }}>
                              <Link href={'/quiz/' + item?._id}>
                                <a className="">مشاهده جزئیات</a>
                              </Link>
                            </button>

                            {/* <button onClick={() => this.changeOpenStatus(item, index)} className="btn-primary5 text-color-2 text-normal flexcc" style={{ maxWidth: "150px" }}>
                              <img src="/images/icons/arrow-down.svg" className={"ml-2 transition-all  white " + (this.state.filesOpenStatus[index] ? 'rotate-180' : '')} />
                              <p className="nowrap">مشاهده جزئیات</p>
                            </button> */}

                          </div>
                          {/* <Collapsible open={this.state.filesOpenStatus[index]}>
                            <div className="py-5">
                              <div className="box-1 flexcc" style={{ maxWidth: "70%", margin: '0 auto' }}>
                                {item.files && item.files.length > 0 && item.files.map((file, index) => {
                                  return (
                                    <div className="flexcb mx-3">
                                      <button className=" btn-primary5 main-color-1 text-normal my-2 px-3 notification-text" style={{ maxWidth: "200px" }}>
                                        <a className="" href={(file ? imageAddress(file) : '#')} target="_blank">
                                          دریافت فایل {index + 1}
                                        </a>
                                      </button>
                                    </div>
                                  )
                                })}

                              </div>
                            </div>
                          </Collapsible> */}

                        </div>
                      );
                    })}


                  </div>
                </div>
              </div>
            </div>



          </div>
          {/* <div className="box px-3 mb-3 pb-3">
            <div className="border-bottom-gray">
              <div className="row m-0">
                <div className="col-6 col-xl-6 py-3">
                  <p className="text-color-1 text-semibig">عنوان</p>
                </div>
                <div className="d-none d-xl-block col-xl-2 py-3">
                  <p className="text-color-1 text-semibig">ارتباط</p>
                </div>
                <div className="d-none d-xl-block col-xl-2 py-3">
                  <p className="text-color-1 text-semibig">نمره</p>
                </div>
                <div className="col-xl-2">
                  <p></p>
                </div>
              </div>
            </div>

            <div className="">
              <div>
                <div>
                  <div>
                    {this.state.practices?.map((item, index) => {
                      return (
                        <div className="row m-0 py-3 flexc">
                          <div className="col-7 col-xl-6 text-color-2">
                            <p className="">{item.title} {item.body}</p>
                          </div>
                          <div className="d-none d-xl-block col-xl-2 text-color-2">
                            <p>{item.type}</p>
                          </div>
                          <div className="d-none d-xl-block col-xl-2  text-color-2">
                            <p className="">{item.score}</p>
                          </div>
                          <div className="col-5 col-xl-2">



                            <button className="btn-primary5 text-color-2 flexcc" style={{ maxWidth: "170px" }}>
                              <Link href={'/quiz/' + item?._id} >
                                <a className="">مشاهده جزئیات</a>
                              </Link>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div> */}
        </div>


      </Configurer>
    );
  }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Homework);
