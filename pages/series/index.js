import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import Description from '../../components/Description';
import Header from '../../components/Header'
import SectionDiv from '../../components/SectionDiv';

// export const getStaticProps = async () => {



//     const res = await fetch('https://jsonplaceholder.typicode.com/users');

//     const data = await res.json();
//     return {
//         props: { paymentList: data }
//     }

// }

// export const getStaticProps = async () => {


//     const res = await fetch('https://jsonplaceholder.typicode.com/users');

//     const data = await res.json();


//     return {
//      props: { paymentList : data }
//     }

// } 






const Home = ({ paymentList }) => {


    return (

        <>

            <Header />

            <Banner />

            <Description />

            <SectionDiv />


            {/* <div>
                <h1>
                    fetch data
                </h1>
                {paymentList.map(item => (
                    <div
                    key={item.id}>
                        <a>
                            <h4>
                            {item.name}

                            </h4>
                        </a>
                        </div>
                ))}

            </div> */}



        </>





    )
}


export default Home;
