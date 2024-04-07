import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import HttpServices from "../../utils/Http.services";
import { imageAddress } from "../../utils/useful";
class CourseFiles extends React.Component {

  state = {
    data: {},
    info: []
  }
  componentDidMount() {
    console.log('this.props.course._id',this.props.course._id);
    HttpServices.request('getCourseFiles', {course : this.props.course._id}, (fetchResult, fetchError) => {

      // console.log(fetchResult)
      console.log(fetchError)

      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({ info: fetchResult.info, data: fetchResult?.courseFiles })
    })
  }


  updateUserPassword = () => {
    let data = this.form.getForm();
    if (data) {
      this.setState({ isLoading: true, errors: {}, message: null });
      HttpService.request(
        "updateUserPassword",
        data,
        (fetchResult, fetchError) => {
          console.log(fetchError);
          this.setState({ isLoading: false });
          if (fetchError) {
            this.setState({ errors: fetchError.errors });
            this.props.addNotif({
              type: "error",
              title: "{{lang}}errors.profileNotUpdated",
              description: fetchError.message,
            });
            return;
          }
          this.props.addNotif({
            type: "success",
            title: "{{lang}}info.profileUpdated",
            description: "{{lang}}info.profileUpdatedSuccessfully",
          });
        }
      );
    }
  };

  render() {

    return (
      <Configurer
        settingsInfo={{
          headerTitle: "Course files",
          button: { goBack: true },
        }}
        title={"Course files"}
        description={"Course files"}
        className="px-5"
        changeOnUnmount={true}
      >


        <div className="container">

          <div className="flexc mt-3 d-md-none">
            <div className="">
              <button onClick={() => this.props.openMobileMenu()} className="flexcc">
                <img className=" " src="/images/icons/menu-3.svg" alt="" />
              </button>
            </div>
            <div>
              <p className="white">فایل های یادین</p>
            </div>
          </div>

          <div className="row m-0 pt-4">
            {Array.isArray(this.state.info) && this.state.info.length > 0 ? (
<>
              {this.state.info?.map((item, index) => {
                return (
                  <div className=" box px-3 pb-3 mb-3 col-12 col-sm-5">
                  <h2 className="pb-2 border-bottom-gray text-color-1 text-semibig font-light">{item.title}</h2>

                  <div className="row m-0 ">
                    <div className="col-12 col-sm-12 col-xl-4 pt-3 flexcc">
                      <div className="flexcc">
                        <img src={imageAddress(this.state.info?.image , 'resource', 'thumb')} class=" radius-1" style={{ width: "120px", height: "120px" }} />
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-xl-8 pr-4 d-flex justify-content-center text-center text-xl-right" style={{ flexDirection: "column" }}>
                      <div>
                        <p className="text-color-2 text-normal mt-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="">
                        {item.files && item.files.length > 0 && item.files.map((file, index) => {
                          return (
                            <div className="">
                              <button className=" btn-primary5 main-color-1 text-normal mt-4 nowrap" style={{ maxWidth: "140px" }}>
                                <a className="" href={(file ? imageAddress(file) : '#')} target="_blank">
                                  دریافت فایل {index + 1}
                                </a>
                              </button>
                            </div>

)
})}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            </>
            ):(
              <p className=" w-100 text-color-2 text-semibig mt-4 flexcc">
                         فایلی برای این دوره پیدا نشد
                        </p>
            )}




            {/* <div className=" box px-3 pb-3 mb-3 col-12 col-sm-5">
              <h2 className="pb-2 border-bottom-gray text-color-1 text-semibig font-light px-5 nowrap" >جزوه یادین</h2>

              <div className="row m-0 ">
                <div className="col-12 col-sm-12 col-xl-4 pt-3 flexcc " >
                  <div className="flexcc">
                    <img src="/images/icons/pdf-2.png" class=" radius-1" style={{ width: "100%" }} />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-xl-8 pr-4 d-flex justify-content-center text-center text-xl-right" style={{ flexDirection: "column" }}>
                  <div>
                    <p className="text-color-2 text-normal mt-2">
                      فایل پی دی اف (۳۲ صفحه)                          </p>
                  </div>

                  <div className="flexcb">
                    <button className="btn-primary5 main-color-1 text-normal mt-5" style={{ maxWidth: "200px" }}> دریافت فایل</button>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

      </Configurer>
    );
  }
}

export default CourseFiles;