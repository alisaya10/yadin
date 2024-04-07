import React from "react";
import FinancialBox from "../../components/boxes/FinancialBox";
import Configurer from "../../components/Configurer";
import DataGrid from "../../components/DataGrid";
import Pagination from "../../components/Pagination";
import HttpServices from "../../utils/Http.services";
import { translate } from "../../utils/useful";
import Modal1 from '../Modal1';
import FormViewer from '../FormViewer';
import RemoveConfirmationModal from "../modals/RemoveConfirmationModal";
import Loader from "react-loader-spinner";


class AddressBox extends React.Component {
    render() {

        let item = this.props.data
        return (
            <div className=' mb-3  pt-0 h-100 d-flex' >
                <div className="d-flex flex-column p-0  " style={{ flex: 1, border: '0px solid #e2e4e8', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0px 0px 20px #10203020' }}>
                    <div className="flex-1  px-0" style={{ flex: 1, alignSelf: 'stretch' }}>
                        <div className='px-3 pt-1 '>


                            <div className="flexc mt-2" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                <p style={{ fontSize: '14px', fontWeight: "500" }}>{item.province} - {item.city}</p>
                            </div>

                            <div className="flexc mt-0" style={{ padding: '2px 0px', color: 'rgb(20,20,20)', fontSize: '15px', fontWeight: '500' }}>
                                <p style={{ fontSize: '13px', fontWeight: "400" }}>{item.address}</p>
                            </div>
                        </div>
                        <div className=' px-3 mt-2' style={{}}>
                            <div style={{}} className="my-2 w-100 d-flex align-items-center">
                                <img src='/images/icons/email.png' style={{}} width={'18px'} height={'18px'} />
                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.zipCode}</span>
                            </div>
                            <div style={{}} className="my-2 w-100 d-flex align-items-center">
                                <img src='/images/icons/headphones.svg' style={{}} width={'18px'} height={'18px'} />
                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.recipient?.phone}</span>
                            </div>
                            <div style={{}} className="my-2 w-100 d-flex align-items-center">
                                <img src='/images/icons/user.png' style={{}} width={'18px'} height={'18px'} />
                                <span className='ml-2' style={{ color: "#000", fontSize: "13px" }}>{item.recipient?.name} {item.recipient?.family}</span>
                            </div>

                        </div>
                    </div>

                    <div className="px-3 pb-2 pt-2 w-100 d-flex align-items-center justify-content-end" style={{ backgroundColor: '#f2f6f8', borderRadius: '0px 0px 8px 8px' }}>
                        <span onClick={() => this.props.extra?.openRemoveAddress(item)} className='mx-2 text-bold' style={{ color: "#9ab", fontSize: "13px", cursor: 'pointer', textTransform: 'uppercase' }}>Delete</span>
                        <span onClick={() => this.props.extra?.openEditAddress(item)} className=' text-bold px-2' style={{ color: "#007aff", fontSize: "13px", cursor: 'pointer', textTransform: 'uppercase' }}>Edit</span>

                    </div>
                </div>

            </div>
        )
    }
}


class Addresses extends React.Component {

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
            { type: 'TextInput', key: 'province', information: { label: "{{lang}}Province", placeholder: '{{lang}}Province', required: true }, },
            { type: 'TextInput', key: 'city', information: { label: "City", placeholder: '{{lang}}City', required: true }, },
            { type: 'TextInput', key: 'address', information: { label: "Address", placeholder: "Address", required: true, } },
            { type: 'TextInput', key: 'zipCode', information: { label: "Zip Code", placeholder: "Zip Code", required: true, } },

            { type: 'MapLeafletInput', key: 'location', information: { label: '{{lang}}location', placeholder: '{{lang}}location', required: true, disabled: false }, showMain: false },

            { type: 'TextInput', key: 'recipient.name', information: { label: "Recipient name", placeholder: "Name", required: true, }, },
            { type: 'TextInput', key: 'recipient.family', information: { label: "Recipient family", placeholder: "Family", required: true, }, },
            { type: 'TextInput', key: 'recipient.phone', information: { label: "Recipient phone", placeholder: "phone", required: true, }, },

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

        HttpServices.request("getMyAddresses", body, (fetchResult, fetchError, fetchStatus) => {
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
        if (myData.location?.lat) {
            myData.location = { coordinates: [myData.location.lng, myData.location.lat], type: 'Point' }
        }

        HttpServices.request("postAddress", myData, (fetchResult, fetchError) => {

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


    removeConfirmed = (data) => {
        this.setState({ isLoadingRemoveAddress: true })

        let item = this.state.currentItem

        let myData = { id: item._id, _id: item._id }


        HttpServices.request("removeAddress", myData, (fetchResult, fetchError) => {

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
                                    <p className="text-ultra-big font-bold">{translate("Addresses")}</p>
                                </div>

                                <div className="flexc">

                                    <button onClick={() => this.openEditAddress()} className="flexcc px-3 py-1" style={{ flex: 1, boxShadow: '0px 0px 15px #00000020', color: '#000', whiteSpace: 'nowrap', borderRadius: 20, backgroundColor: '#fff' }}>
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
                            <DataGrid isLoading={this.state.isLoadingData} data={this.state.data} component={AddressBox} col="col-12 col-md-6 col-lg-4" marginBottom={'mb-3'} extra={{ openEditAddress: this.openEditAddress, openRemoveAddress: this.openRemoveAddress }} />

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


export default Addresses
