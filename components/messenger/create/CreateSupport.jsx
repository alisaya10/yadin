import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../stores/actionsList';

import { checkTextTranslation, checkTranslation, imageAddress, pathMaker, phoneStandardView, priceStandardView, translate } from "../../../../utils/useful";
import FormViewer from "../../../FormViewer";
import TextInput from "../../../inputs/TextInput";

class CreateSupport extends React.Component {
    state = {
        supportName: '',
        user: '',
        header: [
            { key: 'hubs', type: 'GlobalUserMultiInput', information: { label: '{{lang}}Add Admins', address: 'searchUser', filter: {}, fields: { title: 'fullname', description: 'username', value: '_id', image: 'image' }, type: 'api', isSearchable: true, placeholder: '{{lang}}select', required: false, } },
            // { key: 'assignee', type: 'MultiSelectInput', information: { label: '{{lang}}Assignee', address: 'searchUser', filter: {}, fields: { title: 'fullname', description: 'username', value: '_id', image: 'image' }, type: 'api', isSearchable: true, placeholder: '{{lang}}select', required: false, } },
        ],
    }

    changeValue = (key, value) => {
        this.setState({ [key]: value })
    }
    createSupport = () => {
        
        // let hubs = this.form.getForm()
        // if (this.state.supportName && hubs.hubs.length != 0) {
        //     let data = {}
        //     data.hubs = hubs.hubs
        //     data.type = 'support'
        //     data.supportName = this.state.supportName
        //     this.props.createGroup(data)
        // }
    }
    render() {
        return (
            <div className="w-100 pt-3 px-3 scroll-no-scrollbar">
                <div className="pb-3">
                    <TextInput data={this.state.supportName} changeValue={this.changeValue} header={{ key: 'supportName', information: { rows: 1, placeholder: '{{lang}}Support Name' } }} />
                </div>
                <div>
                    <FormViewer ref={el => this.form = el} headers={this.state.header} inputClass={'modern-input'} />
                </div>
                <div style={{ backgroundColor: '#fefe' }} onClick={() => this.createSupport()}>
                    <button >
                        Submit
                    </button>
                </div>
            </div>
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
)(CreateSupport);