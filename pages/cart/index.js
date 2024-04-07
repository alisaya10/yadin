import React from 'react';
import Modal1 from '../../components/Modal1';
// import './modal.css';
// import './styles/card.css';
// import ReactStars from "react-rating-stars-component";
// import { render } from "react-dom";
// import Slider from "react-slick";
// import './styles/shop.css';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
// import Collapsible from 'react-collapsible';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import { checkTranslation, imageAddress, priceStandardView } from '../../utils/useful';
import Link from 'next/link';
import Router from 'next/router';


class Cart extends React.Component {
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
        products: [],
        productsOpen: {},
        products: [
            { name: 'Smart watch', image: '/images/smartwatch1.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            { name: 'Smart watch', image: '/images/smartwatch2.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            { name: 'Smart watch', image: '/images/smartwatch3.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            { name: 'Smart watch', image: '/images/smartwatch1.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            { name: 'Smart watch', image: '/images/smartwatch3.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            { name: 'Smart watch', image: '/images/smartwatch2.jpeg', dscr1: '7 Days Delivery', dscr2: '1 Revision', dscr3: '1 Item', dscr4: '1 Item View', dscr5: 'Unlimited Colorways', dscr6: '2 Item Views', },
            // { name: 'Smart watch', image: '/images/smartwatch3.jpeg', description: '125,000 IRR', description1: '500,000 IRR', color1: 'rgba(52, 52, 144, 1)', color2: ' rgba(52, 52, 144, 0.8)' },
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

    plusNum(item) {
        this.props.actions.addToCart({ data: item })
    }
    minusNum(item) {
        this.props.actions.reduceFromCart({ data: item })
    }

    // countCart=()=>{
    //     let count = 0
    //     let info = this.props.info
    //     for (let i = 0; i < this.props.cart?.items?.length; i++) {
    //         let item = this.props.cart.items[i]
    //         if (item?.data?._id == info._id ) {
    //             count = count+item.count
    //         }

    //     }


    //     return count
    // }

    removeFromCart = (item) => {
        this.props.actions.removeFromCart(item)
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


    continueShopping = () => {
        if (this.props.user && this.props.user.loggedin) {
            Router.push('/cart/shipping')
        } else {
            this.addModal.showModal()
        }
    }



    render() {


        return (
            <>
                <div className='container-fluid p-0'>
                    <div className='w-100 flexcc flex-column py-5 position-relative' style={{ backgroundColor: '#fff' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: "100%" }}>
                            <img src="/images/stacked-waves-haikei.svg" width={"100%"} height={'100%'} />
                        </div>

                        <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                            <h1 style={{ fontWeight: '400', fontSize: 25 }}>{checkTranslation('{{lang}}Shopping-Cart')}</h1>
                            <p style={{ fontWeight: '400', color: '#fff', fontSize: 17 }}>{checkTranslation('{{lang}}Shop')}</p>
                        </div>

                    </div>
                </div>
                <div style={{ backgroundColor: '#fff' }}>
                    <div className="container-fluid px-5">
                        <div className="flexc py-3" style={{ borderBottom: '1px solid rgb(0,0,0,0.1)' }}>
                            <div className="flexc">
                                {/* <img src="/images/icons/number-one.png" style={{ width: '30px' }} /> */}
                                <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#007aff' }}>{checkTranslation('{{lang}}orderDetails')}</p>
                            </div>
                            <img src="/images/icons/next (1).png" className='d-rotate' style={{ width: '11px', marginTop: '2px' }} />
                            <div className="flexc" style={{ marginLeft: '7px' }}>
                                {/* <img src="/images/icons/number-2 (2).png" style={{ width: '30px' }} /> */}
                                <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#789' }}>{checkTranslation('{{lang}}Shipping')}</p>
                            </div>
                            <img src="/images/icons/next (1).png" className='d-rotate' style={{ width: '11px', marginTop: '2px' }} />
                            <div className="flexc" style={{ marginLeft: '7px' }}>
                                {/* <img src="/images/icons/number-3.png" style={{ width: '30px' }} /> */}
                                <p className="mx-2 mt-1 cursor-pointer" style={{ fontSize: '14px', fontWeight: '400', color: '#789' }}>{checkTranslation('{{lang}}Checkout')}</p>
                            </div>
                        </div>




                        <div className="row w-100 mt-4 ml-0" style={{}}>
                            <div className="col-md-8 px-3 d-none d-lg-block">
                                {this.props.cart?.items?.length > 0 && (

                                    <table className="main-table w-100 p-0">
                                        <thead className='w-100'>
                                            <tr className="for-border-test">
                                                <th className="title-for-head">{checkTranslation('{{lang}}Product')}</th>
                                                <th className="title-for-head">{checkTranslation('{{lang}}Price')}</th>
                                                <th id="mobile-hide" className="title-for-head">{checkTranslation('{{lang}}Quantity')}</th>
                                                <th id="mobile-hide" className="title-for-head" style={{ textAlign: 'center' }}>{checkTranslation('{{lang}}Total')}</th>

                                            </tr>
                                        </thead>
                                        <tbody className="body-table w-100">
                                            {this.props.cart?.items.map((item, index) => {
                                                return (
                                                    <tr className='under-sub-section-table' key={item.data._id}>
                                                        <td >
                                                            <Link href={'/product/' + item.data?.slug}>
                                                                <a className='d-flex align-items-center justify-content-start'>
                                                                    <img src={imageAddress(item?.data?.images, null, 'small')} style={{ width: '60px', }} />
                                                                    <p className='ml-3' style={{ fontSize: '14px', fontWeight: '400', color: '#000000', }}>{item?.data?.title}</p>
                                                                </a>
                                                            </Link>
                                                        </td>
                                                        <td id="mobile-hide text-small" style={{fontSize: 14}}>
                                                            {(item.data?.priceSttings?.discount?.value != null && item.data?.priceSttings?.discount?.value != 0) && (
                                                                <p style={{ fontSize: 14, textDecoration: 'line-through', color: "#ee5050" }}>{priceStandardView(item.data?.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                                            )}
                                                            {item?.data?.priceSttings?.currency} {priceStandardView(item?.data?.price)}
                                                        </td>
                                                        <td colSpan={1} className='p-0'>
                                                            <div className="quantity-box-cart">
                                                                <span className='text-smallest' onClick={() => this.minusNum(item.data)} style={{ cursor: 'pointer' }}><i className="fas fa-minus"></i></span>
                                                                <span className='px-2 text-small' style={{ fontSize: 14 }}>{item.count}</span>
                                                                <span className='text-smallest' onClick={() => this.plusNum(item.data)} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i></span>


                                                            </div>
                                                        </td>
                                                        <td style={{ textAlign: 'center',fontSize:14 }}>{item?.data?.priceSttings?.currency} {priceStandardView(item?.data?.price * item?.count)}</td>

                                                        <td id="mobile-hide">
                                                            <div onClick={() => this.removeFromCart(item)} className='flexcc p-2' style={{ backgroundColor: '#ddd', borderRadius: 20, width: 20, height: 20 }}>
                                                                <i className='fas fa-times cursor-pointer text-smaller '></i>
                                                            </div>
                                                        </td>




                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                )}


                                {(!this.props.cart?.items || this.props.cart?.items?.length == 0) && (
                                    <div className="d-flex justify-content-center align-items-center py-2 mx-2">
                                        <p className='text-center' style={{ color: "#666666" }}>
                                            {checkTranslation('{{lang}}Cart-empty')}
                                        </p>

                                    </div>
                                )}


                            </div>

                            <div className='col-md-12 col-sm-12 col-xs-12 mb-3 d-lg-none '>
                                {this.props.cart?.items?.map((prop, index) => {
                                    return (

                                        <div className='d-flex flex-column align-items-center w-100 py-5' style={{ border: "1px solid #ddd" }}>
                                            <div className='d-flex justify-content-end w-100 mr-4' style={{ position: 'relative', }}>
                                                <a className='for-hover-delet-product' style={{ position: 'absolute', bottom: '100%', }}><i style={{ fontSize: '14px' }} className="fas fa-times"></i></a>
                                            </div>
                                            <img className='my-4' src={imageAddress(prop?.data?.images, null, 'small')} style={{ width: '60px', }} />
                                            <p className='ml-3 my-3' style={{ fontSize: '16px', fontWeight: '400', color: '#000000', }}>{prop?.data?.title}</p>
                                            <p className='mb-2' id="mobile-hide">{prop?.data?.priceSttings?.currency} {prop?.data?.price}</p>
                                            <div className="quantity-box-cart mb-2" style={{ width: "20%" }}>
                                                <span onClick={() => this.minusNum(prop.data)} style={{ cursor: 'pointer' }}><i className="fas fa-minus"></i></span>
                                                <span style={{ fontSize: 14 }}>{prop.count}</span>
                                                <span onClick={() => this.plusNum(prop.data)} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i></span>
                                            </div>
                                            <p style={{ textAlign: 'center' }}>{prop?.data?.priceSttings?.currency} {prop?.data?.price * prop?.count}</p>




                                        </div>

                                    )
                                })}











                            </div>







                            <div className="col-xl-4 col-lg-4 col-md-12 " style={{}}>

                                <div style={{ top: 110, position: 'sticky', border: '1px solid rgb(0,0,0,0.1)', width: '100%', padding: '20px 25px', borderRadius: '8px',backgroundColor:'#fff',boxShadow:'0px 0px 15px #10101010' }}>
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



                                        {/* <div className="d-flex flex-column pt-3" style={{ justifyContent: 'space-between' }}>
                                            <div className='my-4' style={{ fontSize: '15px', fontWeight: '500', color: '#000000aa    ' }}>
                                                <p >Shipping</p>
                                            </div>
                                            <div className='d-flex flex-column' style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(0,0,0,0.6)' }}>
                                                <label> <input className='m-0' type="radio" checked /><span className='ml-2'>Free shipping</span></label>
                                                <label><input className='m-0' type="radio" /><span className='ml-2'>Express shipping </span></label>

                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="d-flex pt-4" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#000000cc' }}>
                                            <p >{checkTranslation('{{lang}}Total')}</p>
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#000000cc' }}>
                                            <p>{priceStandardView(this.calcTotalPrice())}</p>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '500', color: '#000000aa    ' }}>
                                            <p >Delivery Time</p>
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: '500', color: 'rgb(0,0,0,0.6)' }}>
                                            <p>7 days</p>
                                        </div>
                                    </div> */}
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
                                        <button onClick={() => this.continueShopping()} className="Continue-bttn">{checkTranslation('{{lang}}Continue-Shipping')}</button>
                                    </div>

                                </div>
                                {/* <div style={{ fontSize: '16px', fontWeight: '500', color: '#000000aa', paddingTop: '10px' }}>
                                    <p>Learn <a href="#" className="cursor-pointer" style={{ color: 'rgb(77,116,185)', fontWeight: '600', }}>how to use</a></p>
                                    <p>Learn <a href="#" className="cursor-pointer" style={{ color: 'rgb(77,116,185)', fontWeight: '600', }}>about use cases</a></p>
                                </div> */}

                            </div>
                            <Modal1 ref={el => this.addModal = el} maxWidth={800}>
                                <div className='w-100 login-modal d-flex flex-column align-items-center justify-content-center' >
                                    <img src='/assets/log-7.jpeg' width={"100%"} style={{ borderRadius: "8px" }} />
                                    <div style={{ position: 'absolute', zIndex: 2 }}>
                                        <div className='d-flex flex-column align-items-center'>
                                            <img src='/assets/log-in.png' style={{ width: "70px", height: "70px", filter: "invert(95%)" }} />
                                            <span className='my-4' style={{ fontSize: "26px", fontWeight: "bold", color: "#fff" }}>
                                                {checkTranslation('{{lang}}not-login')}
                                            </span>

                                            <span style={{ fontSize: "22px", color: "#fff" }}>   </span>

                                            <Link href={"/login"}>
                                                <button className='Continue-bttn-login'>
                                                 {checkTranslation('{{lang}}login')}
                                                </button>
                                            </Link>
                                        </div>

                                    </div>




                                </div>



                            </Modal1>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
