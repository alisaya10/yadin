import React from 'react'
import { translate } from '../../utils/useful'
import { siteConfig } from '../../variables/config'
import Router, { withRouter } from 'next/router'
import { pathMaker, imageAddress } from '../../utils/useful'
import { siteTheme } from '../../variables/config'

class LoginWelcomeStep extends React.Component {

  state = {
    timer: 2,
  }

  componentDidMount() {
    this.timer = setInterval(this.checkTimer, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
  }

  checkTimer = () => {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer - 1 })
    } else {
console.log('----------==============', Router.query?.ref);
      let ref = Router.query?.ref
      // console.log(this.props.location)
      // let search = this.props.location.search;
      // let params = new URLSearchParams(search);
      // let ref = params.get('ref');
      // console.log(ref)

      if (ref && ref !== '') {
        // console.log(ref)
        Router.push(ref)
      } else {

        Router.push(pathMaker('/'))
        // if (this.props.location?.state?.from) {
        //     this.props.history.push(this.props.location?.state?.from.pathname)
        // } else {
        //     this.props.history.push(pathMaker('/'))
        // }
      }
    }
  }

  render() {
    return (

      <div className="flexcc flex-column px-4">
        <div className="w-100 mt-2" style={{ maxWidth: 400 }}>
          <div className="p-4 mt-3 text-center">

            <img src={imageAddress(this.props.initData?.image, 'profile')} style={{ borderRadius: 8 }} width="100px" alt="profile" />
            <h2 className="mt-2 mb-0 white" style={{ fontSize: 27 }}>{this.props.initData?.fullname}</h2>
            <p className="mb-2 mt-2 text-color-1 pb-4" style={{ fontSize: 30 }}>به یادین خوش آمدید.</p>
            <p className="mb-4 mt-0 text-color-1" style={{ fontSize: 15 }}>{translate('messages.youAreLoggedin')}</p>
            <p className='text-color-1' style={{ fontSize: 13, opacity: 0.5, marginTop: 0 }}>{translate('messages.wouldRedirect', { timer: this.state.timer })}</p>

          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(LoginWelcomeStep);