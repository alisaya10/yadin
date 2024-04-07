import React, { useState } from 'react';


import Link from 'next/link';


import styles from '../styles/header.module.css'


const Header = () => {

    const [click, setclick] = useState(false);



    const handleClick = () => {
        console.log("hi");
        setclick(!click);
    }

    const closeMobileMenu = () => {
        console.log("object");
        setclick(false);
    }

    return (
        <>
            <div className={' container_fluid ' + styles.s}>
                <div className={styles.wrapper_header}>


                    <div className={styles.item_header + ' ' + styles.edit_on_tablet}>
                        <Link href={"/"} >
                           <a href="" onClick={closeMobileMenu}><img src="/assets/flaticon.png" alt="" className={styles.for_logo} /></a> 
                        </Link>
                    </div>

                    <div className={styles.item_header}>
                        <ul className={click ? styles.section_header + ' ' + styles.active : styles.section_header}>
                            {/* <li>topics</li> */}
                            <Link href={"/redux"} className={styles.links_item}><a className={styles.links_item}>redux</a></Link>

                            <Link href={"/series"} className={styles.links_item}><a className={styles.links_item}>series</a></Link>


                            <Link href={"/developer"} className={styles.links_item}><a className={styles.links_item}>Developer</a></Link>

                           <Link href={"/forums"} className={styles.links_item}><a className={styles.links_item}>Forum</a></Link> 
                        </ul>
                    </div>
                    <div className={styles.item_header + ' ' + styles.search_box}>
                        <div className={styles.sign_in}>
                            <div className={styles.menu_icon} onClick={handleClick}>
                                <i className={click ? ' fas fa-times ' : ' fas fa-bars '} />
                            </div>
                            <i className={' fas fa-search ' + styles.search_aws}></i>
                            <a id={styles.sign}>sign in</a>
                            <button className={styles.btns}>get started</button>
                        </div>


                    </div>
                </div>

            </div>
        </>

    )
}

export default Header;
