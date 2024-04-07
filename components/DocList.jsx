import React, { useState } from 'react'

import Link from 'next/link';



const DocList = ({ props }) => {

    const [showIndicator, setShowIndicator] = useState(props)

    const showColor = (index) => {

        setShowIndicator(index);
    }

    return (
        <div className="container-fluid m-0 p-0 doclist">
            <div className="wrapper">
                <div className="for-list-doc">
                    <div className="col-lg-9 col-md-12 col-sm-12">
                        <div className="for-list-items">

                            <ul className="main-list-item-doc-under-header">

                                <li className="list-item-doc">



                                    <Link
                                        href={""}

                                    ><a className={showIndicator === 1 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(1)}>Getting Started</a></Link>




                                </li>

                                <li className="list-item-doc">
                                    <Link
                                        href={""}

                                    ><a className={showIndicator === 2 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(2)}>Documentation</a></Link>
                                    {/* <button type="button" class="btn btn-danger">Danger</button>
                                <button type="button" class="btn btn-warning">Warning</button> */}

                                </li>
                                <li className="list-item-doc">
                                    <Link
                                        href={"/guides"}

                                    ><a className={showIndicator === 3 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(3)}>Guides</a></Link>

                                </li>
                                <li className="list-item-doc">
                                    <Link
                                        href={"/installation"}

                                    ><a className={showIndicator === 4 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(4)}>Installation</a></Link>

                                </li>
                                <li className="list-item-doc">
                                    <Link
                                        href={""}

                                    ><a className={showIndicator === 5 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(5)}>Architecture</a></Link>

                                </li>
                                <li className="list-item-doc">
                                    <Link
                                        href={""}

                                    ><a className={showIndicator === 6 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(6)}>API</a></Link>

                                </li>
                                <li className="list-item-doc">
                                    <Link
                                        href={"/faq"}

                                    ><a className={showIndicator === 7 ? 'list-item-doc-link activedev' : 'list-item-doc-link'}
                                        onClick={() => showColor(7)}>FAQ</a></Link>

                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 input-handle">
                        <div className="for-input-search-box">
                            <input type="text" placeholder="Search" className="search-for-doc" />
                            <div className="search-icon-doc">
                                <i className="fas fa-search search-doc-list-comp"></i>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocList;
