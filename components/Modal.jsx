import React, { useState, useRef, useEffect, useCallback } from 'react'


import styles from '../styles/modal.module.css'

let topics = [

    // { title: 'explore', img: 'assets/icon.png', id: 1 },
    // { title: 'getway', img: 'assets/icon8.png', id: 2 },
    // { title: 'sensors', img: 'assets/icon2.png', id: 3 },
    // { title: 'brands', img: 'assets/icon3.png', id: 4 },
    // { title: 'category', img: 'assets/icon4.png', id: 5 },
    // { title: 'explore', img: 'assets/icon5.png', id: 6 },
    // { title: 'explore', img: 'assets/icon6.png', id: 7 },
    // { title: 'explore', img: 'assets/icon7.png', id: 8 },
    // { title: 'explore', img: 'assets/icon8.png', id: 9 },
    // { title: 'explore', img: 'assets/icon9.png', id: 10 },
    // { title: 'explore', img: 'assets/icon10.png', id: 11 },
    // { title: 'explore', img: 'assets/icon11.png', id: 12 },
    // { title: 'explore', img: 'assets/icon12.png', id: 13 },
    // { title: 'explore', img: 'assets/icon13.png', id: 14 },
    // { title: 'explore', img: 'assets/icon.png', id: 15 },
    // "php",
    // "react",
    // "laravel",
    // "python",
    // "js",
    // "node",




    // {names:"react",img:'assets/icon2.png'},
    // {names:"php",img:'assets/icon3.png'},
    // {names:"laravel",img:'assets/icon4.png'},
    // {names:"explore",img:'assets/icon5.png'},
    // {names:"sensors",img:'assets/icon6.png'},
    // {names:"soocket",img:'assets/icon7.png'},
    // {names:"category",img:'assets/icon8.png'},


];

// const numbers = ["0","1","2","3","4","5","6","7","8","9"]



const Modal = ({ showModal, setShowModal }) => {

    const keyPress = useCallback(e => {

        if (e.key === 'Escape' && showModal) {
            setShowModal(false)

        }

    }, [setShowModal, showModal])
    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress])

    // const[searchTermTest,setSearchTermTest] = useState("");


    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = (event) => {

        setSearchTerm(event.target.value.toLowerCase())

    }


    // if(searchTerm.length > 0) {
    //     topics = topics.filter((i) => {
    //         return i.name.match(searchTerm);
    //     });
    // }
    useEffect(() => {
        //     console.log('test');
        //      let inversText = "";
        //     for (let i = searchTerm.length -1  ; i >= 0 ; i-- ) {


        //         if (numbers.includes(searchTerm[i])) {          
        //               inversText =searchTerm[i] + inversText;


        //         }

        //     }
        //     setSearchTermTest(inversText);

        // let number = "";
        const results = topics.filter(topic => topic.title.includes(searchTerm));
        setSearchResults(results);







    }, [searchTerm]);

    const modalRef = useRef();

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    return (
        <>

            <div className={showModal ? styles.background : null} ref={modalRef} onClick={closeModal}>
                <div className={showModal ? styles.wrapp : styles.testOne}>
                    <div className={styles.main_modal}>
                        <div className={styles.title_header_modal}>
                            <span className={styles.edit_title_header_modal + ' m-0 '}>explore topics</span>
                            <button className={styles.exit_btn + ' p-0 '} onClick={() => setShowModal(prev => !prev)}><i class={' fas fa-times ' + styles.edit_times}></i></button>
                        </div>
                        <div className={styles.input_main_modal}>
                            <input
                                value={searchTerm}
                                onChange={handleChange}
                                type="text"
                                placeholder="Find Your Topics"
                                className={styles.search_for_modal}
                            />


                            <div className={styles.div_for_list_item}>
                                <ul className={styles.list_ul_edit + ' p-0 '}>
                                    {searchResults.map(item => (
                                        <li className={styles.item_topics_list}>
                                            <div className={styles.box_modal_item}>
                                                <img src={item.img} alt="" className={styles.modal_logo_small} />
                                                <a href="" className={styles.topic_name_item}>{item.title}</a>
                                            </div>
                                            <div className={styles.box_modal_item + ' ' + styles.right}>
                                                <a href="" className={styles.episode_modal_edit}>
                                                    <span>
                                                        episode {item.id}
                                                    </span>

                                                    <i class={' fab fa-accusoft ' + styles.accusoft_edits}></i>

                                                </a>
                                            </div>


                                        </li>


                                    )

                                    )}


                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Modal;
