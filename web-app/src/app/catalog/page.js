'use client'

import "./catalog.css"
import { Provider } from 'react-redux'; 
import React, { useState, useEffect } from 'react';
import $, { event } from "jquery";
import { VinylCard } from '../components/vinyl_card.js';
import store from '../redux/store'; 

export default function Catalog() {
  const [vinyl, setVinyl] = useState([]);
  const [req, setReq] = useState('');
  const [sort, setSort] = useState('');
  const [sortType, setSortType] = useState('');
  const [genSel, setSel] = useState('');
  const [count, setCount] = useState(0);
  
  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://localhost:7179/vinyl');
        let data = await response.json();

        const newvinyl = data.filter(vinyl => {
          const nameMatch = vinyl.name.toLowerCase().includes(req.toLowerCase());
          const artistMatch = vinyl.artist.toLowerCase().includes(req.toLowerCase());
          const genreMatch = vinyl.genre.toLowerCase() === genSel.toLowerCase();
          return (nameMatch || artistMatch) && (genSel === '' || genreMatch);
        });

        setVinyl(newvinyl);

        if(sort == 'up'){
          data = newvinyl.sort((i1, i2) => {
            if(i1[sortType] < i2[sortType]){
              return -1;
            } 
          })
        } else if(sort == 'down'){
          data = newvinyl.sort((i1, i2) => {
            if(i1[sortType] > i2[sortType]){
              return -1;
            }
          })
        } else{
          return data
        }

        setVinyl(data)

      }

      fetchData();

  }, [count]);

  return (
    <Provider store={store}>
      <div className="blocks">
        <div className="inputs">
          <input type="text" placeholder="Поиск" className="searchInput" autocomplete="off" name="textSearch" onChange={(q) => {setReq(q.target.value)}}/>
          <select className="genreSelect" name="genre" onChange={(g) => {setSel(g.target.value)}}>
            <option value=''>Жанр</option>
            <option value="Поп">Поп</option>
            <option value="Альтернатива">Альтернатива</option>
            <option value="Гиперпоп">Гиперпоп</option>
            <option value="Инди">Инди</option>
            <option value="Альт-рок">Альт-рок</option>
            <option value="Электроника">Электроника</option>
          </select>
          <div className="sort" name="typeSort">
            <select className="sortTypeSelect" name="sort" onChange={(s) => {setSortType(s.target.value)}}>
              <option value=''>Сортировка</option>
              <option value='year'>По году</option>
              <option value='artist'>По артисту</option>
              <option value='name'>По названию</option>
              <option value='cost'>По цене</option>
            </select>
            <div className="radio">
              <input type="radio" name="sort" id="up" onChange={(e) => setSort(e.target.id)}/><label>по возрастанию</label>
              <input type="radio" name="sort" id="down" onChange={(e) => setSort(e.target.id)}/><label>по убыванию</label>
            </div>
          </div>
          <button className="btn_search" type="submit" onClick={() => {setCount(count + 1), console.log(req, genSel, sort, sortType)}}>Поиск</button>
          </div>
          <div className="s_vinyl-block">
              {vinyl && vinyl.map((vinyl) =>
              <VinylCard key={vinyl.idVinyls} vinyl={vinyl} action="В КОРЗИНУ"/>)}
        </div>
      </div>
    </Provider>
  );
}