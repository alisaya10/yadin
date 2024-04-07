import Ads from './Ads';
import LessonInfo from './LessonInfo';
import SideBarBrowse from './SidebarBrowse.jsx';

import React, { Component } from 'react'
import { imageAddress } from '../utils/useful';

class LessonPage extends Component {

    changeIndex = (number) => {

    }
    render() {
        return (
            <div className=" p-0 m-0">
                <div className="row p-0 m-0">
                    <aside className="col-12 col-md-4 col-xl-3 pt-2" style={{ backgroundColor: '#f2f6f8' }}>
                        {/* SideBarBrowse */}
                        <SideBarBrowse
                            props={true}
                            lessons={this.props.lessons}
                            lesson={this.props.lesson}
                        />
                    </aside>
                    <main className="col-12 col-md-8 col-xl-9 p-0 pb-5 pt-4">
                        <div className='px-4'>

                            {this.props.lesson?.video && (

                                <div className=" p-0">
                                    <video src={imageAddress(this.props.lesson?.video)}  controlsList="nodownload" poster={imageAddress(this.props.lesson?.video.cover)} autoPlay controls muted />
                                </div>
                            )}

                            {/* <div className="d-block d-lg-none ">
                            <SideBarBrowse
                                props={false}
                            />
                            </div> */}

                            {/* <Ads /> */}


                            <LessonInfo lesson={this.props.lesson} lessons={this.props.lessons}  />
                            <div className='flexcc flex-column pt-3'>
                                <div className='ck-content' style={{ maxWidth: 800 }}>

                                    <div style={{ color: '#202020', fontSize: 16 }} dangerouslySetInnerHTML={{ __html: this.props?.lesson?.body }}>

                                    </div>


                                </div>
                            </div>
                        </div>

                    </main>
                </div>

            </div>
        )
    }
}

export default LessonPage;
