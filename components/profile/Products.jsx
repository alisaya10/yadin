import React from "react";
import FinancialBox from "../../components/boxes/FinancialBox";
import Configurer from "../../components/Configurer";
import DataGrid from "../../components/DataGrid";
import Pagination from "../../components/Pagination";
import HttpServices from "../../utils/Http.services";
import { imageAddress, priceStandardView, translate } from "../../utils/useful";
import Modal1 from '../Modal1';
import FormViewer from '../FormViewer';
import RemoveConfirmationModal from "../modals/RemoveConfirmationModal";
import Loader from "react-loader-spinner";
import Link from "next/link";


class ProductOwnerBox extends React.Component {
    render() {

        let item = this.props.data
        return (
            <div className={'w-100 d-flex p-2 mb-2 h-100'}>

                <div className="w-100 outline-none blogsbox-edit-shop  h-100 d-flex flex-column" style={{ boxShadow: 'rgb(100 100 111 / 20%) 0px 7px 29px 0px', backgroundColor: '#fff', borderRadius: 10, border: '1px solid #eee' }}>
                    <Link href={"/product/" + item?._id + '?product=' + item?.slug}>
                        <a className='flex-1'>
                            <img src={imageAddress(item?.images, null, 'small')} className="productimg-shop" />
                            <div className='px-2'>
                                <p className="blogsbox-p2 mt-2" style={{ color: '#102030', fontSize: 15, fontWeight: '400' }}>{item?.title}</p>
                                <div className='d-flex flex-wrap align-items-center'>
                                    <p className="pricedes my-1" style={{ color: '#39f' }}>{item?.priceSttings?.currency}{priceStandardView(item?.price)}</p>
                                    {item?.priceSttings?.priceBeforeDiscount && (item?.priceSttings?.priceBeforeDiscount != item?.price) && (
                                        <p className="pricedes mx-1 mt-1" style={{ textDecoration: 'line-through', fontSize: 12, color: '#9ab' }}>{priceStandardView(item?.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                    )}
                                </div>
                                {item?.technologies?.map((tech) => {
                                    return (
                                        <span className='title-blog-box mrd-2' style={{ backgroundColor: '#f2f6f8', padding: '2px 5px', borderRadius: 4, fontWeight: 400 }}>{tech}</span>
                                    )
                                })}



                            </div>
                        </a>
                    </Link>
                    <div className="flexc mt-2  pt-2" style={{ borderTop: '1px solid #eee' }}>
                        <button onClick={() => this.props.extra?.openEdit(item)} className='for-react-stars ' >
                            <span className="" style={{ color: '#39f' }}>Edit</span>
                        </button>

                        <span className="mx-1" style={{ backgroundColor: '#9ab', width: 1, height: 14 }}></span>

                        <button onClick={() => this.props.extra?.openRemove(item)} className='for-react-stars' >
                            <span className="" style={{ color: '#ee5050' }}>Remove</span>
                        </button>

                    </div>

                </div>


            </div>
        )
    }
}


class ProductsPage extends React.Component {

    state = {
        page: 0,
        limit: 20,
        currentPage: 0,

        headers: [
            // name: { type: 'TextInput', key: 'name', information: { label: "First Name", placeholder: "Name", }, },
            // family: { type: 'TextInput', key: 'family', information: { label: "Last Name", placeholder: "Family  ", }, },
            // email: { type: 'TextInput', key: 'email', information: { label: "Work Email", placeholder: "Name", }, },
            // Phone: { type: 'TextInput', key: 'Phone', information: { label: "Work Phone", placeholder: "Phone Number", }, },
            // website: { type: 'TextInput', key: 'website', information: { label: "Company Website", placeholder: "Website", }, },
            { key: 'images', type: 'ImageInput', col: '12', information: { label: '{{lang}}images', single: false, cropper: true, ratio: '6:4', placeholder: '{{lang}}chooseImage', required: true } },

            { key: 'title', type: 'TextInput', col: '6', information: { label: '{{lang}}title', placeholder: '{{lang}}title', required: true } },

            { key: 'price', type: 'PriceInput', col: '6', information: { label: '{{lang}}Price', placeholder: '{{lang}}Price', required: true } },
            { key: 'priceSttings.discount.value', type: 'PriceInput', col: '6', information: { label: '{{lang}}Discount (%)', hint: 'Discount based on percentage', placeholder: '{{lang}}Discount', required: true } },

            { type: 'SelectInput', key: 'priceSttings.currency', col: '6', information: { label: '{{lang}}Currency', type: 'local', items: [{ value: 'ریال', title: 'ریال' }, { value: '$', title: 'dollar' }], isSearchable: true, placeholder: '{{lang}}Currency', required: true }, showMain: false },

            { type: 'MultiSelectInput', key: 'categories', col: '6', information: { label: '{{lang}}categories', address: 'getContents', filter: { page: 'ShopCategories' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}placeholders.insertCategories', required: true }, showMain: false },
            { type: 'MultiSelectInput', key: 'usecases', col: '6', information: { label: '{{lang}}usecases', address: 'getContents', filter: { page: 'Usecases' }, fields: { title: 'values.title', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}usecases', required: true }, showMain: false },
            { type: 'SelectInput', key: 'brand', col: '6', information: { label: '{{lang}}brand', address: 'getValuesWithData', filter: { page: 'brands' }, fields: { title: 'values.name', value: '_id' }, type: 'api', placeholder: '{{lang}}brand', required: true }, showMain: false },

            { key: 'technologies', type: 'MultiSelectInput', col: '6', information: { label: '{{lang}}technology', default: '4', type: 'local', items: [{ value: 'Zigbee', title: 'Zigbee' }, { value: 'LoRa', title: 'LoRa' }, { value: 'Wifi', title: 'Wifi' }, { value: 'Bluetooth', title: 'Bluetooth' }, { value: 'Other', title: 'Other' }], placeholder: '{{lang}}select', required: true }, showMain: true },
            { type: 'MultiSelectInput', key: 'lng', col: '6', information: { label: '{{lang}}Languages', type: 'local', items: [{ value: 'en', title: 'English' }, { value: 'fa', title: 'فارسی' }], isSearchable: true, placeholder: '{{lang}}Languages', required: true }, showMain: true },




            { type: 'MultiSelectInput', key: 'special', col: '6', information: { label: '{{lang}}Special', type: 'local', items: [{ value: 'trending', title: 'trending' }, { value: 'featured', title: 'Featured' }], isSearchable: true, placeholder: '{{lang}}special', required: false }, showMain: true },

            { key: 'tags', type: 'TagInput', col: '6', information: { hint: '{{lang}}tag-hint', label: '{{lang}}tags', placeholder: '{{lang}}insertTags', required: false }, showMain: false },

            // { key: 'partner', type: 'AdvancedSelectInput', col: "6", information: { label: '{{lang}}partner', address: 'getPartners', filter: {}, fields: { title: 'name', image: 'image', value: '_id' }, type: 'api', isSearchable: true, placeholder: '{{lang}}partner', required: true }, showMain: false },
            // { type: 'SelectInput', key: 'status', col: '6', information: { label: '{{lang}}Status', type: 'local', items: [{ value: '0', title: 'pending' }, { value: '1', title: 'active' }, { value: '-1', title: 'rejected' }], isSearchable: true, placeholder: '{{lang}}status', required: true }, showMain: true },
            { key: 'available', type: 'SwitchInput', col: "6", information: { label: '{{lang}}available', placeholder: '{{lang}}available', default: true, required: false }, showMain: false },

            {
                key: 'slug',
                type: 'TextInput',
                col: '6',
                information: { label: '{{lang}}slug', placeholder: '{{lang}}slug', required: false },
                dependencies: [{
                    refKey: '*',
                    targetKey: 'slug',
                    conditions: {
                        root: {
                            id: 'root',
                            action: 'and',
                            conditions: {
                                1: { id: 1, source: { value: '@data._id' }, operator: { value: '!=' }, target: { value: null } }
                            }
                        },
                    },
                    show: true,
                    // changeHeader: { key: 'col:'6',information.filter.id', value: '@data.thing' },

                }],
                showMain: false
            },


            // {
            //     type: 'SubformInput',
            //     key: 'links',
            //     information: {
            //         label: '{{lang}}links',
            //         headers: [
            //             { type: 'TextInput', key: 'label', col: '6', information: { label: '{{lang}}useful.label', placeholder: '{{lang}}useful.label', required: true, disabled: false } },
            //             { type: 'TextInput', key: 'link', col: '6', information: { label: '{{lang}}link', placeholder: '{{lang}}link', required: true } },

            //         ],
            //         placeholder: '{{lang}}links',
            //         required: false
            //     },
            //     showMain: false
            // },


            { key: 'description', type: 'TextAreaInput', col: '12', information: { label: '{{lang}}description', placeholder: '{{lang}}description', required: true }, showMain: false },
            { key: 'body', type: 'EditorInput', col: '12', information: { label: '{{lang}}body', placeholder: '{{lang}}body', required: true }, showMain: false },
            // peyment: { type: 'SelectInput', key: 'peyment', information: { label: "Peyment Volume", items: [{ title: "1-99", value: "maryam" }, { title: "100-999", value: "pouya" }, { title: "1000-4999", value: "pedram" }, { title: "5000+", value: "pedram" }], }, },
            // other: { type: 'TextAreaInput', key: 'other', information: { label: "Description", placeholder: "Tell us more about your project, needs and timeline." }, },


        ],

        data: [
            // { name: '$12', description: 'This is the description',type:'income' },
            // { name: '$120', description: 'This is the description',type:'income' },
            // { name: '$20', description: 'Charged your wallet',type:'charge' },
            // { name: '$100', description: 'This is the description',type:'charge' },

        ],
    }

    componentDidMount() {
        this.fetch(true)
    }

    fetch(getCount) {
        let body = { page: this.state.page }
        body.limit = this.state.limit
        body.skip = this.state.currentPage

        if (this.state.totalCount == null || getCount) {
            body.getCount = true
        }
        this.setState({ isLoadingData: true })

        HttpServices.request("getMyProducts", body, (fetchResult, fetchError, fetchStatus) => {
            this.setState({ isLoadingData: false })


            this.setState({ pageStatus: fetchStatus })
            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.fetchDataFailed', description: fetchError.message })
                return
            }
            this.setState({ data: fetchResult.info })

            if (fetchResult.count != null) {
                this.setState({ totalCount: fetchResult.count })
            }

        })
    }


    postAddress = (data) => {
        this.setState({ isLoadingPostAddress: true })

        // console.log(data)

        let myData = { ...data }

        let partner = this.props.user?.info?.partner
        if (partner) {

            myData.partner = typeof partner == 'object' ? partner._id : partner

            console.log(myData)
            HttpServices.request("postProduct", myData, (fetchResult, fetchError) => {

                this.setState({ isLoadingPostAddress: false })

                if (fetchError) {
                    this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                    return
                }

                this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postedSuccesfully', description: '{{lang}}info.dataPostedSuccesfully' })
                this.addModal.hideModal()
                this.fetch()
                // if (!data._id) {
                //     this.setState({ addAddress: false })
                // }

                // this.setState({ address: fetchResult.info })

            })
        }
    }


    removeConfirmed = (data) => {
        this.setState({ isLoadingRemoveAddress: true })

        let item = this.state.currentItem

        let myData = { id: item._id, _id: item._id }


        HttpServices.request("removeProduct", myData, (fetchResult, fetchError) => {

            this.setState({ isLoadingRemoveAddress: false })

            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.removeFailed', description: fetchError.message })
                return
            }

            this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.RemovedSuccesfully', description: '{{lang}}info.dataRemovedSuccesfully' })
            this.RemoveConfirmationModal.modal.hideModal()
            this.fetch()
            // if (!data._id) {
            //     this.setState({ addAddress: false })
            // }

            // this.setState({ address: fetchResult.info })

        })
    }




    changePage = (index) => {
        this.setState({ currentPage: index }, () => {
            this.fetch()
        })
    }


    submitAddress = () => {
        let data = this.form.getForm()
        if (data) {
            this.postAddress(data)
        }
    }

    openEdit = (item) => {
        this.setState({ currentItem: item }, () => {
            this.addModal.showModal()
        })
    }


    openRemove = (item) => {
        this.setState({ currentItem: item }, () => {
            this.RemoveConfirmationModal.modal.showModal()
        })
    }



    render() {
        return (

            <Configurer
                settingsInfo={{ headerTitle: "Addresses", button: { goBack: true } }}
                title={"Addresses"}
                description={"My Addresses"}
                className=""
                changeOnUnmount={true}
            // parentConfigure={this.props.parentConfigure??null}
            >
                <div className="px-3" style={{ backgroundColor: '#f2f6f8' }}>
                    <div style={{ padding: '3% 5%', minHeight: '110vh' }}>
                        <div className="px-2 pt-4" >

                            <div className="flexcb w-100">
                                <div className="w-100">
                                    <p className="text-ultra-big font-bold">{translate("Products")}</p>
                                </div>

                                <div className="flexc">

                                    <button onClick={() => this.openEdit()} className="flexcc px-3 py-1" style={{ flex: 1, boxShadow: '0px 0px 15px #00000020', color: '#000', whiteSpace: 'nowrap', borderRadius: 20, backgroundColor: '#fff' }}>
                                        <p>+ Add</p>
                                    </button>

                                    <button onClick={() => this.props.openMobileMenu()} className="flexcc d-md-none " style={{ flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
                                        <img className=" " src="/images/menu.png" alt="" width="30px" />
                                    </button>
                                </div>
                            </div>

                            {/* <p className="text-small" style={{ color: '#9ab' }}>{this.props.user?.info?.fullname}</p> */}
                        </div>

                        <div className="mt-4">
                            <DataGrid isLoading={this.state.isLoadingData} data={this.state.data} component={ProductOwnerBox} col="col-12 col-md-6 col-lg-4  p-0" marginBottom={'mb-3'} extra={{ openEdit: this.openEdit, openRemove: this.openRemove }} />

                            <Pagination currentPage={this.state.currentPage} totalCount={this.state.totalCount} limit={this.state.limit} changePage={this.changePage} />

                        </div>
                    </div>


                    <Modal1 ref={el => this.addModal = el} maxWidth={1000}>

                        <div className='pb-5 mb-5' style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, width: "100%" }}>
                            <div className='mb-2' style={{ borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '10px' }}>
                                <p style={{ fontSize: '20px', fontWeight: '600', color: 'rgb(0,0,0)' }}>New Address</p>
                            </div>
                            <FormViewer headers={this.state.headers} initData={this.state.currentItem} ref={el => this.form = el} theme={"modern"} inputClass={"modern-input"} />
                            {this.state.isLoadingPostAddress ? (
                                <div className='pt-2 mt-1 px-3'>
                                    <Loader
                                        type="Oval"
                                        color="#007aff"
                                        height="30"
                                        width="30"
                                    />
                                </div>
                            ) : (
                                <button onClick={() => this.submitAddress()} className="modal-submite-button mt-3" style={{ background: 'linear-gradient(to left, #007aff, #00B2FF)' }}>Submit</button>
                            )}
                        </div>
                    </Modal1>


                    <RemoveConfirmationModal ref={el => this.RemoveConfirmationModal = el} confirmed={this.removeConfirmed} />


                </div>

            </Configurer>
        )
    }
}


export default ProductsPage
