import React, { Component } from "react";
import PeymentModal from "../modals/PeymentModal";
import HttpServices from "../../utils/Http.services";
import Link from "next/link";
import { msToHMS, priceStandardView } from "../../utils/useful";
import { checkTranslation } from "../../utils/useful";
import { translate } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import Router, { useRouter } from 'next/router';

// export async function getServerSideProps(context) {
//     let slug = null
//     if (context?.query?.slug) {
//         slug = context.query?.slug
//     }
//     let body = {}

//     body.getCount = true
//     body.course = this.props.data._id
//     const lessons = await (await HttpServices.syncRequest('getLessons',body)).result
//     // const lessons = await (await HttpServices.syncRequest('getLessons', { _id: slug })).result



//     console.log('coooouuuunnnntttttt', lessons?.info)

//     // const banners = await (
//         //   await HttpServices.syncRequest("getContents", {
//             //     page: "advertisements",
//             //     lng,
//             //   })
//             // ).result;


//             return JSON.parse(JSON.stringify({
//                 props: {
//                     count: lessons?.count, lesson: lessons?.info
//                 }
//     }))
// }
class OverView extends Component {

  state = {

  }


  componentDidMount() {
    // console.log("this is lesson",this.props.lesson);
    // console.log("this is count",this.props.count);
    this.getLearningPath()
    // HttpServices.syncRequest('getLessons',{},{ course: this.props.data }).then((res)=>{
    //     console.log(res.result?.info)
    // })
  }
  openPaymentModal = () => {
    if (this.props.user && this.props.user.loggedin) {

      this.props.openPaymentModal()
    }
    if (!this.props.user || !this.props.user.loggedin) {
      Router.push(('/login') + '?ref=' + `/course/${this.props.data?._id}`);

    }
  }
  addToLearningPath() {
    // console.log(this.state.id)
    if (this.props.user && this.props.user.loggedin) {
      HttpServices.request('addToLearningPath', { course: this.props.data._id }, (fetchResult, fetchError) => {

        console.log(fetchResult)
        console.log(fetchError)

        if (fetchError) {
          return
        }
        if (fetchResult) {
          this.getLearningPath()

        }
        console.info(fetchResult)

        //   this.setState({
        //     course: fetchResult?.course, lessons: fetchResult?.lessons,
        //     totalDuration: fetchResult?.totalDuration, totalPracticeDuration: fetchResult?.totalPracticeDuration
        //   }, () => {
        //     console.log("alert")
        //     this.setState({ isLoading: true })
        //   })
      })
    }
    if (!this.props.user || !this.props.user.loggedin) {
      Router.push(('/login') + '?ref=' + `/course/${this.props.data?._id}`);

    }

  }
  getLearningPath() {
    // console.log(this.state.id)
    HttpServices.request('getLearningPath', {}, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        path: fetchResult?.info
      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }

 

  render() {

    let inLearningPath = false

    // this.state?.path?.course.includes(this.props.data._id))
    if (this.state?.path?.course) {
      for (let i = 0; i < this.state?.path?.course.length; i++) {
        const course = this.state?.path?.course[i];
        if (course._id == this.props.data._id) {
          inLearningPath = true
        }
      }
    }

    return (

      <div className="d-flex " style={{ position: 'sticky', top: 65 }}>
        {console.log('sdvsdvbfbsbdfuuuserrrr', this.props.user.info)}
        <div className="box px-3 py-2 w-100 ">
          <p className="text-color-1 text-semibig py-3">نمای کلی یادین</p>
          <div className="d-flex flexc text-color-1 ">
            <img src="/images/icons/play-cricle.png" style={{ width: "25px" }}></img>
            <p className="text-small p-2">تعداد اسنک: {this.props?.lessons?.length}</p>
            {/* { console.log('count',this.props.data?.lessons?.count)}  */}
          </div>

          <div className="d-flex flexc text-color-1 ">
            <img src="/images/icons/video-play.png" style={{ width: "25px" }}></img>
            <p className="text-small  p-2">مجموع اسنک ها: {msToHMS(this.props?.duration ?? 0)}</p>
          </div>

          <div className="d-flex flexc text-color-1">
            <img src="/images/icons/timer.png" style={{ width: "25px" }}></img>
            <p className="text-small  p-2">زمان انجام تمارین: {msToHMS(this.props?.totalPracticeDuration *60)}</p>
          </div>

          <div className="d-flex flexc text-color-1">
            <img src="/images/icons/cup.png" style={{ width: "25px" }}></img>
            <p className="text-small  p-2">سطح یادین: {translate(this.props.data?.level)}</p>
          </div>

          {/* <div className="d-flex flexc text-color-1">
                        <img src="/images/icons/teacher.png" style={{ width: "25px" }}></img>
                        <p className="text-small  p-2">دسته‌بندی یادین: {this.props.data?.category}</p>
                    </div> */}

          <div className="d-flex flexc text-color-1">
            <img src="/images/icons/verify.png" style={{ width: "25px" }}></img>
            <p className="text-small  p-2">گواهی پایان یادین</p>
          </div>

          <div className="d-flex flexc text-color-1">
            <img src="/images/icons/empty-wallet.png" style={{ width: "25px" }}></img>
            <p className="text-small  p-2">اعتبار مورد نیاز برای مشاهده یادین: <span className="main-color-1">{this.props.data?.price > 0 ? priceStandardView(this.props.data.price) + ' ' + 'تومان' : 'رایگان'}</span></p>
          </div>
          <div className="row m-0 d-flex justify-content-start">

            <div className="col-12 px-0 ">
              {!inLearningPath ? (
                <div className="py-3">
                  <button className="flexcc btn-primary2 buy-btn" style={{ maxWidth: "200px" }} onClick={() => this.addToLearningPath()}>
                    <img className="pl-2 wallet-icon" src="/images/icons/routing2.svg"></img>
                    افزودن به مسیر یادگیری
                  </button>
                </div>
              ) : (

                <div className="py-3 flexc text-color-2">
                  <p>  این یادین در مسیر یادگیری شماست.</p>
                </div>
              )}
            </div>
            {console.log('--------------------', this.props?.data, this.state?.userCourse, this.props.userCourse)}
            <div className="col-12 py-3 px-0">
              {!this.props.data?.bought && this.props.data?.price > 0 && (this.props.user.info.status != 'admins') && (

                <div className="pb- w-100">
                  <button className=" btn-primary2 flexcc buy-btn" style={{ maxWidth: "200px" }} onClick={() => this.openPaymentModal()}>
                    <img className="pl-2 wallet-icon" src="/images/icons/empty-wallet12.svg"></img>
                    خرید یادین
                  </button>
                </div>
              )}
              {this.props.user.loggedin ? (
                <>
                  {/* {console.log('this.props.user.info.status23221', this.props.user.info.status)} */}
                  {/* {console.log('this.props.user.info.', (this.props.user.info.status == 'admins'))} */}
                  {/* {console.log('this.props.user.info.status == "admins"', (this.props.data?.bought && this.props.data?.price > 0 && this.props.userCourse?.course?._id == this.props.data?._id))} */}
                  {((this.props.data?.bought && this.props.data?.price > 0 && this.props.userCourse?.course?._id == this.props.data?._id)  || (this.props.user.info.status == 'admins' && (this.props.userCourse?.course?._id == this.props.data?._id ))) && (
                    <Link href={`/course-info/${this.props.data?._id}`}>
                      <button style={{ maxWidth: "200px" }} className="btn-primary w-100  main-color-1 ">
                        مشاهده محتوای یادین
                      </button>
                    </Link>
                  )}
                  {(((this.props.userCourse?.course._id != this.props.data?._id) || !this.props.userCourse || this.props.userCourse == null) && ((!this.props.userCourse || this.props.userCourse == null)) && this.props.data?.price > 0 && this.props.user.info.status == 'admins') && (

                    <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => { this.addToLearningPath(); this.props.postUserCourse() }}>
                      افزودن به یادین های من

                    </button>

                  )}
                  {this.props.data.price == 0 && (
                    <>
                      {/* {console.log('userrrrrrr', this.props.user)} */}
                      {((this.state?.userCourse?.course == this.props?.data?._id) || (this.props.userCourse?.course._id == this.props.data?._id) || (this.props.userCourse && this.props.userCourse != null)) && (this.props.user.info.status != 'admins') && (
                        <Link href={`/course-info/${this.props.data?._id}`}>
                          <button style={{ maxWidth: "200px" }} className="btn-primary w-100  main-color-1 ">
                            مشاهده محتوای یادین
                          </button>
                        </Link>
                      )}
                      {(((this.props.userCourse?.course._id != this.props.data?._id) || !this.props.userCourse || this.props.userCourse == null)) && (

                        <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => { this.addToLearningPath(); this.props.postUserCourse() }}>
                          افزودن به یادین های من

                        </button>

                      )}
                    </>
                  )}
                  {/* {this.props.data.price == 0 && (
                    <>
                      {console.log('userrrrrrr', this.props.user)}
                      {((this.state?.userCourse?.course == this.props?.data?._id) || (this.props.userCourse?.course._id == this.props.data?._id) || (this.props.userCourse && this.props.userCourse != null)) && (this.props.user.info.status != 'admins') && (
                        <Link href={`/course-info/${this.props.data?._id}`}>
                          <button style={{ maxWidth: "200px" }} className="btn-primary w-100  main-color-1 ">
                            مشاهده محتوای یادیننننن
                          </button>
                        </Link>
                      )}
                        {((this.props.userCourse?.course._id != this.props.data?._id) || !this.props.userCourse || this.props.userCourse == null)  && (

                        <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => { this.addToLearningPath(); this.props.postUserCourse() }}>
                          افزودن به یادین های من

                        </button>

                      )}
                    </>
                  )} */}

                </>
              ) : (
                <p className="text-color-2 text-small pt-2"> برای مشاهده محتوا یادین ابتدا وارد حساب کاربری شوید</p>
              )}
            </div>

          </div>




        </div>
      </div>


    )
  }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(OverView);
