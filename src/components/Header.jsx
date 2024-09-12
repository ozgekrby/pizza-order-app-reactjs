import React from 'react'
import "/src/App.css"
import { useLocation } from 'react-router-dom';
export default function Header() {
  const location = useLocation();
  const headerClass = (location.pathname === '/' || location.pathname === '/success' || location.pathname==="/home") ? 'header-home' : 'header-default';
  return (
    <div className={headerClass}>
      <img src="Assets/Iteration-1-assets/logo.svg" alt="" />
    </div>
  )
}
