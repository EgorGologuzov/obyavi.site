import { useEffect, useRef, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

const InputText = ({name='input-text_name',id='input-text_1',value='',label='Huge Text',required=false,comment='Comment',placeholder='Placeholder',max=50,errorComment="Error has been occured",condition="^.{0,6}$"}) => {
    const [input,setInput]=useState(value);
    const [hasError,setHasError]=useState(false);
    const [hasFocus,setFocus]=useState(false);

    const validate=(input)=>{
        const isValid=new RegExp(condition).test(input);
        if(!isValid){
            setHasError(true);
        }
        else
            setHasError(false);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        validate(value);
    };

    return ( 
        <div className="input-text" id={id}>
            <div className="input-text_header">
                <p className="input-text_header_content">{label}</p>
                {required&&(<p className="input-text_header_required">*</p>)}
            </div>
            <TextareaAutosize type="text"
            className={`input-text_input ${hasError?'error':hasFocus?'focus':''}`}
            placeholder={placeholder}
            maxLength={max}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            onChange={handleChange}
            />
            {hasError&&(
                <p className='input-text_error-msg'>{errorComment}</p>
            )||comment&&(
                <p className={`input-text_comment${hasFocus?' focus':''}`}>{comment}</p>
            )}
        </div>
    );
}
 
export default InputText;