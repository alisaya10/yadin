import React from 'react';

class TextInput1 extends React.Component {




    render() {
        return (
            <div className="" >
                <input className=" w-100" placeholder={this.props.header.information.placeholder}/>
            </div>
        )
    }
}

export default TextInput1;