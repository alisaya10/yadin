import React from 'react'

const SelectInput = ({header}) => {
    return (
        <div>
            
        <select>
        {header.information?.items?.map((option,index)=>{
            return(
                <option value={option.value}>{option.title}</option>
            )
        })}

        </select>

        </div>
    )
}

export default SelectInput;
