import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import ReviewsModal from "../modals/ReviewsModal";
import { NavItem } from "react-bootstrap";
import HttpServices from "../../utils/Http.services";
import LoaderButton from "../LoaderButton";
import { msToHMS, translate } from "../../utils/useful";
import moment from "jalali-moment";
import { init } from "i18next";
class StartPage extends React.Component {
  state = {


  };
  componentDidMount() {
    // console.log('first', this.props.current)

    // if (this.props.current) {
    //     let seconds = (this.props.quiz.time * 60)-(this.state.passedSeconds)

    // this.setState({ timer: seconds })
    // }else{

    // }
    // if (this.props.quiz) {
    //     this.init()
    // }
    if (this.props.practice) {
      this.initPractice()
    }
  }


  componentDidUpdate(prevProps) {
    // if (this.props.quiz != prevProps.quiz) {
    //     this.init()
    // }
    if (this.props.practice != prevProps.practice) {
      this.initPractice()
    }
  }

  // init() {

  //     let seconds = this.props.quiz?.time * 60

  //     if (this.props.current) {
  //         const startTime = moment(this.props.current.startTime);
  //         const nowTime = moment(new Date());
  //         let diff = nowTime.diff(startTime)
  //         seconds = (this.props.quiz.time * 60) - (diff / 1000)

  //     }

  //     let init = true

  //     this.setState({ timer: seconds }, () => {

  //         this.interval = setInterval(() => {
  //             let timer = this.state.timer - 1

  //             if (timer < 0) {
  //                 if(!init){
  //                 this.props.endQuiz()
  //                 clearInterval(this.interval)
  //                 }
  //             } else {

  //                 this.setState({ timer }, () => { })
  //                 init = false

  //             }

  //         }, 1000)


  //         // if (this.props.current) {
  //         //     this.time()


  //         // }

  //     });
  // }
  initPractice() {

    let seconds = this.props.practice?.time * 60

    if (this.props.current) {
      const startTime = moment(this.props.current.startTime);
      const nowTime = moment(new Date());
      let diff = nowTime.diff(startTime)
      seconds = (this.props.practice.time * 60) - (diff / 1000)

    }

    let init = true

    this.setState({ timer: seconds }, () => {

      this.interval = setInterval(() => {
        let timer = this.state.timer - 1

        if (timer < 0) {
          if (!init) {
            this.props.endPractice()
            clearInterval(this.interval)
          }
        } else {

          this.setState({ timer }, () => { })
          init = false

        }

      }, 1000)


      // if (this.props.current) {
      //     this.time()


      // }

    });
  }


  time = () => {

    console.log(this.props.current.startTime)

    const startTime = moment(this.props.current.startTime);
    const nowTime = moment(new Date());

    let diff = nowTime.diff(startTime)
    console.log(diff)

    let seconds = (this.props.practice.time * 60) - (diff / 1000)

    console.log(seconds)
    if (seconds > 0) {
      this.setState({ timer: seconds })
    } else {
      // alert("time is over")
      setTimeout(() => {
        this.props.endPractice()
        clearInterval(this.interval)
      }, 200)
    }

    // const days = parseInt((nowTime - startTime) / (1000 * 60 * 60 * 24));
    // const hours = parseInt(Math.abs(nowTime - startTime) / (1000 * 60 * 60) % 24);
    // const minutes = parseInt(Math.abs(nowTime.getTime() - startTime.getTime()) / (1000 * 60) % 60);
    // const passedSeconds = parseInt(Math.abs(nowTime.getTime() - startTime.getTime()) / (1000) % 60); 
    // console.log(passedSeconds)
    // this.setState({ passedSeconds })
  }
  // timePractice = () => {

  //     console.log(this.props.current.startTime)

  //     const startTime = moment(this.props.current.startTime);
  //     const nowTime = moment(new Date());

  //     let diff = nowTime.diff(startTime)
  //     console.log(diff)

  //     let seconds = (this.props.practice.time * 60) - (diff / 1000)

  //     console.log(seconds)
  //     if (seconds > 0) {
  //         this.setState({ timer: seconds })
  //     } else {
  //         // alert("time is over")
  //         setTimeout(() => {
  //             this.props.endPractice()
  //             clearInterval(this.interval)
  //         }, 200)
  //     }

  //     // const days = parseInt((nowTime - startTime) / (1000 * 60 * 60 * 24));
  //     // const hours = parseInt(Math.abs(nowTime - startTime) / (1000 * 60 * 60) % 24);
  //     // const minutes = parseInt(Math.abs(nowTime.getTime() - startTime.getTime()) / (1000 * 60) % 60);
  //     // const passedSeconds = parseInt(Math.abs(nowTime.getTime() - startTime.getTime()) / (1000) % 60); 
  //     // console.log(passedSeconds)
  //     // this.setState({ passedSeconds })
  // }



  startPractice = () => {
    // let body: {}
    // if(this.props.current){
    //     body= this.props.current.quiz._id
    // }else{
    //     body= this.props.quiz?._id
    // }
    // console.log("startQuiz")
    // console.log(this.props.info?._id)
    this.setState({ isLoading: true })


    HttpServices.request('startPractice', { practice: this.props.practice?._id }, ((fetchResult, fetchError) => {

      this.setState({ isLoading: false })
      this.props.startQuiz()

      console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
        return
      }

      this.props.changeStage('quiz')



    }))

  }
  // startPractice = () => {
  //     // let body: {}
  //     // if(this.props.current){
  //     //     body= this.props.current.quiz._id
  //     // }else{
  //     //     body= this.props.quiz?._id
  //     // }
  //     // console.log("startQuiz")
  //     // console.log(this.props.info?._id)
  //     this.setState({ isLoading: true })


  //     HttpServices.request('startPractice', { quiz: this.props.quiz?._id }, ((fetchResult, fetchError) => {

  //         this.setState({ isLoading: false })
  //         this.props.startQuiz()

  //         console.log(fetchResult)
  //         console.log(fetchError)

  //         if (fetchError) {
  //             // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
  //             return
  //         }

  //         this.props.changeStage('quiz')



  //     }))

  // }

  continiueQuiz = () => {

    this.props.changeStage('quiz')




  }




  render() {


    return (



      <div className="text-color-1 ">

        {(!this.props?.current) && (
          <>
            <div className="box p-4 " style={{ maxWidth: '900px' }}>
              <div className="text-semibig font-bold d-flex ">
                <p>نام تمرین   :</p>
                <p className="pr-2">{this.props.practice?.title}</p>
              </div>
              <div className="row m-0 pt-4">
                <div className="col-12 col-lg-8 p-0">
                  <p className="text-normal text-color-2">{this.props.practice?.description}</p>
                </div>
                <div className="col-12 col-lg-4 p-0">
                  <div className="row m-0">
                    <div className="col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                      <p>تعداد سوالات :</p>
                      <p className="pr-2">{this.props.questions?.length} سوال</p>
                    </div>
                    <div className="mt-3 col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                      <p>زمان انجام تمرین :</p>
                      <p className="pr-2">{this.props.practice?.time} دقیقه</p>
                    </div>
                    <div className="col-12 col-lg-12 col-md-6 flexc justify-content-md-end pt-4">
                      <p>سطح تمرین :</p>
                      <p className="pr-2">{translate(this.props.practice?.level)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box flexcc w-100" style={{ maxWidth: '900px' }}>


              <LoaderButton
                onClick={this.startPractice}
                isLoading={this.state.isLoading}
                text='شروع تمرین'
                type={"ThreeDots"}
                className="my-4 nowrap btn1 text-semibig "
                buttonClassName="green-color"
                buttonStyle={{ fontSize: 15, fontWeight: 'bold', }}
                width={20}
                // height={20}
                color={'#01B982'}
              />


              {/* <button onClick={() => this.startQuiz()} className="btn1 text-semibig" style={{ minWidth: '200px' }}>
                        شروع آزمون
                    </button> */}
            </div>
          </>

        )}
        {(this.props?.current && !this.props.current.finishTime) && (

          <>
            <div className="box p-4 " style={{ maxWidth: '900px' }}>
              <div className="text-semibig d-flex ">
                <p>نام تمرین   :</p>
                <p className="pr-2">{this.props.practice?.title}</p>
              </div>
              <div className="row m-0 pt-4">
                <div className="col-12 col-lg-8 p-0">
                  <p>{this.props.practice?.description}</p>
                </div>
                <div className="col-12 col-lg-4 p-0">
                  <div className="row m-0">
                    <div className="col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                      <p>تعداد سوالات :</p>
                      <p className="pr-2">{this.props.questions?.length} سوال</p>
                    </div>
                    <div className="mt-3 col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                      <p>زمان تمرین :</p>
                      <p className="pr-2">{this.props.practice?.time} دقیقه</p>
                    </div>
                    <div className="col-12 col-lg-12 col-md-6 flexc justify-content-md-end pt-4">
                      <p>سطح تمرین :</p>
                      <p className="pr-2">{translate(this.props.practice?.level)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box p-5 flexcc flex-column" style={{ maxWidth: '900px' }}>


              <LoaderButton
                onClick={this.continiueQuiz}
                isLoading={this.state.isLoading}
                text='ادامه تمرین'
                type={"ThreeDots"}
                className="mt-4 mb-4 btn1 text-semibig "
                buttonClassName="green-color"
                buttonStyle={{ fontSize: 15, fontWeight: 'bold', }}
                width={20}
                // height={20}
                color={'#fff'}
              />


              {/* <div className="box p-5 flexcc" style={{ maxWidth: '900px' }}> */}
              {this.state.timer && (
                <div className=" d-flex justify-content-center w-100">
                  <div className="text-semibig d-flex text-color-1 flexc">
                    <p className="d-none d-sm-block">زمان باقیمانده</p>
                    <p className="pr-3">{msToHMS(this.state.timer)}</p>
                  </div>
                </div>
              )}
              {/* </div > */}
              {/* <button onClick={() => this.startQuiz()} className="btn1 text-semibig" style={{ minWidth: '200px' }}>
                        شروع آزمون
                    </button> */}
            </div >


          </>
        )}
        {(this.props?.current && this.props.current.finishTime) && (

          <>
            <div className="box p-4 " style={{ maxWidth: '900px' }}>
              <div className="text-semibig d-flex ">
                <p>نام تمرین   :</p>
                <p className="pr-2">{this.props.practice?.title}</p>
              </div>
              <div className="row m-0 pt-4">
                <div className="col-12 col-lg-8 p-0">
                  <p>{this.props.practice?.description}</p>
                </div>
                <div className="col-12 col-lg-4 p-0">
                  <div className="row m-0">
                    <div className="col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                      <p>تعداد سوالات :</p>
                      <p className="pr-2">{this.props.questions?.length} سوال</p>
                    </div>
                    <div className="mt-3 col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                      <p>زمان تمرین :</p>
                      <p className="pr-2">{this.props.practice?.time} دقیقه</p>
                    </div>
                    <div className="col-12 col-lg-12 col-md-6 flexc justify-content-md-end pt-4">
                      <p>سطح تمرین :</p>
                      <p className="pr-2">{translate(this.props.practice?.level)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="box p-4 flexcc" style={{ maxWidth: '900px' }}>
              <p className="text-big">
                نمره پیشین شما
              </p>
              <p className="text-big pr-4">
                {((20 * (this.props.current?.score)) / (this.props.questions.length)).toFixed(1)
                }
              </p>
            </div>
            {/* <div className="flexcc">
                            <div className="flexcc btn-primary" style={{ maxWidth: '250px' }}>
                                <Link href={`/course-info/${this.props.quiz?.course?._id}`}>
                                    <a className="text-normal w-100 main-color-1 ">
                                        بازگشت به داشبورد یادین
                                    </a>
                                </Link>
                            </div>
                        </div> */}
            <div className="flexcc">
              <div className="flexcc" style={{ width: '800px' }}>


                <LoaderButton
                  onClick={this.startPractice}
                  isLoading={this.state.isLoading}
                  text='انجام مجدد تمرین'
                  type={"ThreeDots"}
                  className="mt-4 mb-4 btn1 text-semibig "
                  buttonClassName="green-color"
                  buttonStyle={{ fontSize: 15, fontWeight: 'bold', }}
                  // width={20}
                  // height={20}
                  color={'#fff'}
                />


                {/* <button onClick={() => this.startQuiz()} className="btn1 text-semibig" style={{ minWidth: '200px' }}>
    شروع آزمون
</button> */}
              </div>
            </div>
          </>
        )}


      </div>
    );
  }
}

export default StartPage;
