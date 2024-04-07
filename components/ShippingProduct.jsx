import React, { Component } from 'react'
import Collapsible from 'react-collapsible'
import { checkTranslation, imageAddress, priceStandardView } from '../utils/useful'

class ShippingProduct extends Component {

    state = {
        selectedIndex: null,
        openSummary: true,

    }


    openSummary = () => {
        this.setState({ openSummary: !this.state.openSummary })
    }

    render() {



        return (
            <div className='' style={{ border: '1px solid rgb(0,0,0,0.1)', boxShadow: '0px 0px 15px #10101010', borderRadius: "8px" }}>
                <div className="d-flex flex-1 justify-content-between align-items-center py-3 px-3 mt-2" style={{ backgroundColor: "#fff", borderRadius: "8px" }} onClick={() => this.openSummary()}>
                    <span className='px-1' style={{ textTransform: "capitalize", fontWeight: "600", fontSize: "16px" }}>{checkTranslation('{{lang}}order-summary')}</span>
                    <span className='cursor-pointer'><i style={{ fontSize: "20px", transform: this.state.openSummary ? 'rotate(180deg)' : 'rotate(0)' }} className="fas fa-angle-down"></i></span>
                </div>
                <Collapsible open={this.state.openSummary ? true : false}>

                    <table className="main-table w-100 px-3">
                        <thead className='w-100'>
                            <tr className="for-border-test">
                                <th className="title-for-head">{checkTranslation('{{lang}}Product')}</th>
                                <th className="title-for-head">{checkTranslation('{{lang}}Price')}</th>
                                <th id="mobile-hide" className="title-for-head">{checkTranslation('{{lang}}Quantity')}</th>
                                <th id="mobile-hide" className="title-for-head" style={{ textAlign: 'center' }}>{checkTranslation('{{lang}}Total')}</th>

                            </tr>
                        </thead>
                        <tbody className="body-table w-100">
                            {this.props?.data?.map((item, index) => {
                                console.log(item)
                                if (item?.data) {
                                    return (
                                        <tr className='under-sub-section-table' key={index}>
                                            <td className='d-flex align-items-center justify-content-start'>
                                                <img src={imageAddress(item?.data?.images, null, 'small')} style={{ width: '60px', }} />
                                                <p className='ml-3' style={{ fontSize: '14px', fontWeight: '400', color: '#000000', }}>{item?.data?.title}</p>
                                            </td>
                                            <td id="mobile-hide" style={{ fontSize: 14 }}>
                                                {(item.data?.priceSttings?.discount?.value != null && item.data?.priceSttings?.discount?.value != 0) && (
                                                    <p style={{ fontSize: 14, textDecoration: 'line-through', color: "#ee5050" }}>{priceStandardView(item.data?.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                                )}
                                                {item?.data?.priceSttings?.currency} {priceStandardView(item?.data?.price)}</td>
                                            <td colSpan={1} className='p-0'>
                                                <div className="quantity-box-cart-no-border">
                                                    {/* <span onClick={() => this.minusNum(item.data)} style={{ cursor: 'pointer' }}><i className="fas fa-minus"></i></span> */}
                                                    <span className='px-2' style={{ fontSize: 14, color: "#000" }}>{item.count}</span>
                                                    {/* <span onClick={() => this.plusNum(item.data)} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i></span> */}


                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center', fontSize: 14 }}>{item?.data?.priceSttings?.currency} {priceStandardView(item?.data?.price * item?.count)}</td>

                                            {/* <td id="mobile-hide"><i className='fas fa-times cursor-pointer'></i></td> */}




                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr className='under-sub-section-table' key={index}>
                                            <td className='d-flex align-items-center justify-content-start'>
                                                <img src={imageAddress(item?.product?.images, null, 'small')} style={{ width: '60px', }} />
                                                <p className='ml-3' style={{ fontSize: '14px', fontWeight: '400', color: '#000000', }}>{item?.product?.title}</p>
                                            </td>
                                            <td id="mobile-hide" style={{ fontSize: 14 }}>
                                                {(item.priceSttings?.discount?.value != null && item.priceSttings?.discount?.value != 0) && (
                                                    <p style={{ fontSize: 14, textDecoration: 'line-through', color: "#ee5050" }}>{priceStandardView(item.data?.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                                )}
                                                {item?.priceSttings?.currency} {priceStandardView(item?.price)}
                                            </td>
                                            <td colSpan={1} className='p-0'>
                                                <div className="quantity-box-cart-no-border">
                                                    <span className='px-2' style={{ fontSize: 14, color: "#000" }}>{item.count}</span>
                                                </div>
                                            </td>
                                            <td style={{ textAlign: 'center', fontSize: 14 }}>{item?.priceSttings?.currency} {priceStandardView(item?.price * item?.count)}</td>
                                        </tr>
                                    )
                                }
                            })}

                        </tbody>
                    </table>

                    {/* <div onClick={() => this.setState({ selectedIndex: index })} className="px-1 py-1 my-2" style={{ justifyContent: 'space-between', }}>
                           
                            <div className='p-3 d-flex w-100' style={{ border: '1px solid rgb(0,0,0,0.1)', borderRadius: '8px', backgroundColor: this.state.selectedIndex == index ? '#F8F9FF' : '#fff', boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px' }}>

                                <div className="d-flex align-items-center mx-2 flex-1" >
                                    <div className="flex-1 px-2" style={{ flex: 1 }}>
                                        <div className="flexc my-2" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                            <img src={imageAddress(item?.data?.images, null, 'small')} style={{ width: '100px', }} />
                                        </div>
                                    </div>
                                    <div className="my-2 w-100 d-flex flex-column align-items-start" style={{ cursor: 'pointer' }}>
                                        <span className='ml-2' style={{ color: "#333333", fontSize: "16px", fontWeight: "600" }}>{item?.data?.title}</span>
                                        <div className='ml-2 my-2 flexc' style={{ color: "#62666d", fontSize: "12px" }}>
                                            <img src='/images/icons/guarantee.png' width={'15px'} style={{ filter: "invert(60%)" }} />
                                            <span className='ml-1'>Warranty 18</span>

                                        </div>
                                        <div className='ml-2 my-2 flexc' style={{ color: "#62666d", fontSize: "12px" }}>
                                            <img src='/images/icons/platform.png' width={'15px'} style={{ filter: "invert(60%)" }} />
                                            <span className='ml-1'>iotsmile platform</span>

                                        </div>
                                        <div className='ml-2 my-2 flexc' style={{ color: "#62666d", fontSize: "12px" }}>
                                            <div className="quantity-box-cart-shipping-page">
                                                <span onClick={() => this.minusNum(item.data)} style={{ cursor: 'pointer' }}><i className="fas fa-minus"></i></span>
                                                <span className='px-2' style={{ fontSize: 14 }}>{item.count}</span>
                                                <span onClick={() => this.plusNum(item.data)} style={{ cursor: 'pointer' }}><i className="fas fa-plus"></i></span>
                                            </div>

                                            <div className='ml-2 flexc' style={{ color: "#62666d", fontSize: "12px" }}>
                                                <img src='/images/icons/trash.png' width={'15px'} style={{ filter: "invert(60%)" }} />
                                                <span className='ml-1'>delet</span>

                                            </div>


                                        </div>
                                        <div className='ml-2 d-flex justify-content-end w-100' style={{ color: "#62666d", fontSize: "12px" }}>
                                            <img src='/images/icons/trash.png' width={'15px'} style={{ filter: "invert(60%)" }} />
                                            <span style={{ color: "#222", fontSize: "18px" }} className='ml-1'>{item?.data?.priceSttings?.currency} {priceStandardView(item?.data?.price * item?.count)}</span>

                                        </div>


                                    </div>
                                </div>


                            </div>

                        </div> */}

                </Collapsible>

            </div>
        )
    }
}


export default ShippingProduct;
