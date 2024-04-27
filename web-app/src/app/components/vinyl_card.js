import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/redux.slice';
import { useCookies } from 'next-client-cookies';

export default function VinylCard({ vinyl, action }) {
    const cookieStore = useCookies();
    const dispatch = useDispatch();

    return (
        <div className="vinyl-card">
            <Image className="vinyl_cover" src={vinyl.cover} width={350} height={350} alt='vinnyl cover' />
            <div className="vinyl_info">
                <div className='vinyl-info_txt'>
                    <p className="vinyl_artist">{vinyl.artist}</p>
                    <a className="vinyl_name" href={'/vinylpage/'+vinyl.idVinyls}>{vinyl.name}</a>
                    <p className="vinyl_edit">{vinyl.edition}</p>
                </div>
                <div className="vinyl_bottom">
                    <p className="vinyl_price">{vinyl.cost}₽</p>
                    <button className="btn_incart" onClick={() => {cookieStore.get('userID') ? dispatch(addToCart(vinyl)) : alert('Вы не авторизованы!')}}>{action}</button>
                </div>
            </div>
        </div>
    );
};

export { VinylCard };