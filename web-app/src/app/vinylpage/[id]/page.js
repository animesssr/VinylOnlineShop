'use client'
import "../vp.css";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import $ from "jquery";
import { VinylCard } from '../../components/vinyl_card.js';
import { useRouter } from "next/navigation";
import "./vinylpage.css"
import tl from './tl.svg';

export default function VinylPageID({ params }) {
    const router = useRouter();

    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://localhost:7179/vinyl');
            const data = await response.json();
            setVinyl(data);
            
            var newvinyl = $.grep(data, function (item) {
                return item.idVinyls == params.id;
            });
            setVinyl(newvinyl);
        }
        fetchData();
    }, []);

    return (
        <div className="vinylPage">
            <div className="v_vinyl-block">
                <button className="btn_back" onClick={() => router.back()}></button>
                {vinyl && vinyl.map(( vinyl ) =>
                <VinylCard key={vinyl.idVinyls} vinyl={vinyl} action="В КОРЗИНУ" />)}
            </div>
            <div className="tracklist">
                <picture>
                    <Image src={tl} />
                </picture>
                {vinyl && vinyl.map(( vinyl ) => 
                <div key={vinyl.idVinyls} >
                    <p className="tracklist-item">{vinyl.tracklists[0].tracks}</p>
                </div>)}
            </div>
        </div>

    );
}