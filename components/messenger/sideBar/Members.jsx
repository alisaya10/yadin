import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { imageAddress } from '../../../../utils/useful'
import * as actions from '../../../../stores/actionsList';
import FixedView from '../../../FixedView'
import SwitchInput from '../../../inputs/SwitchInput'





class Members extends Component {
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
        ],

        option: [
            // { icon: "/assets/icons/manage-gray.svg", title: "Manage Group", color: "#444", key: "manage" },
            { icon: "/assets/icons/leave-red.svg", title: "Remove form group", color: "#E61515", key: "remove" },
        ]
    }



    // openSidebar = () => {
    //     this.sidebarView.openSidebar()
    // }

    // openFirstView = () => {
    //     this.firstView.showView()
    // }

    openMemberView = () => {
        this.memberView.showView()
    }

    
    render() {
        return (
            <div className='w-100'>
                <div className=''>
                    <div className='flexc w-100'>
                        <img width={30} src={imageAddress(this.props.data.img, 'profile', 'small')} />
                        <div className='mld-3 w-100'>
                            <div className='flexcb w-100'>
                                <p className='font-size-14 weight-500' style={{ color: "#444" }}>{this.props.data.name}</p>
                                <div className='flexc' ref={el => this.memberNode = el}>
                                    <p className='font-size-10 mrd-4' style={{ color: "#0085FF" }}>{this.props.data.role}</p>
                                    <img width={22} src='/assets/icons/more-v-black.svg' onClick={() => this.openMemberView()} />
                                </div>
                            </div>
                            <div>
                                <p className='font-size-12 weight-300' style={{ color: "#999" }}>{this.props.data.state}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <FixedView ref={el => this.memberView = el} nodeRef={this.memberNode} showFocus={false} topOffset={-35} xOffset={120} zIndex={10} >
                    <div className='shadow-2 px-3 py-1 br-10' style={{ backgroundColor: "#fff", width: "max-Content" }}>
                        {this.state.option.map((prop, index) => {
                            return (
                                <div className='my-2' onClick={() => { prop.key == 'remove' && this.props.leaveGroup('removed') }} >
                                    <button className='flexc'>
                                        <img width={22} src={prop.icon} />
                                        <p className='mld-2' style={{ color: prop.color }}>{prop.title}</p>
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

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Members);
