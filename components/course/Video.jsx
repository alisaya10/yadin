import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
// import HttpService from "../../utils/Http.services";
import Link from "next/link";
import { NavItem } from "react-bootstrap";
import HttpServices from "../../utils/Http.services";
import NoteModal from "../modals/NoteModal";
import Slider from '@mui/material/Slider';
import { imageAddress, msToHMS, postWishList } from "../../utils/useful";
import OneNoteModal from "../modals/OneNoteModal";

class Video extends React.Component {

  state = {
    postDone: false,
    data: [],
    info: {},
    like: true,
    videoTime: this.props.time ?? 0,
    // currentTime: this.props.time ?? 0,
    videoPercentage: ((this.props?.time) / (this.props?.data?.video?.duration)) * 100 ?? 0,
    parts: [
      { name: 'تیم سازی؟', duration: '30' },
      { name: 'تیم حرفه ای', duration: '30' },
      { name: 'حل مشکلات', duration: ')30' },
      { name: 'تیم چیست؟', duration: '30' },
      { name: 'مدیریت تیم', duration: '30' },
      { name: 'مشورت', duration: '30' },
    ],
    videoIsWatched: '',
  }


  componentDidMount = () => {
    if (this.props.time && this.props.time != null) {
      this.setState({ videoTime: this.props.time, currentTime: this.props.time })
    }
    // else{
    //   this.setState({videoTime : 0, currentTime:0})

    // }
    this.fetchData()
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
  // componentDidUpdate(){
  //   this.fetchData()
  // }

  sliderChanged = (e, duration) => {
    // console.log(e.target.value)
    let percentage = e.target.value

    let videoPercentage = this.state.videoPercentage
    videoPercentage = percentage

    // this['videoPlayer-'+index].pause()

    this.videoPlayer.currentTime = duration * percentage / 100

    this.videoPlayer.play()

    this.setState({ videoPercentage })

  }

  playVideo = () => {
    // if (this.state.videoTime != 0 && this.props?.time != 0 && this.props?.time != null) {
    //   this.videoPlayer.currentTime = (this.props?.time)
    // }
    // if (this.state.videoTime != 0 && this.props?.time == null) {
    // }
    this.videoPlayer.currentTime = (this.state.videoTime)
    this.videoPlayer.play()
    if (this.state.currentVideo != null) {
      this.videoPlayer.pause()
    }
    this.setState({ currentVideo: true })
  }

  pauseVideo = () => {
    this.videoPlayer.pause()
    this.setState({ currentVideo: null })
    HttpServices.request('videoPaused', { course: this.props.course._id, lesson: this.props.data._id, currentLessontime: this.state.videoTime }, (fetchResult, fetchError) => {
      // console.log('videoPaused', fetchError)
      if (fetchError) {
        // console.log(fetchError)
        return
      }
      // console.log(fetchError)
      // console.log('videoPaused', fetchResult)
    })
  }

  videoDurationChanged = (e, duration) => {
    // console.log("sdfdsad", e)
    // console.log(e.target.currentTime)

    let time = e.target.currentTime
    let videoTime = this.state.videoTime
    let videoPercentage = this.state.videoPercentage


    if (!videoTime && videoTime != 0) {
      videoTime = 0
    }

    let percentage = time / duration * 100
    // console.log(percentage)
    videoTime = time
    videoPercentage = percentage
    this.setState({ videoTime, videoPercentage })
    if (this.state.videoPercentage > 95) {
      if (!this.state.videoIsWatched) {
        HttpServices.request('videoEnded', { course: this.props.course , lesson: this.props.data._id }, (fetchResult, fetchError) => {
          // console.log('videoEnded', fetchError)


          if (fetchError) {

            // console.log(fetchError)
            return
          }
          this.setState({ videoIsWatched: true })
          // console.log(fetchError)
          // console.log('videoEnded', fetchResult)


        })
      }
    }

  }


  fetchData = () => {
    // console.log(this.props.currentLesson)
    this.setState({ info: [], isLoading: true })
    HttpServices.request('getNotes', { filter: { lesson: this.props.data?._id } }, (fetchResult, fetchError) => {

      this.setState({ isLoading: false })

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info('fetchResulttttttttttttttt', fetchResult)
      this.setState({ info: fetchResult.info })
    })
  }

  noteAction = (item) => {
    this.videoPlayer.pause()
    let time = this.videoPlayer.currentTime ?? (this.state.currentTime ?? 0)
    console.log("timeeeeeeee", time)
    // console.log(item)
    let noteVideo = true
    let currentLesson = item
    this.setState({ noteVideo, currentVideo: null, currentTime: time, currentLesson }, () => {
      this.NoteModal.showModal()
    })
  }

  postNotif = (des, title, noteTime, id) => {
    let data = {
      description: des.trim(),
      title: title,
      noteTime: noteTime,
      lesson: this.props?.data?._id,
      course: this.props.course?._id,

      _id: id
    }

    console.log('data', data)

    if (data && data.description != '' && data.description != null) {
      HttpServices.request('postNote', data, (fetchResult, fetchError) => {

        // this.setState({ description: '' })

        if (fetchError) {

          return console.log('false', fetchError)
        }

        this.fetchData()

        if (fetchResult) {
          // console.log('successful', fetchResult)
          this.NoteModal.modal.hideModal()
          this.setState({ postDone: true })
        }
      })
    }

  }

  videoEnded = () => {
    let videoTime = this.state.videoTime
    let videoPercentage = this.state.videoPercentage


    videoTime = null
    videoPercentage = null

    this.setState({ videoTime, videoPercentage, currentVideo: null })

  }

  videoseek = (seekTime, finalTime) => {

    // console.log(index)
    // console.log(this.videoPlayer)
    let time = this.videoPlayer.currentTime
    time = finalTime ?? (time + seekTime)
    this.videoPlayer.currentTime = time
    this.videoPlayer.play()
    this.setState({ currentVideo: true })
  }

  fullScreen = () => {
    let elem = this.videoPlayer

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

  OneNoteAction = (prop) => {
    this.OneNoteModal.showModal()
    this.setState({ note: prop })
  }
  playbackRate = (prop) => {
    this.videoPlayer.play()
    this.videoPlayer.playbackRate = prop
    this.setState({ currentVideo: true })

  }


  //   componentDidMount() {


  //     console.log("Here")
  //     HttpServices.request('getNotes', {}, (fetchResult, fetchError) => {

  //         console.log(fetchError)
  //         console.log(fetchResult)

  //         if (fetchError) {
  //             return
  //         }
  //         console.info(fetchResult)
  //         this.setState({ info: fetchResult.info, data: fetchResult?.notes })
  //     })


  // }



  render() {
    let item = this.props.data
    // console.log('this.state.postDone', this.videoPlayer?.playbackRate)
    return (

      <>
        <div className=" box p-3" style={{ position: 'sticky', top: 82 }}>
          <div className="position-relative flexcc video-container">
            <video  controlsList="nodownload" onClick={() => this.pauseVideo()} onEnded={() => this.videoEnded()} poster={imageAddress(item.video?.cover, 'video')} onTimeUpdate={(e) => this.videoDurationChanged(e, item.video?.duration)} ref={el => this.videoPlayer = el} src={imageAddress(item.video)} class=" radius-1" style={{ margin: "10px auto", maxWidth: 800 }} />
            {!this.state.currentVideo && (
              <div onClick={() => this.playVideo()} className="position-absolute top-0 left-0 flexcc w-100 h-100 radius-1">
                <img className="play-icon" src="/images/icons/video-circle1.svg" height={90} />
              </div>
            )}
          </div>

          <div className="flexcb justify-content-center pb-1" >
            <button onClick={() => this.fullScreen()} className="pl-5">
              <img src="/images/icons/maximize-2.svg" alt="" />
            </button>

            <p className="d-none d-lg-block p-2 text-color-2" style={{ width: 60 }}>
              {msToHMS(item?.video?.duration)}
            </p>



            <div className="position-relative w-100" style={{ maxWidth: "400px" }}>
              <Slider className="text-color-1 w-100" aria-label="Volume" max={100} value={this.state.videoPercentage ?? 0} onChange={(e) => this.sliderChanged(e, item?.video?.duration)} />

              {Array.isArray(this.state.info) && this.state.info?.map((prop, index) => {
                return (

                  <div className="position-absolute cursor-pointer" style={{ top: "48%", left: `${(((prop.noteTime) / item?.video.duration) * 100)}%` }}>
                    <div onClick={() => this.OneNoteAction(prop)} style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderBottom: "12px solid #C97EF5", }}></div>
                  </div>
                )
              })}
            </div>



            <p className="d-none d-lg-block pr-3 text-color-2 " style={{ width: 60 }}>
              {this.state.videoTime ? msToHMS(this.state.videoTime) : '00:00'}
            </p>

            <button>
              <img className="d-none d-lg-block p-2" src="/images/icons/note-favorite.svg" onClick={() => this.noteAction(item)} />
            </button>

            <button className="px-3">
              {this.videoPlayer?.playbackRate == 1 && (
                <div onClick={() => this.playbackRate(1.5)}>

                  <p style={{color:"#fff", fontSize: '15px'}}>
                    1x
                    </p> 
                </div>
              )}
              {this.videoPlayer?.playbackRate == 1.5 && (
                <div onClick={() => this.playbackRate(2)}>

                  <p style={{color:"#fff", fontSize: '15px'}}>
                    1.5x
                    </p> 
                </div>
              )}
              {this.videoPlayer?.playbackRate == 2 && (
                <div onClick={() => this.playbackRate(1)}>

                  <p style={{color:"#fff", fontSize: '15px'}}>
                    2x
                    </p> 
                </div>
              )}
            </button>

            <button className="" onClick={() => this.videoseek(+15)}>
              <img className="" src="/images/icons/forward-15-seconds.svg" alt="" />
            </button>

            {!this.state.currentVideo && (
              <button onClick={() => this.playVideo()}>
                <img className="" src="/images/icons/play-circle.svg" alt="" />
              </button>
            )}

            {this.state.currentVideo && (
              <button onClick={() => this.pauseVideo()}>
                <img className="" src="/images/icons/pause-circle.svg" alt="" />
              </button>
            )}

            <button onClick={() => this.videoseek(-15)}>
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

        <NoteModal closeModal={() => this.NoteModal.modal.hideModal()} ref={el => this.NoteModal = el} currentTime={this.state?.videoTime} currentLesson={this.state?.currentLesson} course={this.props?.course} postNotif={this.postNotif} fetchData={this.fetchData} notes={this.state.info} postDone={this.state.postDone} />

        <OneNoteModal closeModal={() => this.OneNoteModal.modal.hideModal} ref={el => this.OneNoteModal = el} note={this.state.note} fetchData={this.fetchData} postNotif={this.postNotif} postDone={this.state.postDone} />

      </>
    );
  }
}

export default Video;