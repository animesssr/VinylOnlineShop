'use client'
import $ from "jquery";
import React, { useState, useEffect } from 'react';
import { VinylCard } from './vinyl_card.js';

export default function VinylBlockNew() {
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://localhost:7179/vinyl');
            const data = await response.json();
            setVinyl(data);
            
            var newvinyl = $.grep(data, function (item) {
                return item.status == 'new';
            });
            setVinyl(newvinyl);
        }
        fetchData();
    }, []);

    return (
        <div className="vinyl-block">
            {vinyl && vinyl.map((vinyl, action) =>
            <VinylCard key={vinyl.idVinyls} vinyl={vinyl} action="В КОРЗИНУ" />)}
        </div>
    );
};

export { VinylBlockNew };