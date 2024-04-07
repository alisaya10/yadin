import React from 'react';
// import './modal.css';
// import './styles/productpage.css';
import Footer from "../../components/footer"
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import Slider from "react-slick";
// import ReactStars from 'react-rating-stars-component'

// import './styles/shop.css';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

class ProductPage extends React.Component {
    state = {
        blogs: [
            { name: 'Smart watch', image: '/images/shop.webp', description: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/shop1.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/shop2.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
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
        const firstExample = {
            size: 12,
            value: 3,
            count: 5,
            color: "#ddd",
            activeColor: "#FCB942",
            edit: false,
        };

        return (
            <div>
                <div className="container">
                    <div className="row w-100 m-0" style={{ position: 'relative' }}>
                        <div className="col-md-7">
                        <div className="flexc my-2 root-page-test" style={{ cursor:'pointer'}}>
                                        <div className="flexc root-page-test" style={{ marginLeft: '10px', fontSize: '14px', fontWeight: '400', color: '#777777' }}>
                                            <p>IOT Smile Online Shop {'>'} </p>
                                        </div>
                                        <div className="flexc" style={{ marginBottom: '2px',fontSize: '14px', fontWeight: '400', color: '#777777'  }}>
                                            <p className="px-1">digital products {'>'} </p>
                                            <p>sensor</p>
                                        </div>
                                    </div>
                            {/* <div className="flexc pt-2">
                                <p style={{ fontSize: '25px', fontWeight: '600', color: '#000' }}>I will create a logo design for modern brands</p>
                            </div> */}
                            {/* <div className="pt-3 flexc">
                                <img src="/images/portrate.jpg" style={{ width: '35px', borderRadius: '20px' }} />
                                <p className="mx-2" style={{ fontSize: '14px', fontWeight: '600' }}>bruno_malagrino</p>

                            </div> */}
                            <div className="w-100" style={{ borderRadius: '100px' }}>


                                <div className="d-flex justify-content-between w-100 mt-2" style={{ backgroundColor: 'rgb(245,245,245)' }}>
                                    <img src="/images/smartwatch1.jpeg" style={{ width: '75%' }} />
                                    <div className="d-flex flex-column justify-content-center ml-3">
                                        <img src="/images/smartwatch1.jpeg" className="tiny-img-edit-test" />
                                        <img  src="/images/smartwatch1.jpeg" className="tiny-img-edit-test"  />
                                        <img src="/images/smartwatch1.jpeg" className="tiny-img-edit-test"  />
                                        <img src="/images/smartwatch1.jpeg" className="tiny-img-edit-test"  />
                                    </div>
                                </div>
                                {/* <Slider {...settings} beforeChange={this.sliderChanged}>

                                    {this.state.products.map((item, index) => {
                                        return (
                                            <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                                            <div className="mb-4 p-2 outline-none" onMouseEnter={() => this.setState({ hoveredIndex: index })} onClick={() => this.setState({ hoveredIndex: index })}>
                                            <div>
                                                <div className="flexcc d-flex w-100 mt-2" style={{ backgroundColor: 'rgb(245,245,245)' }}>

                                                    <img src={item.image} style={{ width: '55%' }} />
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                    </div>
                                </Slider> */}
                            </div>
                            <div style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', fontSize: '15px', paddingBottom: '25px' }}>
                                <p className="mb-2 mt-4" style={{ fontSize: '20px', fontWeight: '600', color: '#000' }}>About This Gig</p>
                                <p>Hello and welcome to my gig! :)</p>
                                <p>I will create a unique portrait in any style that you will choose. I'll draw a high-quality portrait based on a photo-reference from you. Also, I can add a gif of my painting process.</p>
                                <p>From me, you also will get a fast response, a very careful and thorough approach to your wishes.</p>
                                <p>If you liked the samples of my works - feel free to contact me, and we'll start working together</p>
                            </div>
                            <div className="row w-100 pt-2 m-0">
                                <div className="col-6 p-0">
                                    <p style={{ fontSize: '16p', fontWeight: '600' }}>Illustration Type</p>
                                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Portrait</p>
                                </div>
                                <div className="col-6 p-0">
                                    <p style={{ fontSize: '16p', fontWeight: '600' }}>Illustration Type</p>
                                    <p style={{ fontSize: '14px', fontWeight: '500' }}>Portrait</p>
                                </div>
                            </div>
                            <div className="pt-5">
                                <p style={{ fontSize: '20px', fontWeight: '600', color: "#000" }}>About The Seller</p>
                                <div className="flexc mt-2">
                                    <img src="/images/portrate.jpg" style={{ width: '100px', borderRadius: '60px' }} />
                                    <div className="mx-3">
                                        <p className="m-0" style={{ fontSize: '18px', lineHeight: '15px', fontWeight: '600', color: 'rgb(0,0,0,0.9)' }}>noneyn</p>
                                        <div className="flexc my-1" style={{ padding: '2px 0px' }}>
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

                                        </div>
                                        <button className="contact-prdctpg-bttn" >Contact Me</button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ border: '1px solid rgba(0,0,0,0.2)', padding: '20px 20px', borderRadius: '5px', marginTop: '20px' }}>
                                <div className="row m-0 w-100 pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }} >
                                    <div className="col-6">
                                        <div>
                                            <p style={{ fontSize: '16px', color: '#00000090' }}>From</p>
                                            <p style={{ fontSize: '16px', fontWeight: '600' }}>Ukraine</p>
                                        </div>
                                        <div className="mt-3">
                                            <p style={{ fontSize: '16px', color: '#00000090' }}>Last delivery</p>
                                            <p style={{ fontSize: '16px', fontWeight: '600' }} >1 month</p>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="">
                                            <p style={{ fontSize: '16px', color: '#00000090' }}>LMember since</p>
                                            <p style={{ fontSize: '16px', fontWeight: '600' }} >Nov 2020</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-2" style={{ fontSize: '16px' }}>Hello! :) I'm Valerie, and I'm a freelance digital artist, who draw since childhood. Drawing it's my passion! I started intensively learning digital art in Adobe Photoshop 3 years ago. I'll be very happy to create a work that you will fall in love with! You can feel free to contact me anytime</p>
                            </div>
                        </div>
                        <div className="col-md-5" style={{}}>
                            <div style={{ top: 50, position: 'sticky' }}>
                                <div style={{ width: '100%', padding: '20px 25px', borderRadius: '5px' }}>
                                    <div className="pb-2 " style={{ fontSize: '20px', fontWeight: '600', color: '#000' }} >
                                        <p>Products</p>
                                    </div>
                                    {/* <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                                            <p >B&W portrait</p>
                                        </div>
                                        <div style={{ fontSize: '18px', fontWeight: '400', color: 'rgb(0,0,0,0.8)' }}>
                                            <p>€91.73</p>
                                        </div>
                                    </div> */}
                                    <p className='my-1' style={{ fontSize: '15px' }}>Black and white stylized portrait + painting process GIF + source PSD file</p>
                                    <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '18px', fontWeight: '400', color: 'rgb(0,0,0,0.8)' }}>
                                            <p style={{ fontSize: 32 }}>€91.73</p>
                                        </div>


                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <ReactStars {...firstExample} />
                                        <span style={{ marginLeft: 8, textDecoration: 'underLine', fontSize: 14 }}>442 reviews </span>
                                    </div>
                                    <div className="flexc mb-2">
                                        <img src="/images/icons/clock.png" style={{ width: '20px' }} />
                                        <p className="m-0 mx-2" style={{ fontSize: '16px', fontWeight: '600' }}>7 Days Delivery</p>
                                    </div>
                                    <div className="flexc">
                                        <img src="/images/icons/tick.svg" style={{ width: '15px' }} />
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>1 Figure</p>
                                    </div>
                                    <div className="flexc">
                                        <img src="/images/icons/tick.svg" style={{ width: '15px' }} />
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>Source File</p>
                                    </div>
                                    <div className="flexc">
                                        <img src="/images/icons/tick.svg" style={{ width: '15px' }} />
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>High Resolution</p>
                                    </div>
                                    <div className="flexc">
                                        <img src="/images/icons/tick.svg" style={{ width: '15px' }} />
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>Color</p>
                                    </div>
                                    <div className="flexc">
                                        <img src="/images/icons/tick.svg" style={{ width: '15px' }} />
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>Full Body</p>
                                    </div>
                                    <div className="flexc">
                                        <img src="/images/icons/tick.svg" style={{ width: '15px' }} />
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>Commercial Use</p>
                                    </div>
                                    <div className="d-flex justify-content-start">
                                        <button className="buyProduct-bttn mr-2">Buy Product</button>
                                        <button className="buyProduct-bttn">Add to Baskect</button>
                                    </div>
                                    <div className="my-3" style={{ fontSize: '16px', fontWeight: '500', color: '#000000aa', paddingTop: '10px' }}>
                                        <div className="py-3 f-border-tst d-flex justify-content-between align-items-center">
                                            <p className="for-options-product">Distpached in 5 - 7 weeks</p>
                                            <span> {'>'} </span>
                                        </div>
                                        <div className="py-3 f-border-tst d-flex justify-content-between align-items-center">
                                            <p className="for-options-product">Home delivery - $10</p>
                                            <span> {'>'} </span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default ProductPage; 