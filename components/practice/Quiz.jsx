import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import ReviewsModal from "../modals/ReviewsModal";
import { NavItem } from "react-bootstrap";
import { msToHMS, translate } from "../../utils/useful";
import moment from "jalali-moment";
import HttpServices from "../../utils/Http.services";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import { extractEventHandlers } from "@mui/base";

class Quiz extends React.Component {
    state = {

        practice: {
            title: 'ازمون پایه 6 ریاضی',
            time: '1 ساعت',
            level: 'سطح پیشرفته',
            description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
        },

        question: [
            {
                questions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
                anwsers1: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers2: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers3: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers4: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            },
            {
                questions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
                anwsers1: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers2: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers3: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers4: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            },
            {
                questions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
                anwsers1: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers2: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers3: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers4: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            },
            {
                questions: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
                anwsers1: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers2: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers3: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
                anwsers4: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
            },


        ],

        timer: 0,
        answers: {}


    };



    componentDidMount() {
        // console.log('first', this.props.current)

        // if (this.props.current) {
        //     let seconds = (this.props.quiz.time * 60)-(this.state.passedSeconds)

        // this.setState({ timer: seconds })
        // }else{

        // }
        console.log('svsdvsdbdfbfdbfdbdfb',this.props.current)
        let seconds = this.props.practice?.time * 60

        this.setState({ timer: seconds }, () => {

            this.interval = setInterval(() => {
                let timer = this.state.timer - 1

                if (timer < 0) {
                    this.props.endPractice()
                    clearInterval(this.interval)
                } else {
                    this.setState({ timer }, () => {

                    })
                }

            }, 1000)


            if (this.props.current) {
                this.time()

                let answers = this.props.current.answers;
                this.setState({ answers })

            }

        });
    }


   

    setAnswer = (question, answer, dontSendToServer) => {
        // if(this.props.current){
        //     let answers = this.props.current?.answers
        //     answers[question._id] = answer
        //     this.setState({ answers })

        // }
        console.log('svsdvsdbdfbfdbfdbdfb',this.props.current)

        let answers = this.state.answers
        if(!answers){
            answers = {}
        }
        answers[question._id] = answer

        console.log('annnnnsswerrrrrr', answers)
        this.setState({ answers })

        if (!dontSendToServer) {
            this.sendAnswerToServer(question, answer)
        }

    }
    time = () => {

        console.log(this.props.current.startTime)

        const startTime = moment(this.props.current.startTime);
        const nowTime = moment(new Date());

        let diff = nowTime.diff(startTime)
        console.log(diff)

        let seconds = (this.props.practice.time * 60)-(diff/1000)

        console.log(seconds)
        if(seconds>0){
        this.setState({ timer: seconds })
        }else{
            alert("time is over")
            setTimeout(()=>{
                this.props.endPractice()
                clearInterval(this.interval)
            },200)
        }

        // const days = parseInt((nowTime - startTime) / (1000 * 60 * 60 * 24));
        // const hours = parseInt(Math.abs(nowTime - startTime) / (1000 * 60 * 60) % 24);
        // const minutes = parseInt(Math.abs(nowTime.getTime() - startTime.getTime()) / (1000 * 60) % 60);
        // const passedSeconds = parseInt(Math.abs(nowTime.getTime() - startTime.getTime()) / (1000) % 60); 
        // console.log(passedSeconds)
// this.setState({ passedSeconds })
    }


    sendAnswerToServer(question, answer) {

        HttpServices.request('submitPracticeAnswer', { practice: this.props.practice?._id, question: question._id, answer }, ((fetchResult, fetchError) => {


            console.log(fetchResult)
            console.log(fetchError)

            if (fetchError) {
                // this.setAnswer(question, null,true)
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.submitError', description: fetchError.message })
                return
            }



        }))


    }


    render() {
        let questions = this.props.questions;
        let practice = this.props.practice;
        // console.log(this.props.questions)
        return (

            <div className="text-color-1">
                <div className="box p-4" style={{ maxWidth: '1100px' }}>
                    <div className="text-semibig d-flex main-color-1 ">
                        <p>نام امتحان   :</p>
                        <p className="pr-2">{practice.title}</p>
                    </div>
                    <div className="row m-0 pt-4">
                        <div className="col-12 col-lg-8 p-0 text-color-1">
                            <p>{practice.description}</p>
                        </div>
                        <div className="col-12 col-lg-4 p-0">
                            <div className="row m-0">
                                <div className="p-0 col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                                    <p>زمان امتحان :</p>
                                    <p className="pr-2">{practice.time}</p>
                                </div>
                                <div className="p-0 col-12 col-lg-12 col-md-6 flexc justify-content-md-end pt-4">
                                    <p>سطح امتحان :</p>
                                    <p className="pr-2">{translate(practice.level)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex box-2 p-4 position-sticky" style={{ top: 60, zIndex: '1', maxWidth: '1100px' }}>
                    <div className="w-100">
                        <button onClick={() => { this.props.endPractice() }} className="btn-primary4 text-semibig" style={{ maxWidth: '200px', minWidth: '120px' }}>
                            <p>اتمام آزمون</p>
                        </button>
                    </div>
                    <div className=" d-flex justify-content-end w-100">
                        <button className="text-semibig d-flex text-color-1 flexc">
                            <p className="d-none d-sm-block">زمان باقیمانده</p>
                            <p className="pr-3">{msToHMS(this.state.timer)}</p>
                        </button>
                    </div>
                </div>
                <div className="box p-5" style={{ maxWidth: '1100px' }}>
                    <div>
                        {questions?.map((item, index) => {
                            // console.log(item.answers)

                            return (
                                <div className="border-bottom-gray pb-5 pt-4">
                                    <div className="d-flex py-3">
                                        <p className="text-color-1 text-semibig">{item.title}</p>
                                    </div>
                                    <div className="row m-0s ">
                                        {Array.isArray(item.answers) && item.answers?.map((answer, j) => {
                                            return (
                                                <button onClick={() => this.setAnswer(item, answer._id)} className="d-flex py-3 col-12 col-lg-6 text-start">
                                                    {(this.state?.answers && (this.state?.answers[item._id] == answer._id)) ? (
                                                        <img className="pt-1" src='/images/icons/checkedbox.svg' />
                                                    ) : (
                                                        <img className="pt-1" src='/images/icons/checkbox.svg' />
                                                    )}
                                                    <p className="text-color-2 pr-3 text-normal">{answer.answer}</p>
                                                </button>
                                            )
                                        })}

                                        {/* <button className="d-flex py-3 col-12 col-lg-6 text-start">
                                            <img className="pt-1" src='/images/icons/checkbox.svg' />
                                            <p className="text-color-2 pr-3 text-normal">{item.anwsers2}</p>
                                        </button>
                                        <button className="d-flex py-3 col-12 col-lg-6 text-start">
                                            <img className="pt-1" src='/images/icons/checkbox.svg' />
                                            <p className="text-color-2 pr-3 text-normal">{item.anwsers3}</p>
                                        </button>
                                        <button className="d-flex py-3 col-12 col-lg-6 text-start">
                                            <img className="pt-1" src='/images/icons/checkbox.svg' />
                                            <p className="text-color-2 pr-3 text-normal">{item.anwsers4}</p>
                                        </button> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz);

