import Image from 'next/image';
import support_title from "./support.svg"
import Link from 'next/link';
import './support.css';

export default function Support() {
  return (
    <div class="help-block">
      <picture class="main-txt">
          <Image class="main-txt_img" src={support_title}></Image>
      </picture>
      <div className='help-block_content'>
        <p>Возникли трудности при оформлении заказа? Проблемы с уже оформленным заказом? Или есть жалоба по работе наших сотрудников? Пожелания по нашей работе? И сто других вопросов вы сможете задать нам, мы обязательно вам ответим и поможем решить вашу проблему!</p>
        <div className='help-block_links'>
          <p className='links_txt'>КАНАЛЫ СВЯЗИ С НАМИ:</p>
          <p>Эл. почта: yashik_vinila@ya.ru <br/> Telegram: @yashikvinila_help <br/> VK: @yashikvinila</p>
        </div>
      </div>
    </div>
  );
}