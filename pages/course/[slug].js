import React from "react";
import CourseBox from "../../components/boxes/CourseBox";
import Link from "next/link";
import OverView from "../../components/boxes/OverView";
import PeymentModal from "../../components/modals/PeymentModal";
import Router from "next/router";
import { imageAddress, translate } from "../../utils/useful";
import Pagination from "../../components/Pagination";
import HttpServices from "../../utils/Http.services";
import { msToHMS } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

export async function getServerSideProps(context) {
  let slug = null
  if (context?.query?.slug) {
    slug = context.query?.slug
  }
  let path = null
  if (context?.resolvedUrl) {
    path = context?.resolvedUrl
  }
  console.log("slug", slug)
  console.log("slugggggggggggggggggggggggggg", path)

  const course = await (await HttpServices.syncRequest('getOneCourse', { _id: slug }, context)).result
  const userCourse = await (await HttpServices.syncRequest('getOneUserCourse', { course: slug }, context)).result
  // const lessons = await (await HttpServices.syncRequest('getLessons', { _id: slug })).result


  // console.log('teaaaaaccchhheeerrrr', course.info.teacher)


  // const banners = await (
  //   await HttpServices.syncRequest("getContents", {
  //     page: "advertisements",
  //     lng,
  //   })
  // ).result;

  console.log('course1', userCourse)

  return JSON.parse(JSON.stringify({
    props: {
      course: course?.course, lessons: course?.lessons,
      userCourse: userCourse?.info,
      totalDuration: course?.totalDuration, totalPracticeDuration: course?.totalPracticeDuration,
      path: path
    }
  }))
}

class test extends React.Component {

  state = {
    info: {},
    snacks: [],
    courses: [],
    sideBar: [
      { number: '10', totalTime: '۴ساعت', practice: '۲ساعت', level: 'مقدماتی', category: 'مدیریت', price: '۱۰۰' }
    ],
    page: 0,
    limit: 4,
    currentPage: 0,
  };
  componentDidMount() {

    this.fetch()
    this.getTeacher()





  }
  getTeacher = () => {

    // console.log("id", this.props.course?.teacher._id)

    HttpServices.request('getTeacher', { id: this.props.course?.teacher?._id }, (fetchResult, fetchError) => {

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
  postUserCourse() {
    console.log('this.state.id')
    HttpServices.request('postUserCourse', { course: this.props.course._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info('feeeeeeeeeeeeeeeeesh', fetchResult)
      this.setState({
        userCourse: fetchResult?.info
      },()=>{
        console.info('feeeeeeeeeeeeeeeeesh', this.state.userCourse)

      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  // getCourses() {
  //     let slug = Router.query.slug
  //     HttpServices.request('getCourses', { _id: slug }, (fetchResult, fetchError) => {

  //         console.log(fetchResult)
  //         console.log(fetchError)

  //         if (fetchError) {
  //             return
  //         }
  //         console.info(fetchResult)
  //         this.setState({ courses: fetchResult.info })
  //         console.log('coooooouuuuuurssssss',fetchResult)
  //     })


  // }
  fetch(getCount) {
    let slug = Router.query.slug

    let body = {
      _id: slug,
      limit: this.state.limit,
      skip: this.state.currentPage
    }
    // body.limit = this.state.limit
    // body.

    if (this.state.totalCount == null || getCount) {
      body.getCount = true
    }

    HttpServices.request("getCourses", body, (fetchResult, fetchError, fetchStatus) => {
      this.setState({ isLoading: false })


      this.setState({ pageStatus: fetchStatus })
      if (fetchError) {
        this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.fetchDataFailed', description: fetchError.message })
        return
      }
      this.setState({ courses: fetchResult.info })

      if (fetchResult.count != null) {
        this.setState({ totalCount: fetchResult.count })
      }

      console.log("this is res", fetchResult);

    })
  }

  // getCourses() {
  //     let slug = Router.query.slug
  //     HttpServices.request('getCourses', { _id: slug,limit:this.state.limit,getCount:true }, (fetchResult, fetchError) => {

  //         console.log(fetchResult)
  //         console.log(fetchError)

  //         if (fetchError) {
  //             return
  //         }
  //         console.info(fetchResult)
  //         this.setState({ courses: fetchResult.info })
  //         if(fetchResult.count){
  //             this.setState({totalCount:fetchResult.count})
  //         }
  //         console.log('coooooouuuuuurssssss',fetchResult)
  //     })


  // }

  // getOneCourse() {
  //     let slug = Router.query.slug
  //     HttpServices.request('getOneCourse', { _id: slug }, (fetchResult, fetchError) => {

  //         console.log(fetchResult)
  //         console.log(fetchError)

  //         if (fetchError) {
  //             return
  //         }
  //         console.info(fetchResult)
  //         this.setState({ info: fetchResult.info, data: fetchResult?.lessons })
  //         console.log('coooooouuuuuurssssss',fetchResult)
  //     })


  // }




  handlelike = () => {
    this.setState({ like: !this.state.like })
  }


  openPaymentModal = () => {
    this.PeymentModal.modal.showModal()
  }
  changePage = (index) => {
    this.setState({ currentPage: index }, () => {
      this.fetch()
    })
  }
  postWishList = (liked) => {

    console.log("liked", liked);


    let course = this.props.course
    course.liked = liked
    this.setState({ course })

    HttpServices.request('postWishList', { course: course._id, status: liked }, (fetchResult, fetchError) => {
      console.log('postWishList', fetchError)


      if (fetchError) {

        course.liked = !liked
        this.setState({ course })
        console.log(fetchError)
        return
      }
      console.log(fetchError)
      console.log('postWishList', fetchResult)


    })

  }


  render() {

    return (
      <main className="container">
        <div className="row m-0" >
          <div className="col-12 col-md-8 p-0">
            <div className=" box px-3 pb-3">

              <div className="row m-0">
                <div className="col-12 col-xl-3 p-0 pt-3 " >
                  <div className=" flexcc position-relative h-100 pr-3">
                    <img className="radius-1 w-100 h-100" src={imageAddress(this.props.course?.image, null, 'thumb')} style={{ objectFit: "contain" }} />
                    {/* <img className="radius-1 position-absolute" src="/images/icons/video-circle.png" /> */}
                  </div>
                </div>
                <div className="col-12 col-xl-9 p-0 d-flex text-xl-right" style={{ flexDirection: "column" }}>
                  <div className="row m-0">
                    <div className="col-12 col-sm-6 p-0 pr-3">
                      <div className="">
                        <p className="pb-3 pt-5 text-color-1 text-ultra-big font-bold"> {this.props.course?.title}</p>
                        <p className="pb-3 text-color-1 text-big font-bold">مدرس:

                          <span className="mx-1">{this.props.course?.teacher.fullname} </span>


                        </p>
                        {/* <p className="pb-3 text-color-2 text-semibig">دسته بندی یادین: {this.props.course?.category}</p> */}
                      </div>
                    </div>


                    <div className="col-12 col-sm-6 pt-5">
                      {this.props.user && this.props.user.loggedin && (
                        <div className="flexc pb-4 pt-0  justify-content-start justify-content-sm-end">
                          <p className="text-color-2 pl-2">علاقمندی</p>

                          {/* {console.log("**************************", this.props.course.liked)} */}

                          {this.props.course?.liked ? (
                            <button className="p-0" onClick={() => this.postWishList(false)}>

                              <img className="" src="/images/icons/heart-full.svg" />
                            </button>
                          ) : (
                            <button className="p-0" onClick={() => this.postWishList(true)}>

                              <img className="" src="/images/icons/heart-2.svg" />
                            </button>
                          )}
                        </div>
                      )}
                      <div className="flexc pb-4 justify-content-start justify-content-sm-end">
                        <p className="text-color-2">امتیاز: {(this.props.course?.score).toFixed(1)}</p>
                        <img className="pr-2" src="/images/icons/star.svg" />
                      </div>
                      <div className="flexc pb-4 justify-content-start justify-content-sm-end">
                        <p className="text-color-2">سطح یادین: {translate(this.props.course?.level)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="px-3 pt-0 pt-sm-3 text-color-2">
                  {this.props.course?.description}
                </p>
              </div>
            </div>



            {/* درمورد استاد */}
            <div className="box px-3 pb-3 mb-3">
              <div className="">
                <div className="row m-0 border-bottom-gray py-3">
                  <div className="col-6 p-0">
                    <h3 className="text-color-1 text-big m-0" >درمورد استاد</h3>
                  </div>
                  <div className="col-6 p-0 justify-content-end flexc">
                    <Link href={"/prof/" + this.props.course?.teacher._id}>
                      <a href="" className="text-color-2 text-normal" style={{ cursor: "pointer" }}> پروفایل استاد</a>
                    </Link>
                    <img src="/images/icons/arrow-left2.png" style={{ width: "25px" }}></img>
                  </div>
                </div>


                <div className="row m-0">
                  <div className="col-12 col-xl-3 p-0 pt-3">
                    <div>

                      <img src={imageAddress(this.props.course?.teacher?.image, null, 'thumb')}
                        style={{ minWidth: '10px', height: "200px", width: "200px", objectFit: "contain" }} class="w-100 h-100 radius-1" />
                    </div>
                  </div>
                  <div className="col-12 col-xl-9 pr-4">
                    <div className="row m-0">
                      <div className="col-6 p-0 text-color-1 text-small">
                        <h3 className="text-semibig">
                          <span className="mx-1">{this.props.course?.teacher.fullname} </span>

                        </h3>
                      </div>
                      <div className="col-6 p-0 justify-content-end flexc text-color-2">
                        <p className="d-none d-sm-block">{this.state.teacherCourses?.length} یادین |</p>
                        <p className="pr-2"> امتیاز:

                          <span className="mx-1">{this.props.course?.teacher.rating?.total?.star?.toFixed(1)} </span>
                        </p>
                        <img className="flexc pb-1 pr-1" src="/images/icons/star.svg"></img>
                      </div>
                    </div>
                    <div>
                      <p className="text-color-2">
                        {/* {this.props.course?.teacher?.description} */}
                        {this.props.course?.teacher?.description?.length > 200 ? this.props.course?.teacher?.description?.substr(0, 200) + '...' : this.props.course?.teacher?.description}

                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* مخاطبین یادین */}
            <div className="box px-3 pb-3 mb-3">
              <h3 className=" py-3 border-bottom-gray text-color-1 text-big">مخاطبین یادین</h3>
              <p className="text-color-2 pb-2 text-normal">{this.props.course?.audiance}</p>
            </div>


            {/* دستاورد یادین */}
            <div className="box px-3 pb-3 mb-3">
              <h3 className=" py-3 border-bottom-gray text-color-1 text-big">دستاورد یادین</h3>
              <p className="text-color-2 pb-2 text-normal">{this.props.course?.achievements}</p>
            </div>
            {/*  اطلاعات یادین*/}
            {((!this.state.userCourse && !this.props.userCourse) || this.props.user.info.status == 'admins') && (

              <div className="box px-3 pb-2 mb-3">
                <h3 className=" py-3 border-bottom-gray text-color-1 text-big">اطلاعات یادین</h3>
                <div className="d-flex flexcb text-color-2 pb-2 text-semibig px-3">
                  <p>{this.props?.lessons?.length} اسنک</p>
                  <p> {msToHMS(this.props?.totalDuration ?? 0)} </p>
                </div>
                {this.props.course?.teaser && (

                  <div className=" flexcc video-container mb-5">
                    <video controlsList="nodownload" poster={imageAddress(this.props.course?.teaser?.cover, 'video')} controls={true} ref={el => this.videoPlayer = el} src={imageAddress(this.props?.course?.teaser)} class=" radius-1" style={{ margin: "10px auto", maxWidth: 800 }} />

                  </div>
                )}

                {/* اسنک ها */}

                {Array.isArray(this.props.lessons) && this.props?.lessons.map((item, index) => {
                  return (
                    <>
                      {item.locked ? (
                        <div key={index} className="box-2 d-flex flexcb px-3 py-3 mb-2 ">
                          <div className="d-flex">
                            <div className="d-none d-lg-flex">

                              <div className="d-none d-lg-flex">
                                <p className=" pr-2 text-color-1 text-semibig">اسنک {index + 1}: </p>

                              </div>

                            </div>
                            <p style={{}} className="pr-2 text-color-1 text-semibig">
                              {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                            </p>
                          </div>

                          <div className=" flexcc ">
                            <p style={{ whiteSpace: 'nowrap' }} className="text-color-2 text-semibig">{msToHMS(item?.video?.duration ?? 0)} </p>

                            <img src="/images/icons/lock2.svg" className="pr-2 lock-icon"></img>
                          </div>

                        </div>
                      ) : (
                        <>
                          {this.props.user && this.props.user.loggedin ? (

                            <Link href={"/snacks/" + item._id}>
                              <a>
                                <div key={index} className="box-3 d-flex flexcb px-3 py-3 mb-2 ">
                                  <div className="d-flex">
                                    <div className="d-none d-lg-flex">

                                      <p className=" pr-2 text-color-1 text-semibig">اسنک {index + 1}: </p>


                                    </div>
                                    <p style={{}} className="pr-2 text-color-1 text-semibig">
                                      {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                                    </p>
                                  </div>
                                  <div className=" flexcc  ">
                                    <p style={{ whiteSpace: 'nowrap' }} className="text-color-2 text-semibig">{msToHMS(item?.video?.duration ?? 0)} </p>

                                    <img src="/images/icons/lock.open.svg" className="pr-2 lock-icon "></img>
                                  </div>

                                </div>
                              </a>
                            </Link>
                          ) : (
                            <Link href={'/login' + '?ref=' + this.props.path}>
                              <a>
                                <div key={index} className="box-3 d-flex flexcb px-3 py-3 mb-2 ">
                                  <div className="d-flex">
                                    <div className="d-none d-lg-flex">

                                      <p className=" pr-2 text-color-1 text-semibig">اسنک {index + 1}: </p>


                                    </div>
                                    <p style={{}} className="pr-2 text-color-1 text-semibig">
                                      {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                                    </p>
                                  </div>
                                  <div className=" flexcc  ">
                                    <p style={{ whiteSpace: 'nowrap' }} className="text-color-2 text-semibig">{msToHMS(item?.video?.duration ?? 0)} </p>

                                    <img src="/images/icons/lock.open.svg" className="pr-2 lock-icon "></img>
                                  </div>

                                </div>
                              </a>
                            </Link>
                          )}
                        </>
                      )
                      }

                    </>

                  )
                })}



              </div>
            )}
          </div>
          {/* sidebar/ */}
          <div className="col-12 col-md-4 p-0 pr-md-3 ">

            {console.log("this isssssssss count", this.props.lessons)}
            <OverView data={this.props?.course} userCourse={this.props?.userCourse} postUserCourse={this.postUserCourse} lessons={this.props.lessons} duration={this.props?.totalDuration ?? 0} totalPracticeDuration={this.props?.totalPracticeDuration ?? 0} openPaymentModal={this.openPaymentModal} />

          </div>
        </div>


        {/* یادین های مرتبط */}
        <div className=" box-4 pt-3">
          <h3 className="text-color-1 border-bottom-gray px-3 pb-3">یادین های مرتبط</h3>
          <div className="row m-0">
            {this.state.courses.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-3 mb-4 ">
                  <CourseBox data={item} />
                </div>
              )
            })}
          </div>
        </div>



        <PeymentModal ref={el => this.PeymentModal = el} data={this.props?.course} item={this.props?.lessons} duration={this.props?.totalDuration ?? 0} totalPracticeDuration={this.props?.totalPracticeDuration ?? 0} />


      </main >

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
)(test);
