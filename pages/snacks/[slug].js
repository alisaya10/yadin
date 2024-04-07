import React from "react";
import CourseBox from "../../components/boxes/CourseBox";
import Link from "next/link";
import OverView from "../../components/boxes/OverView";
import PeymentModal from "../../components/modals/PeymentModal";
import HttpServices from "../../utils/Http.services";
import Router from "next/router";
import Video from "../../components/course/Video";
import { msToHMS } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

export async function getServerSideProps(context) {
  let slug = null
  let time = null

  console.log(context.query)
  if (context?.query?.slug) {
    slug = context.query?.slug
  }
  if (context?.query?.time) {
    time = context.query?.time
  }
  console.log("slug")
  console.log(slug)

  const lesson = await (await HttpServices.syncRequest('getOneLesson', { _id: slug }, context)).result
  const userCourse = await (await HttpServices.syncRequest('getOneUserCourse', { course: lesson?.course._id }, context)).result

  // let lesson = {info:{},lessons:{},course:{}}
  // console.log(lessons)

  return JSON.parse(JSON.stringify({
    props: {
      time: time, slug: slug, lesson: lesson?.info, lessons: lesson?.lessons, course: lesson?.course, userCourse: userCourse?.info
    }
  }))

}
class snacks extends React.Component {

  state = {
    like: true,
    info: {

    },
    snacks: [

    ],

    courses: [],

    sideBar: [
      { number: '10', totalTime: '۴ساعت', practice: '۲ساعت', level: 'مقدماتی', category: 'مدیریت', price: '۱۰۰' }
    ],


    page: 0,
    limit: 4,
    currentPage: 0,
  };

  componentDidMount() {
    if (!this.props.user || !this.props.user.loggedin) {
      Router.push(('/login') + '?ref=' + `/snacks/${this.props.slug}`);

    }
    // this.fetch()

    console.log('this is lesson info', this.props.userCourse);
    // console.log('this is lessons info', this.props.lessons);
    // console.log('this is course info', this.props.course);
    // console.log('this is time info', this.props.time);
    // console.log('this is slug info', this.props.slug);
    if ((!this.props.userCourse || this.props.userCourse == null || this.props.userCourse == undefined) && this.props.lesson.locked == true && this.props.user.info.status != 'admins') {
      Router.push('/');
    }



  }

  // fetch(getCount) {
  //     let slug = Router.query.slug

  //     let body = {
  //         _id: slug,
  //         limit: this.state.limit,
  //         skip: this.state.currentPage
  //     }
  //     // body.limit = this.state.limit
  //     // body.

  //     if (this.state.totalCount == null || getCount) {
  //         body.getCount = true
  //     }

  //     HttpServices.request("getCourses", body, (fetchResult, fetchError, fetchStatus) => {
  //         this.setState({ isLoading: false })


  //         this.setState({ pageStatus: fetchStatus })
  //         if (fetchError) {
  //             this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.fetchDataFailed', description: fetchError.message })
  //             return
  //         }
  //         this.setState({ courses: fetchResult.info })

  //         if (fetchResult.count != null) {
  //             this.setState({ totalCount: fetchResult.count })
  //         }

  //         console.log("this is res", fetchResult);

  //     })
  // }

  // handlelike = () => {
  //   this.setState({ like: !this.state.like })
  // }

  postWishList = (liked, lesson) => {

    console.log("liked", liked);
    console.log("lesson", lesson)
    // let lesson = this.props.lesson

    lesson.liked = liked
    this.setState({ lesson })

    HttpServices.request('postWishList', { lesson: lesson._id, course: this.props.course._id, status: liked }, (fetchResult, fetchError) => {
      console.log('postWishList', fetchError)


      if (fetchError) {

        lesson.liked = !liked
        this.setState({ lesson })
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
        <div className="row m-0">

          <div className="col-12 col-lg-4 p-0 order-2 order-lg-1">
            <div className="d-flex " style={{ position: 'sticky', top: 90 }}>
              <div className="box px-3 w-100 ">
                <h4 className="text-color-1 font-light text-normal">محتوای یادین</h4>
                <div className="d-flex flexc text-color-1 ">
                  <img src="/images/icons/play-cricle.png" style={{ width: "25px" }}></img>
                  <p className="p-2">تعداد اسنک: {this.props?.lessons?.length}</p>
                  {/* { console.log('count',this.props.data?.lessons?.count)}  */}
                </div>

                {Array.isArray(this.props.lessons) && this.props?.lessons.map((item, index) => {
                  return (
                    <>
                      {!item.locked ? (

                        <div key={index}
                          className={" d-flex flexcb px-3 py-3 mb-2 " + (item._id == this.props.lesson._id ? 'box-2' : 'box')}
                        >
                          <img src="/images/icons/lock.open.svg" className="pl-2 lock-icon "></img>

                          <Link href={"/snacks/" + item._id}>
                            <a href="" className="w-100" style={{ cursor: "pointer" }}>
                              <div className="d-flex flexcb w-100">
                                {/* <Link href={"/snacks/" + item._id}>
                          <a href="" className=" " style={{ cursor: "pointer" }}>
                            <p className="text-color-1">اسنک {index + 1}: </p>
                          </a>
                        </Link> */}

                                <p className="text-color-1 text-small">
                                  {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                                </p>

                                <p className="text-color-2 text-small pr-1">{msToHMS(item?.video?.duration ?? 0)} </p>
                              </div>
                            </a>
                          </Link>
                          {this.props.user && this.props.user.loggedin && (
                            <div className="flexc">
                              {item.liked ? (
                                <button className="pr-2" onClick={() => this.postWishList(false, item)}>

                                  <img className="" src="/images/icons/heart-full.svg" />
                                </button>
                              ) : (
                                <button className="pr-2" onClick={() => this.postWishList(true, item)}>

                                  <img className="" src="/images/icons/heart-2.svg" />
                                </button>
                              )}

                            </div>
                          )}
                        </div>
                      ) : (
                        <div key={index}
                          className={" d-flex flexcb px-3 py-3 mb-2 " + (item._id == this.props.lesson._id ? 'box-2' : 'box')}
                        >

                          <img src="/images/icons/lock2.svg" className="pl-1 lock-icon"></img>

                          <div className="d-flex flexcb w-100">
                            {/* <Link href={"/snacks/" + item._id}>
                          <a href="" className=" " style={{ cursor: "pointer" }}>
                            <p className="text-color-1">اسنک {index + 1}: </p>
                          </a>
                        </Link> */}

                            <p className="text-color-1 text-small">
                              {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                            </p>

                            <p className="text-color-2 text-small pr-2">{msToHMS(item?.video?.duration ?? 0)} </p>
                          </div>


                        </div>
                      )}
                    </>

                  )
                })}
              </div>
            </div>
          </div>


          <div className="col-12 col-lg-8 order-1 order-lg-2 px-0 px-lg-3">
            <Video  data={this.props.lesson} course={this.props.course} time={this.props.time} />
          </div>


        </div>
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
)(snacks);
