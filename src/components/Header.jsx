import React from 'react'
import "/src/App.css"
import { useLocation } from 'react-router-dom';
export default function Header() {
  const location = useLocation();
  const headerClass = (location.pathname === "/siparis-olustur" ) ? 'header-default' : 'header-home';
  return (
    <div className={headerClass}>
      <img src="Assets/Iteration-1-assets/Teknolojik Yemekler.svg" alt="" className="svg-logo" />
    </div>
  )
}
