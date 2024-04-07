import React from "react";
import Configurer from "../../components/Configurer";
// import FormViewer from "../FormViewer";
// import LoaderButton from "../LoaderButton";
import HttpService from "../../utils/Http.services";
import Link from "next/link";
import ReviewsModal from "../../components/modals/ReviewsModal";
import { NavItem } from "react-bootstrap";
import Startpage from "../../components/practice/Startpage"
import Quiz from "../../components/practice/Quiz"
import EndPage from "../../components/practice/Endpage";
import StagesManager from "../../components/StagesManager";
import HttpServices from "../../utils/Http.services";
import Router from "next/router";



// export function getServerSideProps(context) {


//     let slug = context.query?.slug

//     console.log(slug)
//     return {
//         props: JSON.parse(JSON.stringify({

//             slug
//         }))
//     }


// }






class Practices extends React.Component {
    state = {
        like: true,

        courseInfo: {
            image: "/images/icons/maincardpic.png",
            title: "یادین تیم‌سازی",
            categories: "مدیریت",
            description:
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
            rate: "4.5",
            snacks: "10 اسنک",
            duration: "4 ساعت",
            practiceTime: "2 ساعت",
            level: "مقدماتی",
            teacher: {
                name: "ایمان سرایی",
                image: "/images/icons/profilepic.png",
                rate: "4.6",
                review: "(25نظر)",
                courses: "5 یادین",
                description:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
            },
        },

        exam: {
            name: 'ازمون پایه 6 ریاضی',
            time: '1 ساعت',
            level: 'سطح پیشرفته',
            description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
        },

        notifications: [
            { title: "نمره تمرین شماره 2 شما 8/10 است.", type: "تمرین" },
            {
                title: "محتوای بخش فایل‌های یادین به‌روزرسانی شد.",
                type: "محتوای یادین",
            },
            { title: "نمره آزمون شماره 2 شما 7/10 است.", type: "آزمون" },
            { title: "نمره تمرین شماره 3 شما 8/10 است.", type: "تمرین" },
        ],

        exams: [
            { title: "تمرین شماره 1", type: "اسنک 2" },
            { title: "آزمون شماره 2", type: "اسنک 3" },
            { title: "تمرین شماره 3", type: "اسنک 5" },
            { title: "آزمون شماره 4", type: "اسنک 6" },
            { title: "تمرین شماره 2", type: "اسنک 8" },
        ],

        reviews: [
            {
                name: "علی مجیدی‌نژاد",
                image: "/images/icons/1.png",
                content:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
                rate: "4.4",
                q1: "رضایت کلی از محتوای یادین",
                q2: "رضایت از فن بیان استاد",
                q3: "رضایت از سرعت پاسخ‌گویی استاد",
                q4: "رضایت از جذابیت بیان استاد (لحن و...)",
                q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای یادین",
                q1r: "4.5",
                q2r: "4",
                q3r: "5",
                q4r: "3.5",
                q5r: "5",
            },
            {
                name: "محسن باقری",
                image: "/images/icons/2.png",
                content:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
                rate: "4.4",
                q1: "رضایت کلی از محتوای یادین",
                q2: "رضایت از فن بیان استاد",
                q3: "رضایت از سرعت پاسخ‌گویی استاد",
                q4: "رضایت از جذابیت بیان استاد (لحن و...)",
                q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای یادین",
                q1r: "4.5",
                q2r: "4",
                q3r: "5",
                q4r: "3.5",
                q5r: "5",
            },
            {
                name: "ستاره باختری :)",
                image: "/images/icons/2.png",
                content:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود...",
                rate: "4.4",
                q1: "رضایت کلی از محتوای یادین",
                q2: "رضایت از فن بیان استاد",
                q3: "رضایت از سرعت پاسخ‌گویی استاد",
                q4: "رضایت از جذابیت بیان استاد (لحن و...)",
                q5: "رضایت از کیفیت (صدا و تصویر) ویدیوهای یادین",
                q1r: "4.5",
                q2r: "4",
                q3r: "5",
                q4r: "3.5",
                q5r: "5",
            },
        ],

        question: [
            {
                image: "/images/icons/1.png",
                title: "قرارگیری اعضا در جایگاه مناسب",
                description:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون...",
            },
            {
                image: "/images/icons/2.png",
                title: "انتخاب عضو",
                description:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون...",
            },
            {
                image: "/images/icons/3.png",
                title: "مدیریت تیم",
                description:
                    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون...",
            },
        ],
    };


    componentDidMount() {

        // console.log(this.props.slug)



        // this.getQuiz()
        this.getonePractice()
    }


    getQuiz = () => {

        let slug = Router.query.slug

        HttpServices.request('getQuiz', { _id: slug }, ((fetchResult, fetchError) => {

            if (fetchError) {
                // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                return
            }

            console.log('quuuuiiiizzzz', fetchResult.current)
            this.setState({ quiz: fetchResult.info, questions: fetchResult.questions, current: fetchResult.current })

        }))

    }
    getonePractice = () => {

        let slug = Router.query.slug

        HttpServices.request('getonePractice', { _id: slug }, ((fetchResult, fetchError) => {

            if (fetchError) {
                // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                console.log('quuuuiiiizzzz', fetchError)
                return
            }

            console.log('quuuuiiiizzzz', fetchResult)
            this.setState({ practice: fetchResult.info, questions: fetchResult.questions, current: fetchResult.current })

        }))

    }


    // startQuiz = () => {
    //     console.log(this.props.currentLesson)
    //     this.setState({ info: [], isLoading: true })
    //     HttpServices.request('startQuiz', { filter: { lesson: this.props.currentLesson?._id } }, (fetchResult, fetchError) => {

    //         this.setState({ isLoading: false })

    //         // console.log(fetchResult)
    //         console.log(fetchError)

    //         if (fetchError) {
    //             return
    //         }
    //         console.info('fetchResult', fetchResult)
    //         // console.info('fetchResult', fetchResult.questions)

    //         this.setState({ info: fetchResult.info ,})
    //     })
    // }



    handlelike = () => {
        this.setState({ like: !this.state.like })
    }


    startQuiz = () => {
        this.stageManager.changeStage('quiz')
        this.setState({ current: null })
    }
    
    endQuize = () => {

        this.stageManager.changeStage('endpage')
        // clearInterval(this.interval)
    }
    endQuiz = () => {
        console.log('svsdvsdbdfbfdbfdbdfb', this.props.current)

        HttpServices.request('endQuiz', { quiz: this.state?.quiz?._id }, ((fetchResult, fetchError) => {

            if (fetchError) {
                // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                return
            }

            console.log('quuuuiiiizzzz', fetchResult)

            if (!this.state.current) {

                this.setState({ current: fetchResult.info })
            }

        }))
        // clearInterval(this.interval)
        this.endQuize()

    }
    endPractice = () => {
        console.log('svsdvsdbdfbfdbfdbdfb', this.props.current)

        HttpServices.request('endPractice', { practice: this.state?.practice?._id }, ((fetchResult, fetchError) => {

            if (fetchError) {
                // this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                return
            }

            // console.log('quuuuiiiizzzz', fetchResult)
            // console.log('quuuuiiiizzzz', this.state.current)

            if (!this.state.current) {

                this.setState({ current: fetchResult.info })
            }

        }))
        // clearInterval(this.interval)
        this.endQuize()

    }
    render() {
        let courseInfo = this.state.courseInfo;
        let notifications = this.state.notifications;
        let exams = this.state.exams;
        let reviews = this.state.reviews;
        let exam = this.state.exam;
        return (
            <Configurer
                settingsInfo={{
                    headerTitle: "Course Dashboard",
                    button: { goBack: true },
                }}
                title={"Course Dashboard"}
                description={"Course Dashboard"}
                className=""
                style={{ padding: '0px 3% 0px 3%' }}
                changeOnUnmount={true}
            >


                <StagesManager ref={(el) => (this.stageManager = el)}>

                    <Startpage
                        pages={this.state.pages}
                        stage={0}
                        user={this.props.user}
                        startQuiz={this.startQuiz}
                        data={this.getQuiz}
                        // endQuiz={this.endQuiz}
                        endPractice={this.endPractice}
                        addNotif={this.addNotif}
                        stageName={"start"}
                        // quiz={this.state.quiz}
                        practice={this.state.practice}
                        questions={this.state.questions}
                        current={this.state.current}

                    />
                    <Quiz
                        pages={this.state.pages}
                        stage={3}
                        user={this.props.user}
                        // endQuiz={this.endQuiz}
                        endPractice={this.endPractice}
                        addNotif={this.addNotif}
                        stageName={"quiz"}
                        // quiz={this.state.quiz}
                        practice={this.state.practice}
                        questions={this.state.questions}
                        current={this.state.current}

                    />
                    <EndPage
                        pages={this.state.pages}
                        stage={3}
                        user={this.props.user}
                        // endQuiz={this.endQuiz}
                        endPractice={this.endPractice}
                        addNotif={this.addNotif}
                        stageName={"endpage"}
                        // quiz={this.state.quiz}
                        practice={this.state.practice}
                        questions={this.state.questions}
                        current={this.state.current}


                    />

                </StagesManager>
            </Configurer>
        );
    }
}

export default Practices;
