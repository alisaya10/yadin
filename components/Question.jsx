import React, { Component, useState } from 'react'
// import { useRouter } from 'next/router';
import ReplyComponent from './ReplyComponent';
import Collapsible from 'react-collapsible';
import moment from 'jalali-moment'
import { checkTranslation, imageAddress } from '../utils/useful';
import Editor from './Editor';
// import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../stores/actionsList';
// import Router from 'next/Router';
import HttpServices from '../utils/Http.services';
import Link from 'next/link';
import RemoveConfirmationModal from './modals/RemoveConfirmationModal';
import Router from 'next/router';
// import {  LoadCanvasTemplateNoReload } from 'react-simple-captcha';



class Question extends Component {


    state = {
        showAnswer: true,
        showPostAnswer: false,
        editorLoaded: false
    }
    // const router = useRouter();


    // const[showAnswer, setShowAnswer] = useState(true);


    componentDidMount() {
        this.setState({ editorLoaded: true })
    }

    postVote = (type, ref) => {

        if (this.props.user && this.props.user.loggedin) {
            HttpServices.request('postVote', { type, ref }, (fetchResult, fetchError, fetchStatus) => {
                this.setState({ isPostingData: false })
                // console.log(fetchError)

                if (fetchError) {
                    this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })
                    return
                }

                this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })

                let increase = 1
                if (fetchResult.removed) {
                    increase = -1
                }
                if (type == 'question') {
                    let question = this.props.question
                    question.votes = (question.votes ?? 0) + increase

                    // console.log(question.votes)
                    this.setState({ question })
                }
                if (type == 'answer') {
                    let answers = this.props.answers
                    answers.forEach(answer => {
                        if(answer._id == ref ){
                            answer.votes = (answer.votes ?? 0) + increase
                        }
                    });
                    this.setState({ answers })
                }


                // this.setState({ showPostAnswer: false, answerSubmitted: true, newAnswer: '' })
                // Router.push('/forums/question/' + fetchResult.info?._id);

                // console.log(fetchResult)
                // this.setState({ searchResults: fetchResult.info })
            })
        } else {
            this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.permissionDenied', description: '{{lang}}errors.needToLogin' })

        }
    }


    postAnswer = () => {

        let body = this.state.newAnswer

        if (body && body != '') {
            let data = { body, question: this.props.question?._id }
            data.lng = this.props.question?.lng

            // console.log(data)

            this.setState({ isPostingData: true })

            HttpServices.request('postAnswer', data, (fetchResult, fetchError, fetchStatus) => {
                this.setState({ isPostingData: false })
                // console.log(fetchError)

                if (fetchError) {
                    this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.postedFailed', description: fetchError.message })
                    return
                }

                this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
                this.setState({ showPostAnswer: false, answerSubmitted: true, newAnswer: '' })
                // Router.push('/forums/question/' + fetchResult.info?._id);

                // console.log(fetchResult)
                // this.setState({ searchResults: fetchResult.info })
            })
        }
    }



    removeConfirmed = (data) => {
        this.setState({ isLoadingRemoveAddress: true })

        let item = this.props.question

        let myData = { id: item._id, _id: item._id }


        HttpServices.request("removeQuestion", myData, (fetchResult, fetchError) => {

            this.setState({ isLoadingRemoveAddress: false })

            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.removeFailed', description: fetchError.message })
                return
            }


            this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.RemovedSuccesfully', description: '{{lang}}info.dataRemovedSuccesfully' })
            this.RemoveConfirmationModal.modal.hideModal()
            setTimeout(() => {
                Router.push('/forums')
            }, 500);


        })
    }



    showCard = () => {
        this.setState({ showAnswer: !this.state.showAnswer })
        // this.setShowAnswer(prev => !prev);
    }

    showDiscussion = () => {
        this.setState({ showPostAnswer: true })
        // router.push('/forums/new');
    }


    showRemove = () => {
        this.RemoveConfirmationModal.modal.showModal()
    }

    render() {



        return (
            <div className="container-fluid p-0 m-0 just-edit-background pb-5" >

                <div className="row p-0 m-0 edit-width-of-box">
                    <div className="col-12 col-lg-8 question-side">
                        <div className="handle-question-side">
                            <div className="title-of-question">
                                <h3 className="question-txt">{this.props.question?.title}</h3>
                            </div>
                            <div className="detail-of-person">
                                <div className="row for-align-edit">
                                    <div className="col-lg-10">
                                        <div className="img-with-details flexc">
                                            <div className="img-person-item">
                                                <img src={imageAddress(this.props.question?.creator?.image, null, 'small')} alt="" className="profile-in-card-forums" />
                                            </div>
                                            <div className="detail-person-img">
                                                <span className="name-person-ques">

                                                    {this.props.question?.creator?.fullname}

                                                </span>
                                                <span className="level-detail">
                                                    {moment(this.props.question?.cDate).format('YYYY, MMM DD')}
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 text-end">
                                        <span className="views-span">{this.props.question?.views} {checkTranslation('{{lang}}Views')}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="for-question-paragraph ck-content">
                                <div className="txt-question-edit" style={{ color: '#202020', fontSize: 16 }} dangerouslySetInnerHTML={{ __html: this.props?.question?.body }}>
                                </div>
                            </div>
                            <div className="for-likes-and-join text-normal" >
                                <button className="likes-div text-normal p-0" onClick={() => this.postVote('question', this.props.question?._id)}>
                                    <i className="far fa-thumbs-up like-icon"></i>
                                    <span>{this.props.question?.votes} </span>
                                </button>
                                <div className="join-conversation">
                                    <button className="join-conver" onClick={this.showDiscussion}>{checkTranslation('{{lang}}Add-answer')}</button>
                                </div>
                            </div>


                            {(this.props.question?.status == '0' || this.props.question?.status == '' || this.props.question?.status == null) && (
                                <div className='flexc'>
                                    <Link href={"/forums/new/" + this.props.question?._id}><a className="join-conver" style={{ padding: '7px 12px', backgroundColor: '#007aff', height: 30 }} >{checkTranslation('{{lang}}edit')}</a></Link>
                                    <button className="join-conver " style={{ backgroundColor: '#ee5050', height: 30 }} onClick={this.showRemove}>{checkTranslation('{{lang}}remove')}</button>

                                </div>
                            )}







                            <Collapsible open={this.state.showPostAnswer} >

                                {(!this.props.user || !this.props.user.loggedin) && (
                                    <div className='text-center px-2 py-5' style={{ backgroundColor: '#f7f9fa', borderRadius: 15 }}>
                                        <img src={'/images/padlock.svg'} height={60} />
                                        <p className='text-big text-bold mt-2 mb-1' style={{}}>{checkTranslation('{{lang}}login')}</p>
                                        <p>{checkTranslation('{{lang}}forums-question-slug-login-desc')}</p>

                                        <div className='flexcc mt-3'>
                                            <Link href={'/login'}>
                                                <a className='mx-1' style={{ color: '#fff', backgroundColor: 'rgb(0, 205, 116)', borderRadius: 4, padding: '4px 15px' }}>
                                                    <p style={{ color: '#fff', }}>{checkTranslation('{{lang}}login')}</p>
                                                </a>
                                            </Link>

                                            <Link href={'/login'}>
                                                <a className='mx-1' style={{ color: '#789', backgroundColor: '#eee', borderRadius: 4, padding: '4px 15px' }}>
                                                    <p style={{ color: '#789', }}>{checkTranslation('{{lang}}signup')}</p>
                                                </a></Link>
                                        </div>
                                    </div>
                                )}

                                {this.props.user && this.props.user.loggedin && (

                                    <div className='mt-2'>
                                        <Editor

                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ newAnswer: data })
                                            }}
                                            // name="description"
                                            data={this.state.newAnswer}
                                            // onChange={(data) => {
                                            //     this.setState({ newAnswer: data })
                                            // }}
                                            editorLoaded={this.state.editorLoaded}
                                        />



                                        <div className="btn-for-reply">
                                            <div className="inner-btn-handle-for-reply">
                                                <button onClick={() => this.setState({ showPostAnswer: false })}>{checkTranslation('{{lang}}Cancel')}</button>
                                                <button onClick={() => this.postAnswer()}>{checkTranslation('{{lang}}Post-Reply')}</button>
                                            </div>

                                        </div>

                                    </div>
                                )}

                            </Collapsible>

                            {this.state.answerSubmitted && (
                                <div className='text-center mt-2' style={{ color: '#fff', backgroundColor: 'rgb(0, 205, 116)', padding: '10px 20px', borderRadius: 8 }}>
                                    <p>{checkTranslation('{{lang}}confirm-answer-forums-question-section')}</p>
                                </div>
                            )}

                        </div>

                        <div className="for-count-reply">
                            <div className="reply-box w-100" onClick={this.showCard}>
                                <span className="count-reply-number"> {this.props.answers?.length} {checkTranslation('{{lang}}Replies')} </span>
                                <i className={'fas fa-chevron-down edit-forum-section'}></i>
                            </div>
                        </div>




                        <div>
                            {/* <Collapsible open={this.state.showAnswer ? true : false}> */}
                            {/* {answerCard.map(card => (

                                <ReplyComponent
                                    source={card.img}
                                    person={card.person}
                                    openReply={openReply}
                                    reply={reply}

                                />

                            ))} */}

                            {this.props.answers?.map((item, index) => {
                                return (

                                    <ReplyComponent
                                        item={item}
                                        key={index}
                                        postVote={this.postVote}
                                    />


                                )
                            })}

                            {/* </Collapsible> */}
                        </div>

                    </div>




                    <div className="col-12 col-lg-4 col-sm-12 d-none d-lg-block pt-4">
                        <div className='flexc flex-column ' style={{ position: 'sticky', top: 90 }}>
                            <div style={{ maxWidth: 250 }}>

                                {this.props.ads?.map((item, index) => {
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

                        {/* <div className="for-handle-tag-and-question testing-new w-100">
                            <div className="box-for-question-forum question-section">
                                <div className="for-title-question">
                                    <span className="hot-ques">Hot Question</span>
                                </div>
                                <div className="for-title-question-border">
                                </div>

                                <div className="question-title-forum">
                                    <span className="txt-question-forum">why do fields seem to be initialized before constructor ?</span>
                                    <span className="answer-item-forum">Stackoverflow - 24 Answer</span>
                                </div>
                                <div className="question-title-forum">
                                    <span className="txt-question-forum">why do fields seem to be initialized before constructor ?</span>
                                    <span className="answer-item-forum">Stackoverflow - 24 Answer</span>
                                </div>
                                <div className="question-title-forum">
                                    <span className="txt-question-forum">why do fields seem to be initialized before constructor ?</span>
                                    <span className="answer-item-forum">Stackoverflow - 24 Answer</span>
                                </div>


                            </div>
                            <div className="for-related-tag-box">
                                <img src='/images/shop.webp' style={{ borderRadius: "10px", width: "100%", height: "100%" }} />

                            </div>
                        </div> */}
                    </div>
                </div>


                <RemoveConfirmationModal ref={el => this.RemoveConfirmationModal = el} confirmed={this.removeConfirmed} />

            </div>

        )
    }
}

const mapStateToProps = state => ({ settings: state.settings, cart: state.cart, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Question);