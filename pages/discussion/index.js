import React from 'react'
import DiscussionBox from '../../components/DiscussionBox';
import Header from '../../components/Header';
import PageDirection from '../../components/PageDirection';

const index = () => {
    return (
        <div>
            <Header />
            <div className="container edit-page-root">
                <PageDirection
                    firstpage={"checkout"}
                    secondpage={"Home"}
                    thirdpage={"forum"}
                    fourpage={"Message"}

                />
            </div>

            <DiscussionBox />

        </div>
    )
}

export default index;
