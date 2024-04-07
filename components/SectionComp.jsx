import Link from 'next/link';
import React, { useState, useRef } from 'react';
import Collapsible from 'react-collapsible';
import { msToHMS } from '../utils/useful';


const SectionComp = ({ item, title, titlesec, titlethird, titlefour, titlefive, titlesix, titleseven }) => {

    const parentRef = useRef();

    // if (parentRef.current) console.log(parentRef.current.scrollHeight);
    const [showSection, setShowSection] = useState(false);



    const openSection = () => {

        setShowSection(prev => !prev)
        console.log("true");

    }

    return (
        <>

            <div className="section-div" onClick={openSection}>
                <div className="text-section">

                    <h3>
                        <span id="sec">{`${title}`}</span>
                        <span id="vertical-line" className='mx-2'> | </span>
                        <span id="second">{`${titlesec}`}</span>
                    </h3>
                </div>
                <div className="text-section hidden">
                    {/* <i className={showSection ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i> */}
                    <div className='flexcc' style={{ backgroundColor: 'rgb(226, 226, 226)', padding: '5px ', borderRadius: 4 }}>
                        <div className={'flexcc ' + (showSection ? 'rrotate-90' : '')} style={{ transition: 'all 0.5s' }}>
                            <img src='/images/nexts.png' height={18} className={'rreverse '}  />

                        </div>
                    </div>
                </div>
            </div>

            <Collapsible open={showSection ? true : false} className="w-100">
                <div className='current-section-content w-100' >
                    <div className="card-section-main">
                        <div className="card-section-items mt-2">
                            <div className="div-number-circ">
                                <div className="div-for-number">
                                    {`${titlethird}`}
                                </div>
                                <div className="check-box">
                                    <i class="fas fa-check check-item"></i></div>
                            </div>

                            {titleseven && (
                                <div className="for-episode-and-clock mt-2" style={{ whiteSpace: 'nowrap' }}>
                                    {/* <span style={{fontSize:"14px",fontWeight:"400",textTransform:"capitalize",color:"#000"}}>{`${titlesix}`}</span> */}
                                    <div className="minutes ">
                                        <i class="fas fa-clock section-clock mrd-2"></i>
                                        <span id="minute">{`${msToHMS(titleseven)}`}</span>
                                    </div>

                                </div>
                            )}

                        </div>
                        <div className="card-section-items w-100">
                            <div className="card-discription-item">
                                {/* <h4 className='my-2' style={{ color: "#7B00F7" }}>{`${titlefour}`}</h4> */}
                                <p className='my-2' style={{ fontSize: "16px", fontWeight: "400" }}>{`${titlefive}`}</p>


                                <div className="update-btn ">
                                    <div className="update-btn-inner mx-0 mt-0">
                                        <i class="far fa-play-circle"></i>
                                        <Link href={"/academy/lesson/" + item._id}>
                                            <a className="start-btn mld-2">View lesson</a>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </Collapsible>

        </>

        // 

        /* // </Collapse> */








        // </>

        /* <div className="current-section-content" ref={parrentRef}
                style={
                    showSection ? { height: "0px" } :
                        { height: parrentRef.current.scrollHeight + "px" }}
            >
                <div className="card-section-main">
                    <div className="card-section-items">
                        <div className="div-number-circ">
                            <div className="div-for-number">
                                {`${titlethird}`}
                            </div>
                            <div className="check-box">
                                <i class="fas fa-check check-item"></i></div>
                        </div>
                    </div>
                    <div className="card-section-items">
                        <div className="card-discription-item">
                            <h4>{`${titlefour}`}</h4>
                            <p>{`${titlefive}`}</p>
                            <div className="for-episode-and-clock">
                                <span>{`${titlesix}`}</span>
                                <div className="minutes">
                                    <i class="fas fa-clock section-clock"></i>
                                    <span id="minute">{`${titleseven}`}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div> */




    )
}

export default SectionComp;
