import React, { useState } from 'react'
import AboutusTabContent from './AboutusTabContent'
import AboutusTabReviews from './AboutusTabReviews'
import AboutusTabFaq from './AboutusTabFaq'
import { translate } from '../../utils/useful'
export default function TabAboutUs({ data, getAllReviews, getAllComments }) {
    // const [active, setActive] = useState(0)

    const [currentTab, setcurrentTab] = useState(0)
    // const changecurrentTab = (e, index) => {
    //     setcurrentTab(index)
    // }

    // const changeTabActive = (e, index) => {
    //     // setActive(index)
    //     setcurrentTab(index)
    // }
    const tabAdsingle = [
        { tab: 'aboutus' },
        { tab: 'Reviews' },
        { tab: 'Questions' },
    ]
    // handelcilick = () => {

    // }
    return (
        <>
            <div className='tababoutus-container d-flex' style={{ borderBottom: "1px solid #ddd" }}>
                {tabAdsingle.map((prop, index) => {
                    return (
                        <div key={index}>
                            <div  style={{ fontSize: '15px', color: '#4F4F4F', fontWeight: '600', cursor: 'pointer' }} onClick={() => setcurrentTab(index)} className={"pb-3 mrd-4 "+(currentTab === index ? ' border-bottom-active tab-about-us-text ' : ' border-bottom-not-active tab-about-us-text ')}>
                                <span>{translate(prop.tab)}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            {
                currentTab == 0 && (
                    <>
                        <AboutusTabContent data={data} />
                    </>
                )
            }
            {
                currentTab == 1 && (
                    <>
                        <AboutusTabReviews data={data} getAllReviews={getAllReviews} />
                    </>
                )
            }
            {
                currentTab == 2 && (
                    <>
                        <AboutusTabFaq data={data} getAllComments={getAllComments} />
                    </>
                )
            }

        </>
    )
}
