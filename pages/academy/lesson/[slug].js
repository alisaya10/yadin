import NavbarSecond from '../../../components/LessonPage'

import React, { Component } from 'react'
import HttpServices from '../../../utils/Http.services'



export async function getServerSideProps(context) {


    let slug = null
    if (context?.query?.slug) {
        slug = context.query?.slug
    }

    // let body = { filter: { course: slug } }


    const lessonRes = await (await HttpServices.syncRequest('getOneLesson', { _id: slug })).result
    // console.log("lessonRes")
    // console.log(lessonRes)

    let course = null
    if (lessonRes && lessonRes.info.course && lessonRes.info.course[0]) {
        course = lessonRes.info.course[0]?._id
        lessonRes.info.course = lessonRes.info.course[0]
    }
    // const courseRes = await (await HttpServices.syncRequest('getOneCourse', { _id: lessonRes.info.c })).result
    const lessonsRes = await (await HttpServices.syncRequest('getLessons', { filter: { course: course },sort:{priority:1} })).result

    // console.log("course")
    // console.log(lessonsRes)

    // console.log(course)

    return {
        props: JSON.parse(JSON.stringify({
            lessons: lessonsRes.info,
            lesson: lessonRes?.info,
            // categories: catsRes.info,
            // currentPage: page,
            // category: catsRes.info,
            // limit
        }))
    }



}


class index extends Component {
    render() {
        return (
            <div>

                <NavbarSecond lesson={this.props.lesson} lessons={this.props.lessons}/>

            </div>
        )
    }
}

export default index;
