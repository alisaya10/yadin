import React, { Component } from 'react'

class RecentlyMap extends Component {
    render() {
        return (
            <div className="main-card">
            <div className="image-card-recent">
            <img src={`${this.props.data.img}`} alt="" className="card-recently" />

            </div>
            <h4 className="card-text-recent">{this.props.data.header}</h4>
            <p className="card-text-paragraph">{this.props.data.text}</p>
            <button className="slide-up">Start Series</button>
        </div>
        )
    }
}

export default RecentlyMap;
