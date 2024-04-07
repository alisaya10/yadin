import React from "react";
import Configurer from "../Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import ReviewsModal from "../modals/ReviewsModal";
import { NavItem } from "react-bootstrap";
import HttpServices from "../../utils/Http.services";
import { translate } from "../../utils/useful";

class EndPage extends React.Component {
    state = {

        exam: {
            title: 'ازمون پایه 6 ریاضی',
            time: '1 ساعت',
            level: 'سطح پیشرفته',
            description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
        },

score: 0
    };


componentDidMount(){
    console.log('zzzz', this.props.current)

}



    render() {
        let courseInfo = this.state.courseInfo;
        let notifications = this.state.notifications;
        let exams = this.state.exams;
        let reviews = this.state.reviews;
        let exam = this.state.exam;
        return (

            <div className="text-color-1 ">
                <div className="box p-4 " style={{ maxWidth: '900px' }}>
                    <div className="text-semibig d-flex ">
                        <p>نام امتحان   :</p>
                        <p className="pr-2">{this.props.quiz?.title}</p>
                    </div>
                    <div className="row m-0 pt-4">
                        <div className="col-12 col-lg-8 p-0">
                            <p>{this.props.quiz?.description}</p>
                        </div>
                        <div className="col-12 col-lg-4 p-0">
                            <div className="row m-0">
                                <div className="col-12 col-lg-12 col-md-6 flexc justify-content-lg-end pt-4 pt-lg-0">
                                    <p>زمان امتحان :</p>
                                    <p className="pr-2">{this.props.quiz?.time} دقیقه</p>
                                </div>
                                <div className="col-12 col-lg-12 col-md-6 flexc justify-content-md-end pt-4">
                                    <p>سطح امتحان :</p>
                                    <p className="pr-2">{translate(this.props.quiz?.level)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box p-4 flexcc" style={{ maxWidth: '900px' }}>
                    <p className="text-big">
                        نمره شما
                    </p>
                    <p className="text-big pr-4">
                        {(this.props.current?.score).toFixed(1)
                        } 
                    </p>
                </div>
                <div className="flexcc">
                    <div className="flexcc btn-primary" style={{ maxWidth: '250px' }}>
                        <Link href={`/course-info/${this.props.quiz?.course?._id}`}>
                            <a className="text-normal w-100 ">
                                بازگشت به داشبورد یادین
                            </a>
                        </Link>
                    </div>
                </div>



            </div>
        );
    }
}

export default EndPage;
