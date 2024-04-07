import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
class Notifications extends React.Component {
  state = {
    openDropDown: false,
    notifications: [
      {
        description: "استاد پاسخ پیام شما را در خصوصی داد.",
        title: "تیم سازی",
        type: "تمرین",
        time: "چهارشنبه ۱۴۰۱/۰۶/۱۵",
        icon: "/images/icons/notification-3.svg"
      },
      {
        description: "استاد پاسخ پیام شما را در خصوصی داد.",
        title: "تیم سازی",
        type: "تمرین",
        time: "چهارشنبه ۱۴۰۱/۰۶/۱۵",
        icon: "/images/icons/notification-3.svg"
      },
      {
        description: "استاد پاسخ پیام شما را در خصوصی داد.",
        title: "تیم سازی",
        type: "تمرین",
        time: "چهارشنبه ۱۴۰۱/۰۶/۱۵",
        icon: "/images/icons/notification-3.svg"
      },
      {
        description: "استاد پاسخ پیام شما را در خصوصی داد.",
        title: "تیم سازی",
        type: "تمرین",
        time: "چهارشنبه ۱۴۰۱/۰۶/۱۵",
        icon: "/images/icons/notification-3.svg"
      },

    ]
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
    let notifications = this.state.notifications;

    return (
      <Configurer
        settingsInfo={{
          headerTitle: "Notifications",
          button: { goBack: true },
        }}
        title={"Notifications"}
        description={"Notifications"}
        className=""
        style={{ padding: '0px 3% 0px 3%' }}
        changeOnUnmount={true}
      >
        <div className="container">
          <div className="">
            <div className="box p-3 w-100">

              <div className="row m-0">
                <div className=" col-12 col-xl-3 nowrap p-0">
                  <div className="flexc">
                    <img className="pl-2" src="/images/icons/notification-1.svg" />
                    <h3 className="text-color-1 text-semi-big font-light">۶ اعلان جدید</h3>
                  </div>
                </div>

                <div className="flexc col-12 col-sm-6 col-xl-2 p-0 pb-4 pb-xl-0 nowrap d-flex justify-content-xl-start">
                  <div className="flexc">
                    <img className="pl-2" src="/images/icons/notification-2.svg" />
                    <p className="notification-text text-color-2">۱ اعلان ارتباطات</p>
                  </div>
                </div>

                <div className="flexc col-12 col-sm-6 col-xl-2 p-0 pb-4 pb-xl-0 nowrap d-flex justify-content-xl-center">
                  <div className="flexc">
                    <img className="pl-2" src="/images/icons/notification-3.svg" />
                    <p className="notification-text text-color-2">۱ اعلان تمرین</p>
                  </div>
                </div>
                <div className="flexc col-12 col-sm-6 col-xl-2 p-0 pb-4 pb-xl-0 nowrap d-flex justify-content-xl-end">
                  <div className="flexc">
                    <img className="pl-2" src="/images/icons/notification-4.svg" />
                    <p className="notification-text text-color-2">۱ اعلان آزمون</p>
                  </div>
                </div>
                <div className="flexc col-12 col-sm-6 col-xl-3 p-0 pb-4 pb-xl-0 nowrap d-flex justify-content-xl-end">
                  <div className="flexc">
                    <img className="pl-2" src="/images/icons/notification-5.svg" />
                    <p className="notification-text text-color-2">۱ اعلان محتوای یادین</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="box p-3 mb-3">
            <div className="pb-3 border-bottom-gray">
              <div className="row m-0 flexc" >
                <div className="col-6 col-xl-2 p-0">
                  <h3 className="notification-h text-color-1 text-semi-big font-light">عنوان یادین</h3>
                </div>
                <div className="d-none d-xl-block col-xl-4">
                  <h3 className=" text-color-1 text-semi-big font-light">متن اعلان</h3>
                </div>
                <div className="d-none d-xl-block col-xl-2">
                  <h3 className="notification-h text-color-1 text-semi-big font-light">نوع اعلان</h3>
                </div>
                <div className="d-none d-xl-block col-xl-2">
                  <h3 className=" text-color-1 text-semi-big font-light">زمان اعلان</h3>
                </div>


                <div className="position-relative col-6 col-xl-2 flexc" style={{ width: '300px' }}>
                  <button onClick={() => this.setState({ openDropDown: !this.state.openDropDown })} className="notification-btn btn-primary6 flexcb px-4" style={{ maxWidth: "200px" }}>
                    مشاهده
                    <img src="/images/arrow-down.svg" />
                  </button>

                  <div style={{ display: this.state.openDropDown ? 'block' : 'none', top: 45, zIndex: 3, }} className="position-absolute">
                    <div className="btn-primary6 d-flex flex-column notification-btn" style={{ width: '200px' }}>
                      <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>ارتباطات</button>
                      <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>تمرین</button>
                      <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>آزمون</button>
                      <button className="w-100 py-1" style={{ color: "#a0a0a0" }}>محتوای دوره</button>
                    </div>
                  </div>
                </div>


                {/* <div className="col-6 col-xl-2 flexc">
                  <button onClick={() => this.setState({ openDropDown: !this.state.openDropDown })} className="notification-btn btn-primary6" style={{ maxWidth: "200px" }}>مشاهده</button>
                </div> */}
              </div>
            </div>


            {notifications.map((item, index) => {
              return (
                <div className="">
                  <div className="row m-0 pt-4 flexc" >
                    <div className="col-4 col-xl-2 p-0">
                      <p className="text-color-2">{item.title}</p>
                    </div>
                    <div className="d-none d-xl-block col-xl-4">
                      <p className="text-color-2">{item.description}</p>
                    </div>
                    <div className="flexc col-4 col-xl-2">
                      <img className="pl-2" src={item.icon} />
                      <p className="d-none d-xl-block text-color-2">{item.type}</p>
                    </div>

                    <div className="d-none d-xl-block col-xl-2">
                      <p className="text-color-2">{item.time}</p>
                    </div>
                    <div className="col-4 col-xl-2 ">
                      <button className="btn-primary5 flexcc notification-btn text-normal text-normal" style={{ maxWidth: "200px" }}>مشاهده</button>
                    </div>
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

export default Notifications;