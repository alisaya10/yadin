import React from "react";
import { Placeholder } from "react-bootstrap";
import Modal from '../Modal1'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { msToHMS } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import Loader from "react-loader-spinner";
import LoaderButton from "../LoaderButton";



class NoteModal extends React.Component {

  state = {

    info: [],
    notes: [
      {
        time: 29,
        note: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
      },
      {
        time: 10,
        note: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
      },
      {
        time: 20,
        note: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز",
      },
    ],
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
    // this.fetchData()
    this.modal.showModal()
  }


  // fetchData = () => {
  //   console.log(this.props.currentLesson)
  //   this.setState({ info: [], isLoading: true })
  //   HttpServices.request('getNotes', { filter: { lesson: this.props.currentLesson?._id } }, (fetchResult, fetchError) => {

  //     this.setState({ isLoading: false })

  //     // console.log(fetchResult)
  //     console.log(fetchError)

  //     if (fetchError) {
  //       return
  //     }
  //     console.info('fetchResult', fetchResult)
  //     this.setState({ info: fetchResult.info })
  //   })
  // }

  // ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };

  // seekVideo = (item) => {
  //   this.props.videoseek(this.props.noteVideo, null, item.noteTime)
  //   this.modal.hideModal()
  // }


  // postNotif = () => {
  //   let data = {
  //     description: this.state.description.trim(),
  //     title: this.state.title,
  //     noteTime: this.props.currentTime,
  //     lesson: this.props.currentLesson?._id,
  //     course: this.props.course?._id
  //   }
  //   console.log('data', data)

  //   if (data && data.description != '' && data.description != null) {
  //     HttpServices.request('postNote', data, (fetchResult, fetchError) => {

  //       this.setState({ description: '' })

  //       if (fetchError) {

  //         return console.log('false', fetchError)
  //       }

  //       this.fetchData()

  //       if (fetchResult) {
  //         console.log('successful', fetchResult)
  //       }
  //     })
  //   }

  // }


  removeNote = (item) => {


    HttpServices.request('removeNote', { id: item._id }, (fetchResult, fetchError) => {
      if (fetchError) {

        return
      }

      this.props.fetchData()
    })

  }
  postNote() {
    this.props.postNotif(this.state.description, this.state.title, this.props.currentTime)
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
    let notes = this.state.notes;
    return (

      <Modal maxWidth="900px" ref={el => this.modal = el}>
        <div className="w-100 radius-2 box" >
          <div className="py-5 text-color-1 flexcc text-ultra-big">
            یادگیره ها
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


            {/* <button onClick={() => this.postNotif()} className="btn-primary" style={{ maxWidth: '200px' }}>
              <p>ثبت یادگیره</p>
            </button> */}


            <div className="btn">
              <p className=" text-big">{msToHMS(this.props.currentTime)}</p>
            </div>
          </div>
          <div className="w-100 pt-5 w-100" style={{ margin: '0 auto' }}>

            {this.state.isLoading && (
              <div className="flexcc pb-5">
                <Loader
                  type="Oval"
                  color="#fff"
                  height="35"
                  width="35"
                />
              </div>
            )}


            {Array.isArray(this.props.notes) && this.props?.notes.map((item, index) => {
              // { console.log("textttttttttt", this.state.info) }
              return (
                <button className="w-100" >
                  <div className=" px-5 py-4 text-start">
                    <div className="border-bottom-gray pb-4">
                      <div className="" style={{ overflowWrap: "anywhere" }}>
                        <div>
                        <p className="text-color-1 "> <span className="text-semibig">عنوان: </span> {item.title}</p>
                        </div>
                        <div>
                        <p className="text-color-1 pt-2"><span className="text-semibig"> توضیح:‌ </span> {item.description}</p>
                        </div>
                      </div>

                      <div className="flexcb mt-2">
                        <p className="text-color-1">{msToHMS(item.noteTime)}</p>
                        <img onClick={() => this.removeNote(item)} className="" src='/images/icons/trash.svg' />
                      </div>

                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    );

  }
}


export default NoteModal;
