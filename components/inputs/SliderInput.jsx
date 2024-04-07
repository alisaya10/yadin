import React from "react";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import Slider, { SliderTooltip } from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

// const handle = props => {
//     const { value, dragging, index, ...restProps } = props;
//     // console.log(value)
//     return (
//         <SliderTooltip
//             prefixCls="rc-slider-tooltip"
//             overlay={`${value}`}
//             visible={value != null ? true : false}
//             placement={props.tooltipPosition ?? "top"}
//             key={index}
//         >
//             <Handle value={value} {...restProps} />
//         </SliderTooltip>
//     );
// };

class Header extends React.Component {


    state = {
        value: [],
        enableTooltips: false
    }

    conditionalSettings(param, condition) {
        if (this.props.settings) {
            if (this.props.settings[param] == condition) {
                return true
            }
        }
        return false
    }

    componentDidMount() {
        this.setState({ data: this.stringToArray(this.props.data) })
        setTimeout(() => {
            this.setState({ enableTooltips: true })
        }, 500);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data != this.props.data && this.props.data != this.state.data) {
            this.setState({ data: this.stringToArray(this.props.data) })
        }
    }

    stringToArray(data) {
        let final = []

        if (this.props.header?.information?.type == 'slider') {
            return data
        }
        if (data) {
            if (Array.isArray(data)) {
                return data
            } else {
                return data.split(',')
            }
        }
        return final
    }

    changeValue(e) {
        let info = this.props.header.information
        let value
        if (this.props.header?.information?.type == 'slider') {
            value = e
        } else {
            let value = [Number(info.min) == e[0] ? null : e[0], Number(info.max) == e[1] ? null : e[1]]

            if (value[1] === null) {
                value.splice(1, 1)
            }
            if (value[0] === null && value[1] === null) {
                value = null
            }
        }
        // console.log(value)
        this.props.changeValue(this.props.header.key, value)
        // this.setState({data:value})
    }

    onChange = (e) => {
        // let info = this.props.header.information
        // let value = [Number(info.min)==e[0]?null:e[0],Number(info.max)==e[1]?null:e[1]]
        // console.log(e)
        this.setState({ data: e })

        // this.props.changeValue(this.props.header.key, value)

    }

    handle = (props) => {
        const { value, dragging, index, ...restProps } = props;
        return (
            <SliderTooltip
                prefixCls="rc-slider-tooltip"
                overlay={`${value}`}
                visible={this.props.header?.information?.alwaysShowTooltip ? (this.state.enableTooltips ? (value != null ? true : false) : false) : dragging}
                placement={this.props.header?.information?.tooltipPosition ?? "top"}
                key={index}
            >
                <Handle value={value} {...restProps} />
            </SliderTooltip>
        );
    }

    render() {
        // let data = this.props.data
        let info = this.props.header.information

        let data = this.state.data
        if (!Array.isArray(data) && info.type != 'slider') {
            data = []
        }

        // let middle = Number(data.values.max) + Number(data.values.min)
        return (
            <div className='mt-0 w-100' style={{ position: 'relative' }}>
                <div style={{ padding: '0px 8px 0px 8px' }}>
                    {info.type == 'slider' ? (
                        <Slider
                            min={info?.min ? Number(info?.min) : 0}
                            max={info?.max ? Number(info?.max) : 1}
                            value={Number(data)}
                            onAfterChange={e => this.changeValue(e)}
                            onChange={e => this.onChange(e)}
                            step={info?.steps ? Number(info?.steps) : 1}
                            dots={false}
                            handle={this.handle}
                            disabled={info?.disabled}
                            trackStyle={info.trackStyle}
                            railStyle={info.railStyle}
                            handleStyle={info.handleStyle}
                            tooltipPosition={info.tooltipPosition}
                        // handle={true}

                        />
                    ) : (
                        <Range
                            min={info?.min ? Number(info?.min) : 0}
                            max={info?.max ? Number(info?.max) : 1}
                            value={[Number(((data[0] != null && data[0] != '') ? data[0] : info?.min)), Number(((data[1] != null && data[1] != '') ? data[1] : info?.max))]}
                            onAfterChange={e => this.changeValue(e)}
                            onChange={e => this.onChange(e)}
                            step={info?.steps ? Number(info?.steps) : 1}
                            dots={false}
                            disabled={info?.disabled}

                        // handle={true}

                        />
                    )}
                </div>
                {!info.hideNumber && (
                    <div className="d-flex px-1 " style={{ marginTop: 5, justifyContent: 'space-between' }}>
                        <p className="text-smaller opacity-7 text-bold" style={{ color: '#789' }}>{info?.min}</p>
                        <p className="text-smaller opacity-7 text-bold" style={{ color: '#789' }}>{info?.max}</p>
                    </div>
                )}

            </div>
        );
    }
}

export default Header;
