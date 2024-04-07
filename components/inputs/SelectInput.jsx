import React from "react";
import Loader from 'react-loader-spinner'
import HttpService from '../../utils/Http.services';
import { checkTranslation } from "../../utils/useful";

class SelectInput extends React.Component {
  state = {
    options: [],
    isLoading: false
  }

  componentDidMount() {
    this.init(true)
  }


  componentDidUpdate(prevProps) {

    // console.log(this.props.data)

    if (this.state.options != this.props.header.information.items && this.props.header.information.type === "local") {
      this.setState({ options: this.props.header.information.items })
    }
  }

  init(mount) {


    // if(!mount){
    //     this.props.changeValue(this.props.header.key, null, this.props.extra) 
    // }
    if (this.props.header.information) {
      if (this.props.header.information.type === "local") {
        this.setState({ options: this.props.header.information.items })
      } else if (this.props.header.information.type === "api") {
        this.fetch()
      }
    }

  }



  fetch() {

    // console.log("HERE")
    // console.log(this.props.header.information.filter)
    let filter = this.props.header.information.filter
    if (this.props.header.information.sort) {
      filter.sort = this.props.header.information.sort
    }

    for (const [key, value] of Object.entries(filter)) {
      if (/\{\{(.*?)\}\}/.test(value)) {

        if (this.props.variables) {
          filter[key] = this.props.variables[value.replace(/{/g, '').replace(/}/g, '')]
        }
        // console.log("VAR")
      }
    }

    // console.log(filter)
    // console.log(this.props.variables)
    this.setState({ isLoading: true })
    HttpService.request(this.props.header.information.address, filter, (fetchResult, fetchError) => {
      if (fetchError) { return }
      // console.log(fetchResult)
      var newData = []
      fetchResult.info.forEach(element => {

        var newTitle = this.spliter(element, this.props.header.information.fields.title)
        var newValue = this.spliter(element, this.props.header.information.fields.value)

        newData.push({ value: newValue, title: newTitle })
      });
      // console.log("NEW DATA")
      // console.log(newData)
      // setTimeout(() => {

      if (this.props.data != null) {
        let found = false
        // console.log(this.props.data)

        newData.forEach(element => {
          // console.log(element.value)
          if (element.value == this.props.data) {
            found = true
          }

        });

        if (found == false) {
          // console.log("DWLKFJWLK")
          // this.props.changeValue(this.props.header.key, null, this.props.extra)
        }

      }


      this.setState({
        options: newData,
        isLoading: false
      })
      // }, 1000);


    })

  }


  spliter(source, string) {
    var stringArray = string.split('.')
    var finalString = source
    stringArray.forEach(element => {
      finalString = finalString[element]
    });
    return finalString
  }


  conditionalSettings(param, condition) {
    if (this.props.settings) {
      if (this.props.settings[param] === condition) {
        return true
      }
    }
    return false
  }


  changeValue = (e) => {
    this.props.changeValue(this.props.header.key, e.target.value, this.props.extra)
  }


  render() {
    let dataValue = ''
    if (this.props.data) {
      dataValue = typeof this.props.data == "object" ? (this.props.data._id ?? this.props.data.id) : this.props.data
    }

    // console.log(this.props.header.information)
    return (
      <div className='w-100' style={{ position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <select value={dataValue} disabled={this.props.disabled || this.props.header.information?.disabled} onChange={e => { this.changeValue(e) }} className=' form-control' style={{ WebkitAppearance: 'none', border: 'none', boxShadow: 'none', backgroundColor: 'transparent', color: '#a0a0a0', width: '100%', padding: 0 }}>
            <option disabled={this.props.header.information.required ? true : false} hidden={this.props.header.information.required ? true : false} value="">{checkTranslation(this.props.header.information.placeholder ?? 'Select ...')}</option>

            {Array.isArray(this.state.options) && this.state.options?.map((prop, index) => {

              return (
                <option key={index} value={prop.value} className="" style={{ background: "#242424", border: "1px solid #a0a0a0", color: "#a0a0a0", fontSize:"16px" }}>{prop.title}</option>
              )
            })}
          </select>

          {this.conditionalSettings('showInfo', true) && (
            <p onClick={() => { if (!this.state.isLoading) { this.props.showInfo(this.props.header.information.filter, this.props.data, this.props.settings.url, this.props.settings.page) } }} style={{ fontSize: 13, color: this.state.isLoading ? '#789' : '#007aff', marginTop: 3, cursor: 'pointer', marginLeft: 3 }}>Show information</p>
          )}

          {this.state.isLoading && (
            <div style={{ position: 'absolute', top: 4, right: 25 }}>
              <Loader
                type="Oval"
                color="rgba(0,122,255,1)"
                height="25"
                width="25"
              />
            </div>
          )}

        </div>

      </div>
    );
  }
}

export default SelectInput;
