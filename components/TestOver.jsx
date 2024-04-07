import React, { useState } from 'react'
import Collapsible from 'react-collapsible';
import Link from 'next/link';

// import { Agent } from 'https'


// export async function getServerSideProps(context) {
//     return {
//       props: {}, 
//     }
//   }


// const url = '<https://jsonplaceholder.typicode.com/users>'


// const agent = new Agent({ keepAlive: false })

// fetch(url, { agent })

//   export const getStaticProps = async (context) => {


//          const res = await fetch('https://jsonplaceholder.typicode.com/users');

//          const data = await res.json();


//          if (!data) {
//             return {
//               redirect: {
//                 destination: '/',
//                 permanent: false,
//                 notFound: true,
//             },
//           }
//         }


//          return {
//           props: { paymentList : data }
//          }

//      } 




// const TestOver = ({ products }) => {


//     const [open, setOpen] = useState(false)

//     const openToggle = () => {
//         setOpen(prev => !prev)

//     }
//     return (
//         <div>

//             {products.map((product) => (
//                 <>

//                     <div className="box-for-list-item-any">
//                         <i className={open ? 'fas fa-angle-down angel-item' : 'fas fa-angle-right angel-item'}></i>
//                         <li className="list-item-any" onClick={openToggle}></li>
//                     </div>

//                     <div className="inner-list-item" >
//                         <span className="inner-item-any">{product.name}</span>
//                         <span className="inner-item-any">{product.name}</span>
//                         <span className="inner-item-any">{product.name}</span>
//                         <span className="inner-item-any">{product.name}</span>
//                     </div>
//                 </>




//            ))}   


//         </div >
//     )
// }
// export async function getServerSideProps(context) {
//     const res = await fetch ('https://jsonplaceholder.typicode.com/users')
//     const data = await res.json();



//     return {
//        props : {
//            products : data.products
//        }
//     }
// }


// export default TestOver;






const TestOver = ({ item, list,document }) => {

    const [open, setOpen] = useState(false);

    const openToggle = () => {
        setOpen(prev => !prev)

    }



    return (

        <>

            <div className="box-for-list-item-any">
                <i style={{ color: "#C0003A",transition:'all 0.5s' }} className={'fas fa-angle-right angel-item '+(!open ? 'rotate-90' : '')}></i>
                <li className="list-item-any" onClick={openToggle}>{`${item.values?.title}`}</li>
            </div>
            <Collapsible open={!open ? true : false}>
                {list.map((prop, index) => {

                    if (prop.categories.includes(item._id)) {
                        let active = false
                        if(prop._id == document?._id){
                            active=true
                        }
                        return (
                            <Link href={"/developers/doc/" + prop._id} key={prop._id}>
                                <a className="inner-list-item">
                                    <span className="inner-item-any" style={{color:active?'#c0003a':null}}>{prop.title}</span>
                                </a>
                            </Link>
                        )
                    }
                })}


            </Collapsible>

        </>
    )
}


export default TestOver;
