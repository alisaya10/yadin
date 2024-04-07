// import React, { useState } from 'react';
// // import DocList from '../../components/DocList';
// import CardContain from '../../components/CardContain';
// import HttpServices from '../../utils/Http.services';

// import Link from 'next/link';
// import Community from '../../components/Community';
// import TestOver from '../../components/TestOver';
// import Notife from '../../components/Notife';
// // import SideBarBrowse from '../../components/SidebarBrowse';
// import DocListSec from '../../components/DocListSec';
// import PageDirection from '../../components/PageDirection';



// export async function getServerSideProps(context) {


//     let slug = null

//     if (context?.query?.slug) {
//         slug = context?.query?.slug
//     }

//     let lng = context.locale
//     if (!lng) {
//         lng = 'en'
//     }


//     const catsRes = await (await HttpServices.syncRequest('getContents', { page: 'DocumentsCategories' })).result

//     const docsRes = await (await HttpServices.syncRequest('getDocsSummary', {  lng })).result
//     console.log(docsRes)


//     return {
//         props: JSON.parse(JSON.stringify({ categories: catsRes ? catsRes.info : null, docs: docsRes ? docsRes.info : [] }))
//     }



//  }

// export async function getServerSideProps(context) {

//     let limit = 12
//     let page = 0
//     if (context?.query?.page) {
//         page = Number(context?.query?.page) - 1
//     }
//     let category = null
//     if (context?.query?.category) {
//         category = context.query?.category
//     }

//     let body = {}
//     if (category && category != '') {
//         body.filter = {}
//         body.filter['categories'] = category
//     }

//     body.getCount = true
//     body.limit = limit
//     body.skip = page

//     let lng = context.locale
//     if (!lng) {
//         lng = 'en'
//     }
//     body.lng = lng
//     console.log(body)

//     const blogsRes = await (await HttpServices.syncRequest('getBlogs', body)).result

//     const catsRes = await (await HttpServices.syncRequest('getContents', { page: "BlogsCategories", lng })).result

//     let specialsRes = []
//     let featured = []
//     let trendings = []
//     if (!page || page == 0) {
//         specialsRes = await (await HttpServices.syncRequest('getSpecialBlogs', { lng })).result
//         specialsRes.info.forEach(element => {
//             if (element.special && element.special.includes('trending')) {
//                 trendings.push(element)
//             }

//             if (element.special && element.special.includes('featured')) {
//                 featured.push(element)
//             }

//         });
//     }


//     // console.log("info")
//     // console.log(info)


//     // const res = await fetch('https://www.iotsmile.com/iot/apiv1', {
//     //   method: "POST",
//     //   body: JSON.stringify({
//     //     route: "values/getValuesWithData",
//     //     content: {
//     //       page: "Blogs",
//     //       lng
//     //       // _id: id
//     //     }
//     //   })
//     // })

//     // const json = await res.json()


//     // const catRes = await fetch('https://www.iotsmile.com/iot/apiv1', {
//     //   method: "POST",
//     //   body: JSON.stringify({
//     //     route: "values/getValuesWithData",
//     //     content: {
//     //       page: "BlogsCategories",
//     //       lng
//     //       // _id: id
//     //     }
//     //   })
//     // })

//     // const catJson = await catRes.json()
//     // console.log(page)

//     return {
//         props: JSON.parse(JSON.stringify({
//             blogs: blogsRes.info,
//             totalCount: blogsRes.count,
//             categories: catsRes.info,
//             currentPage: page,
//             featured: featured,
//             trendings: trendings,
//             category,
//             limit
//         }))
//     }



// }






// const Home = ({ categories, docs }) => {

//     const [showDocument, setShowDocument] = useState(false);
//     const [searchResults, setSearchResults] = useState(null);


//     const showOpenDocument = () => {

//         setShowDocument(prev => !prev);

//     }

//     const doSearch = (search) => {

//         clearTimeout(this.searchTimer)
//         if (search && search != '') {
//           searchTimer = setTimeout(() => {
//             this.getData(search)
//           }, 300);
//         }else{
//           this.setState({searchResults:null})
//         }

//       }

//       getData = (search) => {

//         HttpServices.request('searchBlogs', { search }, (fetchResult, fetchError, fetchStatus) => {
//           this.setState({ isPostingData: false })
//           if (fetchError) {
//             return
//           }
//           this.setState({ searchResults: fetchResult.info })
//         })
//     }

//     return (
//         <>


//             {/* <DocListSec
//                 data={categories}
//                 props={1}
//             /> */}

//             <div className="container-fluid m-0 p-0 doclist">
//                 <div className="wrapper">
//                     <div className="for-list-doc">
//                         <div className="col-lg-6 col-md-6 col-sm-6 mobile-edit">
//                             <div className="for-list-items">

//                                 <ul className="main-list-item-doc-under-header">

//                                     {categories?.map((item, index) => {
//                                         if (item.values?.parent == null) {
//                                             return (
//                                                 <li className="list-item-doc">

//                                                     <Link
//                                                         href={'/developer/' + item._id}

//                                                     ><a className='list-item-doc-link'
//                                                          id="mobile-device">{item.values?.title}</a></Link>


//                                                 </li>
//                                             )
//                                         }
//                                     })}




//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-lg-6 col-md-6 col-sm-6 input-handle">
//                             <div className="for-input-search-box">
//                                 <input type="text" placeholder="Search" className="search-for-doc" onChange={e => doSearch(e.target.value)} />
//                                 <div className="search-icon-doc">
//                                     <i className="fas fa-search search-doc-list-comp"></i>

//                                 </div>
//                             </div>
//                             <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 36, backgroundColor: '#ffffff', borderRadius: '0px 0px 8px 8px' }}>
//               {searchResults && searchResults.length > 0 && searchResults?.map((prop, index) => {
//                 return (
//                   <Link href={'/developers/' + prop._id} >
//                     <a >
//                       <div className="px-2 py-2 flexc" style={{ borderTop: '1px solid #f2f6f8' }}>
//                         <img src={imageAddress(prop.image, null, "small")} height={20} style={{borderRadius:2}}/>
//                         <p className="m-0 mx-1" style={{ fontSize: 14, lineHeight: 1 }}>{prop.title}</p>
//                       </div>
//                     </a>
//                     {/* <p style={{fontSize:12}}>the text for this</p> */}
//                   </Link>
//                 )
//               })}

//               {searchResults && searchResults.length == 0 &&(
//                 <p className='text-center py-2'>Found Nothing</p>
//               )}
//                         </div>
//                     </div>
//                     </div>
//                     </div>
//                     </div>




//             <div className="container-fluid m-0 p-0">
//                 <div className="wrapp m-0 p-0 content-side-wrap">
//                     <div className="row content-row-wrap-edit m-0 p-0">

//                         <div className="col-lg-3 col-md-12 col-sm-12 d-none d-lg-block p-0 new-sidebar">
//                             <div className="for-list-any">
//                                 <ul className="main-list-item-any">


//                                     {categories?.map((item) => {

//                                         if (item.values.parent != null) {

//                                             return (

//                                                 <TestOver
//                                                     key={item._id}
//                                                     item={item}
//                                                     list={docs}

//                                                 />
//                                             )


//                                         }



//                                     })}





//                                 </ul>
//                             </div>
//                         </div>

//                         <div className="col-lg-9 col-md-12 col-sm-12 p-0 side-right">


//                             <div className="right-side-box">

//                                 <div className="show-in-mobile-device d-lg-none">
//                                     <i className={showDocument ? 'fas fa-times edit-threeline' : 'fas fa-align-justify edit-threeline'}></i>
//                                     <button className="edit-in-mobile-dev" onClick={showOpenDocument}>documention</button>

//                                 </div>

//                                 {showDocument ? (
//                                     <>
//                                         {categories?.map((item) => {

//                                             if (item.values.parent != null) {
//                                                 return (
//                                                     <div className="d-lg-none test-mobile-device">



//                                                         <TestOver
//                                                             key={item._id}
//                                                             item={item}
//                                                             list={docs}

//                                                         />

//                                                     </div>
//                                                 )
//                                             }
//                                         })}
//                                     </>

//                                 ) : null}




//                                 <div className="title-and-route-line">


//                                     <PageDirection
//                                         firstpage={"checkout"}
//                                         secondpage={"Home"}
//                                         thirdpage={"payment"}
//                                         fourpage={"Stripe Checkout"}
//                                     />

//                                     {/* <div className="items-rout-name">
//                                         <div className="route-small-logo">
//                                             <img src="/assets/ad.png" alt="" className="edit-route-small-logo" />
//                                         </div>


//                                         <div className="just-name-route">
//                                             <span className="check">Check out .</span>
//                                             <span className="check-route">Home </span>
//                                             <span className="check-route">/</span>
//                                             <span className="check-route"> payments </span>
//                                             <span className="check-route">/</span>
//                                             <span className="check-route"> Stripe checkout</span>
//                                         </div>

//                                     </div> */}
//                                     <div className="head-title-content-side">
//                                         <div className="head-title-content-side-txt">
//                                             <h3>ThingsBoard Documentation</h3>
//                                             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, deleniti harum enim eveniet aspernatur laudantium?</p>
//                                         </div>
//                                     </div>

//                                     <CardContain
//                                         headerTitle='Start with a guid'

//                                     />
//                                     <div className="for-margin">
//                                         <CardContain
//                                             headerTitle='Try Sample project'
//                                         />
//                                     </div>
//                                     <div className="for-margin">
//                                         <CardContain
//                                             headerTitle='Try Sample project'
//                                         />
//                                     </div>


//                                     <div className="item-for-github">
//                                         <div className="txt-for-github">
//                                             <div className="for-hover-github">

//                                                 <Link href={"/"}>
//                                                     <a>
//                                                         <span className="github-txt">View all on GitHub</span>

//                                                         <i className="fas fa-share-square for-github-icon"></i>
//                                                     </a>
//                                                 </Link>



//                                             </div>


//                                         </div>
//                                     </div>

//                                     <Community />

//                                     <Notife />

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }



// export default Home;








import React, { Component } from 'react'
// import DocList from '../../components/DocList';
import CardContain from '../../components/CardContain';
import HttpServices from '../../utils/Http.services';
import { checkTranslation, imageAddress, translate } from '../../utils/useful';

import Link from 'next/link';
import Community from '../../components/Community';
import TestOver from '../../components/TestOver';
import Notife from '../../components/Notife';
// import SideBarBrowse from '../../components/SidebarBrowse';
import DocListSec from '../../components/DocListSec';
import PageDirection from '../../components/PageDirection';
import DeveloperTitle from '../../components/DeveloperTitle';
import Collapsible from 'react-collapsible';


export async function getServerSideProps(context) {


    let slug = null

    if (context?.query?.slug) {
        slug = context?.query?.slug
    }

    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }


    const catsRes = await (await HttpServices.syncRequest('getContents', {lng, page: 'DocumentsCategories', sort: { "values.priority": 1 } })).result
    // console.log(catsRes.info[0])
    let cat = null

    if (catsRes.info) {
        let mainCategories = catsRes.info.filter(a => a.values.parent == null)
        cat = mainCategories[0]
    }
    // console.log(cat)
    const docsRes = await (await HttpServices.syncRequest('getDocsSummary', { lng, filter: { categories: cat?._id }, sort: { "priority": 1 } })).result
    // console.log(docsRes)


    return {
        props: JSON.parse(JSON.stringify({ categories: catsRes ? catsRes.info : null, docs: docsRes ? docsRes.info : [], category: cat }))
    }



}

class index extends Component {

    state = {
        showDocument: false,
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

        HttpServices.request('searchDocs', { search }, (fetchResult, fetchError, fetchStatus) => {
            this.setState({ isPostingData: false })
            if (fetchError) {
                return
            }
            this.setState({ searchResults: fetchResult.info })
        })

    }


    showOpenDocument = () => {
        this.setState({ showDocument: !this.state.showDocument })
    }

    // getData(search) {

    //     HttpServices.request('searchBlogs', { search }, (fetchResult, fetchError, fetchStatus) => {
    //         this.setState({ isPostingData: false })
    //         if (fetchError) {
    //             return
    //         }
    //         this.setState({ searchResults: fetchResult.info })
    //     })

    // }


    render() {




        return (

            <div>


                {
                    /* <DocListSec
                                    data={categories}
                                    props={1}
                                /> */
                } {
                    /* 
                                    <div className="container-fluid m-0 p-0">
                                        <div className="wrapper" style={{ opacity: 1, borderBottom: '1px solid #ddd' }}>
                                            <div className="for-list-doc">
    
                                                <div className="col-xl-12 p-0 h-100 col-sm-6  mobile-edit" >
                                                    <div className='w-100 py-1 position-relative' >
                                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: "100%" }}>
                                                            <img src="/images/svg-2.svg" width={"100%"} height={'100%'} />
                                                        </div>
    
                                                        <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                                                            <div className="d-flex flex-column m-0">
                                                                <div className='d-flex justify-content-between px-5 pt-2'>
                                                                    <div>
                                                                        <span className='ml-2' style={{ color: '#fff', fontSize: "30px", fontWeight: '400' }}>IoTSmile <span style={{ fontWeight: 'bold' }}>Documents</span></span>
                                                                    </div>
                                                                    <div className='d-flex flex-1 justify-content-end align-items-center' style={{}}>
                                                                        <div className="searchinput-products flexc" style={{ position: 'relative', maxWidth: 320 }}>
                                                                            <img src="/images/icons/search1.svg" style={{ width: '20px', opacity: '0.9', }} className="mx-1" />
                                                                            <input value={this.state.searchText} className='w-100 h-100' placeholder="Search Product . . ." style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }} onChange={e => this.doSearch(e.target.value)} />
                                                                            <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 42, left: 0, zIndex: 9, backgroundColor: '#ffffff', borderRadius: '10px' }}>
                                                                                {this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                                                                                    return (
                                                                                        <Link href={'/product/' + prop.slug} >
                                                                                            <a >
                                                                                                <div className="px-3 py-3 flexc" >
                                                                                                    <img src={imageAddress(prop.images, null, "small")} height={24} style={{}} />
                                                                                                    <p className="m-0 mx-2" style={{ fontSize: 16, lineHeight: 1 }}>{prop.title}</p>
                                                                                                </div>
                                                                                            </a>
                                                                                        </Link>
                                                                                    )
                                                                                })}
    
                                                                                {this.state.searchResults && this.state.searchResults.length == 0 && (
                                                                                    <p className='text-center py-2'>Found Nothing</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                   
                                                                </div>
    
                                                                <div className="for-list-items px-5">
    
                                                                    <ul className="main-list-item-doc-under-header">
    
                                                                        {this.props.categories?.map((item, index) => {
                                                                            if (item.values?.parent == null) {
                                                                                let active = true
                                                                                return (
                                                                                    <li className="" >
    
                                                                                        <Link
                                                                                            href={'/developers/' + item._id}>
                                                                                            <a className='mx-1 p-2' style={{ backgroundColor: active ? "#fff" : "transparent", color: active ? "#000" : "#fff", borderRadius: "21px", fontSize: "15px", fontWeight: "500" }} id="mobile-device">
    
                                                                                                {item.values?.title}
                                                                                            </a>
                                                                                        </Link>
    
    
                                                                                    </li>
                                                                                )
                                                                            }
                                                                        })}
    
    
    
    
                                                                    </ul>
    
                                                                </div>
                                                            </div>
    
                                                        </div>
    
                                                    </div>
    
    
    
    
    
    
    
    
    
    
                                                </div>
    
                                            </div>
                                        </div>
                                    </div> */
                }

                <DeveloperTitle searchRes={this.state.searchResults}
                    values={this.state.searchText}
                    categories={this.props.categories}
                    category={this.props.category}

                    func={this.doSearch}

                />





                <div className="container-fluid m-0 p-0" >
                    <div className="wrapp m-0 p-0 content-side-wrap" >
                        <div className="row content-row-wrap-edit m-0 p-0" >

                            <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 d-none d-lg-block p-0 new-sidebar no-scrollbar"
                                style={
                                    { backgroundColor: "#f2f6f8", position: 'sticky', top: 50 }} >
                                <div className="for-list-any" >
                                    <ul className="main-list-item-any" >



                                        {this.props.docs?.map((item) => {

                                            if (item.categories?.length == 1) {

                                                return (
                                                    <Link href={'/developers/doc/' + item._id}>
                                                        <a className='list-item-any'>
                                                            <p className='' style={{ fontSize: 14, fontWeight: 400 }}>{item.title}</p>
                                                        </a>
                                                    </Link>
                                                )
                                            }
                                        })}


                                        {this.props.categories?.map((item) => {

                                            if (item.values.parent != null && item.values.parent == this.props.category?._id) {

                                                return (

                                                    <TestOver key={item._id}
                                                        item={item}
                                                        list={this.props.docs}

                                                    />
                                                )
                                            }
                                        })}





                                    </ul> </div> </div>

                            <div className="col-xl-10 col-lg-9 col-md-12 col-sm-12 p-0 side-right" >


                                <div className="right-side-box" >
                                    <div className='py-2 d-lg-none' style={{ backgroundColor: '#f2f6f8' }}>
                                        <div className="show-in-mobile-device d-lg-none" >

                                            <button className="edit-in-mobile-dev flexcc"
                                                onClick={
                                                    () => this.showOpenDocument()} >
                                                <i style={{ fontSize: 15,width:20 }} className={this.state.showDocument ? 'fas fa-times edit-threeline' : 'fas fa-align-justify edit-threeline'} > </i>
                                                <span className='mx-2'>{checkTranslation('{{lang}}Documention-Menu')}</span>
                                            </button>

                                        </div>
                                        <div className='px-4'>
                                            <Collapsible open={this.state.showDocument}>
                                                {this.props.categories?.map((item) => {

                                                    if (item.values.parent != null && item.values.parent == this.props.category?._id) {
                                                        return (<div className="d-lg-none test-mobile-device" >

                                                            <TestOver key={item._id}
                                                                item={item}
                                                                list={this.props.docs}

                                                            />

                                                        </div>
                                                        )
                                                    }
                                                })
                                                }
                                            </Collapsible>


                                        </div>
                                    </div>




                                    <div className="title-and-route-line" >


                                        {/* <PageDirection firstpage={"checkout"}
                                        secondpage={"Home"}
                                        thirdpage={"payment"}
                                        fourpage={"Stripe Checkout"}
                                    /> */}


                                        <div className="head-title-content-side mb-3" >
                                            <div className="head-title-content-side-txt" >
                                                <h3 className='mt-0 mb-2' style={{ fontWeight: 500, fontSize: 30 }}>{this.props.category?.values?.title} {checkTranslation('{{lang}}Documentation')}</h3>
                                                <p className='' style={{ color: '#345', maxWidth: 700 }}>{this.props.category?.values?.description}</p>
                                            </div>
                                        </div>

                                        <CardContain headerTitle='Featured Documents' docs={this.props.docs} />


                                        {/* <div className="for-margin" >
                                        <CardContain headerTitle='Try Sample project' />
                                    </div> <div className="for-margin" >
                                        <CardContain headerTitle='Try Sample project' />
                                    </div> */}


                                        {/* <div className="item-for-github" >
                                        <div className="txt-for-github" >
                                            <div className="for-hover-github" >

                                                <Link href={"/"} >
                                                    <a>
                                                        <span className="github-txt" > View all on GitHub </span>

                                                        <i className="fas fa-share-square for-github-icon" > </i>
                                                    </a>
                                                </Link>



                                            </div>


                                        </div>
                                    </div> */}
                                        <div className='mt-4 px-0'>
                                            <Community docs={this.props.docs} />

                                            <Notife />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

export default index;