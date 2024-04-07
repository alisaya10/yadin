import Link from 'next/link';
import React from 'react';
import FancyCircle from './FancyCircle';
import FancySquare from './FancySquare';

class DynamicPage extends React.Component {
  state = {

  }

  render() {
    var settings = {
      dots: true,
      autoplay: false,
      autoplaySpeed: 1900,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };




    return (
      <div style={{ backgroundColor: '' }}>


        <div className="contactus-hero " style={{ paddingBottom: 200 }}>

          <div className="contactus-hero-bg">

          </div>

          <div className="flexcc flex-column container position-relative mb-5">
            <p className="contactus-header">{this.props.data?.values?.title}</p>
            <p className="contactus-desc">{this.props.data?.values?.description}</p>
          </div>

          <div className="w-100" style={{ overflow: 'hidden', position: 'absolute', top: '0%', left: 0, zIndex: 0, opacity: 0.2 }}>
            {[1, 1, 1, 1, 1, 1, 1].map(() => {
              return (
                <div className="flexc w-100 mt-0">
                  {[1, 1, 1, 1, 1, 1, 1].map(() => {
                    return (
                      <FancySquare />
                    )
                  })}
                </div>

              )
            })}
          </div>


          <div className="w-100" style={{ overflowX: 'hidden', position: 'absolute', height: "200%", top: 0, left: 0, zIndex: 0, opacity: 0.2 }}>
            {[1, 1, 1, 1, 1].map(() => {
              return (
                <div className="flexc w-100 mt-5">
                  {[1, 1, 1, 1, 1, 1, 1, 1].map(() => {
                    return (
                      <FancyCircle />
                    )
                  })}
                </div>

              )
            })}
          </div>










        </div>



        <div className='container' style={{ position: 'relative', zIndex: 10 }}>

          <div style={{ marginTop: '-200px', }}>
            <div style={{ backgroundColor: '#fff', width: '100%', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding: '5px 50px 50px 50px', borderRadius: '10px', marginBottom: '60px', }}>
              <div style={{ marginTop: '40px', fontSize: '15px' }} >
                <div className='ck-content'>
                  <div className="" style={{ color: '#202020', fontSize: 16, lineHeight: 2 }} dangerouslySetInnerHTML={{ __html: this.props.data?.values?.body }}>
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



export default DynamicPage;