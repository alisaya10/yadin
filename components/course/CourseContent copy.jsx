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

    this.getOneCourse()

  }
  getOneCourse() {
    HttpServices.request('getOneCourse', {}, (fetchResult, fetchError) => {

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ info: fetchResult.info, data: fetchResult?.lessons })
    })


  }


  postWishList = (liked) => {


    let info = this.state.info
    info.liked = liked
    this.setState({ info })

    HttpServices.request('postWishList', { course: info._id, status: liked }, (fetchResult, fetchError) => {
      console.log('postWishList', fetchError)


      if (fetchError) {

        info.liked = !liked
        this.setState({ info })
        console.log(fetchError)
        return
      }
      console.log(fetchError)
      console.log('postWishlist', fetchResult)


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
          <div className="row m-0">
            {/* {this.state.info?.map((item, index) => {
                            return ( */}
            <div className="mt-4 col-12 mb-4 p-0">
              <div className="box pt-4 px-4 h-100">
                <div className=" row m-0">
                  <div className="col-12 col-xl-3 p-0">
                    <div className=" flexcc position-relative">
                      <img className="radius-1" src={imageAddress(this.state.info?.image)} style={{ minWidth: '10px', objectFit: "cover" }} />
                      <img className="radius-1 position-absolute" src="/images/icons/video-circle.png" />
                    </div>
                  </div>
                  <div className="w-100 col-12 col-xl-9">
                    <div className="flexcb">
                      <div className="pt-3">
                        <div className="pb-1">
                          <h2 className="text-ultra-big text-color-1">{this.state.info?.title}</h2>
                        </div>
                        <div className="d-flex pb-4 text-big">
                          <p className="text-color-1 pl-1">استاد : </p>
                          <p className="text-color-1">{this.state.info?.teacher?.name}</p>
                        </div>
                        {/* <div className="d-flex pb-4 text-semibig">
                                                    <p className="text-color-2 pl-1"> دسته‌بندی یادین :</p>
                                                    <p className="text-color-2">{this.state.info?.categories}</p>
                                                </div> */}
                      </div>

                      <div className="" style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end" }}>
                        {this.props.user && this.props.user.loggedin && (
                        <div className="d-flex pb-4">
                          <p className="text-color-2 pl-2">علاقه‌مندی</p>
                          {this.state.info?.liked ? (
                            <button className="p-0" onClick={() => this.postWishList(false)}>

                              <img className="" src="/images/icons/heart-2.svg" />
                            </button>
                          ) : (
                            <button className="p-0" onClick={() => this.postWishList(true)}>

                              <img className="" src="/images/icons/heart-full.svg" />
                            </button>
                          )}


                        </div>
                        )}

                        <div className="flexc pb-4 text-semibig">
                          <p className="text-color-1 pl-2">امتیاز :</p>
                          <p className="text-color-1 pl-2 ">{this.state.info?.rate}</p>
                          <img src="/images/icons/star.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-3">
                  <p className="text-color-2">{this.state.info?.description}</p>
                </div>

                <div className="row m-0 pt-2">

                  <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4" >
                    <img className="pl-3" src="/images/icons/play-cricle.svg" />
                    <p className="text-color-2 pl-1">{this.state.data?.length}</p>
                    <p className="text-color-2">اسنک</p>
                  </div>

                  <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4">
                    <img className="pl-3" src="/images/icons/video-play.svg" />
                    <p className="pl-1 text-color-2">مجموع‌اسنک‌ها :</p>
                    <p className="text-color-2">{this.state.data?.length}</p>
                  </div>

                  <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4 justify-content-xl-center" >
                    <img className="pl-3" src="/images/icons/timer.svg" />
                    <p className="pl-1 text-color-2">زمان‌انجام تمارین :</p>
                    <p className="text-color-2">{this.state.info?.practiceTime}</p>
                  </div>

                  {/* <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4 justify-content-xl-end" >
                                        <img className="pl-3" src="/images/icons/cup.svg" />
                                        <p className="pl-1 text-color-2">سطح یادین :</p>
                                        <p className="text-color-2">{this.state.info?.level}</p>
                                    </div> */}

                </div>
              </div>
            </div>
            {/* )
                        })} */}



            <div className=" col-12 col-md-8 col-lg-8 p-0">
              <div className=" box px-3 pb-3">
                <h2 className="p-3 border-bottom-gray text-color-1 text-big font-light" >در حال مشاهده این اسنک بودید.</h2>

                <div className="row m-0 ">
                  <div className="col-12 col-xl-4 pt-3 flexcc " >
                    <div className="position-relative flexcc">
                      <img src="/images/Rectangle 8586.png" class=" radius-1" style={{ width: "100%" }} />
                      <div className="position-absolute top-0 left-0 flexcc w-100 h-100 radius-1" style={{ background: 'linear-gradient(to top, #00000050, #00000010)' }}>
                        <img src="/images/icons/video-circle.png" height={90} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 d-flex justify-content-center text-center text-xl-right" style={{ flexDirection: "column" }}>
                    <div>
                      <h3 className="font-light text-color-1">اسنک ۱: تیم سازی چیست؟</h3>
                      <p className="text-color-2 text-small ">
                        مشاهده شده: ۱۵ دقیقه  |   کل اسنک: ۳۰ دقیقه
                      </p>
                    </div>

                    <div className="">
                      <button className=" btn-primary main-color-1 mt-3" style={{ maxWidth: "250px" }}>ادامه مشاهده</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 col-md-4 pl-0 pr-0 pr-md-3">
              <div className="box px-3 pb-3">
                <h2 className="pt-3 pb-2 border-bottom-gray text-color-1 text-semi-big font-light" >میزان پیشرفت</h2>
                <div className="text-color-2 ">
                  <p className="pb-3">مشاهده شده: ۱۵ دقیقه</p>
                  <p className="pb-3">۱ اسنک مشاهده شده</p>
                  <p>۹ اسنک باقی مانده</p>
                </div>
                {/* chart */}
              </div>

            </div>
          </div>


          {this.state.data?.map((item, index) => {
            return (

              <div className="box px-3 py-3">
                <div className="d-none d-lg-flex flexcb w-100">
                  <div className="d-none d-sm-flex flex-3 d-flex text-color-1 font-light text-semibig pl-0" style={{ minWidth: "35%", whiteSpace: 'nowrap' }}>
                    <p className="">اسنک {index + 1}  :  </p>
                    <p>{item.title}</p>
                  </div>

                  <div className="d-none d-sm-flex flexcb" style={{ width: "50%" }}>
                    <p className=" text-color-2 nowrap">{item.duration} دقیقه</p>
                  </div>

                  <div className="d-none d-sm-flex flexcb">
                    <div className=" flexcc flex-1">
                      <button onClick={() => this.changeOpenStatus(item, index)} className="btn-primary5 text-color-2 text-normal flexcc">
                        <img src="/images/icons/arrow-down.svg" className={"ml-2 transition-all  white " + (this.state.snacksOpenStatus[index] ? 'rotate-180' : '')}></img>
                        <p className="nowrap">مشاهده جزئیات</p>
                      </button>
                    </div>

                    {/* {this.state.like && (
                                            <button className="pr-4" onClick={() => this.postWishlist(false)}>
                                                <img className="" src="/images/icons/heart-2.svg" />
                                            </button>
                                        )}

                                        {!this.state.like && (
                                            <button className="pr-4" onClick={() => this.postWishlist(true)} >
                                                <img className="" src="/images/icons/heart-full.svg" />
                                            </button>
                                        )}
                                        <img src="/images/icons/eye.svg" className="pr-4"></img> */}
                    <img src="/images/icons/lock.svg" className="pr-5"></img>
                  </div>
                </div>

                {/* FOR MOBILE */}
                <div className=" d-lg-none ">

                  <div className="row m-0">
                    <div className=" col-12 col-md-6 d-flex text-color-1 font-light text-normal " style={{ minWidth: "150px", maxWidth: "300px" }}>
                      <p className="">اسنک {index + 1}  :  </p>
                      <p>{item.name}</p>
                    </div>

                    <div className="col-12 col-md-6   pt-3 pt-md-0 ">
                      <div className=" flexc m-0 justify-content-start justify-content-md-end">
                        <div className="  flexcc " style={{}}>
                          <p className=" text-color-2 nowrap">{item.duration} دقیقه</p>
                        </div>

                        <div className="  d-flex">
                          {/* {this.state.like && (
                                                        <button className="pr-3" onClick={() => this.postWishlist(false)}>
                                                            <img className="" src="/images/icons/heart-2.svg" />
                                                        </button>
                                                    )}

                                                    {!this.state.like && (
                                                        <button className="pr-3" onClick={() => this.postWishlist(true)} >
                                                            <img className="" src="/images/icons/heart-full.svg" />
                                                        </button>
                                                    )} */}
                          {/* <img src="/images/icons/eye.svg" className="pr-3"></img> */}
                          <img src="/images/icons/lock.svg" className="pr-3"></img>
                        </div>
                      </div>
                    </div>


                    <div className=" col-12 flexcc px-3 pt-3">

                      <button onClick={() => this.changeOpenStatus(item, index)} className="btn-primary5 text-color-2 text-smaller flexcc" style={{ maxWidth: "300px" }}>

                        <img src="/images/icons/arrow-down.svg" className={"ml-2 transition-all white " + (this.state.snacksOpenStatus[index] ? 'rotate-180' : '')}></img>
                        <p className="text-small">مشاهده جزئیات</p>
                      </button>
                    </div>

                  </div>
                </div>




                <Collapsible open={this.state.snacksOpenStatus[index]}>
                  <div className=" box  pt-3 position-relative border-top-gray" style={{ flexDirection: "column", alignItems: "center" }}>
                    <div className="position-relative flexcc video-container">
                      <video  controlsList="nodownload" onEnded={() => this.videoEnded(index)} onTimeUpdate={(e) => this.videoDurationChanged(e, index, item.duration)} ref={el => this["videoPlayer-" + index] = el} src="/videos/video-2.mp4" class=" radius-1" style={{ margin: "10px auto", maxWidth: 800 }} />
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
                    </div>
                  </div>
                </Collapsible>
              </div>
            )
          })}




          <NoteModal ref={el => this.NoteModal = el} currentTime={this.state.currentTime} noteVideo={this.state.noteVideo} videoseek={this.videoseek} currentLesson={this.state.currentLesson} />
        </main>

      </Configurer>
    )
  }
}
export default CourseContent 
