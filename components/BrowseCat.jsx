import React, { Component } from 'react'
import Link from 'next/link';
import HttpServices from '../utils/Http.services';
import { checkTranslation, imageAddress, translate } from '../utils/useful';
import Router from 'next/router';


class BrowseCat extends Component {

    state = {
        bars: false,
        handleCat: false,
        searchResults: null,
        searchText: ''
    }

    componentDidMount() {

        Router.events.on('routeChangeComplete', () => {
            setTimeout(() => {
                this.setState({ searchText: '', showResults: false })
            }, 50);

        })
    }


    changeItem() {
        setTimeout(() => {
            this.setState({ bars: true })
            this.setState({ handleCat: true })
        }, 20);


    }
    changeNew() {
        setTimeout(() => {
            this.setState({ bars: false })
            this.setState({ handleCat: false })
        }, 50);

    }


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

    getData(search) {

        HttpServices.request('searchProducts', { search }, (fetchResult, fetchError, fetchStatus) => {
            this.setState({ isPostingData: false })
            if (fetchError) {
                return
            }
            this.setState({ searchResults: fetchResult.info, showResults: true })
        })

    }
    render() {


        return (
            <>
                <div className="navbar1 py-2 px-2 w-100 ">
                    <div className="d-flex container-fluid">
                        <div className="flex-1">
                            <div className="d-flex align-items-center justify-content-between" style={{ position: 'relative' }} >
                                <div className='px-2' style={{ position: 'relative', backgroundColor: this.state.handleCat ? '#39f' : '#f2f6f8', cursor: 'pointer', borderRadius: 4 }} onMouseEnter={() => this.changeItem()} onMouseLeave={() => this.changeNew()}>
                                    <div className='for-browse-category  d-flex  align-items-center' >
                                        <i style={{ width: '20px', paddingLeft: 8, color: this.state.bars ? '#fff' : '#39f' }} className={this.state.bars ? 'fas fa-times' : 'fas fa-bars'}></i>
                                        <span style={{ fontSize: 14, padding: 15, color: this.state.handleCat ? '#fff' : '#39f', whiteSpace: 'nowrap' }}>{checkTranslation('{{lang}}Browse-categories')}</span>
                                        <i className="fas fa-chevron-down" style={{ color: this.state.handleCat ? '#fff' : '#39f', backgroundColor: 'transparent', fontSize: 10 }}></i>
                                    </div>
                                    {this.state.handleCat && (
                                        <div className="under-cat-list-item no-scrollbar">
                                            <div className="handle-list-category no-scrollbar">
                                                {this.props.data?.map((prop, index) => {
                                                    return (
                                                        <Link href={"/shop/" + prop._id}>
                                                            <a style={{ cursor: 'pointer' }} className='handle-category-shops  col-xl-12 d-flex align-items-center '>
                                                                <img src={imageAddress(prop.values?.image)} alt="" className="handle-edit-shop-category-img" />
                                                                <a className="each-list-item mx-2">{prop.values?.title}</a>
                                                            </a>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='w-100 flexcc' style={{}}>
                                    <div className="searchinput-products flexc" style={{ position: 'relative', maxWidth: 600 }}>
                                        <img src="/images/icons/search1.svg" style={{ width: '20px', opacity: '0.9', }} className="mx-1" />
                                        <input value={this.state.searchText} className='w-100 h-100' placeholder={checkTranslation('{{lang}}search-product')} style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }} onChange={e => this.doSearch(e.target.value)} />
                                        <div className="w-100" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderTop: '0px solid #ddd', position: 'absolute', top: 42, left: 0, zIndex: 9, backgroundColor: '#ffffff', borderRadius: '10px' }}>
                                            {this.state.showResults && this.state.searchResults && this.state.searchResults.length > 0 && this.state.searchResults?.map((prop, index) => {
                                                return (
                                                    <Link href={'/product/' + prop.slug} >
                                                        <a >
                                                            <div className="px-3 py-3 flexc" style={{ borderTop: '1px solid #f2f6f8' }}>
                                                                <img src={imageAddress(prop.images, null, "small")} height={24} style={{}} />
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

                                <div className=" d-none d-lg-flex justify-content-end " style={{ flex: 1 }}>
                                    {/* <div className="flexc" style={{ marginLeft: '10px', fontSize: '14px', fontWeight: '400', color: '#777777' }}>
                                        <p>IOT Smile Online Shop {'>'} </p>
                                    </div>
                                    <div className="flexc" style={{ marginBottom: '2px', fontSize: '14px', fontWeight: '400', color: '#777777' }}>
                                        <p className="px-1">digital products {'>'} </p>
                                        <p>sensor</p>
                                    </div> */}
                                    {/* <p style={{ color: '#666', fontSize: 13, whiteSpace: 'nowrap' }}>{checkTranslation('{{lang}}Clearance')} <span style={{ color: '#39f' }}>{checkTranslation('{{lang}}Up-to-30%-Off')}</span></p> */}
                                </div>
                                {/* <img src="/images/logo.png" className="logo p-0" /> */}

                            </div>
                        </div>


                    </div>

                </div>
            </>
        )
    }
}


export default BrowseCat;