import React from 'react'
import { checkTextTranslation, checkTranslation } from '../../utils/useful'

class SectionInput extends React.Component {
    state = {
    }


    render() {
        return (
            <div className="w-100 h-100 flexc mb-1">
                <p className='text-normal text-bold'>{checkTranslation(this.props.header.information?.label)}</p>
                <div className='w-100 mx-2 mt-1' style={{height:2,backgroundColor:'#eee'}}></div>
            </div>
        )
    }
}

export default SectionInput;