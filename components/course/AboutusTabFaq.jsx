import React, { useState } from 'react'
import { useEffect } from 'react';
import Collapsible from 'react-collapsible';
import HttpServices from '../../utils/Http.services';
import { imageAddress, translate } from '../../utils/useful';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';




function AboutusTabFaq({ data, getAllComments, user }) {

    const [open, setOpen] = useState(true)
    const [active, setActive] = useState(null)
    const changeAvtive = () => {
        setActive(index)
    }

    const [comment, setComment] = useState({})
    const [notif, setNotif] = useState({})

    const commentValue = (e, index) => {
        let newcomment = comment
        newcomment[index] = e.target.value
        setComment(newcomment)
    }

    const addComment = (prop, index) => {
        // console.log(prop)
        HttpServices.syncRequest('addComment', { body: comment[index], parent: prop?._id, advertisement: data?.info?._id }).then((fetchResult, fetchError) => {
            // console.log("question send successful")

            if (fetchError) {
                return
            }

            setComment({
                ...comment,
                [index]: ''
            })

            setNotif({
                ...notif,
                [index]: true
            })




            // setComment((prevState) => {
            //     return ({
            //         ...prevState,
            //         [prevState[index]]: null,
            //         [index]: null
            //     })

            // })
        })

        // console.log(prop.parent._id, index)

    }

    const getChildrenCOunt = (data, parent) => {
        let count = 0

        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.parent?._id == parent) {
                count++
            }

        }

        return count
    }



    return (
        <div className='aboutus-faq-tab mb-5'>
            <div className='faq-header mt-5'>
                <p>{translate("Customer Questions & Answers")}</p>

                {user.info && (
                    <div className='input-container w-100 my-3 d-flex align-items-center'>
                        <input value={comment["-1"]} onChange={(e) => commentValue(e, "-1")} type="text" placeholder='Have a question?' />
                        <button onClick={() => addComment(null, "-1")} className='submit-btn d-flex align-items-center'>Submit</button>



                    </div>
                )}

                {notif['-1'] && (
                    <div className='px-2'>
                        <p style={{ color: '#95c11f' }}>{translate("Your question has been submited successfully. It will be pulished after our teams review.")}</p>
                    </div>
                )}
            </div>
            {getAllComments.info.map((prop, index) => {
                if (prop.parent == null)
                    return (
                        <div key={index} className='faq mt-5' style={{ borderBottom: '1px solid rgba(102, 102, 102,0.4)' }}>

                            <div className='  mb-3'>
                                <div className='flexc'>
                                    <div className='profile-icon'>
                                        <img className='w-100' src={imageAddress(prop?.writer?.image, 'profile', 'small')} alt="" height={'40px'} />
                                    </div>

                                    <div className='px-2'>
                                        <p className='profile-name text-small'>{prop?.writer?.name == null ? 'Unanimous' : (prop?.writer?.name)}</p>
                                        <p className='text-normal text-bold'>{prop?.body}</p>
                                    </div>
                                </div>
                                {/* <p className='col-12 col-sm-10 text-big' dangerouslySetInnerHTML={{ __html: `${prop?.parent?.body ? prop?.parent?.body : ""}` }}></p> */}
                            </div>
                            <div className='d-flex answer mb-3 px-3'>
                                <p className='mb-3 mb-sm-0 static col-2 text-bold'>{getChildrenCOunt(getAllComments.info, prop?._id)} {translate('Answers')}</p>
                            </div>

                            <div className='px-3'>

                                {getAllComments.info.map((child, j) => {
                                    if (child.parent?._id == prop._id)
                                        return (
                                            <div className='  mb-4'>
                                                <div className='flexc'>
                                                    <div className='profile-icon'>
                                                        <img className='w-100' style={{ width: 30, height: 30 }} src={imageAddress(child?.writer?.image, 'profile', 'small')} alt="" />
                                                    </div>

                                                    <div className='px-2'>
                                                        <p className='profile-name text-small' style={{ color: '#666' }}>{child?.writer?.name == null ? 'Unanimous' : (prop?.writer?.name)}</p>
                                                        <p className='text-small text-bold '>{child?.body}</p>
                                                    </div>
                                                </div>


                                            </div>
                                        )
                                })}



                                <div className='mt-4 d-flex ' style={{ flexDirection: 'column' }}>
                                    {user.info && active != index && (
                                        <button className='mb-2 px-0' style={{ width: 'max-content', color: '#95c11f' }} onClick={() => { setActive(index) }}>{translate('Add answer')}</button>
                                    )}
                                    <div className='mb-3' style={{ width: '100%' }}>
                                        <Collapsible open={active == index}>
                                            <div className='faq-header d-flex align-items-end' style={{ flexDirection: 'column' }}>
                                                <div className='input-container w-100 my-3 d-flex align-items-center'>
                                                    {/* <input type="text" placeholder='write youre answers' /> */}
                                                    <textarea value={comment[index]} onChange={(e) => commentValue(e, index)} placeholder={translate('Write an answer ...')}></textarea>
                                                </div>
                                                <button onClick={() => addComment(prop, index)} className='submit-btn d-flex align-items-center text-small'>Submit</button>

                                                {notif[index] && (
                                                    <div className='px-2 mt-2'>
                                                        <p style={{ color: '#95c11f' }}>{translate("Your question has been submited successfully. It will be pulished after our teams review.")}</p>
                                                    </div>
                                                )}

                                            </div>

                                        </Collapsible>
                                    </div>
                                    {/* <div className='my-2 d-flex align-items-center justify-content-end'>
                                        <img style={{ width: '15px', marginRight: '10px' }} src="/images/arrowseemore.svg" alt="" />
                                        <p style={{ color: '#95c11f' }}>see more anwsers</p>
                                    </div> */}
                                </div>

                            </div>


                            {/* <p className='col-12 col-sm-10' dangerouslySetInnerHTML={{ __html: `${prop?.body ? prop?.body : ""}` }}></p> */}

                            {/* <div className='mt-4 d-flex align-items-end' style={{ flexDirection: 'column' }}>
                                <button className='mb-2' style={{ width: 'max-content' }} onClick={() => {
                                    setActive(index),
                                        setOpen(!open)
                                }}>{prop.addasnwer}</button>
                                <div className='mb-3' style={{ width: '100%' }}>
                                    <Collapsible open={active == index && open}>
                                        <div className='faq-header d-flex align-items-end' style={{ flexDirection: 'column' }}>
                                            <div className='input-container w-100 my-3 d-flex align-items-center'>
                                                <input type="text" placeholder='write youre answers' />
                                                <textarea onChange={(e) => commentValue(e)} placeholder='write youre answers'></textarea>
                                            </div>
                                            <button onClick={() => addComment(prop, index)} className='submit-btn d-flex align-items-center'>Submit</button>
                                        </div>
                                    </Collapsible>
                                </div>
                                <div className='my-2 d-flex align-items-center justify-content-end'>
                                    <img style={{ width: '15px', marginRight: '10px' }} src="/images/arrowseemore.svg" alt="" />
                                    <p style={{ color: '#95c11f' }}>see more anwsers</p>
                                </div>
                            </div> */}
                        </div>
                    )
            })}
            {/* <div className='mb-5 mt-3 d-flex align-items-center justify-content-end'>
                <p style={{ marginRight: '10px', color: '#95c11f' }}>see more answered questions</p>
                <img style={{ width: '15px' }} src="/images/arrowfaq.svg" alt="" />
            </div> */}
        </div>
    )
}


const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutusTabFaq);