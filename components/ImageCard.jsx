import React from 'react';

import Link from 'next/link';



export const ImageCard = () => {
    return (
        <div className="container">
            <div className="wrapper">
            <div className="card-text-title">
                        <h2 className="card-text-inner">Grow TALL</h2>
                        <p className="card-text-inner-para">Ready to embrace the TALL (Tailwind, AlpineJS, Laravel, Livewire) stack?</p>

                    </div>

                <div className="card-image-main">
                    <div className="row">
                    <div className="col-lg-6 col-sm-12  card-image-content">
                        <div className="card-image-content-with-img">
                            <div className="img-card-box">
                                <img src="/assets/testimg.jpg" alt="" className="img-card-svg" />
                            </div>
                            <div className="content-card-box">
                                <div className="content-card-box-inner">
                                <h4>Rebuild GitHub with Tailwind</h4>
                                <p className="txt-content-card-para">
                                    One of the best ways to improve your 
                                    CSS is by rebuilding existing UIs.
                                     You’ll notice common patterns that occur
                                      and the best way to handle them.
                                       In this first entry, we'll</p>
                                    <div className="small-card-icon">
                                        <div className="small-card-txt-icon">
                                        <i class="fab fa-audible"></i>
                                            <span> 5 lesson</span>
                                        </div>
                                        <div className="small-card-txt-icon">
                                        <i class="fas fa-clock cardimg"></i>
                                            <span>1h 26m</span>
                                        </div>
                                    </div>
                                    <div className="btn-for-small-card">
                                    <div className="small-btn-inner">
                                <i class="far fa-play-circle"></i>
                                <Link href={"/shop"}>
                                <button  className="start-btn">Start Series</button>
                                </Link>
                                </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-6card-image-content for-edits">
                    </div> */}

                    <div className="col-lg-6 col-sm-12 card-image-content">
                        <div className="card-image-content-with-img">
                            
                            <div className="content-card-box order-main">
                                <div className="content-card-box-inner">
                                <h4>Rebuild GitHub with Tailwind</h4>
                                <p className="txt-content-card-para">
                                    One of the best ways to improve your 
                                    CSS is by rebuilding existing UIs.
                                     You’ll notice common patterns that occur
                                      and the best way to handle them.
                                       In this first entry, we'll</p>
                                    <div className="small-card-icon">
                                        <div className="small-card-txt-icon">
                                        <i class="fab fa-audible"></i>
                                            <span> 5 lesson</span>
                                        </div>
                                        <div className="small-card-txt-icon">
                                        <i class="fas fa-clock cardimg"></i>
                                            <span>1h 26m</span>
                                        </div>
                                    </div>
                                    <div className="btn-for-small-card">
                                    <div className="small-btn-inner">
                                <i class="far fa-play-circle"></i>
                                <Link href={'/series'}>
                                <button  className="start-btn">Start Series</button>
                                </Link>
                                </div>
                                    </div>
                                    </div>
                            </div>
                            <div className="img-card-box order">
                                <img src="/assets/testimg.jpg" alt="" className="img-card-svg" />
                            </div>
                        </div>
                    </div>
                 
                    
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default ImageCard;