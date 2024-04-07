import React, { Component } from 'react'
import WaveSurfer from 'wavesurfer.js';
import { imageAddress, msToHMS } from '../../../../utils/useful'
// import WaveSurfer from 'wavesurfer.js'
import CircularProgress from "../../../useful/CircularProgress";
import MessageStatusView from './MessageStatusView';


class MessageAudioBox extends Component {
    state = {
        isPlay: false,
        duration: "",
        soundDuration: ""
    }
    componentDidMount() {
        this.createWave()

        // const waveSurfer = WaveSurfer.create({
        //     container: this.waveform,
        //     cursorWidth: 0,
        //     barWidth: 2,
        //     barHeight: 2,
        //     height: 35,
        //     barGap: 2,  
        //     barRadius: 1,
        //     progressColor: "#007aff"
        // })

        // waveSurfer.load("/sounds/music.mp3")

        // waveSurfer.on('ready', () => {
        //     this.waveform = waveSurfer
        // })

        // return () => {
        //     waveSurfer.destroy()
        // }
    }
    componentDidUpdate(prevProps) {
        if (this.props.data?.voice && (prevProps.data?.voice != this.props.data?.voice)) {
            this.createWave()
        }
    }
    createWave() {

        let data = this.props.data

        if (data?.voice) {
            const waveSurfer = WaveSurfer.create({
                container: this.waveform,
                cursorWidth: 0,
                barWidth: 2,
                barHeight: 2,
                height: 35,
                barGap: 2,
                barRadius: 1,
                progressColor: "#007aff"
            })

            waveSurfer.load(imageAddress(data?.voice))
            console.log(imageAddress(data?.voice))

            waveSurfer.on('ready', () => {
                console.log('Ready')

                this.waveform = waveSurfer
            })

            return () => {
                waveSurfer.destroy()
            }
        }

    }
    playSound = () => {
        this.setState({ isPlay: true })
        this.audio.play()
        this.setState({ duration: "00:00" })
    }
    pauseSound = () => {
        this.setState({ isPlay: false })
        this.audio.pause()
    }
    getDuration = () => {
        console.log(this.audio.duration);
        if (this.audio?.duration !='Infinity') {
            console.log(this.audio?.duration)
            this.setState({ duration: msToHMS(this.audio.duration) })
            this.setState({ soundDuration: msToHMS(this.audio.duration) })
        }

    }

    getCurrentTime = (e) => {
        this.setState({ duration: msToHMS(e.target.currentTime) })
    };

    endOftheAudio = () => {
        this.setState({ isPlay: false })
    }


    render() {

        let data = this.props.data

        return (
            <>
                {data.voice && (
                    <audio onEnded={this.endOftheAudio} onTimeUpdate={(e) => this.getCurrentTime(e)} onLoadedMetadata={this.getDuration} style={{ display: "none" }} ref={audioPlayer => this.audio = audioPlayer} controls>
                        <source src={imageAddress(data.voice)} type="audio/mpeg" />
                    </audio>
                )}
                {/* <audio onEnded={this.endOftheAudio} onTimeUpdate={(e) => this.getCurrentTime(e)} onLoadedMetadata={this.getDuration} style={{ display: "none" }} ref={audioPlayer => this.audio = audioPlayer} controls>
                    <source src="/sounds/music.mp3" type="audio/mpeg" />
                </audio> */}
                <div style={{ width: 250 }}>

                    <div style={{ Width: 250, background: "#E9ECF6", borderRadius: 15, borderBottomRightRadius: 0, maxHeight: 70, padding: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                        {!data.tempFile ? (
                            <>
                                {!this.state.isPlay ? (
                                    <div onClick={() => this.playSound()} style={{ width: 30, height: 30, background: "#1379FF", borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                        <img src="/images/play.png" style={{ width: 20, height: 20 }} />
                                    </div>
                                ) : (
                                    <div onClick={() => this.pauseSound()} style={{ width: 30, height: 30, background: "#1379FF", borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                        <img src="/images/pause.png" style={{ width: 20, height: 20 }} />
                                    </div>
                                )}
                            </>) : (
                            <div style={{ marginRight: 7, cursor: "pointer", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                                <CircularProgress size={27} strokeWidth={2} progress={50} />
                            </div>
                        )
                        }

                        {/* <img style={{ width: 20, height: 20, marginRight: 7, cursor: "pointer" }} src='/images/download.png' />  */}




                        <div style={{ width: 130, height: 40 }} ref={el => this.waveform = el} />



                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p style={{ color: "gray", fontSize: 12 }}>{this.state.duration ? this.state.duration : ''}</p>
                            <div style={{ background: "#1379FF", width: 5, height: 5, borderRadius: 20, marginLeft: 5 }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", marginLeft: 10 }}>
                        <p className='mld-2' style={{ color: "gray", fontSize: 12 }}>{this.props.time}</p>
                        {!this.props.isOther && (
                            <MessageStatusView status={data.status} />
                        )}
                    </div>





                </div>
            </>
        )
    }
}

export default MessageAudioBox;