import React from 'react'
import { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import HttpServices from '../../utils/Http.services';
import moment from 'jalali-moment';
import { imageAddress, translate } from '../../utils/useful';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';


function AboutusTabReviews({ user, data, getAllReviews }) {


    const [review, setReview] = useState()


    useEffect(() => {
        console.log(data)
        console.log("reviews", getAllReviews)
    }, [])

    const reviewValue = (key, value) => {
        setReview({ ...review, [key]: value }, () => {
            setReview()
        })
        console.log(review)
        console.log(value)

    }

    const submitReview = () => {
        reviewValue()
        HttpServices.syncRequest('addReviews', { description: review.description, title: review.title, rating: review.rating, advertisement: data?.info?._id }).then(() => {
            console.log("review send successful")
        })
    }


    return (
        <div className='aboutus-review-tab'>
            <div className="rating mt-5">
                <h3 className='text-big'>Customer reviews</h3>
            </div>
            <div className='review-rating-stars aboutus-review-tab pt-1 d-flex'>
                <div className='container-review-star-mobile' style={{ width: '45%', marginRight: '30px' }}>
                    <div className='d-flex align-items-center mb-2 mt-2'>

                        <span className=''>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                value={data?.info?.rating?.total?.star}
                                isHalf={true}
                                color="#E0E9CA"
                                activeColor="#95C11F"
                            />
                        </span>
                        <span className='rating-info mx-2'><span className='rating-info-left'>{(data?.info?.rating?.total?.star).toFixed(1)} </span> {"( " + data?.info?.rating?.total?.count} Rating{" )"}</span>
                    </div>
                    <div className='mb-5 mt-4'>
                        {Object.entries(data?.info?.rating).map(([key, prop], index) => {
                            if (key != 'total')
                                return (
                                    <>
                                        <div key={index} className='d-flex align-items-center mb-2'>
                                            <p className='text-small' style={{ whiteSpace: 'nowrap', paddingRight: 0, width: 220 }}>{translate(key)}</p>
                                            <div className='sub-rate position-relative' style={{ width: '100%', borderBottom: "12px solid #E0E9CA", borderRadius: "5px", }}>
                                                <div className='up-rating' style={{ width: `${prop.percent}%`, borderBottom: '12px solid #95C11F', borderRadius: '5px' }}></div>
                                            </div>
                                            <p className='text-small' style={{ paddingLeft: 20, width: 100 }}>{Math.round(prop.percent)}%</p>
                                        </div>
                                    </>
                                )
                        })}
                    </div>
                </div>
            </div>
            <div className='review'>
                {getAllReviews?.info?.map((prop, index) => {
                    return (
                        <div className='mb-5' key={index}>
                            <div className='d-flex profile align-items-center'>
                                <div className='profile-icon'>
                                    <img className='w-100' src={prop?.writer?.image == null ? "/images/userrate.png" : imageAddress(prop?.writer?.image)} alt="" />
                                </div>
                                <div>
                                    <p className='profile-name'>{prop?.writer?.name == null ? 'Unanimous' : prop?.writer?.name}</p>
                                    <div className='rate-user d-flex align-items-center'>
                                        <ReactStars
                                            count={5}
                                            size={15}
                                            edit={false}
                                            value={prop.rating}
                                            isHalf={false}
                                            color="#E0E9CA"
                                            activeColor="#95C11F"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='review-content mb-3 mt-2 mx-1'>
                                <p className='review-text'>{prop.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>


            {user.info && (
                <div className='add-review mt-1 mb-5' style={{ width: '100%' }}>
                    <div>
                        <ReactStars
                            count={5}
                            size={30}
                            edit={true}
                            value={0}
                            isHalf={false}
                            color="#E0E9CA"
                            activeColor="#95C11F"
                            onChange={(e) => reviewValue("rating", e)}
                        />
                    </div>
                    <textarea rows={3} onChange={(e) => reviewValue("description", e.target.value)} className='w-100 review-textarea mt-2 mb-2' placeholder={translate("Write your review ...")}></textarea>
                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                        <button className='review-submit' onClick={() => submitReview()}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}


const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AboutusTabReviews);