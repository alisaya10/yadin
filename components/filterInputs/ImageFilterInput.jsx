import React from "react";


class ImageFilterInput extends React.Component {
    state = { checked: true }
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
        this.props.changeValue(this.props.header.key, newValue, this.props.extra)
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

export default ImageFilterInput;
