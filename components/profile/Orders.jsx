import React from "react";
import FinancialBox from "../../components/boxes/FinancialBox";
import Configurer from "../../components/Configurer";
import DataGrid from "../../components/DataGrid";
import Pagination from "../../components/Pagination";
import HttpServices from "../../utils/Http.services";
import { checkTranslation, imageAddress, priceStandardView, translate } from "../../utils/useful";
import Modal1 from '../Modal1';
import FormViewer from '../FormViewer';
import RemoveConfirmationModal from "../modals/RemoveConfirmationModal";
import Loader from "react-loader-spinner";
import moment from "jalali-moment";
import Link from "next/link";

class OrdersBox extends React.Component {

    getStatusInfo(status) {
        switch (status) {
            case '0':
                return { label: '{{lang}}Pending', color: '#789', icon: '' }
                break;

            case '1':
                return { label: '{{lang}}Confirmed', color: 'rgb(0, 205, 116)', icon: '' }
                break;

            case '2':
                return { label: '{{lang}}Finished', color: 'rgb(0, 205, 116)', icon: '' }
                break;

            case '-1':
                return { label: '{{lang}}Canceled', color: '#EE5050', icon: '' }
                break;

            default:
                return { label: '{{lang}}Pending', color: '#789', icon: '' }
                break;
        }
    }

    render() {

        let item = this.props.data
        return (
            <div className=' mb-3  pt-0 h-100 d-flex' >
                <div className="d-flex flex-column p-0  " style={{ flex: 1, border: '0px solid #e2e4e8', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0px 0px 20px #10203020' }}>

                    <div className="px-3 pb-2 pt-2 w-100 flexcb align-items-center " style={{ backgroundColor: '#f2f6f8', borderRadius: '8px 8px 0px 0px' }}>
                        <span className=' text-bold ' style={{ color: "#007aff", fontSize: "13px", cursor: 'pointer', textTransform: 'uppercase' }}>#{item.id}</span>
                        <span className='  px-3 py-1 ' style={{ backgroundColor: this.getStatusInfo(item.status).color, color: "#fff", borderRadius: 4, fontSize: "13px", cursor: 'pointer', }}> {checkTranslation(this.getStatusInfo(item.status).label)}</span>


                    </div>

                    {item.paymentStatus == '2' && (
                        <div className="px-3 py-2 flexcb mt-1 mx-1" style={{ backgroundColor: '#f2f6f8', borderRadius: 4 }}>
                            <p className="text-small">Payment is done in {moment(item.pDate).format("jYYYY/jMM/jDD")}. Amount: {priceStandardView(item.totalPrice)}</p>
                        </div>
                    )}

                    {item.paymentStatus == '0' && (
                        <div className="px-3 py-2 flexcb mt-1 mx-1" style={{ backgroundColor: '#00B2FF20', borderRadius: 4 }}>
                            <p className="text-small">Purchase is confirmed, You need to do the payment to finalize your order.</p>
                            <Link href={'/cart/checkout/' + item._id}>
                                <a className="text-small white px-2 py-1" style={{ background: 'linear-gradient(to left, #007aff, #00B2FF)', borderRadius: 4 }}>Pay Now</a>
                            </Link>
                        </div>
                    )}

                    {item.status == '0' && (
                        <div className="px-3 py-2 flexcb mt-1 mx-1" style={{ backgroundColor: '#f2f6f8', borderRadius: 4 }}>
                            <p className="text-small">Purchase needs to be confirmed. After confirmation you will be able to proceed to payment step.</p>
                        </div>
                    )}

                   

                    <div className="flex-1  px-0 pt-2" style={{ flex: 1, alignSelf: 'stretch', borderBottom: '1px solid #eee' }}>



                        <div className=' px-3 mt-2' style={{}}>
                            <div style={{}} className="my-2 w-100 d-flex align-items-center">
                                <img src='/images/icons/clock.png' style={{}} width={'18px'} height={'18px'} />
                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{moment(item.cDate).format("jYYYY jMMMM jDD")} - Price: {priceStandardView(item.totalPrice)}</span>
                            </div>
                            <div style={{}} className="my-2 w-100 d-flex align-items-center">
                                <img src='/images/icons/user.png' style={{}} width={'18px'} height={'18px'} />
                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{translate('recipient')}: {item.recipient?.name} {item.recipient?.family} - {item.recipient?.phone}</span>
                            </div>
                            <div style={{}} className="mt-2 w-100 d-flex align-items-center">
                                <img src='/images/icons/email.png' style={{}} width={'18px'} height={'18px'} />
                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.address?.address} - {item.address?.city} - {item.address?.province} - {item.address?.zipCode}</span>
                            </div>

                        </div>
                    </div>

                    <div className="w-100 d-flex flex-wrap pt-2 pb-3">
                        {item.list?.map((prop, index) => {
                            let image = prop.product?.images
                            // console.log(prop.images)

                            if (Array.isArray(image)) {
                                image = image[0]
                            }
                            return (
                                <Link href={'/product/' + prop.product?._id+'?product='+prop.product?.slug}>
                                    <a className="mb-2 mx-2 flexcc flex-column" style={{ maxWidth: 150 }}>
                                        <img src={imageAddress(image, 'product', 'small')} height={80} />
                                        <p className="mt-2 text-center text-smaller">{prop.product.title}</p>
                                        <div className="flexc">
                                            <p className="mt-2 px-1 text-center text-smaller">{prop.count} *</p>
                                            <div className="mt-2">
                                                {prop.priceSttings?.priceBeforeDiscount && prop.priceSttings?.priceBeforeDiscount != prop.price && (
                                                    <p className=" text-center text-smallest" style={{ textDecoration: 'line-through', color: '#9ab' }}>{priceStandardView(prop.priceSttings?.priceBeforeDiscount.toFixed(0))}</p>
                                                )}
                                                <p className=" text-center text-smaller">{priceStandardView(prop.price)}</p>

                                            </div>

                                            <p className="mt-2 px-1 text-center text-smaller"> {prop.priceSttings?.currency}</p>

                                        </div>
                                    </a>
                                </Link>
                            )
                        })}

                    </div>


                </div>

            </div>
        )
    }
}


class Orders extends React.Component {

    state = {
        page: 0,
        limit: 20,
        currentPage: 0,

        headers: [

            { type: 'TextInput', key: 'province', information: { label: "{{lang}}Province", placeholder: '{{lang}}Province', required: true }, },
            { type: 'TextInput', key: 'city', information: { label: "City", placeholder: '{{lang}}City', required: true }, },
            { type: 'TextInput', key: 'address', information: { label: "Address", placeholder: "Address", required: true, } },
            { type: 'TextInput', key: 'zipCode', information: { label: "Zip Code", placeholder: "Zip Code", required: true, } },

            { type: 'MapLeafletInput', key: 'location', information: { label: '{{lang}}location', placeholder: '{{lang}}location', required: true, disabled: false }, showMain: false },

            { type: 'TextInput', key: 'recipient.name', information: { label: "Recipient name", placeholder: "Name", required: true, }, },
            { type: 'TextInput', key: 'recipient.family', information: { label: "Recipient family", placeholder: "Family", required: true, }, },
            { type: 'TextInput', key: 'recipient.phone', information: { label: "Recipient phone", placeholder: "phone", required: true, }, },

        ],

        data: [],
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

        HttpServices.request("getMyOrders", body, (fetchResult, fetchError, fetchStatus) => {
            this.setState({ isLoadingData: false })

            console.log(fetchResult)

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

    openEditAddress = (item) => {
        this.setState({ currentItem: item }, () => {
            this.addModal.showModal()
        })
    }


    openRemoveAddress = (item) => {
        this.setState({ currentItem: item }, () => {
            this.RemoveConfirmationModal.modal.showModal()
        })
    }



    render() {
        return (

            <Configurer
                settingsInfo={{ headerTitle: "Orders", button: { goBack: true } }}
                title={"Orders"}
                description={"My Orders"}
                className=""
                changeOnUnmount={true}
            // parentConfigure={this.props.parentConfigure??null}
            >
                <div className="px-3" style={{ backgroundColor: '#f2f6f8' }}>
                    <div style={{ padding: '3% 5%', minHeight: '110vh' }}>
                        <div className="px-2 pt-4" >

                            <div className="flexcb w-100">
                                <div className="w-100">
                                    <p className="text-ultra-big font-bold">{translate("Orders")}</p>
                                </div>

                                <div className="flexc">

                                    {/* <button onClick={() => this.openEditAddress()} className="flexcc px-3 py-1" style={{ flex: 1, boxShadow: '0px 0px 15px #00000020', color: '#000', whiteSpace: 'nowrap', borderRadius: 20, backgroundColor: '#fff' }}>
                                        <p>+ Add</p>
                                    </button> */}

                                    <button onClick={() => this.props.openMobileMenu()} className="flexcc d-md-none " style={{ flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
                                        <img className=" " src="/images/menu.png" alt="" width="30px" />
                                    </button>
                                </div>
                            </div>

                            {/* <p className="text-small" style={{ color: '#9ab' }}>{this.props.user?.info?.fullname}</p> */}
                        </div>

                        <div className="mt-4">
                            <DataGrid isLoading={this.state.isLoadingData} data={this.state.data} component={OrdersBox} col="col-12" marginBottom={'mb-4'} extra={{ openEditAddress: this.openEditAddress, openRemoveAddress: this.openRemoveAddress }} />
                            <Pagination currentPage={this.state.currentPage} totalCount={this.state.totalCount} limit={this.state.limit} changePage={this.changePage} />

                        </div>
                    </div>


                    <Modal1 ref={el => this.addModal = el} maxWidth={600}>

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


export default Orders
