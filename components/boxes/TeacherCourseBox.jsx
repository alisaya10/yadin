import Link from "next/link";
import React, { Component } from "react";
import { imageAddress, priceStandardView } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';



class CourseBox extends Component {

  state = {
    testImage: [
      { src: '/images/coursimage.png' },
    ]

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
      <div className="box-1 h-100 d-flex flex-column">
        {console.log('aqdaaaaaaaaaaaaaaaaaaasssssssssssssssssss', imageAddress(this.props.data?.image))}
        <div className="flex-1">
          {/* <div className="radius-1" style={{paddingTop:'100%', backgroundImage:'url('+ this.state.testImage.src +')', backgroundPosition:'center', backgroundSize:'cover'}}> */}
          <div className="radius-1" style={{ paddingTop: '60%', backgroundImage: 'url(' + imageAddress(this.props.data?.image, null, 'thumb') + ')', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
            {/* <img src={imageAddress(this.props.data?.image, null, 'thumb')} className='w-100 radius-1' style={{ height: "25vh" }} /> */}
          </div>

          <div className="d-flex align-items-center" style={{ justifyContent: "space-between", }}>
            <div className="d-flex align-items-center py-2 radius-1">
              <img src="/images/price.png" className="ml-2"></img>
              <p className="main-color-1">{this.props.data?.price > 0 ? priceStandardView(this.props.data.price) + ' ' + 'تومان' : 'رایگان'} </p>
            </div>
            <div className="d-flex align-items-center">
              <p className="text-color-1">{this.props.data?.rate}</p>
              <img src="/images/star.png" className="mr-2"></img>
            </div>
          </div>
          <div>
            <p className="text-color-1 text-big font-bold">{this.props.data?.title}</p>
          </div>
          <div className="d-flex my-3">
            <p className="text-color-1 text-semibig"> نام مدرس :</p>
            <p className="text-color-1 mr-1">
            
                  <span className="mx-1">{this.props.data?.teacher?.name} </span>
            
            </p>
          </div>
          <div className="my-3">
            <p className="text-color-3 text-small">
              {desc} {this.props?.data?.description.length > 100 ? '...' : ''}
              {/* {this.props.data?.description} */}
              {/* {this.props?.data?.description.length > 50 ? this.props?.data?.description?.substr(0, 50) + '...' : this.props?.data?.description}
             */}
            </p>
          </div>
        </div>
        <div className="w-100 d-flex  " style={{ cursor: "pointer" }}>


          <button className="btn-primary w-100 main-color-1 ">
            <Link href={`/course/${this.props.data?._id}`}>
              <a className="text-normal">
                اطلاعات یادین
              </a>
            </Link>
          </button>


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
)(CourseBox);