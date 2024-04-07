import Link from 'next/link'
import React from 'react'
import { checkTranslation } from '../../utils/useful'


let megaMenu = [
    {
        list: '{{lang}}Academy',
        link: '/academy',
        txt: '{{lang}}academy-header-desc',
        img: '/assets/svg/svg8.svg',
    },
    {
        list: '{{lang}}Forums',
        link: '/forums',
        txt: '{{lang}}forums-header-desc',
        img: '/assets/svg/svg6.svg',
    },
    {
        list: '{{lang}}Developers',
        link: '/developers',
        txt: '{{lang}}developers-headear-desc',
        img: '/assets/svg/svg7.svg',
    },
   



]

const SampleSecond = ({ change, changeLocation, deletLocation }) => {









    return (




        <div className="content-mega-menu-second p-4" onMouseEnter={() => changeLocation()} onMouseLeave={deletLocation}>
            <div className="row-mega-menu-second" style={{maxWidth:250}}>
                <ul className="mega-links-second">
                    {megaMenu?.map((option, index) => {
                        return (
                            <Link href={option.link}>
                            <div className="label-mega-menu-second">
                                <div className="box-img-mega-menu">
                                    <img src={option.img} alt="" className="edit-label-img" />
                                </div>
                                <div className="list-txt-mega-menu-second mld-3">
                                    <li className="mega-link-items-second">{checkTranslation(option.list)}</li>
                                    <li className="mega-link-items-second-under">{checkTranslation(option.txt)}</li>
                                </div>
                            </div>
                            </Link>
                        )
                    })}
                </ul>
            </div>

        </div>






    )
}


export default SampleSecond;
