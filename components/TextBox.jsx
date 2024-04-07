import React, { Component } from 'react'
import Link from "next/link";
import { checkTranslation } from '../utils/useful';

class QuestionAbout extends Component {
    render() {
        return (
            <div className='container-fluid p-0 my-0' style={{ backgroundColor: '#7B00F7' }}>
                <div className="row m-0">
                    <div className="col-xl-12 py-5 d-flex flex-column align-items-center justify-content-center">
                        <span className="" style={{ color: "#fff", fontSize: "24px", fontWeight: "500" }}>{checkTranslation('{{lang}}purple-box-academy-documnet-title')}</span>
                        <span className='mt-2' style={{ color: "#eee", fontWeight: 300, fontSize: 14 }}>{checkTranslation('{{lang}}purple-box-academy-documnet-desc')}</span>
                        <Link href={"/developers"}><a style={{ backgroundColor: "#fff", border: "solid 1px #fff", borderRadius: "40px", color: "#7B00F7", fontSize: 14 }} className="mt-3 py-2 px-4">{checkTranslation('{{lang}}purple-box-academy-documnet-button')}</a></Link>
                    </div>
                </div>
            </div>
        )
    }
}


export default QuestionAbout;