import Ads from './Ads';
import LessonInfo from './LessonInfo';
import SideBarBrowse from './SidebarBrowse.jsx';

import React, { Component } from 'react'
import { imageAddress } from '../utils/useful';

class NavbarSecond extends Component {
    render() {
        return (
            <div className="container-fluid p-0 m-0">
                <div className="row p-0 m-0">
                    <aside className="col-xl-3 pt-2">
                        {/* SideBarBrowse */}
                        <SideBarBrowse
                            props={true}
                            lessons={this.props.lessons}
                            lesson={this.props.lesson}

                        />
                    </aside>
                    <main className="col-xl-9 p-0">
                        {this.props.lesson?.video && (

                            <div className="container-fluid p-0">
                                <video src={imageAddress(this.props.lesson?.video)}  controlsList="nodownload" poster={imageAddress(this.props.lesson?.video.cover)} autoPlay controls muted />
                            </div>
                        )}

                        <div className="d-block d-lg-none ">
                            <SideBarBrowse
                                props={false}
                            />
                        </div>

                        {/* <Ads /> */}
                        <LessonInfo lesson={this.props.lesson} />

                        <div style={{ color: '#202020', fontSize: 16 }} dangerouslySetInnerHTML={{ __html: this.props?.lesson?.body }}>

                        </div>

                    </main>
                </div>

            </div>
        )
    }
}

export default NavbarSecond;
