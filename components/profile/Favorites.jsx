import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpServices from "../../utils/Http.services";
import Link from "next/link";
import { imageAddress } from "../../utils/useful";
import CourseBox from "../boxes/CourseBox";


class CourseDashboard extends React.Component {




  componentDidMount() {
    HttpServices.request('getWishLists', {}, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      this.setState({ data: fetchResult?.info })
    })
  }

  state = {
    // courseInfo: {
    //     image: "/images/favoritespic.png",
    //     title: "یادین تیم‌سازی",
    //     categories: "مدیریت",
    //     description:
    //         "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
    //     rate: "4.5",
    //     snacks: "10 اسنک",
    //     duration: "4 ساعت",
    //     practiceTime: "2 ساعت",
    //     level: "مقدماتی",
    //     teacher: {
    //         name: "ایمان سرایی",
    //         image: "/images/icons/profilepic.png",
    //         rate: "4.6",
    //         review: "(25نظر)",
    //         courses: "5 یادین",
    //         description:
    //             "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
    //     },
    // },

    // card: [
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    //     { src: '/images/favoritespic.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' } },
    // ],
    tab: 0,
    data: []

  };

  updateUserPassword = () => {
    let data = this.form.getForm();
    if (data) {
      this.setState({ isLoading: true, errors: {}, message: null });
      HttpServices.request(
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

  render() {
    let courseInfo = this.state.courseInfo;
    let notifications = this.state.notifications;
    let exams = this.state.exams;
    let reviews = this.state.reviews;
    let dashboard = this.state.dashboard;
    let card = this.state.card;
    return (
      <Configurer
        settingsInfo={{
          headerTitle: "Favorites",
          button: { goBack: true },
        }}
        title={"Favorites"}
        description={"Profile Dashboard"}
        className=""
        style={{ padding: '0px 3% 0px 3%' }}
        changeOnUnmount={true}
      >
        <div>
          <div className="w-100 flexcc">
            <div className="w-30 bg-gray-color-4 p-3 mt-5 d-flex" style={{ borderRadius: '40px', justifyContent: 'center' }}>
              <input
                type={"Text"}
                placeholder={"عنوان یادین یا ویدیو را جست‌وجو کنید."}
                className="search-input d-none d-md-flex w-100"
                style={{
                  color: "#fff",
                  background: "transparent",
                  border: "none",
                }}
              />

              <button className="p-0 flexcc">
                <img src="/images/Search.png" style={{ width: "20px" }} />
              </button>
            </div>
          </div>
          <div className="d-flex text-color-1">
            <button onClick={() => this.setState({ tab: 0 })} className={this.state.tab == 0 ? "btn-filter1 main-color-1 active" : 'btn-filter1 main-color-1'}>یادین ها</button>


            <button onClick={() => this.setState({ tab: 1 })} className={this.state.tab == 1 ? "btn-filter1 main-color-1 active" : 'btn-filter1 main-color-1'}>اسنک ها</button>
          </div>
          {this.state.tab == 0 && (


            <div className="row m-0">
              {this.state?.data?.map((item, index) => {

                return (
                  <>
                    {item.course && !item.lesson && item.course.removed == false && (

                      <div className="mt-4 col-12 col-sm-6 col-xl-3 p-0 pl-sm-4 m-0  ">
                        <div className="box p-3 m-0 d-flex flex-column h-100">

                          <div className="flex-1">
                            <div className="radius-1" style={{ paddingTop: '60%', backgroundImage: 'url(' + imageAddress(item.course?.image, null, 'thumb') + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            </div>
                            <div className="flexcb pt-2">
                              <div className="flexc">
                                <p className="main-color-1 pl-2">{item.course?.price}</p>
                                <img src="/images/icons/empty-wallet.svg" />
                              </div>
                              <div className="flexc">
                                <p className="main-color-1 pl-2">{item.course?.rate}</p>
                                <img src="/images/icons/star.svg" />
                              </div>
                            </div>
                            <div className="pt-3">
                              <p className="text-color-1 text-big">{item.course?.title}</p>
                            </div>

                            <div>
                              <p className="text-color-2 text-normal">
                                {/* {item.course.description} */}
                                {item.course.description.length > 150 ?
                                  `${item.course.description.substring(0, 150)}...` : item.Description}
                              </p>
                            </div>
                          </div>

                          <div className="w-100 d-flex pt-4">
                            <Link href={`/course/${item.course?._id}`}>
                              <button className="btn-primary w-100 main-color-1 ">
                                مشاهده دوره
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          )}
          {this.state.tab == 1 && (


            <div className="row m-0">
              {this.state?.data?.map((item, index) => {
                return (
                  <>
                    {item.lesson && item.lesson.removed == false && (


                      <div className="mt-4 col-12 col-sm-6 col-xl-3 p-0 pl-sm-4 m-0  ">
                        {console.log("lesson lesson", item.lesson)}
                        <div className="box p-3 m-0">

                          <div className="radius-1" style={{ paddingTop: '60%', backgroundImage: 'url(' + imageAddress(item.lesson?.image, null, 'thumb') + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                          </div>

                          <div className="pt-3">
                            <p className="text-color-1 text-big">اسنک: {item.lesson?.title}</p>
                          </div>
                          <div className="pt-3">
                            <p className="text-color-2 text-semibig">یادین: {item.course.title}</p>
                          </div>



                          <div className="pt-3">
                            <p className="text-color-2 text-normal">{item.lesson?.teacher?.name}</p>
                          </div>
                          <div className="w-100 d-flex pt-4">
                            <Link href={`/snacks/${item.lesson?._id}`}>
                              <button className="btn-primary w-100 main-color-1 ">
                                مشاهده اسنک
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          )}

        </div>
      </Configurer>
    );
  }
}

export default CourseDashboard;
