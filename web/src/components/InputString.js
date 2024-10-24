import React, { useState } from 'react';

const InputString = ({value='',required=false,id='input-string_1',name='input-string_name',disabled=false,label='',comment='',errorComment='Error has been occured',condition='^.{0,6}$',placeholder='Placeholder'}) => {
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

    const handleFocus=()=>{
        setFocus(true);
    }
    const handleFocusOut=()=>{
        setFocus(false);
    }

    return(
        <div className="input-string" data-error={hasError} id={id}>
            {label&&(
                <div className='input-string_header'>
                    <p className='input-string_header_content'>{label}</p>
                    {required && (
                        <p className='input-string_header_required'>*</p>
                    )}
                </div>
            )}
            <input value={input} className={`input-string_input${hasFocus?' focus':''}`} type='text' onChange={handleChange} placeholder='Placeholder' onFocus={handleFocus} onBlur={handleFocusOut}/>
            {hasError&&(
                <p className='input-string_error-msg'>{errorComment}</p>
            )||comment&&(
                <p className={`input-string_comment${hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-string_filter'/>
            )}
        </div>
    );
}
 
export default InputString;