import React, { useState, useEffect } from 'react';
import $ from "jquery";
import { VinylCard } from '../components/vinyl_card.js';

export default function VinylBlockSearched() {
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://localhost:7179/vinyl');
            const data = await response.json();
            setVinyl(data);
            
            var newvinyl = $.grep(data, function (item) {
                return item.genre != null;
            });
            setVinyl(newvinyl);
        }
        fetchData();
    }, []);

    return (
        <div className="s_vinyl-block">
            {vinyl && vinyl.map(({idVinyls, name, artist, cost, edition, cover, action}) =>
            <VinylCard
            idVinyls={idVinyls}
            name={name} 
            artist={artist} 
            cost={cost} 
            edition={edition} 
            cover={cover}
            action="В КОРЗИНУ"
            />)}
        </div>
    );
};

export { VinylBlockSearched };