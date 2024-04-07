import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../stores/actionsList';

import Loader from 'react-loader-spinner'
import { checkTextTranslation, checkTranslation, imageAddress, pathMaker, phoneStandardView, priceStandardView, translate } from "../../utils/useful";
import HttpServices from "../../utils/Http.services";
import MainMessengerControl from "./create/MainMessengerControl";
// import CreateGroup from "./create/CreateGroup";
import CreateGroup from "./sideBar/CreateGroup";
import StagesManager from "../StagesManager";

class MessengerCreateNew extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.fetchContacts()
    }

    openSidebar = () => {
        this.fetchContacts()
    }

    fetchContacts = () => {
        console.log('here111')
        let body = this.props.variables
        this.setState({ isLoadingData: true })

        HttpServices.request('getMessengerApplets', body, (fetchResult, fetchError) => {

            // console.log(fetchResult)
            this.setState({ isLoadingData: false })
            if (fetchError) {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.loadDataFailed', description: fetchError.message })
                return
            }

            this.setState({ contactsList: fetchResult.info })
        })
    }

    openOne = (item, index) => {
        this.props.openOne(null, item)
    }
    changeStage = (key) => {
        this.stageManager.changeStage([key])
    }
    createGroup = (data) => {
        console.log("requestCreateMesseger")
        data.myId = this.props.myId
        HttpServices.request('createGroup', data, (fetchResult, fetchError) => {
            if (fetchError) {
                console.log('errrr', fetchError)
                return
            }
            if (fetchResult.info) {
                let name = fetchResult.info?.name
                fetchResult.info["**name"] = name
                let messenger = fetchResult.info
                if (!Array.isArray(messenger)) {
                    messenger = [messenger]
                }
                console.log('final info', fetchResult.info)
                this.props.actions.addMessengers(messenger)

                setTimeout(() => {
                    this.props.setMessenger(fetchResult.info, () => {
                    })
                }, 50);

            } else {
                this.props.actions.addNotif({ type: 'error', title: '{{lang}}errors.failedToSendDate', description: "Failed" })
            }
        })
    }

    render() {
        return (

                <StagesManager ref={el => this.stageManager = el} height={'100%'}>
                    <MainMessengerControl isApplet={this.props.isApplet} stage={0} stageName={'mainControl'} width={this.props.width}
                         fetchContacts={this.fetchContacts} openOne={this.openOne} changeStage={this.changeStage} contactsList={this.state.contactsList} />

                    <CreateGroup variables={this.props.variables} myId={this.props.myId} stage={1} stageName={'createGroup'} width={this.props.width} createGroup={this.createGroup} />
                    {/* <CreateSupport stage={2} stageName={'createSupport'} width={this.props.width} createGroup={this.createGroup} /> */}
                </StagesManager>


        )
    }

}



const mapStateToProps = state => ({ settings: state.settings, user: state.user, messengers: state.messengers })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(MessengerCreateNew);
