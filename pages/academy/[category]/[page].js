import React, { Component } from 'react'
// import CourseBox from '../../components/boxes/CourseBox';
import CourseBox from '../../../components/boxes/CourseBox';
import HttpServices from '../../../utils/Http.services';
import Pagination from '../../../components/Pagination';
import Router, { withRouter } from 'next/router'




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
  // body.lng = lng


  const catsRes = await (await HttpServices.syncRequest('getOneContent', { _id: context?.query?.category })).result
  const cousesRes = await (await HttpServices.syncRequest('getCourses', body)).result




  return {
    props: JSON.parse(JSON.stringify({
      courses: cousesRes?.info,
      totalCount: cousesRes?.count,
      // categories: catsRes.info,
      currentPage: page,
      category: catsRes.info,
      limit
    }))
  }



}






class AcademyCategory extends Component {


  changePage = (index) => {
    let category = null

    if (this.props.category) {
      category = this.props.category._id


      Router.push({
        pathname: "/academy/" + category + "/" + (Number(index) + 1)
      })
    }

  }

  render() {
    return (
      <>
        <div className="blog-hero flex-column flexcc pt-5 " style={{ backgroundImage: "url('../../../images/svg-1.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

          <h1 className="mb-1 blog-hero-header">Academy | {this.props.category?.values?.title}</h1>
          <p className="mb-3 " style={{ color: '#fff', fontSize: 24 }}>Academy for users and partners</p>

          {/* <div className="blog-inputbox position-relative">
                    <input className="blog-input" placeholder="Search..." style={{ fontSize: 16 }} onChange={e => this.doSearch(e.target.value)} />
                    <button className="input-search-button">
                        <img src="/images/icons/search.svg" className="input-searchicon" />
                    </button>
                </div> */}
          <div className="blog-hero-pbox">
            <p className="blog-hero-p">{this.props.category?.values?.description}</p>
          </div>
        </div>

        <div className='container pt-4 mb-5'>
          <div className='row'>
            {this.props.courses?.map((item, index) => {
              return (
                <CourseBox item={item} key={item._id} />
              )
            })}


            {(!this.props.courses || this.props.courses.length == 0) && (
              <div className='col-12 text-center w-100' style={{ paddingTop: 60 }}>
                <img src='/images/nothing.png' width={100} />
                <p style={{ fontWeight: 'bold', fontSize: 20 }}>Found Nothing</p>
                <p className='mt-1' style={{ fontSize: 14 }}>Change your search parameters to find courses</p>

              </div>
            )}



            <div className="col-12 mt-4">
              <Pagination currentPage={this.props.currentPage} totalCount={this.props.totalCount} limit={this.props.limit} changePage={this.changePage} />

            </div>

          </div>
        </div>


      </>
    )
  }
}

export default AcademyCategory;