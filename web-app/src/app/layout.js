'use client'
import "../app/global_style.css"
import { Header } from "./components/header"
import { Provider } from 'react-redux'; 
import store from './redux/store'; 


export default function RootLayout({ children }) {
 return (
    <html lang="ru">
      <body>
        <Header />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
