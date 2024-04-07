import React from 'react'
import { ChromePicker } from 'react-color'

class ColorInput extends React.Component {

    state = {
        displayColorPicker: false,
        // color: '#ee5050aa'
    };

    handleClick = () => {
        //   console.log()
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };


    handleChange = (e) => {
        let color = e.hex
        if (color != 'transparent') {
            color = color + Math.round(e.rgb.a * 255).toString(16)
        }
        // console.log(e.hex + Math.round(e.rgb.a * 255).toString(16))
        // this.setState({ color })
        this.props.changeValue(this.props.header.key, color, this.props.extra)

    }


    chooseFontColor(rawcolor) {
        let color = "#fff"

        if (isNaN(Number(rawcolor[1])) || isNaN(Number(rawcolor[3])) || isNaN(Number(rawcolor[5]))) {
            color = "#000"
        }
        if (!isNaN(Number(rawcolor[7])) && Number(rawcolor[7]) < 6) {
            color = "#000"
        }

        return color
    }

    render() {
        const popover = {
            position: 'fixed',
            zIndex: '10',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }

        return (
            <div>
                <button className="w-100 h-100" onClick={this.handleClick}>

                    <div className={"flexcc"} style={{ height: '34px', width: '100px', border: '1px solid #eee', borderRadius: 8, backgroundColor: this.props.data }}>
                        <p style={{ color: this.chooseFontColor(this.props.data) }}>{this.props.data}</p>
                    </div>
                </button>
                { this.state.displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={this.handleClose} />
                    <ChromePicker color={this.props.data} onChange={this.handleChange} />
                </div> : null}
            </div>
        )
    }
}

export default ColorInput;