import React from "react";
import { Placeholder } from "react-bootstrap";
import Modal from '../Modal1'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { msToHMS } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import Loader from "react-loader-spinner";
import LoaderButton from "../LoaderButton";



class OneNoteModal extends React.Component {

  state = {

    info: [],
    notes: [],
    Notif: ''
  };


  componentDidMount() {
    console.log('first')


  }

  showModal = () => {
    if (this.props.postDone == true) {
      console.log('second')
      this.setState({ description: '', title: '' })
    }
    this.modal.showModal()
  }



  removeNote = (item) => {
    console.log('.................')
    HttpServices.request('removeNote', { id: item._id }, (fetchResult, fetchError) => {
      if (fetchError) {
        return
      }

      this.props.fetchData()
      this.modal.hideModal()
    })

  }





  render() {
    return (

      <Modal maxWidth="900px" ref={el => this.modal = el}>
        <div className="w-100 radius-2 box pb-3" >
          <div className="py-5 text-color-1 flexcc text-ultra-big">
            ویرایش یادگیره
          </div>

          <div>
            <div className="px-5 py-3">
              <div className="flexcb px-5">
                <p className="text-color-1 text-semibig"> <span className="text-color-2">عنوان: &nbsp;</span>{this.props.note?.title}</p>
                <p className="text-color-2 pr-5">{msToHMS(this.props.note?.noteTime)}</p>
              </div>

              <div className="pr-5 pt-3">
                <p className="text-color-1 text-semibig"><span className="text-color-2">توضیح: &nbsp;</span>{this.props.note?.description}</p>
              </div>

              <div className="d-flex justify-content-end">
                <img onClick={() => this.removeNote(this.props.note)} className="px-5 pt-3" src='/images/icons/trash.svg' />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );

  }
}


export default OneNoteModal;
