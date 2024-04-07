import React from "react";
import Configurer from "../Configurer";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../stores/actionsList";
import Router, { useRouter, withRouter } from "next/router";


class OrganizationDashboard extends React.Component {

  state = {
    openDropDown: {},
    organ: [
      { title: "آب و فاضلاب", courseNum: 3, employee: 20 },
      { title: "برق", courseNum: 5, employee: 10 },
      { title: "راه و ترابری", courseNum: 1, employee: 30 },
    ]
  }

  componentDidMount() {
    // console.log(this.props.user)
    this.getMyOrganizationInfo()
  }

  // updateUserInfo = () => {
  //   let data = this.form.getForm()

  //   console.log(data)
  //   if (data) {
  //     this.setState({ isLoading: true })

  //     HttpServices.request("updateUserInfo", data, (fetchResult, fetchError) => {
  //       this.setState({ isLoading: false })
  //       if (fetchError) {
  //         this.setState({ errors: fetchError.errors })
  //         this.props.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
  //         return
  //       }
  //       this.setState({ errors: null })
  //       this.props.setUser(fetchResult.user, null, true)
  //       this.props.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })
  //     })
  //   }
  // }
  getMyOrganizationInfo() {
    // console.log(this.state.id)
    HttpServices.request('getMyOrganizationInfo', {}, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        organizations: fetchResult?.info
      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  goToLearningPath(orgInfo) {
    this.props.getOneOrganizationGroup(orgInfo)
    this.props.changeStage("learning-path")
  }
  goToUserLearningPath(orgInfo) {
    this.props.getOrgUserLearningPath(orgInfo)
    this.props.changeStage("user-learning-path")
  }
  goToDetails(orgInfo) {
    this.props.getMyOrganizationUsersInfo(orgInfo)
    this.props.changeStage("details")
  }
  // changeDropDown=(index)=>{

  //  let openDropDown = this.state.openDropDown ?? {}
  //  openDropDown[index] = !openDropDown[index]
  //  this.setState({openDropDown })
  // }




  render() {

    return (
      <>
        <div className="container">

          {this.state.organizations?.orgOwner?.length == 0 && this.state.organizations?.orgUser?.length == 0 && (
            <div className="flexcc">
              <div className="box-1 p-4 mt-5" style={{ maxWidth: 600 }}>
                <div className="pb-2">
                  <p className="text-semibig white font-bold text-center">
                    وقتی که همه سازمان با هم رشد می کنند
                    </p>
                </div>
                <div style={{lineHeight: 3}}>

                  <p className="text-color-2 text-small">
                    ۱. در این بخش، سازمان می تواند دورهای آموزشی مورد نیاز پرنسل خود را برایشان تعریف بکند.
                  </p>
                  <p className="text-color-2 text-small">
                    ۲. دوره ها در قالب مسیر یادگیری، در پنل شخصی کارکنان سازمان قرار می گیرد.
                    مسیر یادیگیری می تواند برای تمامی اعضاء، مختص یک واحد و یا حتی یک شخص طراحی بشود.
                  </p>
                  <p className="text-color-2 text-small">
                    ۳. روند آموزشی فرد به فرد کارکنان توسط سازمان قابل مانیتورینگ و پیگیری است.
                  </p>
                  <p className="text-color-2 text-small">
                    ۴. کارکنانی که مسیر یادگیری خود را طی می کنند می توانند مورد تشویق قرار بگیرند.
                    پس از هر اسنک، یک آزمون تستی گرفته میشود و در نهایت معدل تمامی اسنک ها، نمره ی سرتیفکیت شخص را تشکیل میدهد.
                  </p>


                  <p className="text-semibig text-bold text-color-1" style={{ lineHeight: 1.9 }}>
                    «پنل سازمانی امکان رشد و توسعه ی هوشمندانه ی سرمایه های انسانی سازمان را فراهم می کند.»
                  </p>
                </div>
              </div>
            </div>
          )}




          {this.state.organizations?.orgOwner?.length > 0 && (
            <>
              <div className="pt-3">
                <p className="text-color-2 text-semibig">گروه های تحت سرپرستی شما</p>
              </div>
              <div className="box p-3 mt-4">
                <div>

                  <div className="row m-0 pt-3  pb-2">
                    <div className="col-3 col-xl-2">
                      <div>
                        <p className="text-color-2 font-bold">اسم گروه</p>
                      </div>
                    </div>
                    <div className="col-3 col-xl-2 d-flex justify-content-center" style={{ display: "inline-block" }}>
                      <p className="text-color-2 font-bold">اسم سازمان</p>
                    </div>

                    <div className="col-3 col-xl-2 d-flex justify-content-center">
                      <div>
                        <p className="text-color-2 font-bold">تعداد دوره</p>
                      </div>
                    </div>

                    <div className="col-3 col-xl-2 d-flex justify-content-center">
                      <div>
                        <p className="text-color-2 font-bold">تعداد پرسنل</p>
                      </div>
                    </div>

                    <div className="col-12 col-xl-4 justify-content-end d-flex d-none d-xl-flex">
                    </div>
                  </div>


                  {Array.isArray(this.state.organizations?.orgOwner) && this.state.organizations?.orgOwner.map((item, index) => {
                    return (
                      <>
                        <div className="row m-0 pt-3 flexc pb-3" style={{ borderBottom: index == this.state.organizations?.orgOwner.length - 1 ? "2px solid transparent" : "2px solid #262626" }}>
                          <div className="col-3 col-xl-2">
                            <div>
                              <p className="text-color-2">{item.name}</p>
                            </div>
                          </div>


                          <div className="col-3 col-xl-2 d-flex justify-content-center">
                            <div>
                              <p className="text-color-2">{item.organization?.name}</p>
                            </div>
                          </div>
                          <div className="col-3 col-xl-2 d-flex justify-content-center">
                            <div>
                              <p className="text-color-2">{item.courses?.length}</p>
                            </div>
                          </div>


                          <div className="col-3 col-xl-2 d-flex justify-content-center">
                            <div>
                              <p className="text-color-2">{item.users?.length}</p>
                            </div>
                          </div>


                          <div className="col-12 col-xl-4 pt-3 pt-xl-0 justify-content-xl-end justify-content-start d-flex">
                            <div className="flexcb">
                              <div className="pl-4">
                                <button onClick={() => { this.goToLearningPath(item) }} className="btn-primary5">
                                  <p className="small-text-res">مسیر یادگیری</p>
                                </button>
                              </div>

                              <div>
                                <button onClick={() => { this.goToDetails(item) }} className="btn-primary5">
                                  <p className="small-text-res">مشاهده جزيیات</p>
                                </button>
                              </div>
                            </div>
                          </div>


                          {/* <div className="col-12 col-lg-2 justify-content-end d-flex flexc position-relative">
                      <button onClick={() => this.changeDropDown(index)} className="btn-primary py-1" style={{ maxWidth: "150px" }}>
                        <p>عملیات</p>
                      </button>

                      <div style={{ display: this.state.openDropDown[index] ? 'block' : 'none', top: 30, zIndex: 3, }} className="position-absolute">
                        <div className="btn-primary6 d-flex flex-column notification-btn" style={{ width: '150px' }}>
                          <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>مسیر یادگیری</button>
                          <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>مشاهده جزيیات</button>
                        </div>
                      </div>

                    </div> */}


                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
            </>
          )}


          {this.state.organizations?.orgUser?.length > 0 && (
            <>
              <div>
                <p className="text-color-2 text-semibig">گروه های شما</p>
              </div>
              <div className="box p-3 mt-4">
                <div>

                  <div className="row m-0 pt-3  pb-2">
                    <div className="col-3 col-xl-2">
                      <div>
                        <p className="text-color-2 font-bold">اسم گروه</p>
                      </div>
                    </div>
                    <div className="col-3 col-xl-2 d-flex justify-content-center" style={{ display: "inline-block" }}>
                      <p className="text-color-2 font-bold">اسم سازمان</p>
                    </div>

                    <div className="col-3 col-xl-2 d-flex justify-content-center">
                      <div>
                        <p className="text-color-2 font-bold">تعداد دوره</p>
                      </div>
                    </div>

                    <div className="col-3 col-xl-2 d-flex justify-content-center">
                      <div>
                        <p className="text-color-2 font-bold">تعداد پرسنل</p>
                      </div>
                    </div>

                    <div className="col-12 col-xl-4 justify-content-end d-flex d-none d-xl-flex">
                    </div>
                  </div>


                  {Array.isArray(this.state.organizations?.orgUser) && this.state.organizations?.orgUser.map((item, index) => {
                    return (
                      <div className="row m-0 pt-3 flexc pb-3" style={{ borderBottom: index == this.state.organizations?.orgOwner.length - 1 ? "2px solid transparent" : "2px solid #262626" }}>
                        <div className="col-3 col-xl-2">
                          <div>
                            <p className="text-color-2">{item.name}</p>
                          </div>
                        </div>


                        <div className="col-3 col-xl-2 d-flex justify-content-center">
                          <div>
                            <p className="text-color-2">{item.organization?.name}</p>
                          </div>
                        </div>
                        <div className="col-3 col-xl-2 d-flex justify-content-center">
                          <div>
                            <p className="text-color-2">{item.courses?.length}</p>
                          </div>
                        </div>


                        <div className="col-3 col-xl-2 d-flex justify-content-center">
                          <div>
                            <p className="text-color-2">{item.users?.length}</p>
                          </div>
                        </div>


                        <div className="col-12 col-xl-4 pt-3 pt-xl-0 justify-content-xl-end justify-content-start d-flex">
                          <div className="flexcb">
                            <div className="pl-4">
                              <button onClick={() => { this.goToUserLearningPath(item) }} className="btn-primary5">
                                <p className="small-text-res">مسیر یادگیری</p>
                              </button>
                            </div>


                          </div>
                        </div>


                        {/* <div className="col-12 col-lg-2 justify-content-end d-flex flexc position-relative">
                      <button onClick={() => this.changeDropDown(index)} className="btn-primary py-1" style={{ maxWidth: "150px" }}>
                        <p>عملیات</p>
                      </button>

                      <div style={{ display: this.state.openDropDown[index] ? 'block' : 'none', top: 30, zIndex: 3, }} className="position-absolute">
                        <div className="btn-primary6 d-flex flex-column notification-btn" style={{ width: '150px' }}>
                          <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>مسیر یادگیری</button>
                          <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>مشاهده جزيیات</button>
                        </div>
                      </div>

                    </div> */}


                      </div>

                    )
                  })}
                </div>
              </div>
            </>
          )}

        </div>
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
)(withRouter(OrganizationDashboard));

