import '../styles/globals.css';
import '../styles/header.module.css';
import '../styles/imagecard.css';
import '../styles/recently.css';
import '../styles/smallcard.css';
import '../styles/recentlyupdate.css';
import '../styles/banner.css';
import '../styles/description.css';
import '../styles/sectiondiv.css';
import '../styles/doclist.css';
import '../styles/contentside.css';
import '../styles/community.css';
import '../styles/navbarsecond.css';
import '../styles/ads.css';
import '../styles/videocontent.css';
import '../styles/navsecdiscription.css';
import '../styles/notif.css';
import '../styles/forums.css';
import '../styles/question.css';
import '../styles/scss/redux.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/headermain.css';
import '../styles/samplefirst.css';
import '../styles/samplesecond.css';
import '../styles/scss/discussion.css';
import '../styles/card.css';
import '../styles/App.css';
import '../styles/modal1.css';
import '../styles/form.css';
import '../styles/productpage.css';
import '../styles/products.css';
import '../styles/shop.css';
import '../styles/ticketing.css';
import '../styles/contactus.css';
import '../styles/controler.css';
import '../styles/controller.css';
import '../styles/dragdrop.css';
import '../styles/platform.css';
import '../styles/blog.css';
import '../styles/FAQ.css';
import '../styles/contactsales.css';
import '../styles/usecase.css';
import '../styles/usfeul.scss';

import '../styles/views.scss';
import '../styles/grid.css';
import '../styles/other.scss';
import '../styles/modals.scss';
import '../styles/theme.scss';
import '../styles/notifs.scss';
import '../styles/ckeditor.scss'
import '../styles/messenger.scss'
import 'swiper/scss';
// import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


import '../node_modules/leaflet-geosearch/dist/geosearch.css';
import '../node_modules/react-leaflet-markercluster/dist/styles.min.css';

import "../styles/yadin-theme.scss"
import i18n from 'i18next';
import App from "next/app";
import store from '../stores/storeConfig'
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { siteConfig } from '../variables/config'
import { changeUrlWithLng, getToken, getUserInfo, pathMaker } from '../utils/useful'
import * as actions from '../stores/actionsList';
import Layout from '../components/Layout';
import socketServices from '../utils/socket.services';
import Script from 'next/script';
import Head from 'next/head';

// import 'rsuite/dist/rsuite.min.css';


class MyApp extends App {

  componentDidMount() {

    this.checkUser()

    i18n.on('languageChanged', (lng) => {
      this.setState({ showPage: false })

      if (!lng) {
        lng = 'fa'
      }

      if (siteConfig.languages.indexOf(lng) == -1) {
        return
      }


      if (siteConfig.forceUrl) {
        changeUrlWithLng(lng)
      }
      // console.log(lng)

      store.dispatch(actions.changeLanguage('language', lng))
      // this.props.actions.changeLanguage('language', lng)
      this.setState({ showPage: true })

    })
  }


  checkUser = (dontShowNotif) => {
    setTimeout(() => {
      let user = store.getState("user")
      // console.log(store.getState("user"))
      // console.log("CHECK USER")
      console.log(this.props.user?.loggedin)
      // if (user?.loggedin) {
      console.log(getToken())
      if (getToken()) {
        getUserInfo((data, err, status) => {
          // console.log(data)
          // console.log(status)

          if (status === 401) {
            store.dispatch(actions.logoutUser())
          }
          if (status === 200 && data) {
            // console.log("DFF")
            if (data.authorized) {
              socketServices.initSocket()
              // console.log(data.user)
              store.dispatch(actions.setUser(data.user, null, true))
            } else {
              store.dispatch(actions.logoutUser())
            }
          }

          if (err) {
            if (!dontShowNotif) {
              store.dispatch(actions.addNotif({ type: 'error', title: '{{lang}}errors.cantConnectToServer', description: '{{lang}}errors.checkYourInternetConnection' }))
            }
            store.dispatch(actions.setUser({}, null, true))
            setTimeout(() => {
              this.checkUser(true)
            }, 10000);
          }

        })
      } else {
        store.dispatch(actions.logoutUser())
      }
      // }
    }, 100);
  }



  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};



    console.log(pageProps)
    return { pageProps: pageProps };
  }



  render() {

    const { Component, pageProps } = this.props;


    return (
      <Provider store={store}>

        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        /> */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" /> */}

        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link href="http://fonts.cdnfonts.com/css/sofia-pro" rel="stylesheet"></link> */}
      </Provider>

    );
  }
}


const makeStore = () => store;


export default withRedux(makeStore)(MyApp);