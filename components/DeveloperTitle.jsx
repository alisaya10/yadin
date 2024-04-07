import React, { Component } from 'react'
import Link from 'next/link'
import HttpServices from '../utils/Http.services'
import { checkTranslation } from '../utils/useful'

class DeveloperTitle extends Component {


    state = {}

    // doSearch = (search) => {
    //     clearTimeout(this.searchTimer)
    //     if (search && search != '') {
    //         this.searchTimer = setTimeout(() => {
    //             this.getData(search)
    //         }, 300);
    //     } else {
    //         this.setState({ searchResults: null })
    //     }

    // }


    doSearch = (search) => {
        clearTimeout(this.searchTimer)
        this.setState({ searchText: search })
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



    // search = (e) => {
    //     this.props.func(e);
    //     this.setState({searchText:e})
    // }

    clearSearch = () => {
        setTimeout(() => {
            this.setState({ searchText: null ,searchResults: null})
        }, 200);

    }


    render() {
        return (
            <div className="container-fluid m-0 p-0">
                <div className="wrapper" style={{ opacity: 1, borderBottom: '1px solid #ddd' }}>
                    <div className="w-100">

                        <div className="w-100 p-0 h-100   mobile-edit" >
                            <div className='w-100 py-3 position-relative' >
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: "100%",backgroundColor:'#8D002F' }}>
                                    <img src="/images/svg-15.svg" width={"100%"} height={'100%'} />
                                </div>

                                <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                                    <div className="d-flex flex-column m-0">
                                        <div className='d-flex justify-content-between px-5 pt-2'>
                                            <div className='row m-0 w-100'>
                                                <div className='col-12 col-md-6 justify-content-start d-flex p-0'>
                                                    <span className='' style={{ color: '#fff', fontSize: "30px", fontWeight: '400' }}>IoTSmile <span style={{ fontWeight: 'bold' }}>{checkTranslation('{{lang}}Documents')}</span></span>
                                                </div>
                                                <div className='col-12 col-md-6 d-flex justify-content-start p-0 justify-content-md-end my-2 my-md-0 align-items-center' style={{}}>
                                                    <div className="searchinput-products flexc" style={{ position: 'relative', maxWidth: 320 }}>
                                                        <img src="/images/icons/search1.svg" style={{ width: '20px', opacity: '0.9', }} className="mx-1" />
                                                        <input value={this.state.searchText} className='w-100 h-100' placeholder={checkTranslation('{{lang}}Search-document')} style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }} onChange={e => this.doSearch(e.target.value)} />
                                                        <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 42, left: 0, zIndex: 9, backgroundColor: '#ffffff', borderRadius: '10px' }}>
                                                            {this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                                                                return (
                                                                    <Link href={'/developers/doc/' + prop._id} >
                                                                        <a onClick={() => this.clearSearch()}>
                                                                            <div className="px-3 py-3 flexc" >
                                                                                {/* <img src={imageAddress(prop.images, null, "small")} height={24} style={{}} /> */}
                                                                                <p className="m-0 mx-2" style={{ fontSize: 16, lineHeight: 1 }}>{prop.title}</p>
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
                                                </div>
                                            </div>
                                            {/* <div className="d-flex flex-1 justify-content-center align-items-center">
                                            <div className='d-flex justify-content-between px-2 py-2' style={{ position: "relative", border: "solid 1px #fff", width: "60%", borderRadius: "18px", backgroundColor: "#fff" }}>
                                                <input type="text" placeholder="Search" className="search-for-doc" onChange={e => this.doSearch(e.target.value)} />
                                                <i className="fas fa-search search-doc-list-comp"></i>
                                                <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 40, left: 0, zIndex: 9, backgroundColor: '#ffffff', borderRadius: '0px 0px 8px 8px' }}>
                                                    {this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                                                        return (
                                                            <Link href={'/developers/' + prop._id} >
                                                                <a >
                                                                    <div className="px-2 py-2 flexc" >
                                                                        <img src={imageAddress(prop.image, null, "small")} height={20} style={{ borderRadius: 2 }} />
                                                                        <p className="m-0 mx-1" style={{ fontSize: 14, lineHeight: 1 }}>{prop.title}</p>
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
                                        </div> */}
                                        </div>

                                        <div className="for-list-items px-5">

                                            <div className="main-list-item-doc-under-header mt-3 mb-2">

                                                {this.props.categories?.map((item, index) => {
                                                    if (item.values?.parent == null) {
                                                        let active = false
                                                        if (item._id == this.props.category?._id) {
                                                            active = true
                                                        }
                                                        return (
                                                            <div className="" >

                                                                <Link
                                                                    href={'/developers/' + item._id}>
                                                                    <a className='mx-1 p-2 px-3' style={{ backgroundColor: active ? "#fff" : "transparent", color: active ? "#000" : "#fff", borderRadius: "21px", fontSize: "15px", fontWeight: "500" }} id="mobile-device">

                                                                        {item.values?.title}
                                                                    </a>
                                                                </Link>


                                                            </div>
                                                        )
                                                    }
                                                })}




                                            </div>

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



export default DeveloperTitle;