import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import { NavItem } from "react-bootstrap";
import HttpServices from "../../utils/Http.services";
import Router from "next/router";
import { msToHMS } from "../../utils/useful";
import EditNoteModal from "../modals/EditNoteModal";

class Notes extends React.Component {
  state = {
    data: [],
    info: {},

    notes: [
      {
        title: "تعریف تیم",
        text: "به نظر می‌رسد در اینجا منظور استاد از تیم، هر اجتماع",
        snack: "اسنک۱: تیم چیست؟",
        time: "دقیقه ۱۰",
      },
      {
        title: "تعریف تیم",
        text: "به نظر می‌رسد در اینجا منظور استاد از تیم، هر اجتماع",
        snack: "اسنک۱: تیم چیست؟",
        time: "دقیقه ۱۰",
      },
      {
        title: "تعریف تیم",
        text: "به نظر می‌رسد در اینجا منظور استاد از تیم، هر اجتماع",
        snack: "اسنک۱: تیم چیست؟",
        time: "دقیقه ۱۰",
      },
      {
        title: "تعریف تیم",
        text: "به نظر می‌رسد در اینجا منظور استاد از تیم، هر اجتماع",
        snack: "اسنک۱: تیم چیست؟",
        time: "دقیقه ۱۰",
      },
    ],
  }
  componentDidMount() {
    let id = Router.query.id
    this.setState({ id }, () => {
      // this.getQuizes()
      // this.getPractices()
      this.getNotes()
      // this.getAllReviews()

    })

    // console.log('sdjfsndkvnsjdkvndsjkvnsd',this.state.course)

  }

  // componentDidUpdate(PrevProp, Prevstate) {
  //   if (this.state.isLoading != Prevstate.isLoading) {
  //     this.getTeacher()
  //     this.getQuizes()
  //     this.getPractices()
  //     this.getAllReviews()

  //   }
  // }

  getNotes = () => {


    console.log("Here")
    HttpServices.request('getNotes', { filter: { course: this.state.id } }, (fetchResult, fetchError) => {

      console.log(fetchError)
      console.log(fetchResult)

      if (fetchError) {
        return
      }
      console.info('fetchResult', fetchResult)
      this.setState({ info: fetchResult.info, data: fetchResult?.lesson })
    })


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
  // getOneLesson() {


  //     console.log("Here")
  //     HttpServices.request('getOneLesson', {}, (fetchResult, fetchError) => {

  //         console.log(fetchError)
  //         console.log(fetchResult)

  //         if (fetchError) {
  //             return
  //         }
  //         console.info(fetchResult)
  //         this.setState({ info: fetchResult.info, data: fetchResult?.notes })
  //     })


  // }

  OneNoteAction = (prop) => {
    this.EditNoteModal.showModal()
    this.setState({ note: prop })
  }



  render() {
    // let notes = this.state.notes;
    return (
      <Configurer
        settingsInfo={{
          headerTitle: "notes",
          button: { goBack: true },
        }}
        title={"notes"}
        description={"notes"}
        // className="px-5"
        style={{ padding: '0px 3% 0px 3%' }}
        changeOnUnmount={true}
      >
        <div>

          <div className="flexc mt-3 d-md-none">
            <div className="">
              <button onClick={() => this.props.openMobileMenu()} className="flexcc">
                <img className=" " src="/images/icons/menu-3.svg" alt="" />
              </button>
            </div>
            <div>
              <p className="white">یادگیره ها</p>
            </div>
          </div>


          <div className="flexcc">
            <div
              className="px-3 py-2 btn-primary6 mt-5 radius-2" style={{ maxWidth: "400px" }}>
              <div className="flexcb">
                <input type={"Text"} placeholder="جستجو.." className="search-input" style={{ color: "#fff", background: "transparent", border: "none" }} />

                <img src="/images/icons/Search-2.svg" />
              </div>
            </div>
          </div>


          {console.log("bdeeeeeeeeeee", this.state.info)}
          <div className="">
            <div className="box p-4">
                {Array.isArray(this.state.info) && this.state.info.map((item, index) => {
                  return (
              <div>
                <div className=" border-bottom-gray pb-3">
                  <div className="row m-0">
                    <div className=" col-7 col-sm-5 col-xl-2 p-0">
                      <p className="text-color-1 text-semibig">عنوان</p>
                    </div>
                    <div className="d-none d-xl-block col-6 col-xl-4 p-0">
                      <p className="text-color-1 text-center text-semibig">متن یادگیره</p>
                    </div>
                    <div className="d-none d-sm-block col-5 col-xl-3 p-0">
                      <p className="text-color-1 text-center text-semibig">اسنک</p>
                    </div>
                    <div className="d-none d-xl-block col-6 col-xl-1 p-0">
                      <p className="text-color-1 text-center text-semibig">زمان</p>
                    </div>
                    <div className=" col-2 col-xl-2 p-0 d-flex justify-content-end">

                    </div>
                  </div>
                </div>

                    <div className="pt-4">

                      <div className="row m-0 flexc text-color-2">
                        <div className="col-7 col-sm-5 col-xl-2 p-0 py-3">
                          <p className="cursor-pointer" onClick={() => this.OneNoteAction(item)}>
                            {item.title?.length > 10 ?
                              `${item.title.substring(0, 10)}...` : item.title
                            }
                          </p>
                        </div>
                        <div className="d-none d-xl-block col-6 col-xl-4 p-0 py-3">
                          <p className="text-center">
                            {item.description?.length > 50 ?
                              `${item.description.substring(0, 50)}...` : item.description
                            }
                          </p>
                        </div>
                        <div className="d-none d-sm-block col-5 col-xl-3 p-0 py-3">
                          <p className="text-center">{item.lesson.title}</p>
                        </div>
                        <div className="d-none d-xl-block col-6 col-xl-1 p-0 py-3">
                          <p className="text-center">{msToHMS(item.noteTime)}</p>
                        </div>
                        <div className="col-5 col-sm-2 col-xl-2 p-0 py-3 d-flex justify-content-end">
                          <button>
                            <Link href={"/snacks/" + item.lesson?._id + '?time=' + item?.noteTime}>
                              <a className="text-normal">
                                <p className="btn-primary5 flexc text-small nowrap">مشاهده
                                  {/* &nbsp; <span className="d-none d-sm-block text-color-2"> اسنک</span> */}
                                </p>
                              </a>
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>


              </div>
                );
              })}
              {this.state.info.length == 0 && (
                <div className="">
                  <div className="flexcc">
                    <p className="text-color-2">شما هنوز یادگیره ای ثبت نکرده اید.</p>
                  </div>
                </div>
              )}
            </div>



          </div>
        </div>

        <EditNoteModal closeModal={() => this.EditNoteModal.modal.hideModal} ref={el => this.EditNoteModal = el} note={this.state.note} fetchData={this.fetchData} />



      </Configurer>
    );
  }
}

export default Notes;