import React, { Component } from 'react'

import Link from 'next/link';
import { imageAddress } from '../utils/useful';
import moment from 'jalali-moment';

class Banner extends Component {




    render() {
        return (
            <div className="container-fluid banner">
                <div className="wrapper banner">
                <div className='container'>

                    <div className="main-banner">
                        <div className="banner-items w-100">
                            <div className="large-img-banner">
                                <img src={imageAddress(this.props.course?.image,null,'medium')} alt="" className="series-img" />
                            </div>
                        </div>
                        <div className="banner-items center-banner">
                            <div className="title-center-banner">
                                <div className="box-title-banner-head mb-2">
                                    <h2 className="title-banner-head">
                                        {this.props.course?.title}
                                    </h2>
                                </div>
                                {/* <div className="episode-time-box">
                                    <div className="episode-item">
                                        <i className="fab fa-audible mobile-hide"></i>

                                        <span>65 episode</span>
                                    </div>
                                    <div className="hour-item">
                                        <i className="fas fa-clock banner-edit"></i>
                                        <span className='ml-1'>9h 4m</span>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="title-txt-head-banner mb-3">
                                <span className="title-banner-txt">Version : Laravel 8</span>
                            </div> */}
                            <div className="paragraph-main-center-banner">
                                <p className="txt-center-banner">{this.props.course?.description}</p>
                            </div>
                            {/* <div className="btns-banner">
                                <Link href={"/sidebarvideo"}>
                                    <button className="begin-btn">Begin</button>
                                </Link>
                                <div className="bookmark-icon">
                                    <button className="watch-btn">
                                        <i class="fas fa-bookmark"></i>
                                        <span className='ml-1'>add to ...</span>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                        <div className="banner-items w-100">
                            <div className="extract-form">
                                <div className="number-extract w-100">
                                    {/* <div className="circle-item">
                                        <div className="for-number-circle">
                                            65
                                        </div>
                                    </div> */}
                                    <div className="text-under-number">
                                        {/* <h4 className="latest-episode m-0">LATEST EPISODE IN THIS SERIES</h4> */}
                                        <p className="added">Added {moment(this.props.course?.cDate).format('MMM DD, YYYY')}</p>
                                    </div>


                                </div>
                                <div className="title-under-number">
                                <div className="episode-time-box my-2 mx-0">
                                    <div className="episode-item">
                                        <i className="fab fa-audible mobile-hide"></i>

                                        <span>{this.props.course?.lessons} lesson</span>
                                    </div>
                                    <div className="hour-item">
                                        <i className="fas fa-clock banner-edit"></i>
                                        <span className='ml-1'>{this.props.course?.difficulty}</span>
                                    </div>
                                </div>
                                    {/* <p className="center-title-text">In this episode, we'll add an account dropdown menu to the navigation area, and then extend the...</p> */}
                                    <div className="box-watch-btn">
                                        <Link href={"/academy/lesson/"+this.props.lessons[0]?._id}>
                                            <a>
                                            <button className="watch-btn-inner">
                                                <i class="far fa-play-circle"></i>
                                                <span>Start Course</span>
                                            </button>
                                            </a>
                                        </Link>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    </div>
                    <div className="under-main-banner">

                    </div>

                </div>
            </div>
        )
    }
}

export default Banner;
