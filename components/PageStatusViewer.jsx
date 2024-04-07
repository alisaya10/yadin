import Router, { withRouter } from 'next/router';
import React from 'react'
import Loader from 'react-loader-spinner'
import { pathMaker } from '../utils/useful';

class PageStatusViewer extends React.Component {



    state = {
        timer: 4,
    }

    startTimer() {
        if (!this.timer) {
            this.timer = setInterval(this.checkTimer, 1000);
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    checkTimer = () => {
        if (this.state.timer > 0) {
            this.setState({ timer: this.state.timer - 1 })
        } else {
            let query = this.props.query;
            // let params = new URLSearchParams(search);
            let ref = query?.ref //params.get('ref');
            if (ref && ref !== '') {
                // console.log(ref)
                if (this.timer) {
                    clearInterval(this.timer)
                }
                Router.push({ pathname: ref })

                // this.props.history.push(ref)
            } else {
                if (this.timer) {
                    clearInterval(this.timer)
                }
                Router.push({ pathname: '/' })

                // this.props.history.push(pathMaker('/'))
            }
        }
    }


    render() {
        if (!this.props.status) {

            return (
                <div className="mt-5 text-center w-100">
                    <Loader
                        type={this.props.type ?? "Oval"}
                        color={this.props.color ?? "#202020"}
                        height={this.props.width ?? 50}
                        width={this.props.height ?? 50}
                    />
                </div>
            )
        }

        if (this.props.status == 200) {
            return this.props.children

        }

        if (this.props.status == 500) {
            return (
                <div className="text-center pt-5 text-color-1">
                    <p className="text-bold text-big mb-0">500</p>
                    <p className="text-uppercase mt-0">Server Error</p>
                </div>
            )

        }


        if (this.props.status == 401) {
            this.startTimer()
            return (

                <div className="w-100 text-center flexcc flex-column min-full-height text-color-1">
                    <h3 className=" text-ultra-big" style={{ margin: '-150px 0px 0px 0px' }}>You are not allowd</h3>
                    <h3 className=" text-big m-0">to access this page</h3>
                    <h3 className=" text-mega-big m-0">401</h3>
                </div>
            )
        }


        if (this.props.status == 404) {
            return (
                <div className="w-100 mt-5 text-center text-color-1">
                    <h3 className=" text-ultra-big m-0">Page Not Found</h3>
                    <h3 className=" text-mega-big m-0">404</h3>
                </div>
            )
        }

    }
}

export default withRouter(PageStatusViewer);