import React from "react";
import { Link } from "react-router-dom";
import Configurer from "../Configurer";
import HttpServices from "../../utils/Http.services";
import { priceStandardView, translate } from "../../utils/useful";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import moment from 'jalali-moment';

class ProfFinancial extends React.Component {

  state = {
    financial: [
      {
        price: "30,000,000",
        date: "1401/05/05",
        code: "2345676543"
      },
      {
        price: "30,000,000",
        date: "1401/05/05",
        code: "2345676543"
      },
    ]
  }
  componentDidMount() {
    console.log('-----------------', this.props.user)
    this.getMyFinantials()
  }
  getMyFinantials() {
    let totalIncome = 0
    // console.log(this.state.id)
    HttpServices.request('getMyFinantials', {}, (fetchResult, fetchError) => {

      console.log('==================', fetchResult)
      
      if (fetchError) {
        return
      }
      console.info(fetchResult)
      this.setState({
        financials: fetchResult?.info
      }, () => {
        console.log('===============ppppppppppppp===',  this.state.financials)
        for (let i = 0; i < this.state.financials?.length; i++) {
          const element = this.state.financials[i];
          totalIncome = element.amount + totalIncome

        }
        console.log('totalincom',totalIncome);
        this.setState({totalIncome})
      })
      // , () => {
      //     console.log("alert")
      //     this.setState({ isLoading: true })
      //   })
    })


  }
  // this.props.user.info.status 
  render() {
    console.log('this.props.user?.info', this.props.user?.info);
    let totalIncomes = 0
    if(this.props.user?.info?.credit != null){
       totalIncomes = ((this.state?.totalIncome) +  (this.props.user?.info?.credit ))

    }

    return (
      <div className="container">

        <div className="box p-3 mt-4">
          <div className="row m-0 flexc">
            <div className="col-12 col-md-6 col-xl-4 text-center pb-4 pb-xl-0 flexc">
              <div className="row m-0 w-100">
                <div className="col-12 col-lg-6 flexc">
                  <img className="pl-2" src="/images/icons/card-2.svg" />
                  <p className="text-color-1 text-semibig">درآمد کلی</p>
                </div>
                <div className="col-12 col-lg-6">
                  {console.log('ppppppppppp',this.state?.totalIncome)}
                  <p className="text-start text-color-1 text-semibig">{ priceStandardView(totalIncomes) ?? 0 } تومان</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3 text-center pb-4 pb-xl-0 flexc">
              <div className="row m-0 w-100">
                <div className="col-12 col-lg-6 flexc">
                  <img className="pl-2" src="/images/icons/card-tick.svg" />
                  <p className="text-color-2 nowrap">وصول شده</p>
                </div>
                <div className="col-12 col-lg-6">
                  <p className="text-start text-color-2">{ priceStandardView(this.state?.totalIncome) ?? 0} تومان</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3 text-center pb-4 pb-xl-0 flexc">
              <div className="row m-0 w-100">
                <div className="col-12 col-lg-6 flexc">
                  <img className="pl-2" src="/images/icons/card-tick.svg" />
                  <p className="text-color-2">طلبکار</p>
                </div>
                <div className="col-12 col-lg-6">
                  <p className="text-start text-color-2">{ priceStandardView(this.props.user?.info?.credit) ?? 0 } تومان</p>
                </div>
              </div>
            </div>

            {/* <div className="col-12 col-md-6 col-xl-2 text-center pb-4 pb-xl-0">
              <button className="btn-primary5" style={{ maxWidth: "200px" }}>
                <a className="text-normal">دریافت طلب</a>
              </button>
            </div> */}
          </div>
        </div>


        <div className="row m-0 flexc py-4 px-2">
          <div className="col-12 col-lg-6 flexc">
            <div>
              <p className="text-color-1 text-semibig">دریافت ها</p>
            </div>
            {/* <div className="d-none d-sm-block">
              <p className="text-color-1 px-4">جدیدترین</p>
            </div>

            <div className="d-none d-sm-block">
              <p className="text-color-2">قدیمی ترین</p>
            </div>
          </div>

          <div className="col-lg-6 d-none d-lg-flex flexc justify-content-end">
            <div className="pl-3">
              <p className="text-color-1">مرتب سازی براساس: </p>
            </div> */}

            {/* <button className="btn-primary6 flexcb" style={{ maxWidth: "250px" }}>
              <p>تاریخ پرداخت</p>
              <img src="/images/icons/arrow-down.svg" />
            </button> */}
          </div>
        </div>


        <div className="box">
          {this.state.financial && (

            <div className="p-3">
              <div className="row m-0 border-bottom-gray pb-3">
                <div className="col-6 col-sm-4 text-start">
                  <p className="text-color-1 text-semibig">مبلغ</p>
                </div>

                <div className="col-6 col-sm-4 text-start">
                  <p className="text-color-1 text-semibig text-center">تاریخ دریافت</p>
                </div>

                <div className="col-sm-4 text-start d-none d-sm-block">
                  <p className="text-color-1 text-semibig text-end">کد پیگیری</p>
                </div>
              </div>
              {Array.isArray(this.state?.financials) && this.state.financials?.map((item, index) => {
                return (
                  <div className="row m-0 py-3 flexc">
                    <div className="col-6 col-sm-4 text-start">
                      <p className="text-color-1">{ priceStandardView(item?.amount)+ ' ' + 'تومان'} </p>
                    </div>

                    <div className="col-6 col-sm-4 text-start">
                  
                      <p className="text-color-1 text-center">  {moment(item.payDate).locale('fa').format(" jYYYY jMMM, jDD")}</p>
                    </div>

                    <div className="col-sm-4 text-start d-none d-sm-block">
                      <p className="text-color-1 text-end">{item?.id}</p>
                    </div>

                  </div>
                )
              })}
            </div>
          )
          }
          {(!this.state.financials || this.state.financials == [] || this.state.financials == null || this.state.financials.length == 0)  && (
            <div>
              <p className="text-color-2 flexcc py-4">گزارش مالی برای نمایش وجود ندارد.</p>
            </div>
          )}
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(ProfFinancial);
