import React from "react";
import Configurer from "../../components/Configurer";


class AccountType extends React.Component {

    state = {
    }

    render() {
        return (

            <Configurer
                settingsInfo={{ headerTitle: "Account Type", button:{goBack:true} }}
                title={"Account Type"}
                description={"This is the Account Type"}
                className="p-0"
                changeOnUnmount={true}
                // parentConfigure={this.props.parentConfigure??null}
            >


                <div className="px-2 mt-4">
                    <p className="text-ultra-big font-bold">Account Type</p>
                    <p className="text-small" style={{ color: '#9ab' }}>{this.props.user?.info?.fullname}</p>
                </div>


                

            </Configurer>
        )
    }
}


export default AccountType
