'use client'

import Image from 'next/image';
import cart_title from "./cart.svg"
import './cart.css'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/redux.slice';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'next-client-cookies';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cookieStore = useCookies();
  const [cartCost, setCartCost] = useState(0);
  const [shipment, setShipment] = useState('pickup');
  const [shipAdress, setShipAdress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardrdNumber, setCardNumber] = useState(null);
  const [cardExp, setCardExp] = useState(null);
  const [cardCvc, setCardCvc] = useState(null);
  

  function handleOrder() {
    if(shipment, shipAdress, paymentMethod)
    {
      fetch('https://localhost:7179/order', 
      { 
        method: 'POST', 
        headers: { "Content-type": "application/json" }, 
        body: JSON.stringify({cost: cartCost, status: 'pucking', shipMethod: shipment, adress: shipAdress, paymentMethod: paymentMethod, paymentStatus: 'notpaid', user: cookieStore.get('userID')})
      })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < cart.length; i++) {
          fetch('https://localhost:7179/order/' + data.idOrders + '/item', { 
            method: 'POST', 
            headers: { "Content-type": "application/json" }, 
            body: JSON.stringify({ orderid: data.idOrders, itemVinylid: cart[i].idVinyls})
          }, dispatch(removeFromCart(cart[i].idVinyls)))
        }
      })
      .then(() => {alert('Заказ создан!')})
    } else {
      alert('Заполните все данные заказа!')
    }
  }

  useEffect(() => {
    let totalCost = 0;
    for (let i = 0; i < cart.length; i++) {
      totalCost += cart[i].cost;
    }
    setCartCost(totalCost);
  }, []);

  return (
    <div className="cart-main_block">
      <div className="cart-main">
      <picture className="main-txt">
          <Image className="main-txt_img" src={cart_title} alt='page name'></Image>
      </picture>
      {cart.length === 0 ? (
        <h1 className='empty_txt'>В корзине пусто</h1>
      ) : (
        <>
        <div className='cart_vinyls'>
        {cart.map((vinyl) => (
            <div className='vinyl_incart'>
              <picture>
                <Image src={vinyl.cover} height={300} width={300} />
              </picture>
              <div className='cart-vinyl_info'>
                <div className='cart-vinyl_txt'>
                  <p className="cart-vinyl_artist">{vinyl.artist}</p>
                  <a className="cart-vinyl_name" href={'/vinylpage/'+vinyl.idVinyls}>{vinyl.name}</a>
                  <p className="cart-vinyl_edit">{vinyl.edition}</p>
                </div>
                <div className="cart-vinyl_bottom">
                    <p className="cart-vinyl_price">{vinyl.cost}₽</p>
                    <button className="cart-btn_incart" onClick={() => dispatch(removeFromCart(vinyl.idVinyls))}>Удалить</button>
                </div>
              </div>
            </div>
        ))}
        </div>
        </>
      )}
      </div>
      {cart.length != 0 ? (
        <div className="cart-order_info">
          <p className="cart-order_txt">Детали заказа</p>
          <div className='order_shipment'>
            <p className='order_txt'>Доставка</p>
            <div className='с_method'>
              <div><input type='radio' name='shipment_method' value='pickup' id='pickup' onChange={(e) => setShipment(e.target.value)}/><label for='pickup'>Самовывоз</label></div>
              <div><input type='radio' name='shipment_method' value='cdek' id='cdek' onChange={(e) => setShipment(e.target.value)}/><label for='cdek'>СДЭК</label></div>
              <div><input type='radio' name='shipment_method' value='poofrus' id='poofrus' onChange={(e) => setShipment(e.target.value)}/><label for='poofrus'>Почта России</label></div>
            </div>
            {shipment === 'pickup'? (
              <div className='order_pickup'>
                <div><p className='сart-p_txt'>Пункт выдачи</p></div>
                <div className='o_i'><input type='radio' name='pickup_address' value='planeta' id='planeta' onChange={(i) => setShipAdress(i.target.value)}/><label for='planeta'>Россия, г. Йошкар-Ола, ул. Баумана 16, ТЦ “Планета”</label></div>
                <div className='o_i'><input type='radio' name='pickup_address' value='dombyta' id='dombyta' onChange={(i) => setShipAdress(i.target.value)}/><label for='dombyta'>Россия, г. Йошкар-Ола, ул. Первомайская 113, ТЦ “Дом Торговли”</label></div>
              </div>
            ) : (
              <div className='order_other'>
                <p className='сart-p_txt'>Адрес доставки</p>
                <input className='adress_input' type='text' name='ship_adress' placeholder='Адрес доставки' onChange={(e) => setShipAdress(e.target.value)}/>
              </div>
            )}
          </div>
          <div className='order_payment'>
            <p className='order_txt'>Оплата</p>
            <div className='с_method'>
            <div><input type='radio' name='payment' value='cash' id='cash' onChange={(o) => setPaymentMethod(o.target.value)}/><label for='cash'>Наличными</label></div>
            <div><input type='radio' name='payment' value='card' id='card' onChange={(o) => setPaymentMethod(o.target.value)}/><label for='card'>Картой онлайн</label></div>
            </div>
            { paymentMethod === 'cash' ? (
              <div className='payment_cash'>
                <p className='payment_txt'>Подготовьте наличку 🌹</p>
              </div>
            ) : (
              <div className='payment_card'>
                <p className='сart-p_txt'>Карта</p>
                <input className='card_num' type='text' name='card_number' placeholder='номер карты' onChange={(e) => setCardNumber(e.target.value)}/>
                <div className='card_exp'>
                  <input type='text' name='exp' placeholder='срок действия' onChange={(e) => setCardExp(e.target.value)}/>
                  <input type='text' name='cvc' placeholder='CVC/CVV' onChange={(e) => setCardCvc(e.target.value)}/>
                  </div>
              </div>
            )}
          </div>
          <div className='order_total'>
            <p className='order_total-txt'>Итого: {cartCost}₽</p>
            <button className="order_btn" onClick={() => handleOrder()}>ОФОРМИТЬ ЗАКАЗ</button>
          </div>
        </div>
        ) : (null)}
    </div>
  );
}