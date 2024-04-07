import React from 'react'
import { getBoundingClientRect } from '../utils/functions'

class FixedView extends React.Component {

    state = {
        top: 0,
        left: 0,
        right: 0,
        opacity: 0
    }



    componentWillUnmount() {
        this.hideView()

    }

    showView = (cb) => {
        this.getBounding(()=>{
            this.getBounding()
        })

        this.interval = setInterval(() => {
            this.getBounding()

        }, 400);
        setTimeout(() => {
            window.addEventListener('mouseup', this.checkHide)
        }, 1000);
    }


    checkHide = (e) => {
        if (e && this.view && !this.view.contains(e.target)) {
            this.hideView()
        }

    }



    hideView = () => {
        console.log("hideView")
        clearInterval(this.interval)
        window.removeEventListener('mouseup', this.hideView)
        this.setState({ opacity: 0 }, () => {
            // setTimeout(() => {
            this.setState({ isOpen: false })
            // }, 500);
        })
    }

    getBounding = (cb) => {
        // console.log(this.view)
        // console.log(this.props.nodeRef)
        let needFix = false
        if (this.props.nodeRef && this.view) {
            // let element = document.getElementById('testid')

            let rect = getBoundingClientRect(this.props.nodeRef)
            this.view.style.top = rect.top + 'px'

            let left = rect.left

            // if(this.props.settings?.right){
            // this.view.style.right = rect.left-rect.width + 'px'
            // this.view.style.left = 'auto'
            // }else{
            // console.log(left)
            // console.log(window.innerWidth)

            let viewRect = getBoundingClientRect(this.view)

            // console.log(document.body.clientWidth)
            // console.log(viewRect.width + rect.left)
            // console.log(window.innerWidth)
            // console.log('//////////')
            // console.log(window.innerWidth)
            // console.log(left)
            // console.log(viewRect.width)
            // console.log(rect.left)

            if ((viewRect.width + rect.left) >= document.body.clientWidth) {

               
                needFix = true
                left = left - (viewRect.width + rect.left - document.body.clientWidth) - 20
            }


            // left = 0

            // console.log(viewRect)
            // console.log(left) 

            this.view.style.left = left + 'px'

             viewRect = getBoundingClientRect(this.view)
            if(viewRect.left != left){
                left = left + (left-viewRect.left) 
                this.view.style.left = left + 'px'
            }
            // }

            if (!this.state.isOpen) {
                this.setState({ isOpen: true }, () => {
                    this.setState({ opacity: 1 })
                    if(cb){
                        cb()
                    }
                })
            }
            // if(needFix){
            //     console.log("NEED FIX")
            //     this.getBounding()
            // }

        }
    }


    render() {
        return (
            <div ref={el => this.view = el} className="" style={{ position: 'fixed', transform:'translate3d(0, 0, 0)',WebkitTransform:'translate3d(0, 0, 0)', pointerEvents: 'none', transition: 'opacity 0.5s', opacity: this.state.opacity,  zIndex: this.props.zIndex ?? 0 }}>
                {this.state.isOpen && (
                    <>
                        {this.props.showFocus && (
                            <div onClick={() => this.hideView()} style={{ pointerEvents: 'all', backgroundColor: '#00051050', height: '100%', width: '100%', top: 0, left: 0, position: 'fixed' }}>
                            </div>
                        )}

                        <div style={{ pointerEvents: 'all' }}>

                            {this.props.children}
                        </div>


                    </>
                )}
            </div>
        )
    }
}

export default FixedView;