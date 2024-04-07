
import React from 'react';
// import '../../styles/card.css';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import Collapsible from 'react-collapsible';
// import Modal from '../../components/Modal';
import FormViewer from '../../../components/FormViewer';
import Modal1 from '../../../components/Modal1';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actionsList';
import { checkTranslation, getToken, imageAddress, priceStandardView } from '../../../utils/useful';
import Link from 'next/link';
import ShippingProduct from '../../../components/ShippingProduct';
import Configurer from '../../../components/Configurer';
import PageStatusViewer from '../../../components/PageStatusViewer';
import HttpServices from '../../../utils/Http.services';
import Loader from 'react-loader-spinner';
import Router from 'next/router';
// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
// import { Map as leafletMap } from 'react-leaflet';



class Address extends React.Component {
    state = {
        addAddress: false,

        addressOpen: {},

        headers: [
            // name: { type: 'TextInput', key: 'name', information: { label: "First Name", placeholder: "Name", }, },
            // family: { type: 'TextInput', key: 'family', information: { label: "Last Name", placeholder: "Family  ", }, },
            // email: { type: 'TextInput', key: 'email', information: { label: "Work Email", placeholder: "Name", }, },
            // Phone: { type: 'TextInput', key: 'Phone', information: { label: "Work Phone", placeholder: "Phone Number", }, },
            // website: { type: 'TextInput', key: 'website', information: { label: "Company Website", placeholder: "Website", }, },
            { type: 'TextInput', key: 'province', information: { label: "{{lang}}Province", placeholder: '{{lang}}Province', required: true }, },
            { type: 'TextInput', key: 'city', information: { label: "City", placeholder: '{{lang}}City', required: true }, },
            { type: 'TextInput', key: 'address', information: { label: "Address", placeholder: "Address", required: true, } },
            { type: 'TextInput', key: 'zipCode', information: { label: "Zip Code", placeholder: "Zip Code", required: true, } },

            { type: 'MapLeafletInput', key: 'location', information: { label: '{{lang}}location', placeholder: '{{lang}}location', required: true, disabled: false }, showMain: false },

            { type: 'TextInput', key: 'recipient.name', information: { label: "Recipient name", placeholder: "Name", required: true, }, },
            { type: 'TextInput', key: 'recipient.family', information: { label: "Recipient family", placeholder: "Family", required: true, }, },
            { type: 'TextInput', key: 'recipient.phone', information: { label: "Recipient phone", placeholder: "phone", required: true, }, },

            // peyment: { type: 'SelectInput', key: 'peyment', information: { label: "Peyment Volume", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
            // other: { type: 'TextAreaInput', key: 'other', information: { label: "Description", placeholder: "Tell us more about your project, needs and timeline." }, },


        ],
        // brand: [
        //     { name: 'Smart watch', image: '/images/dlink.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
        //     { name: 'Smart watch', image: '/images/akuvox.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
        //     { name: 'Smart watch', image: '/images/linkap-logo.png', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
        //     { name: 'Smart watch', image: '/images/xiaomi.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
        //     { name: 'Smart watch', image: '/images/yale.jpeg', description: 'It enables device connectivity via industry standard IoT protocols', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },

        // ],
        fullColor: false,
    }



    componentDidMount() {



        let token = getToken()
        if (token) {
            this.setState({ isLoading: true })
            this.waitForId(10)
        } else {
            this.setState({ pageStatus: 401 })
        }


    }





    waitForId = (leftAttempt) => {
        if (this.props.user?.info?._id) {
            this.setState({ isLoading: false }, () => {
                this.setState({ pageStatus: 200 })
                this.getAddresses()

            })
        } else {
            setTimeout(() => {
                if (leftAttempt != 0) {
                    this.waitForId(leftAttempt - 1)
                } else {
                    // this.props.actions.logoutUser()
                    this.setState({ pageStatus: 401 })
                }
            }, 500);
        }
    }


    getAddresses = () => {
        this.setState({ isLoadingAddresses: true })


        HttpServices.request("getMyAddresses", { amount: this.state.amount }, (fetchResult, fetchError) => {

            this.setState({ isLoadingAddresses: false })

            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                return
            }
            let address
            if (Array.isArray(fetchResult.info)) {
                this.setState({ addresses: fetchResult.info, address: fetchResult.info[0] })
            }

        })
    }


    postAddress = (data) => {
        this.setState({ isLoadingPostAddress: true })

        // console.log(data)

        let myData = { ...data }
        if (myData.location?.lat) {
            myData.location = { coordinates: [myData.location.lng, myData.location.lat], type: 'Point' }
        }

        HttpServices.request("postAddress", myData, (fetchResult, fetchError) => {

            this.setState({ isLoadingPostAddress: false })

            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                return
            }

            this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
            this.addModal.hideModal()
            this.getAddresses()
            if (!data._id) {
                this.setState({ addAddress: false })
            }

            // this.setState({ address: fetchResult.info })

        })
    }

    continueShopping = () => {
        // this.postOrder()
        this.confirmModal.showModal()
    }


    postOrder = () => {

        if (this.state.address) {
            this.setState({ isLoadingPostOrder: true })

            let data = {
                prefferedTime: this.state.prefferedTime,
                description: this.state.description,
                list: []
            }


            this.props.cart?.items.forEach(item => {
                data.list.push({
                    product: item.data?._id,
                    count: item.count,
                    price: item.data?.price,
                    priceSttings: item.data?.priceSttings,
                })
                console.log(item)
            });

            data.address = { ...this.state.address }
            data.recipient = this.state.address.recipient


            // console.log(data)
            // return
            HttpServices.request("postOrder", data, (fetchResult, fetchError) => {

                this.setState({ isLoadingPostOrder: false })

                if (fetchError) {
                    this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                    return
                }

                this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
                // this.confirmModal.showModal()

                // console.log(fetchResult)
                if (fetchResult.info) {
                    let id = fetchResult.info?._id
                    this.props.actions.clearAllCart()
                    Router.push({ pathname: '/cart/checkout/' + id })
                }
                // this.setState({ address: fetchResult.info })

            })


            // if (this.props.user && this.props.user.loggedin) {
            //     Router.push('/cart/shipping')
            // } else {
            //     this.addModal.showModal()
            // }
        }
    }



    showAddress = () => {
        this.setState({ addAddress: true })
    }

    plusNum(item) {
        this.props.actions.addToCart({ data: item })
    }
    minusNum(item) {
        this.props.actions.reduceFromCart({ data: item })
    }



    calcTotalPrice = () => {
        let total = 0
        if (this.props.cart?.items) {
            for (let i = 0; i < this.props.cart?.items.length; i++) {
                const element = this.props.cart?.items[i];
                total = total + ((element.count ?? 1) * element.data.price)
            }
        }
        return total
    }


    calcBeforeDiscountPrice = () => {
        let total = 0
        if (this.props.cart?.items) {
            for (let i = 0; i < this.props.cart?.items.length; i++) {
                const element = this.props.cart?.items[i];

                if (element.data?.priceSttings?.discount?.value != null && element.data?.priceSttings?.discount?.value != 0) {
                    total = total + ((element.count ?? 1) * element.data.priceSttings?.priceBeforeDiscount)
                } else {
                    total = total + ((element.count ?? 1) * element.data.price)
                }
            }
        }
        return total.toFixed(0)
    }


    calcDiscountPrice = () => {
        let total = 0
        if (this.props.cart?.items) {
            for (let i = 0; i < this.props.cart?.items.length; i++) {
                const element = this.props.cart?.items[i];
                if (element.data?.priceSttings?.discount?.value != null && element.data?.priceSttings?.discount?.value != 0) {
                    total = total + (((element.count ?? 1) * element.data.priceSttings?.priceBeforeDiscount) - ((element.count ?? 1) * element.data.price))
                }
            }
        }

        return total.toFixed(0)
    }

    submitAddress = () => {
        let data = this.form.getForm()
        if (data) {
            this.postAddress(data)
        }
    }

    openEditAddress = (item) => {
        this.setState({ currentItem: item }, () => {
            this.addModal.showModal()
        })
    }





    render() {

        return (

            <Configurer
                settingsInfo={{ showFooter: true, showTabBar: true, showHeader: true, headerTitle: "Shipping", button: {} }}
                title={"Shipping"}
                description={"Shop Shipping"}
                className="p-0 min-full-height"
                ref={el => this.configurer = el}
            >

                <PageStatusViewer status={this.state.pageStatus} query={this.props.query}>


                    <div>
                        <div className='container-fluid p-0' >
                            <div className='w-100 flexcc flex-column py-5 position-relative' style={{ backgroundColor: '#fff' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: "100%" }}>
                                    <img src="/images/stacked-waves-haikei.svg" width={"100%"} height={'100%'} />
                                </div>

                                <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                                    <h1 style={{ fontWeight: '400', fontSize: 25 }}>{checkTranslation('{{lang}}Shipping-Information')}</h1>
                                    <p style={{ fontWeight: '400', color: '#fff', fontSize: 17 }}>{checkTranslation('{{lang}}Shop')}</p>
                                </div>

                            </div>
                        </div>
                        <div className="container-fluid px-5 py-3" style={{ backgroundColor: "#fff" }}>
                            <div className="flexc py-3" style={{ borderBottom: '1px solid rgb(0,0,0,0.1)' }}>
                                <div className="flexc">
                                    {/* <img src="/images/icons/number-one.png" style={{ width: '30px' }} /> */}
                                    <Link href={"/cart"}>
                                        <a>
                                            <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#789' }}>{checkTranslation('{{lang}}Order-Details')}</p>
                                        </a>
                                    </Link>
                                </div>
                                <img src="/images/icons/next (1).png" style={{ width: '11px', marginTop: '2px' }} />
                                <div className="flexc" style={{ marginLeft: '7px' }}>
                                    {/* <img src="/images/icons/number-2 (2).png" style={{ width: '30px' }} /> */}
                                    <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#007aff' }}>{checkTranslation('{{lang}}Shipping')}</p>
                                </div>
                                <img src="/images/icons/next (1).png" style={{ width: '11px', marginTop: '2px' }} />
                                <div className="flexc" style={{ marginLeft: '7px' }}>
                                    {/* <img src="/images/icons/number-3.png" style={{ width: '30px' }} /> */}
                                    <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#789' }}>{checkTranslation('{{lang}}Checkout')}</p>
                                </div>
                            </div>
                            <div className="row mt-4 w-100 m-0 ">
                                <div className="col-12 col-md-8 col-lg-8 p-0">
                                    {/* <div className=" flexc " style={{ fontSize: '18px', color: 'rgb(0,0,0)', fontWeight: '600', justifyContent: 'space-between' }}>

                                        {this.state.addAddress && (
                                            <div className='flexc' style={{ position: 'absolute', top: -22, left: 0 }}>
                                                <span className='cursor-pointer flexcc p-2' style={{ backgroundColor: "#ddd", borderRadius: 20, width: 20, height: 20 }} onClick={() => this.setState({ addAddress: false })}><i style={{ fontSize: "14px" }} className='fas fa-times'></i></span> <span className='mx-1' style={{ fontSize: 12, fontWeight: 400 }}>Back</span>
                                            </div>
                                        )}
                                    </div> */}



                                    {this.state.addAddress && (
                                        <div>
                                            <div className="px-1 " style={{ justifyContent: 'space-between' }}>
                                                <div className='row'>
                                                    {this.state.addresses?.map((item, index) => {
                                                        return (
                                                            <div className='col-6 col-md-6 col-lg-4 mb-3 px-2 pt-0' >
                                                                <div className="d-flex flex-column p-0  h-100" style={{ border: this.state.address?._id == item._id ? '1px solid #007aff' : '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0px 0px 10px #10101010' }}>
                                                                    <div className="flex-1  px-0" style={{ flex: 1 }}>
                                                                        <div className='px-3 pt-1'>
                                                                            <div onClick={() => this.setState({ address: item })} className='d-flex align-items-center justify-content-between pb-2 pt-1 cursor-pointer' style={{ borderBottom: '1px solid #eee' }}>
                                                                                <p style={{ fontSize: '14px', fontWeight: '400', color: '#007aff', }}>{checkTranslation('{{lang}}send-to-address')}</p>
                                                                                <div>
                                                                                    <span className={"flexcc " + (this.state.address?._id == item._id ? 'radio-check-box-true' : 'radio-check-box')}>
                                                                                        <img className='invert' src={'/images/tick.png'} height="12px" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="flexc mt-2" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                                                                <p style={{ fontSize: '14px', fontWeight: "400" }}>{item.province} - {item.city}</p>
                                                                            </div>

                                                                            <div className="flexc mt-0" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                                                                <p style={{ fontSize: '14px', fontWeight: "400" }}>{item.address}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className=' px-3 mt-2' style={{}}>
                                                                            <div style={{ cursor: 'pointer' }} className="my-2 w-100 d-flex align-items-center">
                                                                                <img src='/images/icons/email.png' style={{ filter: "invert(50%)" }} width={'18px'} height={'18px'} />
                                                                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.zipCode}</span>
                                                                            </div>
                                                                            <div style={{ cursor: 'pointer' }} className="my-2 w-100 d-flex align-items-center">
                                                                                <img src='/images/icons/phone-call.png' style={{ filter: "invert(50%)" }} width={'18px'} height={'18px'} />
                                                                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.recipient?.phone}</span>
                                                                            </div>
                                                                            <div style={{ cursor: 'pointer' }} className="my-2 w-100 d-flex align-items-center">
                                                                                <img src='/images/icons/profile-user.png' style={{ filter: "invert(50%)" }} width={'18px'} height={'18px'} />
                                                                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.recipient?.name} {item.recipient?.family}</span>
                                                                            </div>

                                                                        </div>




                                                                    </div>

                                                                    <div style={{ cursor: 'pointer' }} className="px-3 mb-3 mt-1 w-100 d-flex align-items-center justify-content-end">
                                                                        <span onClick={() => this.openEditAddress(item)} className='ml-2 px-2' style={{ color: "#007aff", fontSize: "12px", }}>{checkTranslation('{{lang}}edit')}</span>
                                                                        <span className='ml-2' style={{ color: "#ED384E", fontSize: "12px" }}>{checkTranslation('{{lang}}Delete')}</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        )
                                                    })}
                                                    <div className='col-6 col-md-6 col-lg-4 mb-3 px-2 pt-0' >
                                                        <div onClick={() => this.openEditAddress()} className='cursor-pointer p-2 h-100 d-flex flex-column justify-content-center align-items-center' style={{ color: '#007aff', border: '2px dotted #007aff', borderRadius: '8px', backgroundColor: '#fff', minHeight: 200 }}>
                                                            <span>
                                                                <i className="fas fa-plus"></i>
                                                            </span>
                                                            <span >
                                                                {checkTranslation('{{lang}}add-new-Address')}
                                                            </span>

                                                        </div>


                                                    </div>

                                                </div>
                                            </div>





                                        </div>
                                    )}

                                    {this.state.isLoadingAddresses && (
                                        <div className='flexcc py-4'>
                                            <Loader
                                                type="Oval"
                                                color="#007aff"
                                                height="50"
                                                width="50"
                                            />
                                        </div>
                                    )}

                                    {!this.state.isLoadingAddresses && this.state.addresses?.length == 0 && (
                                        <div className='p-3 flexcc flex-column pb-4' style={{ border: '1px solid rgb(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0px 0px 15px #10101010' }}>

                                            <p className='px-2 w-100 mb-2 text-bold'>{checkTranslation('{{lang}}Delivery-Address')}</p>

                                            <img className='' src="/images/placeholder.svg" height={50} />
                                            <p className='mt-2 text-small'>{checkTranslation('{{lang}}o-address')}</p>
                                            <p className='mt-0 text-small' style={{ color: '#ee5050' }}>* {checkTranslation('{{lang}}address-require')}</p>

                                            <div className="d-flex align-items-center px-3 mt-2">
                                                <button onClick={() => this.openEditAddress()} style={{ padding: '8px 15px', color: '#fff', background: 'linear-gradient(to left, #007aff, #00B2FF)', borderRadius: 6 }}>{checkTranslation('{{lang}}add-new-Address')}</button>
                                            </div>

                                        </div>
                                    )}


                                    {!this.state.addAddress && this.state.address && (
                                        // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                                        // <div onClick={() => this.setState({ selectedIndexSec: index })} className="px-1  mb-2" style={{ justifyContent: 'space-between', }}>


                                        <div className='p-3 d-flex flex-column justify-content-start' style={{ border: '1px solid rgb(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0px 0px 15px #10101010' }}>

                                            <div className="d-flex mx-2" >
                                                <div className="flex-1 px-2" style={{ flex: 1 }}>
                                                    <p style={{ fontSize: '15px', fontWeight: '400', color: '#007aff', }}>{checkTranslation('{{lang}}Delivery-Address')}</p>
                                                    <div className="d-flex flex-column my-2" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                                        <p style={{ fontSize: '14px', fontWeight: "400" }}>{this.state.address?.city} - {this.state.address?.province}</p>
                                                        <p className='mt-2' style={{ fontSize: '14px', fontWeight: "400" }}>{this.state.address?.address}</p>

                                                    </div>
                                                    <div style={{}} className="my-2 w-100 d-flex align-items-center">
                                                        {/* <p style={{ fontSize: '15px', fontWeight: '500', color: 'rgb(77,116,185)' }}>Hide what's included</p>
                                                                <div className="px-1">
                                                                    <img className={" " + (this.state.addressOpen[index] ? 'rotate-180' : '')} style={{ transition: 'all 0.5s', marginTop: '4px' }} src="/images/icons/arrow.png" height="10px" />
                                                                </div> */}
                                                        <img src='/images/icons/profile-user.png' style={{ filter: "invert(70%)" }} width={'18px'} height={'18px'} />
                                                        <span className='ml-2' style={{ color: "#62666d", fontSize: "12px" }}>{this.state.address?.recipient?.name} {this.state.address?.recipient?.family}</span>

                                                    </div>

                                                    {/* <Collapsible open={this.state.addressOpen[index]}>
                                                                <div className="py-1 ">
                                                                    <p style={{ fontSize: '14px', fontWeight: '600', }}>Post Code : <span style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>{item.postCod}</span></p>
                                                                    <div className="w-100 mt-3" style={{ height: 200 }}>
                                                                        <LeafletMap center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} >
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
                                                                            </Marker>
                                                                            <Marker position={[51.505, -0.09]}>
                                                                                <Popup>
                                                                                    A pretty CSS3 popup. <br /> Easily customizable.
                                                                                </Popup>
                                                                            </Marker>
                                                                        </LeafletMap>
                                                                    </div>
                                                                </div>

                                                            </Collapsible> */}

                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-start" style={{ alignItems: 'end' }}>
                                                {/* <div className="flexcc" style={{ width: '25px', height: '25px', backgroundColor: 'rgb(245,245,245)', borderRadius: '50px' }}>
                                                            <div style={{ width: '10px', height: '10px', backgroundColor: 'rgb(0,0,0,0.7)', zIndex: '100', borderRadius: '15px' }}></div>
                                                        </div> */}
                                                <div className="d-flex align-items-center px-3">
                                                    <button onClick={() => this.showAddress()} style={{ padding: '8px 15px', color: '#fff', background: 'linear-gradient(to left, #007aff, #00B2FF)', borderRadius: 6 }}>{checkTranslation('{{lang}}change-or-delet-address')}</button>
                                                    {/* <img src="/images/icons/next (1).png" style={{ width: '11px', marginTop: '2px' }} /> */}

                                                </div>
                                                {/* <div className="">
                                                            <button onClick={(e)=> e.stopPropagation()} style={{ padding: '4px 15px', borderRadius: '15px', backgroundColor: 'transparent', color: 'rgb(237,81,80,0.9)', fontWeight: '500' }}>Delete</button>
                                                        </div> */}

                                            </div>
                                        </div>

                                        // </div>

                                    )}
                                    {/* ) */}

                                    <div className="px-1 py-1 my-2" style={{ justifyContent: 'space-between', }}>
                                        <div className='px-1 py-4 d-flex flex-column justify-content-start' style={{ border: '1px solid rgb(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#fff', boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>
                                            <div className="d-flex mx-2" >
                                                <div className="flex-1 px-2" style={{ flex: 1 }}>
                                                    <p className=' w-100 mb-2 text-bold'>{checkTranslation('{{lang}}Additional-Information')}</p>

                                                    <div style={{}} className="my-2 mt-3 w-100  form-additional">
                                                        <div className="d-flex ">
                                                            <div className="d-flex flex-column flex-1">
                                                                {/* <input style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }} type="text" id="input-name" placeholder="Name" />
                                                                <input style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }} type="text" id="input-email" placeholder="Phone number" /> */}
                                                                {/* <p className='text-small mb-1 px-1'>Preffered Delivery Time</p>
                                                                <select onChange={(e) => this.setState({ prefferedTime: e.target.value })} className='p-3 tst-option' style={{ fontSize: 14, backgroundColor: '#f2f6f8', height: 40 }}>
                                                                    <option value={""}>Select ...</option>
                                                                    <option value={"9:00 am - 11:00 am"}>9:00 am - 11:00 am</option>
                                                                    <option value={"11:00 am - 1:00 pm"}>11:00 am - 1:00 pm</option>
                                                                    <option value={"1:00 pm - 3:00 pm"}>1:00 pm - 3:00 pm</option>
                                                                    <option value={"3:00 pm - 5:00 pm"}>3:00 pm - 5:00 pm</option>
                                                                </select> */}

                                                                <p className='text-small mb-1 px-1 '>{checkTranslation('{{lang}}description')}</p>
                                                                <textarea onChange={(e) => this.setState({ description: e.target.value })} className='p-3 ' style={{ backgroundColor: '#f2f6f8', fontSize: 14 }} name="Description" type="text" id="input-message-text-area" placeholder={checkTranslation('{{lang}}message')}></textarea>


                                                            </div>
                                                            {/* <div className="ml-3 flex-1">
                                                            </div> */}
                                                        </div>
                                                        {/* <div className='flexcc'>
                                                            <input style={{ width: "50%", backgroundColor: "#3399FE", cursor: "pointer", color: "#fff", boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }} type="submit" value="Submit" />
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





                                    <ShippingProduct data={this.props.cart?.items} />


                                </div>
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4  " style={{}}>

                                    <div style={{ top: 110, position: 'sticky', border: '1px solid rgb(0,0,0,0.1)', width: '100%', padding: '20px 25px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0px 0px 15px #10101010' }}>
                                        <div className=" pb-4 " style={{ fontSize: '18px', fontWeight: '600', color: '#000', borderBottom: '1px solid rgb(0,0,0,0.1)' }} >
                                            <p className='text-normal'>{checkTranslation('{{lang}}Price-summary')}</p>
                                            <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                                <div style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                                                    <p >{checkTranslation('{{lang}}Subtotal')}</p>
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(0,0,0)' }}>
                                                    <p>{priceStandardView(this.calcBeforeDiscountPrice())}</p>
                                                </div>
                                            </div>


                                            <div className="d-flex pt-3" style={{ justifyContent: 'space-between', color: '#ee5050' }}>
                                                <div style={{ fontSize: '14px', fontWeight: '400', }}>
                                                    <p >{checkTranslation('{{lang}}Discount')}</p>
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', }}>
                                                    <p>{priceStandardView(this.calcDiscountPrice())}</p>
                                                </div>
                                            </div>

                                            <p className='mt-3 text-smaller' style={{ fontWeight: 400, color: '#789' }}>{checkTranslation('{{lang}}shop-desc-page')}</p>

                                        </div>
                                        <div className="d-flex pt-4" style={{ justifyContent: 'space-between' }}>
                                            <div style={{ fontSize: '15px', fontWeight: '600', color: '#000000cc' }}>
                                                <p >{checkTranslation('{{lang}}Total')}</p>
                                            </div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000cc' }}>
                                                <p>{priceStandardView(this.calcTotalPrice())}</p>
                                            </div>
                                        </div>

                                        <div className="flexcc mt-2">
                                            {this.state.isLoadingPostOrder ? (
                                                <div className='py-2 mt-1 px-3'>
                                                    <Loader
                                                        type="Oval"
                                                        color="#007aff"
                                                        height="30"
                                                        width="30"
                                                    />
                                                </div>
                                            ) : (
                                                <button onClick={() => this.continueShopping()} className="Continue-bttn">{checkTranslation('{{lang}}Continue-Shipping')}</button>
                                            )}
                                        </div>

                                        <div className='text-center'>
                                            <Link href={'/cart'}>
                                                <a>
                                                    <p className='text-small mt-3'>{checkTranslation('{{lang}}back-to-list')}</p>
                                                </a>
                                            </Link>
                                        </div>

                                    </div>


                                </div>


                            </div>
                        </div>
                        <Modal1 ref={el => this.addModal = el} maxWidth={600}>

                            <div className='pb-5 mb-5' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, width: "100%" }}>
                                <div className='mb-2' style={{ borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '10px' }}>
                                    <p style={{ fontSize: '20px', fontWeight: '600', color: 'rgb(0,0,0)' }}>{checkTranslation('{{lang}}New-Address')}</p>
                                </div>
                                <FormViewer headers={this.state.headers} initData={this.state.currentItem} ref={el => this.form = el} theme={"modern"} inputClass={"modern-input"} />
                                {this.state.isLoadingPostAddress ? (
                                    <div className='pt-2 mt-1 px-3'>
                                        <Loader
                                            type="Oval"
                                            color="#007aff"
                                            height="30"
                                            width="30"
                                        />
                                    </div>
                                ) : (
                                    <button onClick={() => this.submitAddress()} className="modal-submite-button mt-3" style={{ background: 'linear-gradient(to left, #007aff, #00B2FF)' }}>{checkTranslation('{{lang}}Submit')}</button>
                                )}
                            </div>
                        </Modal1>





                        <Modal1 ref={el => this.confirmModal = el} maxWidth={400}>

                            <div className='pb-5 mb-5' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, width: "100%" }}>
                                <div className='mb-2' style={{ borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '10px' }}>
                                    <p style={{ fontSize: '20px', fontWeight: '600', color: 'rgb(0,0,0)' }}>{checkTranslation('{{lang}}Confirm')}</p>
                                </div>

                                <div>
                                    <p className='text-bold text-big'>{checkTranslation('{{lang}}submit-question-shop-page-shipping')}</p>
                                    <p className='text-small mt-2'>{checkTranslation('{{lang}}submit-answer-question')}.</p>

                                </div>
                                {this.state.isLoadingPostOrder ? (
                                    <div className='pt-2 mt-2 px-2'>
                                        <Loader
                                            type="Oval"
                                            color="#007aff"
                                            height="30"
                                            width="30"
                                        />
                                    </div>
                                ) : (
                                    <button onClick={() => this.postOrder()} className="modal-submite-button mt-3" style={{ background: 'linear-gradient(to left, #007aff, #00B2FF)' }}>{checkTranslation('{{lang}}accept-submit-order')}</button>
                                )}
                            </div>
                        </Modal1>

                    </div>

                </PageStatusViewer>

            </Configurer >
        )
    }
}




const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Address);
