import React from "react";
import Configurer from "../../components/Configurer";
import FormViewer from "../../components/FormViewer";
import LoaderButton from "../../components/LoaderButton";
import HttpService from "../../utils/Http.services";
class ChangePasword extends React.Component {

    state = {
        headers: [
            { key: 'currentPassword', type: 'PasswordInput', col: '6', information: { label: '{{lang}}currentPassword', icon: '/images/inputdef.svg', placeholder: '{{lang}}insertPassword', required: true } },
            { key: 'newPassword', type: 'PasswordInput', col: '6', information: { label: '{{lang}}newPassword', icon: '/images/inputdef.svg', placeholder: '{{lang}}insertPassword', required: true } },
        ]
    }

    updateUserPassword = () => {
        let data = this.form.getForm()
        if (data) {
            this.setState({ isLoading: true, errors: {}, message: null })
            HttpService.request("updateUserPassword", data, (fetchResult, fetchError) => {
                console.log(fetchError)
                this.setState({ isLoading: false })
                if (fetchError) {
                    this.setState({ errors: fetchError.errors })
                    this.props.addNotif({ type: 'error', title: '{{lang}}errors.profileNotUpdated', description: fetchError.message })
                    return
                }
                this.props.addNotif({ type: 'success', title: '{{lang}}info.profileUpdated', description: '{{lang}}info.profileUpdatedSuccessfully' })

            })
        }
    }


    render() {
        return (

            <Configurer
                settingsInfo={{ headerTitle: "Change Password", button: { goBack: true } }}
                title={"Change Password"}
                description={"Change Password"}
                className="px-3"
                changeOnUnmount={true}
            >


                <div className=" mt-4" style={{ padding: '3% 5%', }}>

                    <div className="flexcb w-100">
                        <div className="w-100">
                            <p className="text-ultra-big font-bold">Change Password</p>
                            <p className="text-small" style={{ color: '#9ab' }}>{this.props.user.info?.fullname}</p>
                        </div>
                        <button onClick={() => this.props.openMobileMenu()} className="flexcc d-md-none " style={{ flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
                            <img className=" " src="/images/menu.png" alt="" width="30px" />
                        </button>
                    </div>


                    <div className="w-100 mt-4">
                        <FormViewer ref={el => this.form = el} headers={this.state.headers} initData={this.props.user.info} errors={this.state.errors} inputClass={'modern-input'} />

                        <div className="text-center">
                            <LoaderButton
                                onClick={this.updateUserPassword}
                                isLoading={this.state.isLoading}
                                text={"{{lang}}update"}
                                type={"Oval"}
                                className="mt-4 mb-4"
                                buttonStyle={{ outline: 'none', backgroundColor: '#222', cursor: 'pointer', padding: '10px 50px', borderRadius: 4, fontSize: 15, fontWeight: 'bold', color: '#fff', border: 'none' }}
                                width={40}
                                height={40}
                                color={'#202020'}
                            />
                        </div>

                    </div>
                </div>




            </Configurer>
        )
    }
}


export default ChangePasword
