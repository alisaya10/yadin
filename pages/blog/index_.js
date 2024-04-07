import React from 'react';
// import './modal.css';
// import './styles/productpage.css';
import Footer from "../../components/footer"
import ReactStars from "react-rating-stars-component";
import moment from 'jalali-moment';

// import { render } from "react-dom";
// import Slider from "react-slick";
// import './styles/shop.css';
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";

class Blog extends React.Component {
    state = {
        blogs: [
            // { name: 'Smart watch', image: '/images/shop.webp', description: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/shop1.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/shop2.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart phone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
            // { name: 'Sensors', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

            // { name: 'Headphone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
            // { name: 'Sensor', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },

        ],
        products: [
            { name: 'Smart watch', image: '/images/smartwatch1.jpeg', description: '500,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/smartwatch2.jpeg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/smartwatch3.jpeg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/cellphone.png', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/sensor.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/sensor.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/smartwatch.png', description: '500,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/headphone.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/sensor1.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

        ],
        brand: [
            { name: 'Smart watch', image: '/images/dlink.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/akuvox.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/linkap-logo.png', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/xiaomi.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/yale.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

        ]
    }

    render() {
        var settings = {
            dots: true,
            autoplay: false,
            autoplaySpeed: 1900,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
        };


        var settings1 = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 700,
            slidesToShow: 5,
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
        }
        var settings2 = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 700,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 750,
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
            <div style={{ backgroundColor: '#fff' }}>
                <div className="d-flex">
                    <div className="flex-1  ">
                        <div className="flexcc flex-column w-100" style={{ position: 'sticky', top: 50 }}>
                            <div className="" style={{ maxWidth: '200px', borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '15px', }}>
                                <p style={{ fontSize: '15px', fontWeight: '500' }}>Anp blog</p>
                                <p className="mt-1" style={{ fontSize: '13px', color: 'rgb(0,0,0,0.6)' }}>Mastering me and the Market like a peaceful zen warrior.</p>
                                <button className="mt-3" style={{ borderRadius: '30px', padding: '5px 15px ', fontSize: '12px', backgroundColor: '#000', color: '#fff' }}>Follow</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 mt-5" style={{ maxWidth: '700px' ,}}>
                        <h1 style={{ fontSize: '35px', fontWeight: '500', lineHeight: '50px' }}>Why I sold 20% of Decentraland and bought these altcoins</h1>
                        <div className=" my-3 w-100 flexcb">
                            <div className="flexc">

                                <div className="flexcc">
                                    <div style={{ border: '1px solid rgb(0,0,0,0.6)', borderRadius: '50%', padding: '3px' }}>
                                        <img src="images/portrate.jpg" style={{ width: '50px', borderRadius: '60px' }} />
                                    </div>
                                </div>
                                <div className="mx-2">
                                    <div className="flexc">
                                        <p className="m-0 mb-1" style={{ fontSize: '14px', lineHeight: '15px', fontWeight: '500', color: 'rgb(0,0,0,0.8)' }}>Crypto Zen Monk</p>
                                        <button className="mx-1" style={{ borderRadius: '30px', padding: '2px 10px ', fontSize: '12px', backgroundColor: '#000', color: '#fff' }}>Follow</button>
                                    </div>
                                    <p className="ticket-date">{moment(new Date()).format("jDD jMMM , jYYYY")}</p>
                                    {/* <div className="flexc my-1" style={{ padding: '2px 0px' }}>
                                            <ReactStars
                                                count={5}
                                                value={4}
                                                edit={false}
                                                size={14}
                                                color="#89a"
                                                activeColor="#ffbf00"
                                            />
                                            <div className="px-1" style={{ fontSize: '14px', fontWeight: '600' }}>
                                                <p >4.9</p>
                                            </div>

                                        </div> */}
                                    {/* <button className="contact-prdctpg-bttn" >Contact Me</button> */}
                                </div>
                            </div>
                            <div className="flex-end ">
                                <img src={'/images/icons/twitter.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                                <img src={'/images/icons/facebook.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                                <img src={'/images/icons/instagram.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                                <img src={'/images/icons/pinterest.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                            </div>
                        </div>
                        <p style={{ fontSize: '17px', lineHeight: '32px', fontWeight: '350' }}>I honor my own words — always take some profits off the table. I also share my thought process of using TradingView and Technical Analysis to find an optimum price for the trade.</p>
                        <img className="my-3" src="images/blog1.jpeg" style={{ width: '100%' }} />
                        <p className="my-1" style={{ fontWeight: '600', fontSize: '28px' }}>My Background</p>
                        <p className="mb-5" style={{ fontSize: '17px', lineHeight: '30px', fontWeight: '350' }}>I am a long term crypto investors, for a number of years now. Decentraland (MANA) is one of my earlier holdings and I have made about 10x from this investment. I sold 20% of my holdings yesterday based on certain parameters that I have observed.</p>

                    </div>
                    <div className="flex-1"></div>
                </div>
                <div className="container flexcc flex-column">
                    <p className="mb-2" style={{ fontSize: '25px', fontWeight: '500' }}>Related article</p>
                    <div className="row m-0">
                        {this.state.blogs.map((item, index) => {
                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 ">
                                    <div className="mb-4 p-2 outline-none h-100 " >

                                        <div className="w-100 h-100 d-flex flex-column" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '4px' }} >
                                            <div className="px-1 pt-1" style={{ flex: 1 }}>
                                                <img src={'https://platform.iotsmile.com/assets/uploads/' + item.values.image?.address} style={{ borderRadius: '4px 4px 0px 0px', width: '100%', height: '170px', objectFit: 'cover' }} />
                                                {/* <p className="box1-p1 ">USE CASE</p> */}
                                                <div className="px-3  text-start flex-column  ">
                                                    <p className="mt-3 mb-2" style={{ fontSize: '16px', fontWeight: '500', maxWidth: '260px' }}>{item.values.title}</p>
                                                    {/* <p className="blogsbox-p3 mt-2">{item.cDate}</p> */}

                                                    <p style={{ fontSize: '15px', fontWeight: '300' }}>{item.values.description}</p>
                                                </div>

                                            </div>
                                            <div className="flexcb w-100 pb-3 px-3 ">
                                                <div className=" flexc  ">
                                                    <img className="mx-1" src="images/icons/clock.png" style={{ width: '13px' }} />
                                                    <p className="m-0" style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{moment(item.cDate).format("jDD jMMM , jYYYY")}</p>
                                                </div>
                                                <div className=" flexc ">
                                                    {/* <img className="mx-1" src="images/icons/clock.png"style={{width:'13px'}}/> */}
                                                    <a><p style={{ fontSize: '15px', color: 'rgba(64, 117, 190, 1)' }}>Read more</p></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                        )}


                        {this.state.blogs?.length == 0 && (
                            <div className="flexcc w-100 mb-5">
                                <p>Nothing Found</p>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}



export default Blog;