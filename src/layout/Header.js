import React from 'react'
import { useState } from "react";
import { useLocation } from 'react-router-dom';

import "./Header.css"
import SearchBar from "../components/SearchBar";
import FilterButtons from '../components/FilterButtons';

function Header ({ selectedTypes, setSelectedTypes }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation(); // 현재 페이지의 URL 확인

  // 필터 버튼 표시 여부
  // const showFilterButton = location.pathname.startsWith('/pokemon');
  const showFilterButton = !['/pokemon', '/search'].some(path => location.pathname.startsWith(path));
  
  return (
    <>
      <header className="header">
        <a href='/'>
          <img src={`${process.env.PUBLIC_URL}/pokemon_logo.png`} alt="pokemon_logo" />
        </a>
        <SearchBar/>
        {showFilterButton && 
          <FilterButtons selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}/>
        }
      </header>
      <div className={isFilterOpen ? 'div-container' : ''}></div>
    </>
  )
}

export default Header;