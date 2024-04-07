import React, { useState, useEffect } from 'react'
import Collapsible from 'react-collapsible';
import Editor from './Editor';
import { imageAddress } from '../utils/useful';
import moment from 'jalali-moment'


const ReplyComponent = ({ item, postVote }) => {

    const [reply, setReply] = useState(false);

    const openReply = () => {
        setReply(prev => !prev);
    }
    const closeReply = () => {
        setReply(false);
    }

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setEditorLoaded(true);
    }, []);


    return (
        <>
            <div className="test-line-under">
                <div className="for-person-reply">
                    <div className="answer-and-reply-person">
                        <div className="for-side-person">
                            <div className="for-person-profile">
                                <img src={`${imageAddress(item?.creator?.image, null, 'small')}`} alt="" className="profile-in-card-forums" style={{ width: 40, height: 40 }} />
                            </div>
                            <div className="name-detail-person">
                                <span className="name-person-ques">
                                    {`${item?.creator?.fullname}`}
                                    {/* Lawrene0  in Kaleden, Canada */}

                                </span>

                                <span className="date-detail">
                                    {`${moment(item?.cDate).format('YYYY, MMM DD')}`}
                                </span>
                            </div>


                        </div>
                        <div className="for-side-person">

                        </div>
                    </div>
                    <div className="reply-txt-question">
                        {/* <p className="txt-reply-edit">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, tenetur laborum? Laudantium incidunt nobis aut nulla culpa. Harum, aliquam magnam!
                        </p> */}
                        <div className='ck-content'>
                            <div className="txt-reply-edit" style={{ color: '#202020', fontSize: 14 }} dangerouslySetInnerHTML={{ __html: item?.body }}>
                            </div>
                        </div>

                        <div className="for-likes-and-join mt-2">
                            <button className="likes-div text-normal p-0" onClick={() => postVote('answer', item._id)}>
                                <i className="far fa-thumbs-up like-icon"></i>
                                <span>{item?.votes}</span>
                            </button>
                            {/* <div className="join-conversation">
                                <button className="join-conver question-edit-second" onClick={openReply}>Reply</button>
                            </div> */}
                        </div>
                    </div>

                    {/* <Collapsible open={reply ? true : false} >
                        <div className='reply-text-area'>
                            <Editor
                                name="description"
                                // onChange={(data) => {
                                //     setData(data);
                                // }}
                                editorLoaded={editorLoaded}
                            />

                            {JSON.stringify(data)}


                          
                            <div className="btn-for-reply">
                                <div className="inner-btn-handle-for-reply">
                                    <button onClick={closeReply}>Cancel</button>
                                    <button>Reply</button>
                                </div>

                            </div>

                        </div>
                    </Collapsible> */}



                    {/* <div className={reply ? 'reply-text-area' : 'reply-text-area hide'}>
                                            <div className="main-item-for-typping">
                                                <div className="item-for-typing">
                                                    <span>B</span>
                                                    <span>I</span>
                                                    <span>U</span>
                                                    <span><i className="fas fa-camera"></i></span>
                                                    <span><i className="far fa-smile"></i></span>

                                                </div>
                                            </div>
                                            <div className="for-add-paragraph">
                                                <textarea type="text" />
                                            </div>
                                            <div className="btn-for-reply">
                                                <div className="inner-btn-handle-for-reply">
                                                    <button>Cancel</button>
                                                    <button>Reply</button>
                                                </div>

                                            </div>

                                        </div> */}
                </div>


            </div>
        </>
    )
}

export default ReplyComponent;
