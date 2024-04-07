import React from 'react';

class SelectInput1 extends React.Component {




    render() {
        return (
            <div className="" >
                <select className=" w-100" >
                    {this.props.header.information.items.map((prop,index)=>{
                        return(
                            <option value={prop.value} >{prop.title}</option>
                        )
                    })}
                    
                </select>
            </div>
        )
    }
}

export default SelectInput1;