import React from "react";
import HttpServices from "../../utils/Http.services";
import CourseBox from "../../components/boxes/CourseBox";

export async function getServerSideProps(context) {
    let text = null
    if (context?.query?.text) {
        text = context.query?.text
    }

    // let body = {}
    // // if (category && category != '') {
    // //   body.filter = {}
    // //   body.filter['categories'] = category
    // // }

    // body.getCount = true
    // body.limit = limit
    // body.skip = page

    // // let lng = context.locale
    // // if (!lng) {
    // //   lng = 'en'
    // // }
    // // body.lng = lng
    // console.log(body)

    let body = {
        text
    }

    // // const course = await (await HttpServices.syncRequest('getOneCourse', { _id: text })).result

     const searchResults = await (await HttpServices.syncRequest('searchCourses', body)).result


    // const topCourses = await (await HttpServices.syncRequest('getCourses', {limit:4})).result

    // const baners = await (await HttpServices.syncRequest('getbaners', {})).result

    // console.log('courses', baners)


    // const banners = await (
    //   await HttpServices.syncRequest("getContents", {
    //     page: "advertisements",
    //     lng,
    //   })
    // ).result;


    return JSON.parse(JSON.stringify({
        props: {
            searchResults: searchResults?.info,

            // totalCount: courses.count,

            // currentPage: page,

            // limit
            text: text
        }
    }))
}
class search extends React.Component {
    // state = {
    //     // showDocument: false,
    //     searchResults: null,

    // }
    // componentDidMount() {

    //     this.getData(this.props.text)

    // }

    // // doSearch = (search) => {
    // //     clearTimeout(this.searchTimer)
    // //     if (search && search != '') {
    // //         this.searchTimer = setTimeout(() => {
    // //             this.getData(search)
    // //         }, 300);
    // //     } else {
    // //         this.setState({ searchResults: null })
    // //     }

    // // }

    // getData = (text) => {

    //     HttpServices.request('searchCourses', { text }, (fetchResult, fetchError, fetchStatus) => {
    //         this.setState({ isPostingData: false })
    //         if (fetchError) {
    //             return
    //         }
    //         this.setState({ searchResults: fetchResult.info })
    //         console.log('searchResults', fetchResult);
    //     })

    // }

    render() {
        return (
            <div className="container">
                <h1 className="text-color-1 pt-4 pb-2 px-4 font-light">نتایج جستجو برای:  "{this.props.text}"</h1>
                <div className='row d-flex flexcc' style={{ flexWrap: "wrap" }}>
                    {this.props.searchResults && this.props.searchResults.length > 0 && this.props.searchResults?.map((item, index) => {
                        return (
                            <div className="col-12 col-md-6 col-lg-3 mb-4 ">
                                <CourseBox data={item} />
                            </div>
                        )
                    })}

                    {this.props.searchResults && this.props.searchResults.length == 0 && (
                        <p className=' py-5 text-color-1 text-mega-big'>موردی پیدا نشد!</p>
                    )}
                </div>
            </div>
        )
    }
}

export default search;