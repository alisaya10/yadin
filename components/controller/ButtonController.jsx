import React from 'react';
// import '../../styles/controller.css';

class ButtonController extends React.Component {

    state = {

    }



    render() {

        return (
            <div className="flexcc flex-column text-center">
                <button className="controller-button1 active" >
                    <div className="controller-circle"></div>
                    <div className="controller-circle1"></div>

                    <img src="/images/icons/power.png" className="controller-button1-img" />
                </button>
                <p className="controller-p1">Component</p>
                <p className="controller-p2">A technology-first approach to internet of things for public</p>
            </div>
        )

    }
}


export default ButtonController;