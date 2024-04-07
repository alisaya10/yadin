import React, { Component } from 'react'
import Link from 'next/link';
import { imageAddress, priceStandardView, translate } from '../../utils/useful';


class ProductBox extends Component {

    state = {

    }


    addToCart = () => {
        this.props.addToCart(this.props.item)
    }


    render() {


        return (
            <div className={' ' + (this.props.col ?? 'h-100')}>
                <div className={'p-2 mb-2 h-100'}>

                    <a className=" outline-none blogsbox-edit-shop  h-100 d-flex flex-column" style={{ boxShadow: 'rgb(100 100 111 / 20%) 0px 7px 29px 0px', backgroundColor: '#fff', borderRadius: 10, border: '1px solid #eee' }}>
                        <Link href={"/product/" + this.props.item?._id + '?product=' + this.props.item?.slug}>
                            <div className='flex-1'>
                                <img src={imageAddress(this.props.item?.images, null, 'small')} className="productimg-shop" />
                                <div className='px-2'>
                                    <p className="blogsbox-p2 mt-2" style={{ color: '#102030', fontSize: 15, fontWeight: '500' }}>{this.props.item?.title}</p>

                                    {this.props.item?.available && (
                                        <div className='d-flex flex-wrap align-items-center'>
                                            <p className="pricedes my-1" style={{ color: '#39f' }}>{this.props.item?.priceSttings?.currency}{priceStandardView(this.props.item?.price)}</p>
                                            {this.props.item?.priceSttings?.priceBeforeDiscount && (this.props.item?.priceSttings?.priceBeforeDiscount != this.props.item?.price) && (
                                                <p className="pricedes mx-1 mt-1" style={{ textDecoration: 'line-through', fontSize: 12, color: '#9ab' }}>{priceStandardView(this.props.item?.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                            )}
                                        </div>
                                    )}

                                    {!this.props.item?.available && (

                                        <div className='flexc'>
                                            <div className='mt-2 mb-1 px-2 py-1' style={{ backgroundColor: '#eee', borderRadius: 4 }}>
                                                <p style={{ fontSize: '14px', fontWeight: '500', color: 'rgb(0,0,0,0.8)' }}>{translate("unavailable")}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className='flexc flex-wrap mb-1'>
                                        {this.props.item?.categories?.map((prop, index) => {
                                            return (
                                                <div className='mrd-2'>
                                                    <a>
                                                        <p className='mt-1 ' style={{ backgroundColor: '#f2f6f8', padding: '2px 5px', borderRadius: 4, fontSize: '12px', color: '#789', fontWeight: '400' }}>{prop.values?.title}</p>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className='flexc flex-wrap mb-1'>

                                        {this.props.item?.brand && (
                                            <p className='title-blog-box mrd-2' style={{ backgroundColor: '#f2f6f8', padding: '2px 5px', borderRadius: 4, fontWeight: 400 }}>{this.props.item?.brand?.values?.name}</p>
                                        )}

                                        {this.props.item?.technologies?.map((tech, index) => {
                                            return (
                                                <div className='flexc'>
                                                    {index == 0 &&(
                                                        <p className='mrd-2' style={{color:'#9ab'}}>-</p>
                                                    )}
                                                    <p className='title-blog-box mrd-2' style={{ backgroundColor: '#f2f6f8', padding: '2px 5px', borderRadius: 4, fontWeight: 400 }}>{tech}</p>
                                                </div>
                                            )
                                        })}


                                    </div>


                                </div>
                            </div>
                        </Link>



                        <div className='for-react-stars mt-3 px-1 pt-3' style={{ borderTop: '1px solid #eee' }}>
                            <Link href={"/product/" + this.props.item?._id + '?product=' + this.props.item?.slug}>
                                <span style={{ color: '#39f' }}>{translate('View in shop')}  </span>
                            </Link>
                            {/* <div className='flexc' onClick={() => this.addToCart()}>
                                <span style={{ color: '#0481FF' }}>{translate('Add to cart')}  </span>
                                <img src='/images/icons/shopping-cart.png' className='ml-2' style={{ width: "20px", height: "20px" }} />

                            </div> */}
                        </div>

                    </a>



                </div>
            </div>
        )
    }
}


export default ProductBox;
