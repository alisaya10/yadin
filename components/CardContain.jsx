import Link from 'next/link';
import React from 'react'




const CardContain = (props) => {
    return (


        <div className="card-in-content-side">


            <div className="title-card-content ">

                <h4 className='text-semibig ' style={{ fontWeight: 400, color: '#000' }}>{props.headerTitle}</h4>
            </div>


            <div className="card-items-content">
                <div className="row content-row-wrap-edit p-0 m-0">
                    {props.docs?.map((doc,index) => {
                        if (doc.special && doc.special.includes('featured')) {
                            return (
                                <div key={index} className="col-lg-4 col-md-12 card-item-content p-0 mb-3">
                                    <Link href={'/developers/doc/'+doc._id}>
                                    <a className="inner-card-content py-3 px-4 h-100" style={{ backgroundColor: '#f2f6f8' }}>
                                        <span className="inner-title" style={{ fontWeight: 400, color: '#c0003a' }}>{doc.title}</span>
                                        <span className="inner-title-txt text-small" style={{ color: '#345' }} >{doc.description}</span>
                                    </a>
                                    </Link>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>

    )
}

export default CardContain;
