
import React, { Component } from 'react'
// import DocList from '../../components/DocList';
import CardContain from '../../../components/CardContain';
import HttpServices from '../../../utils/Http.services';
import { imageAddress, translate } from '../../../utils/useful';

import Link from 'next/link';
import Community from '../../../components/Community';
import TestOver from '../../../components/TestOver';
import Notife from '../../../components/Notife';
// import SideBarBrowse from '../../../components/SidebarBrowse';
import DocListSec from '../../../components/DocListSec';
import PageDirection from '../../../components/PageDirection';
import DeveloperTitle from '../../../components/DeveloperTitle';
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

    const docRes = await (await HttpServices.syncRequest('getOneDoc', { _id: slug })).result
    const catsRes = await (await HttpServices.syncRequest('getContents', {lng, page: 'DocumentsCategories', sort: { "values.priority": 1 } })).result
    let cat = null

    if (docRes?.info && docRes.info?.categories) {
        let mainCategories = catsRes.info.filter(a => docRes.info.categories.includes(a._id))
        cat = mainCategories[0]
    }
    const docsRes = await (await HttpServices.syncRequest('getDocsSummary', { lng, filter: { categories: cat?._id }, sort: { "priority": 1 } })).result


    return {
        props: JSON.parse(JSON.stringify({ categories: catsRes ? catsRes.info : null, docs: docsRes ? docsRes.info : [], category: cat, document: docRes.info }))
    }



}

class index extends Component {

    state = {
        showDocument: false,
        searchResults: null,

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

                <DeveloperTitle searchRes={this.state.searchResults}
                    // values={this.state.searchText}
                    categories={this.props.categories}
                    category={this.props.category}

                    // func={this.doSearch}

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
                                                let active = false
                                                if(item._id == this.props.document?._id){
                                                    active=true
                                                }
                                                return (
                                                    <Link href={'/developers/doc/' + item._id}>
                                                        <a className='list-item-any'>
                                                            <p className='' style={{ fontSize: 14, fontWeight: 400,color:active?'#c0003a':null }}>{item.title}</p>
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
                                                        document={this.props.document}
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
                                                <i style={{ fontSize: 15, width: 20 }} className={this.state.showDocument ? 'fas fa-times edit-threeline' : 'fas fa-align-justify edit-threeline'} > </i>
                                                <span className='mx-2'>Documention Menu</span>
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
                                                                document={this.props.document}

                                                            />

                                                        </div>
                                                        )
                                                    }
                                                })
                                                }
                                            </Collapsible>


                                        </div>
                                    </div>




                                    <div className="title-and-route-line flexc flex-column"  >




                                        <div className="head-title-content-side mb-3 w-100" style={{maxWidth:900}} >
                                            <div className="head-title-content-side-txt" >
                                                <h3 className='mt-0 mb-2' style={{ fontWeight: 500, fontSize: 30 }}>{this.props.document?.title}</h3>
                                                <p className='' style={{ color: '#345', maxWidth: 700 }}>{this.props.document?.description}</p>
                                            </div>


                                            <div className='mt-5 mb-5'>
                                                <div className='ck-content'>
                                                    <div style={{ color: '#202020', fontSize: 16 }} dangerouslySetInnerHTML={{ __html: this.props.document?.body }}></div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >


        )
    }
}

export default index;