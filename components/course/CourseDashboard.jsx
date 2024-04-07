import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import ReviewsModal from "../modals/ReviewsModal";
import CommentModal from "../modals/CommentModal";
import HttpServices from "../../utils/Http.services";
import { imageAddress } from "../../utils/useful";
import { msToHMS } from "../../utils/useful";
import Router from "next/router";
import { Thumbs } from "swiper";
import ReactStars from "react-stars";
import { translate } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

class CourseDashboard extends React.Component {
  state = {
    like: true,
    isLoading: false,
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

    notifications: [
      { title: "نمره تمرین شماره 2 شما 8/10 است.", type: "تمرین" },
      {
        title: "محتوای بخش فایل‌های یادین به‌روزرسانی شد.",
        type: "محتوای یادین",
      },
      { title: "نمره آزمون شماره 2 شما 7/10 است.", type: "آزمون" },
      { title: "نمره تمرین شماره 3 شما 8/10 است.", type: "تمرین" },
    ],

    exams: [
      { title: "تمرین شماره 1", type: "اسنک 2" },
      { title: "آزمون شماره 2", type: "اسنک 3" },
      { title: "تمرین شماره 3", type: "اسنک 5" },
      { title: "آزمون شماره 4", type: "اسنک 6" },
      { title: "تمرین شماره 2", type: "اسنک 8" },
    ],

    revviews:
    {
      name: "علی مجیدی‌نژاد",
      image: "/images/icons/1.png",
      content:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
      rate: "4.4",
      q1: "رضایت کلی از محتوای یادین",
      q2: "رضایت از فن بیان استاد",
      q3: "رضایت از سرعت پاسخ‌گویی استاد",
      q4: "رضایت از جذابیت بیان استاد (لحن و...)",
      q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای یادین",
      q1r: "4.5",
      q2r: "4",
      q3r: "5",
      q4r: "3.5",
      q5r: "5",
    }

    ,

    question: [
      {
        image: "/images/icons/1.png",
        title: "قرارگیری اعضا در جایگاه مناسب",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون...",
      },
      {
        image: "/images/icons/2.png",
        title: "انتخاب عضو",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون...",
      },
      {
        image: "/images/icons/3.png",
        title: "مدیریت تیم",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون...",
      },
    ],
    reviews: []
  };

  componentDidMount() {
    console.log('-----------------------', this.props.course);
    let id = Router.query.id
    // this.setState({ id }, () => {
      // this.getQuizes()
      // this.getPractices()
      // this.getOneCourse()
      this.getCurrentLesson()
      // this.getTeacher()

      // this.getAllReviews()
      this.getOneUserCourse()
      this.getLearningPath()

      this.getTeacher()
      this.getQuizes()
      this.getPractices()
      this.getAllReviews()
      this.getAllComments()
    // })

    // console.log('sdjfsndkvnsjdkvndsjkvnsd',this.state.course)

  }

  componentDidUpdate(PrevProp, Prevstate) {
    // console.log('looooadddddddddd',this.state.isLoading, Prevstate.isLoading  );
    // if (this.state.isLoading != Prevstate.isLoading) {
   
      // this.getOneUserCourse()

    // }
  }

  postWishList = (liked) => {

    console.log("liked", liked);


    let course = this.props.course
    course.liked = liked
    this.props.setData('course', course, () => {

      // this.setState({ course })

      HttpServices.request('postWishList', { course: course._id, status: liked }, (fetchResult, fetchError) => {
        console.log('postWishList', fetchError)


        if (fetchError) {

          course.liked = !liked
          this.props.setData('course', course, () => {

            // this.setState({ course })
          })
          console.log(fetchError)
          return
        }
        console.log(fetchError)
        console.log('postWishList', fetchResult)


      })
    })

  }

  handlelike = () => {
    this.setState({ like: !this.state.like })
  }
  getQuizes = () => {
    HttpServices.request('getQuizes', { filter: { course: this.props.course._id } }, (fetchResult, fetchError) => {

      console.log("getQuizes")
      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.log(fetchResult)
      this.setState({ quizes: fetchResult.info })
    })
  }
  getPractices = () => {
    HttpServices.request('getPractices', { filter: { course: this.props.course._id } }, (fetchResult, fetchError) => {

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ practices: fetchResult.info, totalPractices: fetchResult?.count })

    })

  }
  getAllReviews = () => {
    HttpServices.request('getAllReviews', { filter: { course: this.props.course?._id, verified: '1' } }, (fetchResult, fetchError) => {

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      // console.info('reeeeeeeeeeeeeeeevvv', fetchResult)
      this.setState({ reviews: fetchResult.info })

    })

  }
  getAllComments = () => {
    HttpServices.request('getAllComments', { filter: { course: this.props.course._id, status: '1' } }, (fetchResult, fetchError) => {

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      // console.info(fetchResult)
      this.setState({ comments: fetchResult.info })
      // console.log("liked", this.state.comments.writer?.name);


    })

  }
  getTeacher = () => {

    // console.log("id", this.state.course?.teacher._id)

    HttpServices.request('getTeacher', { id: this.props.course?.teacher?._id }, (fetchResult, fetchError) => {

      console.log(fetchResult);
      if (fetchError) {
        return console.log("fetch error", fetchError)
      }
      if (fetchResult) {
        console.info("iddddddddddddddddd", fetchResult)
      }

      this.setState({ teacher: fetchResult.info, teacherCourses: fetchResult.courses })

    })

  }

  postUserCourse() {
    // console.log(this.state.id)
    HttpServices.request('postUserCourse', { course: this.props.course?._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info('feeeeeeeeeeeeeeeeesh', fetchResult)
      this.setState({
        userCourse: fetchResult?.info
      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }

  getOneUserCourse() {
    // console.log(this.props.course?._id)
    HttpServices.request('getOneUserCourse', { course: this.props.course?._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        userCourse: fetchResult?.info,

      },()=>{
        
      })
    })


  }
  getCurrentLesson() {
    // console.log(this.props.course?._id)
    HttpServices.request('getCurrentLessonCourse', { course: this.props.course?._id }, (fetchResult, fetchError) => {

      console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', fetchResult)
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
  removeUserCourse() {
    console.log(this.props.course?._id)
    HttpServices.request('removeUserCourse', { course: this.props.course?._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        userCourse: null,

      })
    })


  }
  addToLearningPath() {
    // console.log(this.props.course?._id)
    HttpServices.request('addToLearningPath', { course: this.props.course?._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info('feeeeeesh', fetchResult)
      // this.setState({
      //   path: fetchResult?.info
      // })
      // , lessons: fetchResult?.lessons,
      //     totalDuration: fetchResult?.totalDuration, totalPracticeDuration: fetchResult?.totalPracticeDuration
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  removeFromLearningPath() {
    // console.log(this.props.course?._id)
    HttpServices.request('removeFromLearningPath', { course: this.props.course?._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
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
  getLearningPath() {
    // console.log(this.props.course?._id)
    HttpServices.request('getLearningPath', {}, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)

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

  changePge = () => {
    // this.props.changeStage('homework')
    this.changePage("homework")
  }

  changePage = (page) => {
    console.log('tp1')
    let id = Router.query.id
    let path = "/course-info/" + id + "/" + page;
    Router.push({ pathname: path });
    if (this.mobileMenuModal) {
      this.mobileMenuModal.hideModal();
    }
  };

  render() {
    let courseInfo = this.state.courseInfo;
    let notifications = this.state.notifications;
    let exams = this.state.exams;
    let reviews = this.state.reviews;
    return (
      <Configurer
        settingsInfo={{
          headerTitle: "Course Dashboard",
          button: { goBack: true },
        }}
        title={"Course Dashboard"}
        description={"Course Dashboard"}
        className=""
        style={{ padding: '0px 3% 0px 3%' }}
        changeOnUnmount={true}
      >
        <div className="row m-0">

          <div className="flexc mt-3 d-md-none">
            <div className="">
              <button onClick={() => this.props.openMobileMenu()} className="flexcc">
                <img className=" " src="/images/icons/menu-3.svg" alt="" />
              </button>
            </div>
            <div>
              <p className="white">داشبورد یادین</p>
            </div>
          </div>

          {/* نمای کلی */}
          <div className="mt-0 col-12 mb-4 p-0">
            <div className="box pt-4 px-4 h-100" style={{}}>
              <div className=" row w-100 m-0" style={{ justifyContent: 'space-between' }}>
                <div className="w-100 col-12 col-xl-3 p-0">
                  <div className=" flexcc position-relative">
                    <img className="radius-1" src={imageAddress(this.props.course?.image, null, 'thumb')} style={{ minWidth: '10px', objectFit: "cover" }} />
                    {/* <img className="radius-1 position-absolute" src="/images/icons/video-circle.png" /> */}
                  </div>
                </div>
                <div className="w-100 col-12 col-xl-4 py-4 py-lg-0">
                  <div className="">
                    <div className="pb-1">
                      <p className="text-ultra-big font-bold text-color-1 m-0">{this.props.course?.title}</p>
                    </div>
                    <div className="d-flex pb-4 text-big font-bold pt-2">
                      <p className="text-color-1 pl-1">استاد : </p>
                      <p className="text-color-1">
                        {this.props?.course?.teacher?.fullname}
                      </p>

                    </div>

                    {/* <div className="d-flex pb-4 text-semibig">
                        <p className="text-color-2 pl-1"> دسته‌بندی یادین :</p>
                        {this.state.course?.categories?.map((prop, index) => {
                          <p className="text-color-2 ml-2">{prop.name}</p>
                        })}
                      </div> */}
                  </div>
                </div>
                <div className="w-100 col-12 col-xl-4 ">
                  <div className="justify-content-start justify-content-lg-end" style={{ display: 'flex' }}>


                    <div
                      className="w-100"
                      style={{
                        // display: "inline-flex",
                        // flexDirection: "column",
                        // alignItems: "flex-end",
                      }}>

                      {this.props.user && this.props.user.loggedin && (
                        <div className="d-flex mt-3 pb-4">

                          <p className="text-color-2 pl-2">علاقه‌مندی</p>
                          {/* {console.log('rrrrrrrrrrrrrrrrrbtnyf', this.state.course)} */}
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
                      <div className="flexc pb-4 text-semibig">
                        <p className="text-color-1 pl-2">امتیاز :</p>

                        <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                          {this.props.course?.score && (
                            <p className="text-color-1" >{(this.props.course?.score).toFixed(1)}</p>
                          )}
                          <img src="/images/star-2.svg" className="mr-2" />
                        </div>

                        {/* <ReactStars
                          count={5}
                          size={20}
                          emptyIcon={<i className="far fa-star"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          // activeColor="#C97EF5"
                          color2={'#C97EF5'}

                          edit={false}
                          value={this.state.course?.score}
                          isHalf={false}

                        /> */}
                      </div>

                      {/* {(this.state.course?.price == 0 && this.state.userCourse) && (

                        <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => { this.removeFromLearningPath(), this.removeUserCourse() }}>
                          پاک کردن از یادین های من

                        </button>
                      )}

                      {/* {(this.props.course?.price == 0 && !this.state.userCourse) && ( */}
                      {/* <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => { this.addToLearningPath(); this.postUserCourse() }}>
                          افزودن به یادین های من

                        </button> */}


                      {/* {(this.state.course?.price > 0 && !this.state.path.course.includes(this.state.id)) && (
                        <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => { this.addToLearningPath() }}>
                          افزودن به مسیر یادگیری

                        </button>

                      )}
                      {(this.props.course?.price > 0 && this.state.path.course.includes(this.state.id)) && (
                        <button className="btn-primary  main-color-1 " style={{ maxWidth: "200px" }} onClick={() => this.removeFromLearningPath()}>
                          حذف از مسیر یادگیری

                        </button>

                      )} */}
                      {/* <div >
                        <div className='rate-user d-flex align-items-center justify-content-between'>
                          <p style={{ color: '#A0A0A0', marginLeft: 20 }}>
                            {this.state.revviews.q1}
                          </p>
                          <ReactStars
                            count={5}
                            size={20}
                            emptyIcon={<i className="far fa-star"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ee5050"
                            color2={'#C97EF5'}


                            edit={false}
                            value={this.state.course?.rating[0]?.total?.star}
                            isHalf={false}

                          />

                        </div>
                        <div className='rate-user d-flex align-items-center justify-content-between'>
                          <p style={{ color: '#A0A0A0', marginLeft: 20 }}>
                            {this.state.revviews.q2}
                          </p>
                          <ReactStars
                            count={5}
                            size={20}
                            emptyIcon={<i className="far fa-star"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            // activeColor="#C97EF5"
                            color2={'#C97EF5'}

                            edit={false}
                            value={this.state.course?.rating[1]?.total?.star}
                            isHalf={false}

                          />

                        </div>
                        <div className='rate-user d-flex align-items-center justify-content-between'>
                          <p style={{ color: '#A0A0A0', marginLeft: 20 }}>
                            {this.state.revviews.q3}
                          </p>
                          <ReactStars
                            count={5}
                            size={20}
                            emptyIcon={<i className="far fa-star"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            // activeColor="#C97EF5"
                            color2={'#C97EF5'}

                            edit={false}
                            value={this.state.course?.rating[2]?.total?.star}
                            isHalf={false}

                          />

                        </div>
                        <div className='rate-user d-flex align-items-center justify-content-between'>
                          <p style={{ color: '#A0A0A0', marginLeft: 20 }}>
                            {this.state.revviews.q4}
                          </p>
                          <ReactStars
                            count={5}
                            size={20}
                            emptyIcon={<i className="far fa-star"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            // activeColor="#C97EF5"
                            color2={'#C97EF5'}

                            edit={false}
                            value={this.state.course?.rating[3]?.total?.star}
                            isHalf={false}

                          />

                        </div>
                        <div className='rate-user d-flex align-items-center justify-content-between'>
                          <p style={{ color: '#A0A0A0', marginLeft: 20 }}>
                            {this.state.revviews.q5}
                          </p>
                          <ReactStars
                            count={5}
                            size={20}
                            emptyIcon={<i className="far fa-star"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            // activeColor="#C97EF5"
                            color2={'#C97EF5'}

                            edit={false}
                            value={this.state.course?.rating[4]?.total?.star}
                            isHalf={false}

                          />

                        </div>
                      </div> */}
                    </div>

                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-color-2" style={{ lineHeight: 2 }}>{this.props?.course?.description}</p>
              </div>


              <div className="row m-0 pt-2">

                <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4" >
                  <img className="pl-3" src="/images/icons/play-cricle.svg" />
                  <p className="text-color-2">{this.props?.lessons?.length} اسنک</p>
                </div>

                <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4">
                  <img className="pl-3" src="/images/icons/video-play.svg" />
                  <p className="text-color-2">مجموع‌اسنک‌ها :</p>
                  <p className="text-color-2"> {msToHMS(this.props?.totalDuration ?? 0)} دقیقه</p>
                </div>

                <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4 justify-content-xl-center" >
                  <img className="pl-3" src="/images/icons/timer.svg" />
                  <p className="text-color-2">زمان‌انجام تمارین :</p>
                  <p className="text-color-2">{this.props?.totalPracticeDuration} دقیقه</p>
                </div>

                <div className="d-flex col-12 col-xl-3 col-sm-6 p-0 pt-4 justify-content-xl-end" >
                  <img className="pl-3" src="/images/icons/cup.svg" />
                  <p className="text-color-2">سطح یادین :</p>
                  <p className="text-color-2">{translate(this.props.course?.level)}</p>
                </div>

              </div>
            </div>
          </div>

          {/* اسنک درحال مشاهده */}
          <div className="col-12 mb-4 col-xl-12 p-0 pl-xl-3">
            {this.state?.cLesson?.currentLesson && this.state?.cLesson?.currentLesson != undefined && this.state?.cLesson?.currentLesson != null ? (
              <>
                <div className="box p-4 h-100">
                  <div>
                    <p className="border-bottom-gray pb-4 text-semibig text-color-1">
                      در حال مشاهده این اسنک بودید.
                    </p>
                  </div>
                  <div>
                    <div className="p-4 flexcc position-relative">
                      {console.log("lessonImage", this.state.cLesson.currentLesson)}
                      <img className="radius-1" src={imageAddress(this.state.cLesson?.currentLesson?.video.cover, 'video')} style={{ minWidth: '10px', objectFit: "cover" }} />
                      <img className="radius-1 position-absolute" />
                    </div>

                    <div className="flexcb">
                      <p className="text-color-2">{this.state.cLesson?.currentLesson?.title}</p>
                      <p className="text-color-2"> {msToHMS(this.state?.cLesson.currentLessontime ?? 0)}</p>
                    </div>

                    <div className="">
                      <button className=" btn-primary main-color-1 mt-3">
                        <Link href={"/snacks/" + this.state.cLesson?.currentLesson?._id + '?time=' + this.state.cLesson?.currentLessontime}>
                          <a>ادامه مشاهده</a>
                        </Link>
                      </button>
                    </div>
                    </div>

                  </div>
                </>

                ) : (
                  <>
                  <div  className="p-4">
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

          {/* اعلان ها */}
          {/* <div className="col-12 mb-4 col-xl-8 p-0 pr-xl-3">
            <div className="box p-4 h-100">
              <div className="flexcb border-bottom-gray pb-4">
                <div className="d-flex">
                  <p className="text-color-1 text-semibig">اعلان‌های جدید</p>
                  <p className="text-color-1">(6اعلان)</p>
                </div>
                <div className="d-flex">
                  <Link href="/course-info/notifications">
                    <a className="text-color-2 d-flex">
                      مشاهده همه
                      <img
                        className="pr-2"
                        src="/images/icons/arrow-left.svg"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <div className=" flexc">
                  <div className="col-6 col-sm-6 py-3">
                    <p className="text-color-1 pt-4">متن اعلان</p>
                  </div>
                  <div className="col-3 d-none d-sm-block flexc">
                    <p className="text-color-1 pt-4">نوع</p>
                  </div>
                  <div className="col-3">
                    <p></p>
                  </div>
                </div>

                <div>
                  {notifications.map((item, index) => {
                    return (
                      <div className="flexcc text-color-2">
                        <div className="col-6 col-sm-6 py-3">
                          <p>{item.title}</p>
                        </div>
                        <div className="col-3 d-none d-sm-block flexc">
                          <p>{item.type}</p>
                        </div>
                        <div
                          className="d-flex justify-content-end col-6 col-sm-3 p-0">
                          <button className="w-60">
                            <Link href="/course-info/notifications">
                              <p className=" btn-primary5 ">مشاهده</p>
                            </Link>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div> */}

          {/* درمورد استاد */}
          <div className="col-12 mb-4 col-xl-6 p-0 pl-xl-3">
            <div className="box p-4 h-100">
              <div className="flexcb border-bottom-gray pb-4">
                <p className="text-color-1 text-semibig">درمورد استاد</p>
                <div className="d-flex">
                  <Link href={"/prof/" + this.props.course?.teacher?._id}>
                    <a className="text-color-2 d-flex">
                      پروفایل استاد
                      <img
                        className="pr-2"
                        src="/images/icons/arrow-left.svg"
                      />
                    </a>
                  </Link>
                </div>

              </div>
              <div className="radius-1 row m-0">
                <div className="pt-4 p-0 col-12 col-sm-5">
                  <img className="radius-1 flexcc w-100" src={imageAddress(this.props.course?.teacher?.image, null, 'thumb')} />
                </div>
                <div className="col-12 col-sm-7 p-0 pt-4 pr-sm-4 justify-content-center">
                  <div className="py-2">
                    <p className="text-color-1">{this.props.course?.teacher?.name}</p>
                  </div>
                  <div className="flexc py-2">
                    <p className="text-color-2 pr-2">امتیاز : &nbsp;</p>

                    <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                      {this.props.course?.teacher?.rating.total.star && (
                        <p className="text-color-1" >{(this.props.course?.teacher.rating?.total?.star).toFixed(1)}</p>
                      )}
                      <img src="/images/star-2.svg" className="mr-2" />
                    </div>


                    {/* <p className="text-color-2 pr-1">
                      <ReactStars
                        count={5}
                        size={20}
                        emptyIcon={<i className="far fa-star"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        // activeColor="#C97EF5"
                        color2={'#C97EF5'}

                        edit={false}
                        value={Number(this.state.course?.teacher.rating?.total?.star)}
                        isHalf={true}

                      />
                    </p> */}
                    <p className="text-color-2 pr-1">
                      {/* {this.state.course?.teacher.review} */}
                    </p>
                  </div>
                  <div className="py-2">
                    <p className="text-color-2 pr-1">
                      {console.log('this.state.teacherCourses?.length',this.state.teacherCourses)}
                      تعداد یادین‌های استاد: {this.state.teacherCourses?.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <p className="text-color-2">
                  {this.state?.teacher?.description}
                </p>
              </div>
            </div>
          </div>

          {/* پرسش ها */}
          <div className="col-12 mb-4 col-xl-6 p-0 pr-xl-3 flex-sm-column">
            <div className="box p-4 h-100">
              <div className="flexcb border-bottom-gray pb-4">
                <p className="text-color-1 text-semibig">آخرین پرسش‌ها</p>
                <div className="d-flex">
                  {/* <Link href="/notifications">
                    <a className="text-color-2 d-flex">
                      مشاهده همه
                      <img
                        className="pr-2"
                        src="/images/icons/arrow-left.svg"
                      />
                    </a>
                  </Link> */}
                </div>
              </div>
              <div>
                <div>
                  {Array.isArray(this.state.comments) && this.state?.comments.map((item, index) => {
                    return (
                      <>
                      {item.status == '1' && (

                        <div className=" text-color-2 box-5 p-2 ">
                        <div className="flexc p-3 w-100">
                          <div>
                            <img className="radius-3 p-2" src={imageAddress(item.writer?.image, null, 'thumb')} height={40} width={40} style={{ border: '1px solid #ffffff20' }} />
                          </div>
                          <div className="px-3">
                            <div className="pb-3">
                              <p>{item.writer?.fullname}</p>
                            </div>
                            <div>
                              <span style={{ wordBreak: "break-all" }}>{item.body}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
              {/* <div style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
                <div className="pt-4 flexcc justify-content-end col-12 p-0">
                  <div className=" btn-primary5 flexcc col-12 col-sm-6 col-md-3 cursor-pointer" onClick={() => }>
                    <button className="flexcc py-2"><p color="#fff"></p></button>
                  </div>
                </div>
              </div> */}
              <div className="row m-0" >
                <div className="pt-4 flexcc justify-content-end col-12 p-0">
                  <div className=" btn-primary5 flexcc col-12 col-sm-6 col-md-3 cursor-pointer" onClick={() => this.CommentModal.modal.showModal()}>
                    <botton className="flexcc">ثبت پرسش جدید</botton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* تمارین و آزمون ها */}
          <div className=" col-12 mb-4 col-xl-6 p-0 pl-xl-3">
            <div className="box p-4 h-100">
              <div className="flexcb border-bottom-gray pb-4">
                <div className="d-flex">
                  <p className="text-color-1 text-semibig"> تمارین و آزمون‌ها</p>
                </div>
                <div className="d-flex" onClick={() => this.changePge()}>

                  {/* <Link href={"/course-info/" + _id + "/" + "homework"} */}
                  {/* // href="/course-info/homework" */}
                  {/* > */}
                  <a className="text-color-2 d-flex">
                    مشاهده همه
                    <img
                      className="pr-2"
                      src="/images/icons/arrow-left.svg"
                    />
                  </a>
                  {/* </Link> */}
                </div>
              </div>
              <div>
                <div className="flexc">
                  <div className="col-6 py-3 p-0">
                    <p className="text-color-1 pt-4">عنوان تمرین یا آزمون</p>
                  </div>
                  <div className="col-2 d-none d-sm-block py-3 flexc p-0">
                    <p className="text-color-1 pt-4">ارتباط</p>
                  </div>
                  <div className="col-4">
                    <p></p>
                  </div>
                </div>

                <div>
                  {this.state.quizes?.map((item, index) => {
                    return (
                      <div className="flexc text-color-2">
                        <div className="col-6 col-sm-6 p-0 py-4">
                          <p>{item.title}</p>
                        </div>
                        <div className="col-2 d-none d-sm-block p-0 flexc">
                          <p>{item.course.title}</p>
                        </div>
                        <div className="d-flex justify-content-end col-6 col-sm-4 p-0">
                          <Link href={'/quiz/' + item?._id}>
                            <button className="w-60 btn-primary5">
                              مشاهده
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                  {this.state.practices?.map((item, index) => {
                    return (
                      <div className="flexc text-color-2">
                        <div className="col-6 col-sm-6 p-0 py-4">
                          <p>{item.title}</p>
                        </div>
                        <div className="col-2 d-none d-sm-block p-0 flexc">
                          <p>{item.course.title}</p>
                        </div>
                        <div className="d-flex justify-content-end col-6 col-sm-4 p-0">
                          <Link href={'/practice/' + item?._id}>
                            <button className="w-60 btn-primary5">
                              مشاهده
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* نمرات */}
          <div className="col-12 mb-4 col-xl-6 p-0 pr-xl-3">
            <div className="box p-4 h-100 ">
              <div>
                <div className="flexcb border-bottom-gray pb-4">
                  <div className="d-flex">
                    <p className="text-color-1 text-semibig">نمرات کسب شده</p>
                  </div>
                </div>
              </div>
              <div className="flexcc h-80">
                <p className="text-color-2 align-content-center">
                  نمره‌ای برای نمایش روی نمودار وجود ندارد.
                </p>
              </div>
            </div>
          </div>

          {/* نظرات */}
          <div className="col-12 mb-5 p-0">
            <div className="box p-4 h-100">
              <div className="flexcb border-bottom-gray pb-4">
                <div className="d-flex">
                  <p className="text-color-1 text-semibig">نظرات کاربران</p>
                </div>
                {/* <div className="d-flex">
                  <Link href="/notifications">
                    <a className="text-color-2 d-flex">
                      مشاهده همه
                      <img
                        className="pr-2"
                        src="/images/icons/arrow-left.svg"
                      />
                    </a>
                  </Link>
                </div> */}
              </div>
              <div>
                <div>
                  {this.state.reviews.map((item, index) => {
                    return (
                      <div className="box-5 p-4">
                        <div className="row m-0">
                          <div className="text-color-2 col-12 col-xl-12 p-0 pl-xl-12" style={{ alignItems: "center" }} >
                            <div style={{ alignItems: "center", display: "flex" }}>
                              <div className="flexcb flex-lg-row" style={{ width: "100%" }}>
                                <div className="w-100">

                                  <div className="w-100  flex-sm-row justify-content-sm-between justify-content-between">
                                    <div className="flexc" style={{ alignItems: "center" }}>
                                      <img className="radius-3" src={imageAddress(item.writer?.image, "profile", 'thumb')} height={40} width={40} style={{ border: '1px solid #ffffff20' }} />
                                      <p className="pr-3">{item.writer?.fullname}</p>
                                    </div>
                                    {item.description && item.description.trim() != '' && item.description.trim() != null && (
                                      <div className=" flexc pt-3" style={{}}>
                                        <p>{item.description}</p>
                                      </div>
                                    )}
                                  </div>


                                  <div className='rate-user mt-3 d-flex align-items-center justify-content-between py-2'>
                                    <p style={{ marginLeft: 20 }}>
                                      {this.state.revviews.q1}
                                    </p>
                                    <div style={{ minWidth: 100 }}>

                                      <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                                        {item?.ratings[0] && (
                                          <p className="text-color-1" >{(item?.ratings[0]).toFixed(1)}</p>
                                        )}
                                        <img src="/images/star-2.svg" className="mr-2" />
                                      </div>

                                      {/* <ReactStars
                                        count={5}
                                        size={20}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        // activeColor="#C97EF5"
                                        color2={'#C97EF5'}

                                        edit={false}
                                        value={item?.ratings[0]}
                                        isHalf={false}

                                      /> */}
                                    </div>

                                  </div>
                                  <div className='rate-user d-flex align-items-center justify-content-between py-2'>
                                    <p style={{ marginLeft: 20 }}>
                                      {this.state.revviews.q2}
                                    </p>
                                    <div style={{ minWidth: 100 }}>

                                      <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                                        {item?.ratings[1] && (
                                          <p className="text-color-1" >{(item?.ratings[1]).toFixed(1)}</p>
                                        )}
                                        <img src="/images/star-2.svg" className="mr-2" />
                                      </div>

                                      {/* <ReactStars
                                        count={5}
                                        size={20}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        // activeColor="#C97EF5"
                                        color2={'#C97EF5'}

                                        edit={false}
                                        value={item?.ratings[1]}
                                        isHalf={false}

                                      /> */}
                                    </div>

                                  </div>
                                  <div className='rate-user d-flex align-items-center justify-content-between py-2'>
                                    <p style={{ marginLeft: 20 }}>
                                      {this.state.revviews.q3}
                                    </p>
                                    <div style={{ minWidth: 100 }}>

                                      <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                                        {item?.ratings[2] && (
                                          <p className="text-color-1" >{(item?.ratings[2]).toFixed(1)}</p>
                                        )}
                                        <img src="/images/star-2.svg" className="mr-2" />
                                      </div>

                                      {/* <ReactStars
                                        count={5}
                                        size={20}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        // activeColor="#C97EF5"
                                        color2={'#C97EF5'}

                                        edit={false}
                                        value={item?.ratings[2]}
                                        isHalf={false}

                                      /> */}
                                    </div>

                                  </div>
                                  <div className='rate-user d-flex align-items-center justify-content-between py-2'>
                                    <p style={{ marginLeft: 20 }}>
                                      {this.state.revviews.q4}
                                    </p>
                                    <div style={{ minWidth: 100 }}>

                                      <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                                        {item?.ratings[3] && (
                                          <p className="text-color-1" >{(item?.ratings[3]).toFixed(1)}</p>
                                        )}
                                        <img src="/images/star-2.svg" className="mr-2" />
                                      </div>


                                      {/* <ReactStars
                                        count={5}
                                        size={20}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        // activeColor="#C97EF5"
                                        color2={'#C97EF5'}

                                        edit={false}
                                        value={item?.ratings[3]}
                                        isHalf={false}

                                      /> */}
                                    </div>
                                  </div>
                                  <div className='rate-user d-flex align-items-center justify-content-between py-2'>
                                    <p style={{ marginLeft: 20 }}>
                                      {this.state.revviews.q5}
                                    </p>
                                    <div style={{ minWidth: 100 }}>
                                      <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                                        {item?.ratings[4] && (
                                          <p className="text-color-1" >{(item?.ratings[4]).toFixed(1)}</p>
                                        )}
                                        <img src="/images/star-2.svg" className="mr-2" />
                                      </div>

                                      {/* <ReactStars
                                        count={5}
                                        size={20}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        // activeColor="#C97EF5"
                                        color2={'#C97EF5'}

                                        edit={false}
                                        value={item?.ratings[4]}
                                        isHalf={false}

                                      /> */}
                                    </div>

                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* <div className=" text-color-2 p-0 pt-5 pt-xl-0 col-12 col-xl-4">
                            <div className=" flexcb">
                              <p className="pb-3">{item.q1}</p>
                              <p className="pb-3 pr-2">{item.q1r}</p>
                            </div>
                            <div className=" flexcb">
                              <p className="pb-3">{item.q2}</p>
                              <p className="pb-3 pr-2">{item.q2r}</p>
                            </div>
                            <div className=" flexcb">
                              <p className="pb-3">{item.q3}</p>
                              <p className="pb-3 pr-2">{item.q3r}</p>
                            </div>
                            <div className=" flexcb">
                              <p className="pb-3">{item.q4}</p>
                              <p className="pb-3 pr-2">{item.q4r}</p>
                            </div>
                            <div className=" flexcb">
                              <p className="pb-3">{item.q5}</p>
                              <p className="pb-3 pr-2">{item.q5r}</p>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="row m-0" >
                <div className="pt-4 flexcc justify-content-end col-12 p-0">
                  <div className="flexcc col-12 col-sm-6 col-md-3 cursor-pointer justify-content-end pl-0" onClick={() => this.reviewsModal.modal.showModal()}>
                    <botton className="btn-primary5 flexcc" style={{ maxWidth: 250 }}>ثبت امتیاز و نظر</botton>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <ReviewsModal getAllReviews={() => this.getAllReviews()} closeModal={() => this.reviewsModal.modal.hideModal()} ref={el => this.reviewsModal = el} data={this.props?.course} />
          <CommentModal getAllComments={() => this.getAllComments()} closeModal={() => this.CommentModal.modal.hideModal()} ref={el => this.CommentModal = el} data={this.props?.course} />
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
)(CourseDashboard);
