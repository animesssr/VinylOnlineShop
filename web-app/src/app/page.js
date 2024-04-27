import Image from 'next/image';
import main_title from "./main.svg"
import "./main.css"
import about_title from './about.svg';
import { BlocksVinyls } from './blocksvinyls.js';


export default async function Home() {  
  return (
      <div className="main-block">
      <div className='items-block'>
        <picture className="main-txt">
            <Image className="main-txt_img" src={main_title}></Image>
        </picture>
        <div className='blocks'>
          <BlocksVinyls />
        </div>
      </div>
      <div className="about">
        <Image className="about-head_img" src={about_title}/>
        <p className="about_txt">Ящик винила -  магазин виниловых пластинок, где страсть к музыке встречается с аутентичностью аналогового звука!
            Мы с гордостью предлагаем вам широкий выбор виниловых пластинок различных жанров - от классической и джазовой музыки до рока, популярной и электронной музыки. У нас вы найдете как новые релизы от ведущих артистов, так и редкие переиздания классических альбомов.
            Наши виниловые пластинки подобраны с любовью и вниманием к качеству звука, чтобы доставить вам непревзойденное музыкальное восприятие. Мы сотрудничаем только с надежными поставщиками, что позволяет нам гарантировать оригинальность и подлинность каждого издания.</p>
      </div>
    </div>
  );
}