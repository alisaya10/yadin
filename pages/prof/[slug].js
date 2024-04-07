import React from "react";
import CourseBox from "../../components/boxes/CourseBox";
import Link from "next/link";
import OverView from "../../components/boxes/OverView";
import PeymentModal from "../../components/modals/PeymentModal";
import HttpServices from "../../utils/Http.services";
import Router from "next/router";
import TeacherReviewsModal from "../../components/modals/teacherReviewsModal";

import ReactStars from "react-stars";
import { imageAddress, translate } from '../../utils/useful';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

export async function getServerSideProps(context) {
  let slug = null
  if (context?.query?.slug) {
    slug = context.query?.slug
  }
  // { filter: { advertisement: advertisementId } }
  const teacher = await (await HttpServices.syncRequest('getTeacher', { id: slug })).result
  // const teacherReviews = await (await HttpServices.syncRequest('getAllTeacherReviews', { _id: slug })).result
  // const getAllComments = await (await HttpServices.syncRequest('commentGetAll', {})).result
  // console.log(course)

  return JSON.parse(JSON.stringify({
    props: {
      teacher: teacher?.info, teacherCourses: teacher?.courses,
      //  teacherReviews: teacherReviews?.info, getAllComments: getAllComments?.info
    }
  }))

}
class prof extends React.Component {

  state = {
    info: {
      title: 'دوره تیم سازی',
      level: 'مقدماتی',
      category: 'مدیریت',
      rate: "4.5",
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
      teacher: {
        name: 'ایمان سرایی',
        image: '',
        score: 5
      }
    },

    courses: [
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'دوره تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این دوره یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'دوره تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این دوره یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'دوره تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این دوره یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
      { src: '/images/coursimage.png', price: '100', priceicon: '/images/price.png', rate: '4.5', rateicon: '/images/star.png', title: 'دوره تیم‌سازی', teacher: { name: 'ایمان سرایی' }, description: 'تو این دوره یاد میگیریم چگونه تیم سازی کنیم و در کسب و کارهامون پیاده سازی کنیم و از آن لذت ببریم و در این راه قدم بگذاریم' },
    ],
    // info:[]
  };

  //     componentDidMount() {
  // console.log('teacherCourses',this.props.teacherCourses);

  //     }
  componentDidMount() {
    console.log('dvfbdvsbfvdfbvdzcxcvx', this.props?.teacher?.rating?.total?.stars);
    this.getAllTeacherReviews()
  }


  openReviewsModal = () => {
    this.teacherReviewsModal.modal.showModal()
  }
  reviewValue = (key, value) => {
    setReview({ ...review, [key]: value }, () => {
      setReview()
    })
    console.log(review)
    console.log(value)

  }

  // submitReview = () => {
  //     reviewValue()
  //     HttpServices.syncRequest('addReviews', { description: review.description, title: review.title, rating: review.rating, advertisement: data?.info?._id }).then(() => {
  //         console.log("review send successful")
  //     })
  // }

  getAllTeacherReviews = () => {

    HttpServices.request('getAllTeacherReviews', { _id: this.props.teacher._id }, (fetchResult, fetchError) => {

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ teacherReviews: fetchResult.info })

    })

  }
  render() {

    return (
      <main className="container">

        <div className="box px-3 pb-3 mb-3">
          <div className=" py-2">
            <div className=" border-bottom-gray">
              <p className="text-color-1 text-big pb-3 pt-2" >درمورد استاد</p>
            </div>


            <div className="row m-0">
              <div className="col-12 col-md-6 col-lg-3 p-0 pt-3">
                {/* {console.log('first', this.props.teacher)} */}
                <img src={imageAddress(this.props.teacher?.image, null, 'thumb')} class="w-100 radius-1"></img>
              </div>
              <div className="col-12 col-md-6 col-lg-9 pr-4">
                <div className="row m-0 py-3">
                  <div className="col-12 col-lg-6 p-0 text-color-1 text-big">
                    <p className="text-big font-bold">{this.props.teacher?.fullname}</p>
                  </div>
                  <div className="col-12 col-lg-6 p-0 justify-content-lg-end flexc text-color-2">
                    <div className='rate-user d-flex align-items-center'>
                      <p className="pl-2 text-semibig">امتیاز:</p>
                      {/* <ReactStars
                        count={5}
                        size={25}
                        emptyIcon={<i className="far fa-star"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        color2="#C97EF5"
                        edit={false}
                        value={Number(this.props.teacher.rating?.total?.star)}
                        isHalf={true}
                      /> */}
                    </div>


                    <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                      {this.props.teacher.rating?.total?.star && (
                        <p className="text-color-1" >{(this.props.teacher.rating?.total?.star).toFixed(1)}</p>
                      )}
                      <img src="/images/star-2.svg" className="mr-2" />
                    </div>
                    {/* <div className='review'>
                                            {this.props?.getAllReviews?.map((prop, index) => {
                                                return (
                                                    <div className='mb-5' key={index}>
                                                        <div className='d-flex profile align-items-center'>
                                                            <div className='profile-icon'>
                                                                <img className='w-100' src={prop?.writer?.image == null ? "/images/userrate.png" : imageAddress(prop?.writer?.image)} alt="" />
                                                            </div>
                                                            <div>
                                                                <p className='profile-name'>{prop?.writer?.fullname == null ? 'Unanimous' : prop?.writer?.fullname}</p>
                                                                <div className='rate-user d-flex align-items-center'>
                                                                    <ReactStars
                                                                        count={5}
                                                                        size={15}
                                                                        edit={false}
                                                                        value={prop.rating}
                                                                        isHalf={false}
                                                                        color="#E0E9CA"
                                                                        activeColor="#95C11F"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='review-content mb-3 mt-2 mx-1'>
                                                            <p className='review-text'>{prop.description}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>


                                        {this.props.user && (
                                            <div className='add-review mt-1 mb-5' style={{ width: '100%' }}>
                                                <div>
                                                    <ReactStars
                                                        count={5}
                                                        size={30}
                                                        edit={true}
                                                        value={0}
                                                        isHalf={false}
                                                        color="#E0E9CA"
                                                        activeColor="#95C11F"
                                                        onChange={(e) => reviewValue("rating", e)}
                                                    />
                                                </div>
                                                <textarea rows={3} onChange={(e) => reviewValue("description", e.target.value)} className='w-100 review-textarea mt-2 mb-2' placeholder={translate("Write your review ...")}></textarea>
                                                <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                                    <button className='review-submit' onClick={() => submitReview()}>Submit</button>
                                                </div>
                                            </div>
                                        )} */}
                  </div>
                </div>
                <div>
                  <p className="text-color-2 text-semibig">
                    {this.props.teacher?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row m-0" >
          <div className="flexcc justify-content-end col-12 p-0">
            <div className=" btn-primary5 flexcc col-12 col-sm-6 col-md-3 p-0 cursor-pointer" onClick={() => this.teacherReviewsModal.modal.showModal()}>
              <botton className="flexcc py-2">ثبت امتیاز و نظر</botton>
            </div>
          </div>
        </div>

        {/* <div className="row m-0">
                    <div className="pt-4 flexcc justify-content-end col-12 p-0">
                        <div className=" btn-primary5 flexcc col-12 col-sm-6 col-md-3 cursor-pointer" onClick={() => this.teacherReviewsModal.modal.showModal()}>
                            <button className="flexcc py-2" style={{ color:'#A0A0A0' }}>ثبت امتیاز و نظر</button>
                        </div>
                    </div>
                </div> */}
        <TeacherReviewsModal getAllTeacherReviews={() => this.getAllTeacherReviews()} closeModal={() => this.teacherReviewsModal.modal.hideModal()} ref={el => this.teacherReviewsModal = el} data={this.props?.teacher} />
        <div className=''>
          <div>
            {/* {console.log('-----------',this.state.teacherReviews)} */}
            {Array.isArray(this.state.teacherReviews) && this.state?.teacherReviews.map((item, index) => {


              return (
                <>
                  {item.verified == '1' && item.description && item.description.trim() != '' && item.description.trim() != null && (
                    <div className="box-5 p-3 mb-3">
                      <div className="row m-0">
                        <div className="text-color-2 col-12 p-0" >
                          <div className="" >

                            <div className="row m-0 ">
                              <div className="col-12 col-lg-6 p-0 text-color-1 text-big">
                                <div className="flexc">
                                  <img className="radius-3" style={{ width: "30px", height: "30px" }} src={imageAddress(item.writer?.image, null, 'thumb')} />
                                  <p className="pr-4">{item.writer?.fullname}</p>
                                  {/* {console.log("annnnnnnnnnnnnnnnna", item)} */}
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 p-0 justify-content-lg-end flexc text-color-2">
                                <div className="flexc">
                                  <p className="pl-2">امتیاز:</p>
                                  {/* <p className="pl-1">{item.rating}</p> */}

                                  <div className="d-flex flexc align-items-center" style={{ color: "#e0e0e0" }}>
                                    {item.rating&& (
                                      <p className="text-color-1" >{(item.rating).toFixed(1)}</p>
                                    )}
                                    <img src="/images/star-2.svg" className="mr-2" />
                                  </div>


                                  <div className='rate-user d-flex align-items-center'>
                                    {/* <ReactStars
                                      count={5}
                                      size={25}
                                      emptyIcon={<i className="far fa-star"></i>}
                                      fullIcon={<i className="fa fa-star"></i>}
                                      color2="#C97EF5"
                                      edit={false}
                                      value={item.rating}
                                      isHalf={false}
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <p className="">{item.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* <div className=" text-color-2 p-0 pt-5 pt-xl-0 col-12 col-xl-4">
                            <div className=" flexcb">
                            <p className="pb-3">{item.q1}</p>
                            <p className="pb-3 pr-2">{item.q1r}</p>
                            </div>
                            <div className=" flexcb">
                            <p className="pb-3">{item.q2}</p>
                            <p className="pb-3 pr-2">{item.q2r}</p>
                            </div>
                            <div className=" flexcb">
                            <p className="pb-3">{item.q3}</p>
                            <p className="pb-3 pr-2">{item.q3r}</p>
                            </div>
                            <div className=" flexcb">
                            <p className="pb-3">{item.q4}</p>
                            <p className="pb-3 pr-2">{item.q4r}</p>
                            </div>
                            <div className=" flexcb">
                            <p className="pb-3">{item.q5}</p>
                            <p className="pb-3 pr-2">{item.q5r}</p>
                            </div>
                          </div> */}
                      </div>
                    </div>
                  )}
                </>
              );

            })}
          </div>
          <a className="text-color-1" style={{ fontSize: '25px', fontWeight: "bold", marginBottom: '10px' }}>دوره‌های استاد  </a>
        </div>
        <div style={{ borderBottom: '3px solid #262626' }} className='my-4'></div>
        <div className='row d-flex' style={{ flexWrap: "wrap" }}>
          {this.props.teacherCourses?.map((item, index) => {
            return (
              <div className="col-12 col-md-6 col-lg-3 mb-4 ">
                <CourseBox data={item} />
              </div>
            )
          })}
        </div>
      </main >

    )
  }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(prof);

