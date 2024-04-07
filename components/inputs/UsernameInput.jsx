import React from 'react'
import HttpServices from '../../utils/Http.services'
import { checkTextTranslation } from '../../utils/useful'

class TextInput extends React.Component {
    state = {
        username: '',
        isValid: 0
    }
    timer

    changeInputValue=(target)=> {
        // console.log(target.validity.valid)

        if (/^[a-zA-Z0-9-.]+$/.test(target.value) || target.value == '') {

            // console.log("OK!")

            this.setState({ username: target.value, isValid: 0 }, () => {

                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.props.setStatus(null,this.props.header.key,'{{lang}}errors.usernamePattern')


                if (/^\w+(\-\w+|\.\w+)?$/.test(target.value) && target.value.length>=4 && target.value.length<=30) {

                    this.props.changeValue(this.props.header.key, this.state.username, this.props.extra)

                    this.timer = setTimeout(() => {
                        // console.log("timer DONE")
                        this.checkUsername()
                    }, 1000);

                } else {

                    this.timer = setTimeout(() => {
                        this.props.setStatus("error",this.props.header.key,'{{lang}}errors.usernamePattern')
                        // console.log("UNVALID")
                        // this.checkUsername()
                    }, 1000);

                }

            })
        }
    }


    checkUsername = () => {
        let data = { username: this.state.username }
        HttpServices.request(this.props.header.information.address, data, (fetchResult, fetchError) => {
            // console.log(fetchError)
            if (fetchError) { return }
            // console.log(fetchResult)
            // console.log("valid: " + fetchResult.info.valid)

            if(fetchResult.valid){
                this.props.setStatus('valid',this.props.header.key,true)
                // this.props.changeValue(this.props.header.key, this.state.username, this.props.extra)

            }else{
                this.props.setStatus("error",this.props.header.key,'{{lang}}errors.usernameIsTaken')
            }
            // this.props.history.push('/')

        })
    }


    render() {
        return (
            <div className="w-100 h-100">
                <input id={this.props.header.key} spellCheck="false" autoCapitalize={false} autoCorrect={"off"} autoComplete="off" ref={el => this.input = el} value={this.state.username ? this.state.username : ''} onChange={(e) => this.changeInputValue(e.target)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} disabled={this.props.header.information?.disabled} className="transpanet-input" style={{ borderRadius: 6, textTransform: 'lowercase',fontWeight:'bold',fontSize:20 }} />
            </div>
        )
    }
}

export default TextInput;