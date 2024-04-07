import React from 'react';

const TextAreaInput = ({header}) => {
    return (
        <div className="text-input">

            {/* {header.information.map((option,index)=> { */}
             
                   <>
                
                    <input placeholder={header.information.placeholder} />

                    </>
                
            {/* })} */}
           
        </div>
    )
}

export default TextAreaInput;
