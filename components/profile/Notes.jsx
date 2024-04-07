import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import { NavItem } from "react-bootstrap";
import HttpServices from "../../utils/Http.services";
class Notes extends React.Component {
  state = {
    data: [],
    info: {},
    lessonsBox: [
      {
        lessons: [
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
        ],
      },
      {
        lessons: [
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
        ],
      },
      {
        lessons: [
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
        ],
      },
      {
        lessons: [
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
        ],
      },
      {
        lessons: [
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
          { title: "تعریف تیم", snack: "اسنک۱: ", name: "تیم چیست؟" },
        ],
      }
    ]

  }

  componentDidMount() {

    this.getCoursesNotes()
  }
  // getLessons() {
  //   HttpServices.request('getLessons', {}, (fetchResult, fetchError) => {

  //     console.log(fetchResult)
  //     console.log(fetchError)

  //     if (fetchError) {
  //       return
  //     }
  //     console.info(fetchResult)
  //     this.setState({ info: fetchResult.info, data: fetchResult?.lessons })
  //   })


  // }

  getCoursesNotes() {


    console.log("Here")
    console.log("Here")
    console.log("Here")
    HttpServices.request('getCoursesNotes', {}, (fetchResult, fetchError) => {
      if (fetchError) {
        return
      }
      console.log("Here",fetchResult)
      this.setState({ data: fetchResult.info })
    })
  }



  render() {
    let lessonsBox = this.state.lessonsBox;
    let lessons = this.state.lessonsBox.lessons;
    let availableNotes= []
    return (
      <Configurer
        settingsInfo={{
          headerTitle: "Lessons",
          button: { goBack: true },
        }}
        title={"Lessons"}
        description={"Lessons"}
        // className="px-5"
        style={{ padding: '0px 3% 0px 3%' }}
        changeOnUnmount={true}
      >
        <div className="container">


          <div className="flexcc">
            <div
              className="px-3 py-2 btn-primary6 mt-5 radius-2" style={{ maxWidth: "400px" }}>
              <div className="flexcb">
                <input type={"Text"} placeholder="جستجو.." className="search-input" style={{ color: "#fff", background: "transparent", border: "none" }} />

                <img src="/images/icons/Search-2.svg" />
              </div>
            </div>
          </div>



          <div className="row">
            {Array.isArray(this.state.data) && this.state?.data.map((item, index) => {
              if(item.notes.length >0){
                availableNotes.push(item)
              console.log('object',availableNotes);
              return (
                <div className="col-12">
                  <div className="box px-4 pb-3">


                    <div className="row m-0 border-bottom-gray">
                      <div className="col-9 flexc">
                        <h3 className="text-color-1 text-semibig font-light d-none d-sm-block"> {item.course.title}</h3>

                        <h3 className="text-color-1 text-normal font-light d-sm-none">
                          {item.course.title?.length > 12 ?
                            `${item.course.title.substring(0, 12)}...` : item.course.title
                          }
                          {/* {item.course.title} */}
                        </h3>
                      </div>
                      <div className="col-3 flexc justify-content-end">
                        <Link href={"/course-info/" + item.course._id + "/notes"}>
                          <a className="flexc">
                            <p className="text-normal text-color-2">مشاهده </p>
                            <p className="text-normal text-color-2 d-none d-md-block ">کامل</p>
                            <img src="/images/icons/arrow-left.svg" />
                          </a>
                        </Link>
                      </div>
                    </div>


                    <div className="row m-0">
                      <div className="col-12 col-md-6 flexc justify-content-center">
                        <p className="text-semibig pt-3 font-normal text-color-1">عنوان</p>
                      </div>
                      <div className="col-6 flexc justify-content-center d-none d-md-flex">
                        <p className="text-semibig pt-3 font-normal text-color-1">اسنک</p>
                      </div>
                    </div>
                    {item.notes.map((item, index) => {
                      return (
                        <div className="row m-0 pb-3 mt-3">
                          <div className="col-12 col-md-6 flexc justify-content-center" style={{ overflowWrap: "anywhere" }}>
                            <p className="text-color-2">{item.title}</p>
                          </div>
                          <div className="col-6 flexc justify-content-center d-none d-md-flex" style={{ overflowWrap: "anywhere" }}>
                            <p className="text-color-2 ">{item?.lesson?.title}</p>
                          </div>

                        </div>
                      )
                    })}
                  </div>
                </div>
              )
                  }
            })}


            {availableNotes.length == 0  && (
              <div className="col-12">
                <div className="box px-4 py-3 flexcc">
                  <p className="text-color-2">شما هنوز یادگیره ای ثبت نکرده اید.</p>
                </div>
              </div>
            )}

          </div>



        </div>




      </Configurer>
    );
  }
}

export default Notes;