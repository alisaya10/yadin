import React from 'react'
// import SelectInput from './SelectInput';
// import TextAreaInput from './TextAreaInput';
// import TextInput from '../TextInput';
import inputsList from './index';



const ForumViewer = ({headers,theme}) => {



    return (
        <div className={theme}>
        {headers?.map((header,index)=>{

let Component = inputsList[header.type];

             return( 
                <div className="body-form-main">
                        <div className="flexr">
                    <label>{header.information.label}</label>
                    <Component header={header}  />
                    </div>
                    </div>
             ) 
            })}
         
            
        </div>
    )
}

export default ForumViewer;
