
import React from 'react';
import Head from 'next/head';
import Slider from "react-slick";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import Link from 'next/link'
import HttpServices from '../utils/Http.services';
import { imageAddress } from '../utils/useful';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectCoverflow, Pagination, Navigation, Scrollbar, A11y
} from 'swiper';



SwiperCore.use([EffectCoverflow, Pagination]);

export async function getServerSideProps(context) {


  let lng = context.locale
  if (!lng) {
    lng = 'en'
  }

  const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases", lng })).result

  // const res = await fetch('https://www.iotsmile.com/iot/apiv1', {
  //   method: "POST",
  //   body: JSON.stringify({
  //     route: "values/getValuesWithData",
  //     content: {
  //       page: "Usecases",
  //       // _id: id
  //     }
  //   })
  // })

  // const json = await res.json()

  return {
    props: { list: json.info }
  }

}


class App extends React.Component {
  state = {
    hoveredIndex: 0,
    list: [
      // { name: 'Smart Home', image: '/images/icons/home.svg', description: 'It enables device connectivity via industry standard IoT protocols' ,color1:'rgba(52, 52, 144, 1)',color2:' rgba(52, 52, 144, 0.8)'},
      // { name: 'Smart City', image: '/images/icons/city.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(0, 104, 255)', color2:'rgb(0, 149, 197)' },
      // { name: 'Smart Business', image: '/images/icons/business.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(255, 91, 91)',color2:'rgb(220, 80, 132)' },

      // { name: 'Transportation', image: '/images/icons/transportation.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(255, 174, 0)',color2:'rgb(186, 172, 0)' },
      // { name: 'Agriculture', image: '/images/icons/agriculture.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(28,131,16)',color2:'rgb(108,211,96)' },

      // { name: 'Smart Factory', image: '/images/icons/factory.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(163,159,36)',color2:'rgb(243,239,96)' },


      // { name: 'Infrastracture', image: '/images/icons/infrastracture.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(56,80,165)',color2:'rgb(136,160,245)' },
      // { name: 'Government', image: '/images/icons/government.svg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols',color1:'rgb(158,84,118)',color2:'rgb(238,164,198)' },

    ],
    things: [
      {
        title: "Intractive Dashboard",
        desc: "Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img: "/images/icons/dashboard-icon.svg",
      },
      {
        title: "Explore Things",
        desc: "Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img: "/images/icons/dashboard-icon1.svg",
      },
      {
        title: "Manage Your Things",
        desc: "Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img: "/images/icons/devices-icon.svg",
      },
      {
        title: "Financial Management",
        desc: "Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img: "/images/icons/cash-icon.svg",
      },
    ],
    imgList: [
      {
        img: "/images/ag1.jpg",
      },
      {
        img: "/images/blog1.jpeg",
      },
      {
        img: "/images/ag1.jpg",
      },
      {
        img: "/images/blog1.jpeg",
      },
    ]
  }


  componentDidMount() {
    // this.fetch()
  }


  // fetch = () => {
  //   fetch(
  //     'https://www.iotsmile.com/iot/apiv1',
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         route: "values/getValuesWithData",
  //         content: {
  //           page: "Usecases"
  //         }
  //       }
  //       )
  //     })
  //     .then(res => res.json())
  //     .then(json => {
  //       // console.log(json)
  //       this.setState({
  //         list: json.info
  //       })
  //     })
  // }


  sliderChanged = (index) => {
    let newIndex = index + 1
    if (newIndex > this.props.list.length - 1) {
      newIndex = 0
    }
    this.setState({ hoveredIndex: newIndex })
  }

  changeColor = (index) => {
    this.setState({ imageIndex: index })
  }


  render() {
    var settings = {
      dots: false,
      autoplay: false,
      autoplaySpeed: 3000,
      infinite: true,
      speed: 1000,
      arrows: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      centerMode: true,
      draggable: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            // initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <>
        <Head>

          <title>IoTSmile.com</title>

        </Head>

        <div className="main-page" >
          {/* <div className="home-hero pt-5"> */}
          {/* <div className="container-fluid py-5" style={{backgroundColor:"#EBF0F3"}}>
            <div className="row m-0">
              <div className="col-12 col-md-12 col-lg-6  flexcc flex-column">
                <div className="w-100 h-100 text-center">
                  <h1 className="home-main-header">IOT Communication Platform</h1>
                  <p className="home-main-desc"> It enables device connectivity via industry standard IoT protocols - MQTT, CoAP and HTTP and supports both cloud and on-premises deployments. ThingsBoard combines scalability, fault-tolerance and performance so you will never lose your data.</p>
                  <div className='w-100 my-4'>
                    <button className="home-main-button">Log In</button>
                  </div>
                </div>
                <div className="row w-100   pt-2 pb-2 " style={{ alignItems: 'flex-end' }}>
                  <div className="col-4 text-center h-100">
                    <p className="home-main-p1 m-0">+1000</p>
                    <p className="home-main-p2 m-0">Active Users</p>
                  </div>
                  <div className="col-4 text-center h-100">
                    <p className="home-main-p1 m-0">550</p>
                    <p className="home-main-p2 m-0">Conected Things</p>
                  </div>
                  <div className="col-4 text-center h-100">
                    <p className="home-main-p1 m-0">800</p>
                    <p className="home-main-p2 m-0">Active Getway</p>
                  </div>
                </div>

              </div>
              <div className="col-12 col-md-12 col-lg-6 p-2" style={{ backgroundColor: "#2A83FE", borderRadius: "20px" }}>
                <img className="moving-img" src={'/images/ag1.jpg'} width="100%" height="100%" />
              </div>

            </div>
          </div> */}
          <div className="home-hero flexcc flex-column py-3">
            <div className=" container-xl  w-100">
              <div className="row m-0">
                <div className="col-12 col-md-12 col-lg-6 p-5 flexcc flex-column">
                  <div className="w-100 flexcc flex-column h-100">
                    <h1 className="home-main-header w-100" style={{ fontWeight: '700' }}>IoT Sharing Platform</h1>
                    <p className="home-main-desc my-2 w-100 text-normal"> Finally, a IoT platform that's both powerful and easy to use. Create delightful customer experiences. Have a delightful time doing it.</p>
                    <div className='w-100 mt-4 mb-3'>
                      <Link href="/login">
                        <a className="home-main-button">Get Started Free</a>
                      </Link>
                    </div>

                    <p className='mt-3 w-100' style={{ fontSize: 12, color: '#fff', fontWeight: 300, opacity: 0.7 }}>Get started with free tools, <br></br>or get more with our premium features.</p>
                  </div>

                </div>
                <div className="col-12 col-md-12 col-lg-6 flexcc pb-3">
                  <img className="moving-img" src={'/images/main-image1.svg'} width="90%" style={{ maxWidth: 400 }} />
                </div>

              </div>
            </div>

            {/* <div className='container' style={{ borderTop: '1px solid rgb(255,255,255,0.3)', paddingTop: '10px', marginTop: '10px' }}>
              <div className="row w-100 flexcc text-center  pt-2 pb-2 " style={{ alignItems: 'flex-end' }}>
                <div className="col-4 flexcc h-100">
                  <p className="home-main-p1 m-0">+1000</p>
                  <p className="home-main-p2 m-0">/Active Users</p>
                </div>
                <div className="col-4 flexcc h-100">
                  <p className="home-main-p1 m-0">550</p>
                  <p className="home-main-p2 m-0">/Conected Things</p>
                </div>
                <div className="col-4 flexcc h-100">
                  <p className="home-main-p1 m-0">800</p>
                  <p className="home-main-p2 m-0">/Active Getway</p>
                </div>
              </div>
            </div> */}

          </div>
          <div className='w-100' style={{ height: 4, background: 'linear-gradient(to left,  #000,#202020)' }}></div>
          {/* <div className='w-100' style={{height:5, background:'linear-gradient(to left,  rgb(123, 0, 247),rgb(52, 52, 144))'}}></div> */}

          {/* </div> */}
          <div className="container-fluid pb-4 pt-3 px-0" style={{ backgroundColor: '#f2f6f8' }}>
            <div className=" w-100 mt-4 m-0 " >

              {/* <div className="flexcc" style={{position:'relative'}}>
              <h1 className="main-header text-center mb-5">Where to Use?</h1>
              <h1 className="main-header text-center mb-5" style={{position:'absolute',top:-30, zIndex:0,opacity:0.1,fontSize:50}}>Internet of things</h1>
            </div> */}




              <div className="w-100 p-0 swiper-container pb-4" style={{ position: "relative" }}>
                <div className='mb-3' style={{}}>
                <h1 className=" text-center " style={{ fontWeight: 600, fontSize: 28 }}>Plaform Usecases</h1>
                  {/* <h1 className=" text-center " style={{ fontWeight: 600, fontSize: 28 }}>Our Plaform <span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#343490)', color: "#fff" }}>Usecases</span><span style={{ fontWeight: 600 }}></span></h1> */}
                  {/* <p className='mt-2 w-100 text-center' style={{ fontSize: 13, color: '#000', fontWeight: 400, opacity: 0.7 }}>The platform can be used in these usecases, <br></br>but that's not all, use it as you want.</p> */}
                  {/* <p className=" mb-4 text-center mt-0" style={{ fontWeight: '500', fontSize: 20, letterSpacing: 1 }}>Of IOT Smile platform</p> */}
                </div>

                <Swiper
                  effect={'coverflow'}
                  // modules={[EffectFade]} 
                  // effect="fade"
                  // grabCursor={true}
                  // centeredSlides={true}
                  // slidesPerView={5}

                  spaceBetween={10}
                  // slidesPerView={'auto'}

                  // breakpoints={{
                  //   "@0.00": {
                  //     slidesPerView: 1,
                  //     spaceBetween: 10,
                  //   },
                  //   "@0.75": {
                  //     slidesPerView: 2,
                  //     spaceBetween: 20,
                  //   },
                  //   "@1.00": {
                  //     slidesPerView: 3,
                  //     spaceBetween: 40,
                  //   },
                  //   "@1.50": {
                  //     slidesPerView: 4,
                  //     spaceBetween: 50,
                  //   },
                  // }}

                  breakpoints={{
                    540: {
                      slidesPerView: 2,
                      spaceBetween: 4,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 4,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 4,
                    },

                    1200: {
                      slidesPerView: 5,
                      spaceBetween: 4,
                    },


                    1400: {
                      slidesPerView: 6,
                      spaceBetween: 4,
                    },

                  }}

                  navigation={Navigation}
                  // modules={[Pagination]}
                  loop={true}
                  // centeredSlides={true}

                  // pagination={{
                  //   clickable: true,
                  // }}
                  slidesPerView={1}
                  coverflowEffect={{
                    "rotate": 20,
                    "stretch": 0,

                    "depth": 10,
                    "modifier": 1,
                    "slideShadows": false
                  }}
                  pagination={false}
                  // pagination={true}
                  className="swiper-container"
                >

                  {/* {this.props.list.map((item, index) => {

                    return (
                      <div className="" >
                        <div key={index} className="">
                          <div className={"   " + (this.state.hoveredIndex == index ? '' : '')} style={{ background: this.state.hoveredIndex == index ? "" : '' }}>
                            <SwiperSlide>
                              <div className='p-3 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: "#2A83FE", borderRadius: "8px" }}>
                                <img onClick={() => this.setState({ hoveredIndex: index })} src={imageAddress(item.values?.icon)} className={'' + (this.state.hoveredIndex == index ? "invert" : "")} style={{ width: "150px", height: "150px", zIndex: 1, objectFit: 'contain' }} />
                                <p className="" style={{ color: "#fff" }}>{item?.values?.title}</p>
                                <p className="" style={{ color: "#fff" }}>{item?.values?.description}</p>

                              </div>
                            </SwiperSlide>

                          </div>

                        </div>

                      </div>
                    )
                  }
                  )} */}


                  {/* <SwiperSlide>Slide 1</SwiperSlide>
                  <SwiperSlide>Slide 2</SwiperSlide>
                  <SwiperSlide>Slide 3</SwiperSlide>
                  <SwiperSlide>Slide 4</SwiperSlide>
                  <SwiperSlide>Slide 5</SwiperSlide>
                  <SwiperSlide>Slide 6</SwiperSlide>
                  <SwiperSlide>Slide 7</SwiperSlide>
                  <SwiperSlide>Slide 8</SwiperSlide>
                  <SwiperSlide>Slide 9</SwiperSlide> */}

                  {this.props.list.map((item, index) => {

                    // return (
                    //   <SwiperSlide>

                    //     <div className="mt-3 swiper-one-slide"  >
                    //       <div key={index} className="">
                    //         <div className={"  " + (this.state.hoveredIndex == index ? '' : '')} style={{ background: this.state.hoveredIndex == index ? "" : '' }}>
                    //           <div className='p-1 mt-2 mb-3 pb-3 text-center d-flex flex-column justify-content-center align-items-center mb-0' style={{ boxShadow: '0px 0px 50px #00000010', background: "#d0d8e0", borderRadius: "8px" }}>
                    //             <img onClick={() => this.setState({ hoveredIndex: index })} src={imageAddress(item.values?.image)} className={''} style={{ width: "100%", borderRadius: 8, height: "150px", zIndex: 1, objectFit: 'cover' }} />
                    //             <p className="mt-3" style={{ color: "#000", fontSize: 20, fontWeight: '500', background: 'linear-gradient(to left, rgb(123, 0, 247), rgb(52, 52, 144))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item?.values?.title}</p>
                    //             <p className="mt-1 px-2" style={{ color: "#000", fontWeight: 300, fontSize: 13 }}>{item?.values?.description}</p>
                    //             <Link href={'/usecase/' + item._id}>
                    //               <a>
                    //                 <p className='text-smaller mt-2' style={{ backgroundColor: '#f2f6f8', borderRadius: 8, padding: '5px 15px' }}>Learn more ...</p>
                    //               </a>
                    //             </Link>
                    //           </div>

                    //         </div>

                    //       </div>

                    //     </div>
                    //   </SwiperSlide>

                    // )

                    return (
                      <SwiperSlide>

                        <div className="mt-3 swiper-one-slide"  >
                          <div key={index} className="">
                            <div className={"  " + (this.state.hoveredIndex == index ? '' : '')} style={{ background: this.state.hoveredIndex == index ? "" : '' }}>
                              <div className='p-1 mt-2 mb-3 pb-3 text-center d-flex flex-column justify-content-center align-items-center mb-0' style={{ boxShadow: '0px 0px 50px #00000010', background: "#fff", borderRadius: "8px" }}>
                                <img onClick={() => this.setState({ hoveredIndex: index })} src={imageAddress(item.values?.icon)} className={'mt-3'} style={{  borderRadius: 8, height: "50px", zIndex: 1,  }} />
                                <p className="mt-3" style={{ color: "#000", fontSize: 18, fontWeight: '500', background: 'linear-gradient(to left, #000, #000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{item?.values?.title}</p>
                                <p className="mt-1 px-2" style={{ color: "#789", fontWeight: 300, fontSize: 12 }}>{item?.values?.description.substr(0, 130)}{item?.values?.description?.length>130 ? ' ...':''}</p>
                                <Link href={'/usecase/' + item._id}>
                                  <a>
                                    <p className='text-small mt-3 mb-1' style={{ background: 'linear-gradient(to left, #fff, #fff)', borderRadius: 4,color:'#007aff', padding: '0px 15px' }}>Learn more</p>
                                  </a>
                                </Link>
                              </div>

                            </div>

                          </div>

                        </div>
                      </SwiperSlide>

                    )

                  }
                  )}

                </Swiper>

                {/* {this.props.list.map((item, index) => {
                  if (this.state.hoveredIndex == index) {
                    return (

                      <div className='d-flex flex-column text-center align-items-center mt-5'>
                        <p className='px-5' style={{ color: "#000" }}>{item?.values?.description}</p>
                        <button className='my-3' style={{ padding: "7px 25px", textTransform: "uppercase", borderRadius: "6px", color: "#fff", backgroundColor: "#343490", fontSize: '15px' }}>learn more ...</button>

                      </div>

                    )
                  }
                })} */}


              </div>
              {/* <div className="col-12 col-xl-6 p-0 w-100 ">
                {this.props.list.map((item, index) => {
                  if (this.state.hoveredIndex == index) {
                    return (
                      <div className="">
                        <div className="box5   container flexcc " >
                          <div className="row w-100 ">
                            <div className="col-xl-12 mt-md-0  d-none d-lg-block">
                              <img src={imageAddress(item.values?.image)} style={{ width: "100%", borderRadius: 8 }} />
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  }
                }
                )}
              </div> */}


            </div>
          </div>


          <div className="box3 mt-0 pt-5">
            <div className="container ">
              <div className="flexcc text-center px-2 ">
                <div>
                  {/* <p className="box3-p1">Why IOTSmile</p> */}
                  <h2 className="box3-h1 my-2">A technology-first approach to internet of things for <span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#000,#202020)', color: "#fff" }}>public use</span></h2>
                </div>
              </div>
              <div className="flexcc ">
                <div className="row mx-0 w-100">
                  <div className="col-12 col-md-6 px-2 col-lg-3 ">

                    <img src={'/images/icons/dashboard-icon.svg'} className="box3-img1" />
                    <p className="box3-p2 mb-1">Intractive Dashboard</p>
                    <p className="box3-p3">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                  </div>
                  <div className="col-12 col-md-6 px-2 col-lg-3 ">
                    <img src={'/images/icons/dashboard-icon1.svg'} className="box3-img1" />
                    <p className="box3-p2 mb-1">Explore Things</p>
                    <p className="box3-p3">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                  </div>
                  <div className="col-12 col-md-6 px-2 col-lg-3 ">
                    <img src={'/images/icons/devices-icon.svg'} className="box3-img1" />
                    <p className="box3-p2 mb-1">Manage Your Things</p>
                    <p className="box3-p3">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                  </div>
                  <div className="col-12 col-md-6 px-2 col-lg-3 ">
                    <img src={'/images/icons/cash-icon.svg'} className="box3-img1" />

                    <p className="box3-p2 mb-1">Financial Management</p>
                    <p className="box3-p3">Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.</p>
                  </div>


                  {/* <div className="col-12 col-md-6 mt-5">
                  <img src={'/images/dashboard.png'} className="" width="100%" />
                </div>

                <div className="col-12 col-md-6 mt-5">
                  <img src={'/images/dash2.webp'} className="" width="100%" />
                </div> */}

                </div>

              </div >
            </div>
          </div>


          {/* <div className="container-fluid">
            <div className="row m-0">
              <div className="col-12 col-md-12 col-xl-6 col-lg-6 text-center">
                <p className="box2-p1 text-center">Designed for public use</p>
                <h1 className="box2-h1 text-center">Earn Money With The world’s most powerful IOT messaging and <br /> managment platform</h1>
                <p className="box2-p2 text-center">We agonise over the right abstractions so your teams don’t need to <br /> stitch together disparate systems or spend months integrating <br /> payments functionality.</p>
                <button class="box2-button1 text-center">Learn More</button>
                <div className="row m-0 flexcc mt-4">
                  <div className="col-12 col-sm-4 mx-4 text-start py-2 px-3" style={{ backgroundColor: "#2a83fe", borderRadius: "20px" }}>
                    <div className='flexc'>
                      <img src={'/images/icons/cost.svg'} className="box2-img1" ></img>
                      <h6 className="box2-h6">Sell Things</h6>
                    </div>
                    <p className="box2-p3">We offer client and server libraries in everything from React and PHP to .NET and iOS.</p>
                    <button className="box2-button2">Learn More</button>
                  </div>


                  <div className="col-12 col-sm-4 py-2 px-3 text-start" style={{ backgroundColor: "#2a83fe", borderRadius: "20px" }}>
                    <div className='flexc'>
                      <img src={'/images/icons/cash-icon.svg'} className="box2-img1" ></img>
                      <h6 className="box2-h6">Sell Data</h6>
                    </div>
                    <p className="box2-p3">We offer client and server libraries in everything from React and PHP to .NET and iOS.</p>
                    <button className="box2-button2 ">Learn More...</button>
                  </div>

                </div>
              </div>
              <div className="col-12 col-md-12 col-xl-6 col-lg-6 flexcc">
                <img src={'/images/intrue1.svg'} width="100%" />
              </div>

            </div>
          </div> */}
          <div className="box2 flexcc">
            <div className="container py-4">
              <div className="row m-0">
                <div className="col-12 col-md-12 col-lg-6">
                  <div className='px-2'>
                    <p className="box2-p1">Designed for public use</p>
                    <h1 className="box2-h1 mt-2 mb-1">Earn Money With The world’s most powerful IoT platform</h1>
                    <p className="box2-p2 ">We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.</p>
                    {/* <button class="box2-button1">Read More</button> */}
                  </div>
                  <div className="row m-0 mt-4">
                    <div className="col-12 px-2 col-sm-6">
                      <img src={'/images/icons/cost.svg'} className="box2-img1" ></img>
                      <h6 className="box2-h6 mb-1">Sell Things</h6>
                      <p className="box2-p3 ">We offer client and server libraries in everything from React and PHP to .NET and iOS.</p>
                      <div className='mt-3'>
                        <Link href={"/partners"}>
                          <a className="box2-button2">Learn More</a>
                        </Link>
                      </div>
                    </div>


                    <div className="col-12 px-2 col-sm-6 ">
                      <img src={'/images/icons/cash-icon.svg'} className="box2-img1" ></img>
                      <h6 className="box2-h6 mb-1">Sell Data</h6>
                      <p className="box2-p3">We offer client and server libraries in everything from React and PHP to .NET and iOS.</p>
                      <div className='mt-3'>
                        <Link href={"/partners"}>
                          <a className="box2-button2">Learn More</a>
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 flexcc">
                  <img src={'/images/intrue1.svg'} width="100%" />
                </div>

              </div>
            </div>
          </div>


          <div style={{ background: '' }}>
            <div className="container py-4">
              <div className="row py-3 flexcc w-100  ">
                {/* <div className="col-12 col-md-6  joinus-box1 ">
                            <p className="joinus-desc1 my-2">Who are we?</p>
                            <p className="joinus-desc2">We set out to reinvent the traditional construction equipment rental industry into a touchless experience. We digitalize the entire construction equipment rental process and make it extremely fast and easy for both equipment owners and users. With Antbuildz, equipment owners and users can reach their target audience within a few clicks on a PC or mobile phone.</p>
                        </div> */}
                <div className="col-12 col-md-6 px-4 order-2 order-md-1">
                  <p className="joinus-desc1 my-2" style={{ fontSize: 26 }}>IoTSmile <span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#343490)', color: "#fff" }}>Platform</span></p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
                  <div className='mt-3'>
                    <Link href={"/platform"}>
                      <a className="box2-button2" style={{ backgroundColor: 'rgb(208, 216, 224)' }}>Learn More</a>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-md-6 flexcc  px-4 order-1 order-md-2">
                  <img src="/images/cover1.jpg" className="w-100" style={{ borderRadius: "8px" }} />
                </div>
              </div>
            </div>
          </div>


          <div style={{ background: 'rgb(247,249,252)' }}>
            <div className="container py-4">
              <div className="row py-3 flexcc w-100  ">
                <div className="col-12 col-md-6 flexcc px-4 order-1 order-md-2">
                  <img src="/images/cover2.jpg" className="w-100" style={{ borderRadius: "8px" }} />
                </div>
                <div className="col-12 col-md-6 px-4 order-2">
                  <p className="joinus-desc1 my-2" style={{ fontSize: 26 }}><span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#343490)', color: "#fff" }}>Developers</span> Friendly</p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
                  <div className='mt-3'>
                    <Link href={"/developers"}>
                      <a className="box2-button2" style={{ backgroundColor: 'rgb(208, 216, 224)' }}>Visit developers section</a>
                    </Link>
                  </div>
                </div>


              </div>
            </div>
          </div>




          <div style={{ background: '' }}>
            <div className="container py-4">
              <div className="row py-3 flexcc w-100  ">
                {/* <div className="col-12 col-md-6  joinus-box1 ">
                            <p className="joinus-desc1 my-2">Who are we?</p>
                            <p className="joinus-desc2">We set out to reinvent the traditional construction equipment rental industry into a touchless experience. We digitalize the entire construction equipment rental process and make it extremely fast and easy for both equipment owners and users. With Antbuildz, equipment owners and users can reach their target audience within a few clicks on a PC or mobile phone.</p>
                        </div> */}
                <div className="col-12 col-md-6 px-4 order-2 order-md-1">
                  <p className="joinus-desc1 my-2" style={{ fontSize: 26, fontWeight: 600 }}>Connect <span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#343490)', color: "#fff" }}>Any Device</span></p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
                  <div className='mt-3'>
                    <Link href={"/academy"}>
                      <a className="box2-button2" style={{ backgroundColor: 'rgb(208, 216, 224)' }}>Visit Academy</a>
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-md-6 flexcc  px-4 order-1 order-md-2">
                  <img src="/images/cover3.jpg" className="w-100" style={{ borderRadius: "8px" }} />
                </div>
              </div>
            </div>
          </div>


          <div className='py-4' style={{ background: 'rgb(247,249,252)' }}>

            <div className="container pb-4" >
              <div className="row mx-0    ">

                <div className="col-12 flexcc mb-2">
                  <div style={{ position: 'relative' }}>
                    <p className="joinus-desc1 my-2" style={{ fontSize: 36 }}>IoTSmile <span className='px-2' style={{ borderRadius: 4, background: 'linear-gradient(to left,#7b00f7,#343490)', color: "#fff" }}>Services</span></p>
                    <div className="text-center w-100" style={{ whiteSpace: 'nowrap', overflow: 'hidden', position: 'absolute', top: 0, opacity: 0.04, fontSize: 65 }}>
                      {/* <p>/ @ % * [ ! ] / @ % * [ ! ]</p> */}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6 d-flex">

                  <div className="more-box more-box1 flexcc flex-1 d-block d-lg-flex">
                    <img src={'/images/icons/chart.svg'} className="box4-img1 white-img mb-3 mb-lg-0" />
                    <div className="mx-0 mx-lg-4">
                      <p className="box4-p1">Academy</p>
                      <p className="box4-p2">
                        We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.
                      </p>

                      <div className='mt-3'>
                        <Link href={"/academy"}>
                          <a className="glowing-button glowing-button1">Visit academy</a>
                        </Link>
                      </div>


                    </div>
                  </div>
                </div>


                <div className="col-12 col-md-6 d-flex">

                  <div className="more-box more-box2 flexcc flex-1 d-block d-lg-flex">
                    <img src={'/images/icons/circular arrows.svg'} className="box4-img1 white-img mb-3 mb-lg-0" />
                    <div className="mx-0 mx-lg-4">
                      <p className="box4-p1">Shop</p>
                      <p className="box4-p2">
                        We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.
                      </p>

                      <div className='mt-3'>
                        <Link href={"/shop"}>
                          <a className="glowing-button glowing-button2">Visit shop</a>
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>



                <div className="col-12 col-md-6 d-flex">

                  <div className="more-box more-box3 flexcc flex-1 d-block d-lg-flex">
                    <img src={'/images/icons/timeline.svg'} className="box4-img1 white-img mb-3 mb-lg-0" />
                    <div className="mx-0 mx-lg-4">
                      <p className="box4-p1">Developers</p>
                      <p className="box4-p2">
                        We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.
                      </p>
                      {/* <button className="glowing-button glowing-button3">Learn More</button> */}
                      <div className='mt-3'>
                        <Link href={"/developers"}>
                          <a className="glowing-button glowing-button3">Visit developers</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="col-12 col-md-6 d-flex">

                  <div className="more-box more-box4 flexcc flexcc flex-1 d-block d-lg-flex">
                    <img src={'/images/icons/pie chart.svg'} className="box4-img1 white-img mb-3 mb-lg-0" />
                    <div className="mx-4">
                      <p className="box4-p1">Platform</p>
                      <p className="box4-p2">
                        We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.
                      </p>

                      <div className='mt-3'>
                        <Link href={"/platform"}>
                          <a className="glowing-button glowing-button4">Learn More</a>
                        </Link>
                      </div>
                      {/* <button className="glowing-button glowing-button4">Learn More</button> */}
                    </div>
                  </div>
                </div>


              </div>

            </div>
          </div>

        </div>
      </>
    );
  }
}

export default App;
