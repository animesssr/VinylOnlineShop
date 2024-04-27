import Image from 'next/image';
import { OrderVinyl } from './order_vinyl.js';
import './order.css';

export default function Order({ orders }) {
    return (
    <div className='order-block'>
        <div className='order_info'><p className='order_id'>Заказ №: {orders.idOrders}</p><p className='order_status'>{ orders.status == 'pucking' ? 'Собирается' : orders.status == 'picked' ? 'Собран' : 'Выдан' }</p></div>
        <div className='order_vinyls'>
            {orders.orderItems.map((vinyl) => {
                return <OrderVinyl key={vinyl.itemVinyl.idVinyls} vinyls={vinyl.itemVinyl} />
            })}
        </div>
        <div className='order_price'>
            <p className='order_price_text'>Итого: </p><p className='order_price_value'>{orders.cost}₽</p>
        </div>
    </div>
    )
}

export { Order };