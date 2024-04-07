import React, { useState ,useEffect} from 'react'
import Collapsible from 'react-collapsible';
import Link from 'next/link';

// import Link from 'next/link';

import NavbarComp from './NavbarComp';



const SideBarBrowse = ({ props, lessons, lesson }) => {



    const [showBrowse, setShowBrowse] = useState(props);
    const [showDetails, toggleDetails] = useState(false);
    const [showInformation, toggleInformation] = useState(true);

    const size = useWindowSize();



    const openBrowse = () => {
        setShowBrowse(prev => !prev);
    }



    return (
        <div className="main-aside-part-section pt-4" >
            <Collapsible open={showInformation || size?.width >= 768}>
                <div className='w-100 mb-2'>
                    <div className='row p-0 m-0'>

                        <div className="col-12 ">
                            <div className=''>
                                <div className="small-card-inner-action with-color">
                                    <div className="box-for-items-small-card">
                                        <div className="for-btn-framework">
                                            {/* <span href="" className="txt-btn-frmwork">Course</span> */}
                                        </div>
                                        <div className="for-img-small-card px-3">
                                            <img src="/assets/smallcard6.jpg" alt="" className="" style={{ borderRadius: "50%", width: "150px", height: "150px" }} />
                                        </div>
                                        <div className="card-difficulty">
                                            <div className="txt-difficulty">
                                                {/* <p>Intermediate Difficulty</p> */}
                                            </div>
                                            <div className="difficulty-degree">

                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div className="small-card-inner-action">
                                    <div className="small-card-inner-main-action px-2 py-1">
                                        <div className="head-txt-small-card-title">
                                            <h4 className="title-txt-h my-1">{lesson?.course?.title}</h4>
                                        </div>
                                        <Collapsible open={showDetails}>
                                            <div>
                                                <div className="my-2">
                                                    <p className="txt-parag">{lesson?.course?.description}</p>
                                                </div>
                                                <div className="tiny-icon-small-card my-2">
                                                    {/* <div>
                                            <i class="fab fa-audible tiny"></i>
                                            <span className='ml-1'>14 lessons</span>
                                            </div> */}
                                                    <div>
                                                        <i class="fab fa-audible tiny"></i>
                                                        <span className='ml-1'>{lesson?.course?.difficulty}</span>
                                                    </div>
                                                    <div className='ml-3'>
                                                        <i class="fab fa-audible tiny"></i>
                                                        <span className='ml-1'>{lesson?.course?.lessons} lessons</span>
                                                    </div>

                                                </div>
                                            </div>
                                        </Collapsible>

                                        <button onClick={() => toggleDetails(!showDetails)} className='p-0' style={{ color: '#7b00f7' }}>{showDetails ? "Hide" : "Show"} Details</button>


                                        {/* <Link href={"/"}>
                                            <button className="play-up">
                                                <i class="far fa-play-circle"></i>
                                                <a href="">View lesson</a>
                                            </button>
                                        </Link> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="exit-item-part" onClick={openBrowse}>
                <div className="logo-with-title-first" >
                    <div className="small-logo">
                        <img src="/assets/book.png" alt="education" className="small-logo-edit" />
                    </div>

                    <h3 className="title-head-txt pl-2">Browse all series</h3>

                </div>
                <div className="exit-icon" >
                    <div href={" "}>
                        <i className={showBrowse ? 'fas fa-minus edit-on-hover' : 'fas fa-plus edit-on-hover'}></i>
                       
                    </div>
                </div>

            </div> */}
                    {/* <div className="line-thin-box">
                <hr className="line-thin" />
            </div> */}

                    <>

                        {/* <div className="circle-side-bar">
                        <div className="logo-with-title">
                            <div className="item-lesson-logo pl-2">
                                <img src="/assets/laravel.png" alt="" className="lesson-logo" />
                            </div>
                        </div>
                        <div className="logo-with-title extra ml-2">
                            <div className="">
                                <div className="title-txt-sidebar">
                                    <h3 className="txt-title-sidebar">Laravel 8 from scratch</h3>
                                </div>
                                <div className="episode-with-time">
                                    <div className="episode-item-sidebar">
                                        <i class="fab fa-audible icon-in-sidebar"></i>

                                        <span className="edit-txt-in-side">65 episode</span>
                                    </div>
                                    <div className="episode-item-sidebar ml-2">
                                        <i className="fas fa-clock" id="clock"></i>

                                        <span className="edit-txt-in-side">9h 15m</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div> */}
                        <div className="line-thin-box-second">
                            <hr className="just-for-line" />
                        </div>
                        {lessons?.map((item, index) => {
                            return (

                                <NavbarComp
                                    index={index}
                                    key={index}
                                    item={item}
                                    lesson={lesson}
                                />
                            )
                        })}



                    </>
                </div>
            </Collapsible>

            <div className="col-12 mb-4 mx-2 d-block d-md-none">
                {/* <div>Course Information</div> */}
                <button onClick={() => toggleInformation(!showInformation)} className='p-0' style={{ color: '#7b00f7', fontSize: 15 }}>{showInformation ? "Hide" : "Show"} Course Information</button>

            </div>



        </div>
    )
}



function useWindowSize() {
   
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {
            // Handler to call on window resize
            function handleResize() {
                // Set window width/height to state
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });

            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }


export default SideBarBrowse
