import React, { createContext, useReducer } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../stores/actionsList';
// import { checkTextTranslation } from '../utils/useful';
// var ReactDOM = require('react-dom')
import NotifBox from './boxes/NotifBox'
// import  from 'react';


// export const NotifContext = createContext()

class NotifManager extends React.Component {






    removeNotif = (id) => {
        // let list = this.state.list
        // list = list.filter(a => a.id !== id)
        // this.setState({ list })
        this.props.actions.removeNotif(id)
    }


    // removeNotif = (id) => {
    //     console.log("REMOVE " + id)
    //     this.props.actions.removeNotif(id)
    // }

    render() {
        return (
            <div>
                <div className={"notifManager no-scrollbar"} >

                    {/* {state.map((prop, index) => {
                    return (
                        <NotifBox {...prop} key={prop.id} dispatch={dispatch} />
                    )
                    // removeNotif={this.removeNotif}

                })} */}

                    {Array.isArray(this.props.nofits?.list) && this.props.nofits.list.map((prop, index) => {
                        return (
                            <NotifBox {...prop} key={prop.id} removeNotif={this.removeNotif} />
                        )

                    })}
                </div>

                {this.props.children}
            </div>
        )
    }

}

// export default NotifManager

const mapStateToProps = state => ({ settings: state.settings, user: state.user, nofits: state.notifs })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotifManager);
