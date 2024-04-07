import React, { useState, useRef } from 'react'
import Link from 'next/link'
// import Collapsible from "./Collapsible";

// import { NavbarCompMap } from './NavbarCompMap';
// import NavSecDiscription from './NavSecDiscription';
// import { NavSecDisMap } from './NavSecDisMap';

// const NavbarCompMap = [
//     {
//         section:'section 1',
//         titleLesson:'Prerequisites and ...',

//     },
//     {
//         section:'section 2',
//         titleLesson:'The Obligatory To ...',

//     },
//     {
//         section:'section 3',
//         titleLesson:'Fetching Data...',

//     },
//     {
//         section:'section 4',
//         titleLesson:'GitHub Issues..',

//     },
// ]
const NavbarComp = ({ item,index,lesson }) => {

    const [showClose, setShowClose] = useState(false);
    const parentRef = useRef();

    const closeSec = () => {
        setShowClose(prev => !prev)
    }

    return (
        <>
            {/* {NavbarCompMap.map((titles,index) => { */}

            <>
                <div className="section-div-small">
                    <div className="section-div-small-item" onClick={closeSec}>
                        <div className="text-section-small">
                            <Link href={'/academy/lesson/'+item._id}>
                            <a className='my-1' style={{color:item._id == lesson?._id ? '#7b00f7':'#000'}}>
                                <span id="sec-small" style={{color:item._id == lesson?._id ? '#7b00f7':'#000'}}>{index+1}</span>
                                <span id="vertical-line-small" style={{color:item._id == lesson?._id ? '#7b00f7':'#000'}}> . </span>
                                <span id="second-small" style={{color:item._id == lesson?._id ? '#7b00f7':'#000'}}>{item.title}</span>
                            </a>
                            </Link>
                        </div>
                        <div className="text-section-small hidden-small">
                            {/* <i className={showClose ? 'fas fa-chevron-up edit-for-inside-icon' : 'fas fa-chevron-down edit-for-inside-icon'}></i> */}
                        </div>
                    </div>
                </div>


                {/* <NavSecDiscription
                    sections={NavSecDisMap}
                    showClose={showClose}
                    setShowClose={setShowClose}

                /> */}

            </>

            {/* })} */}


        </>
    )
}

export default NavbarComp
