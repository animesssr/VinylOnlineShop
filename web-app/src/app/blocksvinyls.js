'use client'

import { VinylBlockNew } from './components/vinylblocknew.js';
import { VinylBlockSoon } from './components/vinylblocksoon.js';
import { Provider } from 'react-redux'; 
import Image from 'next/image';
import store from './redux/store'; 
import new_title from './new.svg';
import soon_title from './soon.svg';

export default function BlocksVinyls() {
    return(
        <Provider store={store}>
        <div className="main-block-section_new">
          <picture className="new-txt">
              <Image className="new_img" src={new_title}></Image>
          </picture>
          <VinylBlockNew />
        </div>
        <div className="main-block-section_soon">
          <picture className="soon-txt">
              <Image className="soon_img" src={soon_title}></Image>
          </picture>
          <VinylBlockSoon />
        </div>
        </Provider>
    )
}

export { BlocksVinyls }