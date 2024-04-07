import Link from "next/link";
import React from "react";
import { checkTranslation } from "../../utils/useful";
import Configurer from "../Configurer";


class Dashboard extends React.Component {

    state = {
    }
  
    render() {
        return (

            <Configurer
                // settingsInfo={{ headerTitle: "Dashboard" }}
                settingsInfo={{ headerTitle: "Profile", button: { goBack: false } }}

                title={"Profile"}
                description={"This is the Profile"}
                className="px-3"
            >

                <div className=" mt-4" style={{ padding: '3% 5%', }}>



                    <div className="flexcb w-100">
                        <div className="px-2 mt-0 w-100">
                            <p className="text-ultra-big font-bold m-0 p-0" style={{ lineHeight: 1.2 }}>User Profile</p>
                            <div className="flexc">
                                <p className="text-normal text-bold  m-0 p-0" style={{ color: '#9ab' }}>{this.props.user?.info?.fullname}</p>

                                <button onClick={() => this.props.logoutAlert()} className="text-center py-1 px-4 mx-1 d-md-none" style={{ borderBottom: '0px solid #677dc4', backgroundColor: '#677dc430', borderRadius: '6px' }}>
                                    <p className="text-bold text-smaller" style={{ color: '#677dc4' }}>Logout</p>
                                </button>
                            </div>
                        </div>

                        <button onClick={() => this.props.openMobileMenu()} className="flexcc d-md-none " style={{ flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
                            <img className=" " src="/images/menu.png" alt="" width="30px" />
                        </button>

                    </div>



                    <div className="w-100 py-4 px-5 mb-4 mt-4 flexcb" style={{ backgroundImage: 'linear-gradient(#fbdfaa,#fce7b4)', borderRadius: 8 }}>
                        <div>
                            <p className="font-bold text-big">Free Service</p>
                            <p className="text-small mt-2">This is the decription about the free service. It can tell about the benefits of this option ...</p>
                            <div className="mt-3">
                                <Link href={'/platform'}  >
                                    <a className="px-4 py-2 " style={{ borderRadius: 8, backgroundColor: '#fff' }}>
                                        <span className="text-small">LEARN MORE</span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="d-none d-md-block">
                            <img src="/images/crown.svg" width="90px" alt="" />
                        </div>
                    </div>


                    <div className="row mx-0 mt-4 p-0">

                        <div className="col-12 d-md-none mb-4 p-0">
                            <div className=" row m-0">

                                <div className="col-6 p-0 prd-0 pld-1">
                                    <button onClick={() => this.props.changePage('wallet')} className="text-center py-3 px-2 w-100" style={{ borderBottom: '0px solid #677dc4', backgroundColor: '#f2f6f8', borderRadius: '6px' }}>
                                        <p className="text-bold text-semibig" style={{ color: '#000510' }}>{this.props.user?.info?.balance ?? 0} Coins</p>
                                        <p className="text-smaller text-uppercase text-bold " style={{ color: '#345' }}>Your Balance</p>
                                    </button>
                                </div>

                                <div className="col-6 prd-0 pld-1">
                                    <button onClick={() => this.props.changePage('wallet')} className="text-center py-3 px-2 w-100" style={{ borderBottom: '0px solid #677dc4', backgroundColor: '#f2f6f8', borderRadius: '6px' }}>
                                        <p className="text-bold text-semibig" style={{ color: '#000510' }}>{this.props.user?.info?.selfBalance ?? 0} Coins</p>
                                        <p className="text-smaller text-uppercase text-bold " style={{ color: '#345' }}>Self Balance</p>
                                    </button>
                                </div>

                            </div>
                        </div>

                        {this.props.pages.map((prop, index) => {
                            if (!prop.dontShowInDashboard) {
                                return (
                                    <div className="col-6 col-lg-4" key={index}>
                                        <button onClick={() => this.props.changePage(prop.key)} className="text-center p-3 button-light-hover border-radius-8 w-100">
                                            <img src={prop.icon} width="70px" />
                                            <p className="font-bold mt-2 text-normal">{checkTranslation(prop.name)}</p>
                                            <p className="text-smaller" style={{ color: '#9ab' }}>This is the description of this desction</p>

                                        </button>
                                    </div>
                                )
                            }
                        })}

                    </div>
                </div>

            </Configurer>
        )
    }


}


export default Dashboard
