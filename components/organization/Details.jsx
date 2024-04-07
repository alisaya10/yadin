import React from "react";
import Configurer from "../Configurer";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";
import moment from 'jalali-moment';
import Modal2 from "../Modal2";
import { checkTranslation } from "../../utils/useful";

// import * as XLSX from "xlsx";



class Details extends React.Component {

  state = {
    tab: -1,
    courses: [
      { title: "تعریف تیم", },
      { title: "مدیریت", },
    ],
    ListOfPeople: [
      { name: "اصغر اصغری", score: 20, date: "1402/02/02" },
      { name: "سارا خورشیدی", score: 20, date: "1402/02/02" },
      { name: "مینا جهانگرد", score: 20, date: "1402/02/02" },
      { name: "علی رضوی", score: 20, date: "1402/02/02" },
    ],
    sortList: [
      { key: 'newest', label: 'جدیدترین', filter: { uDate: -1 }, active: true },
      { key: 'oldest', label: 'قدیمی ترین', filter: { uDate: 1 } },
      { key: 'hprice', label: 'بالاترین قیمت', filter: { price: -1 } },
      { key: 'lprice', label: 'کمترین قیمت', filter: { price: 1 } },
    ],

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
  setTab = (course, index) => {
    let data
    // this.setState({ tab: index })
    // this.setState({ isLoading: true })

    HttpServices.request("getMyOrganizationUserscourseInfo", { org: this.props.orgUsersInfo?._id, course: course._id }, (fetchResult, fetchError) => {
      this.setState({ isLoading: false })
      if (fetchError) {
        this.setState({ tab: -1 })
        this.props.addNotif({ type: 'error', title: '{{lang}}errors.coursenotfound', description: fetchError.message })
        return
      }
      console.log('-------------------------------------', fetchResult);
      this.setState({ orgCourseInfo: fetchResult.info, tab: index })
    })
    this.sortModal.hideModal()

  }

  openSortModal = () => {
    this.sortModal.showModal()
  }

  // readExcel = (file) => {
  //  let promise = new Promise((resolve, reject) => {
  //     let fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file);

  //     fileReader.onload = (e) => {
  //       let bufferArray = e.target.result;

  //       let wb = XLSX.read(bufferArray, { type: "buffer" });

  //       let wsname = wb.SheetNames[0];

  //       let ws = wb.Sheets[wsname];

  //       let data = XLSX.utils.sheet_to_json(ws);

  //       resolve(data);
  //     }
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });

  //   promise.then((d) => {
  //     setItems(d);
  //   });
  // };

  render() {

    return (
      <>
        <div className="container">


          <div className="box p-3 mt-4">

            <div className="">

              <div className="flexcb">
                <div className="border-bottom-gray text-big font-bold pb-2" style={{ display: "inline-block" }}>
                  {console.log('object', this.props.orgUsersInfo)}
                  <p className="text-color-1">{this.props?.orgUsersInfo?.name}</p>
                </div>

                <div className="flexc">
                  <button onClick={() => { this.props.changeStage("organization") }} className="flexc">
                    <p className="text-color-2 pl-1">بازگشت</p>
                    <img src="/images/icons/arrow-left2.svg" />
                  </button>
                </div>
              </div>


              <div className="py-3">
                <button onClick={() => this.setState({ tab: -1 })}
                  className="normal-text-res px-3 py-2 ml-3"
                  style={{
                    border: this.state.tab == -1 ? "1px solid #e0e0e0" : "1px solid #a0a0a0", borderRadius: 10,
                    color: this.state.tab == -1 ? "#161616" : "#a0a0a0",
                    background: this.state.tab == -1 ? "#e0e0e0" : "transparent"
                  }}>
                  اطلاعات کلی گروه
                </button>

                <div className="d-none d-lg-block mt-3">
                  {this.props?.orgUsersInfo.learningPath?.course.map((item, index) => {
                    return (
                      // this.setState({ tab: index })
                      <button onClick={() => this.setTab(item, index)}
                        className="normal-text-res px-3 py-2 m-2"
                        style={{
                          border: this.state.tab == index ? "1px solid #e0e0e0" : "1px solid #a0a0a0", borderRadius: 10,
                          color: this.state.tab == index ? "#161616" : "#a0a0a0",
                          background: this.state.tab == index ? "#e0e0e0" : "transparent"
                        }}>
                        {item.title}
                      </button>
                    )
                  })}
                </div>

                {this.props?.orgUsersInfo.learningPath?.course && (
                  <button onClick={() => this.openSortModal()} className="flexcc d-lg-none p-1 mt-3" style={{
                    border: "1px solid #a0a0a0", borderRadius: 10,
                    color: "#a0a0a0",
                    background: "transparent"
                  }}>
                    <p className='normal-text-res px-2 py-1'>دوره ها</p>
                  </button>
                )}
              </div>
            </div>


            <div className="flexcb">
              <div className="pr-3">
                <p style={{ color: "#FF0D34" }}>expiration date</p>
              </div>

              {/* <div className="pl-2">
                <button onClick={() => (this.readExcel(this.state.ListOfPeople))}>
                  <img className="cursor-pointer" src="/images/icons/print.svg" />
                </button>
              </div> */}
            </div>


            {this.state.tab == -1 && (

              <div>

                <div className="row m-0 pt-3">
                  <div className="col-8 col-md-5 col-lg-3">
                    <div>
                      <p className="text-semibig text-color-1">نام شخص</p>
                    </div>
                  </div>
                  <div className="d-none d-md-flex justify-content-md-center col-md-4 col-lg-3">
                    <div>
                      <p className="text-semibig text-color-1">شماره تماس </p>
                    </div>
                  </div>


                  <div className="d-none d-lg-block col-lg-3 d-lg-flex justify-content-lg-center">
                    <div>
                      <p className="text-semibig text-color-1">تاریخ ثبت نام</p>
                    </div>
                  </div>


                  <div className="col-4 col-md-3 col-lg-3 d-flex justify-content-end">
                    <div>
                      <p className="text-semibig text-color-1 nowrap">میزان پیشرفت</p>
                    </div>
                  </div>
                </div>



                {this.props?.orgUsersInfo?.notSignedupUSer?.map((item, index) => {
                  return (
                    <div className="row m-0 pt-3 flexc pb-2" style={{ borderBottom: index == this.state.ListOfPeople.length - 1 ? "2px solid transparent" : "2px solid #262626" }}>
                      <div className="col-8 col-md-5 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.name}</p>
                        </div>
                      </div>
                      <div className="d-none d-md-flex justify-content-md-center col-md-4 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.phone}</p>
                        </div>
                      </div>


                      <div className="d-none d-lg-block col-lg-3 d-lg-flex justify-content-lg-center">
                        <div>
                          <p className="text-color-2 small-text-res">ثبت نام نکرده</p>
                        </div>
                      </div>


                      <div className="col-4 col-md-3 col-lg-3 d-flex justify-content-end">
                        <div>
                          <p className="text-color-2 small-text-res">0 درصد</p>
                        </div>
                      </div>
                    </div>
                  )
                })}


                {this.props?.orgUsersInfo?.organizationUsers?.map((item, index) => {
                  return (
                    <div className="row m-0 pt-3 flexc pb-2" style={{ borderBottom: index == this.state.ListOfPeople.length - 1 ? "2px solid transparent" : "2px solid #262626" }}>
                      <div className="col-8 col-md-5 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.name}</p>
                        </div>
                      </div>
                      <div className="d-none d-md-flex justify-content-md-center col-md-4 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.phone}</p>
                        </div>
                      </div>


                      <div className="d-none d-lg-block col-lg-3 d-lg-flex justify-content-lg-center">
                        <div>
                          <p className="text-color-2 small-text-res"> {moment(item.cDate).locale('fa').format(" jDD,  jMMM, jYYYY")}</p>
                        </div>
                      </div>


                      <div className="col-4 col-md-3 col-lg-3 d-flex justify-content-end">
                        <div>
                          <p className="text-color-2 small-text-res">{((item.passedUserCourses?.length ?? 0) / (item.userCourses?.length) * 100).toFixed(0)} درصد</p>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            )}


            {this.state.tab != -1 && (

              <div>

                <div className="row m-0 pt-3">
                  <div className="col-8 col-md-5 col-lg-3">
                    <div>
                      <p className="normal-text-res text-color-1">نام شخص</p>
                    </div>
                  </div>
                  <div className="d-none d-md-flex justify-content-md-center col-md-4 col-lg-3">
                    <div>
                      <p className="normal-text-res text-color-1">شماره تماس </p>
                    </div>
                  </div>


                  <div className="d-none d-lg-block col-lg-3 d-lg-flex justify-content-lg-center">
                    <div>
                      <p className="normal-text-res text-color-1">تاریخ انجام</p>
                    </div>
                  </div>


                  <div className="col-4 col-md-3 col-lg-3 d-flex justify-content-end">
                    <div>
                      <p className="normal-text-res text-color-1">نمره</p>
                    </div>
                  </div>
                </div>



                {Array.isArray(this.state?.orgCourseInfo?.organizationUsers) && this.state?.orgCourseInfo?.organizationUsers?.map((item, index) => {
                  return (
                    <div className="row m-0 pt-3 flexc pb-2" style={{ borderBottom: index == this.state.ListOfPeople.length - 1 ? "2px solid transparent" : "2px solid #262626" }}>
                      <div className="col-8 col-md-5 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.name}</p>
                        </div>
                      </div>
                      <div className="d-none d-md-flex justify-content-md-center col-md-4 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.phone}</p>
                        </div>
                      </div>


                      <div className="d-none d-lg-block col-lg-3 d-lg-flex justify-content-lg-center">
                        <div>
                          <p className="text-color-2 small-text-res">{moment(item.userCourse?.quizDate).locale('fa').format(" jDD,  jMMM, jYYYY")}</p>
                        </div>
                      </div>


                      <div className="col-4 col-md-3 col-lg-3 d-flex justify-content-end">
                        <div>
                          <p className="text-color-2 small-text-res">{item.userCourse?.score ?? 0}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {this.state?.orgCourseInfo?.notSignedupUSer?.map((item, index) => {
                  return (
                    <div className="row m-0 pt-3 flexc pb-2" style={{ borderBottom: index == this.state.ListOfPeople.length - 1 ? "2px solid transparent" : "2px solid #262626" }}>
                      <div className="col-8 col-md-5 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.name}</p>
                        </div>
                      </div>
                      <div className="d-none d-md-flex justify-content-md-center col-md-4 col-lg-3">
                        <div>
                          <p className="text-color-2 small-text-res">{item.phone}</p>
                        </div>
                      </div>


                      <div className="d-none d-lg-block col-lg-3 d-lg-flex justify-content-lg-center">
                        <div>
                          <p className="text-color-2 small-text-res">ثبت نام نکرده</p>
                        </div>
                      </div>


                      <div className="col-4 col-md-3 col-lg-3 d-flex justify-content-end">
                        <div>
                          <p className="text-color-2 small-text-res">0</p>
                        </div>
                      </div>
                    </div>
                  )
                })}


              </div>
            )}

          </div>
        </div>

        <Modal2 ref={el => this.sortModal = el} maxWidth={300}>
          <div className="flex-column flexcc" style={{ backgroundColor: '#202020', borderRadius: 15, padding: '20px 20px 20px 20px' }}>
            <p className="pb-3 weight-500" style={{ color: "#fff" }}>دوره ها</p>

            {this.props?.orgUsersInfo.learningPath?.course.map((item, index) => {
              return (
                <button onClick={() => this.setTab(item, index)}
                  className="px-4 py-2 my-2"
                  style={{
                    border: this.state.tab == index ? "1px solid #e0e0e0" : "1px solid #a0a0a0", borderRadius: 10,
                    color: this.state.tab == index ? "#161616" : "#a0a0a0",
                    background: this.state.tab == index ? "#e0e0e0" : "transparent"
                  }} key={index}>
                  <p>{item.title}</p>
                </button>
              )
            })}
          </div>
        </Modal2>
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
)(withRouter(Details));

