import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpServices from "../../utils/Http.services";
import Link from "next/link";
import { imageAddress } from "../../utils/useful";

class Certificates extends React.Component {


    state = {
        data: [],
        certificates: [
            { title: "تیم سازی", score: "۱۰", date: "1401/08/25" },
            { title: "تیم سازی", score: "۱۰", date: "1401/08/25" },
        ]
    }

    componentDidMount() {
        HttpServices.request('getWishLists', {}, (fetchResult, fetchError) => {

            console.log(fetchResult)
            console.log(fetchError)

            if (fetchError) {
                return
            }
            this.setState({ data: fetchResult?.info })
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
        let certificates = this.state.certificates;
        return (
            <Configurer
                settingsInfo={{
                    headerTitle: "Certificates",
                    button: { goBack: true },
                }}
                title={"Certificates"}
                description={"Profile Dashboard"}
                className=""
                style={{ padding: '0px 3% 0px 3%' }}
                changeOnUnmount={true}
            >

                <div className="container">
                    <div className="flexcc">
                        <div
                            className="px-3 py-2 btn-primary6 mt-5 radius-2" style={{ maxWidth: "400px" }}>
                            <div className="flexcb">
                                <input type={"Text"} placeholder="عنوان یادین را جستجو کنید." className="search-input" style={{ color: "#fff", background: "transparent", border: "none" }} />

                                <img src="/images/icons/Search-2.svg" />
                            </div>
                        </div>
                    </div>


                    <div className="pt-5 px-3">
                        <div className="row m-0 flexc border-bottom-gray pb-3">
                            <div className="col-6 col-md-4 col-lg-5">
                                <p className="text-color-1 text-semibig">یادین</p>
                            </div>

                            <div className="d-none d-lg-block col-lg-2">
                                <p className="text-color-1 text-semibig text-center">میانگین نمرات</p>
                            </div>

                            <div className="d-none d-md-block col-md-4 col-lg-2">
                                <p className="text-color-1 text-semibig text-center">تاریخ صدور</p>
                            </div>

                            <div className="col-6 col-md-4 col-lg-3">
                                <p></p>
                            </div>
                        </div>


                        {this.state.certificates?.map((item, index) => {
                            return (
                                <div className="row m-0 flexc py-3">
                                    <div className="col-6 col-md-4 col-lg-5">
                                        <p className="text-color-2 ">{item.title}</p>
                                    </div>

                                    <div className="d-none d-lg-block col-lg-2">
                                        <p className="text-color-2  text-center">{item.score}</p>
                                    </div>

                                    <div className="d-none d-md-block col-md-4 col-lg-2">
                                        <p className="text-color-2  text-center">{item.date}</p>
                                    </div>

                                    <div className="col-6 col-md-4 col-lg-3 text-end">
                                        <button className="notification-btn btn-primary5" style={{ maxWidth: "200px" }}>مشاهده گواهینامه</button>
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

export default Certificates;
