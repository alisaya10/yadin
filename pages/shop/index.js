import React from 'react';
// import './modal.css';
import Slider from "react-slick";

// import ReactStars from 'react-rating-stars-component'


import { connect } from 'react-redux';

import HttpServices from '../../utils/Http.services';
import { checkTranslation, imageAddress, translate } from '../../utils/useful';


// import './styles/shop.css';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import CardItemBox from '../../components/CardItemBox';
import BrowseCat from '../../components/BrowseCat';
import ProductBox from '../../components/boxes/ProductBox';




// import { addToCart } from '../../stores/actions/cart.actions';

// import * as actions from '../../stores/actionsList';

export async function getServerSideProps(context) {


  let lng = context.locale
  let cat = context.query?.cat

  if (!lng) {
    lng = 'en'
  }

  const json = await (await HttpServices.syncRequest('getContents', { page: "ShopCategories", lng })).result
  const productsJson = await (await HttpServices.syncRequest('getProducts', { lng, filter: {  status: '1', special: { $exists: true, $not: { $size: 0 } } }, limit: 4, lng })).result

  const AdsJson = await (await HttpServices.syncRequest('getContents', { page: "advertisements", lng })).result
  const brandsJson = await (await HttpServices.syncRequest('getValuesWithData', { page: "brands", filter: { 'values.inShop': true } })).result

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
  // console.log(AdsJson.info)
  // const json = await res.json()

  return {
    props: { brands: brandsJson.info, categories: json.info, products: productsJson.info, ads: AdsJson.info }
  }

}



class Shop extends React.Component {
  state = {
    list: [],
    featured1: '',
    featured2: '',
    featured3: '',
    featured4: '',
    clientXonMouseDown: null,
    clientYonMouseDown: null,

    blogs: [
      { name: 'Smart watch', image: '/images/shop.webp', description: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/shop1.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/shop2.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      // { name: 'Smart phone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      // { name: 'Sensors', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

      // { name: 'Headphone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
      // { name: 'Sensor', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },

    ],
    products: [
      { name: 'Smart watch', image: '/images/smartwatch.png', description: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/cellphone.png', description: '125,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/sensor.jpg', description: '125,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/headphone.jpg', description: '125,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/sensor1.jpg', description: '125,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

    ],
    megamenu: [
      { category: 'Test1', name: 'Smart watch', image: '/images/smartwatch.png', },
      { name: 'Smart watch', image: '/images/sensor.jpg', },
      { name: 'Smart watch', image: '/images/smartwatch.png', },
      { name: 'Smart watch', image: '/images/smartwatch.png', }

    ],
    brand: [
      { name: 'Smart watch', image: '/images/dlink.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/akuvox.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/linkap-logo.png', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/xiaomi.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart watch', image: '/images/yale.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

    ],

    services: [
      {
        img: '/images/icons/delivery.png',
        title: 'payment and delivery',
        titleSec: 'free sheeping for orders over $50'
      },
      {
        img: '/images/icons/guarantee.png',
        title: 'return and refund',
        titleSec: 'free 100% money back guarante'
      },
      {
        img: '/images/icons/clock.png',
        title: 'quality support',
        titleSec: 'alway online feedback 24/7'
      },
      {
        img: '/images/icons/support.png',
        title: 'join our newsletter',
        titleSec: '10% off by subscribing'
      },

    ],
    category: [
      {
        img: '/images/icons/1.svg',
        title: 'Sensor'

      },
      {
        img: '/images/icons/2.svg',
        title: 'Sensor'

      },
      {
        img: '/images/icons/3.svg',
        title: 'Sensor'

      },
      {
        img: '/images/icons/4.svg',
        title: 'Sensor'

      },
      {
        img: '/images/icons/5.svg',
        title: 'Sensor'

      },
      {
        img: '/images/icons/6.svg',
        title: 'Sensor'

      },
      {
        img: '/images/icons/2.svg',
        title: 'Sensor'

      },


    ]
  }


  componentDidMount() {
    if (this.props.ads) {
      this.props.ads.forEach(element => {
        if (element.values.pages.includes('shop-featured_1')) {
          this.setState({ featured1: element })
        }
        if (element.values.pages.includes('shop-featured_2')) {
          this.setState({ featured2: element })
        }
        if (element.values.pages.includes('shop-featured_3')) {
          this.setState({ featured3: element })
        }
        if (element.values.pages.includes('shop-featured_4')) {
          this.setState({ featured4: element })
        }
      });
    }
  }

  addNum(prop) {
    this.props.setCart(prop);

  }




  handleOnMouseDown(e) {
    this.setState({
      clientXonMouseDown: e.clientX,
      clientYonMouseDown: e.clientY
    })
    e.preventDefault() // stops weird link dragging effect
  }

  handleOnClick(e) {
    e.stopPropagation()
    if (this.state.clientXonMouseDown !== e.clientX ||
      this.state.clientYonMouseDown !== e.clientY) {
      // prevent link click if the element was dragged
      e.preventDefault()
    }
  }


  // shoppingCart = () => {
  //   this.props.actions.addToCart({ data: this.props.info })

  // }

  render() {
    var settings = {
      dots: true,
      autoplay: true,
      dotsClass: 'slick-dots slick-thumb',
      autoplaySpeed: 4300,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };


    var settings1 = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 4200,
      infinite: true,
      speed: 1700,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
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
    }
   
    var setting3 = {
      dots: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      swipeToSlide:true,
      speed: 1200,
      slidesToShow: 6,
      slidesToScroll: 1,
      draggable:true,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 6,
            // slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
            // slidesToScroll: 3,
            // initialSlide: 2
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 3,
            // slidesToScroll: 2,
            // initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            // slidesToScroll: 1
          }
        }
      ]


    }
    var settings4 = {
      dots: false,
      autoplay: true,
      autoplaySpeed: 4200,
      infinite: true,
      speed: 700,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
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
    }

    var settings5 = {
      dots: true,
      autoplay: true,
      autoplaySpeed: 4200,
      infinite: true,
      speed: 700,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      swipeToSlide:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
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
    }
    //   const firstExample = {
    //     size: 12,
    //     value: 3,
    //     count: 5,
    //     color: "#ddd",
    //     activeColor: "#FCB942",
    //     edit: false,
    // };

    return (
      <div style={{ backgroundColor: '#fff' }}>
        <BrowseCat
          data={this.props.categories}
        />

        <div className='px-1 mb-1'>
          <div className="row w-100 m-0 pt-2">
            <div className="col-12 p-0 pt-0 col-lg-8 shop-slider" >
              <Slider {...settings} beforeChange={this.sliderChanged} >

                {this.props.ads?.map((item, index) => {
                  if (item.values.pages.includes('shop-main')) {
                    return (
                      <div className='flex-1 position-relative' >
                        <a href={item.address ?? '#'}>

                          <div className="outline-none flex-1 h-100" style={{ overflow: 'hidden', borderRadius: 8 }}>
                            <a className='w-100 h-100' href={item?.values?.address}>
                              <img src={imageAddress(item.values.image)} className="w-100 slidershop-img" style={{ flex: 1, height: '100%', objectFit: 'cover' }} />
                            </a>
                            <div style={{ position: "absolute", bottom: 90, left: '40%' }}>
                              <div className="py-2 px-5 button-offer-shop-page" style={{ borderRadius: '8px' }}>
                                <button style={{ fontSize: '22px', color: "#fff", textTransform: "capitalize", fontWeight: 'bold' }}>
                                  {translate('our offer')}
                                </button>
                              </div>

                            </div>
                          </div>
                        </a>

                      </div>
                    )
                  }
                }
                )}
                {/* </div> */}
              </Slider>


            </div>
            <div className="col-12 p-0 pt-2 pt-lg-0 col-lg-4 d-flex flex-column" style={{}}>
              <div className='row m-0 h-100'>
                <div className='d-flex col-6 col-lg-12 p-0'>
                  <a className='w-100 h-100' href={this.state.featured1?.values?.address ?? '#'}>
                    <img src={imageAddress(this.state.featured1?.values?.image)} className="w-100 px-1 pt-0 pb-1 img1-shop h-100" style={{ objectFit: 'cover' }} />
                  </a>
                </div>
                <div className='d-flex col-6 col-lg-12 p-0'>
                  <a className='w-100 h-100' href={this.state.featured2?.values?.address ?? '#'}>
                    <img src={imageAddress(this.state.featured2?.values?.image)} className="w-100 px-1 pt-0 img1-shop h-100" style={{ objectFit: 'cover' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row py-4 w-100">
          <div className="col-4 flexcc flex-column" >
            <img src="/images/icons/guarantee.png" style={{ width: '35px', marginBottom: '10px' }} />
            <p style={{ fontSize: '18px', fontWeight: '500' }}>Guarantee</p>
          </div>
          <div className="col-4 flexcc flex-column">
            <img src="/images/icons/support.png" style={{ width: '35px', marginBottom: '10px' }} />
            <p style={{ fontSize: '18px', fontWeight: '500' }}>Support</p>
          </div>
          <div className="col-4 flexcc flex-column">
            <img src="/images/icons/delivery.png" style={{ width: '35px', marginBottom: '10px' }} />
            <p style={{ fontSize: '18px', fontWeight: '500' }}>Delivery</p>
          </div>

        </div> */}

        <div className="container-fluid flexcc py-1 m-0 mb-4 pt-3" style={{ backgroundColor: '#fff' }}>
          <div className="row w-100 m-0 p-0 flexcc">
            <div className="col-md-12 flexcc text-center">
              <div className="w-100 flexcc">
                <div style={{ width: '100%' }}>
                  <div className="mt-2 mb-1 w-100 container-fluid shop-categories-slider " >
                    <p className="top-head-title-for-cat mb-4" style={{ color: '#000' }}>{checkTranslation('{{lang}}Explore-Categories')}</p>
                    <Slider {...setting3} beforeChange={this.sliderChanged} >
                      {this.props.categories?.map((prop, index) => {
                        return (
                          <Link href={'/shop/' + prop._id}>
                            <a draggable={false}
                              className="d-flex flex-column p-1 align-items-center pb-4"
                              style={{ userSelect: 'none' }}
                              onMouseDown={e => this.handleOnMouseDown(e)}
                              onClick={e => this.handleOnClick(e)}
                            >
                              <div style={{ userSelect: 'none' }}>
                                <img draggable={false} src={imageAddress(prop.values?.image)} style={{ userSelect: 'none' }} className="serviceicon-shop" />
                              </div>
                              <div className='d-flex py-1 flex-column justify-content-center align-items-center' style={{ userSelect: 'none' }}>
                                <p className="servicedsc-shop mt-2 m-0 mx-2" style={{ fontWeight: '500', fontSize: 15, userSelect: 'none',color: '#000'  }}>{prop.values?.title}</p>
                                {/* <p className="servicedsc-shop mt-0 m-0 mx-2" style={{ fontWeight: '400', fontSize: 10, userSelect: 'none', color: '#9ab',textTransform:'uppercase' }}>{checkTranslation('{{lang}}View-Products')}</p> */}

                              </div>
                            </a>
                          </Link>
                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className=" container-fluid py-3 shop-categories-slider" style={{ backgroundColor: '#f2f6f8' }}>
          <div className=' mt-3 mb-4 container'>
            <p className="productsdesc1 mb-0" style={{ textAlign: 'center', fontSize: '22px', color: '#333333', fontWeight: '500' }} >{checkTranslation('{{lang}}Featured-Products')}</p>
            <p className="productsdesc1 mt-0" style={{ textAlign: 'center', fontSize: '15px', color: '#666', fontWeight: 400 }}>{checkTranslation('{{lang}}Today’s-deal-and-more')}</p>
            {/* <p className="productsdesc1" style={{textAlign:'center',fontSize:'24px',color:'#333333'}}>Customer Trending</p> */}
            <div className=" m-0 mt-4">
              <div className="w-100 row m-0">
                <div className="w-100">
                  <div className='flex-1 flexcc w-100 position-relative' >
                    <div className="outline-none w-100 w-50 flex-1 h-100 product-slider" style={{ borderRadius: 8 }}>
                      <Slider {...settings5} beforeChange={this.sliderChanged}>

                        {this.props.products.map((item, index) => {
                          if (item.special.includes('featured')) {

                            return (
                              <div className='pt-3 pb-4 h-100 '>
                                <ProductBox item={item} key={index} />
                              </div>

                            )
                          }
                        }
                        )}
                        {/* </div> */}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className=" container-fluid shop-categories-slider shop-categories-slider-2 pb-5 pt-4">
          <div style={{ padding: '12px' }}>
            <div className="row w-100  m-0">
              <div className="w-100">
                <div className='flex-1 flexcc w-100 position-relative' >
                  <div className="outline-none w-100 w-50 flex-1 h-100" style={{ borderRadius: 8 }}>

                    <Slider {...settings1} beforeChange={this.sliderChanged}>
                      <div className="px-3">
                        <img src={imageAddress(this.state.featured3?.values?.image)} style={{ borderRadius: '8px', width: '100%' }} />
                      </div>
                      <div className="px-3">
                        <img src={imageAddress(this.state.featured2?.values?.image)} style={{ borderRadius: '8px', width: '100%' }} />
                      </div>
                      <div className="px-3">
                        <img src={imageAddress(this.state.featured1?.values?.image)} style={{ borderRadius: '8px', width: '100%' }} />
                      </div>
                      <div className="px-3">
                        <img src={imageAddress(this.state.featured4?.values?.image)} style={{ borderRadius: '8px', width: '100%' }} />
                      </div>

                    </Slider>
                  </div>
                </div>


              </div>

            </div>

          </div>
        </div>










        <div className=" container-fluid py-3 shop-categories-slider"  style={{ backgroundColor: '#f2f6f8' }}>
          <div className='container mt-3 mb-4'>
            <p className="productsdesc1 mb-0" style={{ textAlign: 'center', fontSize: '22px', color: '#333333', fontWeight: '500' }}>{checkTranslation('{{lang}}Trending-Products')}</p>
            <p className="productsdesc1 mt-0" style={{ textAlign: 'center', fontSize: '15px', color: '#666', fontWeight: 400 }}>{checkTranslation('{{lang}}Hot-and-ready-to-deliver')}</p>
            {/* <p className="productsdesc1" style={{textAlign:'center',fontSize:'24px',color:'#333333'}}>Customer Trending</p> */}
            <div className=" m-0 mt-4">
              <div className="w-100 row m-0">
                <div className="w-100">
                  <div className='flex-1 flexcc w-100 position-relative' >
                    <div className="outline-none w-100 w-50 flex-1 h-100" style={{ borderRadius: 8 }}>
                      <Slider {...settings5} beforeChange={this.sliderChanged}>

                        {this.props.products.map((item, index) => {
                          if (item.special.includes('trending')) {
                            return (

                              <div className='pt-3 pb-4 h-100'>
                                <ProductBox
                                  item={item}
                                  key={index}

                                />
                              </div>

                            )
                          }
                        }
                        )}
                        {/* </div> */}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>






        <div className=" container mt-5 mb-5 shop-categories-slider shop-categories-slider-3">
          <div style={{ padding: '0px' }}>
            {/* <p className="productsdesc2 mx-1 mb-2" style={{fontSize:22}}>Brands</p> */}
            <div className="barandbox">
              <div className="row W-100 m-0">
                <div className="col-12  w-100 ">
                  <Slider {...settings4} beforeChange={this.sliderChanged}>

                    {this.props.brands?.map((item, index) => {
                      return (

                        <div className=" p-2 w-100 outline-none flexcc flex-1 h-100" >
                          <div className=" p-2 w-100 outline-none flexcc flex-1 h-100" >
                            <img src={imageAddress(item.values.images)} className="brand-img p-0 m-0" />
                          </div>

                        </div>
                      )
                    }
                    )}

                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>




        <div className="container-fluid p-0 m-0 " style={{ borderBottom: '1px solid #eee' }}>
          <div className="services-shop row w-100 m-0 p-0 pb-3">
            <div className="col-xl-12 col-md-12 flexcc text-center">
              <div className="w-100 flexc flex-column">
                {/* <p className="serviceheader-shop ">Explore Popular Categories</p> */}
                {/* <p className="servicedsc1-shop mb-2" style={{}}>It enables device connectivity via industry standard IoT protocols - MQTT, CoAP and HTTP and supports both cloud and on-premises deployments. </p> */}
                <div style={{ width: '100%' }}>
                  <div className="mt-3 w-100 d-block text-center d-sm-flex align-items-center justify-content-around" >
                    {this.state.services.map((prop, index) => {
                      return (
                        <div className="for-responsive d-flex p-1 align-items-center ">
                          <div>
                            <img src={prop.img} className="serviceicon-shop-first" />
                          </div>
                          <div className='d-flex flex-column justify-content-center align-items-start'>
                            <p className="servicedsc-shop-edit m-0 mx-2" style={{ fontWeight: '400', fontSize: 16 }}>{prop.title}</p>
                            <p className="servicedsc-shop-1 m-0 mx-2" style={{ fontWeight: '300', fontSize: 13 }}>{prop.titleSec}</p>
                          </div>
                        </div>
                      )
                    })}


                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>









      </div>
    )

  }
}



// export default Shop;
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    settings: state.settings

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (item, action, extra) => dispatch({ type: 'SET_CART', item, action, extra }),
    setUser: (loggedin, info, isCounterpart) => dispatch({ type: 'SET_USER', loggedin, info, isCounterpart })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
