
import Link from 'next/link'
import React from 'react'


class Header extends React.Component {
    state = {

    }


    componentDidMount() {
        // this.fetch()
    }


    render() {


        return (
            <div className="navbar1 py-1 px-2 w-100 d-flex">
                <div className="flexc">
                    <Link href="/">
                        <a>
                            <img src="/images/logo.png" className="logo p-0" />
                        </a>
                    </Link>
                    <div className="flexc  px-3 ">

                        <div className="flexcc mx-2 " style={{ position: 'relative' }}>
                            <p className=" nav-desc  ">Products</p>
                            <img src="/images/icons/next.png" className="mt-1 mx-1" style={{ width: '14px' }} />
                            {/* <div style={{ position: 'absolute', maxWidth: '800px', backgroundColor: 'rgb(255,255,255)', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px', top: 30, left: 60, padding: '20px' }}> */}
                            {/* <div className="row m-0 w-100" > */}
                            {/* <div className="col-md-3 w-100">
                      {this.state.megamenu.map((item, index) => {
                        return (
                          <div className=" flexcc flex-column w-100" style={{ justifyContent: 'center' }}>
                            <div style={{ fontSize: '22px', color: '#000', fontWeight: '600' }}><p>{item.category}</p></div>
                            <div className="flexcc">
                              <img src={item.image} style={{ width: '70px' }} />
                              <div style={{ whiteSpace: 'nowrap', fontSize: '15px', fontWeight: '500', color: '#000' }}>
                                <p>{item.name}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div> */}
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                        <Link href="/blogs">
                            <a>
                                <p className="mx-2 nav-desc">Blogs</p>
                            </a>
                        </Link>
                        <p className="mx-2 nav-desc">About us</p>
                    </div>
                </div>

                <div className="flex-1 justify-content-end d-flex">
                    <div className="flexcc">
                        <button className="nav-button1">Log in</button>
                        <button className="nav-button2 ">Sign up</button>
                    </div>
                </div>

            </div>

        );
    }
}

export default Header;
