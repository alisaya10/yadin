import React, { Component } from 'react'
import { imageAddress, priceStandardView } from '../utils/useful';

import Link from 'next/link';

class CardItemBox extends Component {
    render() {
        return (
            <div className="container py-3"> 
            <div className="row">

                   
                        {this.props.data?.map((item, index) => {
                            return (
                                <Link href={"/product/"+item.slug}>
                                <div  className="mb-4 p-2 outline-none blogsbox-edit-shop mx-3 col-12 col-md-6 col-lg-4 col-xl-3" >
                                   
                                  <img src={imageAddress(item.image,null,'small')} className="productimg-shop" />
                                  <p className="blogsbox-p2 mt-2">{item.title}</p>
                                  <p className="pricedes">{item.priceSttings?.currency} {priceStandardView(item.price)}</p>
                                  {item.technologies?.map((tech)=>{
                                      return(
                                        <span className='title-blog-box'>{tech}</span>
                                              )
                                  })}
                                  
          
                                  <div className='for-react-stars'>
                                    <span style={{color:'#9ab'}}>View Product  </span>
                                  </div>
          
                               
                                
                              </div>
                              
                              
                              </Link>





                            )
                        })}
                        </div>
                    </div>
                
         
        )
    }
}

export default CardItemBox;







                                // <div className="mb-4 p-2 outline-none col-12 col-md-6 col-lg-4 col-xl-3" >
                                //     <Link href={"/product/" + item.slug}>
                                //         <a className=" blogsbox  flex-column " >
                                //             <img src={imageAddress(item.image, null, 'small')} className="productimg-shop" />
                                //             <p className="blogsbox-p2 mt-2">{item.title}</p>
                                //             <p className="pricedes">{item.priceSttings?.currency} {priceStandardView(item.price)}</p>
                                //             {item.technologies?.map((tech) => {
                                //                 return (
                                //                     <span className='title-blog-box'>{tech}</span>
                                //                 )
                                //             })}


                                //             <div className='for-react-stars'>
                                //                 <span style={{ color: '#9ab' }}>View Product  </span>
                                //             </div>

                                //         </a>
                                //     </Link>
                                // </div>