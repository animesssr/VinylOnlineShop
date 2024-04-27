'use client'
import Image from 'next/image';
import profile_title from "./profile.svg"
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';
import { Order } from '../components/order.js';
import React, { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";
import './profile.css'

export default function Profile() {
  const router = useRouter()
  const cookieStore = useCookies();

  var base64 = require("base-64");

  const userID = cookieStore.get('userID')

  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null); 
  const [birth, setBirth] = useState(null);
  const [adress, setAdress] = useState(null);
  const [index, setIndex] = useState(null);

  const [orders, setOrders] = useState(null);

  const login = secureLocalStorage.getItem('login');
  const password = secureLocalStorage.getItem('password')

  const handleLogout = async () => {
    cookieStore.remove('userID');
    secureLocalStorage.removeItem('login');
    secureLocalStorage.removeItem('password');
    router.push('/profile/login');
  };

  useEffect(() => {
    const userID = cookieStore.get('userID');
    if (userID) {
      fetchUserData(userID);
    } else {
      router.push('/profile/login');
    }
  }, [userID]);

  function infoEdit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const ed_login = formData.get('info_email');
    const ed_name = formData.get('info_name')
    const ed_phone = formData.get('info_phone')

    fetch('https://localhost:7179/user/'+userID, 
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization' : 'Basic ' + base64.encode(login + ':' + password) },
      body: JSON.stringify({
       'email': ed_login,
       'phoneNumber': ed_phone,
       'name': ed_name,
     })});

     alert('Изменения сохранены')
  }

  const fetchUserData = (userID) => {
    fetch('https://localhost:7179/user/'+userID, {
      method: 'GET',
      headers: { 'Authorization' : 'Basic ' + base64.encode(login + ':' + password) }
    })
    .then((r) => r.json())
    .then((data) => {
    
    setEmail(data.email);
    setPhone(data.phoneNumber);
    setName(data.name);
    setBirth(data.birth);

    setOrders(data.orders);

    if (data.adresses && data.adresses.length > 0) {
      const firstAddress = data.adresses[0];
      setAdress(firstAddress.adress1);
      setIndex(firstAddress.index);
    }})}

  if(cookieStore.get('userID')){
    return (
      <div className="profile">
        <div className="profile-block">
          <picture className="-txt">
            <Image className="main-txt_img" src={profile_title} alt='page name'></Image>
          </picture>
          <div className='profile-main'>
            <div className='person-info'>
              <div className='_form'>
                <p className='_txt'>Личные данные</p>
                <form className='p_form' onSubmit={infoEdit}>
                  <label className='_lbl' for='name'>Имя</label><input type='text' id='name' name='info_name' placeholder='Имя' defaultValue={name}></input>
                  <label className='_lbl' for='email'>Электронная почта</label><input type='text' id='email' name='info_email' placeholder='Email' defaultValue={email} readOnly></input>
                  <label className='_lbl' for='phone'>Номер телефона</label><input type='text' id='phone' name='info_phone' placeholder='Телефон' defaultValue={phone} readOnly></input>
                  <label className='_lbl' for='birth'>Дата рождения</label><input type='text' id='birth' name='info_birth' placeholder='Дата рождения' defaultValue={birth}></input>
                  <button type="submit">Сохранить</button>
                </form>
              </div>
              <div className='_form'>
                <p className='_txt'>Адрес доставки</p>
                <form className='p_form'>
                  <label className='_lbl' for='adress'>Адрес</label><input type='text' id='adress' name='info_adress' placeholder='Адрес доставки' value={adress} onChange={e => setAdress(e.target.value)}></input>
                  <label className='_lbl' for='index'>Индекс</label><input type='text' id='index' name='info_index' placeholder='Индекс' value={index} onChange={e => setIndex(e.target.value)}></input>
                  <button type="submit">Сохранить</button>
                </form>
              </div>
              <div className='btnexit'><button className='btn_exit' onClick={handleLogout}>Выйти из профиля</button></div>
            </div>  
          </div>
        </div>
        <div className='profile_orders'>
          <p className='orders_header'>История заказов</p>
          {
            orders && orders.length > 0 ? 
            (
              orders.map((orderItem) => {
                return <Order key={orderItem.idOrders} orders={orderItem} />;
              })
              ) : (
                <p className='orders_no-orders'>Нет заказов</p>
            )
          }
        </div>  
      </div>
    );
  } else {
    router.push('/profile/login')
  }
}