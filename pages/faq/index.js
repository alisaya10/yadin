// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
import Footer from '../../components/footer';
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { Line, Bar } from 'react-chartjs-2';
// import './styles/FAQ.css';

class FAQ extends React.Component {
  state = {
    hoveredIndex: 0,
    list: [
      { FAQtitle: 'Strong Customer Authentication (SCA) enforcement date', FAQdescription: 'Last updated: 26 May 2021 Strong Customer Authentication (SCA) requirements officially went into effect on 14 September 2019, and the European Banking…', FAQtag1: 'Payments', FAQtag2: 'Strong Customer Authentication' },
      { FAQtitle: 'Sign in to your Stripe account without a two-step authentication device or backup code', FAQdescription: 'Last updated: 26 May 2021 Strong Customer Authentication (SCA) requirements officially went into effect on 14 September 2019, and the European Banking…', FAQtag1: 'Account', FAQtag2: 'Dashboard' },
      { FAQtitle: 'Enter customer payment information manually into Stripe for mail or telephone orders', FAQdescription: 'When you manually enter card information into the Dashboard, Stripe isn’t able to verify that you are keeping this information secure—so you’re…', FAQtag1: 'Payments', FAQtag2: '' },
      { FAQtitle: 'Strong Customer Authentication (SCA) enforcement date', FAQdescription: 'Last updated: 26 May 2021 Strong Customer Authentication (SCA) requirements officially went into effect on 14 September 2019, and the European Banking…', FAQtag1: 'Payments', FAQtag2: 'Strong Customer Authentication' },
      { FAQtitle: 'Strong Customer Authentication (SCA) enforcement date', FAQdescription: 'Last updated: 26 May 2021 Strong Customer Authentication (SCA) requirements officially went into effect on 14 September 2019, and the European Banking…', FAQtag1: 'Payments', FAQtag2: 'Strong Customer Authentication' },
      { FAQtitle: 'Strong Customer Authentication (SCA) enforcement date', FAQdescription: 'Last updated: 26 May 2021 Strong Customer Authentication (SCA) requirements officially went into effect on 14 September 2019, and the European Banking…', FAQtag1: 'Payments', FAQtag2: 'Strong Customer Authentication' }


    ]
    ,
    tags: [
      { tags: 'Account' },
      { tags: 'Billing' },
      { tags: 'Connect' },
      { tags: 'Disputes' },
      { tags: 'Getting started' },
      { tags: 'Payments' },
      { tags: 'Payouts' },
      { tags: 'Privacy' },
      { tags: 'Refunds' },
      { tags: 'Strong Customer Authentication' },
      { tags: 'Third-party integrations' },

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
      <div style={{backgroundColor:'#fff'}}>
        <div className="squer d-none d-md-flex">
          <div className="squer1"></div>
          <div className="squer2"></div>
          <div className="squer3"></div>
        </div>
        <div className="container">
          <div className="row py-5">
            <div className="col-12 col-md-7">
              <p className="FAQ-p1">How can we help?</p>
              <input className="FAQ-input my-2" placeholder="Search help articles ..." />
              <p className="mt-4">Popular articles</p>

              {this.state.list.map((item, index) => {
                return (
                  <div className="d-flex mt-3">
                    <div className="FAQquestion px-2">
                      <div className="FAQquestion-img flexcc "> <img src="/images/icons/question.svg" className="FAQquestion-icon" /></div>
                    </div>
                    <div className=" px-1">




                      <a className="FAQ-a" href="#">{item.FAQtitle}</a>

                      <p className="FAQ-p2">{item.FAQdescription}</p>
                      <div className="d-flex">
                        <div className=""> <a href="#" className="FAQtag">{item.FAQtag1}</a></div>
                        <div className="px-2"><a href="#" className="FAQtag">{item.FAQtag2}</a></div>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>
            <div className="col-12 col-md-5 flexc flex-column py-3 ">
              <div className="FAQ-box p-4 my-2 ">
                <div className="FAQ-support ">
                  <div><a href="#" className="FAQ-support-a">Contact support</a></div>
                  <p className="FAQ-support-p1">24×7 help from our support staff</p>
                </div>
                <div>
                  <p className="FAQ-support-p2">Popular topics</p>
                  {this.state.tags.map((item, index) => {
                    return (
                      <div><a href="#" className="FAQ-support-a">{item.tags}</a></div>

                    )
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="FAQmoreinfo-bg py-5">
          <div className="container px-4 px-md-0">
            <div className="row w-100">
              <div className="col-12 col-md-4 flexcc ">
                <div className="w-100">
                  <img className="FAQicons" src="/images/icons/home2.svg" />
                  <div className="mt-2" >
                    <a className="FAQmoreinfo-a" href="#">What is ANP ?</a>
                  </div>
                  <p className="FAQmoreinfo-p">Learn more about Stripe and our products.</p>

                </div>
              </div>
              <div className="col-12 col-md-4 flexcc ">
                <div className="w-100">
                  <img className="FAQicons" src="/images/icons/docs.svg" />
                  <div className="mt-2" >
                    <a className="FAQmoreinfo-a" href="#">ANP docs</a>
                  </div>
                  <p className="FAQmoreinfo-p">Get familiar with the Stripe products and their features.</p>
                </div>

              </div>
              <div className="col-12 col-md-4 flexcc ">
                <div className="w-100">
                  <img className="FAQicons" src="/images/icons/reference.svg" />
                  <div className="mt-2" >
                    <a className="FAQmoreinfo-a" href="#">API reference</a>
                  </div>
                  <p className="FAQmoreinfo-p">Explore complete reference documentation for the Stripe API.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default FAQ;
