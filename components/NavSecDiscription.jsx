import React, { useRef } from 'react'
import Collapsible from 'react-collapsible';
import { NavSecDisMap } from './NavSecDisMap';

const NavSecDiscription = ({ showClose, setShowClose }) => {



    return (
        <>
            {/* <Collapsible open={showClose ? true : false}>
                <div
                    className="container">
                    <div className="wrapper">
                        {NavSecDisMap.map((sections, index) => {
                            return (
                                <div className="section-main">
                                    <div className="section-items">
                                        <div className="div-number-second-circ">
                                            <div className="div-for-second-number">
                                                {sections.number}
                                            </div>
                                            <div className="check-box-second">
                                                <i class="fas fa-check check-second-item"></i></div>
                                        </div>
                                    </div>
                                    <div className="section-items">
                                        <div className="card-discription-second-item">
                                            <h4>{sections.title}</h4>

                                            <div className="for-second-episode-and-clock">
                                                <span>{sections.episode}</span>
                                                <div className="minutes">
                                                    <i class="fas fa-clock section-second-clock"></i>
                                                    <span id="minute-second">{sections.time}</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}


                    </div>

                </div>
            </Collapsible> */}

        </>
    )
}


export default NavSecDiscription
