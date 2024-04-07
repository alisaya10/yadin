import React from "react";
// used for making the prop types of this component
// import PropTypes from "prop-types";

class SwitchFilterInput extends React.Component {
    state = {
        checked: true,
        operator: '='
    }
    componentWillMount() {
    }

    checkSettings(param) {
        if (this.props.settings) {
            return this.props.settings[param]
        } else {
            return false
        }
    }

    changeValue = (target) => {
        // console.log(target.value)
        // let newValue = false
        // if(target.value == 'on' || target.value == true){
        //     newValue = true
        // }
        let newValue = this.props.data != null ? this.props.data : false
        newValue = !newValue
        // console.log(newValue)
        this.props.changeValue(this.props.header.key, newValue, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
        // this.setState({ checked: !this.state.checked })
    }

    render() {
        let info = this.props.header?.information
        return (
            <div className='mt-1 '>
                <label className="switch">
                    <input type="checkbox"
                        name={this.props.header.key}
                        id={this.props.header.key}
                        checked={this.props.data != null ? this.props.data : false}
                        disabled={info?.disabled}
                        onChange={e => this.changeValue(e.target)} />
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}

export default SwitchFilterInput;
