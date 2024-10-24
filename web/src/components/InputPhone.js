import { useState } from "react";
import { InputMask ,useMask} from "@react-input/mask";

const InputPhone = ({id='input-phone-1',name='input-phone_name',required=false,disabled=false,label='header',comment='',errorComment='Error has been occured',condition='^.{0,6}$'}) => {

    const [input,setInput]=useState('');
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

    const inputRef = useMask({
        mask: '+_ (___) ___ __-__',
        replacement: { _: /\d/ },
    });

    return ( 
        <div className="input-phone" data-error={hasError} id={id}>
            <div className='input-phone_header'>
                <p className="input-phone_header_content">{label}</p>
                {required && (
                    <p className='input-phone_header_required'>*</p>
                )}
            </div>
            <input type='text'
                placeholder="+_ (___) ___ __-__"
                className={`input-phone_input ${hasFocus?'focus':''}`}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleFocusOut}
                ref={inputRef}
            />

            {hasError&&(
                <p className='input-phone_error-msg'>{errorComment}</p>
            )||comment&&(
                <p className={`input-phone_comment${hasFocus?' focus':''}`}>{comment}</p>
            )}
            {disabled&&(
                <div className='input-phone_filter'/>
            )}
        </div>
    );
}
 
export default InputPhone;