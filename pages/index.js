import React from "react";
// import './modal.css';
import Slider from "react-slick";
// import ReactStars from 'react-rating-stars-component'
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import HttpServices from "../utils/Http.services";
import { checkTranslation, imageAddress, translate } from "../utils/useful";
// import './styles/shop.css';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
// import Link from "next/link";
// import CardItemBox from "../components/CardItemBox";
// import BrowseCat from "../components/BrowseCat";
// import ProductBox from "../components/boxes/ProductBox";
// import Box1 from "../components/boxes/CourseBox";
// import { scaleDivergingSqrt } from "d3-scale";
import CourseBox from "../components/boxes/CourseBox";
import Banner from "../components/Banner";
import { clearStorage } from "mapbox-gl";
import Router from "next/router";
// import { addToCart } from '../stores/actions/cart.actions';
// import * as actions from '../stores/actionsList';

export async function getServerSideProps(context) {
  let limit = 4
  // let page = 0
  // if (context?.query?.page) {
  //   page = Number(context?.query?.page) - 1
  // }
  let slug = null
  if (context?.query?.slug) {
    slug = context.query?.slug
  }

  let body = {}
  // if (category && category != '') {
  //   body.filter = {}
  //   body.filter['categories'] = category
  // }

  body.getCount = true
  // body.limit = limit
  // body.skip = page

  // let lng = context.locale
  // if (!lng) {
  //   lng = 'en'
  // }
  // body.lng = lng
  console.log(body)

  // const course = await (await HttpServices.syncRequest('getOneCourse', { _id: slug })).result

  const courses = await (await HttpServices.syncRequest('getCourses', body, context)).result


  const topCourses = await (await HttpServices.syncRequest('getCourses', { filter: { special: 'featured' }, limit: 4 }, context)).result

  const baners = await (await HttpServices.syncRequest('getbaners', {})).result

  console.log('courses', baners)


  // const banners = await (
  //   await HttpServices.syncRequest("getContents", {
  //     page: "advertisements",
  //     lng,
  //   })
  // ).result;


  return JSON.parse(JSON.stringify({
    props: {
      courses: courses?.info, baners: baners?.info, topCourses: topCourses?.info,

      totalCount: courses?.count,

      // currentPage: page,

      limit: limit
    }
  }))

}

class Shop extends React.Component {
  state = {
    openDropDown: false,
    list: [],
    featured1: "",
    featured2: "",
    featured3: "",
    featured4: "",
    clientXonMouseDown: null,
    clientYonMouseDown: null,
    width: null,
    card: [
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
    ],
    card2: [
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'یادین تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این یادین یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
    ],
    banner: [{ src: '/images/secondb.png' }],

  };
//   componentDidMount() {

// console.log('bannnerrrsssssss', this.props.baners);

//   }

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

  // componentDidMount() {
  //   // if (this.props.ads) {
  //   //   this.props.ads.forEach((element) => {
  //   //     if (element.values.pages.includes("shop-featured_1")) {
  //   //       this.setState({ featured1: element });
  //   //     }
  //   //     if (element.values.pages.includes("shop-featured_2")) {
  //   //       this.setState({ featured2: element });
  //   //     }
  //   //     if (element.values.pages.includes("shop-featured_3")) {
  //   //       this.setState({ featured3: element });
  //   //     }
  //   //     if (element.values.pages.includes("shop-featured_4")) {
  //   //       this.setState({ featured4: element });
  //   //     }
  //   //   });
  //   // }
  // }

  changePage = (index) => {

    let query = null

    if (this.props.category) {
      query = { category: this.props.category }
    }

    Router.push({
      pathname: "/" + (Number(index) + 1),
      query
    })

  }

  addNum(prop) {
    this.props.setCart(prop);
  }

  handleOnMouseDown(e) {
    this.setState({
      clientXonMouseDown: e.clientX,
      clientYonMouseDown: e.clientY,
    });
    e.preventDefault(); // stops weird link dragging effect
  }

  handleOnClick(e) {
    e.stopPropagation();
    if (
      this.state.clientXonMouseDown !== e.clientX ||
      this.state.clientYonMouseDown !== e.clientY
    ) {
      e.preventDefault();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
        this.setState({ width: window.innerWidth })
        // console.log('bannnerrrsssssss', this.props.baners);

  }

  handleResize = () => {
        console.log('width', window.innerWidth)
        this.setState({ width: window.innerWidth })
    }

  render() {
    var settings = {
      dots: true,
      autoplay: true,
      dotsClass: "slick-dots slick-thumb",
      autoplaySpeed: 5000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false
    };

    return (
      <>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", }} className="mt-5 ">
            <div className="banner-slider h-100" style={{ width: "100%", borderRadius: "20px", overflow: "hidden" }}>
              <Slider {...settings} beforeChange={this.sliderChanged}>
                {this.props.baners?.map((item, index) => {
                  if (item?.pages.includes("homepage1")) {
                    return (
                      <div className="flex-1 position-relative">
                        <a href={item.link ?? ""}>
                          <div>
                            <a href={item?.link}>
                              <img src={(this.state.width != null && this.state.width < 768) ? imageAddress(item?.mobileImage) : imageAddress(item?.image)} style={{ objectFit: "cover", width: "100%", }} />
                            </a>

                            {/* <div style={{ position: "absolute", bottom: 10, left: "1%" }}>
                            <div className="py-2 px-5 creadit-point" style={{ borderRadius: "10px" }}>
                              <button style={{ fontSize: "12px", color: "#C97EF5", textTransform: "capitalize", fontWeight: "medium" }}>
                                {translate("Credit-point")}
                              </button>
                            </div>
                          </div> */}
                          </div>
                        </a>
                      </div>
                    );
                  }
                }
                )}
              </Slider>
            </div>
          </div>
        </div>
        <div className="container">
          {this.props.topCourses?.length > 0 && (

            <div style={{ justifyContent: 'space-between' }} className='mt-5 mb-1 d-flex'>
              <a className="text-color-1 text-ultra-big" style={{ fontWeight: "bold", marginBottom: '10px' }}>محبوب ترین یادین ها</a>
            </div>
          )}
          <div style={{ borderBottom: '3px solid #262626' }} className='my-4'></div>
          <div className='row d-flex' style={{ flexWrap: "wrap" }}>
            {this.props.topCourses?.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 " key={index}>
                  <CourseBox data={item} />
                </div>
              )
            })}
          </div>


          <div>
            <Slider {...settings} beforeChange={this.sliderChanged}>
              {this.props.baners?.map((item, index) => {
                if (item?.pages.includes("homepage2")) {
                  return (
                    <div className="flex-1 position-relative">
                      <a href={item.link ?? ""}>
                        <div className="w-100 position-relative">
                          <a href={item?.link}>
                            <img className="radius-2" src={(this.state.width != null && this.state.width < 768) ? imageAddress(item?.mobileImage) : imageAddress(item?.image)} style={{ objectFit: "cover", width: "100%", }} />
                          </a>

                          {/* <div style={{ position: "absolute", bottom: 10, left: "1%"}}>
                          <div className="py-2 px-5 creadit-point" style={{ borderRadius: "10px" }}>
                            <button style={{ fontSize: "12px", color: "#C97EF5", textTransform: "capitalize", fontWeight: "medium" }}>
                              {translate("Credit-point")}
                            </button>
                          </div>
                        </div> */}
                        </div>
                      </a>
                    </div>
                  );
                }
              }
              )}
            </Slider>
          </div>

          {/* <div className="w-100 radius-2 position-relative" >
          {this.props.baners.map((item,index) => {
            return(
              <>
              <img className="w-100 radius-2" src={imageAddress(item?.image)}/>
              <button className="btn-primary1 main-color-1">
                {translate("Credit-point")}
              </button>
              </>
            )
          })}
        </div> */}
          <div className='mt-5 mb-1 flexcb'>
            <a className="text-color-1 text-ultra-big font-bold" style={{ marginBottom: '10px' }}>لیست یادین‌ها  </a>

            {/* <div className="position-relative" style={{ width: '300px' }}>
              <button onClick={() => this.setState({openDropDown:!this.state.openDropDown})} className="btn-primary6 flexcb">
                <p className="text-normal">جدیدترین</p>
                <img src="/images/arrow-bottom.png" />
              </button>

              <div style={{display: this.state.openDropDown ? 'block' : 'none', top:55, zIndex:3, width: '300px'}} className="position-absolute">
                <div className="btn-primary6 d-flex flex-column">
                <button className="" style={{color:"#a0a0a0"}}>جدیدترین</button>
                <button className="" style={{color:"#a0a0a0"}}>محبوب ترین</button>
                </div>
              </div>
            </div> */}


          </div>
          <div style={{ borderBottom: '3px solid #262626' }} className='my-4'></div>
          <div className='row d-flex' style={{ flexWrap: "wrap" }}>
            {this.props?.courses?.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                  <CourseBox data={item} />
                </div>
              )
            })}
          </div>
          {/* <Pagination currentPage={this.props.currentPage} totalCount={this.props?.totalCount} limit={this.props.limit} changePage={this.changePage} /> */}
        </div>
      </>
    );
  }
}

// export default Shop;
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    settings: state.settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (item, action, extra) =>
      dispatch({ type: "SET_CART", item, action, extra }),
    setUser: (loggedin, info, isCounterpart) =>
      dispatch({ type: "SET_USER", loggedin, info, isCounterpart }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
