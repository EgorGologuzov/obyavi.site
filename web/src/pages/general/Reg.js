import React, { useEffect , useState} from 'react'
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import InputString from '../../components/InputString'
import InputPassword from '../../components/InputPassword'
import InputPhone from '../../components/InputPhone'
import Button from '../../components/Button'
import "./Reg.css"

export default function Reg() {
    useEffect(() => {
        document.title = "Регистрация";
    });

    const [inputs,setInputs]=useState({});

    const handleInputStringChange=(oldValue,newValue,inputName)=>{
        setInputs(values=>({...values,[inputName]:newValue}))
    }

    const handleSubmit=()=>{

    }

    return (
        <div className='reg'>
            <div className="reg__header">
                <Header level={2} >Регистрация</Header>
                <Logo sizeFull/>
            </div>
            <form className='reg__form'>
                <InputString placeholder='Фамилия' label='Фамилия' value={inputs.secondName} required onChange={(oldValue,newValue)=>handleInputStringChange(oldValue,newValue,'secondName')}/>
                <InputString placeholder='Имя' label='Имя' required value={inputs.firstName} onChange={(oldValue,newValue)=>handleInputStringChange(oldValue,newValue,'firstName')}/>
                <InputString placeholder='Отчество' label='Отчество' value={inputs.fatherName} onChange={(oldValue,newValue)=>handleInputStringChange(oldValue,newValue,'fatherName')}/>
                <InputString placeholder='E-mail' label='Электронная почта' value={inputs.mail} required onChange={(oldValue,newValue)=>handleInputStringChange(oldValue,newValue,'mail')}/>
                <InputPhone label='Мобильный телефон' value={inputs.phoneNumber} required onChange={(e)=>handleInputStringChange(inputs.phoneNumber,e.target.value,'phoneNumber')}/>
                <InputPassword label='Пароль' required value={inputs.password1} placeholder='Введите пароль' onChange={(e)=>handleInputStringChange(inputs.password1,e.target.value,'password1')}/>
                <InputPassword label='Повторите пароль' value={inputs.password2} required placeholder='Введите пароль' onChange={(e)=>handleInputStringChange(inputs.password2,e.target.value,'password2')}/>
            </form>
            <Button onClick={()=>alert('fd')}>Зарегистрироваться</Button>
        </div>
    )
}
