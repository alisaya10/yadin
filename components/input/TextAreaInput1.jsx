import React from 'react';

class TextAreaInput1 extends React.Component {




    render() {
        return (
            <div className="" >
                <textarea className="w-100" placeholder={this.props.header.information.placeholder}/>
            </div>
        )
    }
}

export default TextAreaInput1;