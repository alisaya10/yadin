import React, { useState, useEffect } from 'react'


import styles from '../styles/covertopic.module.css';
import HeaderMain from '../components/HeaderMain';
// import Header from './Header';

const CoverTopics = () => {

    let item = [

        { name: "reza" },
        //    {name:"reza"} "php",
        // "react",
        // "redux",
        // "laravel",
        // "python",
        // "nodejs",
    ]

    const [showTopic, setShowTopic] = useState("");
    const [topicResult, setTopicResult] = useState([]);

    const listForTopics = (event) => {

        setShowTopic(event.target.value.toLowerCase());

    }
    useEffect(() => {

        const result = item.filter(items => items.name.includes(showTopic))
        setTopicResult(result);


    }, [showTopic])




    return (
        <>

            <div className="container-fluid p-0 m-0">

                <div className={styles.wrapper}>

                    <div className={styles.main_items_cover}>
                        <video src="/videos/video-2.mp4" autoPlay  controlsList="nodownload" preload loop muted alt="" className={styles.cover_academy_img} />
                        <div className={styles.txt_img_title}>
                            <div className={styles.title_page_main}>
                                <h4 className={styles.txt_title_academy}>Learn Today</h4>
                                <p className={styles.under_title_academy}>Lorem ipsum dolor sit amet.</p>
                            </div>
                            <div className={styles.main_search_box}>
                                <div className={styles.search_item_box}>
                                    <div className={styles.search_box_first}>
                                        <i className={' fas fa-search ' + styles.for_input_search}></i>
                                        <input
                                            className={styles.input_edit_cover}
                                            placeholder="Search our Course"
                                            onChange={listForTopics}
                                            value={showTopic}
                                        />
                                        <button className={styles.btn_for_cover}>Search</button>
                                    </div>

                                </div>
                            </div>
                            <div className={styles.google_search}>
                                <div className={showTopic ? styles.box_for_search : styles.box_for_search_hide} >
                                    {topicResult.map(list => (
                                        <ul className={styles.list_of_search}>
                                            <li>{list.name}</li>
                                        </ul>
                                    ))}

                                </div>
                            </div>


                        </div>

                    </div>



                </div>
            </div>

        </>

    )
}


export default CoverTopics;