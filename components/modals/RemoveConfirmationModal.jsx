import React from "react";
import Modal from '../Modal1'


class RemoveConfirmationModal extends React.Component {
    state = {
    }

    componentDidMount() {
    }




    render() {
        return (

            <Modal ref={el => this.modal = el} maxWidth={300}>
                <div className="w-100  text-center" style={{ backgroundColor: '#ffffffee', borderRadius: 8 }}>
                    <div className="w-100" style={{ zIndex: 1, padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, borderBottom: '0px #eee solid', backgroundColor: '#f2f6f8ee', background: 'linear-gradient(to right,#dd3030dd,#ee5050dd)', backdropFilter: 'blur(10px) saturate(180%)', WebkitBackdropFilter: 'blur(10px) saturate(180%)', borderRadius: '8px 8px 0px 0px' }}>

                        <div className="text-start"  >
                            {/* <p className="text-smallest mt-2 opacity-5" style={{ lineHeight: 0.5 }}>WHAT TO DO?</p> */}
                            <p className="white">{this.props.title ?? 'Remove'}</p>

                        </div>

                        <div className="cursor-pointer" onClick={() => this.modal.hideModal()} style={{ width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img className="invert" style={{ width: 14, height: 14 }} src="/images/close.svg" alt="" />
                        </div>

                    </div>
                    <div className="py-2 px-2">

                        <p className="text-small pb-3 pt-2 text-start px-2" style={{ borderBottom: '1px solid #eee' }}>{this.props.description ?? 'Are you sure you want to remove?'}</p>


                        <button onClick={() => { if (this.props.confirmed) this.props.confirmed() }} className="py-2 w-100 flexc" style={{ borderBottom: '1px solid #eee' }}>
                            <img className="mrd-3" src="/images/remove-g.svg" width="24px" />
                            <p className="text-normal">{this.props.option ?? 'Remove'}</p>
                        </button>


                        <button onClick={() => this.modal.hideModal()} className="py-2 w-100 flexc" style={{ borderBottom: '0px solid #eee' }}>
                            <img className="mrd-3" src="/images/cancel-g.svg" width="24px" />
                            <p className="text-normal">Cancel</p>
                        </button>


                    </div>
                </div>
            </Modal>
        );

    }
}


export default RemoveConfirmationModal;
