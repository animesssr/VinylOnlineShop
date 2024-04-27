import Image from 'next/image';
import logo from "../logo.svg";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const path = usePathname();

    return (
        <header>
          <div className="logo">
            <Image className="logo_img" src={logo} />
          </div>
          <nav className="nav">
              <ul className="nav-menu">
                {path === "/" ? (<li className=".nav-menu_item"><Link className="link-path" href="/">главная</Link></li>) : (<li className="nav-menu_item"><Link className="link" href="/">главная</Link></li>)}
                {path === "/catalog" ? (<li className="nav-menu_item"><Link className="link-path" href="/catalog">каталог</Link></li>) : (<li className="nav-menu_item"><Link className="link" href="/catalog">каталог</Link></li>)}                 
                {path === "/profile" || path==="/profile/login" ? (<li className="nav-menu_item"><Link className="link-path" href="/profile">профиль</Link></li>) : (<li className="nav-menu_item"><Link className="link" href="/profile">профиль</Link></li>)}
                {path === "/cart" ? (<li className="nav-menu_item"><Link className="link-path" href="/cart">корзина</Link></li>) : (<li className="nav-menu_item"><Link className="link" href="/cart">корзина</Link></li>)}
                {path === "/support" ? (<li className="nav-menu_item"><Link className="link-path" href="/support">контакты</Link></li>) : (<li className="nav-menu_item"><Link className="link" href="/support">контакты</Link></li>)}
              </ul>
          </nav>
        </header>
    );
};

export { Header };