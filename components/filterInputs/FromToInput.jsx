import React from 'react'
import { checkTextTranslation } from '../../utils/useful'
import inputComponents from '../inputs/inputComponents'

class FromToInput extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.setState({ data: this.stringToArray(this.props.data) })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data && this.props.data != this.state.data) {
            this.setState({ data: this.stringToArray(this.props.data) })
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

    changeInputValue = (target) => {
        // let value = (target.validity.valid) ? target.value : null
        if (Array.isArray(this.state.data)) {
            this.props.changeValue(this.props.header.key, this.state.data)
        }
    }

    changeValue = (key, value, extra) => {
        let data = this.state.data
        // console.log(data)
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

        // console.log(data)
        this.setState({ data })
    }



    render() {
        let Component = inputComponents[this.props.header.information.inputType]
        let data = this.state.data
        if (!Array.isArray(data)) {
            data = []
        }

        if (Component) {
            return (
                <div className="w-100 h-100 flexc ">
                    <div className="from-to-input-container">
                        <Component header={{ key: 0, information: { placeholder: 'From' } }} data={data[0]} changeValue={this.changeValue} />
                    </div>
                    <div className="mx-1">
                        <p>-</p>
                    </div>
                    <div className="from-to-input-container"  >
                        <Component header={{ key: 1, information: { placeholder: 'To' } }} data={data[1]} changeValue={this.changeValue} />
                    </div>
                    <div className="mld-1 " style={{ alignSelf: 'stretch' }}>
                        <button onClick={this.changeInputValue} className="flexcc h-100 from-to-but" >
                            <img className="" src="/images/nexts.png" width="13px" />
                        </button>
                    </div>

                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default FromToInput;