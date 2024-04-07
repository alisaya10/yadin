// import React from 'react'

// const Notife = () => {
//     return (
//         <div className="container-fluid">
//             <div className="wrapp">
//                 <div className="row">
//                 <div className="col-12 col-lg-6">

//                         </div>
//                     <div className="col-12 col-xl-6 notif-main-div">
//                         <div className="notif-main">
//                             <div className="head-title-notif">
//                                 <p className="txt-notif">
//                                     Sign up to be notified of new features and updates.
//                                 </p>
//                                 <p className="txt-notif under">
//                                     Provide your email to receive updates on new features and support for more use cases.
//                                 </p>
//                             </div>
//                             <div className="input-box-notif">
//                                 <div className="input-fix-with-btn">
//                                     <input type="text" placeholder="Email" className="notif-input-email" />
//                                     <button className="notif-btn-edit">Get updates</button>
//                                 </div>
//                             </div>
//                             <div className="text-under-input-notif">
//                                 <span className="under-email-input-notif">You can unsubscribe at any time. Read our <span id="privacy-policy-color">privacy policy.</span>
//                                 </span>
//                             </div>
//                         </div>
//                     </div>


//                     {/* <div className="col-12 helpful-main-box">
//                         <div className="helpful-item">
//                             <div className="for-text-helpfull">
//                                 <span className="txt-helpful-ques">Was this page helpful ? </span>
//                             </div>
//                             <div className="yes-or-no-btn">
//                                 <button className="yes-or-no-btns-edit">
//                                 <i className="fas fa-thumbs-up helpful-icon-edit"></i>
//                                 yes
//                                 </button>
//                                 <button className="yes-or-no-btns-edit">
//                                 <i className="fas fa-thumbs-down helpful-icon-edit"></i>
//                                 no

//                                 </button>
//                             </div>
//                         </div>
//                     </div> */}
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Notife;



import React, { Component } from 'react'
import { checkTranslation } from '../utils/useful';

class Notife extends Component {
    state = {
        box: [
            {
                img: '/assets/svg/svg25.svg',
                ques: '{{lang}}academy-developer-up-footer',
                link: '{{lang}}Academy',
                address:'/academy'
            },
            {
                img: '/assets/svg/svg26.svg',
                ques: '{{lang}}Questions',
                link: '{{lang}}contactus',
                address:'/contact_us'

            },
            {
                img: '/assets/svg/svg24.svg',
                ques: '{{lang}}youtube-developer-up-footer',
                link: '{{lang}}Youtube'
            },
            
        ]
    }
    render() {
        return (
            <div className=" mt-4 mb-5">
                <div className="">
                    <div className="row m-0 w-100">
                        <div className="col-12 p-0 d-flex align-items-center">
                            <div className=" align-items-center justify-content-center row m-0 p-0">
                                {this.state.box.map((prop, index) => {
                                    return (
                                        <div className="col-12 p-0 mb-2 d-flex justify-content-start align-items-center" >
                                            <img src={prop.img} alt="" className='' />
                                            <span className='mx-2'>{checkTranslation(prop.ques)}</span>
                                            <a href={prop.address} style={{ color: 'rgb(192, 0, 58)' }}>{checkTranslation(prop.link)}</a>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        {/* <div className="col-12 col-xl-6 d-flex align-items-center">
                            <div className="notif-main">
                                <div className="head-title-notif">
                                    <p className="txt-notif mb-2">
                                        Sign up to be notified of new features and updates.
                                    </p>
                                    
                                </div>
                                <div className="input-box-notif">
                                    <div className="input-fix-with-btn">
                                        <input type="text" placeholder="Email" className="notif-input-email" />
                                        <button className="notif-btn-edit">Get updates</button>
                                    </div>
                                </div>
                                <div className="text-under-input-notif">
                                    <span className="under-email-input-notif">You can unsubscribe at any time. Read our <span id="privacy-policy-color">privacy policy.</span>
                                    </span>
                                </div>
                            </div>
                        </div> */}


                        {/* <div className="col-12 helpful-main-box">
                        <div className="helpful-item">
                            <div className="for-text-helpfull">
                                <span className="txt-helpful-ques">Was this page helpful ? </span>
                            </div>
                            <div className="yes-or-no-btn">
                                <button className="yes-or-no-btns-edit">
                                <i className="fas fa-thumbs-up helpful-icon-edit"></i>
                                yes
                                </button>
                                <button className="yes-or-no-btns-edit">
                                <i className="fas fa-thumbs-down helpful-icon-edit"></i>
                                no

                                </button>
                            </div>
                        </div>
                    </div> */}
                    </div>
                </div>

            </div>
        )
    }
}

export default Notife;

