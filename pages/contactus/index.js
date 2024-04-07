// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
// import Footer from '../../Components/footer';
// import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
// import { Line, Bar } from 'react-chartjs-2';
// import './contactus.css';
import FancyCircle from '../../components/FancyCircle';
import FancySquare from '../../components/FancySquare';
import Link from 'next/link';
import { checkTranslation } from '../../utils/useful';
import FormViewer from '../../components/FormViewer';
import LoaderButton from '../../components/LoaderButton';
import Collapsible from 'react-collapsible';
import HttpServices from '../../utils/Http.services';

class ContactUs extends React.Component {
    state = {
        hoveredIndex: 0,
        list: [
            { name: '{{lang}}Developers-about-us', link: '/developers', image: '/images/icons/developers.png', description: '{{lang}}developers-description', button: '{{lang}}Visit-Developers', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: '{{lang}}Academy-about-us', link: '/academy', image: "/images/icons/academy.png", button: '{{lang}}Visit-Academy', adress: '', description: '{{lang}}academy-description', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
            { name: '{{lang}}Media-Press', link: '/blogs', image: "/images/icons/blogs.png", adress: '', button: '{{lang}}Visit-Blogs', description: '{{lang}}media-description', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

        ],
        headers: [
            { key: 'name', type: 'TextInput', col: '12', information: { label: 'نام و نام خانوادگی', placeholder: 'نام و نام خوانوادگی', required: true } },
            { key: 'orgName', type: 'TextInput', col: '12', information: { label: 'نام سازمان / شرکت', placeholder: 'نام سازمان / شرکت', required: true } },
            { key: 'position', type: 'TextInput', col: '12', information: { label: 'سمت', placeholder: 'سمت مربوطه', required: true } },
            { key: 'phone', type: 'PhoneInput', col: '12', information: { label: 'تلفن همراه', placeholder: 'تلفن همراه', required: true }, showMain: false },

        ],
        FAQ: [
            { title: 'روش ورود و استفاده از یادین ها چه جوریه؟', desc: 'روی هر یادین که کلیک کنی، میتونی اون یادین رو خریداری کنی که خودش به طور خودکار، به مسیر یادگیری تو اضافه میشه و میتونی هر وقت خواستی بری سر وقتش.' },
            { title: 'یادین چه طوری قراره آموخته های ما رو بررسی کنه؟', desc: 'بعد از هر اسنک، یه تمرین کوچولو وجود داره که یادآموزها رو مورد بررسی قرار میده. بعد از تموم کردن همه‌ی اسنک ها هم، یه آزمون نهایی وجود داره که بعد از گذروندنش، گواهی پایان دوره صادر میشه.' },
            { title: 'چه جوری میشه یک دوره رو خریداری کرد؟ هزینه ی دوره ها چقدره؟', desc: 'قیمت هر یادین، در یک مستطیل در پایین هر یادین وجود داره که وقتی روش کلیک کنید، شما رو مستقیم به صفحه پرداخت متصل میکنه و بعد از پرداخت، شما کل دوره رو توی داشبوردتون دارید.' },
            { title: 'چه جوری میتونم از کد تخفیفم استفاده کنم؟', desc: 'روی قسمت خرید هر یادینی که دوست دارید بخرید کلیک کنید؛ در کنار دکمه ی پرداخت، گزینه ی کد تخفیف وجود داره که باید کدتون رو اونجا وارد کنید و از این طریق، با توجه به کد تخفیفتون، مبلغ مشخصی از هزینه‌ی دوره کم میشه.' },
            { title: 'اگر از ادامه ی دوره منصرف شدم چی میشه؟', desc: 'هیچ ایرادی نداره! اگر شما بعد از دیدن 5 اسنک؛ از اون دوره ناراضی بودید، میتونید وارد بخش انصراف از دوره بشید، دلیلتون رو توضیح بدید و درخواستتون رو ثبت کنید. هزینه ی دوره تا 24 ساعت به حساب یادین شما برگردونده میشه.' },
            { title: 'یادین برای مرور دوره ها، چه امکاناتی داره؟', desc: 'ما برای دوره کردن، هم جزوه های مخصوص داریم و هم چارت ویژه ی مرور سریع، که یادینی هایی که یک دوره رو خریداری کرده باشند، میتونند از این امکانات برای مرور استفاده کنند.' },
            { title: 'استفاده از پلتفرم برای آموزش سازمانی به چه صورته؟', desc: 'سازمان ها میتونند در صورت تمایل، با یادین قرارداد سازمانی داشته باشند و از امکانات آموزشی ما بهره‌مند بشند. خود سازمان ها هم، این امکان رو دارند که دوره های آموزشی خودشون رو ضبط کنند و در پلتفرم ما، برای کارمندای خودشون قرار بدهند.' },
            { title: 'امکان ضبط دوره به صورت سفارشی هم برای سازمان ها وجود داره؟', desc: 'بله! اگر خواستید از دوره های جدیدی برای سازمان خودتون استفاده کنید، یا اینکه خواستید به‌طور هم‌زمان از محتوای ما و محتوایی که به طور سفارشی برای خودتون ساخته شده استفاده کنید، با ما تماس بگیرید تا ما شرایط ضبط دوره ها رو توضیح بدیم.' },
            { title: 'اساتید چه‌طور می‌تونند با یادین همکاری داشته باشند؟', desc: 'اگر شما دانشی دارید که فکر می‌کنید برای ما مفیده، رزومه‌تون رو برای ما ایمیل کنید. در صورت امکان، خوشحال میشیم باهاتون همکاری داشته باشیم!' },
            { title: 'نحوه برقراری ارتباط با استاد چه جوریه؟ توی یادین میشه با استادها در تماس بود؟', desc: 'بله! پلتفرم یادین به شما امکان ارتباط مستقیم با استاد رو میده؛ اما از شما میخوایم که در زمان پاسخگویی، لطفا صبور باشید!' },
            { title: 'هر دوره‌ی یادین، به‌طور متوسط، چه‌قدر زمان می‌بره؟', desc: 'نحوه‌ی آموزش توی یادین، میکرولرنینگه و مطالب، به‌صورت فشرده ارائه میشن. متوسط زمان دوره‌ها 1 ساعت و 20 دقیقه‌ست و زمان دوره‌ها از 50 دقیقه شروع میشه و تا 1ساعت و 40 هم میرسه.' },
            { title: 'چه جوری میتونم توی یادین ثبت نام کنم؟', desc: 'کاری نداره! کافیه شماره موبایل و ایمیلتو وارد کنی، کد ورود برات پیامک میشه و بعد از اون، عضوی از خانواده‌ی یادین میشی!' },
        ],
        open: {}

    }


    data = {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                label: '#',
                data: [2, 5, 8, 70, 30, 50],
                fill: false,
                backgroundColor: '#5B1AC5',
                borderColor: '#5B1AC5',
            },
        ],
    };

    // showDetail = () => {
    //     this.setState({ videocontent: !this.state.videocontent })

    // }
    handelCollape = (index) => {
        let open = this.state.open
        this.setState({ index })
        console.log('---------------', open);
        console.log('---------------', this.state.index);
        if (this.state.index == index && open[index] == true) {

            open[index] = false
            this.setState({ open })

        } else {

            open = {}
            open[index] = true
            this.setState({ open })
        }
    }
    submitComplains = () => {
        let data = {}
        let form = this.form.getForm()
        if (form) {
            this.setState({ isLoading: true })

            data.page = 'complains'
            data.values = form


            HttpServices.request('postContent', data, (fetchResult, fetchError) => {


                if (fetchError) {

                    return
                }
                if (fetchResult) {

                    this.setState({ isLoading: false })
                    this.setState({ success: true }, () => {
                        this.setState({ initData: {} })
                        setTimeout(() => {
                            this.setState({ success: false })
                        }, 5000);
                    })

                }




            })


        }
        //   for (let i = 0; i < this.state.question.length; i++) {
        //     const question = this.state.question[i];
        // survey = `${question.title}` +`${new}`+ '/n'

        //   }
    }
    options = {
        plugins: {
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
        },
        bezierCurve: true,
        responsive: true,
        elements: {
            line: {
                tension: 0.4
            }
        },

        scales: {

            yAxes: [
                {

                    ticks: {
                        beginAtZero: true,
                    },

                },

            ],
            xAxes: [{

                gridLines: {
                    display: false
                },

            }]
        },
    };




    render() {
        var settings = {
            dots: true,
            autoplay: false,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 770,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div className='container'>
                <div className="flexcc">
                    <div className="box-1 p-4 my-5" style={{ maxWidth: 900 }}>
                        <div className="pb-2">
                            <p className="text-semibig white font-bold text-center">
                                ارتباط با ما
                            </p>
                        </div>
                        <div className="pt-4 pb-3">
                            <p className="text-semibig white weight-400 text-start">
                                فردی
                            </p>
                        </div>
                        <div style={{ lineHeight: 3 }}>

                            <p className="textt-color-2 text-small">
                                یادآموز گرامی سلام! از اینکه با ما همراه شدی خیلی خوشحالیم!
                            </p>
                            <p className="textt-color-2 text-small">
                                اگر سوالی داری، اول توی بخش سوالات متداول دنبالش بگرد و اگر پیداش
                                نکردی، از ما سوال کن؛ ما از اینکه بتونیم کمکت کنیم خیلی خوشحال میشیم!
                            </p>



                            <p className="text-color-1 text-small">
                                یا در صورت فوریت بالا، لطفا با شماره ی زیر تماس بگیرید.
                            </p>
                            <p className="textt-color-2 text-small">
                                آدرس ما: تهران، خیابان آزادی، بلوار اکبری، خیابان قاسمی شرقی، پلاک ۷۹
                            </p>
                            <p className="textt-color-2 text-small">
                                شماره تلفن ما: 09203612749
                            </p>
                            <p className="textt-color-2 text-small">
                                ایمیل ما: yaadin.info@gmail.com
                            </p>


                            <div className="pt-4 pb-3">
                                <p className="text-semibig white weight-400 text-start">
                                    سازمانی
                                </p>
                            </div>

                            <p className="textt-color-2 text-small">
                                اگر که میخواید با پلتفرم ما آشنا بشید و ببینید که با اهداف و معیارهای سازمان
                                شما همخونی داره یا نه و دوست دارید با ما در این زمینه ارتباط برقرار کنید،
                                لطفا فرم زیر رو پر کنید تا به زودی با شما تماس بگیریم.
                            </p>

                            <div className="box px-3 mt-5 pb-3 " style={{ maxWidth: "400px" }}>

                                <div className="pt-3 ">
                                    <FormViewer ref={el => this.form = el} headers={this.state.headers} theme={"modern"} inputClass={"modern-input"} />
                                </div>
                                <div className='flexcc'>
                                    <div className="text-center col-6 w-100 ">
                                        <LoaderButton
                                            onClick={this.submitComplains}
                                            isLoading={this.state.isLoading}
                                            text={"ثبت درخواست "}
                                            type={"Oval"}
                                            className="mt-4 mb-4"
                                            buttonClassName="btn-primary2"
                                            buttonStyle={{ outline: 'none', maxWidth: 200 }}
                                            width={40}
                                            height={40}
                                            color={'#C97EF5'}
                                        />
                                    </div>
                                </div>
                                {this.state.success == true && (

                                    <div className="text-semibig white weight-400 text-center pt-2">
                                        <p>درخواست شما با موفقیت ثبت شد</p>
                                    </div>
                                )}

                            </div>

                            <div className="pt-4 pb-3">
                                <p className="text-semibig white weight-400 text-center">
                                    سوالات متداول
                                </p>
                            </div>
                            {/* <p className="textt-color-2 text-small">
                                روش ورود و استفاده از یادین ها چه جوریه؟
                            </p>
                            <p className="text-color-2 text-small">
                                روی هر یادین که کلیک کنی، میتونی اون یادین رو خریداری کنی که خودش به طور خودکار، به مسیر یادگیری تو اضافه میشه و میتونی هر وقت خواستی بری سر وقتش.
                            </p>
                            <p className="textt-color-2 text-small">
                                یادین چه طوری قراره آموخته های ما رو بررسی کنه؟
                            </p>
                            <p className="text-color-2 text-small">
                                بعد از هر اسنک، یه تمرین کوچولو وجود داره که یادآموزها رو مورد بررسی قرار میده.
                                بعد از تموم کردن همه‌ی اسنک ها هم، یه آزمون نهایی وجود داره که بعد از گذروندنش،
                                گواهی پایان دوره صادر میشه.
                            </p>
                            <p className="textt-color-2 text-small">
                                چه جوری میشه یک دوره رو خریداری کرد؟ هزینه ی دوره ها چقدره؟
                            </p>
                            <p className="text-color-2 text-small">
                                قیمت هر یادین، در یک مستطیل در پایین هر یادین وجود داره که وقتی روش کلیک کنید،
                                شما رو مستقیم به صفحه پرداخت متصل میکنه و بعد از پرداخت، شما کل دوره رو توی
                                داشبوردتون دارید.
                            </p>
                            <p className="textt-color-2 text-small">
                                چه جوری میتونم از کد تخفیفم استفاده کنم؟
                            </p>
                            <p className="text-color-2 text-small">
                                روی قسمت خرید هر یادینی که دوست دارید بخرید کلیک کنید؛ در کنار دکمه ی پرداخت،
                                گزینه ی کد تخفیف وجود داره که باید کدتون رو اونجا وارد کنید و از این طریق، با توجه
                                به کد تخفیفتون، مبلغ مشخصی از هزینه‌ی دوره کم میشه.
                            </p>
                            <p className="textt-color-2 text-small">
                                اگر از ادامه ی دوره منصرف شدم چی میشه؟
                            </p>
                            <p className="text-color-2 text-small">
                                هیچ ایرادی نداره! اگر شما بعد از دیدن 5 اسنک؛ از اون دوره ناراضی بودید، میتونید
                                وارد بخش انصراف از دوره بشید، دلیلتون رو توضیح بدید و درخواستتون رو ثبت کنید.
                                هزینه ی دوره تا 24 ساعت به حساب یادین شما برگردونده میشه.
                            </p>
                            <p className="textt-color-2 text-small">
                                یادین برای مرور دوره ها، چه امکاناتی داره؟
                            </p>
                            <p className="text-color-2 text-small">
                                ما برای دوره کردن، هم جزوه های مخصوص داریم و هم چارت ویژه ی مرور سریع، که
                                یادینی هایی که یک دوره رو خریداری کرده باشند، میتونند از این امکانات برای مرور
                                استفاده کنند.
                            </p>
                            <p className="textt-color-2 text-small">
                                استفاده از پلتفرم برای آموزش سازمانی به چه صورته؟
                            </p>
                            <p className="text-color-2 text-small">
                                سازمان ها میتونند در صورت تمایل، با یادین قرارداد سازمانی داشته باشند و از امکانات
                                آموزشی ما بهره‌مند بشند. خود سازمان ها هم، این امکان رو دارند که دوره های آموزشی
                                خودشون رو ضبط کنند و در پلتفرم ما، برای کارمندای خودشون قرار بدهند.
                            </p>
                            <p className="textt-color-2 text-small">
                                امکان ضبط دوره به صورت سفارشی هم برای سازمان ها وجود داره؟
                            </p>
                            <p className="text-color-2 text-small">
                                بله! اگر خواستید از دوره های جدیدی برای سازمان خودتون استفاده کنید، یا اینکه خواستید
                                به‌طور هم‌زمان از محتوای ما و محتوایی که به طور سفارشی برای خودتون ساخته شده
                                استفاده کنید، با ما تماس بگیرید تا ما شرایط ضبط دوره ها رو توضیح بدیم.
                            </p>
                            <p className="textt-color-2 text-small">
                                اساتید چه‌طور می‌تونند با یادین همکاری داشته باشند؟
                            </p>
                            <p className="text-color-2 text-small">
                                اگر شما دانشی دارید که فکر می‌کنید برای ما مفیده، رزومه‌تون رو برای ما ایمیل کنید.
                                در صورت امکان، خوشحال میشیم باهاتون همکاری داشته باشیم!
                            </p>
                            <p className="textt-color-2 text-small">
                                نحوه برقراری ارتباط با استاد چه جوریه؟ توی یادین میشه با استادها در تماس بود؟
                            </p>
                            <p className="text-color-2 text-small">
                                بله! پلتفرم یادین به شما امکان ارتباط مستقیم با استاد رو میده؛ اما از شما میخوایم که در
                                زمان پاسخگویی، لطفا صبور باشید!
                            </p>
                            <p className="textt-color-2 text-small">
                                هر دوره‌ی یادین، به‌طور متوسط، چه‌قدر زمان می‌بره؟
                            </p>
                            <p className="text-color-2 text-small">
                                نحوه‌ی آموزش توی یادین، میکرولرنینگه و مطالب، به‌صورت فشرده ارائه میشن. متوسط
                                زمان دوره‌ها 1 ساعت و 20 دقیقه‌ست و زمان دوره‌ها از 50 دقیقه شروع میشه و تا
                                1ساعت و 40 هم میرسه.
                            </p>
                            <p className="textt-color-2 text-small">
                                چه جوری میتونم توی یادین ثبت نام کنم؟
                            </p>
                            <p className="text-color-2 text-small">
                                کاری نداره! کافیه شماره موبایل و ایمیلتو وارد کنی، کد ورود برات پیامک میشه و بعد از
                                اون، عضوی از خانواده‌ی یادین میشی!
                            </p> */}
                            <div>
                                {this.state.FAQ.map((faq, index) => {
                                    return (
                                        <>
                                            <div className="py-2" onClick={() => this.handelCollape(index)}>

                                                <p className="textt-color-2 text-small">
                                                    {faq.title}
                                                </p>
                                            </div>
                                            <Collapsible open={this.state.open[index]}>
                                                <p className="text-color-2 text-small">
                                                    {faq.desc}
                                                </p>
                                            </Collapsible>
                                        </>

                                    )
                                })}
                            </div>


                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ContactUs;
