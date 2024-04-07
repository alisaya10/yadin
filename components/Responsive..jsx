import React from 'react'

//// This component Recieves width,display,media

class Responsive extends React.Component {
    state = {
        width: '100%',
        display: 'none'
    }


    componentDidMount() {
        this.updateWidth()
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props.width)
        if (prevProps.width != this.props.width || prevProps.media != this.props.media) {
            this.updateWidth()
        }
    }

    updateWidth = () => {


        let defaults = {
            xl: 1200,
            lg: 992,
            md: 768,
            sm: 576,
            xs: 0
        }

        let width = '100%'
        let display = this.props.display ?? 'block'

        let minWidth = 0

        if (this.props.media) {
            for (const [key, value] of Object.entries(this.props.media)) {
                let thisWidth = 0
                if (Number(key)) {
                    thisWidth = Number(key)
                } else {
                    thisWidth = defaults[key] ?? 0
                }


                if (thisWidth >= minWidth && thisWidth <= this.props.width) {
                    minWidth = thisWidth
                    width = value
                }
            }
        }

        if (!width.includes('%') && !width.includes('px') && Number(width)) {
            if (Number(width) <= 12) {
                width = String(((Number(width) / 12) * 100) + '%')
            }
        }

        if (width == 'none') {
            display = 'none'
            width = 0
        }




        if (width != this.state.width) {
            this.setState({ width })
        }
        if (display != this.state.display) {
            this.setState({ display })
        }
    }



    render() {
        return (
            <div className={'responsive ' + (this.props.className??'')} style={{ ...this.props.styles, ...{ height: this.props.height, width: this.state.width, display: this.state.display } }} >
                {this.props.children}
            </div>
        )
    }
}

export default (Responsive);