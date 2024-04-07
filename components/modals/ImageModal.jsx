import React from "react";
import { Placeholder } from "react-bootstrap";
import Modal from '../Modal3'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { msToHMS } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import Loader from "react-loader-spinner";
import { imageAddress } from "../../utils/useful";
import FormViewer from "../FormViewer";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';


class ImageModal extends React.Component {

  state = {
    headers: [
      { key: 'image', type: 'ProfileImageInput', theme: 'transparent', information: { label: 'عکس پروفایل', placeholder: 'عکس پروفایل', placeHolderImage: '', inputClass: 'none', required: false, cropper: true, ratio: '1:1', single: true } },
    ],
  };


  componentDidMount() {



  }

  updateUserInfo = () => {
    let data = this.form.getForm()

    console.log('ppppppppppdataaaaaa', data)
    if (data) {
      this.setState({ isLoading: true })

      HttpServices.request("updateUserInfo", data, (fetchResult, fetchError) => {
        this.setState({ isLoading: false })
        if (fetchError) {
          this.setState({ errors: fetchError.errors })
          console.log('ppppppp', fetchError)
          // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
          return
        }
        console.log('ppppppp', fetchResult)
        this.setState({ errors: null })
        this.props.actions.setUser(fetchResult.user, null, true)
  
    this.modal.hideModal()
        // this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })
      })
    }
  }

  showModal = () => {
    // this.fetchData()
    this.modal.showModal()

  }


  fetchData = () => {
    console.log(this.props.currentLesson)
    this.setState({ info: [], isLoading: true })
    HttpServices.request('getNotes', { filter: { lesson: this.props.currentLesson?._id } }, (fetchResult, fetchError) => {

      this.setState({ isLoading: false })

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info('fetchResult', fetchResult)
      this.setState({ info: fetchResult.info })
    })
  }

  ratingChanged = (newRating) => {
    console.log(newRating);
  };

  seekVideo = (item) => {
    this.props.videoseek(this.props.noteVideo, null, item.noteTime)
    this.modal.hideModal()
  }


  postNotif = () => {
    let data = {
      title: this.state.text,
      noteTime: this.props.currentTime,
      lesson: this.props.currentLesson?._id
    }
    console.log('data', data)

    if (data) {
      HttpServices.request('postNote', data, (fetchResult, fetchError) => {

        this.setState({ text: '' })

        if (fetchError) {

          return console.log('false', fetchError)
        }

        this.fetchData()

        if (fetchResult) {
          console.log('successful', fetchResult)
        }
      })
    }
  }


  removeNote = (item) => {


    HttpServices.request('removeNote', { id: item._id }, (fetchResult, fetchError) => {
      if (fetchError) {

        return
      }

      this.fetchData()
    })

  }




  handleNotif = (e) => {
    this.setState({ text: e.target.value })
    console.log('text', this.state.Notif)
  }
  render() {
    return (

      <Modal maxWidth="400px" ref={el => this.modal = el}>

        <div className="w-100 radius-2 flexcc p-2 flex-column" style={{ background: "#121212", height: '300px' }} >
          <div className="">

            <FormViewer initData={this.props.data} ref={el => this.form = el} headers={this.state.headers} inputClass={""} />
          </div>


          {/* <div>

            <img src={imageAddress(this.props.data?.image, null, 'thumb')} style={{ width: 300, borderRadius: "10px" }} />
          </div>

          <div className="mt-4" style={{ width: 300 }}>
            <button className="btn-primary1">
              <p>انتخاب عکس</p>
            </button>
          </div> */}

          <div onClick={() => this.updateUserInfo()} className="mb-5 mr-2" style={{ width: 230 }}>
            <button className="btn-primary1">
              <p> ثبت تغییرات</p>
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
)(ImageModal);
