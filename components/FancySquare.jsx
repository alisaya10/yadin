import React from 'react';

class FancySquare extends React.Component {

    state = {
        x: 0,
        y: 0
    }


    componentDidMount() {
        this.changeBack()
        setInterval(() => {
            this.changeBack()
        }, 2000);
    }

    changeBack() {

        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 30)
        let z = Math.floor(Math.random() * 50)
        let o = Math.floor(Math.random() * 2)
        console.log(o)
        let color = 'rgb( '+(124+ Number(x))+', '+(154 + y)+',  '+(242+ z)+')'
        // console.log(color)
        this.setState({ color, opacity: o })
    }



    render() {
        return (
            <div className="usecase-squer1" style={{transition:'all 2s', backgroundColor:this.state.color,opacity:this.state.opacity*0.5}}></div>

        )
    }
}

export default FancySquare