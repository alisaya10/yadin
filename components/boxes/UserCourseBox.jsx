import Link from "next/link";
import React, { Component } from "react";
import { imageAddress } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';



class UserCourseBox extends Component {

  state = {


  }

  // addToLearningPath() {
  //   // console.log(this.state.id)
  //   HttpServices.request('addToLearningPath', { course: this.props.data._id }, (fetchResult, fetchError) => {

  //     console.log(fetchResult)
  //     console.log(fetchError)

  //     if (fetchError) {
  //       return
  //     }
  //     console.info(fetchResult)
  //   //   this.setState({
  //   //     course: fetchResult?.course, lessons: fetchResult?.lessons,
  //   //     totalDuration: fetchResult?.totalDuration, totalPracticeDuration: fetchResult?.totalPracticeDuration
  //   //   }, () => {
  //   //     console.log("alert")
  //   //     this.setState({ isLoading: true })
  //   //   })
  //   })


  // }
  postUserCourse() {
    // console.log(this.state.id)
    HttpServices.request('postUserCourse', { course: this.props.data._id }, (fetchResult, fetchError) => {

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      //   this.setState({
      //     course: fetchResult?.course, lessons: fetchResult?.lessons,
      //     totalDuration: fetchResult?.totalDuration, totalPracticeDuration: fetchResult?.totalPracticeDuration
      //   }, () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }



  render() {
    const desc = this.props?.data?.description.slice(0, 50);
    return (
      <div className="box-1 h-100 d-flex flex-column mt-4">
        <div className="flex-1">
          <div className="flexcc ">
            <img src={imageAddress(this.props.data?.image, null, 'thumb')} alt={this.props.data.title} className=' radius-1' style={{ color: '#A0A0A0', width: '100%' }} />
          </div>

          <div className="d-flex align-items-center" style={{ justifyContent: "space-between", }}>
            <div className="d-flex align-items-center py-2 radius-1">
              {/* <img src="/images/price.png" className="mr-2"></img>
              <p className="main-color-1">{this.props.data?.price > 0 ? this.props.data.price + 'تومان' : 'رایگان'} </p> */}
            </div>
            <div className="d-flex align-items-center">
              {/* <p className="text-color-1">{this.props.data?.rate}</p>
              <img src="/images/star.png" className="mr-2"></img> */}
            </div>
          </div>
          <div>
            <p className="text-color-1 text-big">{this.props.data?.title}</p>
          </div>
          <div className="d-flex my-3">
            {/* <p className="text-color-1"> نام مدرس :</p>
            <p className="text-color-1 mr-1">
              {Array.isArray(this.props.data?.teacher) && this.props.data?.teacher?.map((teacher, index) => {
                return (
                  <span className="mx-1">{teacher?.name} {index < this.props.data?.teacher - 1 ? ',' : ''}</span>
                )
              })}
            </p> */}
          </div>
          <div className="my-3">
            <p className="text-color-3">
              {desc} {this.props?.data?.description.length > 50 ? '...' : ''}
              {/* {this.props.data?.description} */}
              {/* {this.props?.data?.description.length > 50 ? this.props?.data?.description?.substr(0, 50) + '...' : this.props?.data?.description}
             */}
            </p>
          </div>
        </div>
        <div className="w-100 d-flex  " style={{ cursor: "pointer" }}>
          {(!this.props?.data?.bought && this.props.data.price > 0) && (

            <Link href={`/course/${this.props.data?._id}`}>
              <button className="btn-primary w-100 main-color-1 ">
                اطلاعات یادین
              </button>
            </Link>
          )}

          {(this.props.data?.bought || this.props.data.price == 0) && (
            <Link href={`/course-info/${this.props.data?._id}`}>
              <button className="btn-primary w-100 main-color-1 ">
                اطلاعات یادین
              </button>
            </Link>
          )}
          {/* {( this.props.data.price == 0) && (
           
              <button className="btn-primary w-100 main-color-1 " onClick={() => {this.addToLearningPath, this.postUserCourse }}>
                افزودن به یادین های من
              </button>
          
          )}  {( this.props.data?.bought) && (
           
              <button className="btn-primary w-100 main-color-1 "onClick={() => this.addToLearningPath   }>
                افزودن به مسیر یادگیری
              </button>
           
          )} */}
        </div>
      </div>
      // </div>
    )
  }
}

const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(UserCourseBox);