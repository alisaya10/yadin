import React from "react";
import { Placeholder } from "react-bootstrap";
import Modal from '../Modal1'
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { imageAddress, msToHMS, priceStandardView, translate } from "../../utils/useful";
import PriceInput from "../inputs/PriceInput";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';
import Loader from "react-loader-spinner";
import HttpServices from "../../utils/Http.services";


class PeymentModal extends React.Component {

  state = {
    courseInfo: {
      image: "/images/coursepic.png",
      title: "یادین تیم‌سازی",
      categories: "مدیریت",
      description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
      rate: "4.5",
      price: "100,000 تومان",
      snacks: "10 اسنک",
      duration: "4 ساعت",
      practiceTime: "2 ساعت",
      level: "مقدماتی",
      teacher: {
        name: "ایمان سرایی",
        image: "/images/icons/profilepic.png",
        rate: "4.6",
        review: "(25نظر)",
        courses: "5 یادین",
        description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد... ",
      },
    },
    isLoadingPost: false,
    defultAmount: 0,
    voucherInput: false,
    voucherValid: false,
    final:false,
  };
  componentDidMount() {
    // this.changeInputValue()
    let amount = (this.props.data?.price) - (this.props.user?.wallet ?? 0)
    this.setState({ defultAmount: amount })
  }

  requestIncreaseBalance = () => {

    let price
    if (this.state.final) {
      price = this.state.final
    }
    else {
      price = this.props.data?.price
    }

    console.log(price);

    // if (this.state.defultAmount && this.state.defultAmount >= 0 && this.state.defultAmount != null) {
    //   this.setState({ isLoadingPost: true })
    //   console.log("requestIncreaseBalance")
    //   console.log(this.state.amount)

    HttpServices.request("requestIncreaseBalance", { amount: price, course: this.props.data._id }, (fetchResult, fetchError) => {

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
        // this.setState({ amount: '' })
        // console.log('amount', this.state.amount);
        // console.log('info', fetchResult.info);

        window.location = fetchResult.info
      }

    })
    // } else {
    // }
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






  changeInputValue = (key, value) => {
    // let value = (target.validity.valid) ? target.value : null
    // if (value !== null) {
    console.log(value)
    this.setState({ defultAmount: Number(value) })
    // }
  }
  ratingChanged = (newRating) => {
    console.log(newRating);
  };

  validateVoucher = () => {

    let voucher = this.state.voucher

    this.setState({ isLoadingVoucher: true })

    // console.log(voucher)
    HttpServices.request('validateVouchers', { voucher }, (data, fetchError) => {
      if (fetchError) {
        this.setState({ voucherError: fetchError.message, isLoadingVoucher: false, final: false })
        return
      }

      if (data.info) {
        let final = this.props.data?.price
        let voucher = 1 - (data.info.amount * 0.01)
        final = Math.round(final * voucher)
        this.setState({
          isLoadingVoucher: false,
          voucherData: data.info,
          voucherValid: data.info.amount,
          voucherError: false,
          final
        })
      }




    })
  }


  render() {
    let courseInfo = this.state.courseInfo;
    return (

      <Modal maxWidth="900px" ref={el => this.modal = el}>
        <div className="w-100 radius-2 box" >
          <div className="pt-5 pb-2 main-color-1 flexcc text-ultra-big border-bottom-gray pb-4">
            خرید یادین
          </div>
          <div className="row m-0 px-5 pt-5">
            <div className="col-12 col-md-4 p-0 pl-4">
              <img className="radius-1 w-100 h-100" src={imageAddress(this.props.data?.image, null, 'thumb')} style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-12 col-md-8 p-0">
              <div className="pt-5 pt-md-0">
                <div className="flexcb">
                  <div className="text-color-1 pb-4">
                    <p className="text-big">{this.props.data?.title} </p>
                  </div>
                  {/* <div className="main-color-1 pb-4">
                    <p className="text-semibig">{this.props.data?.price} </p>
                  </div> */}
                </div>
                <div className="text-color-2">
                  <p>{this.props.data?.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-0  px-5 border-bottom-gray pb-4">
            <div className="flexc col-12 col-sm-6 pt-4" >
              <img className="pl-2" src="/images/icons/play-cricle.svg" />
              <p className="text-color-2">{this.props.item?.length}</p>
            </div>

            <div className="flexc col-12 col-sm-6 pt-4 ">
              <img className="pl-2" src="/images/icons/video-play.svg" />
              <p className="text-color-2">مجموع‌اسنک‌ها: </p>
              <p className="text-color-2 pr-1">{msToHMS(this.props?.duration ?? 0)}</p>
            </div>

            <div className="flexc col-12 col-sm-6 pt-4" >
              <img className="pl-2" src="/images/icons/timer2.svg" />
              <p className="text-color-2">زمان‌انجام تمارین :</p>
              <p className="text-color-2 pr-1">{this.props?.totalPracticeDuration}</p>
            </div>

            <div className="flexc col-12 col-sm-6 pt-4" >
              <img className="pl-2" src="/images/icons/cup.svg" />
              <p className="text-color-2">سطح یادین :</p>
              <p className="text-color-2 pr-1">{translate(this.props.data?.level)}</p>
            </div>
          </div>



          <div className="row flexcb px-5 my-4 justify-content-center">
            <div className="col-6 col-sm-2 main-color-1 pb-4">
              <p className="text-semibig" style={{ textDecorationLine: (this.state.final ? 'line-through' : '') }}> {priceStandardView(this.props.data?.price)} تومان  </p>
              {this.state.final &&
                <p className="text-semibig" style={{ fontWeight:'bold' }}> {priceStandardView(this.state.final)} تومان  </p>
              }
            </div>

            {this.state.voucherInput ?

              <div className="col-12 col-sm-6 text-left h-100 " style={{}}>
                <div className=" w-100 h-100" >
                  <div className=' d-flex justify-content-between h-100' >
                    <div className=' d-flex justify-content-between h-100' >
                      <button className="btn-primary px-2 mb-4" onClick={() => this.validateVoucher()} style={{
                        outline: 'none', borderLeft: 'none', borderRadius: '0px 10px 10px 0px', fontSize: 14, textTransform: 'uppercase', fontWeight: 'bold', color: '#fff', maxWidth: 80
                      }}>

                        {this.state.isLoadingVoucher ? (
                          <Loader
                            type="Oval"
                            color="#fff"
                            height="16"
                            width="16"
                          />
                        ) : (
                          <p style={{ textAlign: 'center' }}>
                            اعمال کد
                          </p>

                        )}
                      </button>

                      <div className="" style={{ display: 'flex', flexDirection: "column", justifyContent: "flex-start", alignItems: 'baseline', height: '42px' }}>
                        <input onChange={e => this.setState({ voucher: e.target.value })} className='px-1 w-100 h-100 changePHColor' placeholder="کد تخفیف" style={{ border: '1px solid #C97EF5', outline: 'none', textTransform: 'uppercase' }} />

                      </div>
                      <div className="voucherBox flexcb">
                        {this.state.voucherError ?
                          <p className="mt-2 mx-1" style={{ color: '#ee5050', fontSize: 12, textAlign: 'center' }}>{this.state.voucherError}</p>
                          : this.state.voucherValid ?
                            <p className="mx-1 px-2" style={{ color: '#247514', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>%{this.state.voucherValid}</p>
                            :
                            <img
                              className="px-2"
                              style={{ width: '45px' }}
                              src='/images/voucher.png'
                            />

                        }
                      </div>



                    </div>

                  </div>
                </div>
              </div>
              :
              <button onClick={() => this.setState({ voucherInput: true })} className="col-12 col-sm-6 btn-primary px-2 mb-4" style={{ maxWidth: 200 }} >
                <p className="text-semibig nowrap">کد تخفیف</p>
              </button>

            }

            <button onClick={() => this.requestIncreaseBalance()} className="col-12 col-sm-4 btn-primary px-4 mb-4" style={{ maxWidth: 250 }} >
              <p className="text-semibig nowrap">پرداخت</p>
            </button>
          </div>



          {/* {
            ((this.props?.user?.wallet ?? 0) >= (this.props.data?.price)) && (
              <>
                <div className="flexcc pt-2">
                  <p className="text-color-1 pl-5 text-semibig">موجودی حساب</p>
                  <p className="main-color-1 text-semibig"> {this.props.user?.wallet ?? 0} تومان </p>
                </div>
                <div className="flexcc pt-3 pb-4">
                  <p className="green-color">موجودی حساب شما کافی می‌باشد.</p>
                </div>
                <div className="flexcc pb-5">
                  <div className="pt-2 px-2">
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

                      <button onClick={() => this.requestIncreaseBalance()} className="btn-primary px-4" >
                        <p className="text-semibig nowrap">پرداخت</p>
                      </button>
                    )}

                    {this.props.user?.info?.wallet < 0 && (
                      <div>
                        <p className="mt-2 text-small" style={{ color: '#ee5050' }}>You need to increase you balance as much to compensate the negative credit, or</p>
                        <button onClick={() => this.ignoreData()} className="mt-2" style={{ backgroundColor: '#ee5050', borderRadius: 4, color: '#fff', padding: '4px 15px' }}>Ignore negative credit, and lose data</button>
                      </div>
                    )}
                  </div>
                </div>
              </>

            )
          } */}

          {/* {
            ((this.props?.user?.wallet ?? 0) < (this.props.data?.price)) && (
              <>
                <div className="flexcc pt-2">
                  <p className="text-color-1 pl-5 text-semibig">موجودی حساب</p>
                  <p className="main-color-1 text-semibig"> {this.props.user?.wallet ?? 0} تومان </p>
                </div>
                <div className="flexcc pt-3 pb-4">
                  <p className="red-color">موجودی حساب شما کافی نمی‌باشد.</p>
                </div>
                <div className="price-box ">
                  <PriceInput data={this.state.defultAmount} changeValue={this.changeInputValue} header={{ key: 'price', information: {} }} />
                </div>
                <div className="flexcc pb-5">
                  <div className="pt-2 px-2">
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

                      <button onClick={() => this.requestIncreaseBalance()} className="btn-primary px-4" >
                        <p className="text-semibig nowrap">افزایش موجودی</p>
                      </button>
                    )}

                    {this.props.user?.info?.wallet < 0 && (
                      <div>
                        <p className="mt-2 text-small" style={{ color: '#ee5050' }}>You need to increase you balance as much to compensate the negative credit, or</p>
                        <button onClick={() => this.ignoreData()} className="mt-2" style={{ backgroundColor: '#ee5050', borderRadius: 4, color: '#fff', padding: '4px 15px' }}>Ignore negative credit, and lose data</button>
                      </div>
                    )}
                  </div>
                </div>

              </>
            )
          } */}
        </div>
      </Modal>
    );

  }
}

const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(PeymentModal);