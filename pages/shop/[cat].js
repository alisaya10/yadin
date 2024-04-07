import React from 'react';
import HttpServices from '../../utils/Http.services';
import { checkTranslation, imageAddress, priceStandardView } from '../../utils/useful';
import moment from 'jalali-moment';


import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
// import CardItemBox from '../../components/CardItemBox';
import BrowseCat from '../../components/BrowseCat';
import FilterViewer from '../../components/FilterViewer';
import ProductBox from '../../components/boxes/ProductBox';
import Router, { withRouter } from 'next/router';
import Modal from '../../components/Modal2';


export async function getServerSideProps(context) {


    let lng = context.locale
    let cat = context.query?.cat
    let sort = { uDate: -1 }
    let filter = {}

    if (!lng) {
        lng = 'en'
    }


    if (cat) {
        filter['categories'] = cat
    }


    if (context.query?.technologies) {
        filter['technologies'] = { $in: context.query?.technologies.split(',') }
    }

    if (context.query?.usecases) {
        filter['usecases'] = { $in: context.query?.usecases.split(',') }
    }

    if (context.query?.brand) {
        filter['brand'] = { $in: context.query?.brand.split(',') }
    }

    if (context.query?.sort) {
        let sortList = { newest: { uDate: -1 }, oldest: { uDate: 1 }, hprice: { price: -1 }, lprice: { price: 1 } }

        if (sortList[context.query?.sort]) {
            sort = sortList[context.query?.sort]
        }
    }

    // if (key == 'applications') {
    //     filter[key] = { $in: value.value }
    // }
    // if (key == 'brand') {
    //     filter[key] = { $in: value.value }
    // }

    if (context.query?.price) {
        filter['price'] = {}
        let parts = context.query?.price?.split(',')
        if (parts[0] && parts[0] != '') {
            filter['price']['$gte'] = parts[0]
        }
        if (parts[1] && parts[1] != '') {
            filter['price']['$lte'] = parts[1]
        }
        // filter[key]
    }

    // filter.available = true
    filter.status = '1'


    console.log(filter)

    const categoryJson = await (await HttpServices.syncRequest('getOneContent', { _id: cat })).result


    const json = await (await HttpServices.syncRequest('getContents', { page: "ShopCategories", lng })).result
    // const productsJson = await (await HttpServices.syncRequest('getProducts', { 'categories': cat, lng })).result
    const productsJson = await (await HttpServices.syncRequest('getProducts', { sort, lng, filter })).result

    const AdsJson = await (await HttpServices.syncRequest('getRandomContents', { filter: { "values.pages": 'shop-list' }, count: 2, page: "advertisements", lng })).result
    const UsecasesJson = await (await HttpServices.syncRequest('getContents', { page: "Usecases", lng })).result
    const brandsJson = await (await HttpServices.syncRequest('getValuesWithData', { page: "brands" })).result

    // const res = await fetch('https://www.iotsmile.com/iot/apiv1', {
    //   method: "POST",
    //   body: JSON.stringify({
    //     route: "values/getValuesWithData",
    //     content: {
    //       page: "Usecases",
    //       // _id: id
    //     }
    //   })
    // })

    // const json = await res.json()
    // console.log(productsJson.info)

    return {
        props: JSON.parse(JSON.stringify({ sort: context.query?.sort, category: categoryJson.info, list: json.info, usecases: UsecasesJson.info, brands: brandsJson.info, products: productsJson.info, ads: AdsJson.info }))
    }



}


class Products extends React.Component {
    state = {

        sortList: [
            { key: 'newest', label: 'Newest', filter: { uDate: -1 }, active: true },
            { key: 'oldest', label: 'Oldest', filter: { uDate: 1 } },

            // { key: 'bestSeller', label: 'Best Seller', filter: { uDate: -1 } },
            { key: 'hprice', label: 'High Price', filter: { price: -1 } },
            { key: 'lprice', label: 'Low Price', filter: { price: 1 } },

        ],

        filtersList: {
            // categories: { key: 'categories', type: 'SelectListInput', information: { label: '{{lang}}categories', type: 'local', items: [], searchable: false, placeholder: '{{lang}}insert', required: true } },
            price: { key: 'price', type: 'FromToInput', information: { label: '{{lang}}Price', inputType: 'PriceInput', searchable: true, placeholder: '{{lang}}insertName', required: true } },
            usecases: { key: 'usecases', type: 'SelectListInput', information: { label: '{{lang}}Usecases', type: 'local', items: [], sort: { name: -1 }, searchable: false, placeholder: '{{lang}}insert', required: true } },
            brand: { key: 'brand', type: 'SelectListInput', information: { label: '{{lang}}Brands', type: 'local', items: [], sort: { name: -1 }, searchable: false, placeholder: '{{lang}}insert', required: true } },

            technologies: { key: 'technologies', type: 'SelectListInput', information: { label: 'Technologies', type: 'local', items: [{ value: 'Zigbee', title: 'Zigbee' }, { value: 'LoRa', title: 'LoRa' }, { value: 'Wifi', title: 'Wifi' }, { value: 'Bluetooth', title: 'Bluetooth' }, { value: 'Other', title: 'Other' }], searchable: false, placeholder: '{{lang}}insertName', required: true } },

            // radio: { key: 'radio', type: 'RadioInput', information: { label: 'radio', required: true } },
            // checkbox: { key: 'checkbox', type: 'CheckboxInput', information: { label: 'On Sale', required: true } },
            // checkbox1: { key: 'checkbox1', type: 'CheckboxInput', information: { label: 'Compatible with', required: true } },
            // checkbox2: { key: 'checkbox2', type: 'CheckboxInput', information: { label: 'Rating', required: true } },

            // price: { key: 'price', type: 'SliderInput', information: { label: '{{lang}}useful.price', inputType: 'PriceInput', min: 0, max: 1000, step: 1, searchable: true, placeholder: '{{lang}}insertName', required: true } },
            // location: { key: 'location', type: 'MapFilterInput', information: { label: '{{lang}}location', required: false } },

        },

        filters: {},
    }



    componentDidMount() {


        this.init()

        Router.events.on('routeChangeComplete', () => {
            setTimeout(() => {
                this.init()

            }, 50);

        })

        let usecases = []
        let brands = []

        if (Array.isArray(this.props.usecases)) {
            this.props.usecases.forEach(element => {
                usecases.push({ title: element.values.title, value: element._id })
            });
        }

        if (Array.isArray(this.props.brands)) {
            this.props.brands.forEach(element => {
                brands.push({ title: element.values.name, value: element._id })
            });
        }

        this.setState(prevState => ({
            ...prevState,
            filtersList: {
                ...prevState.filtersList,
                usecases: {
                    ...prevState.filtersList.usecases,
                    information: {
                        ...prevState.filtersList.usecases.information,
                        items: usecases
                    }
                },
                brand: {
                    ...prevState.filtersList.brand,
                    information: {
                        ...prevState.filtersList.brand.information,
                        items: brands
                    }
                }
            }
        }), () => {
            if (this.state.filters?.categories) {
                // this.queryToFilter(true)
            }
        })

    }



    init() {
        this.queryToFilter()

        let sortList = this.state.sortList
        sortList.forEach((element, index) => {
            if ((element.key == this.props.sort) || (!this.props.sort && element.key == 'newest')) {
                sortList[index].active = true
            } else {
                sortList[index].active = false
            }
        });

        this.setState({ sortList })

    }





    changeFilter = (key, value, extra) => {

        let filters = this.state.filters
        if (!filters) filters = {}
        if (value == false || value == null) {
            delete filters[key]
        } else {
            let label = this.getFilterLabel(key, value).label
            let labelRef = this.getFilterLabel(key, value)
            if (labelRef.mergeValues) {
                value = String(value)
            }
            filters[key] = { key, value, label, extra }
        }
        this.setState({ filters }, () => {
            this.filterToQuery()

            // this.fetchData(true)
        })
    }

    filterToQuery() {
        let query = ''
        Object.values(this.state.filters).forEach((filter, index) => {
            console.log(filter)
            let value = filter.value

            if (typeof value == 'object' && !Array.isArray(value)) {
                value = ''

                for (const [key, path] of Object.entries(filter.value)) {
                    value = value + key + ":" + path + ','
                }
                value = value.substring(0, value.length - 1);
            }

            if (index > 0) {
                query = query + '&'
            }
            query = query + filter.key + '=' + (value)
        });

        if (query === '?') {
            query = ''
        }
        console.log(location.pathname)

        Router.push({
            pathname: location.pathname,
            query: query
        })
        // window.history.pushState(null, null, window.location.pathname + query);
    }



    queryToFilter(dontFetch) {
        // console.log("queryToFilter")
        let search = window.location.search
        search = search.replace('?', '')
        search = search.split('&')
        // console.log(search)
        let filters = {}
        if (Array.isArray(search)) {
            search.forEach(element => {
                let keyValue = element.split('=')
                let key = keyValue[0]
                let value = keyValue[1]
                if (key && value) {
                    let isObject = false
                    if (value.includes(':')) {
                        isObject = true
                    }

                    if (value.includes(',')) {
                        value = value.split(',')
                    }
                    //    console.log(value)
                    let labelRef = this.getFilterLabel(key, value)
                    if (labelRef.shouldBeArray) {
                        value = [value]
                    }
                    if (labelRef.mergeValues) {
                        value = String(value)
                    }

                    if (isObject && Array.isArray(value)) {
                        let object = {}
                        value.forEach(element => {
                            let temp = element.split(':')
                            object[temp[0]] = temp[1]
                        });
                        value = object
                    }

                    let filter = { key, value, label: labelRef.label }
                    filters[key] = filter
                }

            });
        }
        this.setState({ filters }, () => {
            if (!dontFetch) {
                // this.fetchData()
            }
        })

    }


    getFilterLabel(key, value) {
        let label = ''
        let shouldBeArray = false
        let mergeValues = false
        if (this.state.filtersList[key]) {
            if (this.state.filtersList[key].type == 'CheckboxInput') {
                label = this.state.filtersList[key]?.information?.label
            }

            if (this.state.filtersList[key].type == 'FromToInput' || this.state.filtersList[key].type == 'SliderInput') {
                mergeValues = true
                let newValue = value
                if (!Array.isArray(value)) {
                    newValue = value.split(',')

                }
                // console.log(newValue)
                if (newValue[0] && newValue[0] != '') {
                    label = "From " + newValue[0] + ' '
                }
                if (newValue[1] && newValue[1] != '') {
                    label = label + "To " + newValue[1]
                }
                if (this.state.filtersList[key].information.inputType == "PriceInput") {
                    label = "$ " + label
                }
            }

            if (this.state.filtersList[key].type == 'SelectListInput') {
                let items = this.state.filtersList[key]?.information?.items
                label = []
                if (!Array.isArray(value)) {
                    shouldBeArray = true
                    value = [value]
                }
                value.forEach(oneValue => {
                    items.forEach(item => {
                        if (oneValue === item.value) {
                            label.push(item.title)
                        }
                    })
                });


            }

            if (this.state.filtersList[key].type == 'CheckboxInput') {
                label = this.state.filtersList[key]?.information?.label
            }


        }

        return { label, shouldBeArray, mergeValues }
    }



    removeFilter = (key, index) => {
        let filters = this.state.filters
        if (index === null) {
            delete filters[key]
        } else {
            filters[key].value.splice(index, 1)
            filters[key].label.splice(index, 1)
            if (filters[key].value.length === 0) {
                delete filters[key]
            }
        }

        this.setState({ filters }, () => {
            this.filterToQuery()
            // this.fetchData(true)
        })
    }



    changeSorting = (prop) => {
        let sortList = this.state.sortList
        let sort = null
        sortList.forEach(element => {
            element.active = false
            if (prop.key == element.key) {
                element.active = true
                sort = element
            }
        });
        // console.log(sort)
        this.changeFilter('sort', sort.key)

        // window.history.pushState(null, null, window.location.pathname + query);


        this.setState({ sortList }, () => {

            //     this.fetchData()
        })
    }


    openFilterModal = () => {
        // console.log(this.filterModal)
        this.filterModal.showModal()
    }



    render() {




        return (
            <div className='pb-5' style={{ backgroundColor: '#f4f7ff' }}>

                <BrowseCat
                    data={this.props.list}
                />



                <div className="row p-0 w-100 m-0">


                    <div className='col-12 p-0'>
                        <div className='w-100 flexcc flex-column pt-4 position-relative' style={{ backgroundColor: '#fff' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: "150%" }}>
                                <img src="/images/stacked-waves-haikei.svg" width={"100%"} height={'150%'} />
                            </div>

                            <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
                                <h1 style={{ fontWeight: '400', fontSize: 25 }}>{this.props.category?.values?.title}</h1>
                                {/* <p style={{ fontWeight: '400', color: '#fff', fontSize: 17 }}>{checkTranslation('{{lang}}Shop')}</p> */}
                            </div>

                        </div>

                    </div>

                    <div className='col-12 p-0 flexcb'>
                        <div className="flexc align-items-center w-100 pt-2 px-3" style={{ color: '#fff' }}>
                            <div style={{ marginLeft: '10px', marginRight: '10px', fontSize: '15px', fontWeight: '400' }}>
                                <p>{checkTranslation('{{lang}}Sort-by')} </p>
                            </div>
                            <div className="flexc">

                                {this.state.sortList.map((prop, index) => {
                                    return (
                                        <button onClick={() => this.changeSorting(prop)} className={"sortby-option  px-2 py-1 " + (prop.active ? 'active-filter' : '')} key={index}>
                                            <span className=" px-1" style={{ color: '#fff' }}>{prop.label}</span>
                                        </button>
                                    )
                                })}

                                {/* <a href="#" className="sortby-option  px-2 py-1">Best seller</a>
                                <a href="#" className="sortby-option px-2 py-1">Newest</a>
                                <a href="#" className="sortby-option px-2 py-1">Lowest price</a>
                                <a href="#" className="sortby-option px-2 py-1">Highest price</a> */}

                            </div>
                        </div>


                        <button onClick={() => this.openFilterModal()} className="flexcc d-md-none p-1 mx-3" style={{ borderRadius: 4, backgroundColor: '#fff', flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
                            <img className="" src="/images/filter.png" alt="" width="22px" />
                        </button>






                    </div>



                    <div className="col-md-3 col-lg-3 col-xl-2 d-none d-md-block pt-4 " style={{ paddingRight: '10px' }} >


                        <div className='' style={{ position: 'sticky', top: 90, }}>

                            <div className='px-3 pt-2 no-scrollbar' style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #eee', maxHeight: 'calc(100vh - 70px)', overflow: 'auto', paddingBottom: 50 }}>
                                <FilterViewer changeFilter={this.changeFilter} ref={el => this.form = el} headers={Object.values(this.state.filtersList)} data={this.state.filters} errors={this.state.errors} inputClass={''} />
                            </div>

                        </div>

                    </div>









                    <div className="col-md-7 col-lg-7 col-xl-8">
                        <div className="">
                            <div className="fillterbox-products py-2  w-100">
                                <div className="w-100">
                                    {/* <div className="flexc pb-2 w-100" style={{ borderBottom: '1px solid #00000010' }}>
                                        <div className="flexc " style={{ marginLeft: '10px', fontSize: '13px', fontWeight: '600', color: '#000' }}>
                                            <p>IOT Smile Online Shop /</p>
                                        </div>
                                        <div className="flexc" style={{ marginBottom: '2px' }}>
                                            <p className="px-1">digital products /</p>
                                            <p>sensor</p>
                                        </div>
                                    </div> */}

                                </div>
                            </div>


                            <div className="row w-100 m-0">

                                {this.props.products.map((item, index) => {
                                    return (

                                        <ProductBox item={item} key={index} col={'col-12 col-sm-6 col-lg-6 col-xl-4 p-1'} />

                                    )

                                }
                                )}


                                {this.props.products?.length == 0 && (
                                    <div className='text-center w-100' style={{ paddingTop: 100 }}>
                                        <img src='/images/nothing.png' width={100} />
                                        <p style={{ fontWeight: 'bold', fontSize: 20 }}>{checkTranslation('{{lang}}foundNothing')}</p>
                                        <p className='mt-1' style={{ fontSize: 14 }}>{checkTranslation('{{lang}}filter-search-shop-slug-page-desc')}</p>

                                    </div>
                                )}

                                {/* <CardItemBox
                                    data={this.props.products}
                                /> */}
                                {/* {this.props.products?.map((item, index) => {
                                    return (


                                        
                                        <Link href={"/product/" + item.slug}>

                                            <div style={{ cursor: 'pointer' }} className="mb-4 p-2 outline-none blogsbox-edit-shop mx-3 col-12 col-md-6 col-lg-4 col-xl-3" >

                                                <img src={imageAddress(item.image, null, 'small')} className="productimg-shop" />
                                                <p className="blogsbox-p2 mt-2">{item.title}</p>
                                                <p className="pricedes">{item.priceSttings?.currency} {priceStandardView(item.price)}</p>
                                                {item.technologies?.map((tech) => {
                                                    return (
                                                        <span className='title-blog-box'>{tech}</span>
                                                    )
                                                })}


                                                <div className='for-react-stars'>
                                                    <span style={{ color: '#9ab' }}>View Product  </span>
                                                </div>



                                            </div>

                                        </Link>

                                    )
                                })} */}
                            </div>



                        </div>
                    </div>

                    <div className="col-md-2 d-none d-md-block pt-4 "  >
                        <div style={{ position: 'sticky', top: 90 }}>
                            {this.props.ads?.map((item, index) => {
                                return (
                                    // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                                    <div className='w-100'>
                                        <div className="outline-none flex-1 h-100" style={{ overflow: 'hidden', borderRadius: 8 }}>
                                            <a className='w-100 h-100' href={item?.values?.address}>
                                                <img src={imageAddress(item.values.image)} className="w-100 slidershop-img" style={{ flex: 1, height: '100%', objectFit: 'cover' }} />
                                            </a>
                                        </div>
                                    </div>

                                )
                            }
                            )}

                        </div>
                    </div>

                    {/* <div className="container-fluid d-flex flex-column mb-5">
                        <p className="productsdesc1" style={{ textAlign: 'center', fontSize: '24px', color: '#333333' }}>Related Products</p>
                        <p className="productsdesc1" style={{ textAlign: 'center', fontSize: '16px', color: '#777777', fontWeight: 300 }}>Today’s deal and more</p>
                        <div className="row d-flex flex-column m-0">
                            <CardItemBox
                                data={this.props.products}
                            />



                            {(!this.props.products || this.props.products?.length == 0) && (
                                <div className="flexcc w-100 mb-5">
                                    <p>Nothing Found</p>
                                </div>
                            )}
                        </div>
                    </div> */}
                </div>



                <Modal ref={el => this.filterModal = el} maxWidth={400}>
                    <div style={{ backgroundColor: '#fff', borderRadius: 15, padding: '20px 20px 70px 20px' }}>

                        <div className="">
                            <FilterViewer changeFilter={this.changeFilter} ref={el => this.form = el} headers={Object.values(this.state.filtersList)} data={this.state.filters} errors={this.state.errors} inputClass={''} />
                        </div>

                        <div>
                            <button onClick={() => this.filterModal.hideModal()} className="text-center w-100" style={{ color: '#fff', backgroundColor: '#39f', fontSize: 15, padding: '12px 20px', borderRadius: 8 }}>
                                <p>{checkTranslation('{{lang}}submit')}</p>
                            </button>
                        </div>
                    </div>
                </Modal>


            </div>
        )
    }
}



export default withRouter(Products);