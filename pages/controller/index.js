// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
import Footer from '../../components/footer';
import Gauge from '../../components/Gauge';
import Slider from "react-slick";
import ButtonController from '../../components/controller/ButtonController';
import SliderController from '../../components/controller/SliderController';
import SwitchController from '../../components/controller/SwitchController';
import FormController from '../../components/controller/FormController';
import DragDrop from '../../components/controller/DragDrop';
import GaugeController from '../../components/controller/GaugeController';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
// import { Line, Bar } from 'react-chartjs-2';
// import FormViewer from '../../components/FormViewer';
// import './controler.css';

class Controller extends React.Component {
  state = {
    hoveredIndex: 0,
    activeTab: 0,
    list: [
      { title: 'riding', image: '/images/icons/bycicle.png', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { title: 'Walking', image: '/images/icons/walk.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      { title: 'Running', image: '/images/icons/run.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },
      { title: 'Exersise', image: '/images/icons/exersise.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

    ],
    pages: [
      { component: 'FormController', image: '/images/icons/bycicle.png', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { component: 'SwitchController', image: '/images/icons/walk.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      { component: 'ButtonController', image: '/images/icons/run.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },
      { component: 'DragDrop', image: '/images/icons/exersise.png', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

    ],
    controllerComponent: {
      "SliderController": SliderController,
      "ButtonController": ButtonController,
      "SwitchController": SwitchController,
      "FormController": FormController,
      "GaugeController": GaugeController,
      "DragDrop": DragDrop,
    }


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





  render() {
    var settings = {
      dots: true,
      autoplay: false,
      autoplaySpeed: 2000,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 770,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
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
      <div>
        <div className=" controler-hero-bg" >

          <div className="px-4 w-100">
            <div className="row w-100 m-0 p-4 control-slider">

              <Slider {...settings} beforeChange={this.sliderChanged}>

                <div className="w-100">
                  <Gauge />
                </div>
                <div className="w-100">
                  <Gauge />
                </div>
                <div className="w-100">
                  <Gauge />
                </div>


              </Slider>
            </div>
          </div>
          <div className="row w-100">
            {this.state.list.map((item, index) => {
              return (

                <div onClick={() => this.setState({ activeTab: index })} className={"col-3 flexcc flex-column control-tab " + (this.state.activeTab == index ? 'active' : '')}>
                  <img className="controler-img1" src={item.image} />

                  <p className="controler-p1">{item.title}</p>
                  <div className="control-triangel"></div>
                </div>
              )
            })}
          </div>


        </div>
        {this.state.pages.map((item, index) => {
          if (this.state.activeTab == index) {
            let MyComponent = this.state.controllerComponent[item.component]

            if (MyComponent) {
              return (
                <div className={"w-100 flexcc p-5"} style={{backgroundColor:'#fff'}}>
                  <MyComponent />
                </div>
              )
            }
          }
        })}



        <Footer />
      </div>
    );
  }
}

export default Controller;
