import React from 'react'
import Header from '../../components/Header'
import Subcaption from '../../components/Subcaption'
import InputString from '../../components/InputString'
import InputPassword from '../../components/InputPassword'
import Button from '../../components/Button'
import "./Recovery.css"

export default function Recovery() {
  return (
    <div className="recovery">
      <Header level={2}>Восстановление пароля</Header>
      <div className="recovery__email">
        <Subcaption level={2}>1. Введите Ваш e-mail ниже. На указанный e-mail придёт ссылка для восстановления пароля</Subcaption>
        <div className="recovery__email__check"/>
      </div>
      <form>
        <InputString 
        placeholder='E-mail' 
        label='Электронная почта' 
        required 
        value='123'/>
      </form>
      <div className="recovery__email-confirmation-btn">
        <Button color='secondary'>Отправить</Button>
      </div>
      <div className="recovery__new-password">
        <Subcaption level={2}>2. Создайте новый, надёжный пароль. Затем нажмите кнопку ниже</Subcaption>
        <form className='recovery__new-password__inputs'>
          <InputPassword/>
          <InputPassword/>
        </form>
      </div>
      <div className="recovery__confirmation">
        <Button>Изменить пароль</Button>
        <a className='recovery__home-link'>На страницу входа</a>
      </div>
    </div>
  )
}
