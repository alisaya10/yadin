import React from "react";
import { checkTextTranslation } from "../../utils/useful";
import DateInput from "../inputs/DateInput";
import FromToInput from "./FromToInput";

// used for making the prop types of this component
// import PropTypes from "prop-types";

class DateFilterInput extends React.Component {
    state = {
        value: '',
        showValue: '',
        operator: 'between'
    }

    componentDidMount() {
        if (this.props.data) {
            let data = this.props.data
            if (typeof this.props.data == 'string') {
                data = this.stringToArray(this.props.data)
            }

            this.setState({ data})
        }
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props.data)
        if (prevProps.data != this.props.data && this.props.data != this.state.data) {
            let data = this.props.data
            if (typeof this.props.data == 'string') {
                data = this.stringToArray(this.props.data)
            }
            // console.log(data)
            this.setState({ data: this.props.data ? data : null })
        }
    }

    stringToArray(data) {
        let final = []
        if (data) {
            if (Array.isArray(data)) {
                return data
            } else {
                return data.split(',')
            }
        }

        return final
    }


    changeValue = (key, value, extra) => {
        let data = this.state.data
        console.log(data)
        if (!Array.isArray(data)) {
            data = []
        }
        // console.log(value)
        // console.log(key)
        data[key] = value

        if (key === 1 && value === null) {
            data.splice(1, 1)
        }
        if (key === 0 && value === null && data[1] === null) {
            data = null
        }

        console.log(data)
        this.setState({ data }, () => {
            this.props.changeValue(this.props.header.key, this.state.data, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
        })
    }


    render() {
        return (
            <div className='mt-0 w-100 flexc text-center' >
                <div className="px-2" style={{ backgroundColor: '#ffffff90', borderRadius: 8, flex: 1 }}>
                    <DateInput data={this.state.data ? this.state.data[0] : null} header={{ key: 0, information: { placeholder: 'From' } }} changeValue={this.changeValue} />
                </div>
                <p className='mx-1'>-</p>
                <div className="px-2" style={{ backgroundColor: '#ffffff90', borderRadius: 8, flex: 1 }}>
                    <DateInput data={this.state.data ? this.state.data[1] : null} header={{ key: 1, information: { placeholder: 'To' } }} changeValue={this.changeValue} />
                </div>

            </div>
        );
    }
}

export default DateFilterInput;
