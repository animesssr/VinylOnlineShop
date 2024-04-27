import Image from 'next/image';
import './order_vinyl.css';

export default function OrderVinyl({ vinyls }) {
    return (
    <div className='order_vinyl-block'>
        <Image className="order_vinyl_cover" src={vinyls.cover} width={280} height={280} alt='vinnyl cover' />
        <div className="order_vinyl_info">
            <div className='order_vinyl-info_txt'>
                <p className="order_vinyl_artist">{vinyls.artist}</p>
                <a className="order_vinyl_name" href={'/vinylpage/'+vinyls.idVinyls}>{vinyls.name}</a>
                <p className="order_vinyl_edit">{vinyls.edition}</p>
            </div>
            <div className="order_vinyl_bottom">
                <p className="order_vinyl_price">{vinyls.cost}₽</p>
            </div>
        </div>
    </div>
    )
}

export { OrderVinyl };