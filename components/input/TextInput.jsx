import React from 'react'







const TextInput = ({header}) => {
    return (
        <div className="text-input">
            {/* {header.map((option,index)=>{ */}
            
           <input placeholder={header.information.placeholder}/>

            {/* })} */}
            
            
        </div>
    )
}

export default TextInput;
