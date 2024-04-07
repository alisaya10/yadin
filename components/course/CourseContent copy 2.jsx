import React from "react";
import Configurer from "../Configurer";
import FormViewer from "../FormViewer";
import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import Collapsible from 'react-collapsible';

import Slider from '@mui/material/Slider';
import { msToHMS, postWishList } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import { imageAddress } from "../../utils/useful";
import NoteModal from "../modals/NoteModal";
import Router from "next/router";


class CourseContent extends React.Component {

  state = {
    data: [],
    info: {},

    like: true,

    courseInfo: {
      image: "/images/icons/maincardpic.png",
      title: "یادین تیم‌سازی",
      categories: "مدیریت",
      description:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      rate: "4.5",
      snacks: "10 اسنک",
      duration: "4 ساعت",
      practiceTime: "2 ساعت",
      level: "مقدماتی",
      teacher: {
        name: "ایمان سرایی",
        image: "/images/icons/profilepic.png",
        rate: "4.6",
        review: "(25نظر)",
        courses: "5 یادین",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
      },
    },
    snacksOpenStatus: {},
    headers: [
      { key: 'currentPassword', type: 'PasswordInput', col: '6', information: { label: '{{lang}}currentPassword', icon: '/images/inputdef.svg', placeholder: '{{lang}}insertPassword', required: true } },
      { key: 'newPassword', type: 'PasswordInput', col: '6', information: { label: '{{lang}}newPassword', icon: '/images/inputdef.svg', placeholder: '{{lang}}insertPassword', required: true } },
    ],
    videoTimes: {},

    videoPercentage: {},

    parts: [
      { name: 'تیم سازی؟', duration: '30' },
      { name: 'تیم حرفه ای', duration: '30' },
      { name: 'حل مشکلات', duration: '30' },
      { name: 'تیم چیست؟', duration: '30' },
      { name: 'مدیریت تیم', duration: '30' },
      { name: 'مشورت', duration: '30' },
    ],
    // liked: true

  }
  componentDidMount() {
    let id = Router.query.id
    this.setState({ id }, () => {
      // this.getQuizes()
      // this.getPractices()
      this.getOneCourse()
      this.getCurrentLesson()
      // this.getAllReviews()

    })
    console.log('iddddddddd', this.state.id);
  }
  getOneCourse() {
    console.log(this.state.id)
    HttpServices.request('getOneCourse', { _id: this.state.id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        course: fetchResult?.course, lessons: fetchResult?.lessons,
        totalDuration: fetchResult?.totalDuration, totalPracticeDuration: fetchResult?.totalPracticeDuration
      }, () => {
        console.log("alert")
        this.setState({ isLoading: true })
      })
    })


  }
  getCurrentLesson() {
    console.log(this.state.id)
    HttpServices.request('getCurrentLessonCourse', { course: this.state.id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        cLesson: fetchResult?.info,

      })
    })


  }

  postWishList = (liked) => {

    console.log("liked", liked);


    let course = this.state.course
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

  updateUserPassword = () => {
    let data = this.form.getForm()
    if (data) {
      this.setState({ isLoading: true, errors: {}, message: null })
      HttpService.request("updateUserPassword", data, (fetchResult, fetchError) => {
        console.log(fetchError)
        this.setState({ isLoading: false })
        if (fetchError) {
          this.setState({ errors: fetchError.errors })
          this.props.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
          return
        }
        this.props.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })

      })
    }
  }



  changeOpenStatus = (item, index) => {
    let snacksOpenStatus = this.state.snacksOpenStatus

    snacksOpenStatus[index] = !snacksOpenStatus[index]

    console.log(snacksOpenStatus)
    this.setState({ snacksOpenStatus })
  }

  sliderChanged = (e, index, duration) => {
    // console.log(e.target.value)
    let percentage = e.target.value

    let videoPercentage = this.state.videoPercentage
    videoPercentage[index] = percentage

    // this['videoPlayer-'+index].pause()

    this['videoPlayer-' + index].currentTime = duration * percentage / 100

    this['videoPlayer-' + index].play()

    this.setState({ videoPercentage })

  }

  playVideo = (index) => {
    this['videoPlayer-' + index].play()

    if (this.state.currentVideo != null) {
      this['videoPlayer-' + this.state.currentVideo].pause()

    }

    this.setState({ currentVideo: index })

  }

  pauseVideo = (index) => {
    this['videoPlayer-' + index].pause()

    this.setState({ currentVideo: null })

  }

  videoDurationChanged = (e, index, duration) => {
    // console.log(e)
    // console.log(e.target.currentTime)
    let time = e.target.currentTime
    let videoTimes = this.state.videoTimes
    let videoPercentage = this.state.videoPercentage


    if (!videoTimes) {
      videoTimes = {}
    }

    let percentage = time / duration * 100
    // console.log(percentage)
    videoTimes[index] = time
    videoPercentage[index] = percentage
    this.setState({ videoTimes, videoPercentage })

  }

  noteAction = (index, item) => {

    this['videoPlayer-' + index].pause()
    let time = this['videoPlayer-' + index].currentTime ?? 0

    // console.log(item)
    let noteVideo = index
    let currentLesson = item
    this.setState({ noteVideo, currentVideo: null, currentTime: time, currentLesson }, () => {
      this.NoteModal.showModal()

    })


  }

  videoEnded = (index) => {
    let videoTimes = this.state.videoTimes
    let videoPercentage = this.state.videoPercentage


    videoTimes[index] = null
    videoPercentage[index] = null

    this.setState({ videoTimes, videoPercentage, currentVideo: null })

  }

  videoseek = (index, seekTime, finalTime) => {

    // console.log(index)
    // console.log(this['videoPlayer-' + index])
    let time = this['videoPlayer-' + index].currentTime
    time = finalTime ?? (time + seekTime)
    this['videoPlayer-' + index].currentTime = time
    this['videoPlayer-' + index].play()
    this.setState({ currentVideo: index })
  }

  fullScreen = (index) => {
    let elem = this['videoPlayer-' + index]

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    // if (document.exitFullscreen) {
    //   document.exitFullscreen();
    // } else if (document.webkitExitFullscreen) { /* Safari */
    //   document.webkitExitFullscreen();
    // } else if (document.msExitFullscreen) { /* IE11 */
    //   document.msExitFullscreen();
    // }

  }



  render() {
    let courseInfo = this.state.courseInfo;
    return (

      <Configurer
        settingsInfo={{ headerTitle: "Course Content", button: { goBack: true } }}
        title={"Course Content"}
        description={"Course Content"}
        className="px-3"
        changeOnUnmount={true}>

        <main className=" container ">


          <div className="flexc mt-3 d-md-none">
            <div className="">
              <button onClick={() => this.props.openMobileMenu()} className="flexcc">
                <img className=" " src="/images/icons/menu-3.svg" alt="" />
              </button>
            </div>
            <div>
              <p className="white">محتوای یادین</p>
            </div>
          </div>


          <div className="row m-0">
            {/* {this.state.info?.map((item, index) => {
                            return ( */}

            <div className="col-12 mb-4 p-0">
              {this.state?.cLesson?.currentLesson && this.state?.cLesson?.currentLesson != undefined && this.state?.cLesson?.currentLesson != null ? (
                <div className="box p-4">
                  <div>
                    <p className="border-bottom-gray pb-4 text-semibig text-color-1">
                      در حال مشاهده این اسنک بودید.
                    </p>
                  </div>
                  <div className="row m-0">
                    <div className="col-12 col-xl-4">
                      <div className="py-4 flexcc">
                        <img className="radius-1 w-100"
                          src={imageAddress(this.state.cLesson?.currentLesson?.video.cover, 'video')} style={{ objectFit: "cover" }} />
                      </div>
                    </div>

                    <div className="col-12 col-xl-8 ">
                      <div className="h-100 d-flex flex-column pb-4" >
                        <div>
                          <div className="py-4">
                            <p className="text-color-1 text-semibig ">
                              {this.state.cLesson?.currentLesson?.title}
                            </p>
                          </div>

                          <div className="row m-0 flexc">
                            <div classname="col-12 col-md-6 p-0 w-75">
                              <p className="text-color-2">مشاهده شده: {msToHMS(this.state?.cLesson.currentLessontime ?? 0)} </p>
                            </div>

                            <div className="flexc col-12 col-md-6 p-0 pt-1 pt-md-0">
                              <p className="text-color-2">&nbsp; | &nbsp;</p>
                              <p className="text-color-2">کل اسنک: &nbsp; </p>
                              <p className="text-color-2">
                                {msToHMS(this.state?.cLesson.currentLesson?.video?.duration ?? 0)}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="">
                          <button className=" btn-primary main-color-1 mt-5" style={{ maxWidth: "300px" }}>
                            <Link href={"/snacks/" + this.state.cLesson?.currentLesson?._id + '?time=' + this.state.cLesson?.currentLessontime}>
                              <a>ادامه مشاهده</a>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4">
                    <p className="border-bottom-gray pb-4 text-semibig text-color-1">
                      شما درحال مشاهده اسنکی نبوده اید.
                    </p>
                  </div>
                  <div>
                    <div className="p-4 flexcc position-relative">
                      {/* <img className="radius-1" src={imageAddress(this.state.cLesson?.currentLesson?.video.cover, 'video')} style={{ minWidth: '10px', objectFit: "cover" }} /> */}
                      <img className="radius-1 position-absolute" />
                    </div>
                  </div>
                </>
              )}

            </div>

            {/* <div className="col-12 col-xl-4 pl-0 pr-0">
              <div className="box px-3 pb-3">
                <h2 className="pt-3 pb-2 border-bottom-gray text-color-1 text-semibig font-light" >میزان پیشرفت</h2>
                <div className="text-color-2 ">
                  <p className="pb-3">مشاهده شده: ۱۵ دقیقه</p>
                  <p className="pb-3">۱ اسنک مشاهده شده</p>
                  <p>۹ اسنک باقی مانده</p>
                </div>
              </div>
            </div> */}
          </div>
          {/* <p className=" pr-2 text-color-1 text-semibig">تیزر : </p> */}
{this.state.course?.teaser && (

  <div className=" flexcc video-container mb-3">
    {/* {console.log('object', this.state.course)} */}
            <video  controlsList="nodownload"  poster={imageAddress(this.state.course?.teaser?.cover, 'video')} controls={true} ref={el => this.videoPlayer = el} src={imageAddress(this.state?.course?.teaser)} class=" radius-1" style={{ margin: "10px auto", maxWidth: 800 }} />
          
          </div>
             )}

          {this.state.lessons?.map((item, index) => {
            return (
              <>
                {item.locked ? (
                  <div key={index} className="col-xl-12 box-2 d-flex flexcb px-3 py-3 mb-2 ">
                    <div className="d-flex">
                      <div className="d-none d-lg-flex">
                        <p className=" pr-2  text-semibig">اسنک {index + 1}: </p>
                      </div>
                      <p style={{}} className="pr-2  text-semibig">
                        {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                      </p>
                    </div>

                    <div className=" flexcc ">
                      <p style={{ whiteSpace: 'nowrap' }} className="text-color-2 text-semibig">{msToHMS(item?.video?.duration ?? 0)} </p>

                      <img src="/images/icons/lock2.svg" className="pr-2 lock-icon"></img>
                    </div>

                  </div>
                ) : (
                  <Link href={"/snacks/" + item._id}>
                    <a className="">
                      <div key={index} className="col-xl-12 box-3 d-flex flexcb px-3 py-3 mb-2 ">
                        <div className="d-flex">
                          <div className="d-none d-lg-flex">
                            <p className=" pr-2  text-semibig">اسنک {index + 1}: </p>
                          </div>
                          <p style={{}} className="pr-2  text-semibig">
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

                )
                }

              </>
            )
          })}
          <>
            {/* <Collapsible open={this.state.snacksOpenStatus[index]}>
                        <div className=" box  pt-3 position-relative border-top-gray" style={{ flexDirection: "column", alignItems: "center" }}>
                            <div className="position-relative flexcc video-container">
                                <video onEnded={() => this.videoEnded(index)} onTimeUpdate={(e) => this.videoDurationChanged(e, index, item.duration)} ref={el => this["videoPlayer-" + index] = el} src="/videos/video-2.mp4" class=" radius-1" style={{ margin: "10px auto", maxWidth: 800 }} />
                                {this.state.currentVideo != index && (
                                    <div onClick={() => this.playVideo(index)} className="position-absolute top-0 left-0 flexcc w-100 h-100 radius-1">
                                        <img className="play-icon" src="/images/icons/video-circle1.svg" height={90} />
                                    </div>
                                )}
                            </div>

                            <div className="flexcb justify-content-center" >
                                <button onClick={() => this.fullScreen(index)} className="pl-5">
                                    <img src="/images/icons/maximize-2.svg" alt="" />
                                </button>

                                <p className="d-none d-lg-block p-2 text-color-2" style={{ width: 60 }}>
                                    {msToHMS(item.duration)}
                                </p>

                                <Slider className="text-color-1" style={{ maxWidth: "400px" }} aria-label="Volume" max={100} value={this.state.videoPercentage[index] ?? 0} onChange={(e) => this.sliderChanged(e, index, item.duration)} />

                                <p className="d-none d-lg-block pr-3 text-color-2 " style={{ width: 60 }}>
                                    {this.state.videoTimes[index] ? msToHMS(this.state.videoTimes[index]) : '00:00'}
                                </p>

                                <button>
                                    <img className="d-none d-lg-block p-2" src="/images/icons/note-favorite.svg" onClick={() => this.noteAction(index, item)} />
                                </button>


                                <button onClick={() => this.videoseek(index, +15)}>
                                    <img className=" pr-5" src="/images/icons/forward-15-seconds.svg" alt="" />
                                </button>

                                {this.state.currentVideo != index && (
                                    <button onClick={() => this.playVideo(index)}>
                                        <img className="" src="/images/icons/play-circle.svg" alt="" />
                                    </button>
                                )}

                                {this.state.currentVideo == index && (
                                    <button onClick={() => this.pauseVideo(index)}>
                                        <img className="" src="/images/icons/pause-circle.svg" alt="" />
                                    </button>
                                )}

                                <button onClick={() => this.videoseek(index, -15)}>
                                    <img className=" " src="/images/icons/backward-15-seconds.svg" alt="" />
                                </button>

                                {/* <button>
                                                <img className="pr-2" src="/images/icons/next.svg" alt="" />
                                            </button> */}
            {/* <button>
                                                <img className="" src="/images/icons/previous-2.svg" alt="" />
                                            </button> */}
            {/* </div>
                        </div>
                    </Collapsible> */}

          </>



          <NoteModal ref={el => this.NoteModal = el} currentTime={this.state.currentTime} noteVideo={this.state.noteVideo} videoseek={this.videoseek} currentLesson={this.state.currentLesson} />
        </main>

      </Configurer>
    )
  }
}
export default CourseContent 
