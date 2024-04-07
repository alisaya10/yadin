import Link from 'next/link';
import React, { Component } from 'react'

class LessonInfo extends Component {

    state = {}

    componentDidMount() {
        this.prevAndNext()
    }

    componentDidUpdate(prevProps) {
        if (prevProps?.lesson?._id != this.props.lesson?._id) {
            this.prevAndNext()
        }
    }

    prevAndNext() {
        if (this.props.lessons) {
            let prev
            let next

            this.props.lessons.forEach((element, index) => {
                if (element._id == this.props.lesson?._id) {
                    prev = this.props.lessons[index - 1]
                    next = this.props.lessons[index + 1]
                }
            });

            this.setState({ prev, next })
        }
    }

    render() {
        return (
            <div className="container-fluid p-0 m-0">
                <div className="wrapper">
                    <div className="main-box-logged w-100">
                        <div className="main-video-box p-3 d-flex">
                            {this.state.prev ? (
                                <Link href={'/academy/lesson/' + this.state.prev?._id} className="detail-with-login first left d-none d-lg-block">
                                    <a className="chev-background "><i class="fas fa-chevron-left  left-chev d-rotate"></i></a>
                                </Link>
                            ) : (
                                <div className="chev-background " style={{ opacity: 0.2 }}><i class="fas fa-chevron-left left-chev d-rotate"></i></div>
                            )}
                            <div className="detail-with-login second ml-3 flexcc flex-column" style={{ flex: 1 }}>
                                <div className="detail-item-title">
                                    {/* <div className="content-item-inner">
                                    <div className="content-item-heart">
                                    <i class="fas fa-heart heart-edits"></i>

                                    </div>
                                </div> */}
                                    <div className="content-item-inner text-center">
                                        <h4 className='m-0' style={{ fontWeight: 400, whiteSpace: 'pre-wrap' }}>{this.props.lesson?.title}</h4>
                                    </div>
                                </div>
                                <dl className="detail-item-title">
                                    <div className="detail-for-each-video first-child">
                                        <dd className='m-0'>{this.props.lesson?.priority}</dd>
                                        <dt className='mt-2'>Lesson</dt>

                                    </div>
                                    {/* <div className="detail-for-each-video">
                                    <dt>Run Time</dt>
                                    <dd className='m-0'>2:40</dd>
                                </div> */}
                                    {/* <div className="detail-for-each-video delet-published">
                                <dt>Published</dt>
                                    <dd>Mar 17th,2021</dd>
                                </div> */}
                                    <div className="detail-for-each-video text-center">
                                        <dd className='m-0'>{this.props.lesson?.course?.title}</dd>
                                        <dt className='mt-2'>Course</dt>

                                    </div>
                                    {/* <div className="detail-for-each-video">
                                <dt>Version</dt>
                                    <dd className='m-0'>Laravel 8</dd>
                                </div> */}
                                </dl>

                            </div>
                            <div className="detail-with-login third w-100" style={{ flex: 2 }}>
                                <div className="box-for-logged-in">
                                    <div className="item-logged-in-content-box">
                                        <div className="for-img-person">
                                            {/* <img src="/assets/face.jpeg" alt="" className="pic-for-logg-in"/> */}
                                            {/* <span className="sign-title">it look like you're not signed in</span> */}
                                        </div>
                                        <div className="for-content-logg-in">
                                            <span className="" style={{ color: "#fff", fontSize: "16px", fontWeight: 300 }}>{this.props.lesson?.description}</span>
                                            <div className="for-btn-logged-in">
                                                {/* <button className="logg-in-btns">log in</button> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* <div className="detail-with-login first left ">
                            <a href="" className="chev-background"><i class="fas fa-chevron-left left-chev"></i></a>
                        </div> */}
                            {this.state.next ? (
                                <Link href={'/academy/lesson/' + this.state.next?._id} className="detail-with-login first d-none d-lg-block">
                                    <a className="chev-background"><i class="fas fa-chevron-right right-chev d-rotate"></i></a>
                                </Link>
                            ) : (
                                <div className="chev-background" style={{ opacity: 0.2 }}><i class="fas fa-chevron-right right-chev d-rotate"></i></div>

                            )}

                            <div className='d-flex d-lg-none'>
                                {this.state.prev ? (
                                    <Link href={'/academy/lesson/' + this.state.prev?._id} className="detail-with-login first left mx-2">
                                        <a className="chev-background"><i class="fas fa-chevron-left left-chev"></i></a>
                                    </Link>
                                ) : (
                                    <a className="chev-background" style={{ opacity: 0.2 }}><i class="fas fa-chevron-left left-chev"></i></a>
                                )}

                                {this.state.next ? (
                                    <Link href={'/academy/lesson/' + this.state.next?._id} className="detail-with-login first mx-2">
                                        <a className="chev-background"><i class="fas fa-chevron-right right-chev"></i></a>
                                    </Link>
                                ) : (
                                    <div style={{ opacity: 0.2 }} className="chev-background"><i class="fas fa-chevron-right right-chev"></i></div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        )
    }
}

export default LessonInfo;
