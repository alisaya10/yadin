
import React, { Component } from 'react'
import Question from '../../../components/Question';
import HttpServices from '../../../utils/Http.services';


export async function getServerSideProps(context) {


    let slug = null

    if (context?.query?.slug) {
        slug = context?.query?.slug
    }

    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }


    const questionRes = await (await HttpServices.syncRequest('getOneQuestion', { _id:slug })).result
    const AdsJson = await (await HttpServices.syncRequest('getRandomContents', { filter: { "values.pages": 'forum-question' }, count: 2, page: "advertisements", lng })).result

    // const docsRes = await (await HttpServices.syncRequest('getDocsSummary', { lng })).result
    // console.log(AdsJson)


    return {
        props: JSON.parse(JSON.stringify({ question: questionRes ? questionRes.info : null, answers: questionRes ? questionRes.answers : [],lng ,ads: AdsJson.info}))
    }



}


class questionPage extends Component {
    render() {
        return (
            <div className='container'>

                {/* <DocListSec 
            props={2}
            /> */}
                <Question question={this.props.question} answers={this.props.answers} ads={this.props.ads}/>

            </div>
        )
    }
}


export default questionPage;
