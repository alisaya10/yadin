import React, { Component } from 'react'
import Link from 'next/link';

class SmallCard extends Component {

    state = {
        courseData:[{}]

    }

    render() {

        return (
            <div className="container mb-3">

                <div className="row ">
                    {this.state?.courseData?.map((prop,index) => {
                        return(
                            <div className="col-xl-4 col-lg-3 col-sm-12  ">
                            <div className='small-card-action px-3'>
                                <div className="small-card-inner-action with-color">
                                    <div className="box-for-items-small-card">
                                        <div className="for-btn-framework">
                                            <span href="" className="txt-btn-frmwork">Course</span>
                                        </div>
                                        <div className="for-img-small-card">
                                            <img src="/assets/smallcard6.jpg" alt="" className="edit-small-card-img" />
                                        </div>
                                        <div className="card-difficulty">
                                            <div className="txt-difficulty">
                                                <p>Intermediate Difficulty</p>
                                            </div>
                                            <div className="difficulty-degree">
    
                                            </div>
                                        </div>
    
    
                                    </div>
                                </div>
                                <div className="small-card-inner-action">
                                    <div className="small-card-inner-main-action px-2 py-1">
                                        <div className="head-txt-small-card-title">
                                            <h4 className="title-txt-h my-1">livewire Basics</h4>
                                        </div>
                                        <div className="my-2">
                                            <p className="txt-parag">Livewire has quickly become one of
                                                the most popular package for building
                                                Laravel applications. It allows you to
                                                create dynamic components</p>
                                        </div>
                                        <div className="tiny-icon-small-card my-2">
                                            {/* <div>
                                            <i class="fab fa-audible tiny"></i>
                                            <span className='ml-1'>14 lessons</span>
                                            </div> */}
                                            <div>
                                                <i class="fab fa-audible tiny"></i>
                                                <span className='ml-1'>difficulty</span>
                                            </div>
                                            <div className='ml-3'>
                                                <i class="fab fa-audible tiny"></i>
                                                <span className='ml-1'>14 lessons</span>
                                            </div>
    
                                        </div>
    
                                        <Link href={"/academy/course/"+prop._id}>
                                            <button className="play-up">
                                                <i class="far fa-play-circle"></i>
                                                <a href="">View course</a>
                                            </button>
                                        </Link>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                 
                </div>


            </div>
        )
    }
}


export default SmallCard
