
import React from 'react';
// import '../../styles/card.css';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
// import Collapsible from 'react-collapsible';
// import Modal from '../../components/Modal';
import FormViewer from '../../../components/FormViewer-new';
import Modal1 from '../../../components/Modal1';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../stores/actionsList';
import { checkTranslation, getToken, imageAddress, priceStandardView } from '../../../utils/useful';
import Link from 'next/link';
import ShippingProduct from '../../../components/ShippingProduct';
import HttpServices from '../../../utils/Http.services';
import Configurer from '../../../components/Configurer';
import PageStatusViewer from '../../../components/PageStatusViewer';
import Loader from 'react-loader-spinner';

// import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
// import { Map as leafletMap } from 'react-leaflet';


export async function getServerSideProps(context) {


    let slug = null

    if (context?.query?.slug) {
        slug = context?.query?.slug
    }



    // console.log(slug)
    // const res = await (await HttpServices.syncRequest('getOneOrder', { _id: slug }))

    // console.log(res)

    return {
        // props: JSON.parse(JSON.stringify({ info: res ? res.result?.info : null }))
        props: JSON.parse(JSON.stringify({ id: slug }))

    }


}


class Checkout extends React.Component {
    state = {

        payWay: [
            {
                img: '/images/credit-card.png',
                title: "Internet payment",
                des: "Online with all bank cards",
            },
            {
                img: '/images/people-trading.png',
                title: "Buy in person",
                des: "loremloremloremlorem",
            },
        ]
    }

    componentDidMount() {


        let token = getToken()
        if (token) {
            this.setState({ isLoading: true })
            this.waitForId(10)
        } else {
            this.setState({ pageStatus: 401 })
        }


        // if(this.state.info){
        //     this.setState({ pageStatus: 200 })
        // }else{
        //     // this.setState({ pageStatus: 401 })

        // }
    }



    waitForId = (leftAttempt) => {
        if (this.props.user?.info?._id) {
            this.setState({ isLoading: false }, () => {
                this.fetch()
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


    fetch = () => {

        HttpServices.request('getOneOrder', { _id: this.props.id }, (fetchResult, fetchError) => {


            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                this.setState({ pageStatus: 401 })
                return
            }

            this.setState({ info: fetchResult.info, pageStatus: 200 })


        })
    }


    continueShopping = () => {
        if (this.state.info?.status == '1' && this.state.info?.paymentStatus == '0') {
            this.getPaymentLink()
        }
    }


    getPaymentLink = () => {

        this.setState({ isLoadingPostOrder: true })
        HttpServices.request('getPaymentLink', { _id: this.props.id }, (fetchResult, fetchError) => {
            this.setState({ isLoadingPostOrder: false })


            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                // this.setState({ pageStatus: 401 })
                return
            }

            if (fetchResult.info) {
                window.location = fetchResult.info
            } else {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
            }

            // this.setState({ info: fetchResult.info, pageStatus: 200 })


        })

    }





    calcTotalPrice = () => {
        let total = 0
        if (this.state.info?.list) {
            for (let i = 0; i < this.state.info?.list.length; i++) {
                const element = this.state.info?.list[i];
                total = total + ((element.count ?? 1) * element.price)
            }
        }
        if (this.state.info?.deliveryPrice) {
            total = total + this.state.info?.deliveryPrice
        }

        if (this.state.info?.extraDiscount) {
            total = total - this.state.info?.extraDiscount
        }

        return total
    }


    calcBeforeDiscountPrice = () => {
        let total = 0
        if (this.state.info?.list) {
            for (let i = 0; i < this.state.info?.list.length; i++) {
                const element = this.state.info?.list[i];

                if (element?.priceSttings?.discount?.value != null && element?.priceSttings?.discount?.value != 0) {
                    total = total + ((element.count ?? 1) * element.priceSttings?.priceBeforeDiscount)
                } else {
                    total = total + ((element.count ?? 1) * element.price)
                }
            }
        }

        return total.toFixed(0)
    }


    calcDiscountPrice = () => {
        let total = 0
        if (this.state.info?.list) {
            for (let i = 0; i < this.state.info?.list.length; i++) {
                const element = this.state.info?.list[i];
                if (element?.priceSttings?.discount?.value != null && element?.priceSttings?.discount?.value != 0) {
                    total = total + (((element.count ?? 1) * element.priceSttings?.priceBeforeDiscount) - ((element.count ?? 1) * element?.price))
                } else {
                    total = total + ((element.count ?? 1) * element?.data?.price)
                }
            }
        }

        if (this.state.info?.extraDiscount) {
            total = total + this.state.info?.extraDiscount
        }
        if (total == null || total == undefined || isNaN(total)) {
            total = 0
        }

        return total.toFixed(0)
    }

    statusToLabel = (status) => {
        switch (status) {
            case '0':
                return 'Pending'
                break;

            case '2':
                return 'Finished'
                break;

            case '1':
                return 'Confirmed'
                break;

            case '-1':
                return 'Canceled'
                break;

            default:
                return 'Pending'
                break;
        }
    }

    statusToColor = (status) => {
        switch (status) {
            case '0':
                return '#789'
                break;

            case '1':
                return 'rgb(0, 205, 116)'
                break;

            case '2':
                return 'rgb(0, 205, 116)'
                break;

            case '-1':
                return '#ee5050'
                break;

            default:
                return '#ddd'
                break;
        }
    }

    render() {

        return (

            <Configurer
                settingsInfo={{ showFooter: true, showTabBar: true, showHeader: true, headerTitle: "Payment", button: {} }}
                title={"Payment"}
                description={"Shop Payment"}
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
                                    <h1 style={{ fontWeight: '400', fontSize: 25 }}>{checkTranslation('{{lang}}Order-Payment')}</h1>
                                    <p style={{ fontWeight: '400', color: '#fff', fontSize: 17 }}>#{this.props.info?.id}</p>
                                </div>

                            </div>
                        </div>
                        <div className="container-fluid px-5 py-3" style={{ backgroundColor: "#fff" }}>
                            <div className="flexc py-3" style={{ borderBottom: '1px solid rgb(0,0,0,0.1)' }}>
                                <div className="flexc">
                                    {/* <img src="/images/icons/number-one.png" style={{ width: '30px' }} /> */}
                                    <Link href={"/cart/"}><p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#333333' }}>{checkTranslation('{{lang}}orderDetails')}</p></Link>
                                </div>
                                <img src="/images/icons/next (1).png" style={{ width: '11px', marginTop: '2px' }} />
                                <div className="flexc" style={{ marginLeft: '7px' }}>
                                    {/* <img src="/images/icons/number-2 (2).png" style={{ width: '30px' }} /> */}
                                    <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#333333' }}>{checkTranslation('{{lang}}Shipping')}</p>
                                </div>
                                <img src="/images/icons/next (1).png" style={{ width: '11px', marginTop: '2px' }} />
                                <div className="flexc" style={{ marginLeft: '7px' }}>
                                    {/* <img src="/images/icons/number-3.png" style={{ width: '30px' }} /> */}
                                    <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#007aff' }}>{checkTranslation('{{lang}}Checkout')}</p>
                                </div>
                            </div>
                            <div className="row mt-4 w-100 m-0 ">
                                <div className="col-md-8 p-0">

                                    {/* <div className="px-1 py-1 my-2" style={{ justifyContent: 'space-between', }}>
                                <div className='p-3 d-flex' style={{ borderRadius: '8px', backgroundColor: '#fff' }}>
                                    <div className="d-flex flex-1 align-items-center  mx-2" >
                                        <input type={"text"} placeholder='coupon code' className='coupon-input-edit m-0' />
                                        <button className='ml-3 coupon-btn'>

                                            <i className="fas fa-angle-right"></i>
                                        </button>
                                    </div>


                                </div>

                            </div> */}






                                    {/* // <div className="col-6 col-md-4 col-lg-3 mb-4 "> */}
                                    <div className=" mb-3" style={{ justifyContent: 'space-between', }}>


                                        <div className='p-3 d-flex flex-column justify-content-start' style={{ border: '1px solid rgb(0,0,0,0.1)', boxShadow: '0px 0px 15px #10101010', borderRadius: "8px", backgroundColor: '#fff' }}>

                                            <div className="pb-2 flexc " style={{ fontSize: '22px', color: 'rgb(0,0,0)', fontWeight: '600', justifyContent: 'space-between' }}>
                                                <p >{checkTranslation('{{lang}}Order-Payment')}</p>

                                            </div>

                                            <p className='text-normal'>{checkTranslation('{{lang}}Order')} #{this.props.info?.id}</p>
                                            <p className='text-small mt-1'>{checkTranslation('{{lang}}Order-Status')} <span style={{ backgroundColor: this.statusToColor(this.props.info?.status), borderRadius: 4, padding: '3px 6px', color: '#fff' }}>{checkTranslation(this.statusToLabel(this.props.info?.status))}</span></p>
                                            <p className='text-small mt-2'>{checkTranslation('{{lang}}Payment-Status')} <span style={{ backgroundColor: this.statusToColor(this.props.info?.paymentStatus), borderRadius: 4, padding: '3px 6px', color: '#fff' }}>{checkTranslation(this.statusToLabel(this.props.info?.paymentStatus))}</span></p>

                                            {this.props.info?.status == '0' && (
                                                <p className='mt-3 text-big' style={{ fontWeight: 400, color: '#ee5050' }}>{checkTranslation('{{lang}}oder-desc-card-checkout-slug')}.</p>
                                            )}

                                            {this.props.info?.status == '1' && (
                                                <p className='mt-3 text-big' style={{ fontWeight: 400, color: 'rgb(0, 205, 116)' }}>{checkTranslation('{{lang}}oder-confirm-card-checkout-slug')}</p>
                                            )}
                                            {/* <div className="d-flex mx-2" >
                                        <div className="flex-1 px-2" style={{ flex: 1 }}>
                                            {this.state.payWay.map((prop, index) => {
                                                return (
                                                    <div style={{ cursor: 'pointer', borderBottom: "1px solid #ddd" }} className="py-4 w-100 d-flex align-items-center">
                                                        <span key={index} onClick={() => this.setState({ selectedIndex: index })} className='mr-3' style={{ width: "10px", height: "10px", backgroundColor: this.state.selectedIndex == index ? '#3399FE' : '#fff', borderRadius: "100%", border: this.state.selectedIndex == index ? '1px solid transparent' : '1px solid #000' }}>

                                                        </span>


                                                        <img src={prop.img} style={{}} width={'40px'} height={'40px'} />
                                                        <div className='d-flex flex-column ml-2'>
                                                            <span className='ml-2' style={{ color: "#3399FE", fontSize: "16px", fontWeight: "600" }}>{prop.title}</span>
                                                            <span className='ml-2' style={{ color: "#62666d", fontSize: "12px" }}>{prop.des}</span>
                                                        </div>

                                                    </div>
                                                )
                                            })}


                                           



                                        </div>
                                    </div> */}

                                            <div className="d-flex justify-content-start" style={{ alignItems: 'end' }}>


                                            </div>
                                        </div>

                                    </div>


                                    <ShippingProduct data={this.state.info?.list} />



                                </div>
                                <div className="col-12 col-md-4 col-xl-4 col-lg-4  mt-md-0 mt-4 p-0 px-md-3" style={{}}>

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

                                            <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                                <div style={{ fontSize: '14px', fontWeight: '400', color: '#000000' }}>
                                                    <p >{checkTranslation('{{lang}}Shipping')}</p>
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: 'rgb(0,0,0)' }}>
                                                    <p>{this.state.info?.deliveryPrice ? priceStandardView(this.state.info?.deliveryPrice) : 0}</p>
                                                </div>
                                            </div>



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
                                                <button onClick={() => this.continueShopping()} className="Continue-bttn" style={{ background: (this.props.info?.status == '1' && this.props.info?.paymentStatus == '0') ? null : 'linear-gradient(to left , #567 , #789)' }}>{checkTranslation('{{lang}}go-top-payment-button')}</button>
                                            )}
                                        </div>



                                    </div>


                                </div>



                            </div>
                        </div>

                    </div>

                </PageStatusViewer>

            </Configurer>
        )
    }
}



const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);