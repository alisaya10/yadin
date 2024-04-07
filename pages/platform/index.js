// import logo from './logo.svg';
// import './Usecase.scss';
import React from 'react';
import Footer from '../../components/footer';
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import { Line, Bar } from 'react-chartjs-2';
// import './platform.css';
import FormViewer from '../../components/FormViewer-new';
import Link from 'next/link';
import { checkTranslation } from '../../utils/useful';

class Platform extends React.Component {
    state = {
        hoveredIndex: 0,

        headers: {
            name: { type: 'TextInput1', key: 'name', information: { label: "First Name", placeholder: "Name", }, },
            family: { type: 'TextInput1', key: 'family', information: { label: "Last Name", placeholder: "Family  ", }, },
            email: { type: 'TextInput1', key: 'email', information: { label: "Work Email", placeholder: "ANP@google.com", }, },
            // Phone: { type: 'TextInput1', key: 'Phone', information: { label: "Work Phone", placeholder: "Phone Number", }, },
            website: { type: 'TextInput1', key: 'website', information: { label: "Company Website", placeholder: "Website", }, },
            // size: { type: 'SelectInput1', key: 'size', information: { label: "Company size", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
            country: { type: 'SelectInput1', key: 'country', information: { label: "Country", items: [{ title: "USA", value: "maryam" }, { title: "Iran", value: "pouya" }, { title: "United Kingdom", value: "pedram" }, { title: "Togo+", value: "pedram" }], }, },
            Employees: { type: 'SelectInput1', key: 'country', information: { label: "Number of empeloyees", items: [{ title: "USA", value: "maryam" }, { title: "Iran", value: "pouya" }, { title: "United Kingdom", value: "pedram" }, { title: "Togo+", value: "pedram" }], }, },
            revenue: { type: 'SelectInput1', key: 'peyment', information: { label: "Annual revenue", items: [{ title: "less than $500", value: "maryam" }, { title: "$500 to $1000", value: "pouya" }, { title: "$1000 to $10000", value: "pedram" }, { title: "$10000+", value: "pedram" }], }, },

            cardSpend: { type: 'SelectInput1', key: 'peyment', information: { label: "Monthly card spend", items: [{ title: "1-99", value: "maryam" }, { title: "1-100", value: "pouya" }, { title: "100-500", value: "pedram" }, { title: "500+", value: "pedram" }], }, },
            other: { type: 'TextAreaInput1', key: 'other', information: { label: "Accounting or expensing software", placeholder: "Tell us more about your project, needs and timeline." }, },

        }

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

        return (
            <div className=" " style={{ backgroundColor: 'rgb(255,255,255)' }} >
                <div style={{ backgroundColor: 'rgb(247,249,252)' }}>
                    <div className="">
                        <div className="row w-100 flexcc">
                            <div className=" flexcc flex-column text-center  platform-responsive-persian">
                                <h1 className="platform-hero-header mb-2" style={{ maxWidth: 700 }}>{checkTranslation('{{lang}}title-platform-page')}</h1>
                                <p className="mb-2" style={{ fontSize: "20px", fontWeight: "300", maxWidth: 700 }}>{checkTranslation('{{lang}}desc-platform-page')}</p>
                                <div className="flexcc w-100 pt-3">
                                    <div className="p-1">
                                        <Link href={'https://platform.iotsmile.com'}>
                                            <a className="platform-hero-button1">{checkTranslation('{{lang}}bottom-title-platform-page')}</a>
                                        </Link>
                                    </div>
                                    {/* <div className="p-1"><button className="platform-hero-button2">REQUEST INVITE</button></div> */}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='w-100 flexcc'>
                        <img src="/images/Group 321.png" width="100%" />
                    </div>
                </div>
                <div className="p-4 container">
                    <div className="flexcc flex-column text-center">
                        <p className="platform-desc1 pb-2 mt-3">{checkTranslation('{{lang}}main-text-platform-page')}</p>
                        <p className="platform-desc2">{checkTranslation('{{lang}}main-desc-platform-page')}</p>
                    </div>
                    <div className='mt-5 mb-5 flexcc' style={{ minHeight: '100px', width: "100%" }}>
                        <img src='/assets/Platform.png' style={{ width: "100%", objectFit: "contain", maxWidth: 800 }} />
                    </div>
                </div>
                <div className="container pb-4">
                    <div className="row w-100 ">
                        <div className="col-12 col-md-4  py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/cloud-storage (1).png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-1')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-1')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/cloud-storage.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-2')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-2')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 py-3 flexcc">
                            <div className="platformbox1">
                                <img src="/images/webcam.png" height={50} />
                                <p className="platform-desc3 mb-2 mt-3">{checkTranslation('{{lang}}card-box-title-platform-page-3')}</p>
                                <p className="platform-desc4">{checkTranslation('{{lang}}card-box-desc-platform-page-3')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="platform-chatbg">
                    <div className="container">
                        <div className="row w-100">
                            {/* <div className="col-12 col-md-5  ">
                                <p className="p-1 platform-chatname">{checkTranslation('{{lang}}chat-user-name-platform-page')}</p>
                                <div className="platform-chatbox1">
                                    <p>{checkTranslation('{{lang}}chat-question-platform-page')}</p>
                                </div>

                                <div className=" d-flex flex-column align-items-end">
                                    <p className="p-1 platform-chatname">IoTSmile {checkTranslation('{{lang}}Team')}</p>
                                    <div className="platform-chatbox2 mt-1">
                                        <p>{checkTranslation('{{lang}}iotsmile-team-question')}</p>
                                    </div>
                                </div>
                                <p className="p-1 platform-chatname">{checkTranslation('{{lang}}chat-user-name-platform-page')}</p>
                                <div className="platform-chatbox1">
                                    <p>{checkTranslation('{{lang}}chat-user-answer')}</p>
                                </div>
                            </div> */}
                            <div className='col-12 col-md-5 cursor-pointer'>
                                <Link href={'/request_service'}>
                                    <img
                                        src='/images/form3.png'
                                        style={{ width: '100%' }}
                                    />
                                </Link >
                                <div className='flexcc'>
                                    <Link href={'/request_service'}>
                                        <button className=" contactsales-button">{checkTranslation('{{lang}}Submit-Request')}</button>
                                    </Link>
                                </div>

                            </div>
                            <div className="co-12 col-md-7 flexcc flex-column">
                                <div className="platform-chatdesc">
                                    <div className=''>
                                        <img src='/images/support.png' height={50} />
                                        <p className="platform-chatdesc1 py-2 ">{checkTranslation('{{lang}}Support')}</p>
                                    </div>
                                    <p className="platform-chatdesc2">{checkTranslation('{{lang}}support-section-desc-platform-page')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pb-5">
                    <div className="flexcc flex-column text-center pt-5 pb-4">
                        <p className="platform-box1-header py-2">{checkTranslation('{{lang}}featured-sec-title-platform-page')}</p>
                        <p className="platform-box1-desc1">{checkTranslation('{{lang}}featured-sec-desc-platform-page')}</p>
                    </div>
                    <div className="row w-100 m-0">


                        <div className="col-md-12 col-sm-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconcolor2 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/automation.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Add Device')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Add Device-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12 col-sm-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconcolor1 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/history.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Create Applet')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Create Applet-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12 col-sm-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconcolor1 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/history.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Workflow')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Workflow-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <div className="col-md-12 col-sm-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100 " >
                                <div className="platform-box2-iconbox platform-box2-iconcolor1 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/speedometer.png" />
                                </div>
                                <div>
                                    <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                        <div>
                                            <p className="platform-box2-header">{checkTranslation('{{lang}}Dashboard')}</p>
                                            <p className="platform-box2-desc">{checkTranslation('{{lang}}dashboard-desc-platform-page')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconboxcolor3 flexcc ">
                                    <img className="platform-box2-icons " src="/images/icons/explore.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Explore')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Explore-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconcolor1 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/history.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Data-History')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Data-History-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        
                        <div className="col-md-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconcolor1 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/history.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Notification')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Notification-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 p-4">
                            <div className="platform-box2 flexcc h-100" >
                                <div className="platform-box2-iconbox platform-box2-iconcolor1 flexcc ">
                                    <img className="platform-box2-icons" src="/images/icons/history.png" />
                                </div>
                                <div className="px-4 py-3 platform-box2-descbox flexcc ">
                                    <div>
                                        <p className="platform-box2-header">{checkTranslation('{{lang}}Coins')}</p>
                                        <p className="platform-box2-desc">{checkTranslation('{{lang}}Coins-desc-platform-page')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="platform-box3-bg">
                    <div className="container">
                        <div className="row w-100">
                            <div className="col-12 col-md-12 col-lg-6 py-5">
                                {/* <img className="mb-3" src="/images/icons/moonlight.svg" /> */}
                                <p className='text-big mb-2 text-bold'>{checkTranslation('{{lang}}under-card-platform-page-title')}</p>
                                <p className="platform-box3-desc1 mt-3 mb-4">{checkTranslation('{{lang}}under-card-platform-page-desc')}</p>
                                {/* <p className="mt-3 platform-box3-desc2">PHILIP THOMAS</p> */}
                                <div className='mt-3'>
                                    <Link href={"/partners"}>
                                        <a className="box2-button2" style={{}}>{checkTranslation('{{lang}}learn-more')}</a>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 col-md-12 col-lg-6 py-5">
                                {/* <img className="mb-3" src="/images/icons/moonlight.svg" /> */}
                                <p className='text-big mb-2 text-bold'>{checkTranslation('{{lang}}under-card-platform-page-title-sec')}</p>
                                <p className="platform-box3-desc1 mt-3 mb-4">{checkTranslation('{{lang}}under-card-platform-page-desc-sec')}</p>
                                {/* <p className="mt-3 platform-box3-desc2">PHILIP THOMAS</p> */}
                                <div className='mt-3'>
                                    <Link href={"/request_service"}>
                                        <a className="box2-button2" style={{}}>{checkTranslation('{{lang}}Submit-Request')}</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {/* <div className="flexcc flex-column py-4">
                        <p className="platform-formdesc mb-4">REQUEST AN INVITATION</p>
                        <div className="platform-formbox py-4 px-3  w-100">
                    
                            <FormViewer headers={this.state.headers} theme={"modern"} />
                        </div>
                    </div> */}
                    <div className="row w-100 py-4">
                        <div className="col-12 col-md-12 col-lg-6 col-sm-12 py-3">
                            <div className="platform-box4 p-3 flexcc ">
                                <div className="p-4">
                                    <img src="/images/icons/academy.png" className="platform-box4-icon" />
                                </div>
                                <div className="m-4">
                                    <a href="#" className="platform-box4-a">{checkTranslation('{{lang}}Academy')}</a>
                                    <p className="platform-box4-desc mt-2">{checkTranslation('{{lang}}academy-platform-page-desc')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-6 col-sm-12 py-3">
                            <div className="platform-box4 p-3 flexcc ">
                                <div className="p-4">
                                    <img src="/images/icons/developers.png" className="platform-box4-icon" />
                                </div>
                                <div className="m-4">
                                    <a href="#" className="platform-box4-a">{checkTranslation('{{lang}}Developers')}</a>
                                    <p className="platform-box4-desc mt-2">{checkTranslation('{{lang}}developers-platform-page-desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Platform;
