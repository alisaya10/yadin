import React, { Component } from 'react'
import Head from 'next/head';
// import Header from '../components/Header';
// import HeaderMain from '../../components/HeaderMain';
// import CoverTopics from '../../components/CoverTopics';
// import Topics from '../../components/Topics';
import ImageCard from '../../components/ImageCard';
import Recently from '../../components/Recently';
import SmallCard from '../../components/SmallCard';
import LessonBox from '../../components/boxes/LessonsBox';
import HttpServices from '../../utils/Http.services';
import { checkTranslation, imageAddress, translate } from '../../utils/useful';
import moment from 'jalali-moment';

import Link from 'next/link';
import AcademyCategories from '../../components/AcademyCategories';
import TextBox from '../../components/TextBox';
import CourseBox from '../../components/boxes/CourseBox';
import CourseRowBox from '../../components/boxes/CourseRowBox';
// import '../../i18n'

export async function getServerSideProps(context) {

  let limit = 4
  let page = 0
  if (context?.query?.page) {
    page = Number(context?.query?.page) - 1
  }
  let category = null
  if (context?.query?.category) {
    category = context.query?.category
  }

  let body = {}
  if (category && category != '') {
    body.filter = {}
    body.filter['categories'] = category
  }

  body.getCount = true
  body.limit = limit
  body.skip = page

  let lng = context.locale
  if (!lng) {
    lng = 'en'
  }
  body.lng = lng
  // console.log(body)

  // const cousesRes = await (await HttpServices.syncRequest('getCourses', body)).result
  const lessonsRes = await (await HttpServices.syncRequest('getLessons', {lng,limit:10})).result

  const catsRes = await (await HttpServices.syncRequest('getContents', { page: "AcademyCategories", lng })).result

  let specialsRes = []
  let featured = []
  let trendings = []
  if (!page || page == 0) {
    specialsRes = await (await HttpServices.syncRequest('getSpecialCourses', { lng })).result

    //  console.log(specialsRes)
    specialsRes.info.forEach(element => {
      // console.log(element.special)
      if (element.special && element.special.includes('trending')) {
        trendings.push(element)
      }

      if (element.special && element.special.includes('featured')) {
        featured.push(element)
      }

    });
  }


  console.log(lessonsRes.info)
  // console.log(info)


  // const res = await fetch('https://www.iotsmile.com/iot/apiv1', {
  //   method: "POST",
  //   body: JSON.stringify({
  //     route: "values/getValuesWithData",
  //     content: {
  //       page: "Blogs",
  //       lng
  //       // _id: id
  //     }
  //   })
  // })

  // const json = await res.json()


  // const catRes = await fetch('https://www.iotsmile.com/iot/apiv1', {
  //   method: "POST",
  //   body: JSON.stringify({
  //     route: "values/getValuesWithData",
  //     content: {
  //       page: "BlogsCategories",
  //       lng
  //       // _id: id
  //     }
  //   })
  // })

  // const catJson = await catRes.json()
  // console.log(page)

  return {
    props: JSON.parse(JSON.stringify({
      // courses: cousesRes.info,
      // totalCount: cousesRes.count,
      categories: catsRes.info,
      lessons: lessonsRes.info,
      currentPage: page,
      featured: featured,
      trendings: trendings,
      category,
      limit
    }))
  }



}

class Home extends Component {

  state = {
    searchResults: null,
    recentlyItems: [
      { title: 'Course', undertitle: 'php testing jargon', paragraph: 'There s no two ways about it: terminology in the testing world is incredibly overwhelming. Mocks, stubs, and dummies oh my! Let s see if we can cut through the noise. Come along as, bit by bit, we break all of these confusing concepts down into s... ', difficaulty: 'intermediate difficulty', number: '13', hour: '4h 50min' },
      { title: 'Course', undertitle: 'php testing jargon', paragraph: 'There s no two ways about it: terminology in the testing world is incredibly overwhelming. Mocks, stubs, and dummies oh my! Let s see if we can cut through the noise. Come along as, bit by bit, we break all of these confusing concepts down into s... ', difficaulty: 'intermediate difficulty', number: '13', hour: '4h 50min' },
      { title: 'Course', undertitle: 'php testing jargon', paragraph: 'There s no two ways about it: terminology in the testing world is incredibly overwhelming. Mocks, stubs, and dummies oh my! Let s see if we can cut through the noise. Come along as, bit by bit, we break all of these confusing concepts down into s... ', difficaulty: 'intermediate difficulty', number: '13', hour: '4h 50min' },
    ],

    trend: [
      // {
      //   title: "first",
      //   description: "re s no two ways about it: terminology in the testing world is incredibly overwhel",
      //   image: "/assets/smallcard6.jpg",
      // },
      // {
      //   title: "first",
      //   description: "re s no two ways about it: terminology in the testing world is incredibly overwhel",
      //   image: "/assets/smallcard6.jpg",
      // },
      // {
      //   title: "first",
      //   description: "re s no two ways about it: terminology in the testing world is incredibly overwhel",
      //   image: "/assets/smallcard6.jpg",
      // },
    ]
  }




  doSearch = (search) => {
    clearTimeout(this.searchTimer)
    if (search && search != '') {
      this.searchTimer = setTimeout(() => {
        this.getData(search)
      }, 300);
    } else {
      this.setState({ searchResults: null })
    }

  }

  getData(search) {

    HttpServices.request('searchCourses', { search }, (fetchResult, fetchError, fetchStatus) => {
      this.setState({ isPostingData: false })
      if (fetchError) {
        return
      }
      this.setState({ searchResults: fetchResult.info })
    })

  }


  render() {


    return (
      <>
        <Head>

          <title>academy</title>


          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />


        </Head>

        <div className="blog-hero flex-column flexcc pt-5" style={{ backgroundImage: "url('../images/svg-3.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

          <h1 className="mb-1 blog-hero-header"><span style={{ fontWeight: 300 }}>IoTSmile</span> {checkTranslation('{{lang}}Academy')}</h1>
          <p className="mb-3 " style={{ color: '#fff', fontSize: 24, fontWeight: 300 }}>{checkTranslation('{{lang}}academy-desc')}</p>

          <div className="blog-inputbox position-relative">
            <input className="blog-input" placeholder={checkTranslation('{{lang}}Search-box-academy')} style={{ fontSize: 16 }} onChange={e => this.doSearch(e.target.value)} />
            <button className="input-search-button">
              <img src="/images/icons/search.svg" className="input-searchicon" />
            </button>

            <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 36, backgroundColor: '#ffffff', borderRadius: '0px 0px 8px 8px' }}>
              {this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                return (
                  <Link href={'/academy/course/' + prop._id} >
                    <a >
                      <div className="px-2 py-2 flexc" style={{ borderTop: '1px solid #f2f6f8' }}>
                        <img src={imageAddress(prop.image, null, "small")} height={30} width={30} style={{ borderRadius: 30 }} />
                        <p className="m-0 mx-1" style={{ fontSize: 15, lineHeight: 1 }}>{prop.title}</p>
                      </div>
                    </a>
                    {/* <p style={{fontSize:12}}>the text for this</p> */}
                  </Link>
                )
              })}

              {this.state.searchResults && this.state.searchResults.length == 0 && (
                <p className='text-center py-2'>{checkTranslation('{{lang}}Found-Nothing')}</p>
              )}
            </div>



          </div>
          <div className="blog-hero-pbox">
            <p className="blog-hero-p">{checkTranslation('{{lang}}under-search-desc-academy-page')}</p>
          </div>
        </div>

        {/* <CoverTopics /> */}

        {(this.props.currentPage == null || this.props.currentPage == 0) && !this.props.category && (

          <div className="container mt-4 mb-3">

            <div className="row m-0">
              <div className="col-12 col-md-12 col-lg-6 p-0">



                <div className=" mb-2 px-2">
                  <p className="" style={{ fontSize: '28px', color: '#000', fontWeight: '600' }}>{checkTranslation('{{lang}}Featured')}</p>
                </div>



                {/* <Slider {...settings} beforeChange={this.sliderChanged}> */}
                <div className="container mb-3">

                  <div className="row ">

                    {this.props.featured?.map((item, index) => {
                      if (index == 0)
                        return (
                          // <div></div>
                          <CourseBox item={item} col={"p-1"} />

                        )
                    }
                    )}
                  </div>
                </div>
                {/* </div> */}
                {/* </Slider> */}
              </div>

              <div className="col-12 col-md-12 col-lg-6">


                <div className=" mb-2 px-2">
                  <p className="" style={{ fontSize: '28px', color: '#000', fontWeight: '600' }}>{checkTranslation('{{lang}}Trending')}</p>
                </div>


                {/* {this.props.trendings?.map((item, index) => { */}
                {this.props.trendings.map((item, index) => {


                  return (
                    <CourseRowBox item={item} />

                  )
                }
                )}
              </div>
            </div>
          </div>

        )}




        <AcademyCategories categories={this.props.categories} courses={this.props.courses} />

        <TextBox />


        {/* <SmallCard /> */}

        <div className='container-fluid pb-5' style={{ backgroundColor: "#f7f8fc" }}>
          <div>
            <div className="update-text-title pt-3 mt-0">
              <h2 className="mb-2" style={{ textAlign: 'center', fontSize: '22px', color: '#333333', fontWeight: '600' }} >{checkTranslation('{{lang}}Recently-Updated')}</h2>
              <p className='mb-3' style={{ textAlign: 'center', fontSize: '15px', color: '#666', fontWeight: 400 }}>{checkTranslation('{{lang}}recently-update-desc')}</p>

            </div>
          </div>

          {this.props.lessons?.map((prop, index) => {
            return (

              <LessonBox
                data={prop}
              />

            )
          })}
        </div>




      </>
    )
  }
}


export default Home;


