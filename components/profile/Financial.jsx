import React from "react";
import { Link } from "react-router-dom";
import FinancialBox from "../../components/boxes/FinancialBox";
import Configurer from "../../components/Configurer";
import DataGrid from "../../components/DataGrid";
import Pagination from "../../components/Pagination";
import HttpServices from "../../utils/Http.services";
import { translate } from "../../utils/useful";
import moment from 'jalali-moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

class Financial extends React.Component {

  state = {

    isLoadingPost: false,
    data: [
      // { name: '$12', description: 'This is the description',type:'income' },
      // { name: '$120', description: 'This is the description',type:'income' },
      // { name: '$20', description: 'Charged your wallet',type:'charge' },
      // { name: '$100', description: 'This is the description',type:'charge' },

    ],
  }

  componentDidMount() {
    this.getMyPayments()
    this.getUserCourses()
  }
  // changeInputValue(target) {
  //     let value = (target.validity.valid) ? target.value : null
  //     if (value !== null) {
  //         this.setState({ amount: Number(value) })
  //     }
  // }
  getMyPayments() {


    console.log("Here")
    HttpServices.request('getMyPayments', {}, (fetchResult, fetchError) => {

      console.log(fetchError)
      console.log(fetchResult)

      if (fetchError) {
        return
      }

      let totalPayment = 0
      console.info(fetchResult)


      fetchResult.info.forEach(payment => {
        totalPayment = totalPayment + payment.amount
      });

      this.setState({ data: fetchResult.info, totalPayment })
    })
  }


  getUserCourses() {

    console.log("TP!")

    HttpServices.request('getUserCourses', {}, (fetchResult, fetchError) => {

      console.log('scsdccacsccs', fetchResult)
      console.log('00000000000000000', fetchError)

      if (fetchError) {
        return
      }
      let totalPrice = 0
      console.info(fetchResult)


      fetchResult.info.forEach(userCourse => {
        totalPrice = totalPrice + userCourse?.course?.price
      });
      console.info(fetchResult)
      this.setState({ userCourses: fetchResult.info })
    })


  }
  render() {
    return (
      <div className="container">

        <div className="box p-3 mt-4">
          <div className="row m-0">
            <div className="col-12 col-md-6 col-xl-3 text-center pb-4 pb-xl-0">
              <p className="text-color-1 text-ultra-big">{this.state.totalPayment * 10}</p>
              <p className="text-color-2">مجموع پرداخت</p>
            </div>

            <div className="col-12 col-md-6 col-xl-3 text-center pb-4 pb-xl-0">
              <p className="text-color-1 text-ultra-big">{this.state.totalPrice ?? 0}</p>
              <p className="text-color-2">ریال شارژ استفاده شده</p>
            </div>

            <div className="col-12 col-md-6 col-xl-3 text-center pb-4 pb-xl-0">
              <p className="text-color-1 text-ultra-big">{this.state?.userCourses?.length ?? 0}</p>
              <p className="text-color-2">دوره خریداری شده</p>
            </div>

            <div className="col-12 col-md-6 col-xl-3 text-center pb-4 pb-xl-0">
              <p className="main-color-1 text-ultra-big">{this.props.user?.info.wallet ?? 0}</p>
              <p className="main-color-1">ریال شارژ باقیمانده</p>
            </div>
          </div>
        </div>

        {/* 
                <div className="text-center  w-100 mx-2 mt-3 px-5 py-4 flexcc flex-column " style={{ borderTop: '1px solid #677dc430', borderBottom: '0px solid #677dc430' }}>
                    <p className="text-bold text-big mb-2 " style={{ color: '#677dc4' }}>Inclease balance</p>


                    <input pattern="[0-9]*" value={this.state.amount != null ? this.state.amount : ''} onChange={(e) => this.changeInputValue(e.target)} className="text-bold text-center" placeholder="Amount ..." style={{ backgroundColor: '#fff', borderRadius: 4, border: '1px solid #677dc4', fontSize: 20, color: '#677dc4', padding: '10px 20px' }} />
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

                        <button onClick={() => this.requestIncreaseBalance()} className="text-semibig mt-2" style={{ backgroundColor: '#677dc4', color: '#fff', border: '0px solid #fff', borderRadius: 4, padding: '8px 20px' }}>
                            <p className="text-bold">DO PAYMENT</p>
                        </button>
                    )}

                    {this.props.user?.info?.balance < 0 && (
                        <div>
                            <p className="mt-2 text-small" style={{ color: '#ee5050' }}>You need to increase you balance as much to compensate the negative credit, or</p>
                            <button onClick={() => this.ignoreData()} className="mt-2" style={{ backgroundColor: '#ee5050', borderRadius: 4, color: '#fff', padding: '4px 15px' }}>Ignore negative credit, and lose data</button>
                        </div>
                    )}

                    <p className="text-smaller  mt-2" style={{ color: '#345' }}>More description about payment can be shown here</p>
                </div> */}


        <div className="flexc py-4 px-2">
          <div>
            <p className="text-color-1">نمایش براساس: </p>
          </div>
          <div>
            <p className="text-color-1 px-4">خریدها</p>
          </div>

          <div>
            <p className="text-color-2">پرداخت ها</p>
          </div>
        </div>


        <div className="box p-3">
          {Array.isArray(this.state?.data) && this.state?.data.map((item, index) => {
            return (
              <div>
                <div className="row m-0 border-bottom-gray pb-3">
                  <div className="col-4 col-lg-3 text-start">
                    <p className="text-color-1 text-semibig">اعتبار</p>
                  </div>
                  {/* 
                        <div className="col-lg-3 text-start d-none d-lg-block">
                        <p className="text-color-1 text-semibig">تعداد یادین</p>
                      </div> */}

                  <div className="col-4 col-lg-3 text-start">
                    <p className="text-color-1 text-semibig">تاریخ پرداخت </p>
                  </div>

                  <div className="col-4 col-lg-3">
                  </div>
                </div>

                {console.log("financeeeeee", this.state.data)}


                <div className="row m-0 py-3 flexc">

                  <div className="col-4 col-lg-3 text-start">
                    <p className="text-color-1">{item?.amount} تومان </p>
                  </div>

                  {/* <div className="col-lg-3 text-start d-none d-lg-block">
                            <p className="text-color-1">۱ یادین</p>
                        </div> */}

                  <div className="col-4 col-lg-3 text-start">
                    <p className="text-color-1"> {moment(item.cDate).locale('fa').format(" jYYYY jMMM, jDD")}</p>

                  </div>

                  <div className="col-4 col-lg-3 text-start">
                    <button className="btn-primary5 text-color-2 text-normal flexcc d-none d-lg-block" style={{ maxWidth: "150px" }}>
                      <a>مشاهده جزئیات</a>
                    </button>

                    <button className="btn-primary5 text-color-2 text-small flexcc d-block d-lg-none" style={{ maxWidth: "150px" }}>
                      <a> جزئیات</a>
                    </button>
                  </div>
                </div>


              </div>
            );
          })}


          {(this.state.data == false) && (

            <div>
              <p className="text-color-2 flexcc pt-4 pb-3">گزارش مالی برای نمایش وجود ندارد.</p>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Financial);












// class Financial extends React.Component {

//     state = {
//         page: 0,
//         limit: 20,
//         currentPage: 0,
//         data: [
//             { name: '$12', description: 'This is the description',type:'income' },
//             { name: '$120', description: 'This is the description',type:'income' },
//             { name: '$20', description: 'Charged your wallet',type:'charge' },
//             { name: '$100', description: 'This is the description',type:'charge' },

//         ],
//     }

//     fetch(getCount) {
//         let body = { page: this.state.page }
//         body.limit = this.state.limit
//         body.skip = this.state.currentPage

//         if (this.state.totalCount == null || getCount) {
//             body.getCount = true
//         }

//         HttpServices.request("getMyPayments", body, (fetchResult, fetchError, fetchStatus) => {
//             this.setState({ isLoading: false })


//             this.setState({ pageStatus: fetchStatus })
//             if (fetchError) {
//                 this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.fetchDataFailed', description: fetchError.message })
//                 return
//             }
//             this.setState({ data: fetchResult.info })

//             if (fetchResult.count!=null) {
//                 this.setState({ totalCount: fetchResult.count })
//             }

//         })
//     }


//     changePage = (index) => {
//         this.setState({ currentPage: index }, () => {
//             this.fetch()
//         })
//     }
//     render() {
//         return (

//             <Configurer
//                 settingsInfo={{ headerTitle: "Account Type", button: { goBack: true } }}
//                 title={"Account Type"}
//                 description={"This is the Account Type"}
//                 className=""
//                 changeOnUnmount={true}
//             // parentConfigure={this.props.parentConfigure??null}
//             >
//                 <div className="px-3" style={{ backgroundColor: '#f2f6f8' }}>
//                     <div style={{ padding: '3% 5%', minHeight: '110vh' }}>
//                         <div className="px-2 pt-4" >

//                             <div className="flexcb w-100">
//                                 <div className="w-100">
//                                     <p className="text-ultra-big font-bold">{translate("Financial")}</p>
//                                 </div>
//                                 <button onClick={() => this.props.openMobileMenu()} className="flexcc d-md-none " style={{ flex: 1, boxShadow: '0px 0px 15px #00000005', color: '#789' }}>
//                                     <img className=" " src="/images/menu.png" alt="" width="30px" />
//                                 </button>
//                             </div>

//                             {/* <p className="text-small" style={{ color: '#9ab' }}>{this.props.user?.info?.fullname}</p> */}
//                         </div>
//                         <div className="mt-4">
//                             <DataGrid isLoading={this.state.isLoadingData} data={this.state.data} component={FinancialBox} col="col-12 col-md-6 col-lg-4" marginBottom={'mb-3'} />

//                             <Pagination currentPage={this.state.currentPage} totalCount={this.state.totalCount} limit={this.state.limit} changePage={this.changePage} />

//                         </div>
//                     </div>
//                 </div>
//             </Configurer>
//         )
//     }
// }


// export default Financial