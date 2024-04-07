import React from "react";
import FinancialBox from "../../components/boxes/FinancialBox";
import Configurer from "../../components/Configurer";
import { translate } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import HttpServices from "../../utils/Http.services";
import Loader from 'react-loader-spinner'
import Link from "next/link";
import { Router } from "next/router";
import PriceInput from "../inputs/PriceInput";

class Wallet extends React.Component {

  state = {
    amount: 0,
    value1: '',
    isLoadingPost: false,
    data: [
      // { name: '$12', description: 'This is the description',type:'income' },
      // { name: '$120', description: 'This is the description',type:'income' },
      // { name: '$20', description: 'Charged your wallet',type:'charge' },
      // { name: '$100', description: 'This is the description',type:'charge' },

    ],
  }
  componentDidMount() {
    // this.getMyPayments()
  }

  changeInputValue = (key, value) => {
    // let value = (target.validity.valid) ? target.value : null
    // if (value !== null) {
    // console.log(value)
    this.setState({ amount: Number(value) })
    // }
  }
  // getMyPayments() {


  //     console.log("Here")
  //     HttpServices.request('getMyPayments', {}, (fetchResult, fetchError) => {

  //       console.log(fetchError)
  //       console.log(fetchResult)

  //       if (fetchError) {
  //         return
  //       }
  //       console.info(fetchResult)
  //       this.setState({ data: fetchResult.info })
  //     })
  //   }


  requestIncreaseBalance = () => {

    if (this.state.amount && this.state.amount >= 0 && this.state.amount != '') {
      this.setState({ isLoadingPost: true })
      console.log("requestIncreaseBalance")
      console.log(this.state.amount)

      HttpServices.request("requestIncreaseBalance", { amount: this.state.amount }, (fetchResult, fetchError) => {

        console.log('Done')

        this.setState({ isLoadingPost: false })

        if (fetchError) {
          this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
          console.log('err', fetchError);
          return
        }
        if (fetchResult) {
          this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postSuccessfully', description: '{{lang}}info.postSuccessfullyDesc' })
          // this.props.actions.setUser(fetchResult.user, null, true)
          this.setState({ amount: '' })
          console.log('amount', this.state.amount);
          console.log('info', fetchResult.info);

          window.location = fetchResult.info
        }

      })
    } else {
    }
  }

  ignoreData = () => {
    HttpServices.request("ignoreData", {}, (fetchResult, fetchError) => {

      this.setState({ isLoadingPost: false })

      if (fetchError) {
        this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
        return
      }
      if (fetchResult.user) {
        this.props.actions.addNotif({ type: 'success', title: '{{lang}}info.postSuccessfully', description: '{{lang}}info.postSuccessfullyDesc' })
        this.props.actions.setUser(fetchResult.user, null, true)
        this.setState({ amount: '' })
      }

    })
  }
  setAmount = (amount) => {

    this.setState({ amount })



  }
  // setAmount2 = () => {

  //     this.setState({ amount: 100000 })



  // }
  // setAmount3 = () => {

  //     this.setState({ amount: 150000 })



  // }

  render() {
    return (

      <Configurer
        settingsInfo={{ headerTitle: "Account Type", button: { goBack: true } }}
        title={"Account Type"}
        description={"This is the Account Type"}
        className=""
        changeOnUnmount={true}
      // parentConfigure={this.props.parentConfigure??null}
      >
        <div className="px-3">
          <div style={{ padding: '3% 5%', minHeight: '110vh' }}>
            <div className="px-2 pt-4" >


              <div className="flexcb w-100">
                <div className="w-100">
                  <p className="text-ultra-big font-bold text-color-1">کیف پول</p>
                </div>
                {/* <button onClick={() => this.props.openMobileMenu()} className="flexcc d-md-none " style={{ flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
                  <img className=" " src="/images/menu.png" alt="" width="30px" />
                </button> */}
              </div>
            </div>



            <div className="box p-3" style={{ maxWidth: "600px" }}>
              <div className="text-center  w-100 mx-2 mt-3 px-5 pb-3 flexcc flex-column ">
                <p className="text-bolder text-ultra-big mb-4 text-color-1">شارژ حساب</p>

                <div className="mt-4 mb-2 w-75 flexcc">
                  <p className="main-color-1 pl-5">موجودی</p>
                  <p className="main-color-1 pr-5">{this.props.user?.info.wallet ?? 0 + ' ' + 'تومان'}</p>
                </div>

                <div className="flexcc">
                  <div className="w-100">
                    <div className="row m-0 my-4">
                      <div className="col-12 col-sm-6 col-lg-4 py-2 py-sm-0">
                        <button className="btn-primary5 text-normal" style={{ width: 120 }} onClick={() => this.setAmount(50000)}>
                          50,000 تومان
                        </button>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-4 py-2 py-sm-0">
                        <button className="btn-primary5 text-normal" style={{ width: 120 }} onClick={() => this.setAmount(100000)}>
                          100,000 تومان
                        </button>
                      </div>
                      <div className="col-12 col-sm-6 col-lg-4 py-2 py-lg-0">
                        <button className="btn-primary5 text-normal" style={{ width: 120 }} onClick={() => this.setAmount(150000)}>
                          150,000 تومان
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


                {/* <input pattern="[0-9]*" value={this.state.amount != null ? this.state.amount : ''} onChange={(e) => this.changeInputValue(e.target)}
                      className="text-bold text-center w-100 flexc" placeholder="مبلغ ..."
                      style={{ backgroundColor: '#fff', borderRadius: 4, border: 'none', fontSize: 20, color: '#181818', padding: '10px 20px', maxWidth:"250px" }} /> */}

                <div className="row m-0 flexcb my-3">
                  <div className="col-12 col-md-4 p-0">
                    <p className=" white text-semibig">مبلغ دلخواه</p>
                  </div>

                  <div className="col-12 col-md-8 p-0 mt-3 mt-md-0">


                    <div className="row m-0 flexc">
                      <div className="col-12 col-sm-9 pl-sm-0">

                      <div className="btn-primary6" style={{minWidth: 130}}>
                        <PriceInput header={{ key: 'price', information: { placeholder: "0" } }} changeValue={this.changeInputValue} data={this.state.amount != null ? this.state.amount : ''} />
                      </div>
                      </div>

                      <div className="col-12 col-sm-3 pr-sm-0 pt-3 pt-sm-0">
                        <p className="text-color-2 text-semibig pr-2">تومان</p>
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.isLoadingPost ? (
                  <div className="p-2 text-center">
                    <Loader
                      type="Oval"
                      color="#677dc4"
                      height="40"
                      width="40"
                    />
                  </div>
                ) : (

                  <button onClick={() => this.requestIncreaseBalance()} className="text-semibig my-5 btn-primary2" style={{ maxWidth: "220px" }}>
                    <p className="text-bold">پرداخت</p>
                  </button>
                )}

                {this.props.user?.info?.wallet < 0 && (
                  <div>
                    <p className="mt-2 text-small" style={{ color: '#ee5050' }}>You need to increase you balance as much to compensate the negative credit, or</p>
                    <button onClick={() => this.ignoreData()} className="mt-2" style={{ backgroundColor: '#ee5050', borderRadius: 4, color: '#fff', padding: '4px 15px' }}>Ignore negative credit, and lose data</button>
                  </div>
                )}

                {/* <p className="text-smaller  mt-2" style={{ color: '#345' }}>More description about payment can be shown here</p> */}
              </div>
            </div>





          </div>





        </div>

      </Configurer >
    )
  }
}


const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wallet);

