import React, { useEffect, useState } from 'react';
import Banner from '../../../components/Banner';
import Description from '../../../components/Description';
import SectionDiv from '../../../components/SectionDiv';
import HttpServices from '../../../utils/Http.services';


export async function getServerSideProps(context) {


    let slug = null
    if (context?.query?.slug) {
        slug = context.query?.slug
    }

    let body = { filter: { course: slug } }



    const courseRes = await (await HttpServices.syncRequest('getOneCourse', { _id: slug })).result
    const lessonsRes = await (await HttpServices.syncRequest('getLessons', body)).result




    return {
        props: JSON.parse(JSON.stringify({
            lessons: lessonsRes.info,
            course: courseRes.info,
            // categories: catsRes.info,
            // currentPage: page,
            // category: catsRes.info,
            // limit
        }))
    }



}






const Home = ({ lessons, course }) => {


    return (

        <>



            <Banner course={course} lessons={lessons} />

            {course?.teacher?.values?.bio && (
                <Description course={course} lessons={lessons} />
            )}
            <SectionDiv lessons={lessons} />


            {/* <div>
                <h1>
                    fetch data
                </h1>
                {paymentList.map(item => (
                    <div
                    key={item.id}>
                        <a>
                            <h4>
                            {item.name}

                            </h4>
                        </a>
                        </div>
                ))}

            </div> */}



        </>





    )
}


export default Home;
