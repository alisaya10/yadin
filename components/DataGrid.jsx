import React from 'react'
import Loader from 'react-loader-spinner'
import { translate } from '../utils/useful'

class DataGrid extends React.Component {
    state = {
        key: ''
    }


    render() {
        return (
            <div className="row m-0">
                {this.props.data?.map((prop, index) => {
                    let Component = this.props.component
                    if (Component) {
                        return (
                            <div key={prop._id ?? index} className={(this.props.marginBottom??' mb-4')+' ' + this.props.col } >
                                <Component data={prop} schema={this.props.schema} dontShowPrice={this.props.dontShowPrice} background={this.props.background} settings={this.props.settings} extra={this.props.extra} />
                            </div>
                        )
                    }
                })}
                <div className="col-12 text-center ">

                    {this.props.data?.length === 0 && !this.props.isLoading && (
                        <p style={{ fontSize: 16, color: '#789', marginTop: 20 }}>{translate('found-nothing')}</p>
                    )}

                    {this.props.isLoading && !this.props.hideLoader && (
                        <div className="mt-2">
                            <Loader
                                type={this.props.type ?? "Oval"}
                                color={this.props.color ?? "#202020"}
                                height={this.props.width ?? 50}
                                width={this.props.height ?? 50}
                            />
                        </div>
                    )}
                </div>

            </div>
        )
    }
}

export default (DataGrid);