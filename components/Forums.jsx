import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';

import Link from 'next/link';
import SmallCard from './SmallCard';
import { checkTranslation, imageAddress } from '../utils/useful';
import { stripHtml } from "string-strip-html";
import moment from 'jalali-moment'
import Pagination from './Pagination';


const Forums = ({ ads, categories, category, questions, limit, currentPage, totalCount, featured }) => {

    const router = useRouter();

    const [showDiscussion, setShowDiscussion] = useState(false);
    const [page, setPage] = useState(2);

    const changePagecolor = (index) => {

        setPage(index);
    }
    const openDiscussion = () => {
        router.push('/forums/new');
    }

    const changePage = (index) => {

        let query = null

        if (category) {
            query = { category: category }
        }

        Router.push({
            pathname: "/forums/" + (Number(index) + 1),
            query
        })


    }


    return (
        <div className="container-fluid m-0 p-0">
            <div className="wrapp m-0 p-0 forum-side-wrap">
                <div className="row content-row-wrap-edit-forum m-0 p-0">
                    {/* <div className='col-12 w-100 py-2 m-0 flexcc' style={{ backgroundColor: "#2F4858" }}>
                    </div> */}

                    <div className="col-12 col-md-3  col-lg-3 col-xl-2  p-0 new-sidebar-forum pt-0">
                        <div className="for-handle-left-item-side-forum w-100 px-3 pt-3">
                            <div className="btn-for-discussion w-100 mb-2 d-none d-md-block">
                                <button onClick={openDiscussion} className="btn-for-forum-discussion w-100 d-none d-md-block">{checkTranslation('{{lang}}Start-Discussion')}</button>
                            </div>

                            <Link href={{ pathname: '/forums' }} >
                                <a className={"icon-with-txt-forum pb-2 forum-category px-2 pt-2 " + (!category ? 'active' : '')} style={{ borderBottom: '1px solid #eee' }}>
                                    <div className="for-icon-side-forum">
                                        <img src={'/images/all-included.png'} alt="" className="edit-forum-icon" />
                                    </div>
                                    <div className="txt-for-forum-with-icon mx-2">
                                        <span className="icon-txt-edit-forums">{checkTranslation('{{lang}}All-Questions')}</span>
                                    </div>
                                </a>
                            </Link>


                            {categories?.map(item => (
                                <Link href={{ pathname: '/forums/1', search: '?category=' + item._id }} >
                                    <a className={"icon-with-txt-forum pb-2 pt-2 forum-category px-2 " + (category?._id == item._id ? 'active' : '')} style={{ borderBottom: '1px solid #eee' }}>
                                        <div className="for-icon-side-forum">
                                            <img src={imageAddress(item.values?.image)} alt="" className="edit-forum-icon" />
                                        </div>
                                        <div className="txt-for-forum-with-icon mx-2">
                                            <span className="icon-txt-edit-forums">{item.values?.title}</span>
                                        </div>
                                    </a>
                                </Link>
                            ))}
                        </div>



                        <div className="show-in-mobile-device d-md-none">
                            {/* <i className='fas fa-align-justify edit-threeline'></i> */}
                            <button className="btn-for-forum-discussion " onClick={openDiscussion}>{checkTranslation('{{lang}}Start-Discussion')}</button>
                        </div>
                    </div>



                    <div className="col-12 col-md-9 col-lg-9 col-xl-6 p-0 side-right-forum">



                        <div className="right-side-box-forum pt-3">

                            {category && (
                                <div className='px-4 pb-2' style={{ fontSize: 20, borderBottom: '1px solid #f2f6f8' }}>
                                    <p className='text-bold'>{category.values?.title}</p>
                                </div>
                            )}


                            {questions?.map(item => {
                                let text = stripHtml(item.body).result
                                return (
                                    <div className="for-card-right-side-forums mt-0 w-100">
                                        <div className="d-flex m-0 p-0 test-forum">


                                            <div className=" d-flex edit-box-for-justify ">
                                                <img src={imageAddress(item.creator?.image, 'profile', 'small')} alt="" className="profile-in-card-forums" />
                                            </div>
                                            <div className=" mx-4 for-card-forums w-100">

                                                <div className="for-handle-card-forums-title w-100">
                                                    <div className="div-for-title-discussion">
                                                        <Link href={"/forums/question/" + item._id}>
                                                            <a>
                                                                <span className="title-txt-forums">{item.title}</span>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <div className="txt-with-icon-for-card-forums-resault-discussion">
                                                        {/* <div className="answer-forums">
                                                        <i className="fas fa-comment-dots"></i>
                                                        <span className="items-forum"> 0 Answer</span>
                                                    </div>
                                                    <div className="vote-forums">
                                                        <i className="fas fa-angle-up"></i>
                                                        <span className="items-forum">  0 Votes</span>
                                                    </div>
                                                    <div className="views-forums">
                                                        <i className="fas fa-eye"></i>
                                                        <span className="items-forum"> 0 Views</span>
                                                    </div> */}

                                                        <span className="txt-edit-for-forum">{text.substring(0, 100)}{text.length > 100 ? ' ...' : ''}</span>

                                                    </div>
                                                    <div className="mt-3 d-flex justify-content-between w-100">
                                                        <div className="for-tag-edit-forum">

                                                            {/* <span className="txt-edit-for-forum">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam soluta magni modi?</span> */}
                                                            <div className="flexc">
                                                                <img src="/images/icons/customer-service.png" alt="" style={{ width: "20px" }} />
                                                                {/* <i style={{color:"#00CD74"}} className="fas fa-comment-dots"></i> */}
                                                                <span className="items-forum">{item.answers} {checkTranslation('{{lang}}Answers')}</span>
                                                            </div>
                                                            <div className="vote-forums flexc">
                                                                <img src="/images/icons/positive-vote.png" alt="" style={{ width: "20px" }} />
                                                                {/* <i className="fas fa-angle-up"></i> */}
                                                                {/* <i style={{color:"#00CD74"}} className="fas fa-poll"></i> */}
                                                                <span className="items-forum">{item.votes} {checkTranslation('{{lang}}Votes')}</span>
                                                            </div>
                                                            <div className="views-forums flexc">
                                                                <img src="/images/icons/view.png" alt="" style={{ width: "20px" }} />
                                                                {/* <i style={{color:"#00CD74"}} className="fas fa-eye"></i> */}
                                                                <span className="items-forum">{item.views} {checkTranslation('{{lang}}Views')}</span>
                                                            </div>
                                                        </div>


                                                        <div className='flexc pt-1'>
                                                            <p style={{ color: '#9ab', fontSize: 12 }}>{moment(item.cDate).format('YYYY, MMM DD')}</p>
                                                        </div>

                                                        {/* <div className="for-tags-forum">
                                                        <span className="just-tag-edit">
                                                            Support
                                                        </span>
                                                        <span className="just-tag-edit">
                                                            Dev
                                                        </span>
                                                        <span className="just-tag-edit">
                                                            Feedback
                                                        </span>
                                                        <span className="just-tag-edit">
                                                            Meta
                                                        </span>
                                                    </div> */}

                                                    </div>
                                                </div>


                                            </div>


                                        </div>
                                    </div>
                                )
                            }
                            )}
                            {/* <div className="for-number-of-page">
                                <div className="for-handle-number-page-forum">
                                    <Link href={""}>
                                        <a onClick={() => changePagecolor(1)} className={page === 1 ? 'page-number-edit-forum have-color' : 'page-number-edit-forum'}>Prev</a>
                                    </Link>
                                    <Link href={""}>
                                        <a onClick={() => changePagecolor(2)} className={page === 2 ? 'page-number-edit-forum have-color' : 'page-number-edit-forum'}>1</a>
                                    </Link>
                                    <Link href={""}>
                                        <a onClick={() => changePagecolor(3)} className={page === 3 ? 'page-number-edit-forum have-color' : 'page-number-edit-forum'}>2</a>
                                    </Link>
                                    <Link href={""}>
                                        <a onClick={() => changePagecolor(4)} className={page === 4 ? 'page-number-edit-forum have-color' : 'page-number-edit-forum'}>3</a>
                                    </Link>
                                    <span id="page-dotted"> ... </span>
                                    <Link href={""}>
                                        <a onClick={() => changePagecolor(5)} className={page === 5 ? 'page-number-edit-forum have-color' : 'page-number-edit-forum'}>50</a>
                                    </Link>
                                    <Link href={""}>
                                        <a onClick={() => changePagecolor(6)} className={page === 6 ? 'page-number-edit-forum have-color' : 'page-number-edit-forum'}>Next</a>
                                    </Link>



                                </div>
                            </div> */}
                        </div>

                        {questions?.length == 0 && (
                            <div className='col-12 text-center w-100' style={{ paddingTop: 50 }}>
                                <img src='/images/nothing.png' width={100} />
                                <p style={{ fontWeight: 'bold', fontSize: 20 }}>{checkTranslation('{{lang}}foundNothing')}</p>
                                <p className='mt-1' style={{ fontSize: 14 }}>{checkTranslation('{{lang}}change-text-in-forums-for-search')}</p>

                            </div>
                        )}

                        <div className="w-100 mt-4 mb-5">
                            <Pagination color={'#00CD74'} currentPage={currentPage} totalCount={totalCount} limit={limit} changePage={changePage} />
                        </div>


                    </div>
                    <div className="col-12 col-xl-4 d-none d-xl-block">



                        <div className='flexc flex-column mb-5' style={{ position: 'sticky', top: 90 }}>
                            <div style={{ maxWidth: 250 }}>


                                <div className="for-handle-tag-and-question mt-4 mb-3 w-100">
                                    <div className="box-for-question-forum w-100">
                                        <div className="for-title-question w-100 text-center" style={{ backgroundColor: '#f2f6f8' }}>
                                            <span className="hot-ques text-center">{checkTranslation('{{lang}}Featured-Question')}</span>
                                        </div>
                                        <div className="for-title-question-border">
                                        </div>

                                        <div className='py-2 px-3'>
                                            {featured?.map((item, index) => {
                                                return (
                                                    <Link href={'/forums/question/' + item._id}>
                                                        <a className="question-title-forum">
                                                            <span className="txt-question-forum">{item.title}</span>
                                                            <span className="answer-item-forum">{checkTranslation('{{lang}}Featured')} - {item.answers} {checkTranslation('{{lang}}Answer')}</span>
                                                        </a>
                                                    </Link>
                                                )
                                            })}
                                        </div>


                                    </div>

                                </div>


                                {ads?.map((item, index) => {
                                    return (
                                        // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                                        <div className='w-100'>
                                            <div className="outline-none flex-1 h-100" style={{ overflow: 'hidden', borderRadius: 8 }}>
                                                <a className='w-100 h-100' href={item?.values?.address}>
                                                    <img src={imageAddress(item.values.image)} className="w-100 slidershop-img" style={{ flex: 1, height: '100%', objectFit: 'cover' }} />
                                                </a>
                                            </div>
                                        </div>

                                    )

                                }
                                )}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forums;
