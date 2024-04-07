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


class commentModal extends React.Component {
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

  submitComment = () => {



    // let review = this.state.rating

    // this.setState({ review: review }, () => {
    //     console.log(this.state.review);
    // })



    if (!this.state.text) {
      return console.log("فیلد ها خالی هستند")
    }


    else {
      // this.setState({ review: { ...this.state.review, [key]: value } }, () => {
      // })
      console.log(this.state.review)
      // console.log(value)

      this.props.closeModal()


      HttpServices.syncRequest('addComment', { body: this.state.text, course: this.props.data?._id }).then(() => {
        console.log("review send successful")
        // this.setState({ comment: {} })
        setTimeout(() => {
          this.props.getAllComments()
        }, 400)

      })
    }

  }




  changeValue = (text) => {
    console.log("text", text)
    this.setState({ text })
  }


  render() {
    return (

      <Modal ref={el => this.modal = el}>
        <div className="w-100  radius-2 box" >
          <div className="py-5 text-color-1 flexcc text-ultra-big">
            پرسش خود را ثبت کنید.
          </div>
          <textarea onChange={e => this.changeValue(e.target.value)} placeholder="پرسش خود را بنویسید.." className="radius-1 w-80 p-4 bg-gray-color-4 white" style={{ height: '150px', margin: '0 auto' }} />

          <div className="p-5 flexcc">
            <button className="btn-primary " style={{ maxWidth: '200px' }} onClick={() => {
              this.submitComment()
            }}>
              <p>ثبت پرسش</p>
            </button>
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
)(commentModal);

