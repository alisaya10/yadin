import React, { Component } from 'react'
import SwitchInput from '../../../inputs/SwitchInput'
import TextInput from '../../../inputs/TextInput'
import StagesManager from '../../../StagesManager'
import Administrators from './Administrators'
import MessengerPermission from './MeesengerPermission'
import OverviewStatistic from './OverviewStatistic'
import SupportInfo from './SupportInfo'





export default class SupportStatistic extends Component {
    state = {
        tabs: [
            { title: "Overview", key: "overview" },
            { title: "Rating", key: "rating" },
            { title: "Administrators", key: "administrators" },
        ],

        stage: "overview"



    }

    render() {
        return (
            <div className='h-100'>
                <div className='flexcb px-2 py-3' style={{ borderBottom: "1px solid #ddd" }}>
                    <button className='flexc' onClick={() => this.props.changeStage("supportinfo")}>
                        <img width={18} src='/assets/icons/arrow-left-blue.svg' />
                        <p className='font-size-12' style={{ color: "#0085ff" }}>Support Info</p>
                    </button>
                    <div className='px-2'>
                        <p className='font-size-16 weight-500' style={{ color: "#222" }}>Statistics</p>
                    </div>
                </div>
                <div className='flexcb px-3' style={{ backgroundColor: "#f6f6f6", borderRight: "#ddd" }}>
                    {this.state.tabs.map((prop, index) => {
                        return (
                            <div>
                                <button className='py-3' onClick={() => { this.stageManager.changeStage(prop.key); this.setState({ stage: prop.key }) }}>
                                    <p className={" font-size-12 transition-main " + (this.state.stage == prop.key ? "main-blue" : '')}>{prop.title}</p>
                                </button>
                                {this.state.stage == prop.key ? (

                                    <div className='w-100 transition-main' style={{ backgroundColor: "#007AFF", height: "2px", borderRadius: "5px" }}></div>
                                ) : (
                                    <div className='w-100 transition-main' style={{ background: "transparent", height: "2px", borderRadius: "5px" }}></div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className='w-100 h-100 scroll-no-scrollbar'>
                    <StagesManager ref={el => this.stageManager = el} fast={true}>
                        <OverviewStatistic width={this.props.width} changeStage={this.changePage} stage={1} stageName={'overview'} />
                    </StagesManager>
                </div>
            </div>
        )
    }
}
