import React from 'react';

class FancyCircle extends React.Component {

    state = {
        x: 0,
        y: 0
    }


    componentDidMount() {
        this.changePosition()
        setInterval(() => {
            this.changePosition()
        }, 4000);
    }

    changePosition(){
        let x = Math.floor(Math.random() * 250)
        let y = Math.floor(Math.random() * 250)
        this.setState({x,y})
    }



    render() {
        return (
            <div className="" style={{flex:1}}>
                <div className="usecase-round1" style={{mixBlendMode:'hue', transition:'all 4s', transform: 'translate(' + this.state.x + 'px,' + this.state.y + 'px)' }}></div>
            </div>
        )
    }
}

export default FancyCircle