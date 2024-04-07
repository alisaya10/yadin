import React, { Component } from 'react'


import Link from 'next/link';
import { checkTranslation, imageAddress, msToHMS } from '../../utils/useful';
import moment from 'jalali-moment'





class LessonsBox extends Component {

    // recentlyItems = [
    //     { title: 'Course', undertitle: 'php testing jargon', paragraph: 'There s no two ways about it: terminology in the testing world is incredibly overwhelming. Mocks, stubs, and dummies oh my! Let s see if we can cut through the noise. Come along as, bit by bit, we break all of these confusing concepts down into s... ', difficaulty: 'intermediate difficulty', number: '13', hour: '4h 50min' },
    //     // { title: 'framework', undertitle: 'php testing jargon', paragraph: 'There s no two ways about it: terminology in the testing world is incredibly overwhelming. Mocks, stubs, and dummies oh my! Let s see if we can cut through the noise. Come along as, bit by bit, we break all of these confusing concepts down into s... ', difficaulty: 'intermediate difficulty', number: '13', hour: '4h 50min' },
    //     // { title: 'framework', undertitle: 'php testing jargon', paragraph: 'There s no two ways about it: terminology in the testing world is incredibly overwhelming. Mocks, stubs, and dummies oh my! Let s see if we can cut through the noise. Come along as, bit by bit, we break all of these confusing concepts down into s... ', difficaulty: 'intermediate difficulty', number: '13', hour: '4h 50min' },
    // ];


    render() {
        return (
            <div className="container-fluid mb-4" >
                <div className="wrapper">
                    {/* <div className="update-text-title">
                        <h2 className="" style={{ textAlign: 'center', fontSize: '22px', color: '#333333', fontWeight: '600' }} >Recently Updated</h2>
                        <p style={{ textAlign: 'center', fontSize: '15px', color: '#666', fontWeight: 400 }}>Curious what's new at Laracasts? The following series have been recently updated.</p>

                    </div> */}

                    <div className="update-main row m-0">
                        <div className="update-main-wrapp col-xl-9 col-lg-9 col-md-6 col-sm-12 col-12 order-2 order-md-1">
                            <div className="framework-update">
                                <div className='d-flex'>
                                    <div className="framework-update-inner">
                                        {this.props.data?.course[0] && (
                                            <Link href={'/academy/course/' + this.props.data.course[0]._id}>
                                                <a className="text-framework">{this.props.data.course[0]?.title}</a>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="update-text">
                                    <Link href={"/academy/lesson/" + this.props.data._id}>
                                        <a>
                                            <h3 className="update-title mb-3 mt-3">{this.props.data.title}</h3>
                                        </a>
                                    </Link>
                                    <p className="update-title-text">
                                        {this.props.data.description}

                                    </p>
                                </div>

                            </div>
                            <div className="small-item px-4">
                                <div className="small-item-main px-2 ">
                                    <div className="mrd-4">
                                        <div className="first-item">
                                            <span className='text-normal'><i class="fas fa-stream text-normal mrd-1"></i></span>
                                            <p id="txt" className='mld-2'>{checkTranslation('{{lang}}lesson')} {this.props.data.priority}</p>
                                        </div>
                                    </div>

                                    {this.props.data?.video && (
                                        <div className=" mrd-4">
                                            <div className="first-item">
                                                <span><i class="fas fa-video text-normal mrd-1"></i></span>
                                                <p className="small-text-item  "><a href="" className="small-link-txt ">{msToHMS(this.props.data?.video?.duration)}</a></p>
                                            </div>
                                        </div>
                                    )}


                                    <div className="extera-item ">

                                        <div className="first-item">
                                            <span className='text-normal'><i class="fas fa-clock text-normal mrd-1"></i></span>
                                            <p id="txt" className='mld-2'>{moment(this.props.data.cDate).format('YYYY, MMM DD')}</p>
                                        </div>
                                        {/* <div className="first-item">
        <span><i class="fas fa-book-open"></i></span>
        <p className="small-text-item"><a href="" className="small-link-txt">{this.props.data.number} Lessons</a></p>
    </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="update-btn px-4">
                                <Link href={"/academy/lesson/" + this.props.data._id}>

                                    <a className="update-btn-inner px-4">
                                        <i class="far fa-play-circle"></i>
                                        <span className="start-btn mld-2" style={{ whiteSpace: 'nowrap' }}>{checkTranslation('{{lang}}view-lesson')}</span>
                                    </a>
                                </Link>

                            </div>

                        </div>
                        <div className="update-main-wrap col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 p-0 order-1 order-md-2">
                            <div className="for-img-aside-recent">
                                <img src={imageAddress(this.props.data.course[0].image, null, 'medium')} alt="" className="edit-recent-img" />
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        )
    }
}
export default LessonsBox;