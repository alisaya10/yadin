import React, { Component } from 'react'
import Forums from '../../components/Forums'
import HttpServices from '../../utils/Http.services';
// import DeveloperTitle from '../../components/DeveloperTitle';
import Link from 'next/link';
import { checkTranslation } from '../../utils/useful';
// import { imageAddress } from '../../utils/useful';
// import Pagination from '../../components/Pagination';


export async function getServerSideProps(context) {



    let limit = 15
    let page = 0
    if (context?.query?.page) {
        page = Number(context?.query?.page) - 1
    }
    let category = null
    if (context?.query?.category) {
        category = context.query?.category
    }

    let body = {}
    body.filter = {}

    if (category && category != '') {
        body.filter['category'] = category
    }
    // body.filter.status = '1'
    body.getCount = true
    body.limit = limit
    body.skip = page

    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }
    body.lng = lng


    const catsRes = await (await HttpServices.syncRequest('getContents', { lng, page: 'ForumsCategories' })).result
    // console.log("getUsersQuestions")
    const docsRes = await (await HttpServices.syncRequest('getUsersQuestions', body,context)).result
    const AdsJson = await (await HttpServices.syncRequest('getRandomContents', { filter: { "values.pages": 'forum-main' }, count: 2, page: "advertisements", lng })).result
    const specialsRes = await (await HttpServices.syncRequest('getSpecialQuestions', { lng })).result

    if (category) {
        category = await (await HttpServices.syncRequest('getOneContent', { _id:category })).result
        if(category){
            category = category.info
        }
    }

    // console.log(category)

    return {
        props: JSON.parse(JSON.stringify({
            categories: catsRes ? catsRes.info : null,
            questions: docsRes ? docsRes.info : [],
            lng,
            totalCount: docsRes?.count,
            limit,
            currentPage: page,
            category,
            ads: AdsJson.info,
            featured: specialsRes.info,


        }))
    }



}

class index extends Component {

    state = {
        // showDocument: false,
        searchResults: null,

    }

    doSearch = (search) => {
        clearTimeout(this.searchTimer)
        if (search && search != '') {
            this.searchTimer = setTimeout(() => {
                this.getData(search)
            }, 300);
        } else {
            this.setState({ searchResults: null })
        }

    }

    getData = (search) => {

        HttpServices.request('searchQuestions', { search }, (fetchResult, fetchError, fetchStatus) => {
            this.setState({ isPostingData: false })
            if (fetchError) {
                return
            }
            this.setState({ searchResults: fetchResult.info })
        })

    }



    render() {



        return (
            <div>
                {/* <Header /> */}
                {/* <DocListSec 
            props={1}
            data={[1,1,1,1,1]}
            /> */}



                <div className="blog-hero flex-column flexcc pt-5" style={{ backgroundImage: "url('/images/svg-8.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

                    <h1 className="mb-1 blog-hero-header">{checkTranslation('{{lang}}IoTSmile Forums')}</h1>
                    <p className="mb-3 " style={{ color: '#fff', fontSize: 24 }}>{checkTranslation('{{lang}}forums-desc')}</p>

                    <div className="blog-inputbox position-relative mb-5">
                        <input className="blog-input" placeholder={checkTranslation('{{lang}}Search-box-forum')} style={{ fontSize: 16 }} onChange={e => this.doSearch(e.target.value)} />
                        <button className="input-search-button">
                            <img src="/images/icons/search.svg" className="input-searchicon" />
                        </button>

                        <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 36, backgroundColor: '#ffffff', borderRadius: '0px 0px 8px 8px' }}>
                            {this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                                return (
                                    <Link href={'/forums/question/' + prop._id} >
                                        <a >
                                            <div className="px-2 py-2 flexc" style={{ borderTop: '1px solid #f2f6f8' }}>
                                                {/* <img src={imageAddress(prop.image, null, "small")} height={20} style={{ borderRadius: 2 }} /> */}
                                                <p className="m-0 mx-1" style={{ fontSize: 14, lineHeight: 1 }}>{prop.title}</p>
                                            </div>
                                        </a>
                                        {/* <p style={{fontSize:12}}>the text for this</p> */}
                                    </Link>
                                )
                            })}

                            {this.state.searchResults && this.state.searchResults.length == 0 && (
                                <p className='text-center py-2'>{checkTranslation('{{lang}}foundNothing')}</p>
                            )}
                        </div>



                    </div>
                    {/* <div className="blog-hero-pbox">
                        <p className="blog-hero-p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div> */}
                </div>

                <Forums ads={this.props.ads} categories={this.props.categories} questions={this.props.questions} currentPage={this.props.currentPage} totalCount={this.props.totalCount} limit={this.props.limit} category={this.props.category} featured={this.props.featured} />






            </div>
        )
    }
}

export default index;