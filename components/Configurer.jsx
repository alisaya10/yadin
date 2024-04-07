import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../stores/actionsList';

class Configurer extends React.Component {

    lastSettings = {}

    componentDidMount() {
        this.init(true)
    }

    componentDidUpdate(prevProps) {

        if ((this.props.settingsInfo.headerTitle != prevProps.settingsInfo.headerTitle)) {
            this.init()
        }
        if (this.props.update != prevProps.update) {
            this.init()
        }
    }

    init(isNew) {
        setTimeout(() => {
            if (this.props.settingsInfo) {
                for (const [key, value] of Object.entries(this.props.settingsInfo)) {
                    if (isNew) {
                        this.lastSettings[key] = this.props.settings[key]
                    }
                    this.props.actions.changeSetting(key, value)
                }
            }
            // console.log(this.lastSettings)
        }, 10);

    }

    componentWillUnmount() {
        // console.log("UNMPUNT")
        // console.log(this.lastSettings)
        // if (this.props.changeOnUnmount) {
        let changeConfig = this.lastSettings
        // console.log(this.lastSettings)
        // if (changeConfig) {
        for (const [key, value] of Object.entries(changeConfig)) {
            // this.lastSettings[key] = value
            this.props.actions.changeSetting(key, value)
        }
        // }
        // }
    }


    render() {

        return (
            <div className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => ({ settings: state.settings, user: state.user })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
)(Configurer);
