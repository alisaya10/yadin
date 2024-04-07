import React from 'react';
import Head from 'next/head';
import moment from 'jalali-moment';
import Link from 'next/link';
import { checkTranslation, imageAddress, translate } from '../../utils/useful';
import HttpServices from '../../utils/Http.services';
import Router from 'next/router';





export async function getServerSideProps(context) {


    let slug = null

    if (context?.query?.slug) {
        slug = context?.query?.slug
    }

    let lng = context.locale
    if (!lng) {
        lng = 'en'
    }


    const res = await (await HttpServices.syncRequest('getOneBlog', { _id: slug })).result

    const similarRes = await (await HttpServices.syncRequest('getRecommendedBlogs', { _id: res?.info?._id, lng })).result


    const AdsJson = await (await HttpServices.syncRequest('getRandomContents', { filter: { "values.pages": 'single_blog' }, count: 2, page: "advertisements", lng })).result

    // const res = await fetch('https://www.iotsmile.com/iot/apiv1', {
    //     method: "POST",
    //     body: JSON.stringify({
    //         route: "values/getOneValue",
    //         content: {
    //             _id: slug,
    //             // _id: id
    //         }
    //     })
    // })

    // const json = await res.json()



    // const similarRes = await fetch('https://www.iotsmile.com/iot/apiv1', {
    //     method: "POST",
    //     body: JSON.stringify({
    //         route: "values/getValuesWithData",
    //         content: {
    //             page: "Blogs"
    //             // _id: id
    //         }
    //     })
    // })

    // const similarJson = await similarRes.json()
    // console.log(json)
    return {
        props: JSON.parse(JSON.stringify({ info: res ? res.info : null, blogs: similarRes ? similarRes.info : [], ads: AdsJson.info }))
    }



}




class ProductPage extends React.Component {
    state = {

    }

    componentDidMount() {
        let fullUrl = "https://iotsmile.com" + Router.router.asPath
        this.setState({ data: this.props.data, fullUrl })
    }




    render() {
        var settings = {
            dots: true,
            autoplay: false,
            autoplaySpeed: 1900,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
        };


        var settings1 = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 700,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 770,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
        var settings2 = {
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 700,
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <>
                <Head>

                    <title>IoTSmile Blogs</title>

                </Head>
                <div className="pb-5" style={{ backgroundColor: '#fff' }}>
                    <div className="d-flex " style={{ padding: '0px 3%', justifyContent: 'center' }}>
                        <div className="flex-1 d-none d-lg-block ">
                            <div className="flexcc flex-column w-100" style={{ position: 'sticky', top: 120 }}>
                                <div className="" style={{ maxWidth: '200px', borderBottom: '1px solid rgb(0,0,0,0.1)', paddingBottom: '15px', }}>
                                    <p style={{ fontSize: '15px', fontWeight: '500' }}>{checkTranslation('{{lang}}learn-about-iot-blog-slug-page')}</p>
                                    <p className="mt-1" style={{ fontSize: '13px', color: 'rgb(0,0,0,0.6)' }}>{translate('single-blog-page-left-side')}</p>
                                    <button className="mt-3" style={{ borderRadius: '30px', padding: '5px 15px ', fontSize: '12px', backgroundColor: '#000', color: '#fff' }}>{checkTranslation('{{lang}}learn-more')}</button>
                                </div>


                                <div className="flexcc flex-column w-100">
                                    <div style={{ maxWidth: '200px', }}>
                                        {this.props.ads?.map((item, index) => {
                                            if (item.values.pages.includes('shop-list')) {
                                                return (
                                                    // <div className="col-6 col-md-4 col-lg-3 mb-4 ">
                                                    <div className='w-100'>
                                                        <div className="outline-none flex-1 h-100" style={{ overflow: 'hidden', borderRadius: 8 }}>
                                                            <a className='w-100 h-100' href={item?.values?.address}>
                                                                <img src={imageAddress(item.values.image)} className="w-100 slidershop-img" style={{ flex: 1, height: '100%', objectFit: 'cover' }} />
                                                            </a>
                                                        </div>
                                                    </div>

                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-5" style={{ maxWidth: '700px', }}>
                            <h1 style={{ fontSize: '35px', fontWeight: '500', lineHeight: '50px' }}>{this.props.info?.title}</h1>
                            <div className=" my-3 w-100 flexcb">
                                <div className="flexc">

                                    <div className="flexcc">
                                        <div className='flexcc'>
                                            <div className='flexcc' style={{ border: '1px solid rgb(0,0,0,0.6)', width: '56px', height: '56px', borderRadius: '50%', }}>
                                                {this.props.info.teacher.values.image ? (
                                                    <img src={imageAddress(this.props.info?.teacher?.values?.image,null,'thumb')} style={{ width: '50px', borderRadius: '60px' }} />
                                                ) : (
                                                    <img src="/images/logo.jpg" style={{ width: '50px', borderRadius: '60px' }} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-2">
                                        <div className="flexc">
                                            {this.props.info.teacher.values.name ? (
                                                <p className="m-0 mb-1" style={{ fontSize: '14px', lineHeight: '15px', fontWeight: '500', color: 'rgb(0,0,0,0.8)' }}>{translate('Writer')}: {this.props.info?.teacher?.values?.name}</p>
                                            ) : (
                                                <p className="m-0 mb-1" style={{ fontSize: '14px', lineHeight: '15px', fontWeight: '500', color: 'rgb(0,0,0,0.8)' }}>IoTSmile.com</p>

                                            )}
                                            {/* <button className="mx-1" style={{ borderRadius: '30px', padding: '2px 10px ', fontSize: '12px', backgroundColor: '#000', color: '#fff' }}>Follow</button> */}
                                        </div>
                                        <p className="ticket-date">{moment(this.props.info?.cDate).format("jDD jMMMM , jYYYY")}</p>
                                        {/* <div className="flexc my-1" style={{ padding: '2px 0px' }}>
                                            <ReactStars
                                                count={5}
                                                value={4}
                                                edit={false}
                                                size={14}
                                                color="#89a"
                                                activeColor="#ffbf00"
                                            />
                                            <div className="px-1" style={{ fontSize: '14px', fontWeight: '600' }}>
                                                <p >4.9</p>
                                            </div>

                                        </div> */}
                                        {/* <button className="contact-prdctpg-bttn" >Contact Me</button> */}
                                    </div>
                                </div>
                                <div className="flex-end ">
                                    <a target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=" + this.state.fullUrl + "&t=" + this.state.data?.values?.title}><img src={'/images/icons/facebook.svg'} style={{ height: 27, opacity: 0.9, marginRight: 10 }} /></a>


                                    <a target="_blank" href={"https://www.linkedin.com/shareArticle?mini=true&url=" + this.state.fullUrl}><img src={'/images/icons/linkedin-logo.png'} style={{ height: 27, opacity: 0.9, marginRight: 10 }} /></a>


                                    <a target="_blank" href={"https://twitter.com/intent/tweet?url=" + this.state.fullUrl}><img src={'/images/icons/twitter.svg'} style={{ height: 27, opacity: 0.9, marginRight: 10 }} /></a>
                                    {/* <a target="_blank" href={"https://telegram.me/share/url?url=" + this.state.fullUrl}><img src={'img/telegram.svg'} style={{ height: 27, opacity: 0.9, marginRight: 10 }} /></a> */}




                                    {/* <a target="_blank" href={"mailto:?body=" + this.state.fullUrl}><img src={'/icons/email.svg'} style={{ height: 27, opacity: 0.9, marginRight: 10 }} /></a> */}

                                    {/* <a target="_blank" href={"whatsapp://send?text=" + this.state.fullUrl}><img src={'/img/whatsapp.svg'} style={{ height: 27, opacity: 0.9, marginRight: 10 }} /></a> */}

                                    {/* <img src={'/images/icons/twitter.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                                    <img src={'/images/icons/facebook.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                                    <img src={'/images/icons/instagram.svg'} style={{ width: '20px', margin: '0px 5px' }} />
                                    <img src={'/images/icons/pinterest.svg'} style={{ width: '20px', margin: '0px 5px' }} /> */}
                                </div>
                            </div>
                            <p style={{ fontSize: '17px', lineHeight: '32px', fontWeight: '350' }}>{this.props.info?.description}</p>
                            <img className="my-3" src={imageAddress(this.props.info?.image?.address, null)} style={{ width: '100%', borderRadius: 4 }} />
                            <p className="my-1" style={{ fontWeight: '600', fontSize: '28px' }}>{this.props.info?.title}</p>
                            <div className='ck-content'>
                                <div className="mb-5" style={{ fontSize: '17px', lineHeight: '30px', fontWeight: '350' }} dangerouslySetInnerHTML={{ __html: this.props.info?.body }}></div>
                            </div>
                        </div>
                        <div className="flex-1 d-none d-lg-block "></div>
                    </div>
                    <div className="container-fluid px-5 flexcc flex-column mb-5 mt-5" style={{ backgroundColor: "#F4F7FF" }}>
                        <p className="mb-3 pt-3" style={{ fontSize: '25px', fontWeight: '500' }}>{translate('Related Articles')}</p>
                        <div className="row m-0 w-100">
                            {this.props.blogs?.map((item, index) => {
                                return (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 p-2">
                                        <Link href={{ pathname: '/blog/' + item._id }} >
                                            <a>
                                                <div className="mb-4 p-2 outline-none h-100 " >

                                                    <div className="w-100 h-100 d-flex flex-column" style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '4px',background:'#fff' }} >
                                                        <div className="px-1 pt-1" style={{ flex: 1 }}>
                                                            <img src={imageAddress(item.image?.address, null, 'small')} style={{ borderRadius: '4px 4px 0px 0px', width: '100%', height: '170px', objectFit: 'cover' }} />

                                                            <div className="px-3  text-start flex-column  ">
                                                                <p className="mt-3 mb-2" style={{ fontSize: '16px', fontWeight: '500', maxWidth: '260px' }}>{item.title}</p>

                                                                <p style={{ fontSize: '15px', fontWeight: '300' }}>{item.description}</p>
                                                            </div>

                                                        </div>
                                                        <div className=" w-100 pb-3 px-3 ">
                                                            {item?.teacher?.values?.name && (
                                                                <p className='mb-2' style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{checkTranslation("{{lang}}Writer")}: {item?.teacher?.values?.name}</p>
                                                            )}
                                                            <div className='flexcb w-100'>
                                                                <div className=" flexc  ">
                                                                    <img className="mx-1" src="/images/icons/clock.png" style={{ width: '13px' }} />
                                                                    <p className="m-0" style={{ fontSize: '13px', marginTop: '1px', color: 'rgb(0,0,0,0.6)', lineHeight: 1 }}>{moment(item.cDate).format("jDD jMMMM , jYYYY")}</p>
                                                                </div>
                                                                <div className=" flexc ">
                                                                    {/* <img className="mx-1" src="/images/icons/clock.png"style={{width:'13px'}}/> */}
                                                                    <a><p style={{ fontSize: '15px', color: 'rgba(64, 117, 190, 1)' }}>{checkTranslation('{{lang}}Read-more')}</p></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>


                                )
                            }
                            )}


                            {(!this.props.blogs || this.props.blogs?.length == 0) && (
                                <div className="flexcc w-100 mb-5">
                                    <p>Nothing Found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}



export default ProductPage;