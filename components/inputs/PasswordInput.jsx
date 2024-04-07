import React from 'react'
import { checkTextTranslation } from '../../utils/useful'

class PasswordInput extends React.Component {
  state = {
    showPassword: false,
    val : ""
  }




  changeInputValue(target , valueInp) {
    let value = (target.validity.valid) ? target.value : null
    if (value !== null) {
      this.props.changeValue(this.props.header.key, value, this.props.extra)
    }
    this.setState({val : valueInp} , ()=>{
      // console.log("this is val",this.state.val)
    })
  }



  render() {
    return (
      <div className="w-100 h-100 flexc">
        <img onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }} className='pl-2' src='/images/icons/eye.svg' style={{cursor : 'pointer'}} />
        <input style={{ textAlign: this.state.val.length > 0 ? "left" : "right" }} ref={el => this.input = el} type={this.state.showPassword ? 'text' : 'password'} autoFocus={this.props.header.information?.autoFocus} value={this.props.data ? this.props.data : ''} onChange={(e) => this.changeInputValue(e.target , e.target.value)} placeholder={checkTextTranslation(this.props.header.information.placeholder)} className="transpanet-input" />
      </div>
    )
  }
}

export default PasswordInput;