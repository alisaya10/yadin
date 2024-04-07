import React, { Component } from 'react'
// import Header from './NewHeader';
import Header from './HeaderMain';
import Footer from './footer';
import NotifManager from './NotifManager';
import FloatMessenger from './FloatMessenger';
import { i18n } from '../next.config';
import i18next from 'i18next';



class Layout extends Component {

    state = {
        isOnTop: true,
        width: {},
        data: [],
        categories: [],
        announcements: [],
        showAnnoucement: true,

    }



    componentDidMount() {

        let windowWidth = window.innerWidth;

        window.addEventListener('scroll', () => this.changeColor());




        this.setState({
            width: windowWidth,
            showAnnoucement: true,
            announcements: this.props.data,
            categories: this.props.categoriesRes,
            isOnTop: true,
            lng: i18next.language

        })


    }

    changeColor() {
        if (window.scrollY >= 50) {
            this.setState({ isOnTop: false })

        } else {
            this.setState({ isOnTop: true })
        }
    }

    setGotIt() {
        this.setState({ showAnnoucement: false })
    }

    render() {
        return (
            <div className='yadin-theme default-theme rtl'>

                <NotifManager>

                    <Header ref="header" lng={this.state.lng} passData={this.props.data} {...this.props} isOnTop={this.state.isOnTop} parent={this} />
                    <div style={{minHeight:"100vh"}}>
                        {this.props.children}
                    </div>
                    <Footer />


                    {/* <FloatMessenger /> */}

                </NotifManager>

            </div>
        )
    }
}


export default Layout;
