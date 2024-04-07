// import React from 'react'
// import HttpServices from '../../utils/Http.services';
// import { imageAddress } from '../../utils/useful';
// import { useEffect, useState } from 'react';

// // export async function getServerSideProps(context) {


// //     let lng = context.locale
// //     if (!lng) {
// //       lng = 'en'
// //     }

// //     const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases", lng })).result
// //     const list= json.info
// //     // const res = await fetch('https://www.iotsmile.com/iot/apiv1', {
// //     //   method: "POST",
// //     //   body: JSON.stringify({
// //     //     route: "values/getValuesWithData",
// //     //     content: {
// //     //       page: "Usecases",
// //     //       // _id: id
// //     //     }
// //     //   })
// //     // })

// //     // const json = await res.json()

// //     return {
// //       props: { list }
// //     }

// //   }


// const megaMenu = [
//     {
//         title: 'Design Anything',
//         list: 'IOT',
//         list1: 'Tech',
//         list2: 'Sensor',
//         list3: 'Light',
//         txt: 'tech-internet',
//         img: '/assets/svg/svg21.svg',
//         img1: '/assets/svg/svg22.svg',
//         img2: '/assets/svg/svg23.svg',
//         img3: '/assets/svg/svg12.svg',

//     },
//     {
//         title: 'FINANCIAL SERVICES',
//         list: 'Payment',
//         list1: 'Peyment',
//         list2: 'Billing',
//         list3: 'Connect',
//         txt: 'tech-internet',
//         img: '/assets/svg/svg13.svg',
//         img1: '/assets/svg/svg14.svg',
//         img2: '/assets/svg/svg23.svg',
//         img3: '/assets/svg/svg12.svg',

//     },
//     // {
//     //     title: 'BUSINESS',
//     //     list: 'IOT',
//     //     list1: 'Tech',
//     //     list2: 'Sensor',
//     //     list3: 'Light',
//     //     txt: 'tech-internet',
//     //     img: '/assets/svg/svg17.svg',
//     //     img1: '/assets/svg/svg18.svg',
//     //     img2: '/assets/svg/svg19.svg',
//     //     img3: '/assets/svg/svg20.svg',

//     // },
// ]

// const SampleFirst = ({ deletLocation, changeLocation}) => {



//     const[listItem,setListItem]= useState([])

//     const changeWidth = () => {

//         changeLocation();

//         // const wW = document.getElementById('mega-box');

//         // const testWidth = wW.getBoundingClientRect().width;

//         // wW.style.left = ((window.innerWidth - testWidth) / 2) + 'px';

//     }

//     // setTimeout(() => {
//     //     console.log(wW.style.left)
//     // }, 100);




//     // const ChangeWidth = () => {

//     //     changeLocation();



//     //     useEffect(() => {


//     //         let wW = document.getElementById('mega-box').style.width;
//     //         console.log(wW)



//     //     })

//     // }


//      async function fetch() {

//         const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases" })).result;
//         const data = json.info;
//         setListItem(data);


//     }

//     useEffect(() => {

//         fetch();
//     },)



//     return (


//         <>

//             <div className="" onMouseEnter={() => changeWidth()} onMouseLeave={deletLocation} >
//                 <div className="">
//                 {listItem?.map((option, index) => {
//                     return (

//                             <div className="p-0 m-0">
//                                 <div className="label-mega-menu">
//                                     <div className="box-img-mega-menu">
//                                         <img src={imageAddress(option.values?.icon)} alt="" className="edit-label-img" />
//                                     </div>
//                                     <div className="list-txt-mega-menu">
//                                         <a className="mega-link-items">{option?.values?.title}</a>
//                                     </div>
//                                 </div>
//                             </div>

//                     )
//                 })}
//                 </div>
//             </div>

//         </>




//     )

// }

// export default SampleFirst;


import React from 'react'
import HttpServices from '../../utils/Http.services';
import { imageAddress } from '../../utils/useful';
import { useEffect, useState } from 'react';
// import { useSSE } from "use-sse";
import useSWR from 'swr'
import Link from 'next/link';

const fetcher = async ({rlng,changeLocation}) => {

    let lng = rlng
    if (!lng) {
        lng = 'en'
    }

    console.log(lng)



    const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases", lng })).result;
    const data = json.info;

    changeLocation()
    console.log("data")
    // console.log(data)

    return data

}

const SampleFirst = ({ deletLocation, changeLocation,lng,data }) => {


    // const { data, error } = useSWR({lng,changeLocation}, fetcher)

    // if (error) return 'we have error';
    // if (!data) return 'loading';




    const changeWidth = () => {



        changeLocation();



        // const wW = document.getElementById('mega-box');

        // const testWidth = wW.getBoundingClientRect().width;

        // wW.style.left = ((window.innerWidth - testWidth) / 2) + 'px';

    }

    useEffect(()=>{
        console.log("DATA CHANGED")
        setTimeout(() => {
            changeLocation();
        }, 10);

    },[data])

    // setTimeout(() => {
    //     console.log(wW.style.left)
    // }, 100);




    // const ChangeWidth = () => {

    //     changeLocation();



    //     useEffect(() => {


    //         let wW = document.getElementById('mega-box').style.width;
    //         console.log(wW)



    //     })

    // }


    // const [listItem,setListItem] = useState([])


    //  async function fetch() {

    //     const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases" })).result;
    //     const data = json.info;
    //     setListItem(data);


    // }

    // SampleFirst.getInitialProps = async (ctx) => {

    //     const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases" })).result;

    //     console.log(json.info)
    //     return { stars:json.info }
    //   }


    // const [testData,setTestData] = useState(null)


    // useEffect(() => {
    //     console.log(props.list)


    //     async function getDataTest() {

    //     const json = await (await HttpServices.syncRequest('getContents', { page: "Usecases" })).result;
    //     setTestData(json.info)
    //     }
    //     getDataTest()



    // },[])






    return (


        <>

            <div className="content-mega-menu p-3" style={{ maxWidth: 550,minWidth:250 }} onMouseEnter={() => changeWidth()} onMouseLeave={deletLocation} >
                {data?.map((option, index) => {
                    return (
                        <Link href={"/usecase/" + option._id}>
                            <a className="col-md-4 d-flex justify-content-start" onClick={deletLocation}>

                                <div>
                                    <div className="mega-links">
                                        <div className="label-mega-menu">
                                            <div className="box-img-mega-menu">
                                                <img src={imageAddress(option.values?.icon)} alt="" className="edit-label-img-size" />
                                            </div>
                                            <div className="list-txt-mega-menu mld-3">
                                                <a className="mega-link-items">{option.values?.title}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                        </Link>
                    )
                })}

                {!data &&(
                    <p>Loading ...</p>
                )}


            </div>


        </>




    )

}




export default SampleFirst;


