
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
  EffectCoverflow, Pagination
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
    things:[
      {
        title:"Intractive Dashboard",
        desc:"Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img:"/images/icons/dashboard-icon.svg",
      },
      {
        title:"Explore Things",
        desc:"Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img:"/images/icons/dashboard-icon1.svg",
      },
      {
        title:"Manage Your Things",
        desc:"Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img:"/images/icons/devices-icon.svg",
      },
      {
        title:"Financial Management",
        desc:"Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
        img:"/images/icons/cash-icon.svg",
      },
    ],
    imgList:[
      {
        img:"/images/ag1.jpg",
      },
      {
        img:"/images/blog1.jpeg",
      },
      {
        img:"/images/ag1.jpg",
      },
      {
        img:"/images/blog1.jpeg",
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
    this.setState({imageIndex:index})
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
          <div className="container-fluid py-5" style={{backgroundColor:"#EBF0F3"}}>
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
          </div>
          {/* </div> */}
          <div className="container-fluid p-0">
            <div className="row w-100 mt-4 m-0 px-4" >

              {/* <div className="flexcc" style={{position:'relative'}}>
              <h1 className="main-header text-center mb-5">Where to Use?</h1>
              <h1 className="main-header text-center mb-5" style={{position:'absolute',top:-30, zIndex:0,opacity:0.1,fontSize:50}}>Internet of things</h1>
            </div> */}




              <div className="col-12 col-xl-6 p-0" style={{ position: "relative" }}>
                <div style={{}}>
                  <h1 className=" text-center mb-0" style={{ fontWeight: 600 }}>Use cases</h1>
                  <p className=" mb-4 text-center mt-0" style={{ fontWeight: '500', fontSize: 20, letterSpacing: 1 }}>Of IOT Smile platform</p>
                </div>

                <Swiper effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'} coverflowEffect={{
                  "rotate": 50,
                  "stretch": 0,
                  "depth": 200,
                  "modifier": 1,
                  "slideShadows": false
                }} pagination={false} className="mySwiper">

                  {this.props.list.map((item, index) => {

                    console.log(item.values)
                    return (
                      <div className="" >
                        <div key={index} className="">
                          <div className={"   " + (this.state.hoveredIndex == index ? '' : '')} style={{ background: this.state.hoveredIndex == index ? "" : '' }}>
                            <SwiperSlide>
                              <div className='p-3 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: "#2A83FE", borderRadius: "8px" }}>
                                <img onClick={() => this.setState({ hoveredIndex: index })} src={imageAddress(item.values?.icon)} className={'' + (this.state.hoveredIndex == index ? "invert" : "")} style={{ width: "150px", height: "150px", zIndex: 1, objectFit: 'contain' }} />
                                <p className="" style={{ color: "#fff" }}>{item?.values?.title}</p>
                              </div>
                            </SwiperSlide>

                          </div>

                        </div>

                      </div>
                    )
                  }
                  )}
                </Swiper>
                {this.props.list.map((item, index) => {
                  if (this.state.hoveredIndex == index) {
                    return (

                      <div className='d-flex flex-column align-items-center mt-5'>
                        <p className='px-5' style={{ color: "#000" }}>{item?.values?.description}</p>
                        <button className='my-3' style={{ padding: "8px 30px", textTransform: "uppercase", borderRadius: "20px", color: "#fff", backgroundColor: "#2A83FE" }}>learn more ...</button>

                      </div>

                    )
                  }
                })}


              </div>
              <div className="col-12 col-xl-6 p-0 w-100 ">
                {this.props.list.map((item, index) => {
                  if (this.state.hoveredIndex == index) {
                    return (
                      <div className="">
                        <div className="box5  container flexcc " style={{ background: this.state.hoveredIndex == index ? 'linear-gradient(to right bottom,' + item.values.color1 + ',' + item.values.color2 + ')' : '' }}>
                          <div className="row w-100 ">
                            <div className="col-xl-12 mt-md-0  d-none d-lg-block">
                              <img src={imageAddress(item.values?.image)} style={{ width: "100%", borderRadius: 15 }} />
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  }
                }
                )}
              </div>


            </div>
          </div>

         
            <div className="container-fluid my-5">
              <div className="flexcc flex-column">
              </div>
              <div className="flexcc ">
                <div className="row mx-0 w-100">
                  <div className="col-12 col-md-12 col-lg-6 col-xl-6 px-4 text-center">
                    <div className='my-2'>
                    <p className="box3-p1">Why IOTSmile</p>
                    </div>
                    <div className='row'>
                      {this.state.things.map((item,index) => {
                        return (
                          <div className='col-xl-6' key={index} >
                          <div onClick={() => this.setState({ hoveredIndex: index })} className='px-5 pb-2 my-2 cursor-pointer' style={{backgroundColor:this.state.hoveredIndex == index ? "#2a83fe":"#D0DFF0",borderRadius:"20px"}}>
                          <img src={item.img} className="box3-img1 " />
                          <p className="box3-p2" style={{color:this.state.hoveredIndex == index ? "#FFF":"#000"}}>{item.title}</p>
                          <p className="box3-p3" style={{color:this.state.hoveredIndex == index ? "#ffffffdd":"#000"}}>{item.desc}</p>
                          </div>
                        </div>
                        )
                      })}
                    </div>
                  </div>

                 
                  {this.props.list.map((item, index) => {
                  if (this.state.hoveredIndex == index) {
                    return (
                  <div className="col-12 col-md-12 col-lg-6 col-xl-6 p-2" style={{ backgroundColor: "#2A83FE", borderRadius: "20px" }}>
                   
                        <img className=""  src={imageAddress(item.values?.image)} style={{width:"100%",height:"100%",borderRadius:"20px"}} />

                     
                  </div>
                    )
                  }})}
                  



                </div>

              </div >
            </div>
         
         
            <div className="container-fluid">
              <div className="row m-0">
                <div className="col-12 col-md-12 col-xl-6 col-lg-6 text-center">
                  <p className="box2-p1 text-center">Designed for public use</p>
                  <h1 className="box2-h1 text-center">Earn Money With The world’s most powerful IOT messaging and <br/> managment platform</h1>
                  <p className="box2-p2 text-center">We agonise over the right abstractions so your teams don’t need to <br /> stitch together disparate systems or spend months integrating <br /> payments functionality.</p>
                  <button class="box2-button1 text-center">Learn More</button>
                  <div className="row m-0 flexcc mt-4">
                    <div className="col-12 col-sm-4 mx-4 text-start py-2 px-3" style={{backgroundColor:"#2a83fe",borderRadius:"20px"}}>
                      <div className='flexc'>
                      <img src={'/images/icons/cost.svg'} className="box2-img1" ></img>
                      <h6 className="box2-h6">Sell Things</h6>
                      </div>
                      <p className="box2-p3">We offer client and server libraries in everything from React and PHP to .NET and iOS.</p>
                      <button className="box2-button2">Learn More</button>
                    </div>


                    <div className="col-12 col-sm-4 py-2 px-3 text-start" style={{backgroundColor:"#2a83fe",borderRadius:"20px"}}>
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
            </div>
          
          <div style={{ background: '#EBF0F3' }}>
            <div className="container my-5">
              <div className="row  flexcc py-3 w-100">
                
                <div className="col-12 col-xl-12 text-center col-md-6 px-4 order-2 order-md-1 ">
                  <p className="joinus-desc1 my-2">About IOT </p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
                  <button className=" box2-button1 ">Learn More...</button>

                </div>
                {/* <div className="col-12 col-md-6 px-4 order-1 order-md-2   ">
                  <img src="/images/robin-glauser-WgMlXuSv-8A-unsplash.jpg" className="w-100" />
                </div> */}
              </div>
            </div>
          </div>
          <div style={{backgroundColor:"#EBF0F3"}}>
            <div className="container">
              <div className="row flexcc py-3 w-100  ">
                {/* <div className="col-12 col-md-6  joinus-box1 ">
                            <p className="joinus-desc1 my-2">Who are we?</p>
                            <p className="joinus-desc2">We set out to reinvent the traditional construction equipment rental industry into a touchless experience. We digitalize the entire construction equipment rental process and make it extremely fast and easy for both equipment owners and users. With Antbuildz, equipment owners and users can reach their target audience within a few clicks on a PC or mobile phone.</p>
                        </div> */}
                <div className="col-12 col-xl-12 col-md-6  px-4  ">
                  <div className='p-2 flexc' style={{backgroundColor:"#2A83FE",borderRadius:"20px"}}>
                  <img src="/images/cristiano-firmani-tmTidmpILWw-unsplash.jpg" className="" style={{borderRadius:"20px",objectFit:"cover",width:"100%",height:"200px"}} />
                  </div>
                </div>
                {/* <div className="col-12 col-md-6 px-4  ">
                  <p className="joinus-desc1  my-2">IOT smile</p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div style={{ background: '#EBF0F3' }}>
            <div className="container">
              <div className="row py-3 flexcc w-100  ">
                {/* <div className="col-12 col-md-6  joinus-box1 ">
                            <p className="joinus-desc1 my-2">Who are we?</p>
                            <p className="joinus-desc2">We set out to reinvent the traditional construction equipment rental industry into a touchless experience. We digitalize the entire construction equipment rental process and make it extremely fast and easy for both equipment owners and users. With Antbuildz, equipment owners and users can reach their target audience within a few clicks on a PC or mobile phone.</p>
                        </div> */}
                <div className="col-12 col-md-6 px-4 order-2 order-md-1">
                  <p className="joinus-desc1 my-2">About IOT </p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
                </div>
                <div className="col-12 col-md-6 flexcc  px-4 order-1 order-md-2">
                  <img src="/images/domenico-loia-EhTcC9sYXsw-unsplash.jpg" className="w-100" style={{borderRadius:"20px"}}  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#EBF0F3' }}>
            <div className="container">
              <div className="row py-3 flexcc w-100  ">
              <div className="col-12 col-md-6 flexcc px-4 order-1 order-md-2">
                  <img src="/images/domenico-loia-EhTcC9sYXsw-unsplash.jpg" className="w-100" style={{borderRadius:"20px"}} />
                </div>
                <div className="col-12 col-md-6 px-4 order-2">
                  <p className="joinus-desc1 my-2">About IOT </p>
                  <p className="joinus-desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </p>
                </div>
               
                
              </div>
            </div>
          </div>




          <div className="container">
            <div className="row mx-0    ">

              <div className="col-12">
                <div style={{ position: 'relative' }}>
                  <h1 className="mt-5 text-center mb-3" style={{ textTransform: '', fontWeight: 600 }}>IoTSmile Services</h1>
                  {/* <p className=" mb-4 text-center mt-0" style={{ fontWeight: '500', fontSize: 20, textTransform: 'uppercase', letterSpacing: 4 }}>To Other sections</p> */}
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
                    <button className="glowing-button glowing-button1">View Page</button>
                  </div>
                </div>
              </div>


              <div className="col-12 col-md-6 d-flex">

                <div className="more-box more-box2 flexcc flex-1 d-block d-lg-flex">
                  <img src={'/images/icons/circular arrows.svg'} className="box4-img1 white-img mb-3 mb-lg-0" />
                  <div className="mx-0 mx-lg-4">
                    <p className="box4-p1">Developers</p>
                    <p className="box4-p2">
                      We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.
                    </p>
                    <button className="glowing-button glowing-button2">Learn More</button>
                  </div>
                </div>
              </div>



              <div className="col-12 col-md-6 d-flex">

                <div className="more-box more-box3 flexcc flex-1 d-block d-lg-flex">
                  <img src={'/images/icons/timeline.svg'} className="box4-img1 white-img mb-3 mb-lg-0" />
                  <div className="mx-0 mx-lg-4">
                    <p className="box4-p1">Market</p>
                    <p className="box4-p2">
                      We agonise over the right abstractions so your teams don’t need to stitch together disparate systems or spend months integrating payments functionality.
                    </p>
                    <button className="glowing-button glowing-button3">Learn More</button>
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
                    <button className="glowing-button glowing-button4">Learn More</button>
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
