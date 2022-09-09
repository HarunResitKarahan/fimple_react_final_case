import React from 'react'
import "./Container.css"
import Form from './Form/Form'
import PopUp from './PopUp/PopUp'
import { HiOutlineCash } from 'react-icons/hi'
import { IconContext } from "react-icons";

function Container() {
  return (
    <div className='container'>
      <div className='calculate-container'>
        <div className='container-items'>
          <div className='calculate-header'>
            <IconContext.Provider value={{ color: "black", className: "global-class-name", size: "24px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <HiOutlineCash />
                <p style={{ marginLeft: "7px" }}>Kredi Geri Ödeme Hesaplama</p>
              </div>
            </IconContext.Provider>
          </div>
          <div className='calculate-content'>
            <Form />
          </div>
        </div>
      </div>
      <div className='popUp'>
        <PopUp />
      </div>
    </div>
  )
}

export default Container