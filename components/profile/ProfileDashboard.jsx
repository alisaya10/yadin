import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import HttpServices from "../../utils/Http.services";
import { checkTranslation, imageAddress, translate } from "../../utils/useful";
import { msToHMS } from "../../utils/useful";
import ImageModal from "../modals/ImageModal"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import moment from 'jalali-moment';
import FormViewer from "../FormViewer";

class CourseDashboard extends React.Component {
  state = {
    courseInfo: {
      image: "/images/icons/maincardpic.png",
      title: "دوره تیم‌سازی",
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
        courses: "5 دوره",
        description:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
      },
    },
   
    notifications: [
      { title: "نمره تمرین شماره 2 شما 8/10 است.", type: "تمرین" },
      {
        title: "محتوای بخش فایل‌های دوره به‌روزرسانی شد.",
        type: "محتوای دوره",
      },
      { title: "نمره آزمون شماره 2 شما 7/10 است.", type: "آزمون" },
      { title: "نمره تمرین شماره 3 شما 8/10 است.", type: "تمرین" },
    ],

    dashboard: [
      { title: "دوره خریداری‌شده", type: "5" },
      { title: "دوره تکمیل‌شده", type: "1" },
      { title: "گواهینامه", type: "1" },
      { title: "کتاب معادل", type: "5" },
    ],

    exams: [
      { title: "تمرین شماره 1", type: "اسنک 2" },
      { title: "آزمون شماره 2", type: "اسنک 3" },
      { title: "تمرین شماره 3", type: "اسنک 5" },
      { title: "آزمون شماره 4", type: "اسنک 6" },
      { title: "تمرین شماره 2", type: "اسنک 8" },
    ],

    reviews: [
      {
        name: "علی مجیدی‌نژاد",
        image: "/images/icons/1.png",
        content:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
        rate: "4.4",
        q1: "رضایت کلی از محتوای دوره",
        q2: "رضایت از فن بیان استاد",
        q3: "رضایت از سرعت پاسخ‌گویی استاد",
        q4: "رضایت از جذابیت بیان استاد (لحن و...)",
        q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای دوره",
        q1r: "4.5",
        q2r: "4",
        q3r: "5",
        q4r: "3.5",
        q5r: "5",
      },
      {
        name: "محسن باقری",
        image: "/images/icons/2.png",
        content:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
        rate: "4.4",
        q1: "رضایت کلی از محتوای دوره",
        q2: "رضایت از فن بیان استاد",
        q3: "رضایت از سرعت پاسخ‌گویی استاد",
        q4: "رضایت از جذابیت بیان استاد (لحن و...)",
        q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای دوره",
        q1r: "4.5",
        q2r: "4",
        q3r: "5",
        q4r: "3.5",
        q5r: "5",
      },
      {
        name: "ستاره باختری :)",
        image: "/images/icons/2.png",
        content:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
        rate: "4.4",
        q1: "رضایت کلی از محتوای دوره",
        q2: "رضایت از فن بیان استاد",
        q3: "رضایت از سرعت پاسخ‌گویی استاد",
        q4: "رضایت از جذابیت بیان استاد (لحن و...)",
        q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای دوره",
        q1r: "4.5",
        q2r: "4",
        q3r: "5",
        q4r: "3.5",
        q5r: "5",
      },
    ],

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
  };

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
  componentDidMount() {

    this.getCoursesQuizes()
    this.getUserCourses()
    this.getCurrentLesson()
    this.getDetails()
  }

  getCoursesQuizes() {


    console.log("Here")
    HttpServices.request('getCoursesQuizes', {}, (fetchResult, fetchError) => {

      console.log(fetchError)
      console.log(fetchResult)

      if (fetchError) {
        return
      }
      console.info('fetchResult', fetchResult)
      this.setState({ data: fetchResult.info })
    })
  }
  getUserCourses() {



    HttpServices.request('getUserCourses', {}, (fetchResult, fetchError) => {



      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ userCourses: fetchResult.info })
    })


  }
  getUserQuizes = (course) => {



    HttpServices.request('getUserQuizes', { filter: { course: course?._id } }, (fetchResult, fetchError) => {



      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ userQuizes: fetchResult.info })
    })


  }
  getCurrentLesson() {
    console.log(this.state.id)
    HttpServices.request('getCurrentLesson', {}, (fetchResult, fetchError) => {

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
  getDetails() {
    console.log(this.state.id)
    HttpServices.request('getDetails', {}, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        details: fetchResult?.info,


      })
    })


  }

  editImageModal = () => {
    this.ImageModal.showModal()
  }

  // getCoursesPractices() {


  //     console.log("Here")
  //     HttpServices.request('getCoursesPractices', {}, (fetchResult, fetchError) => {

  //         console.log(fetchError)
  //         console.log(fetchResult)

  //         if (fetchError) {
  //             return
  //         }
  //         console.info('fetchResult2', fetchResult)
  //         this.setState({ info: fetchResult.info })
  //     })
  // }


  render() {
    let courseInfo = this.state.courseInfo;
    let notifications = this.state.notifications;
    let exams = this.state.exams;
    let reviews = this.state.reviews;
    let dashboard = this.state.dashboard;
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
        <div className="box px-3 py-4">
          <div className="row m-0 flexc">

            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center justify-content-md-start">
              <div className="position-relative">
                <img src={imageAddress(this.props.user?.info.image, 'profile', 'thumb')} style={{ height: 110, width: 110, borderRadius: "50%" }} />
                <div className="position-absolute flexcc" style={{ top: "90%", right: "22%", width: "56%", transform: "translate(-50%, -50%)", background: "#181818", borderRadius: "50%", width: "30px", height: "30px" }}>
                  <button className="flexcc" onClick={() => this.editImageModal()}>
                    <img src="/images/edit.svg" />
                  </button>
                </div>
              </div>

              {/* <div className='px-4 pb-5 pt-1 mb-4' style={{ backgroundColor: '#fff', borderRadius: '16px 16px 16px 16px', }}> */}
                {/* <div className='d-flex flex-wrap mt-4' style={{}}> */}
                  {/* <FormViewer ref={el => this.form = el} headers={this.state.formHeaders} initData={this.props.initData} errors={this.state.errors} inputClass={'modern-input'} liveChange={this.formLiveChange} /> */}
                {/* </div>
              </div> */}

            </div>


            <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center justify-content-md-start">
              <div>
                <p className="text-color-2 py-1">کاربر از {moment(this.props.user?.info.cDate).locale('fa').format(" jDD,  jMMM, jYYYY")}</p>
                <p className="text-color-2 py-1 text-center text-md-right">{this.props.user?.info.fullname}</p>
                {/* <p className="text-color-2 py-1 text-small py-2">{translate(this.props.user?.info.status)}</p> */}
              </div>
            </div>

            <div className="col-12 col-md-12 col-lg-4 pt-2 pt-lg-0 d-flex justify-content-center justify-content-md-start">
              <div>
                <p className="text-color-2 py-1 text-center text-md-right">{this.props.user?.info.phone}</p>
                <p className="text-color-2 py-1">{this.props.user?.info.email}</p>
              </div>
            </div>

          </div>
        </div>


        <div className="mt-4 col-12 p-0">
          <div className="box p-3">
            <div className="row m-0">
              <div className="col-12 col-sm-4">
                <div className="d-flex flexc d-sm-block">
                  <p className="normal-text-res text-color-1">دوره خریداری‌ شده</p>
                  <p className="d-block d-sm-none pr-3 text-color-2 small-text-res">{this.state.details?.boughtCount}</p>
                </div>
              </div>



              <div className="col-12 col-sm-4 d-flex justify-content-sm-center">
                <div className="d-flex flexc d-sm-block pt-2 pt-sm-0">
                  <p className="normal-text-res text-color-1">دوره تکمیل‌ شده</p>
                  <p className="d-block d-sm-none pr-3 text-color-2 small-text-res"> {this.state.details?.passedCount} </p>
                </div>
              </div>


              <div className="col-12 col-sm-4 d-flex justify-content-start justify-content-sm-end">
                <div className="d-flex flexc d-sm-block pt-2 pt-sm-0">
                  <p className="normal-text-res text-color-1">  کتاب معادل </p>
                  <p className="d-block d-sm-none pr-3 text-color-2 small-text-res">{this.state.details?.booksCount} </p>
                </div>
              </div>
            </div>


            <div className="row m-0 pt-4 flexc pb-2 d-none d-sm-flex" >
              <div className="col-4 ">
                <div>
                  <p className="text-color-2 small-text-res">{this.state.details?.boughtCount}</p>
                </div>
              </div>



              <div className="col-4 d-flex justify-content-center">
                <div>
                  <p className="text-color-2 small-text-res"> {this.state.details?.passedCount} </p>
                </div>
              </div>


              <div className="col-4 d-flex justify-content-end">
                <div className="">
                  <p className="text-color-2 small-text-res">{this.state.details?.booksCount} </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="row m-0">
          <div className="col-12 mb-4 col-xl-4 p-0 pl-xl-3">
            {this.state?.cLesson?.currentLesson && this.state?.cLesson?.currentLesson != undefined && this.state?.cLesson?.currentLesson != null ? (
              <div className="box p-4 h-100">
                <div>
                  <p className="border-bottom-gray pb-4 text-semibig text-color-1">
                    در حال مشاهده این اسنک بودید.
                  </p>
                </div>

                <div>
                  <div className="p-4 flexcc position-relative">
                    <img className="radius-1" src={imageAddress(this.state.cLesson?.currentLesson?.video.cover, 'video')} style={{ minWidth: '10px', objectFit: "cover" }} />
                    <img className="radius-1 position-absolute"
                    // src="/images/icons/video-circle.png
                    />
                  </div>
                  <div className="flexcb">
                    <p className="text-color-2">{this.state.cLesson?.currentLesson?.title}</p>
                    <p className="text-color-2"> {msToHMS(this.state?.cLesson?.currentLessontime ?? 0)}</p>
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

          {/* <div className="col-12 mb-4 col-xl-8 p-0 pr-xl-3">
            <div className="box p-4 h-100">
              <div className="flexcb border-bottom-gray pb-4">
                <div className="d-flex">
                  <p className="text-color-1 text-semibig">اعلان‌های جدید</p>
                  <p className="text-color-1">(6اعلان)</p>
                </div>
                <div className="d-flex">
                  <Link href="/profile/notifications">
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
                            <Link href="/profile/notifications">
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
          </div>*/}
        </div>

        <div className="row m-0">
          {/* <div className=" col-12 mb-4 col-xl-6 p-0 pl-xl-3">
                <div className="box p-4 h-100">
                  <div className="flexcb border-bottom-gray pb-4">
                    <div className="d-flex">
                      <p className="text-color-1 text-semibig"> تمارین و آزمون‌ها</p>
                    </div>
                    <div className="d-flex">
                      <Link href="/profile/homework">
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
                      {this.state?.data?.map((item, index) => {
                        return (
                          <>
                            {item?.quizes?.map((quiz, index) => {
                              return (
                                <div className="flexc text-color-2">
                                  <div className="col-6 col-sm-6 p-0 py-4">
                                    <p>{quiz.title}</p>
                                  </div>
                                  <div className="col-2 d-none d-sm-block p-0 flexc">
                                    <p>
                                      {item.course.title?.length > 8 ?
                                        `${item.course.title.substring(0, 8)}...` : item.course.title
                                      }
                                    </p>

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
                          </>
                        );
                      })}

                    </div>
                    <div>
                      {this.state?.data?.map((item, index) => {
                        return (
                          <>
                            {item?.practices?.map((item, index) => {
                              return (
                                <div className="flexc text-color-2">
                                  <div className="col-6 col-sm-6 p-0 py-4">
                                    <p>
                                      {item.title?.length > 8 ?
                                        `${item.title.substring(0, 8)}...` : item.title
                                      }
                                    </p>
                                  </div>
                                  <div className="col-2 d-none d-sm-block p-0 flexc">
                                    <p>{item.type}</p>
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
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div> */}


          {/* <div className="col-12 mb-4 col-xl-6 p-0 pr-xl-3">
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
              </div> */}
        </div>


        <ImageModal ref={el => this.ImageModal = el} data={this.props?.user?.info} />

      </Configurer>
    );
  }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDashboard);
