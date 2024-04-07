import React from 'react'
import DiscussionBox from '../../../components/DiscussionBox';
// import PageDirection from '../../../components/PageDirection';


export async function getServerSideProps(context) {


    
    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }

    return {
        props: JSON.parse(JSON.stringify({ lng }))
    }



}

const index = ({...props}) => {
    return (
        <div>
            
            {/* <div className="container edit-page-root">
                <PageDirection
                    firstpage={"checkout"}
                    secondpage={"Home"}
                    thirdpage={"forum"}
                    fourpage={"Message"}

                />
            </div> */}

            <DiscussionBox lng={props?.lng}/>

        </div>
    )
}

export default index;
