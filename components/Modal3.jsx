import React from "react";


class Modal3 extends React.Component {

  state = {
    opacity: 1,
    showModal: false,
    maxWidth: 600
  }

  hideModal = (cb) => {
    document.body.classList.remove("body-no-sroll")
    window.removeEventListener("keydown", this.keyPress)
    if (this.state.showModal) {
      this.setState({ closing: true })

      if (this.props.onHide) {
        this.props.onHide()
      }

      setTimeout(() => {
        this.setState({ showModal: false }, () => {
          if (cb) {
            cb()
          }

        })
      }, 500);
    }
  }

  showModal = (cb) => {
    window.addEventListener("keydown", this.keyPress)
    this.setState({ showModal: true, closing: false })
    setTimeout(() => {
      document.body.classList.add("body-no-sroll")
    }, 50);
    if (cb) {
      cb()
    }
  }

  keyPress = (e) => {
    if (e?.keyCode == 27) {
      this.hideModal()
    }
  }

  componentDidMount() {
    if (this.props.maxWidth) {
      this.setState({ maxWidth: this.props.maxWidth })
    }
  }


  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyPress)
    if (this.state.showModal) {
      document.body.classList.remove("body-no-sroll")
    }

  }

  onScroll = () => {
    if (this.props.onScroll) {
      this.props.onScroll()
    }
  }


  render() {
    if (this.state.showModal) {
      return (
        <div className={'modal ' + (this.state.closing ? 'closing' : '')} onClick={() => this.hideModal()}>

          <div onScroll={() => this.onScroll()} className="modalContent" style={{ paddingBottom: 100 }} onClick={() => this.hideModal()}>
            <div className="w-100" style={{ maxWidth: this.state.maxWidth, marginTop: '5%', borderTopLeftRadius: 8 }} onClick={(e) => e.stopPropagation()}>
              {this.props.children}

              {/* <button className="flexcc blur-back" style={{ position: 'absolute', top: 115, left: 780, zIndex: 20, backgroundColor: '#ccc', borderRadius: 30, width: 30, height: 30, opacity: 0.3 }} onClick={() => { this.hideModal() }}>
                <img src="/images/close.svg" style={{ width: 14, height: 14, filter: 'invert(100%)' }} />
              </button> */}

              <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 20 }}>
                <button onClick={() => { this.hideModal() }}>
                  <img src="/images/icons/close-circle.svg" style={{ width: 35 }} />
                </button>
              </div>
            </div>
          </div>

        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}





const contentStyle = {


  // padding: 30
  // box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  // -webkit-animation-name: animatetop;
  // -webkit-animation-duration: 0.4s;
  // animation-name: animatetop;
  // animation-duration: 0.4s
}

export default Modal3;
