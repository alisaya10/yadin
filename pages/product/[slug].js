import React from 'react';
// import './modal.css';
// import './styles/productpage.css';
import Footer from "../../components/footer"
import ReactStars from "react-rating-stars-component";
import { imageAddress, priceStandardView, translate } from '../../utils/useful';
import HttpServices from '../../utils/Http.services';
// import CardItemBox from '../../components/CardItemBox';
// import { render } from "react-dom";
// import Slider from "react-slick";`  ؤض                                                  `
// import ReactStars from 'react-rating-stars-component'

// import './styles/shop.css';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import BrowseCat from '../../components/BrowseCat';
import ProductBox from '../../components/boxes/ProductBox';
import Link from 'next/link';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';




export async function getServerSideProps(context) {


    let slug = null

    if (context?.query?.slug) {
        slug = context?.query?.slug
    }

    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }


    const res = await (await HttpServices.syncRequest('getProduct', { _id: slug })).result
    const json = await (await HttpServices.syncRequest('getContents', { page: "ShopCategories", lng })).result


    const similarRes = await (await HttpServices.syncRequest('getRecommendedProducts', { _id: res?.info?._id, lng })).result


    return {
        props: JSON.parse(JSON.stringify({ info: res ? res.info : null, products: similarRes ? similarRes.info : [], list: json.info }))
    }



}

class ProductPage extends React.Component {
    state = {
        imageIndex: 0,
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

        ],
        num: 0,
        // searchResults: null,
    }

    plusNum() {


        this.props.actions.addToCart({ data: this.props.info })

        // this.setState({ num: this.state.num + 1 })
    }
    minusNum() {


        this.props.actions.reduceFromCart({ data: this.props.info })

        // this.setState({ num: this.state.num - 1 })

        // if (this.state.num <= 0) {
        //     this.setState({ num: 0 });

        // }

    }



    countCart = () => {
        let count = 0
        let info = this.props.info
        for (let i = 0; i < this.props.cart?.items?.length; i++) {
            let item = this.props.cart.items[i]
            if (item?.data?._id == info._id) {
                count = count + item.count
            }

        }


        return count
    }



    render() {


        const firstExample = {
            size: 12,
            value: 3,
            count: 5,
            color: "#ddd",
            activeColor: "#FCB942",
            edit: false,
        };

        return (
            <div className='' style={{ backgroundColor: '#fff' }}>
                <div className="container-fluid p-0 m-0">
                    <BrowseCat
                        data={this.props.list}
                    />
                </div>
                <div className="container pt-4">

                    <div className="row w-100 m-0" style={{ position: 'relative' }}>
                        <div className="col-12  col-lg-8">
                            {/* <div className="flexc my-2 root-page-test" style={{ cursor:'pointer'}}>
                                        <div className="flexc root-page-test" style={{ marginLeft: '10px', fontSize: '14px', fontWeight: '400', color: '#777777' }}>
                                            <p>IOT Smile Online Shop {'>'} </p>
                                        </div>
                                        <div className="flexc" style={{ marginBottom: '2px',fontSize: '14px', fontWeight: '400', color: '#777777'  }}>
                                            <p className="px-1">digital products {'>'} </p>
                                            <p>sensor</p>
                                        </div>
                                    </div> */}
                            {/* <div className="flexc pt-2">
                                <p style={{ fontSize: '25px', fontWeight: '600', color: '#000' }}>I will create a logo design for modern brands</p>
                            </div> */}
                            {/* <div className="pt-3 flexc">
                                <img src="/images/portrate.jpg" style={{ width: '35px', borderRadius: '20px' }} />
                                <p className="mx-2" style={{ fontSize: '14px', fontWeight: '600' }}>bruno_malagrino</p>

                            </div> */}
                            <div className="w-100" style={{ borderRadius: '100px', }}>


                                <div className="d-flex justify-content-between w-100 mt-2" style={{ backgroundColor: 'transparent' }}>

                                    <div className='w-100'>
                                        <img src={imageAddress((this.props.info?.images ? this.props.info?.images[this.state.imageIndex] : ''))} style={{ width: '75%', objectFit: 'contain' }} />
                                    </div>
                                    <div className="d-flex flex-column  px-3" style={{ width: '25%' }}>
                                        {this.props.info?.images?.map((image, index) => {
                                            return (
                                                <div className='cursor-pointer flexcc mb-2 py-2' onClick={() => { this.setState({ imageIndex: index }) }} style={{ borderRadius: 6, border: this.state.imageIndex == index ? '1px solid #eee' : '1px solid transparent' }}>
                                                    <img src={imageAddress(image, null, 'small')} className="" width={'90%'} />
                                                </div>
                                            )
                                        })}

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
                                <div className='flexc mt-4'>
                                    {this.props.info?.categories?.map((prop, index) => {
                                        return (
                                            <Link href={'/shop/' + prop._id}>
                                                <a>
                                                    <p className='mt-1 mr-2' style={{ fontSize: '14px', fontWeight: '400' }}>{prop.values?.title}</p>
                                                </a>
                                            </Link>
                                        )
                                    })}
                                </div>
                                <p className="mb-2 mt-2" style={{ fontSize: '20px', fontWeight: '600', color: '#000' }}>{this.props.info?.title}</p>
                                <p className='mt-1 mr-2 mb-3' style={{ fontSize: '14px', fontWeight: '400' }}>Brand {this.props.info?.brand?.values?.name}</p>
                                <div className='ck-content'>
                                    <div style={{ color: '#202020', fontSize: 16 }} dangerouslySetInnerHTML={{ __html: this.props.info?.body }}></div>
                                </div>
                            </div>
                            <div className="row w-100 pt-2 m-0">
                                <div className="col-6 p-0">
                                    <p style={{ fontSize: '16p', fontWeight: '500' }}>{translate('usecases')}</p>
                                    <div className='row m-0 mt-1'>
                                        {this.props.info?.usecases?.map((prop, index) => {
                                            console.log(prop)
                                            return (
                                                <div className='col-12 col-md-6 p-0'>
                                                    <Link href={'/usecase/' + prop._id}>
                                                        <a className='flexc'>
                                                            <img className='mrd-2' style={{ height: 30, borderRadius: 20 }} src={imageAddress(prop.values?.icon)} />
                                                            <p className='mt-1' style={{ fontSize: '14px', fontWeight: '400' }}>{prop.values?.title}</p>
                                                        </a>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-6 p-0">
                                    <p className='mb-2' style={{ fontSize: '16px', fontWeight: '500' }}>Technologies</p>
                                    {this.props.info?.technologies?.map((prop, index) => {
                                        return (
                                            <p className='mt-1' style={{ fontSize: '14px', fontWeight: '400' }}>{prop}</p>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="pt-5">
                                <p style={{ fontSize: '20px', fontWeight: '600', color: "#000" }}>About The Seller</p>
                                <div className="flexc mt-2">
                                    <img src={imageAddress(this.props.info?.partner?.image, 'profile', 'small')} style={{ width: '60px', borderRadius: '60px' }} />
                                    <div className="mx-3">
                                        <p className="m-0" style={{ fontSize: '18px', fontWeight: '600', color: 'rgb(0,0,0,0.9)' }}>{this.props.info?.partner?.name}</p>
                                        <p className="m-0" style={{ fontSize: '14px', color: '#789' }}>Verified Partner</p>

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

                                        </div>
                                        <button className="contact-prdctpg-bttn" >Contact Me</button> */}
                                    </div>
                                </div>
                            </div>

                            <div style={{ border: '1px solid rgba(0,0,0,0.2)', padding: '20px 20px', borderRadius: '5px', marginTop: '20px' }}>
                                {/* <div className="row m-0 w-100 pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }} >
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
                                </div> */}
                                <p style={{ fontSize: '16px', fontWeight: '600' }}>More About seller</p>

                                <p className="mt-2" style={{ fontSize: '16px' }}>{this.props.info?.partner?.description}</p>
                            </div>
                        </div>





                        <div className="col-12  col-lg-4" style={{}}>
                            <div style={{ top: 90, position: 'sticky', border: '1px solid rgb(0,0,0,0.1)', borderRadius: '5px' }}>
                                <div style={{ width: '100%', padding: '20px 25px', borderRadius: '5px' }}>
                                    <div className="pb-2 " style={{ fontSize: '20px', fontWeight: '600', color: '#000' }} >
                                        <p>{this.props.info?.title}</p>
                                    </div>
                                    {/* <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                                            <p >B&W portrait</p>
                                        </div>
                                        <div style={{ fontSize: '18px', fontWeight: '400', color: 'rgb(0,0,0,0.8)' }}>
                                            <p>€91.73</p>
                                        </div>
                                    </div> */}
                                    <p className='my-1' style={{ fontSize: '15px' }}>{this.props.info?.description}</p>

                                    {this.props.info?.available && (
                                        <div>
                                            <div className="d-flex pt-3" style={{ justifyContent: 'space-between' }}>
                                                <div style={{ fontSize: '18px', fontWeight: '400', color: 'rgb(0,0,0,0.8)' }}>

                                                    {(this.props.info?.priceSttings?.discount?.value != null && this.props.info?.priceSttings?.discount?.value != 0) && (
                                                        <p style={{ fontSize: 16, textDecoration: 'line-through' }}>{this.props.info?.priceSttings?.currency} {priceStandardView(this.props.info?.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                                    )}
                                                    <p className='text-bold' style={{ fontSize: 22, color: '#39f' }}>{this.props.info?.priceSttings?.currency} {priceStandardView(this.props.info?.price)}</p>



                                                </div>


                                            </div>


                                            <div className="flexc mb-2 mt-2">
                                                <img src="/images/icons/clock.png" style={{ width: '20px' }} />
                                                <p className="m-0 mx-2" style={{ fontSize: '14px' }}>7 Days Delivery</p>
                                            </div>


                                            <div className="d-flex justify-content-start">
                                                {(this.countCart() == 0) ? (
                                                    <button onClick={() => this.plusNum()} className="buyProduct-bttn ">Add To Cart</button>
                                                ) : (
                                                    <div className="plus-and-minus-border-box  ">
                                                        <span onClick={() => this.minusNum()} style={{ cursor: 'pointer' }}><i class="fas fa-minus"></i></span>
                                                        <span style={{ fontSize: 20 }}>{this.countCart()} <span style={{ color: '#ffffffbb', fontSize: 16 }}> in cart</span></span>
                                                        <span onClick={() => this.plusNum()} style={{ cursor: 'pointer' }}><i class="fas fa-plus"></i></span>


                                                    </div>
                                                )}
                                            </div>


                                        </div>
                                    )}

                                    {!this.props.info?.available && (
                                        <div className='mt-3 text-center'>
                                            <div className='mt-2 mb-2 px-2 py-3' style={{ backgroundColor: '#eee', borderRadius: 8 }}>
                                                <p style={{ fontSize: '18px', fontWeight: '500', color: 'rgb(0,0,0,0.8)' }}>{translate("unavailable")}</p>
                                            </div>
                                        </div>
                                    )}
                                    {/* <div className="d-flex align-items-center mb-3">
                                        <ReactStars {...firstExample} />
                                        <span style={{ marginLeft: 8, textDecoration: 'underLine', fontSize: 14 }}>442 reviews </span>
                                    </div> */}



                                    {/* <div className="flexc">
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
                                    </div> */}
                                    {/* <div className="flexc">
                                        <p className="mx-2 mb-1" style={{ fontSize: '15px' }}>Qty:</p>

                                    </div> */}

                                    {this.props.info?.links && this.props.info?.links?.length >0  && (
                                        <div className="my-3" style={{ fontSize: '16px', fontWeight: '500', color: '#000000aa', paddingTop: '10px' }}>
                                            {this.props.info?.links?.map((prop, index) => {

                                                return (
                                                    <Link href={prop.link}>
                                                        <a className="py-2 f-border-tst d-flex justify-content-between align-items-center">
                                                            <p className="for-options-product text-small">{prop.label}</p>
                                                            <span> {'>'} </span>
                                                        </a>
                                                    </Link>
                                                )

                                            })}


                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>

                    </div>



                </div>

                <div className="container-fluid d-flex flex-column  pt-4 mt-5 pb-5" style={{ backgroundColor: '#f2f6f8' }}>
                    <div className='container'>
                        <p className="productsdesc1 mb-3" style={{ textAlign: 'center', fontSize: '24px', color: '#333333' }}>Other Products</p>
                        {/* <p className="productsdesc1" style={{ textAlign: 'center', fontSize: '16px', color: '#777777', fontWeight: 300 }}>Today’s deal and more</p> */}
                        <div className="row  m-0">
                            {/* <CardItemBox
                                    data={this.props.products}
                                /> */}


                            {this.props.products.map((item, index) => {
                                return (
                                    <div className='col-12 col-sm-6 col-lg-6 col-xl-3'>
                                        <ProductBox item={item} key={index} />
                                    </div>

                                )

                            }
                            )}


                            {(!this.props.products || this.props.products?.length == 0) && (
                                <div className="flexcc w-100 mb-5">
                                    <p>Nothing Found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



// export default ; 


const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductPage);


// const mapStateToProps = (state) => {
//     return {
//         cart: state.cart,
//         user: state.user
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addToCart: (item, action, extra) => dispatch({ type: 'ADD_TO_CART', item, action, extra }),
//         reduceFromCart: (item, action, extra) => dispatch({ type: 'REDUCE_FROM_CART', item, action, extra }),

//         setUser: (loggedin, info, isCounterpart) => dispatch({ type: 'SET_USER', loggedin, info, isCounterpart })
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductPage))
