import React, { Component } from 'react'
import Collapsible from 'react-collapsible';

class Ads extends Component {

    state = {
        videocontent: false,
    }


    showDetail = () => {
        this.setState({ videocontent: !this.state.videocontent })

    }


    render() {

        return (
            <>
                <div className="container p-0">
                    <div className="wrapper" style={{ backgroundColor: "#f2f6f8", border: "solid 1px rgba(0,0,0,0.09)",cursor: "pointer", borderRadius: ".9rem", width: "99%" }}>
                        <div onClick={() => this.showDetail()} className="div-for-ads m-0  pl-3" style={{borderBottom:this.state.videocontent ? "solid 1px #ddd" : 'transparent'}}>
                            <span style={{ fontSize: "18px", fontWeight: "500" }}>Course detail</span>
                            <i  style={{  fontSize: "24px" }} className='mr-3 fas fa-angle-down'></i>
                        </div>

                        <Collapsible open={this.state.videocontent ? true : false}>
                            <div className="container-fluid ">
                                <div className="wrapper ">
                                    <div className="main-banner">
                                        <div className="banner-items">
                                            <div className="large-img-banner">
                                                <img src="/assets/smallcard6.jpg" alt="" className="series-img" />
                                            </div>
                                        </div>
                                        <div className="banner-items center-banner">
                                            <div className="title-center-banner">
                                                <div className="box-title-banner-head">
                                                    <h2 className="title-banner-head m-0" style={{color:"#000",fontWeight:"400"}}>
                                                        Laravel 8 From Scratch
                                                    </h2>
                                                </div>
                                                <div className="episode-time-box">
                                                    <div className="episode-item">
                                                        <i className="fab fa-audible mobile-hide"></i>

                                                        <span>65 episode</span>
                                                    </div>
                                                    <div className="hour-item">
                                                        <i className="fas fa-clock banner-edit"></i>
                                                        <span className='ml-1'>9h 4m</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="paragraph-main-center-banner">
                                                <p className="txt-center-banner" style={{color:"#000"}}>We don't learn tools for the sake of learning tools.
                                                    Instead, we learn them because they help us accomplish a particular goal.
                                                    With that in mind, in this series, we'll use
                                                    the common desire for a blog - with categories,
                                                    tags, comments, email notifications, and more - as our goal. Laravel will
                                                    be the tool that helps us get there.
                                                    Each lesson, geared toward newcomers to Laravel,
                                                    will provide instructions and techniques
                                                    that will get you to the finish line.</p>
                                                <p className="txt-center-banner" style={{color:"#000"}}>This version of our popular
                                                    Laravel From Scratch series was recorded in 2021,
                                                    and uses Laravel 8.</p>
                                            </div>

                                        </div>


                                    </div>
                                    <div className="under-main-banner">

                                    </div>

                                </div>
                            </div>
                        </Collapsible>
                    </div>

                </div>
            </>
        )
    }
}


export default Ads;
