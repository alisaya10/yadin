import Link from 'next/link'
import React from 'react'
import { checkTranslation } from '../utils/useful'




const Community = ({docs}) => {
    return (
        <div className="w-100">
            <div className="row m-0">
                <div className="col-12 for-title-header p-0">
                    <h4 className="title-content text-semibig " style={{ fontWeight: 400 }}>
                        {checkTranslation('{{lang}}Trending-Documents')}
                    </h4>
                </div>
                {docs?.map(doc => {
                    if (doc.special && doc.special.includes('trending')) {
                        return (
                            <Link href={'/developers/doc/'+doc._id}>
                                <a className="col-12 mb-2 p-0 pb-2" style={{ borderBottom: '1px solid #f2f6f8' }}>
                                    <div className="list-and-title-content">
                                        <div className="for-title-list-content">
                                            <span style={{ color: '#345', fontSize: 14 }}><span className="community-txt" style={{ fontSize: 16, fontWeight: 400, color: 'rgb(192, 0, 58)' }}>{doc.title}</span> - {doc.description} </span>

                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    }
                })}
            </div>
        </div>

    )
}

export default Community;
