// import Link from 'next/link'
// import CardContain from './CardContain'
// import Community from './Community'
// import TestOver from './TestOver'



// // export const getStaticProps = async () => {


// //     const res = await fetch('https://jsonplaceholder.typicode.com/users');

// //     const data = await res.json();


// //     return {
// //      props: { paymentList : data }
// //     }

// // } 


// // const paymentList = [
// //     { names: 'Online payment', option: 'How card work',optionsec: 'Sample integration',optionthird: 'Accept a payment',  optionfourth: 'More payment' },
// //     { names: 'Invoicing', option: 'How card work', optionsec: 'Sample ', optionthird: 'Accept a payment', optionfourth: 'More payment' },
// //     { names: 'Subscriptions', option: 'How anything work', optionsec: 'Sample integration', optionthird: 'Accept a ', optionfourth: 'More payment' },
// //     { names: 'Quotes', option: 'How Quotes work', optionsec: 'Sample integration', optionthird: ' a payment', optionfourth: 'More payment' },
// //     { names: 'In-personpayment', option: 'How card work', optionsec: 'Sample integration', optionthird: 'Accept a payment', optionfourth: 'More payment' },
// //     { names: 'Multiparty payment', option: 'How card work', optionsec: 'Sample ', optionthird: 'Accept a payment', optionfourth: 'More payment' },

// // ]

// // const paymentListSec = [
// //     { names: 'After the payment', option: 'How card work', optionsec: 'Sample integration', optionthird: 'Accept a payment', optionfourth: 'More payment' },
// //     { names: 'Add payment method', option: 'How card work', optionsec: 'Sample ', optionthird: 'Accept a payment', optionfourth: 'More payment' },
// //     { names: 'Stripe checkout', option: 'How anything work', optionsec: 'Sample integration', optionthird: 'Accept a ', optionfourth: 'More payment' },
// //     { names: 'Quotes', option: 'How Quotes work', optionsec: 'Sample integration', optionthird: ' a payment', optionfourth: 'More payment' },
// //     { names: 'In-personpayment', option: 'How card work', optionsec: 'Sample integration', optionthird: 'Accept a payment', optionfourth: 'More payment' },
// //     { names: 'Multiparty payment', option: 'How card work', optionsec: 'Sample ', optionthird: 'Accept a payment', optionfourth: 'More payment' },

// // ]


// const ContentSide = (props) => {




//     return (
//         <div className="container-fluid m-0 p-0">
//             <div className="wrapp m-0 p-0 content-side-wrap">
//                 <div className="row content-row-wrap-edit m-0 p-0">
//                     <div className="col-lg-3 p-0 new-sidebar">
//                         <div className="for-list-any">
//                             <ul className="main-list-item-any">
//                                 {/* {paymentList.map(list => ( */}
//                                 {/* <li className="top-item-list">{props.headTitle}</li> */}


//                                 {/* <TestOver  /> */}
//                                 {/* // key={id}
//                                         // items={item.name.value}
//                                         // option={username}
//                                         // optionsec={street}
//                                         // optionthird={city}
//                                         // optionfourth={email} */}




//                                 <div>

//                                     {products.map((product) => (
//                                         <>

//                                             <div className="box-for-list-item-any">
//                                                 <i className={open ? 'fas fa-angle-down angel-item' : 'fas fa-angle-right angel-item'}></i>
//                                                 <li className="list-item-any" onClick={openToggle}></li>
//                                             </div>

//                                             <div className="inner-list-item" >
//                                                 <span className="inner-item-any">{product.name}</span>
//                                                 <span className="inner-item-any">{product.name}</span>
//                                                 <span className="inner-item-any">{product.name}</span>
//                                                 <span className="inner-item-any">{product.name}</span>
//                                             </div>
//                                         </>




//                                     ))}


//                                 </div >



//                                 <div className="line"></div>
//                                 {/* {paymentListSec.map(item => (
//                                     <>
//                                         <TestOver
//                                             items={item.names}
//                                             option={item.option}
//                                             optionsec={item.optionsec}
//                                             optionthird={item.optionthird}
//                                             optionfourth={item.optionfourth}

//                                         />

//                                     </>
//                                 ))} */}


//                             </ul>
//                         </div>
//                     </div>
//                     <div className="col-lg-9 p-0 side-right">
//                         <div className="right-side-box">
//                             <div className="title-and-route-line">
//                                 <div className="items-rout-name">
//                                     <div className="route-small-logo">
//                                         <img src="/assets/ad.png" alt="" className="edit-route-small-logo" />
//                                     </div>
//                                     <div className="just-name-route">
//                                         <span className="check">Check out .</span>
//                                         <span className="check-route">Home </span>
//                                         <span className="check-route">/</span>
//                                         <span className="check-route"> payments </span>
//                                         <span className="check-route">/</span>
//                                         <span className="check-route"> Stripe checkout</span>
//                                     </div>

//                                 </div>
//                                 <div className="head-title-content-side">
//                                     <div className="head-title-content-side-txt">
//                                         <h3>ThingsBoard Documentation</h3>
//                                         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, deleniti harum enim eveniet aspernatur laudantium?</p>
//                                     </div>
//                                 </div>

//                                 <CardContain
//                                     headerTitle='Start with a guid'


//                                 />
//                                 <div className="for-margin">
//                                     <CardContain
//                                         headerTitle='Try Sample project'
//                                     />
//                                 </div>
//                                 <div className="for-margin">
//                                     <CardContain
//                                         headerTitle='Try Sample project'
//                                     />
//                                 </div>

//                                 {/*  */}
//                                 {/* <div className="card-in-content-side down-added">
//                                     <div className="title-card-content ">
//                                         <h4>try sample project</h4>
//                                     </div>
//                                     <div className="card-items-content">
//                                         <div className="row content-row-wrap-edit p-0 m-0">
//                                             <div className="col-lg-4 col-md-12 card-item-content">
//                                                 <div className="inner-card-content">
//                                                     <span className="inner-title">Accept a payment</span>
//                                                     <span className="inner-title-txt">Lorem ipsum dolor sit amet consectetur . Maxime, praesentium?</span>
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-4 col-md-12 card-item-content">
//                                                 <div className="inner-card-content">
//                                                     <span className="inner-title">Accept a payment</span>
//                                                     <span className="inner-title-txt">Lorem ipsum dolor sit amet consectetur . Maxime, praesentium?</span>
//                                                 </div>
//                                             </div>
//                                             <div className="col-lg-4 col-md-12 card-item-content">
//                                                 <div className="inner-card-content">
//                                                     <span className="inner-title">Accept a payment</span>
//                                                     <span className="inner-title-txt">Lorem ipsum dolor sit amet consectetur. Maxime, praesentium?</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div> */}
//                                 <div className="item-for-github">
//                                     <div className="txt-for-github">
//                                         <div className="for-hover-github">

//                                             <Link href={""}>
//                                                 <a>
//                                                     <span className="github-txt">View all on GitHub</span>

//                                                     <i className="fas fa-share-square for-github-icon"></i>
//                                                 </a>
//                                             </Link>



//                                         </div>


//                                     </div>
//                                 </div>

//                                 <Community />

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export async function getServerSideProps(context) {
//     const res = await fetch ('https://jsonplaceholder.typicode.com/users')
//     const data = await res.json();


   
//     return {
//        props : {
//            products : data.products
//        }
//     }
// }

// export default ContentSide;
