import { useState } from 'react';
import DatePicker from 'react-datepicker'
import { InputMask, useMask } from '@react-input/mask';
import 'react-datepicker/dist/react-datepicker.css'

const InputDate = ({label='Date',required=true,condition="^.{0,6}$",value='',max=50,comment='Comment',errorComment='Error has been occured'}) => {
    const [startDate,setStartDate]=useState(new Date());
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

    return ( 
        <div className="input-date">
            <div className="input-date_header">
                <p className="input-date_header_content">{label}</p>
                {required&&(<p className="input-date_header_required">*</p>)}
            </div>
            <DatePicker selected={startDate}
            onChange={(date)=>setStartDate(date)} 
            adjustDateOnChange='false'
            customInput={
                <InputMask mask='__/__/____' placeholder='placeholder' replacement={{_:/\d/}} className={`input-text_input`}/>
            }/>
            {comment&&(
                <p className={`input-text_comment`}>{comment}</p>
            )}
        </div>
     );
}
 
export default InputDate;