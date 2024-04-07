import React from 'react';
import SelectInput from './input/SelectInput';
import TextAreaInput from './input/TextAreaInput';
import TextInput from './input/TextInput';
import inputsList from './input/index'

class FormViewer extends React.Component {




    render() {
        return (
            <div className={this.props.theme} style={{ flex: 1 }}>
                {Object.values(this.props.headers)?.map((header, index) => {
                    console.log(header.type)
                    let Component = inputsList[header.type]
                    console.log(Component)

                    return (

                        <div className="row w-100 m-0">

                            <div className="col-12 col-md-4 flexc py-0 px-1">
                                <label className="input-label">{header.information.label}</label>
                            </div>
                            <div className="col-12 col-md-8 p-0 mb-2">
                                <div className="input-container">
                                    {Component &&(
                                    <Component header={header} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default FormViewer;