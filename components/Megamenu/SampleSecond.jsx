// import React from 'react'


// let megaMenu = [
//     {
//         list: 'about us',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg8.svg',
//     },
//     {
//         list: 'contact us',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg6.svg',
//     },
//     {
//         list: 'blogs',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg7.svg',
//     },
//     {
//         list: 'ticketing',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg8.svg',
//     },
//     {
//         list: 'partners',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg6.svg',
//     },
//     {
//         list: 'request service',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg6.svg',
//     },
//     {
//         list: 'privacy & policy',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg6.svg',
//     },
//     {
//         list: 'terms of use',
//         // txt: 'Unify online and in-person payments',
//         img: '/assets/svg/svg6.svg',
//     },



// ]

// const SampleSecond = ({ change, changeLocation, deletLocation }) => {









//     return (




//         <div className="content-mega-menu-second" onMouseEnter={() => changeLocation()} onMouseLeave={deletLocation}>
//             <div className="row-mega-menu-second">
//                 <ul className="mega-links-second">
//                     {megaMenu?.map((option, index) => {
//                         return (
//                             <div className="label-mega-menu-second  align-items-center">
//                                 <div className="box-img-mega-menu align-items-center">
//                                     <img src={option.img} alt="" className="edit-label-img-second" />
//                                 </div>
//                                 <div className="list-txt-mega-menu-second">
//                                     <li className="mega-link-items-second">{option.list}</li>
//                                     {/* <li className="mega-link-items-second-under">{option.txt}</li> */}
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </ul>
//             </div>

//         </div>






//     )
// }


// export default SampleSecond;



import Link from 'next/link';
import React from 'react'
import { checkTranslation } from '../../utils/useful';


const megaMenu = [

    // {
    //     list: "about us",
    //     link: "/about_us",

    //     img: "/assets/svg/svg8.svg",
    // },

    // {
    //     list: "contactus",
    //     link: "/contact_us",

    //     img: "/assets/svg/svg1.svg",
    // },

    {
        list: "{{lang}}blogs",
        link: "/blogs",
        txt:"{{lang}}blogs-header-desc",
        img: "/assets/svg/svg3.svg",
    },
    {
        list: "{{lang}}ticketing",
        link: "/ticketing",
        txt:"{{lang}}ticketing-header-desc",
        img: "/assets/svg/svg10.svg",
    },
    {
        list: "{{lang}}Partners",
        link: "/partners",
        txt:"{{lang}}partners-header-desc",
        img: "/assets/svg/svg9.svg",
    },
    {
        list: "{{lang}}Request-Service",
        link: "/request_service",
        txt:"{{lang}}request_service-header-desc",
        img: "/assets/svg/svg5.svg",
    },
    {
        list: "{{lang}}privacy-policy",
        link: "/privacy_and_policy",
        txt:"{{lang}}privacy_and_policy-header-desc",
        img: "/assets/svg/svg6.svg",
    },
    {
        list: "{{lang}}terms-of-use",
        link: "/jobs_and_opportunities",
        txt:"{{lang}}terms_of_use-header-desc",
        img: "/assets/svg/svg7.svg",
    },

    // {
    //     title: 'Design Anything',
    //     list: 'about us',
    //     list1: 'contact us',
    //     list2: 'blogs',
    //     list3: 'ticketing',
    //     // txt: 'partners',
    //     img: '/assets/svg/svg8.svg',
    //     img1: '/assets/svg/svg1.svg',
    //     img2: '/assets/svg/svg3.svg',
    //     img3: '/assets/svg/svg10.svg',

    // },
    // {
    //     title: 'FINANCIAL SERVICES',
    //     list: 'partners',
    //     list1: 'request service',
    //     list2: 'privacy & policy',
    //     list3: 'terms of use',
    //     // txt: 'tech-internet',
    //     img: '/assets/svg/svg9.svg',
    //     img1: '/assets/svg/svg5.svg',
    //     img2: '/assets/svg/svg6.svg',
    //     img3: '/assets/svg/svg7.svg',

    // },
    // {
    //     title: 'BUSINESS',
    //     list: 'IOT',
    //     list1: 'Tech',
    //     list2: 'Sensor',
    //     list3: 'Light',
    //     txt: 'tech-internet',
    //     img: '/assets/svg/svg17.svg',
    //     img1: '/assets/svg/svg18.svg',
    //     img2: '/assets/svg/svg19.svg',
    //     img3: '/assets/svg/svg20.svg',

    // },
]

const SampleSecond = ({ deletLocation, changeLocation }) => {



    const changeWidth = () => {

        changeLocation();

        // const wW = document.getElementById('mega-box');

        // const testWidth = wW.getBoundingClientRect().width;

        // wW.style.left = ((window.innerWidth - testWidth) / 2) + 'px';

    }

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




    return (


        <>
            <div className="content-mega-menu p-3" onMouseEnter={() => changeWidth()} onMouseLeave={deletLocation} >
                {megaMenu?.map((option, index) => {
                    return (
                        <Link href={option.link}>
                            <a className="col-md-6 d-flex justify-content-start" style={{ cursor: 'pointer' }} onClick={deletLocation}>

                                <div>
                                    <div className="mega-links">
                                        <div className="label-mega-menu">
                                            <div className="box-img-mega-menu">
                                                <img src={option.img} alt="" className="edit-label-img" />
                                            </div>
                                            <div className="list-txt-mega-menu mld-3">
                                                <a className="mega-link-items">{checkTranslation(option.list)} </a>
                                                <a className="mega-link-items-und">{checkTranslation(option.txt)} </a>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </a>

                        </Link>
                    )
                })}


            </div>


            {/* 
            <div className="content-mega-menu p-4" onMouseEnter={() => changeWidth()} onMouseLeave={deletLocation} >
                {megaMenu?.map((option, index) => {

                    return (
                        <Link href={"option.list"}>
                        <a className="col-xl-6 row-mega-menu">
                        <div >
                            <ul className="mega-links ">
                                <div className="label-mega-menu">
                                    <div className="box-img-mega-menu">
                                        <img src={option.img} alt="" className="edit-label-img" />
                                    </div>
                                    <div className="list-txt-mega-menu">
                                        <li className="mega-link-items">{option.list}</li>
                                        <li className="mega-link-items">{option.txt}</li>
                                    </div>
                                </div>
                                <div className="label-mega-menu">
                                    <div className="box-img-mega-menu">
                                        <img src={option?.img1} alt="" className="edit-label-img" />
                                    </div>
                                    <div className="list-txt-mega-menu">
                                        <li className="mega-link-items">{option.list1}</li>
                                        <li className="mega-link-items">{option.txt}</li>
                                    </div>
                                </div>
                                <div className="label-mega-menu">
                                    <div className="box-img-mega-menu">
                                        <img src={option?.img2} alt="" className="edit-label-img" />
                                    </div>
                                    <div className="list-txt-mega-menu">
                                        <li className="mega-link-items">{option.list2}</li>
                                        <li className="mega-link-items">{option.txt}</li>
                                    </div>
                                </div>
                                <div className="label-mega-menu">
                                    <div className="box-img-mega-menu">
                                        <img src={option?.img3} alt="" className="edit-label-img" />
                                    </div>
                                    <div className="list-txt-mega-menu">
                                        <li className="mega-link-items">{option.list3}</li>
                                        <li className="mega-link-items">{option.txt}</li>
                                    </div>
                                </div>

                            </ul>
                        </div>
                        </a>
                        </Link>
                    )
                })}

                
            </div> */}

            <div className="for-txt-under d-flex flex-column px-4 py-3" style={{ cursor: 'pointer', maxWidth: '450px', width: '100%', backgroundColor: '#f6f9fc' }} onMouseEnter={() => changeWidth()} onMouseLeave={deletLocation} >
                <Link href={'/about_us'}>
                    <a className="handle-txt-mega-menu my-1 d-flex align-items-center justify-content-start">
                        <img src="/assets/svg/svg8.svg" style={{ width: '20px' }} alt="" />
                        <span className='mld-3 ' style={{ marginLeft: 6,fontWeight:500 }}>{checkTranslation('{{lang}}aboutus')}</span>
                    </a>
                </Link>
                <div className="for-text-under-it">
                    <span className='text-smaller'>{checkTranslation('{{lang}}desc-under-about-us-header-megamenu')}</span>
                </div>
            </div>

        </>




    )

}

export default SampleSecond;

