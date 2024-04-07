import React from 'react'
import DiscussionBox from '../../../components/DiscussionBox';
import HttpServices from '../../../utils/Http.services';
// import PageDirection from '../../../components/PageDirection';


export async function getServerSideProps(context) {



    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }

    let slug = null

    if (context?.query?.slug) {
        slug = context?.query?.slug
    }

    const questionRes = await (await HttpServices.syncRequest('getOneQuestion', { _id: slug })).result


    return {
        props: JSON.parse(JSON.stringify({ lng, question: questionRes ? questionRes.info : null, }))
    }



}

const index = ({ ...props }) => {
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

            <DiscussionBox lng={props?.lng} question={props.question} />

        </div>
    )
}

export default index;
