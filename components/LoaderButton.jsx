import React from 'react';
import Loader from 'react-loader-spinner'
import { checkTextTranslation } from '../utils/useful'

export default class LoaderButton extends React.Component {

    state = {
        isLoading: false,
        opacity: 1
    }

    onClick = () => {
        if (!this.props.isLoading) {
            this.props.onClick()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLoading !== prevProps.isLoading) {
            this.setState({ opacity: 0 })
            setTimeout(() => {
                this.setState({ isLoading: this.props.isLoading })
                this.setState({ opacity: 1 })
            }, 300);
        }
    }

    render() {
        return (
            <div onMouseOver={() => this.setState({ opacity: 0.8 })} onClick={() => this.onClick()} onMouseLeave={() => this.setState({ opacity: 1 })} className={'flexcc ' + this.props.className} >
                {!this.state.isLoading ? (
                    <button className={this.props.buttonClassName} style={{ ...this.props.buttonStyle, ...{ opacity: this.state.opacity, transition: 'all 0.5s' } }} >
                        <p style={{ whiteSpace: 'pre-wrap' }}>{checkTextTranslation(this.props.text)}</p>
                    </button>
                ) : (
                    <div className='flexcc'>
                        <Loader
                            type={this.props.type ?? "Oval"}
                            color={this.props.color ?? "#202020"}
                            height={this.props.width ?? 50}
                            width={this.props.height ?? 50}
                        />
                    </div>
                )}
            </div>

        )
    }
}