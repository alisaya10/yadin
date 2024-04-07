import React, { Component } from 'react'
import Slider from "react-slick";
import Link from 'next/link';
import SmallCard from './SmallCard';
import index from '../pages/academy/[category]';
import { checkTranslation, imageAddress } from '../utils/useful';
import CourseBox from './boxes/CourseBox';
// import CourseBox from './boxes/CourseBox_';
import HttpServices from '../utils/Http.services';
import Loader from 'react-loader-spinner';


class AcademyCategories extends Component {


  state = {

    currentIndex: 0,
    courses: {}

  }

  componentDidMount() {
    this.changeCategory(0, this.props.categories[0], true)
  }



  fetchCourses = () => {
    let category = this.state.currenctCategory._id
    let filter = { categories: category }

    HttpServices.request('getCourses', { filter, limit: 4 }, (fetchResult, fetchError, fetchStatus) => {
      // this.setState({ courses: false })
      if (fetchError) {
        return
      }


      let courses = this.state.courses
      courses[category] = fetchResult.info
      this.setState({ courses })
    })

  }


  changeCategory = (index, prop, init) => {

    if (index != this.state.currentIndex || init) {
      this.setState({ currentIndex: index, currenctCategory: prop }, () => {
        if (!this.state.courses[prop._id]) {
          this.fetchCourses()
        }
      })
    }
  }



  shouldShow(item) {
    let sholdShow = false
    for (let i = 0; i < item.categories.length; i++) {
      const element = item.categories[i];
      if (element._id == this.props.categories[this.state.currentIndex]._id) {
        sholdShow = true
      }

    }

    return sholdShow
  }


  render() {

    var setting3 = {
      dots: false,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 2000,
      infinite: true,
      speed: 700,
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 750,
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


    return (
      <div className='pb-3' style={{ backgroundColor: '#F7f8fc' }}>
        <div className="container-fluid flexcc py-1 m-0" >
          <div className="row w-100 m-0 p-0 flexcc">
            <div className="col-md-12 flexcc text-center">
              <div className="w-100 flexcc">
                <div style={{ width: '100%' }}>
                  <div className="mt-2 mb-1 w-100 container-fluid" >
                    <div className="update-text-title">
                      <h2 className="mb-1" style={{ textAlign: 'center', fontSize: '22px', color: '#333333', fontWeight: '600' }} >{checkTranslation('{{lang}}Categories')}</h2>
                      <p className='mb-2' style={{ textAlign: 'center', fontSize: '15px', color: '#666', fontWeight: 400 }}>{checkTranslation('{{lang}}category-explore')}</p>

                    </div>
                    {/* <p className="top-head-title-for-cat mb-3" style={{ color: '#000', fontSize: "32px", textTransform: "uppercase" }}>Categories</p> */}
                    <Slider {...setting3} beforeChange={this.sliderChanged} >
                      {this.props.categories?.map((prop, index) => {
                        return (

                          <div className='mb-3 outline-none'>
                            <a onClick={() => this.changeCategory(index, prop)} style={{ transition: '0.2s all' }} className={this.state.currentIndex == index ? 'd-flex flex-column pb-4 align-items-center for-shape-test-active' : 'd-flex flex-column pb-4 align-items-center for-shape-test'} >
                              <div>
                                {/* <img src={imageAddress(prop.values?.image)} className="serviceicon-shop" /> */}
                                <img src={imageAddress(prop.values?.image)} className="serviceicon-academy" height={50} />
                              </div>
                              <div className='d-flex py-1 flex-column justify-content-center align-items-center'>
                                {/* <p className="servicedsc-shop mt-2 m-0 mx-2" style={{ fontWeight: '300', fontSize: 15 }}>{prop.values?.title}</p> */}
                                <p className="servicedsc-shop mt-2 m-0 mx-2" style={{ fontWeight: '300', transition: '0.3s all', fontSize: "18px", color: this.state.currentIndex == index ? '#7B00F7' : '#000' }}>{prop.values.title}</p>

                                {/* <p className="servicedsc-shop mt-0 m-0 mx-2" style={{ fontWeight: '300', fontSize: 12, color: '#ffffff99' }}>View Products</p> */}

                              </div>
                            </a>
                          </div>

                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            {this.state.courses[this.state.currenctCategory?._id] && this.state.courses[this.state.currenctCategory?._id].map((item, index) => {
              // if (this.shouldShow(item)) {
              return (
                <CourseBox item={item} key={item._id} />
              )
              // }
            })}



            {!this.state.courses[this.state.currenctCategory?._id] && (
              <div className='flexcc pt-5 w-100'>
                <Loader
                  type="Oval"
                  color="rgb(123, 0, 247)"
                  height="50"
                  width="50"
                />
              </div>
            )}
          </div>
        </div>



        {/* <SmallCard /> */}
        <div className='flexcc academy-category-more mt-4'>
          <Link href={"/academy/" + this.state.currenctCategory?._id}>
            <a className='flexcc my-2 mb-5'>
              <p className='' style={{ textTransform: "capitalize", cursor: "pointer", color: "#7B00F7" }}>{checkTranslation('{{lang}}Explore-more')} {this.state.currenctCategory?.values?.title} {checkTranslation('{{lang}}courses')}</p>
            </a>
          </Link>
        </div>
      </div>

    )
  }
}

export default AcademyCategories;