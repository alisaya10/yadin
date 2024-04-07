import React from "react";
import { Placeholder } from "react-bootstrap";
import Modal from '../Modal1'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { msToHMS } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import Loader from "react-loader-spinner";
import LoaderButton from "../LoaderButton";
import moment from 'jalali-moment';




class OneNoteModal extends React.Component {

  state = {

    info: [],
    notes: [],
    Notif: '',
    edit: false,
    title: "",
    description: ""
  };


  componentDidMount() {
    console.log('first')

  }

  showModal = () => {
    if (this.props.postDone == true) {
      console.log('second')
    }
    this.setState({ edit: false })
    this.setState({ title: '', description: '' })
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

  postNote() {
    console.log('sdvsbvfdb', this.state.description )
    this.props.postNotif(this.state.description, this.state.title, this.props.note.noteTime, this.props.note._id)
    this.props.fetchData()
    this.modal.hideModal()
  }



  handleNotif = (e) => {
    this.setState({ description: e.target.value })
    // console.log('description', this.state.description)
  }
  handleNotifTitle = (e) => {
    this.setState({ title: e.target.value })
    // console.log('title', this.state.title)
  }



  render() {
    return (

      <Modal maxWidth="600px" ref={el => this.modal = el}>
        {this.state.edit == false ? (
          <div className="w-100 radius-2 box" >
            <div className="py-5 text-color-1 flexcc text-ultra-big">
              یادگیره
            </div>

            <div>
              <div className="px-5 py-4">
                <div className="flexcb" style={{ overflowWrap: "anywhere" }}>
                  <p className="text-color-1 text-semibig"> <span className="text-color-2">عنوان: &nbsp;</span>{this.props.note?.title}</p>
                </div>

                {console.log("timeeeeee", this.props.note)}

                <div className="pt-3" style={{ overflowWrap: "anywhere" }}>
                  <p className="text-color-1 text-semibig"><span className="text-color-2">توضیح: &nbsp;</span>{this.props.note?.description}</p>
                </div>





                <div className="flexcb mt-5">
                  <button className="p-0" onClick={() => { this.setState({ edit: true, title: this.props.note?.title, description: this.props.note?.description }) }}>
                    <p className="text-semibig btn1">ویرایش</p>
                    {/* <p className="text-semibig" style={{backgroundColor: "#01B982", color: "#fff"}}>ویرایش</p> */}
                  </button>

                  <div>
                    <p className="text-color-2 text-big " >{msToHMS(this.props.note?.noteTime)}</p>
                  </div>

                  <div className="d-flex justify-content-end">
                    <img onClick={() => this.removeNote(this.props.note)} className="" src='/images/icons/trash.svg' style={{ width: "45px" }} />
                  </div>
                </div>
              </div>


            </div>
          </div>
        ) : (
          <div className="w-100 radius-2 box" >
            <div className="py-5 text-color-1 flexcc text-ultra-big">
              یادگیره
            </div>

            <div>
              <div className="px-5 py-4">
                <div className="flexcb px-5" style={{ overflowWrap: "anywhere" }}>
                  <p className="text-color-1 text-semibig"> <span className="text-color-2">عنوان: &nbsp;</span>{this.props.note?.title}</p>
                  {/* <p className="text-color-2 pr-5">{msToHMS(this.props.note?.noteTime)}</p> */}
                </div>

                <div className="pr-5 pt-3" style={{ overflowWrap: "anywhere" }}>
                  <p className="text-color-1 text-semibig"><span className="text-color-2">توضیح: &nbsp;</span>{this.props.note?.description}</p>
                </div>

                <div className="flexcb px-5 pt-4">
                  <div>
                    <p className="text-color-2 text-big " >{msToHMS(this.props.note?.noteTime)}</p>
                  </div>

                  <div className="d-flex justify-content-end">
                    <img onClick={() => this.removeNote(this.props.note)} className="" src='/images/icons/trash.svg' style={{ width: "45px" }} />
                  </div>
                </div>
              </div>
            </div>


            <div className="px-5 py-4">
              <input value={this.state.title} onChange={(e) => this.handleNotifTitle(e)} placeholder="عنوان" className="radius-1 w-100 p-4 bg-gray-color-4" style={{ height: '50px', margin: '4 auto', color: '#fff', outline: "none", border: "none" }} />
            </div>
            <div className="px-5">
              <textarea value={this.state.description} onChange={(e) => this.handleNotif(e)} placeholder="یادگیره خود را یادداشت کنید." className="radius-1 w-100 p-4 bg-gray-color-4" style={{ height: '150px', margin: '4 auto', color: '#fff' }} />
            </div>


            <div className="flexcb px-5 pt-4">
              <LoaderButton
                onClick={() => this.postNote()}
                isLoading={this.state.isLoading}
                text='ثبت یادگیره'
                type={"ThreeDots"}
                className="my-4 nowrap"
                buttonClassName="btn-primary"
                buttonStyle={{ fontSize: 12, fontWeight: 'bold', maxWidth: '200px' }}
                width={20}
                // height={20}
                color={'#fff'}

              />

            </div>


          </div>
        )}
      </Modal>
    );

  }
}


export default OneNoteModal;
