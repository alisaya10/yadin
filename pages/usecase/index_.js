// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
import Footer from '../../components/footer';
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { Line, Bar } from 'react-chartjs-2';



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

  // const similarRes = await (await HttpServices.syncRequest('getRecommendedBlogs', { slug, lng })).result


  return {
      props: JSON.parse(JSON.stringify({ info: res ? res.info : null }))
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
      <div className="main-page" style={{ backgroundColor: '' }}>
        <div className="usecase-hero d-flex" style={{ backgroundImage: "url(https://platform.iotsmile.com/assets/uploads/" + this.state.information?.values?.image?.address + ")", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container flex-1">
            <div className="row h-100">
              <div className="col-12 col-md-6 flexcc flex-column p-3">
                <div> <h1 className="usecase-hero-header">{this.state.information?.values?.description}</h1>
                  <p className="usecase-hero-desc">Unique and powerful suite of software to run your entire business, brought to you by a company with the long term vision to transform the way you work.</p>
                  <button className="usecase-hero-button">Talk to an expert</button>
                </div>
              </div>
              <div className="col-12 col-md-6 flexcc flex-column p-3">
                <div className="usecase-hero-box1 flexcc flex-column">
                  <p className="usecase-hero-box1-header">{this.state.information?.values?.title}</p>
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
                    {/* <Bar data={this.data} options={this.options} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 ">
          <div className="container py-5 flexcc h-100">
            <div>
              <p className="usecase-box2-p1">Instant Remote Support Software. Unattended Remote Access Software.</p>
              <p className="usecase-box2-p2">Zoho Assist is cloud-based remote support and remote access software that helps you support customers from a distance through web-based, on-demand remote support sessions. Set up unattended remote access and manage remote PCs, laptops, mobile devices, and servers effortlessly. A few seconds is all you need to establish secure connections to offer your customers remote support solutions.</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" mb-3">
            <p className="slider-header">Recomended product</p>
          </div>
          <Slider {...settings} beforeChange={this.sliderChanged}>

            {this.state.list.map((item, index) => {
              return (
                // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                <div className="mb-4 p-2 outline-none" >

                  <div className=" usecase-box3 flexcc flex-column " >
                    <img src={item.image} className="usecase-box3-img" />
                    {/* <p className="box1-p1 ">USE CASE</p> */}
                    <p className="usecase-box3-p2 mt-2">{item.name}</p>
                    <p className="usecase-box3-p3">{item.description}</p>
                    <button className="usecase-box3-button" >Add to cart</button>
                  </div>
                </div>

              )
            }
            )}
            {/* </div> */}
          </Slider>
        </div>
        <div className="container p-1">
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
        </div>

        <Footer />
      </div>
    );
  }
}

export default Usecase;
