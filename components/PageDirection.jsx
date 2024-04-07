import React from 'react'
import { useRouter } from 'next/router';



const PageDirection = ({ firstpage, secondpage, thirdpage, fourpage }) => {
    const router = useRouter();

    const openForum = () => {

        router.push('/forums');
    }

    return (
        <>
            <div className="items-rout-name">
                <div className="route-small-logo">
                    <img src="/assets/ad.png" alt="" className="edit-route-small-logo" />
                </div>


                <div className="just-name-route">
                    <span className="check">{`${firstpage}`}</span>
                    <span className="check-route">{`${secondpage}`}</span>
                    <span className="check-route">/</span>
                    <span className="check-route" onClick={openForum}>{`${thirdpage}`}</span>
                    <span className="check-route">/</span>
                    <span className="check-route">{`${fourpage}`}</span>
                </div>

            </div>
        </>
    )
}

export default PageDirection;
