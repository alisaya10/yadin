import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import { NavItem } from "react-bootstrap";
import HttpServices from "../../utils/Http.services";
class QuizesAndPractices extends React.Component {
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


  getCoursesNotes() {


    console.log("Here")
    HttpServices.request('getCoursesNotes', {}, (fetchResult, fetchError) => {

      console.log(fetchError)
      console.log(fetchResult)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ data: fetchResult.info })
    })
  }



  render() {
    let lessonsBox = this.state.lessonsBox;
    let lessons = this.state.lessonsBox.lessons;
    return (
      <Configurer
        settingsInfo={{
          headerTitle: "QuizesAndPractices",
          button: { goBack: true },
        }}
        title={"QuizesAndPractices"}
        description={"QuizesAndPractices"}
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
              return (
                <div className="col-12 col-xl-6">
                  <div className="box px-4 pb-3">


                    <div className="row m-0 border-bottom-gray">
                      <div className="col-6 flexc">
                        <h3 className="text-color-1 text-semibig font-light d-none d-md-block"> {item.course.title}</h3>
                      </div>
                      <div className="col-6 flexc justify-content-end">
                        {/* <p className="text-color-2">مشاهده </p>
                        <p className="text-color-2 d-none d-md-block ">کامل</p>
                        <img src="/images/icons/arrow-left.svg" /> */}
                      </div>
                    </div>


                    <div className="row m-0">
                      <div className="col-6 flexc justify-content-center">
                        <h3 className="text-color-1">عنوان</h3>
                      </div>
                      <div className="col-6 flexc justify-content-center">
                        <h3 className="text-color-1">اسنک</h3>
                      </div>
                    </div>
                    {item.notes.map((item, index) => {
                      return (
                        <div className="row m-0 pb-3">
                          <div className="col-6 flexc justify-content-center">
                            <p className="text-color-2">{item.title}</p>
                          </div>
                          <div className="col-6 flexc justify-content-center">
                            <p className="text-color-2 d-none d-md-block">{item?.lesson?.title}</p>
                          </div>

                        </div>
                      )
                    })}


                  </div>
                </div>
              )
            })}

          </div>



        </div>




      </Configurer>
    );
  }
}

export default QuizesAndPractices;