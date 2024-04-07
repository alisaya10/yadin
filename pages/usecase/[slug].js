// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
import Footer from '../../components/footer';
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { Line, Bar } from 'react-chartjs-2';
import HttpServices from '../../utils/Http.services';
import { checkTranslation, imageAddress } from '../../utils/useful';
import ProductBox from '../../components/boxes/ProductBox';
// import CourseBox from '../../components/boxes/CourseBox_';
import CourseBox from '../../components/boxes/CourseBox';



export async function getServerSideProps(context) {


  let slug = null

  if (context?.query?.slug) {
    slug = context?.query?.slug
  }

  let lng = context.locale
  if (!lng) {
    lng = 'en'
  }


  const res = await (await HttpServices.syncRequest('getOneContent', { _id: slug })).result

  const productsJson = await (await HttpServices.syncRequest('getProducts', { lng, filter: { available: true, status: '1', usecases: res?.info?._id }, limit: 4, lng })).result


  const coursesJson = await (await HttpServices.syncRequest('getCourses', { lng, filter: { usecases: res?.info?._id }, limit: 4, lng })).result


  // const similarRes = await (await HttpServices.syncRequest('getRecommendedBlogs', { slug, lng })).result
  // console.log(productsJson)

  return {
    props: JSON.parse(JSON.stringify({ info: res ? res.info : null, products: productsJson.info, courses: coursesJson?.info }))
  }



}


class Usecase extends React.Component {
  state = {
    hoveredIndex: 0,
    list: [
      { name: 'Smart watch', image: '/images/smartwatch.png', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart phone', image: '/images/cellphone.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      { name: 'Sensors', image: '/images/sensor.jpg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

      { name: 'Headphone', image: '/images/headphone.jpg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
      { name: 'Sensor', image: '/images/sensor1.jpg', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },


    ]
  }




  data = {
    labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: '#',
        data: [2, 5, 8, 70, 30, 50],
        fill: false,
        backgroundColor: '#5B1AC5',
        borderColor: '#5B1AC5',
      },
    ],
  };

  options = {
    plugins: {
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
    },
    bezierCurve: true,
    responsive: true,
    elements: {
      line: {
        tension: 0.4
      }
    },

    scales: {

      yAxes: [
        {

          ticks: {
            beginAtZero: true,
          },

        },

      ],
      xAxes: [{

        gridLines: {
          display: false
        },

      }]
    },
  };



  componentDidMount() {
    this.getData()
  }



  getData() {
    let id = null//this.props.match.params.id

    if (id) {
      fetch(
        'https://iotsmile.com/iot/apiv1',
        {
          method: "POST",
          body: JSON.stringify({
            route: "values/getOneValue",
            content: {
              // page: "Usecase",
              _id: id
            }
          })
        }
      )
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({
            information: json.info
          })
        })
    }
    // else{
    //   // this.props.history.goBack()
    // }

  }




  render() {
    var settings = {
      dots: true,
      autoplay: false,
      autoplaySpeed: 2000,
      infinite: true,
      speed: 500,
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
    };
    return (
      <div className="main-page " style={{ backgroundColor: '' }}>
        <div className="usecase-hero d-flex" style={{ position: 'relative', minHeight: '60vh', backgroundImage: "url(" + imageAddress(this.props.info?.values?.image, null, 'large') + ")", backgroundSize: 'cover', backgroundPosition: 'center' }}>

          <div style={{ backgroundColor: '#00000090', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>

          </div>

          <div className="container flex-1">
            <div className="row h-100">
              <div className="col-12 col-md-12 flexcc flex-column p-3">

                <div className='w-100'>
                  <div className='flexc'>
                    <div className='flexcc' style={{ backgroundColor: '#fff', borderRadius: 30, width: 120, height: 120 }}>
                      <img className=' ' src={imageAddress(this.props.info?.values?.icon)} style={{ height: 100 }} />
                    </div>
                  </div>
                  <h1 className="usecase-hero-header mb-2 mt-2" >{this.props.info?.values?.title}</h1>
                  <p className="usecase-hero-desc mb-4">{this.props.info?.values?.description}</p>
                  <button className="usecase-hero-button">{checkTranslation('{{lang}}Talk-to-an-expert')}</button>
                </div>
              </div>
              {/* <div className="col-12 col-md-6 flexcc flex-column p-3">
                <div className="usecase-hero-box1 flexcc flex-column pb-4">
                  <img className='mt-2 mb-2' src={imageAddress(this.props.info?.values?.icon)} style={{ height: 120 }} />

                  <div className="row h-100 w-100 mt-2">
                    <div className="col-6 flexcc p-1">
                      <div className="box1-count1 flexcc flex-column">
                        <p className="box1-count1-desc1">21</p>

                        <p className="box1-count1-desc2">Courses count</p>
                      </div>
                    </div>
                    <div className="col-6 flexcc p-1">
                      <div className="box1-count1 flexcc flex-column">
                        <p className="box1-count1-desc1">50</p>
                        <p className="box1-count1-desc2">Related post</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 mt-2">
                    <p className="box1-desc1">Related tags</p>
                    <div className="d-flex">
                      {["sensors", 'electrinics', 'LoRa'].map((prop, index) => {
                        return (
                          <div className="tags ">
                            <p className="tags-desc m-1">{prop}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="w-100 mt-2">
                    <p className="box1-desc1">Tecnologies</p>
                    <div className="d-flex">
                      {["Zigbee", 'Bluetooth', 'LoRa'].map((prop, index) => {
                        return (
                          <div className="tags ">
                            <p className="tags-desc m-1">{prop}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="mt-2 w-100">
                    <p className="box1-desc1">Popularity</p>
                    <Bar data={this.data} options={this.options} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="w-100 ">
          <div className="container py-5  h-100">
            <div className='w-100'>
              <p className="usecase-box2-p1">{this.props.info?.values?.title}</p>
              {/* <p className="usecase-box2-p2">Zoho Assist is cloud-based remote support and remote access software that helps you support customers from a distance through web-based, on-demand remote support sessions. Set up unattended remote access and manage remote PCs, laptops, mobile devices, and servers effortlessly. A few seconds is all you need to establish secure connections to offer your customers remote support solutions.</p> */}
              <div className='ck-content'>
                <div className="mb-1 mt-4" style={{ fontSize: '17px', lineHeight: '30px', fontWeight: '350' }} dangerouslySetInnerHTML={{ __html: this.props.info?.values?.body }}></div>
              </div>
            </div>
          </div>
        </div>



        <div className='pt-5 pb-5 ' style={{ backgroundColor: '#f2f6f8' }}>
          <div className="container">
            <div className=" mb-3">
              <p className="slider-header  px-2" style={{fontWeight:500, fontSize: 20 }}>{checkTranslation('{{lang}}Recomended-Courses')}</p>
            </div>

            <div className="w-100 row m-0">

              {this.props.courses?.map((item, index) => {
                return (
                  <CourseBox item={item} key={index} />
                )
              }
              )}

              {(!this.props.courses || this.props.courses?.length == 0) && (
                <div className="flexcc w-100 mb-5">
                  <p>{checkTranslation('{{lang}}foundNothing')}</p>
                </div>
              )}


            </div>
          </div>
        </div>




        <div className='pt-5 pb-5 mt-1' style={{ backgroundColor: '#f2f6f8' }}>
          <div className="container">
            <div className=" mb-3">
              <p className="slider-header  px-2" style={{fontWeight:500, fontSize: 20 }}>{checkTranslation('{{lang}}Recomended-products')}</p>
            </div>

            <div className="w-100 row m-0">

              {this.props.products?.map((item, index) => {
                return (
                  <div className='col-12 col-md-6 col-lg-4'>
                    <ProductBox item={item} key={index} />
                  </div>
                )
              }
              )}

              {(!this.props.products || this.props.products?.length == 0) && (
                <div className="flexcc w-100 mb-5">
                  <p>{checkTranslation('{{lang}}foundNothing')}</p>
                </div>
              )}


            </div>
          </div>
        </div>





        {/* <div className="container p-1">
          <p className="access-header">Fast access</p>
          <div className="d-flex flex-wrap pb-5">
            {['Getting started', 'Developers', 'Courses', 'Contact us'].map((prop, index) => {
              return (
                <div className=" p-1  ">
                  <button className="access-buttons">{prop}</button>
                </div>
              )
            })}
          </div>
        </div> */}

        {/* <Footer /> */}
      </div>
    );
  }
}

export default Usecase;
