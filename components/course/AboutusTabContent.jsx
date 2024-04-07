import React from 'react'
import MapWrapper from './MapWrapper'
import Collapsible from 'react-collapsible';
import { useState } from 'react';
import Link from 'next/link';
import { translate } from '../../utils/useful';

export default function AboutusTabContent({ data }) {

    const aboutus = [
        { title: 'Highlights', Text: 'Deeply hydrating facials aim to purify the complexion to help achieve a fabulous, youthful appearance and silk-like touch' },
        { title: 'About This Deal', Text: 'Benefits of Proskin 60 facial: Designed to address one’s specific needs and issues, the treatment can help purify the skin, cleanse pores, restore a youthful appearance, improve acne, or reduce the appearance of fine lines and wrinklesBenefits of Advanced facial: noninvasive treatment aims to boost collagen production and treat acne, fine lines, and wrinkles, as well as address early signs of agingPlan AheadAppointment required.' },
        { title: 'Fine Print', Text: 'Promotional value expires 120 days after purchase. Amount paid never expires. Appointment required. Merchants standard cancellation policy applies (any fees not to exceed Groupon price). Valid only for option purchased. All goods or services must be used by the same person. Merchant is solely responsible to purchasers for the care and quality of the advertised goods and services. Offer is not eligible for our promo codes or other discounts.' },
        { title: 'About Innerspace Skin', Text: 'Innerspace Skin is the best place to take care of facial skin. They know exactly what to do to improve the looks and bring back the youthfulness of the face. Innerspace Skin offers advanced facial treatments with LED lamps and high-quality cosmetics. In addition, they do brow waxing and tinting to fulfill clients needs.' },

    ]
    const location = [
        { src: '/images/maplocation.svg', locate: 'The Legacy at Millennium Park', name: '1033 Bay St. #322, Toronto, ON M5S 3A5, Canada', dir: 'Direction', href: 'https://www.google.com/maps/place/Fardis,+Iran/@35.7210189,50.9832191,14z/data=!4m5!3m4!1s0x3f8d9483b8cafba7:0xb1ef1db35e21e416!8m2!3d35.7213889!4d50.9771988!5m1!1e8' }
    ]
    const close = [
        { src: '/images/maptime.svg', close: 'Opens at 9:00 AM', all: 'See All Hours' }
    ]
    const closetime = [
        { name: 'Sunday', close: '8:30AM–10:30PM' },
        { name: 'Monday', close: '8:30AM–10:30PM' },
        { name: 'Tuesday', close: '8:30AM–10:30PM' },
        { name: 'Wednesday', close: '8:30AM–10:30PM' },
        { name: 'Thursday', close: '8:30AM–10:30PM' },
        { name: 'Friday', close: '8:30AM–10:30PM' },
        { name: 'Saturday', close: '8:30AM–10:30PM' },
    ]
    const postCard = [
        { src: '/images/post/post1.png' },
        { src: '/images/post/post2.png' },
        { src: '/images/post/post3.png' },
        { src: '/images/post/post4.png' },
        { src: '/images/post/post5.png' },
        { src: '/images/post/post6.png' },
        { src: '/images/post/post7.png' },
        { src: '/images/post/post8.png' },
        { src: '/images/post/post9.png' },
        { src: '/images/post/post10.png' },
    ]
    const instagramUser = [
        { user: 'Makenna Donin' }
    ]
    const [open, setOpen] = useState(false)
    return (
        <div className='aboutus-tab-content'>
            <div className='my-5 text-content'>
                <div dangerouslySetInnerHTML={{ __html: `${data.info.en.body}` }}></div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", height: "300px", width: "100%", borderRadius: '15px' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805.7703457805471!2d-115.17409816455957!3d36.11587499477689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4aab9cc1ce98ddce!2zMzbCsDA2JzU3LjIiTiAxMTXCsDEwJzIyLjciVw!5e0!3m2!1sen!2s!4v1662968335366!5m2!1sen!2s" style={{ width: '100%', height: '100%', border: '0px solid #95c11f', borderRadius: '15px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="mapinfo d-flex my-4 mt-5">
                <div className="mapinfo-container d-flex align-items-center w-100">
                    <div className='d-flex align-items-center'>
                        <div className="locate">
                            <img className='w-100' src={"/images/maplocation.svg"} alt="" />
                        </div>
                        <div className='location-info'>
                            <p>{data.info.address}</p>
                            <span>{"1033 Bay St. #322, Toronto, ON M5S 3A5, Canada"}</span>
                        </div>
                    </div>
                    <div className='direction cursor-pointer'>
                    </div>
                </div>
            </div>
            <div className="closetime d-flex my-4">
                {close.map((prop, index) => {
                    return (
                        <div key={index} className="closetime-container d-flex align-items-center w-100">
                            <div className='time d-flex align-items-center'>
                                <div className='iconclose'>
                                    <img src={prop.src} alt="" className='w-100' />
                                </div>
                                <div className='closeinfo'>
                                    <p className='time-close text-bold'>{translate("Openning Hours")}</p>
                                </div>
                            </div>
                            <div className="seealltime cursor-pointer" onClick={() => setOpen(!open)}>
                                <p>{prop.all}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='px-5 mb-5'>
                <Collapsible open={open}>
                    {closetime.map((prop, index) => {
                        return (
                            <div key={index} className=' close-time-info d-flex align-items-center mb-2 pb-2' style={{borderBottom:'0px solid #eee'}}>
                                <p className='text-bold'>{prop.name}</p>
                                <p>{prop.close}</p>
                            </div>
                        )
                    })}
                </Collapsible>
            </div>
        </div >
    )
}
