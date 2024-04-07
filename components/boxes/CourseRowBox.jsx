import React, { Component } from 'react'
import Link from 'next/link';
import { checkTranslation, imageAddress, priceStandardView, translate } from '../../utils/useful';


class CourseRowBox extends Component {

    state = {

    }


    render() {

        const desc = this.props.item?.description.slice(0, 100);


        return (
            <div className="w-100 ">
                <Link href={{ pathname: '/academy/course/' + this.props.item?._id }} >
                    <a>
                        <div className=" mb-1 outline-none h-100 " >

                            <div className="w-100 h-100 d-flex " style={{ padding: '10px 2px 15px 2px', borderRadius: '4px' }} >
                                <div className="px-1 pt-1 d-flex" style={{}}>
                                    <div className="mx-2">
                                        <img src={imageAddress(this.props.item?.image, null, 'small')} style={{ objectFit: "cover", borderRadius: '50% ', height: '100px', width: '100px', }} />

                                        {/* <img src={imageAddress(this.props.item?.image)} style={{ borderRadius: '4px ', width: '150px', }} /> */}
                                    </div>
                                    <div className="px-3   flex-column  ">
                                        <p className="" style={{ fontSize: '16px', fontWeight: '500', maxWidth: '260px' }}>{this.props.item?.title}</p>

                                        <p className='mb-1' style={{ fontSize: '15px', fontWeight: '300' }}>{desc} {this.props.item?.description?.length > 100 ? '...':''}</p>
                                        <div className="d-flex">
                                            <div>
                                                <i style={{ opacity: .4 }} className="fas fa-layer-group"></i>
                                                <span style={{ fontSize: "13px" }} className='mld-2'>{this.props.item?.difficulty}</span>
                                            </div>
                                            <div className='mld-3'>
                                                <i style={{ opacity: .4 }} className="fab fa-audible"></i>
                                                <span style={{ fontSize: "13px" }} className='mld-2'>{this.props.item?.lessons ?? 0} {checkTranslation('{{lang}}lessons')}</span>
                                            </div>

                                        </div>




                                    </div>

                                </div>

                            </div>
                        </div>
                    </a>
                </Link>
            </div>


        )
    }
}


export default CourseRowBox;
