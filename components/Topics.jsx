import React, { useState } from 'react'
import Modal from './Modal';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import styles from '../styles/topic.module.css';

const topicData = [
    { title: 'Explore', img: 'assets/icon.png', id: 1 },
    { title: 'Get way', img: 'assets/icon8.png', id: 2 },
    { title: 'Sensors', img: 'assets/icon2.png', id: 3 },
    { title: 'Brands', img: 'assets/icon3.png', id: 4 },
    { title: 'Category', img: 'assets/icon4.png', id: 5 },
    { title: 'Explore', img: 'assets/icon5.png', id: 6 },
    { title: 'Explore', img: 'assets/icon6.png', id: 7 },
    { title: 'Explore', img: 'assets/icon7.png', id: 8 },
    { title: 'Explore', img: 'assets/icon8.png', id: 9 },
    { title: 'Explore', img: 'assets/icon9.png', id: 10 },
    { title: 'Explore', img: 'assets/icon10.png', id: 11 },
    { title: 'Explore', img: 'assets/icon11.png', id: 12 },
    { title: 'Explore', img: 'assets/icon12.png', id: 13 },
    { title: 'Explore', img: 'assets/icon13.png', id: 14 },
    { title: 'Explore', img: 'assets/icon.png', id: 15 },
]

const Topics = () => {


    let settings = {
        dots: true,
        infinite: true,
        arrows: true,
        pauseOnDotsHover: true,
        autoplay: true,
        autoplaySpeed: 1600,
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    pauseOnHover: true,
                    touchMove: true,
                }
            }
        ]

    };



    const [showModal, setShowModal] = useState(false)
    const openModal = () => {
        setShowModal(prev => !prev);

    }







    return (
        <div className="container">
            <div className={styles.wrapper}>
                <div className={styles.sub_title}>
                    <h2 className={styles.title_topics_edit}>Explore Topics</h2>
                    {/* <p className="text-title"> Laracasts is categorized into a variety of topics.</p> */}
                    <button className={styles.btn_for_modal} onClick={openModal}>search in topics</button>
                    <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                </div>



                <div className={' container p-0 ' + styles.slider_slick_edit}>
                    <Slider {...settings} >
                        {topicData.map((item, index) => {
                            return (
                                <div className={styles.grid_item}>
                                    <div className={styles.inside_item}>
                                        <div className={styles.for_slider}>
                                            <div className={styles.item_include_img}>
                                                <img src={item.img} alt="" className={styles.grid_item_icon} />
                                            </div>
                                            <div className={styles.items_include_text}>
                                                <h3 className={styles.title_header}>{item.title}</h3>
                                                <div className={styles.under_text}>
                                                    <p className={styles.series_text}>54 series</p>

                                                    <p className={styles.series_text}>684 videos</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )
                        })}
                    </Slider>


                </div>






            </div>

        </div>
    )
}


export default Topics;
