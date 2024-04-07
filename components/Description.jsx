import React, { Component } from 'react'
import { imageAddress } from '../utils/useful';



class Description extends Component {

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="description-box-main text-start w-100 pb-0">
                        <div className="box-visit-name">
                            {/* <div className="description-item edit">
                                <h3 style={{ color: '#000' }}>Course <span id="vertical-line" className='mx-2'> | </span> <strong className="teacher-name-edit">Created by IoTSmile</strong> </h3>
                            </div> */}
                            {/* <div className="description-item rmv">
                          
                            <span className="git-insta"><i class="fab fa-instagram"></i></span>
                            <span className="git-insta"><i class="fab fa-github"></i></span>
                            <button className="website-btn">visit website</button>

                            </div> */}



                        </div>

                        {/* <div>
                                <p>Includes {this.props.lessons?.length} Lessons</p>

                            </div> */}

                        <div className="description-teacher">
                            <div className="img-box">
                                <img src={imageAddress(this.props.course?.teacher?.values?.image, 'profile', 'small')} alt="face" className="face-edit" />
                            </div>
                            <div className="description-txt">
                                <p className='mb-2 text-big' style={{ color: '#000',fontWeight:'bold' }}>Course <span id="vertical-line" className='mx-2'> | </span> <strong className="teacher-name-edit">Created by {this.props.course?.teacher?.values?.name}</strong> </p>
                                <p>{this.props.course?.teacher?.values?.bio}</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
export default Description;
