import React from 'react'
import { imageAddress, priceStandardView, translate } from '../../utils/useful'
import moment from 'jalali-moment'

class FinancialBox extends React.Component {

    state = {
        open: false
    }


    chooseColor(ref) {
        if (ref) {
            let key = ref
            switch (key) {
                case 'income':
                    return '#008062'
                case 'charge':
                    return '#0076CA'
                default:
                    break;
            }
        } else {
            return '#008062'
        }
    }

    render() {

        return (
            <div className="w-100 service-box h-100 d-flex flex-column px-2" style={{ borderRadius: 8 }}>
                {/* <div className="w-100 cover-img-container m-0 p-0 flexcc">
                    <div className="m-0 p-0 w-100 h-100 flexcc" >
                        <img className="cover-img m-0 p-0" src={imageAddress(this.props.data?.images)} alt="" />
                    </div>
                </div> */}



                <div className="mx-3 pt-3  pb-3 service-box-content" style={{ flex: 1 }}>
                    <div className="flexcb">
                        <div className="flexc">
                            <p className="font-bold text-big m-0">{priceStandardView(this.props.data?.amount)}</p>

                            <div className="flexc">
                                <div className="mld-2" style={{ backgroundColor: this.chooseColor(this.props.data?.type) + '20', borderRadius: 20, padding: '5px 14px' }}>
                                    <p className="  text-bold text-capitalize" style={{ fontSize: 11, color: this.chooseColor(this.props.data?.type) }}>{this.props.data?.type ?? 'Payment'}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {this.props.data?.description ? (
                        <div ><p className="mt-1 " style={{ fontSize: 13 }}>{this.props.data?.description}</p></div>
                    ) : (
                        <div ><p className="mt-1 " style={{ fontSize: 13 }}>Your payment to the platform</p></div>
                    )}
                    <p className=" mt-1" style={{ color: '#789', fontSize: 12 }}>{moment(this.props.data?.cDate).format('YYYY/MM/DD HH:mm')}</p>






                </div>



            </div>
        )
    }
}

export default FinancialBox
