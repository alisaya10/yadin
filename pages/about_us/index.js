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

class ContactUs extends React.Component {
    state = {
        hoveredIndex: 0,
        list: [
            { name: '{{lang}}Developers-about-us', link: '/developers', image: '/images/icons/developers.png', description: '{{lang}}developers-description', button: '{{lang}}Visit-Developers', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: '{{lang}}Academy-about-us', link: '/academy', image: "/images/icons/academy.png", button: '{{lang}}Visit-Academy', adress: '', description: '{{lang}}academy-description', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
            { name: '{{lang}}Media-Press', link: '/blogs', image: "/images/icons/blogs.png", adress: '', button: '{{lang}}Visit-Blogs', description: '{{lang}}media-description', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

        ]
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
                            <p className="text-semibig white font-bold text-center">درباره ما</p>
                        </div>
                        <div className="pt-4 pb-3">
                            <p className="text-semibig white weight-400 text-start">سلام یادآموز عزیز! به یادین خوش آمدید!</p>
                        </div>
                        <div style={{ lineHeight: 3 }}>

                            <p className="textt-color-2 text-small">
                                1. یادین، هم آموزِ دوست داشتنی!
                            </p>
                            <p className="text-color-2 text-small">
                                یادین یک پتلفرم آموزشی هست که جامعه ی هدفش سازمانها هستند. سازمانهایی که برای رشد و توسعه ی سرمایه
                                های انسانی شون، اهمیت قائلن و به دنبال یک دستیار آموزشی مجازی همه فن حریف هستن. یادین آموزش رو یک
                                فرآیند مهندسی شده میدونه و نه یک رویداد هیجانی.
                            </p>


                            <p className="textt-color-2 text-small">
                                2. یادین، طرفدار کم گویی و گزیده گویی!
                            </p>
                            <p className="text-color-2 text-small">
                                A- آموزش ها و مهارت های نرم محیط کار که پنهان هستن اما از نبودنش همه رنج میبرن مثل مهارت های ارتباطی
                                و یا تصمیم گیری و...
                            </p>
                            <p className="text-color-2 text-small">
                                B- مهارت های تخصصی که در واقع با توجه به تک تک مشاغل متفاوته.
                            </p>
                            <p className="text-color-2 text-small">
                                ما همه آموزش ها رو به صورت میکرولرنینگ و مبتنی بر مسئله محوری در قالب دوره های ویدیویی در پلتفرممون
                                قرار میدیم. یادین از امکانات آموزشی متفاوتی بهره میبره تا دوره ها هم جذاب باشن(مبتنی بر داستان و تجربه،
                                ویدیوهای آرشیوی)
                                و هم مانا در ذهن (مرور مطالب در بازه های مختلف زمانی در فرمت ها متفاوت)
                                یادین امکان طراحی مسیر یادگیری برای بخش های مختلف سازمان و همچنین مانیتورنیگ گسترده رو توسط سازمان
                                فراهم میکنه.
                            </p>



                            <p className="textt-color-2 text-small">
                                3. جام جمِ آموزش، در گوشی و کامپیوتر شما!
                            </p>
                            <p className="text-color-2 text-small">
                                ما میتونیم به سازمان شما برای برنامه‌ریزی بهتر آموزشی، کمک بکنیم. علاوه بر این، پلتفرم ما پذیرای بارگذاری ویدیوهای
                                اختصاصی شما برای اعضای خودتون هست. این خدمت، امکان مانیتورنیگ پیشرفته جهت نظارت بر روند آموزشی اعضاء سازمان
                                رو مهیا می کنه.
                            </p>
                            <p className="text-color-2 text-small">
                                ضمنا ما در ساخت ویدیوهای مدنظر شما، هم از جهت طراحی محتوا و هم جهت از تولید، پایه هستیم.
                            </p>
                            <p className="text-color-2 text-small">
                                در حال حاضر، این پلتفرم در مسیر تولیدات جدید و توسعه خودشه. امید داریم که شما هم خوشتون بیاد. ما مشتاقانه منتظر پیشنهادات
                                و بازخوردهای شما هستیم.
                            </p>

                            <div className="pt-4 pb-3">
                                <p className="text-semibig white weight-400 text-start">
                                    رویای ما:
                                </p>
                            </div>
                            <p className="textt-color-2 text-small">
                                رویای یادین رسیدن به چنین روزی هست:
                            </p>
                            <p className="text-color-2 text-small">
                                الف. هر کسی مسیر آموزشی مختص به خودش رو داره، نه اینکه همه در حال دیدن آموزش هایی باشن که نمی دونن چرا الان دارن
                                اونها رو یاد میگیرن و کی قراره به کارشون بیاد.
                            </p>
                            <p className="text-color-2 text-small">
                                ب. هر کسی هر جا و هر زمان که نیاز داشت براحتی بتونه به برنامه ی آموزشی و توسعه ای خودش دسترسی پیدا بکنه و مکان و
                                زمان شرط دریافت آموزش خوب نباشه.
                            </p>
                            <p className="text-color-2 text-small">
                                ج. آموزش دیدن به جذابیت دیدن فیلم های مورد علاقه آدمها باشه.
                            </p>
                            <p className="text-color-2 text-small">
                                د. آموزش دیدن و توسعه، چیزی شبیه به غذاخوردن باشه. چیزی که هیچ موقع فرامو‌ش نمیشه.
                            </p>
                            <p className="text-color-2 text-small">
                                و. سرکار هر آدمی شبیه به یک دانشگاه باشه که علاوه بر حقوق، شخص داره مسیر توسعه ی و یادگیری و ارتقاء خودش رو دنبال
                                میکنه.
                            </p>



                            <div className="pt-4 pb-3">
                                <p className="text-semibig white weight-400 text-center">
                                    خلاصه:
                                </p>
                            </div>
                            <p className="textt-color-2 text-small text-center">
                                یادین یه چشمه ی لذتبخش آموزشی، مختص به تک تک آدمها بشه، نه سیل خروشان آموزشها.
                            </p>
                            <div className="pt-4 pb-3">
                                <p className="text-semibig white weight-400 text-center">
                                    پیام مدیرعامل
                                </p>
                            </div>
                            <p className="textt-color-2 text-small ">
                                ما ادعا نمیکنیم که بی نقص هستیم، اما می تونیم قول بدیم که نقص های خودمون رو خیلی سریع رفع میکنیم.
                            </p>
                            <p className="textt-color-2 text-small">
                                یادین تعهدش با خودش، بهبود مستمر خدماتش هست، طوری که دو هفته ی شبیه به هم بدون ارتقاء خدمات، برای ما یک شکست
                                محسوب میشه.
                            </p>
                            <p className="text-color-2 text-small">
                                امیدوارم که همسفرهای خوبی برای هم باشیم؛
                            </p>
                            <p className="text-color-2 text-small">
                                شما با پیشنهاداتتون و ما با خدمت رسانی بهتر به شما.
                            </p>
                            <p className="text-color-2 text-small text-center">
                                مهدی مهدی پور
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs;
