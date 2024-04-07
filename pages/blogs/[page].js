import React from 'react';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { Line, Bar } from 'react-chartjs-2';
import moment from 'jalali-moment';
import Link from 'next/link';
import { imageAddress, translate } from '../../utils/useful';
import Pagination from '../../components/Pagination';
import HttpServices from '../../utils/Http.services';
import Head from 'next/head';
// import Router from 'next/Router';

import Router,{ withRouter } from 'next/router'


// import './blog.css';

export async function getServerSideProps(context) {

  let limit = 12
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
  console.log(body)

  const blogsRes = await (await HttpServices.syncRequest('getBlogs', body)).result

  const catsRes = await (await HttpServices.syncRequest('getContents', { page: "BlogsCategories", lng })).result

  let specialsRes = []
  let featured = []
  let trendings = []
  if (!page || page == 0) {
    specialsRes = await (await HttpServices.syncRequest('getSpecialBlogs', { lng })).result
    specialsRes.info.forEach(element => {
      if (element.special && element.special.includes('trending')) {
        trendings.push(element)
      }

      if (element.special && element.special.includes('featured')) {
        featured.push(element)
      }

    });
  }


  // console.log("info")
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
      blogs: blogsRes.info,
      totalCount: blogsRes.count,
      categories: catsRes.info,
      currentPage: page,
      featured: featured,
      trendings: trendings,
      category,
      limit
    }))
  }



}





class Blogs extends React.Component {
  state = {
    hoveredIndex: 0,
    searchResults: null,
    recom: [
      { name: 'Smart watch', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
      { name: 'Smart phone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
      { name: 'Sensors', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

      { name: 'Headphone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
      // { name: 'Sensor', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },

    ],
    blogs: [


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
    // this.getData()
  }



  doSearch = (search) => {
    clearTimeout(this.searchTimer)
    if (search && search != '') {
      this.searchTimer = setTimeout(() => {
        this.getData(search)
      }, 300);
    }else{
      this.setState({searchResults:null})
    }

  }

  getData(search) {

    HttpServices.request('searchBlogs', { search }, (fetchResult, fetchError, fetchStatus) => {
      this.setState({ isPostingData: false })
      if (fetchError) {
        return
      }
      this.setState({ searchResults: fetchResult.info })
    })
    // let id = this.props.match.params.id

    // if (id) {

    // fetch(
    //   'https://www.iotsmile.com/iot/apiv1',
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       route: "values/getValuesWithData",
    //       content: {
    //         page: "Blogs",
    //         // _id: id
    //       }
    //     })
    //   }
    // )
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(json)
    //     this.setState({
    //       blogs: json.info
    //     })
    //   })
    // // }
    // // else{
    // //   // this.props.history.goBack()
    // // }

  }


  changePage = (index) => {

    let query = null

    if (this.props.category) {
      query = { category: this.props.category }
    }

    Router.push({
      pathname: "/blogs/" + (Number(index) + 1),
      query
    })

    // router.push("/blogs/" + (Number(index) + 1))
    // window.history.push( )
    // this.window.scrollTo(0, 0)
    // this.setState({ currentPage: index }, () => {
    //     this.fetch()
    // })

  }



  render() {

    return (
      <div className="" >

        <Head>

          <title>IoTSmile Blogs</title>

        </Head>

        <div className="blog-hero flex-column flexcc pt-5" style={{ background: "#0052cc", backgroundSize: 'cover', backgroundPosition: 'center' }}>

          {/* <div className="blog-hero flex-column flexcc" style={{ backgroundImage: "url(/images/ag1.jpg)", backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
          <h1 className="mb-1 blog-hero-header">IoTSmile Hub</h1>
          <p className="mb-3 " style={{ color: '#fff', fontSize: 24 }}>Blogs for users and partners</p>

          <div className="blog-inputbox position-relative">
            <input className="blog-input" placeholder="Search..." style={{ fontSize: 16 }} onChange={e => this.doSearch(e.target.value)} />
            <button className="input-search-button">
              <img src="/images/icons/search.svg" className="input-searchicon" />
            </button>

            <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 36, backgroundColor: '#ffffff', borderRadius: '0px 0px 8px 8px' }}>
              {this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                return (
                  <Link href={'/blog/' + prop._id} >
                    <a >
                      <div className="px-2 py-2 flexc" style={{ borderTop: '1px solid #f2f6f8' }}>
                        <img src={imageAddress(prop.image, null, "small")} height={20} style={{borderRadius:2}}/>
                        <p className="m-0 mx-1" style={{ fontSize: 14, lineHeight: 1 }}>{prop.title}</p>
                      </div>
                    </a>
                    {/* <p style={{fontSize:12}}>the text for this</p> */}
                  </Link>
                )
              })}

              {this.state.searchResults && this.state.searchResults.length == 0 &&(
                <p className='text-center py-2'>Found Nothing</p>
              )}
            </div>



          </div>
          <div className="blog-hero-pbox">
            <p className="blog-hero-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>


        {(this.props.currentPage == null || this.props.currentPage == 0) && !this.props.category && (

          <div className="container mt-4 mb-3">

            <div className="row m-0">
              <div className="col-12 col-md-12 col-lg-7 p-0">



                <div className=" mb-2 px-2">
                  <p className="" style={{ fontSize: '28px', color: '#000', fontWeight: '600' }}>Featured</p>
                </div>



                {/* <Slider {...settings} beforeChange={this.sliderChanged}> */}

                {this.props.featured?.map((item, index) => {
                  if (index == 0)
                    return (
                      // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                      <div className="w-100 ">
                        <Link href={{ pathname: '/blog/' + item._id }} >
                          <a>
                            <div className="mb-4 p-2 outline-none h-100 " >

                              <div className="w-100 h-100 d-flex flex-column" style={{ borderRadius: '4px' }} >
                                <div className="px-1 pt-1" style={{ flex: 1 }}>
                                  <img src={imageAddress(item.image, null, "small")} style={{ borderRadius: '4px ', width: '100%', objectFit: 'cover' }} />
                                  <div className="mt-3   flex-column px-1 ">

                                    <div className="flexcb">

                                      <p className=" mb-2" style={{ fontSize: '16px', fontWeight: '500', maxWidth: '260px' }}>{item.title}</p>

                                      {/* <div className=" flexc mb-2">
                                      <img className="" src="/images/icons/clock.png" style={{ width: '13px' }} />
                                      <p className="m-0 mx-1" style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{moment(item.cDate).format("jDD jMMM , jYYYY")}</p>
                                    </div> */}
                                    </div>
                                    <p style={{ fontSize: '15px', fontWeight: '300' }}>{item.description}</p>
                                  </div>

                                </div>
                                <div className="flexcb w-100 pb-3  mt-2 px-1">
                                  <div className=" flexc  ">
                                    <img className="mx-1" src="/images/icons/clock.png" style={{ width: '13px' }} />
                                    <p className="m-0" style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{moment(item.cDate).format("jDD jMMM , jYYYY")}</p>
                                  </div>
                                  <div className=" flexc ">
                                    <a><p style={{ fontSize: '15px', color: 'rgba(64, 117, 190, 1)' }}>Read more</p></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>


                    )
                }
                )}
                {/* </div> */}
                {/* </Slider> */}
              </div>

              <div className="col-12 col-md-12 col-lg-5">


                <div className=" mb-2 px-2">
                  <p className="" style={{ fontSize: '28px', color: '#000', fontWeight: '600' }}>Trending</p>
                </div>


                {this.props.trendings?.map((item, index) => {
                  return (
                    <div className="w-100 ">
                      <Link href={{ pathname: '/blog/' + item._id }} >
                        <a>
                          <div className=" mb-1 outline-none h-100 " >

                            <div className="w-100 h-100 d-flex " style={{ padding: '10px 2px 15px 2px', borderRadius: '4px' }} >
                              <div className="px-1 pt-1 d-flex" >
                                <div className="mx-2">
                                  <img src={imageAddress(item.image)} style={{ borderRadius: '4px ', width: '150px', }} />
                                </div>
                                <div className="px-3   flex-column  ">
                                  <p className="" style={{ fontSize: '16px', fontWeight: '500', maxWidth: '260px' }}>{item.title}</p>

                                  <p style={{ fontSize: '15px', fontWeight: '300' }}>{item.description}</p>

                                  {/* <div className=" flexcb mt-2 ">
                                  <div className=" flexc  ">
                                    <img className="" src="/images/icons/clock.png" style={{ width: '13px' }} />
                                    <p className="m-0 mx-1" style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{moment(item.cDate).format("jDD jMMM , jYYYY")}</p>
                                  </div>
                                  <div className=" flexc ">
                                    <a><p style={{ fontSize: '15px', color: 'rgba(64, 117, 190, 1)' }}>Read more</p></a>
                                  </div>
                                </div> */}


                                </div>

                              </div>

                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>


                  )
                }
                )}
              </div>
            </div>
          </div>

        )}









        <div className="container p-1 pt-4 px-3" style={{ borderTop: '1px solid #ddd' }}>
          <div className="px-2">
            <p className="" style={{ fontSize: '28px', color: '#000', fontWeight: '600' }}>Latest Blogs</p>
          </div>
          <div className="d-flex flex-wrap pb-4 mt-2">


            <Link className="" href={{ pathname: '/blogs' }}>
              <a className="p-1  text-start ">
                <div className=" flexc px-2" style={{ background: !this.props.category ? 'rgb(0, 82, 204)' : '#fff', maxWidth: 200, borderRadius: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: 4 }}>
                  {/* <div>
                  <img className="mt-1" src="https://images.unsplash.com/reserve/uZYSV4nuQeyq64azfVIn_15130980706_64134efc6e_o.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80" style={{ height: 40, width: 40, borderRadius: 4, objectFit: 'cover' }} />
                </div> */}
                  <div className="mx-2 mt-2 mb-2 text-start">
                    <p className="" style={{ color: !this.props.category ? '#fff' : 'rgb(0, 82, 204)', fontSize: 15, fontWeight: '', textTransform: 'uppercase' }}>{translate('all')}</p>
                    <p className="m-0" style={{ color: !this.props.category ? '#ffffffaa' : '#789', fontSize: 11, lineHeight: 1, textTransform: 'uppercase' }}>{translate('Categories')}</p>
                    {/* <p className="" style={{ color: '#789', fontSize: 13 }}>This is the test test for the description</p> */}
                  </div>
                </div>
              </a>
            </Link>


            {this.props.categories?.map((prop, index) => {
              let active = false
              if (index == 0) {
                active = true
              }
              return (
                <Link className="" href={{ pathname: '/blogs/1', search: '?category=' + prop._id }}>
                  <a className="p-1  text-start ">
                    <div className=" d-flex px-2" style={{ background: this.props.category == prop._id ? 'rgb(0, 82, 204)' : '#fff', borderRadius: 2, boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: 4 }}>
                      <div>
                        <img className="mt-1" src={imageAddress(prop?.values.image, null, 'small')} style={{ height: 40, width: 40, borderRadius: 4, objectFit: 'cover' }} />
                      </div>
                      <div className="mx-2 mt-2 mb-1 pt-1 text-start">
                        <p className="m-0" style={{ color: this.props.category == prop._id ? '#ffffffaa' : 'rgb(0, 82, 204)', fontSize: 11, lineHeight: 1, textTransform: 'uppercase' }}>{translate('Category')}</p>
                        <p className="" style={{ color: this.props.category == prop._id ? '#fff' : '#102030', fontSize: 15, fontWeight: '' }}>{prop?.values.title}</p>
                        {/* <p className="" style={{ color: '#789', fontSize: 13 }}>This is the test test for the description</p> */}
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })}


            
          </div>
        </div>
        <div className="container mb-5">
          <div className="row m-0">
            {this.props.blogs.map((item, index) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                <Link href={{ pathname: '/blog/' + item._id }} >
                  <a>
                    <div className="mb-4 outline-none h-100 " >

                      <div className="w-100 h-100 d-flex flex-column" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '4px' }} >
                        <div className="px-1 pt-1" style={{ flex: 1 }}>
                          <img src={'https://platform.iotsmile.com/assets/uploads/' + item.image?.address} style={{ borderRadius: '4px 4px 0px 0px', width: '100%', height: '170px', objectFit: 'cover' }} />
                          {/* <p className="box1-p1 ">USE CASE</p> */}
                          <div className="px-3   flex-column  ">
                            <p className="mt-3 mb-2" style={{ fontSize: '16px', fontWeight: '500', maxWidth: '260px' }}>{item.title}</p>
                            {/* <p className="blogsbox-p3 mt-2">{item.cDate}</p> */}

                            <p style={{ fontSize: '15px', fontWeight: '300' }}>{item.description}</p>
                          </div>

                        </div>
                        <div className=" w-100 pb-3 px-3 ">
                          {item.teacher.values.name && (
                            <p className='mb-2' style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{checkTranslation("{{lang}}Writer")}: {item?.teacher?.values?.name}</p>
                          )}
                          <div className='flexcb w-100'>
                            <div className=" flexc  ">
                              <img className="mx-1" src="/images/icons/clock.png" style={{ width: '13px' }} />
                              <p className="m-0" style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{moment(item.cDate).format("jDD jMMMM , jYYYY")}</p>
                            </div>
                            <div className=" flexc ">
                              {/* <img className="mx-1" src="/images/icons/clock.png"style={{width:'13px'}}/> */}
                              <a><p style={{ fontSize: '15px', color: 'rgba(64, 117, 190, 1)' }}>{checkTranslation('{{lang}}Read-more')}</p></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
              )
            }
            )}


            <div className="col-12 mt-4">
              <Pagination currentPage={this.props.currentPage} totalCount={this.props.totalCount} limit={this.props.limit} changePage={this.changePage} />

            </div>


            {this.props.blogs?.length == 0 && (
              <div className="flexcc w-100 mb-5">
                <p>Nothing Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Blogs);
