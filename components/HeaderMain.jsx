import React, { useState, useEffect, useRef } from "react";
import Router, { useRouter, withRouter } from "next/router";
import Link from "next/link";
import MegaMenuList from "./Megamenu/index";
import Collapsible from "react-collapsible";
import HttpServices from "../utils/Http.services";
import useSWR from "swr";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../stores/actionsList";
import {
  checkTranslation,
  imageAddress,
  priceStandardView,
  translate,
} from "../utils/useful";
import $ from "jquery";
import FixedView from "./FixedView";
import index from "../pages/developers/doc/[slug]";
import Modal from "./Modal1";

// import { SearchControl } from "leaflet-geosearch";

const fetcher = async (lng) => {
  if (!lng) {
    lng = "en";
  }
  const json = await (
    await HttpServices.syncRequest("getContents", { page: "Usecases", lng })
  ).result;
  // console.log(json.info)
  console.log("FETCHER DONE");
  console.log(json.info);
  const data = json.info;

  // changeLocation()
  return data;
};

// export const getStaticProps = async ({ locale }) => {
//     console.log("locale")
//     console.log(locale)

//     return {
//       props: { locale },
//     };
//   };

// export async function getServerSideProps({ context }) {

// console.log(context)
// }

// let profilePages = [
//     { name: '{{lang}}Profile', icon: '/images/man.svg', key: '', dontShowInDashboard: true },
//     { name: '{{lang}}Edit Profile', icon: '/images/edit-profile.svg', key: 'edit' },
//     // { name: 'Financial', icon: '/images/benefit.svg', key: 'financial' },

//     // { name: 'Wallet', icon: '/images/wallet.svg', key: 'wallet' },

//     { name: '{{lang}}Orders', icon: '/images/package.png', key: 'orders' },
//     { name: '{{lang}}Addresses', icon: '/images/placeholder.svg', key: 'addresses' },

//     // { name: 'Account type', icon: 'https://www.flaticon.com/svg/static/icons/svg/744/744922.svg', key: 'type' },
//     { name: '{{lang}}Change Password', icon: '/images/password.svg', key: 'password' },

// ]


const testData = [
  {
    title: "{{lang}}Academy",
    link: "/academy",
  },

  {
    title: "{{lang}}Forums",
    link: "/forums",
  },

  {
    title: "{{lang}}Developers",
    link: "/developers",
  },
];

const companyData = [
  {
    title: "{{lang}}aboutus",
    link: "about_us",
  },
  {
    title: "{{lang}}contact-us",
    link: "contact_us",
  },
  {
    title: "{{lang}}blogs",
    link: "blogs",
  },
  {
    title: "{{lang}}footer-Ticketing",
    link: "ticketing",
  },
  {
    title: "{{lang}}Modules-and-professors",
    link: "partners",
  },
  {
    title: "{{lang}}privacy-policy",
    link: "privacy_and_policy",
  },
  {
    title: "{{lang}}terms",
    link: "jobs_and_opportunities",
  },
];

const HeaderMain = ({ ...props }) => {
  const changeLocation = (view, target) => {
    console.log(target);
    if (target) {
      setTimeout(() => {
        let bound = target.getBoundingClientRect();
        console.log(bound);

        let triangle = $("#mega-box-after")[0];
        // console.log(triangle)
        if (triangle) {
          triangle.style.left = bound.left + bound.width / 2 - 10 + "px";
        }
      }, 100);
    }

    setTimeout(() => {
      let wW = document.getElementById("mega-box");
      if (wW) {
        const testWidth = wW.getBoundingClientRect().width;
        wW.style.left = (window.innerWidth - testWidth) / 2 + "px";
      }
    }, 10);

    if (view) {
      setMenuComponent(view);
    }

    setTimeout(() => {
      shouldBeOpen = true;
      setChange(true);
    }, 1);
  };

  const { data, error } = useSWR([props.lng], fetcher);

  const countCart = () => {
    // console.log(props)
    let count = 0;
    Array.isArray(props?.cart.items) &&
      props?.cart.items.forEach((element) => {
        count += element.count;
      });
    return count;
  };


  const openMenu = () => {
    if (width <= 992) {
      setTest((prev) => !prev);
    }
  };

  const openMenuLearn = () => {
    if (width <= 992) {
      setTestSec((prev) => !prev);
    }
  };

  const openMenuComp = () => {
    if (width <= 992) {
      setTestThird((prev) => !prev);
    }
  };

  const logoutAlert = () => {
    logoutModal.showModal();
  };
  const logoutModal = useRef
  // const logout = () => {
  //   this.props.actions.logoutUser();
  //   this.props.history.push(pathMaker("/"));
  //   this.logoutModal.hideModal();
  // };
  const logout = () => {
    props.actions.logoutUser();
    Router.push("/");
    // props.history.push('/login')
    profileFixedView.current.hideView();
    logoutModal.hideModal()
  };

  const profileBut = useRef();
  const profileFixedView = useRef();

  const [click, setclick] = useState(false);

  const [respons, setRespons] = useState(false);

  const [test, setTest] = useState(false);

  const [width, setWidth] = useState({});

  const [testSec, setTestSec] = useState(false);

  const [testthird, setTestThird] = useState(false);

  const [navbar, setNavbar] = useState(false);

  const [change, setChange] = useState(false);

  const [text, setText] = useState();


  const [menuComponent, setMenuComponent] = useState(false);

  const [products, setShowProducts] = useState(false);



  const [profilePages, setProfilePages] = useState([
    {
      name: "پنل سازمانی",
      icon: "/images/icons/organ2.png",
      key: "organization",
    },

    {
      name: "داشبورد",
      icon: "/images/icons/chart.svg",
      key: "",
      dontShowInDashboard: true,
    },
    {
      name: "مسیر یادگیری",
      icon: "/images/icons/routing1.svg",
      key: "courses",
    },
    {
      name: "یادگیره‌ها",
      icon: "/images/icons/save-2.svg",
      key: "notes",
    },
    {
      name: "علاقه‌مندی‌ها",
      icon: "/images/icons/heart2.svg",
      key: "favorites",
    },
    // {
    //   name: "اعلان‌ها",
    //   icon: "/images/icons/notification.svg",
    //   key: "notifications",
    // },
    {
      name: "یادنامه‌ها",
      icon: "/images/icons/verify.svg",
      key: "certificates",
    },
    {
      name: "گزارشات مالی",
      icon: "/images/icons/card.svg",
      key: "financial",
    },
    {
      name: "کیف پول",
      icon: "/images/credit.png",
      key: "wallet",
      hideInList: true,
    },
    {
      name: "تنظیمات حساب",
      icon: "/images/icons/setting-2.svg",
      key: "settings",
    },
    {
      name: "یادین ها",
      icon: "/images/icons/notification.svg",
      key: "yadins",
    },
    {
      name: "یادین های استاد",
      icon: "/images/icons/notification.svg",
      key: "prof-yadins",
    },
    {
      name: "گزارشات مالی استاد",
      icon: "/images/icons/notification.svg",
      key: "prof-financial",
      status: 'teachers'
    },
    {
      name: "پشتیبانی",
      icon: "/images/icons/notification.svg",
      key: "prof-support",
      status: 'teachers'
    },

    // { name: 'Financial', icon: '/images/benefit.svg', key: 'financial' },
    // { name: 'Wallet', icon: '/images/wallet.svg', key: 'wallet' },
    // { name: 'Account type', icon: 'https://www.flaticon.com/svg/static/icons/svg/744/744922.svg', key: 'type' },
  ]);

  const handleClick = () => {
    setclick(!click);
    setTest(false);
    setTest(false);
    setTestSec(false);
    setTestThird(false);

    setRespons((prev) => !prev);
  };

  const changeNavbar = () => {
    // let styleTest = document.getElementById("justcolor");

    // if (styleTest) {
    //   if (window.scrollY >= 120) {
    //     setNavbar(!test);
    //     styleTest.style.color = "black";
    //   }
    // }
  };
  const [pathName, setPathName] = useState()
  const makePath = () => {
    // setPathName(null)
    let path = window.location.pathname
    // console.log('098', path);
    // setPathName(path)
    Router.push("/login" + '?ref=' + path)

  }
  useEffect(() => {



    let resWidth = window.innerWidth;
    setWidth(resWidth);

    setTimeout(() => {
      window.addEventListener("scroll", changeNavbar);
    }, 10);

    console.log("users", props.user);
  }, []);

  // useEffect(() => {

  //   // console.log(token)

  //   let pages = profilePages;
  //   if (props.user?.info?.status != 'teachers') {

  //     pages.splice(10, 3);
  //     setProfilePages(pages);
  //   }

  // }, [props.user?.info?.status]);

  let shouldBeOpen = false;

  const deletLocation = () => {
    shouldBeOpen = false;

    setTimeout(() => {
      if (!shouldBeOpen) {
        setChange(false);
      }
    }, 700);
  };

  const enterToGo = (e) => {
    if (e.keyCode == 13 || e.key == "Enter") {
      Router.push("/search/" + text);
      handleClick()

    }
  }

  const closeMobileMenu = () => {
    setclick(false);
  };

  const closeMegaMenu = () => {
    let scrollFix = document.getElementById("scroll-top");

    scrollFix.scrollTop = 0;

    // console.log(scrollFix)

    setRespons((prev) => !prev);
    setclick((prev) => !prev);
  };

  const showProducts = () => {
    setShowProducts(true);
  };

  let shouldOpen = true;

  const closeProducts = () => {
    shouldOpen = false;

    setTimeout(() => {
      if (!shouldOpen) {
        setShowProducts(false);
      }
    }, 70);
  };

  const calcTotalPrice = () => {
    let total = 0;
    if (props.cart?.items) {
      for (let i = 0; i < props.cart?.items.length; i++) {
        const element = props.cart?.items[i];
        total = total + (element.count ?? 1) * element.data.price;
      }
    }
    return total;
  };

  let Component = MegaMenuList[menuComponent];

  const openProfileInfo = () => {
    // console.log(profileFixedView)
    if (profileFixedView) {

      waitForId(20)
    }
    // console.log(this.notifBut)
  };
  const waitForId = (leftAttempt) => {
    // console.log("waitForId")
    if (props.user?.info?._id && props.user?.info?.status) {
      let pages = profilePages;
      if (props.user?.info?.status != 'teachers') {

        pages.splice(10, 3);
        setProfilePages(pages);
      }
      profileFixedView.current.showView();


    } else {
      setTimeout(() => {
        if (leftAttempt != 0) {
          waitForId(leftAttempt - 1)
        }
        // else {
        //     // console.log("401")
        //     logout()
        //     setState({ pageStatus: 401 })
        // }
      }, 500);
    }
  }

  const removeFromCart = (item) => {
    props.actions.removeFromCart(item);
  };

  const [mobileSearch, setMobileSearch] = useState(false)






  return (
    <>
      <div
        className={navbar ? " py-2 main-header colorfull" : " py-2  main-header"}>
        <div className="wrapper-header container">




          <div className="flexc">

            <div style={{ display: "flex", justifyContent: "right" }}>
              
              <div className="item-header ">
                <Link href={"/"}>
                  <img src="/images/Logo2.png" onClick={closeMobileMenu} alt=""
                    className="for-logo for-persian-margin" style={{ cursor: "pointer" }} />
                </Link>
              </div>
            <div className="item-header d-none d-sm-flex">
              <Link href={"/"}>
                <img src="/images/Logo1.png" onClick={closeMobileMenu} alt=""
                  className="for-logo" style={{ cursor: "pointer" }} />
              </Link>
            </div>
            </div>

            {/* <div className="item-header edit-main pr-5">
              <ul className={click ? "section-header active-first" : "section-header"}>
                <Link href={"/modules-and-profs"}>
                  <li className={navbar ? "edit-in-cover scroll-color" : "edit-in-cover"}>
                    {checkTranslation("ماژول ها و اساتید")}
                  </li>
                </Link>

                {props.user && props.user.loggedin && (
                  <Link href="/profile/courses">
                    <li className={navbar ? "edit-in-cover scroll-color" : "edit-in-cover"}>
                      <span id="f-size-edit">
                        {checkTranslation("مسیر یادگیری")}
                      </span>
                    </li>
                  </Link>
                )}

                {(!props?.user || !props?.user?.loggedin) && (
                  <Link href={"/login"}>
                    <li className={navbar ? "edit-in-cover scroll-color" : "edit-in-cover"}>
                      <span id="f-size-edit">
                        {checkTranslation("مسیر یادگیری")}
                      </span>
                    </li>
                  </Link>
                )}

                <Link href="/guide">
                  <li className={navbar ? "edit-in-cover scroll-color" : "edit-in-cover"}>
                    <span
                      id="f-size-edit">
                      {checkTranslation("راهنما")}
                    </span>
                  </li>
                </Link>
              </ul>
            </div> */}
          </div>

          {Component && (
            <div className={change ? "mega-box" : "mega-box hide"} id="mega-box" style={{ minWeight: 100 }}>
              <div id="mega-box-after"></div>

              <Component
                change={change}
                deletLocation={deletLocation}
                changeLocation={() => changeLocation()}
                lng={props.lng}
                data={data}
              />
            </div>
          )}

          <div className="flex-row align-items-center d-flex justify-content-end">
            <div className="sign-in w-100">



              {/* large search */}
              <div className="search-background px-2 py-1 ml-3 flexcb d-none d-lg-block" style={{ borderRadius: 10 }}>
                <div className="w-100 d-flex flexc align-items-center">
                  <input autocomplete="false" type={"Text"}
                    value={text} onKeyDown={(e) => enterToGo(e)} onChange={(e) => setText(e.target.value)}
                    placeholder={translate("جست وجو...")} className="search-input flexc"
                    style={{ width: '150px', color: "#fff", background: "transparent", border: "1px solid transparent" }} />

                  <button className="flexc">
                    <Link href={"/search/" + text}>
                      <img src="/images/Search.png" style={{ width: "20px" }} />
                    </Link>
                  </button>
                </div>
              </div>






              {/* {(!props?.user || !props?.user?.loggedin) && (

                <div className="creadit-point mx-3 d-none d-md-block ">
                  <Link href={"/login"}>
                    <div>
                      <a style={{ whiteSpace: 'nowrap' }}>{checkTranslation("شارژ حساب")}</a>
                      <img className="d-md-none mrd-4" src="/assets/log-in.png" style={{ width: "20px", height: "20px", objectFit: "contain", }} />
                    </div>
                  </Link>
                </div>
              )} */}

              {props?.user && props.user?.loggedin && (
                <>
                  <div >

                    <div className=" mx-3 d-none d-sm-block">
                      <Link href={"/profile/wallet"}>
                        <div className="creadit-point">
                          <a className="" style={{ whiteSpace: 'nowrap' }}>{checkTranslation("شارژ حساب")}</a>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div >

                    <div className=" ml-2 d-block d-sm-none">
                      <Link href={"/profile/wallet"}>
                        <a className="" style={{ whiteSpace: 'nowrap' }}>
                          <img src="/images/icons/empty-wallet12.svg" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </>


              )}

              {(!props.user || !props.user.loggedin) ? (
                <div className="m-2 m-md-0" onClick={() => makePath()}>
                  <a className={navbar ? "sign-edit color-scroll-edit d-none d-md-block" : "sign-edit d-none d-md-block"} style={{ whiteSpace: 'nowrap' }}>
                    ورود / عضویت
                  </a>
                  <img
                    className="d-block d-md-none "
                    // src="/assets/log-in.png"
                    src="/images/icons/login2.svg"
                    style={{
                      // width: "20px",
                      // height: "20px",
                      objectFit: "contain",
                      // backgroundColor: '#C97EF5',
                    }} />
                </div>
              ) : (
                <div className="mr-2 ">
                  <button ref={profileBut} onClick={() => openProfileInfo()} className=" text-small cursor-pointer p-0 flexcc" style={{}}>
                    <p className="d-none d-xl-block text-color-2 tex-uppercase text-bold px-2 ">
                      {props.user?.info?.fullname}{" "}
                    </p>
                    <img style={{ borderRadius: "20px" }} src={imageAddress(props.user?.info?.image, "profile", "small")} className={""} height="24px" />
                  </button>
                  {profileBut && (
                    <FixedView
                      zIndex={1}
                      ref={profileFixedView}
                      nodeRef={profileBut?.current}
                    >
                      <div className="blur-back ml-0  flexcc flex-column" style={{
                        color: "#000510", zIndex: 1,
                        boxShadow: "0px 0px 15px #00000010", backgroundColor: "#262626", borderRadius: 15, marginTop: 40, width: 250,
                      }}>
                        <div className="py-2 px-2 w-100 " style={{ backgroundImage: "linear-gradient(to right,#e0e8f0,#e4eaf2)", borderRadius: "15px 15px 0px 0px", }}>
                          <div className="d-flex flexc px-2">
                            <img className="mt-1 " src={imageAddress(props.user?.info?.image, "profile", "small")}
                              style={{ height: 30, borderRadius: 30, width: "30px" }} />
                            <div className="">
                              <Link href="/profile">
                                <p className="text-normal tex-uppercase text-bold px-2 ">
                                  {props.user?.info?.fullname}{" "}
                                  {/* {props.user?.info?.family} */}
                                </p>
                              </Link>
                              {/* <p className="text-smaller px-2 ">
                                موجودی شما: {props.user?.info?.wallet ?? 0} تومان
                              </p> */}

                            </div>
                          </div>
                        </div>
                        <div className="py-2 w-100 bg-gray-color-5 " style={{ borderRadius: '14px' }}>
                          {profilePages.map((prop, index) => {
                            if (!prop.status || prop.status.includes(props.user?.info?.status)) {
                              if (prop.hideInList !== true) {
                                return (
                                  <Link href={"/profile/" + prop.key} key={index}>
                                    <a className="w-100 px-3 flexc text-start mb-2 "
                                      onClick={() => { profileFixedView.current.hideView(), setRespons(false) }}>
                                      <div>
                                        <img src={prop.icon} width="30px" />
                                      </div>
                                      <div className="mld-4">
                                        <p className="text-small text-bold text-color-1">
                                          {checkTranslation(prop.name)}
                                        </p>
                                      </div>
                                    </a>
                                  </Link>
                                );
                              }
                            }
                          })}
                          <div className="flexc">
                            <button onClick={() => logoutAlert()} className="flexc px-3 text-small text-bold text-color-1">
                              <img src="/images/logout.svg" width="30px" />
                              <p className="mld-4">{checkTranslation("خروج از حساب کاربری")}</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </FixedView>
                  )}
                </div>
              )}
            </div>
            <div className="menu-icon mr-3" onClick={handleClick}>
              <img src={click ? "/images/icons/close-2.svg" : "/images/icons/menu-21.svg"} />
            </div>
          </div>
        </div>

      </div>

      <div id="scroll-top" className={""} style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          className={respons ? "second-respons-menu d-lg-none" : "second-respons-menu-active d-lg-none"}>
          {respons && (
            <div className="handle-responsive-mega-menu">

              <div className="search-background px-2 py-1 ml-3 flexcb mb-2" style={{ borderRadius: 10, background: "#282828" }}>
                <div className="w-100 d-flex flexc align-items-center">
                  <input autocomplete="false" type={"Text"}
                    value={text} onKeyDown={(e) => enterToGo(e)} onChange={(e) => setText(e.target.value)}
                    placeholder={translate("جست وجو...")} className="search-input flexc"
                    style={{ width: '150px', color: "#fff", background: "transparent", border: "1px solid transparent" }} />

                  <button className="flexc">
                    <Link href={"/search/" + text}>
                      <img src="/images/Search.png" style={{ width: "20px" }} />
                    </Link>
                  </button>
                </div>
              </div>

              {/* <Link href={"/platform"}> */}
              {/* <a onClick={openMenuLearn} style={{ cursor: "pointer", borderBottom: '1px solid rgba(160,160,160,0.2)', paddingBottom: '20px' }}>
                <span className="header-item" style={{ textTransform: "capitalize", color: '#E0E0E0' }}>
                  {translate("Modules-and-professors")}
                  <img className="mx-2" src="/images/icons/arrow-bottom-menu-mobile.svg" alt="sfds" />
                </span>
                {testSec && (
                  <Collapsible open={testSec ? true : false}>
                    <div className="p-0 m-0 flexcc ">
                      <div className="row p-0 m-0">
                        {testData.map((prop, index) => {
                          return (
                            <Link href={prop.link}>
                              <a onClick={closeMegaMenu} className="w-100">
                                <div className=" p-0 m-0" style={{ maxHeight: "30px" }} >
                                  <span className="under-line-menu p-0 m-0 " style={{ color: "#A0A0A0", fontSize: "13px" }} >
                                    {checkTranslation(prop?.title)}
                                  </span>
                                </div>
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </Collapsible>
                )}
              </a> */}
              {/* </Link> */}
              {/* <a onClick={openMenu} style={{ borderBottom: '1px solid rgba(160,160,160,0.2)', paddingBottom: '20px' }}>
                <span className="header-item" style={{ textTransform: "capitalize", color: '#E0E0E0' }}>
                  {translate("learning-path")}
                </span>
              </a>
              {test && (
                <div>
                  <Collapsible open={test ? true : false}>
                    <div className="p-0 m-0 flexcc ">
                      <div className="row">
                        {data?.map((prop, index) => {
                          return (
                            <Link href={"/usecase/" + prop._id}>
                              <a onClick={closeMegaMenu}>
                                <div className="col-sm-6" style={{ maxHeight: "40px" }} >
                                  <a className="under-line-menu p-0 m-0" style={{ whiteSpace: "nowrap", color: "#000", fontSize: "14px", }} >
                                    {checkTranslation(prop.values?.title)}
                                  </a>
                                </div>
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </Collapsible>
                </div>
              )} */}

              {/* <a onClick={closeMegaMenu} style={{ borderBottom: '1px solid rgba(160,160,160,0.2)', paddingBottom: '20px' }}>
                <span className="header-item">{translate("guideline")}</span>
              </a> */}
              {/* <a onClick={openMenuComp}>
                <span className="header-item">{translate("company")}</span>
              </a>
              {testthird && (
                <Collapsible open={testthird ? true : false}>
                  <div className="p-0 m-0 d-flex ">
                    <div className="row">
                      {companyData.map((prop, index) => {
                        return (
                          <Link href={prop.link}>
                            <a onClick={closeMegaMenu}>
                              <div
                                className="col-sm-6"
                                style={{ maxHeight: "40px" }}
                              >
                                <a
                                  className="under-line-menu p-0 m-0"
                                  style={{ color: "#000", fontSize: "14px" }}
                                >
                                  {checkTranslation(prop?.title)}
                                </a>
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </Collapsible>
              )} */}

              {/* <Link href={"/shop"}>
                <a onClick={closeMegaMenu} style={{ cursor: "pointer" }}>
                  <span className="header-item">{translate("Shop")}</span>
                </a>
              </Link> */}
              <div className="creadit-point-mega-menu mx-3">
                <Link href={"/login"}>
                  <div>
                    <a style={{ whiteSpace: 'nowrap' }}>شارژ حساب</a>
                  </div>
                </Link>
              </div>
              <div className="social-section-mega-menu">
                <i class="fab fa-instagram"></i>
                <i class="fab fa-telegram"></i>
                <i class="fab fa-whatsapp"></i>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal maxWidth={350} ref={(el) => (logoutModal = el)}>
        <div className="text-center bg-gray-color-1 p-5 radius-2">

          <p className="text-big text-color-1 text-semibig">خروج از حساب کاربری</p>
          <p className="text-small pt-3 text-color-2">مطمعن هستید میخواهید خارج شوید؟</p>

          <div className="flexcc mt-3">
            <button
              onClick={() => logout()}
              className="px-4 py-2 text-bold text-small btn-primary3" style={{ whiteSpace: "nowrap", border: "none" }}>
              <p>بله خارج میشوم</p>
            </button>
            <button
              onClick={() => logoutModal.hideModal()}
              className="px-4 py-2 text-small text-color-2" style={{ whiteSpace: "nowrap" }}>
              خیر خارج نشوم
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

// HeaderMain.getInitialProps = async (ctx) => {
//     console.log("ctx*******")
//     console.log(ctx)

//     return {ctx: ctx }
//   }

// export default HeaderMain;

const mapStateToProps = (state) => ({
  settings: state.settings,
  cart: state.cart,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderMain));
