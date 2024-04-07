import React, { Component } from 'react'

import RecentlyMap from './RecentlyMap';

class Recently extends Component {


    recentCard = [
        {
            header: 'Build a Voting App',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card.png',
        },
        {
            header: 'Beginning TypeScript',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card2.png',

        },
        {
            header: 'Laravel Queue Mastery',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card3.png',

        },
        {
            header: 'Prossional PHP...',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card4.png',

        },
        {
            header: 'Developer Practice',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card5.png',

        },
        {
            header: 'Lets Build A Forum wit...',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card6.png',

        },
        {
            header: 'HTML and CSS Workshop',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card7.png',

        },
        {
            header: 'Learn inertia With Jeffrey',
            text: 'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
            img: 'assets/card8.png',

        },
        // {header:'Modals with the TALL',
        //  text:'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
        // img:'assets/card9.png',

        // },
        // {header:'How to Read Code:...',
        //  text:'Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur ipsum dolor sit amet consectetur adipisicing elit. Molestias, quia?',
        // img:'assets/card10.png',
        // },
    ]

    // style={{ backgroundImage: `url(${background})` }}

    render() {
        return (
            <div className="container-fluid r" >
                <div className="wrapper">
                    <div className="title-main-recent">
                        <h2 className="recently-title">More Recently Updated Series</h2>
                    </div>
                    <div className="main-grid-recently">
                        {this.recentCard.map((prop, index) => {
                            return (
                                <RecentlyMap
                                    data={prop}
                                />
                            )
                        })}



                    </div>
                    <div className="show-more">
                        <button className="show-more-btn">show more</button>
                    </div>
                </div>

            </div>
        )
    }
}
export default Recently;
