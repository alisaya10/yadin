import React, { Component } from 'react'
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'
import Members from '../sideBar/Members'





export default class TopicView extends Component {
    state = {
        showCollapse: null,
        active: false,
        selected: 0,
        checkBox: {},
        show: false,

        Members: [
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
            { img: "/assets/icons/Group 237788.svg", name: "Sara Mohseni", state: "Online", role: "Owner" },
        ],

        option: [
            { icon: "/assets/icons/manage-gray.svg", title: "Manage Group", color: "#444", key: "manage" },
            { icon: "/assets/icons/leave-red.svg", title: "Leave Group", color: "#E61515", key: "leave" },
        ],

        topic: [
            { icon: "", Name: "General", status: "Closed", sicon: "/assets/icons/messenger/lock.svg" },
            { icon: "", Name: "Music", status: "Open", sicon: "/assets/icons/messenger/lock.open.svg" },
            { icon: "", Name: "Movie", status: "Open", sicon: "/assets/icons/messenger/lock.open.svg" },
        ]
    }




    openFirstView = () => {
        this.firstView.showView()
    }



    render() {
        let type = this.state.type
        return (
            <div className='h-100'>
                <div className='flexcb p-2' ref={el => this.firstCurrentNode = el} style={{ borderBottom: "1px solid #eee" }}>
                    <div className='flexc'>
                        <button>
                            <img src='/assets/icons/arrow-left-blue.svg' />
                        </button>
                        <div>
                            <p className='font-size-14 weight-500'>Group Name</p>
                            <p className='font-size-10'>Totlal Members of Group</p>
                        </div>
                    </div>
                    <button onClick={() => this.openFirstView()}>
                        <img width={25} src='/assets/icons/more-v-black.svg' />
                    </button>
                </div>
                <div className='d-flex flex-column w-100'>
                    {this.state.topic.map((prop, index) => {
                        return (
                            <button className='text-start my-1 px-2 py-2 topic-hover mx-2 br-10'>
                                <div className=' w-100'>
                                    <div>
                                        <p className='font-size-14'>{prop.Name}</p>
                                        <div className='flexc mt-1' style={{ marginLeft: "-2px" }}>
                                            <img className='mrd-1' width={20} src={prop.sicon} />
                                            <p className='font-size-10' style={{ color: "#0085FF" }}>{prop.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
                <FixedView ref={el => this.firstView = el} nodeRef={this.firstCurrentNode} showFocus={false} topOffset={-10} xOffset={-110} zIndex={10} >
                    <div className='shadow-2 px-3 py-1 br-10' style={{ backgroundColor: "#fff", width: "max-Content" }}>
                        {this.state.option.map((prop, index) => {
                            return (
                                <div className='my-2'>
                                    <button className='flexc' onClick={() => this.props.changeStage(prop.key)}>
                                        <img src={prop.icon} />
                                        <p className='mld-3' style={{ color: prop.color }}>{prop.title}</p>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </FixedView>
            </div>
        )
    }
}
