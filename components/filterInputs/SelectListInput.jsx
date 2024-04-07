import React from "react";
import Loader from 'react-loader-spinner'
import HttpService from '../../utils/Http.services';
import { checkTextTranslation } from "../../utils/useful";


class SelectListInput extends React.Component {

  state = {
    isOpen: false,
    data: [],
    title: '',
    tempData: [],
    options: [],
    isLoading: false,
    choosen: [],
    lastNewId: 0,
    operator: 'in',

  }


  setWrapperRef(node) {
    this.wrapperRef = node;
  }


  componentDidMount() {
    this.mounted = true
    // console.log(this.props.data)
    this.init()

  }

  componentDidUpdate(prevProps) {
    // console.log("UPDATE")
    // console.log(prevProps.header?.information?.items != this.props.header?.information?.items)
    // console.log(prevProps.header?.information?.items)
    // console.log(this.props.header?.information?.items)
    if ((prevProps.header != this.props.header) && this.mounted) {
      this.init()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }



  changeItem = (prop, selected, dontChangeValue) => {

    var choosen = this.props.data
    // this.setState({ title: '' }, () => {
    //     if (this.refs.input)
    //         this.refs.input.focus()
    // })


    if (selected) {
      for (let i = 0; i < choosen.length; i++) {

        if (choosen[i] == prop.value) {
          choosen.splice(i, 1)
        }
      }
    } else {
      if (!choosen) choosen = []
      console.log(choosen)
      choosen.push(prop.value)
    }

    // console.log((choosen))

    this.setState({ choosen }, () => {
      this.changeValue()
    })


    if (this.state.tempData.length > 0)
      this.setState({ options: this.state.tempData })

    // this.changeFilter(prop.value)

  }




  init() {
    // console.log(this.props.header)
    if (this.props.header.information) {
      if (this.props.header.information.type == "local") {

        let options = []
        let choosen = []

        if (this.props.header.information.items && this.props.header.information.items.length > 0) {
          options = this.props.header.information.items
        }

        // if (this.props.title && Array.isArray(this.props.title)) {
        //     this.props.title.forEach(element => {
        //         choosen.push({ title: element, value: element })
        //     });
        // }
        this.setState({ options, choosen })
      } else if (this.props.header.information.type == "api") {
        this.fetch()
      }
    }
  }


  fetch() {
    this.setState({ isLoading: true })
    let address = this.props.header.information.address
    let filter = typeof this.props.header.information.filter == "string" ? JSON.parse(this.props.header.information.filter) : this.props.header.information.filter
    // console.log(filter)


    HttpService.request(address, filter, (fetchResult, fetchError) => {
      if (fetchError) { return }

      var newData = []
      fetchResult.info.forEach(element => {

        var newTitle = this.spliter(element, this.props.header.information.fields.title)
        var newValue = this.spliter(element, this.props.header.information.fields.value)

        newData.push({ value: newValue, title: newTitle })

      });


      if (Array.isArray(this.props.data)) {
        let choosen = []
        this.props.data.forEach(oneTitle => {
          let oneTitleId = typeof oneTitle == 'object' ? oneTitle._id : oneTitle
          newData.forEach(oneNewData => {

            if (oneNewData.value == oneTitleId) {
              choosen.push({ title: oneNewData.title, value: oneTitleId })
            }
          });

        })
        this.setState({ choosen })


      }

      this.setState({
        options: newData,
        isLoading: false
      })
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
      if (this.props.settings[param] == condition) {
        return true
      }
    }
    return false
  }


  search = async (value) => {

    this.setState({ title: value })

    if (value == "") {
      await this.setState({ options: this.state.tempData })
      await this.setState({ tempData: [] })
    } else {
      if (this.state.tempData.length == 0) {
        await this.setState({ tempData: this.state.options })
      }
      var values = []

      this.state.tempData.forEach(element => {
        if (String(element.title).toLowerCase().includes(String(value).toLowerCase())) {
          values.push(element)
        }
      })
      this.setState({ options: values })

    }
  }


  changeValue() {
    let choosen = []
    this.state.choosen.forEach(element => {
      choosen.push((typeof element == 'object' ? element._id : element))
    });
    this.props.changeValue(this.props.header.key, choosen, { type: this.props.header.type, operator: this.state.operator, label: this.props.header.information?.label })
  }


  render() {

    return (
      <div className='mt-0 w-100  flexc' style={{ position: 'relative' }}  >

        <div style={{ flexWrap: 'wrap', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>

          {this.state.isLoading && (
            <div style={{ top: 0, left: 5 }}>
              <Loader
                type="Oval"
                color="rgba(0,122,255,1)"
                height="20"
                width="20"
              />
            </div>
          )}
        </div>


        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxHeight: 250, overflow: 'auto' }}>
            {this.props.header.information.searchable && (<input className="selectSearch" onChange={event => this.search(event.target.value)} placeholder={"Search ..."} />)}

            {this.state.options.map((prop, index) => {
              let selected = false
              if (this.props.data) {
                for (var i = 0; i < this.props.data.length; i++) {
                  if (prop.value == this.props.data[i])
                    selected = true
                }
              }

              return (
                // <div key={index} onClick={() => this.changeItem(prop, selected)} style={{ cursor: 'pointer' }}>
                <div>
                  <label className="checkbox-container mt-1" key={index} >
                    <input type="checkbox" onChange={() => this.changeItem(prop, selected)} checked={selected} />
                    <p className="checkmark"></p>
                    <span className="mx-1 text-small">{prop.title}</span>
                  </label>
                </div>

              )
            })}

            {this.state.options.length == 0 && (
              <div style={{ padding: 5, }}>
                <p style={{ textAlign: 'center', margin: 0, color: '#000', opacity: 0.5, fontSize: 13 }}>Found Nothing</p>
              </div>
            )}

          </div>
        </div>


      </div>
    );
  }
}


export default SelectListInput;
