import React from "react";
import CourseBox from "../../components/boxes/CourseBox";
import Link from "next/link";
import OverView from "../../components/boxes/OverView";
import PeymentModal from "../../components/modals/PeymentModal";
import HttpServices from "../../utils/Http.services";
import Router from "next/router";
import Video from "../../components/course/Video";

export async function getServerSideProps(context) {
    let slug = null
    if (context?.query?.slug) {
        slug = context.query?.slug
    }

    const lesson = await (await HttpServices.syncRequest('getOneLesson', { _id: slug })).result

    // console.log(course)

    return JSON.parse(JSON.stringify({
        props: {
            lesson: lesson?.info, lessons: lesson?.lessons, course: lesson?.course
        }
    }))

}
class snacks extends React.Component {

    state = {
        info: {

        },
        snacks: [

        ],

        courses: [],

        sideBar: [
            { number: '10', totalTime: '۴ساعت', practice: '۲ساعت', level: 'مقدماتی', category: 'مدیریت', price: '۱۰۰' }
        ],


        page: 0,
        limit: 4,
        currentPage: 0,
    };

    componentDidMount() {

        // this.fetch()

        console.log('this is lesson info', this.props.lesson);
        console.log('this is lessons info', this.props.lessons);
        console.log('this is course info', this.props.course);




    }

    // fetch(getCount) {
    //     let slug = Router.query.slug

    //     let body = {
    //         _id: slug,
    //         limit: this.state.limit,
    //         skip: this.state.currentPage
    //     }
    //     // body.limit = this.state.limit
    //     // body.

    //     if (this.state.totalCount == null || getCount) {
    //         body.getCount = true
    //     }

    //     HttpServices.request("getCourses", body, (fetchResult, fetchError, fetchStatus) => {
    //         this.setState({ isLoading: false })


    //         this.setState({ pageStatus: fetchStatus })
    //         if (fetchError) {
    //             this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.fetchDataFailed', description: fetchError.message })
    //             return
    //         }
    //         this.setState({ courses: fetchResult.info })

    //         if (fetchResult.count != null) {
    //             this.setState({ totalCount: fetchResult.count })
    //         }

    //         console.log("this is res", fetchResult);

    //     })
    // }



    render() {

        return (
            <main className="container">
                <div className="row m-0">

                    <div className="col-12 col-md-3">
                        <div className="d-flex " style={{ position: 'sticky', top: 100 }}>
                            <div className="box px-3 w-100 ">
                                <h4 className="text-color-1 font-light text-normal">محتوای یادین</h4>
                                <div className="d-flex flexc text-color-1 ">
                                    <img src="/images/icons/play-cricle.png" style={{ width: "25px" }}></img>
                                    <p className="text-small p-2">تعداد اسنک: {this.props?.lessons?.length}</p>
                                    {/* { console.log('count',this.props.data?.lessons?.count)}  */}
                                </div>

                                {Array.isArray(this.props.lessons) && this.props?.lessons.map((item, index) => {
                                    return (
                                        <div key={index} className="box-2 d-flex flexcb px-3 py-3 mb-2 ">

                                            <div className="d-flex">
                                                <Link href={"/course-info/content&_id=" + item._id}>
                                                    <a href="" className="pr-4 " style={{ cursor: "pointer" }}>
                                                        <p className="text-color-1 text-normal">اسنک {index + 1}: </p>
                                                    </a>
                                                </Link>

                                                <Link href={"/course-info/content&_id=" + item._id}>
                                                    <a href="" className="pr-4" style={{ cursor: "pointer" }}>
                                                        <p className="text-color-1 text-normal">{item.title}</p>
                                                    </a>
                                                </Link>

                                            </div>
                                            <p className="text-color-2">{item?.duration ?? 0} دقیقه</p>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>


                    <div className="col-12 col-md-9">
                        <Video />
                    </div>
                </div>
            </main >

        )
    }
}


export default snacks