
import React from 'react';
// import '../../styles/card.css';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Collapsible from 'react-collapsible';
// import Modal from '../../components/Modal';
// import FormViewer from '../../components/FormViewer';
import Modal1 from '../../components/Modal1';
import { checkTranslation } from '../../utils/useful';

// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
// import { Map as leafletMap } from 'react-leaflet';



class Address extends React.Component {
    state = {
        blogs: [
            { name: 'Smart watch', image: '/images/shop.webp', description: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/shop1.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/shop2.webp', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            { name: 'Smart watch', image: '/images/shop.webp', description: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

            // { name: 'Smart phone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(0, 104, 255)', color2: 'rgb(0, 149, 197)' },
            // { name: 'Sensors', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 91, 91)', color2: 'rgb(220, 80, 132)' },

            // { name: 'Headphone', image: 'https://images.unsplash.com/photo-1628191081676-8f40d4ce6c44?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(255, 174, 0)', color2: 'rgb(186, 172, 0)' },
            // { name: 'Sensor', image: 'https://images.unsplash.com/photo-1632510434096-50ed4957960d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80', adress: '', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgb(28,131,16)', color2: 'rgb(108,211,96)' },

        ],
        addressOpen: {},
        address: [
            { city: 'Karaj', image: '/images/smartwatch1.jpeg', address: '52 , Shojaei ali , Mehran square , Azimiyeh', postCod: '0123456789', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            { city: 'Karaj', image: '/images/smartwatch1.jpeg', address: '52 , Shojaei ali , Mehran square , Azimiyeh', postCod: '0123456789', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { city: 'Karaj', image: '/images/smartwatch1.jpeg', address: '52 , Shojaei ali , Mehran square , Azimiyeh', postCod: '0123456789', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { city: 'Karaj', image: '/images/smartwatch1.jpeg', address: '52 , Shojaei ali , Mehran square , Azimiyeh', postCod: '0123456789', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { city: 'Karaj', image: '/images/smartwatch1.jpeg', address: '52 , Shojaei ali , Mehran square , Azimiyeh', postCod: '0123456789', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { city: 'Karaj', image: '/images/smartwatch1.jpeg', address: '52 , Shojaei ali , Mehran square , Azimiyeh', postCod: '0123456789', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },

            // { name: 'sfahan', image: '/images/smartwatch2.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { name: 'Smart watch', image: '/images/smartwatch3.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { name: 'Smart watch', image: '/images/smartwatch1.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { name: 'Smart watch', image: '/images/smartwatch3.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { name: 'Smart watch', image: '/images/smartwatch2.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { name: 'Smart watch', image: '/images/smartwatch3.jpeg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/cellphone.png', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/sensor.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/sensor.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/smartwatch.png', description: '500,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/headphone.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
            // { name: 'Smart watch', image: '/images/sensor1.jpg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

        ],
        headers: {
            // name: { type: 'TextInput', key: 'name', information: { label: "First Name", placeholder: "Name", }, },
            // family: { type: 'TextInput', key: 'family', information: { label: "Last Name", placeholder: "Family  ", }, },
            // email: { type: 'TextInput', key: 'email', information: { label: "Work Email", placeholder: "Name", }, },
            // Phone: { type: 'TextInput', key: 'Phone', information: { label: "Work Phone", placeholder: "Phone Number", }, },
            // website: { type: 'TextInput', key: 'website', information: { label: "Company Website", placeholder: "Website", }, },
            province: { type: 'SelectInput1', key: 'province', information: { label: "Province", items: [{ title: "Tehran", value: "Tehran" }, { title: "Mashhad", value: "Mashhad" }, { title: "Esfahan", value: "Esfahan" }, { title: "Alborz", value: "Alborz" }], }, },
            city: { type: 'SelectInput1', key: 'city', information: { label: "City", items: [{ title: "Tehran", value: "Tehran" }, { title: "Eslamshahr", value: "Eslamshahr" }, { title: "Pardis", value: "Pardis" }, { title: "Parand", value: "Parand" }], }, },
            area: { type: 'SelectInput1', key: 'area', information: { label: "Area", items: [{ title: "1", value: "1" }, { title: "2", value: "2" }, { title: "3", value: "3" }, { title: "4", value: "4" }], }, },
            address: { type: 'TextInput1', key: 'address', information: { label: "Address", placeholder: "Tehran" }, },
            name: { type: 'TextInput1', key: 'Recipientname', information: { label: "Recipient name", placeholder: "Maryam" }, },
            family: { type: 'TextInput1', key: 'Recipientfamily', information: { label: "Recipient family name", placeholder: "Ghasemi" }, },
            number: { type: 'TextInput1', key: 'Number', information: { label: "Number", placeholder: "09123456789" }, },

            // peyment: { type: 'SelectInput', key: 'peyment', information: { label: "Peyment Volume", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
            // other: { type: 'TextAreaInput', key: 'other', information: { label: "Description", placeholder: "Tell us more about your project, needs and timeline." }, },


        },
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
            <div>
                <div className='container-fluid p-0'>
                    <div className='w-100 flexcc flex-column py-5 position-relative' style={{ backgroundColor: '#fff' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: "100%" }}>
                            <img src="/images/stacked-waves-haikei.svg" width={"100%"} height={'100%'} />
                        </div>

                        <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                            <h1 style={{ fontWeight: '400', fontSize: 25 }}>{checkTranslation('{{lang}}just-address')}</h1>
                            <p style={{ fontWeight: '400', color: '#fff', fontSize: 17 }}>{checkTranslation('{{lang}}Shop')}</p>
                        </div>

                    </div>
                </div>
                <div className="container-fluid px-5 py-3">
                    <div className="flexc py-3" style={{ borderBottom: '1px solid rgb(0,0,0,0.1)' }}>
                        <div className="flexc">
                            {/* <img src="/images/icons/number-one.png" style={{ width: '30px' }} /> */}
                            <p className="mx-2 mt-1" style={{ fontSize: '16px', fontWeight: '400', color: '#0065FF' }}>{checkTranslation('{{lang}}Order-Details')}</p>
                        </div>
                        <img src="/images/icons/next (1).png" className='d-rotate' style={{ width: '11px', marginTop: '2px' }} />
                        <div className="flexc" style={{ marginLeft: '7px' }}>
                            {/* <img src="/images/icons/number-2 (2).png" style={{ width: '30px' }} /> */}
                            <p className="mx-2 mt-1" style={{ fontSize: '16px', fontWeight: '400', color: '#333333' }}>{checkTranslation('{{lang}}Confirm-Pay')}</p>
                        </div>
                        <img src="/images/icons/next (1).png" className='d-rotate' style={{ width: '11px', marginTop: '2px' }} />
                        <div className="flexc" style={{ marginLeft: '7px' }}>
                            {/* <img src="/images/icons/number-3.png" style={{ width: '30px' }} /> */}
                            <p className="mx-2 mt-1" style={{ fontSize: '16px', fontWeight: '400', color: '#333333' }}>{checkTranslation('{{lang}}Submit-Requirements')}</p>
                        </div>
                    </div>
                    <div className="row w-100 m-0 ">
                        <div className="col-md-8 p-0">
                            <div className="pt-3 pb-2 flexc " style={{ fontSize: '25px', color: 'rgb(0,0,0)', fontWeight: '600', justifyContent: 'space-between' }}>
                                <h>{checkTranslation('{{lang}}Choose-Your-Address')}</h>
                                <button onClick={() => this.addModal.showModal()} style={{ fontSize: '14px', fontWeight: '500', padding: '8px 15px', borderRadius: '20px' }}>{checkTranslation('{{lang}}Add-new')} +</button>
                            </div>

                            <div className='row m-0 p-0'>
                                {this.state.address.map((item, index) => {
                                    return (
                                        // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                                        <div onClick={() => this.setState({ selectedIndex: index })} className="col-xl-4 px-1 py-1 my-2" style={{ justifyContent: 'space-between', }}>
                                            <div className='p-3 ' style={{ border: '1px solid rgb(0,0,0,0.1)', borderRadius: '8px', backgroundColor: this.state.selectedIndex == index ? '#007aff20' : '#fff' }}>

                                                <div className="d-flex mx-2" >
                                                    <div className="flex-1 px-3" style={{ flex: 1 }}>
                                                        <p style={{ fontSize: '19px', fontWeight: '600', color: '#000000', }}>{item.city}</p>
                                                        <div className="flexc" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                                            <p>{item.address}</p>

                                                        </div>
                                                        <div style={{ cursor: 'pointer' }} className="w-100 d-flex " onClick={(e) => { this.setState({ addressOpen: { ...this.state.addressOpen, [index]: !this.state.addressOpen[index] } }); e.stopPropagation() }}>
                                                            <p style={{ fontSize: '15px', fontWeight: '500', color: 'rgb(77,116,185)' }}>{checkTranslation('{{lang}}hide-included-shop-addres-section')}</p>
                                                            <div className="px-1">
                                                                <img className={" " + (this.state.addressOpen[index] ? 'rotate-180' : '')} style={{ transition: 'all 0.5s', marginTop: '4px' }} src="/images/icons/arrow.png" height="10px" />
                                                            </div>
                                                        </div>

                                                        <Collapsible open={this.state.addressOpen[index]}>
                                                            <div className="py-1 ">
                                                                <p style={{ fontSize: '14px', fontWeight: '600', }}>{checkTranslation('{{lang}}Post-Code')} : <span style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>{item.postCod}</span></p>
                                                                {/* <div className="w-100 mt-3" style={{ height: 200 }}> */}
                                                                {/* <LeafletMap center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} >
                                                                <TileLayer
                                                                    attribution='©️ <a href="https://www.iotsmile.com">IoTSmile</a>'
                                                                    tileSize={512}
                                                                    url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'}
                                                                    zoomOffset={-1}
                                                                    id='mapbox/light-v10'
                                                                    accessToken='pk.eyJ1IjoicG91eWFwZXpobWFuIiwiYSI6ImNrZHZwd2JiYTBzeHgyeWtqa2xodmNrdnQifQ.W9n1rw2PX1V1PjrcBDitrA'
                                                                />
                                                                <Marker position={[51.505, -0.09]}>
                                                                    <Popup>

                                                                    </Popup>
                                                                </Marker> */}
                                                                {/* <Marker position={[51.505, -0.09]}>
                                                                <Popup>
                                                                    A pretty CSS3 popup. <br /> Easily customizable.
                                                                </Popup>
                                                            </Marker> */}
                                                                {/* </LeafletMap> */}
                                                                {/* </div> */}
                                                            </div>

                                                        </Collapsible>

                                                    </div>
                                                </div>

                                                <div className="d-flex " style={{ alignItems: 'end' }}>
                                                    {/* <div className="flexcc" style={{ width: '25px', height: '25px', backgroundColor: 'rgb(245,245,245)', borderRadius: '50px' }}>
                                            <div style={{ width: '10px', height: '10px', backgroundColor: 'rgb(0,0,0,0.7)', zIndex: '100', borderRadius: '15px' }}></div>
                                        </div> */}
                                                    <div className="">
                                                        <button onClick={(e) => { this.addModal.showModal(); e.stopPropagation() }} style={{ padding: '4px 15px', color: 'rgb(78,116,185,0.9)', backgroundColor: 'transparent', borderRight: '1px solid rgb(0,0,0,0.2' }}>{checkTranslation('{{lang}}Edit')}</button>
                                                    </div>
                                                    <div className="">
                                                        <button onClick={(e) => e.stopPropagation()} style={{ padding: '4px 15px', borderRadius: '15px', backgroundColor: 'transparent', color: 'rgb(237,81,80,0.9)', fontWeight: '500' }}>{checkTranslation('{{lang}}Delete')}</button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className="col-md-4  " style={{}}>

                            <div style={{ top: 130, position: 'sticky', border: '1px solid rgb(0,0,0,0.2)', width: '100%', padding: '20px 25px', borderRadius: '5px' }}>
                                <div className=" pb-4 " style={{ fontSize: '18px', fontWeight: '600', color: '#000', borderBottom: '1px solid rgb(0,0,0,0.1)' }} >
                                    <p>{checkTranslation('{{lang}}Price-summary')}</p>
                                    <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000aa' }}>
                                            <p >{checkTranslation('{{lang}}Subtotal')}</p>
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '400', color: 'rgb(0,0,0,0.6)' }}>
                                            <p>€91.73</p>
                                        </div>
                                    </div>
                                    <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000aa    ' }}>
                                            <p >{checkTranslation('{{lang}}Service-Fee')}</p>
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(0,0,0,0.6)' }}>
                                            <p>€2.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex pt-4" style={{ justifyContent: 'space-between' }}>
                                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#000000cc' }}>
                                        <p >{checkTranslation('{{lang}}Total')}</p>
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000cc' }}>
                                        <p>€93.73</p>
                                    </div>
                                </div>
                                <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000aa    ' }}>
                                        <p>{checkTranslation('{{lang}}Delivery-Time')}</p>
                                    </div>
                                    <div style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(0,0,0,0.6)' }}>
                                        <p>7 days</p>
                                    </div>
                                </div>
                                {/* <p className='my-3' style={{ fontSize: '15px' }}>Black and white stylized portrait + painting process GIF + source PSD file</p>
                                    <div className="flexc mb-2">
                                        <img src="/images/icons/clock.png" style={{ width: '20px' }} />
                                        <p className="m-0 mx-2" style={{ fontSize: '16px', fontWeight: '600' }}>10 Days Delivery</p>
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
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>Commercial Use</p>
                                    </div> */}
                                <div className="flexcc mt-2">
                                    <button className="Continue-bttn">{checkTranslation('{{lang}}Continue-to-Checkout')}</button>
                                </div>
                            </div>
                            {/* <div style={{ fontSize: '16px', fontWeight: '500', color: '#000000aa', paddingTop: '10px' }}>
                                    <p>Learn <a href="#" className="cursor-pointer" style={{ color: 'rgb(77,116,185)', fontWeight: '600', }}>how to use</a></p>
                                    <p>Learn <a href="#" className="cursor-pointer" style={{ color: 'rgb(77,116,185)', fontWeight: '600', }}>about use cases</a></p>
                                </div> */}

                        </div>
                    </div>
                </div>
                <Modal1 ref={el => this.addModal = el} maxWidth={600}>

                    {/* <div style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, width: "100%" }}>
                        <div style={{ borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '10px' }}>
                            <p style={{ fontSize: '25px', fontWeight: '600', color: 'rgb(0,0,0)' }}>Address</p>
                        </div>
                        <FormViewer headers={this.state.headers} theme={"modern"} />

                        <button className="modal-submite-button mt-3">Submite</button>
                    </div> */}

                    <div style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, width: "100%" }}>
                        <div style={{ borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '10px' }}>
                            <p style={{ fontSize: '25px', fontWeight: '600', color: 'rgb(0,0,0)' }}>{checkTranslation('{{lang}}just-address')}</p>
                        </div>
                        {/* <FormViewer headers={this.state.headers} theme={"modern"} /> */}
                     
                        <button className="modal-submite-button mt-3">{checkTranslation('{{lang}}Submite')}</button>
                       
                    </div>
                </Modal1>
            </div>
        )
    }
}



export default Address;