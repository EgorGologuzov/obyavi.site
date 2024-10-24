import { useState } from "react";
const InputPassword = ({name='input-password_name',id='input-password_1',value='',required=false,disabled=false,label='',comment='',errorComment='Error has been occured',condition='^.{0,6}$'}) => {

    const [input,setInput]=useState(value);
    const [visibility,setVisibility]=useState(false);
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

    return ( 
        <div className="input-password" data-error={hasError} id={id}>
            <div className='input-password_header'>
                <p className="input-password_header_content">{label}</p>
                {required && (
                    <p className='input-password_header_required'>*</p>
                )}
            </div>
            <div className={`input-password_input-box ${hasFocus?'focus':''}`}>
                <input type={visibility?'text':'password'} 
                placeholder="Password..." 
                className='input-password_input-box_input'
                onChange={handleChange} 
                onFocus={handleFocus} 
                onBlur={handleFocusOut}
                value={input}/>
                <button className={`input-password_input-box_btn ${visibility?'hidden':'visible'}`} onClick={()=>setVisibility(!visibility)}/>
            </div>
            {hasError&&(
                <p className='input-password_error-msg'>{errorComment}</p>
            )||comment&&(
                <p className={`input-password_comment${hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-password_filter'/>
            )}
        </div>
    );
}
 
export default InputPassword;