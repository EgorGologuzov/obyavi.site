import React,{useEffect, useState} from 'react'
import './EditProfilePageClient.css'
import Avatar from '../../components/Avatar'
import Header from '../../components/Header'
import Subcaption from '../../components/Subcaption'
import StarsBar from '../../components/StarsBar'
import Button from '../../components/Button'
import { InputEmail_withRegExp, InputPassword_withRegExp, InputPhone_withRegExp, InputString_withRegExp, InputText_withRegExp } from '../../hoc/withRegExpValidation';
import { useUserService } from '../../data/UserService'
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Spliter from '../../components/Spliter'
import AutoForm, { useNewFormState } from '../../components/AutoForm';
import { formatPhone } from '../../utils/utils'

export default function EditProfilePageClient() {
    const appContext=useAppContext();
    const formState = useNewFormState();
    const [isDefaulted,setIsDefaulted]=useState(false);
    const [name,setName]=useState('Fucker');
    const navigate=useNavigate();

    const restoreToDefault=()=>{

    }

    const submitChanges=()=>{
        if (formState.invalidFields.size !== 0) {
            appContext.showNotification("", "Заполните все обязательные поля правильными значениями", "common");
            return;
        }
        console.log(formState.values);
    }

    const handleOnAvatarClick=(event)=>{
        navigate('/c/settings');
    }

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-page__header">
                <div className="edit-profile-page__header__info">
                    <Avatar src={appContext.loginedUser.avatar} onClick={()=>navigate('/c/settings')}/>
                    <div className="edit-profile-page__header__info__text">
                        <Subcaption level={2} color={'text'}>{`Дата регистрации: `}</Subcaption>
                        <Subcaption level={2}>{`${appContext.loginedUser.regDate}`}</Subcaption>
                        <Subcaption level={2} color={'secondary'}>{`#${appContext.loginedUser.id}`}</Subcaption>
                        <br/>
                        <StarsBar value={4}/>
                    </div>
                </div>
            </div>
            <AutoForm formState={formState}>
                    <InputString_withRegExp
                        name="lastname"
                        label="Фамилия"
                        placeholder={appContext.loginedUser.lastname}
                        value={appContext.loginedUser.lastname}
                        isValueFixed={isDefaulted}
                        regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                        required
                        errorComment="Фамилия может содержать только буквенные символы и не должна быть длиннее 50 символов" />
                    <InputString_withRegExp
                        name="firstname"
                        label="Имя"
                        placeholder={appContext.loginedUser.firstname}
                        value={appContext.loginedUser.firstname}
                        regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                        required
                        errorComment="Имя может содержать только буквенные символы и не должно быть длиннее 50 символов" />
                    <InputString_withRegExp
                        name="patronymic"
                        label="Отчество"
                        value={appContext.loginedUser.patronymic}
                        placeholder={appContext.loginedUser.patronymic||null}
                        regExp={/^([А-Яа-яA-za-z]){1,50}$/g}
                        errorComment="Отчество может содержать только буквенные символы и не должно быть длиннее 50 символов" />
                    <InputEmail_withRegExp
                        name="email"
                        label="Электронная почта"
                        value={appContext.loginedUser.email}
                        placeholder={appContext.loginedUser.email}
                        required />
                    <InputPhone_withRegExp name="phone" required placeholder={appContext.loginedUser.phone} value={formatPhone(appContext.loginedUser.phone)}/>
                    <InputString_withRegExp name='birthDate' placeholder={appContext.loginedUser.birthDate} value={appContext.loginedUser.birthDate} label='Дата рождения'/>
                    <InputString_withRegExp name='location' placeholder={appContext.loginedUser.location} value={appContext.loginedUser.location} label='Местоположение'/>
                    <InputText_withRegExp
                        name='description'
                        label="Описание"
                        value={appContext.loginedUser.description}
                        comment=''
                        onChange={()=>alert('')}
                    />
            </AutoForm>
            <div className="edit-profile-page__confirm-buttons">
                <Button onClick={()=>submitChanges()}>Сохранить</Button>
                <Button color='secondary' onClick={()=>navigate('/c/settings')}>Отменить</Button>
            </div>
        </div>
    )
}
