'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';
import secureLocalStorage from "react-secure-storage";
import Image from 'next/image';
import log_title from './log.svg'
import './login.css'

export default function LoginPage() {
  const router = useRouter()
  const cookieStore = useCookies();

  async function logSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const login = formData.get('log_email')
    const password = formData.get('log_password')
 
    const response = await fetch('https://localhost:7179/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'login': login,
        'password': password,
    })})
 
    if (response.ok) {
      var user = await response.json()
      secureLocalStorage.setItem('login', login)
      secureLocalStorage.setItem('password', password)
      document.cookie = `userID=${user.idUsers}`
      router.push('/profile')
    } else {
      return(
        alert('Ошибка в логине, либо в пароле. Повторите попытку.')
      )
    }
  }

  async function regSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const login = formData.get('reg_email')
    const password = formData.get('reg_password')
    const repeat_password = formData.get('reg_password-repeat')

    if(password == repeat_password){

      const response = await fetch('https://localhost:7179/reg', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ 'email': login, 'password': password })
      })
 
      if (response.ok) {
        var user = await response.json()
        secureLocalStorage.setItem('login', login)
        secureLocalStorage.setItem('password', password)
        document.cookie = `userID=${user.idUsers}`
        router.push('/profile')
      } else {
        alert('error')
      }
    } else {
      alert('Пароль не совпадают. Пожалуйста, введите пароль заново')
    }
  }

  if(!cookieStore.get('userID')){
    return (
    <div className='log_reg-block'>
      <picture className="log-txt">
        <Image className='log-txt_img' src={log_title} />
      </picture>
      <div className='blocks-forms'>
        <div className='login-block'>
          <p className='head'>Уже зарегистрированы?</p>
          <form className='form' onSubmit={logSubmit}>
            <input type="text" name="log_email" placeholder="Эл. почта" required />
            <input type="password" name="log_password" placeholder="Пароль" required />
            <button type="submit">Вход</button>
          </form>
        </div>
        <div className='reg-block'>
          <p className='head'>Ещё нет?</p>
          <form className='form' onSubmit={regSubmit}>
            <input type="text" autocomplete="off" name="reg_email" placeholder="Эл. почта" required />
            <input type="password" name="reg_password" placeholder="Пароль" required />
            <input type="password" name="reg_password-repeat" placeholder="Повтор пароля" required />
            <button type="submit">Регистрация</button>
          </form>
        </div>
      </div>
    </div>
    )} else {
      router.push('/profile')
    }
}