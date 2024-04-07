import React from "react";
import { Placeholder } from "react-bootstrap";
import Modal from '../Modal1'
import ReactStars from "../course/react-stars";
import { render } from "react-dom";
import { imageAddress, translate } from '../../utils/useful';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import HttpServices from "../../utils/Http.services";


class teacherReviewsModal extends React.Component {
    state = {
    }

    componentDidMount() {
    }




    state = {
        reviews: [
            {
                name: "علی مجیدی‌نژاد",
                image: "/images/icons/1.png",
                content:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
                rate: "4.4",
                q1: "رضایت کلی شما از استاد",
                q2: "رضایت از فن بیان استاد",
                q3: "رضایت از سرعت پاسخ‌گویی استاد",
                q4: "رضایت از جذابیت بیان استاد (لحن و...)",
                q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای یادین",
                q1r: "4.5",
                q2r: "4",
                q3r: "5",
                q4r: "3.5",
                q5r: "5",
            },
        ],
        review: []
    };

    // reviewValue = (key, value) => {

    //     if (this.state.review == "" || null || undefined || []) {
    //         return console.log("فیلد ها خالی هستند")
    //     }
    //     else {
    //         this.setState({ review: { ...this.state.review, [key]: value } }, () => {
    //             this.setState({ review: "" })
    //         })
    //         console.log(this.state.review)
    //         console.log(value)

    //         this.props.closeModal()
    //     }






    // }

    submitReview = () => {



        let review = this.state.rating

        this.setState({ review: review }, () => {
            console.log(this.state.review);
        })



        if (!review || review.length == 0) {
            return console.log("فیلد ها خالی هستند")
        }


        else {
            // this.setState({ review: { ...this.state.review, [key]: value } }, () => {
            // })
            console.log(this.state.review)
            // console.log(value)

            this.props.closeModal()


            HttpServices.syncRequest('addTeacherReviews', { description: this.state.text, rating: this.state.rating, teacher: this.props.data?._id }).then(() => {
                console.log("review send successful")
                this.setState({ review: {} })
                setTimeout(() => {
                    this.props.getAllTeacherReviews()
                    this.setState({ text: '' })
                }, 400)

            })
        }

    }

    ratingChanged = (key, value) => {

        this.setState({ [key]: value })
        // console.log(review)
        console.log("this is value", value, "this is key", key)

    };


    changeValue = (text) => {
        console.log("text", text)
        this.setState({ text })
    }


    render() {
        let reviews = this.state.reviews;
        return (

            <Modal ref={el => this.modal = el}>
                <div className="w-100  radius-2 box" >
                    <div className="py-5 text-color-1 flexcc text-ultra-big">
                        نظر خود را ثبت کنید.
                    </div>
                    <textarea onChange={e => this.changeValue(e.target.value)} placeholder="نظر خود را بنویسید.." className="radius-1 w-80 p-4 bg-gray-color-4" style={{ height: '150px', margin: '0 auto', color: '#A0A0A0', fontSize: 18 }} />
                    <div className="w-80" style={{ margin: '0 auto' }}>
                        {reviews.map((item, index) => {
                            return (
                                <div className="">
                                    <div className=" text-color-2 p-0 pt-5 ">
                                        <div className="pb-3 row m-0">
                                            <p className="col-12 col-sm-6 p-0">{item.q1}</p>
                                            <div className="col-12 col-sm-6 p-0 pr-md-5 d-flex justify-content-md-end">
                                                <ReactStars
                                                    count={5}
                                                    size={30}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#C97EF5"
                                                    edit={true}
                                                    value={0}
                                                    isHalf={false}
                                                    onChange={(e) => this.ratingChanged("rating", e)} />
                                            </div>
                                        </div>
                                        {/* <div className="pb-3 row m-0">
                                            <p className="col-12 col-sm-6 p-0">{item.q2}</p>
                                            <div className="col-12 col-sm-6 p-0 pr-md-5 d-flex justify-content-md-end">
                                                <ReactStars
                                                    count={5}
                                                    size={30}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#C97EF5"
                                                    edit={true}
                                                    value={0}
                                                    isHalf={false}
                                                    onChange={(e) => this.ratingChanged("rating1", e)} />
                                            </div>
                                        </div>
                                        <div className="pb-3 row m-0">
                                            <p className="col-12 col-sm-6 p-0">{item.q3}</p>
                                            <div className="col-12 col-sm-6 p-0 pr-md-5 d-flex justify-content-md-end">
                                                <ReactStars
                                                    count={5}
                                                    size={30}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#C97EF5"
                                                    edit={true}
                                                    value={0}
                                                    isHalf={false}
                                                    onChange={(e) => this.ratingChanged("rating2", e)} />
                                            </div>
                                        </div>
                                        <div className="pb-3 row m-0">
                                            <p className="col-12 col-sm-6 p-0">{item.q4}</p>
                                            <div className="col-12 col-sm-6 p-0 pr-md-5 d-flex justify-content-md-end">
                                                <ReactStars
                                                    count={5}
                                                    size={30}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#C97EF5"
                                                    edit={true}
                                                    value={0}
                                                    isHalf={false}
                                                    onChange={(e) => this.ratingChanged("rating3", e)} />
                                            </div>
                                        </div>
                                        <div className="pb-3 row m-0">
                                            <p className="col-12 col-sm-6 p-0">{item.q5}</p>
                                            <div className="col-12 col-sm-6 p-0 pr-md-5 d-flex justify-content-md-end">
                                                <ReactStars
                                                    count={5}
                                                    size={30}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#C97EF5"
                                                    edit={true}
                                                    value={0}
                                                    isHalf={false}
                                                    onChange={(e) => this.ratingChanged("rating4", e)} />
                                            </div>
                                        </div> */}
                                        <div className="p-5 flexcc">
                                            {this.props.user && this.props.user.loggedin ? (
                                                <button className="btn-primary " style={{ maxWidth: '200px' }} onClick={() => { this.submitReview() }}>
                                                    <p>ثبت نظر</p>
                                                </button>
                                            ) : (
                                                <div>
                                                    <p> لطفا برای ثبت نظر وارد حساب کاربری خود شوید</p>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        );

    }
}
const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(teacherReviewsModal);

