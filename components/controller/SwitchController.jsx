import React from 'react';


class SwitchController extends React.Component {

    state = {

    }



    render() {

        return (
            <div className="flexcc flex-column text-center " >

                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
                <p className="controller-p1">Component</p>
                <p className="controller-p2">A technology-first approach to internet of things for public</p>


            </div>
        )

    }
}


export default SwitchController;