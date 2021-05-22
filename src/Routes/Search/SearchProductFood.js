import React, { useEffect, useState } from 'react';
import SearchTab from './SearchTab';
import SearchResult from './SearchResult';
import './SearchStyle.scss';
const SearchProductFood=(props)=>{
  console.log(props);

  return (
    <div className="searchPage">
      <div className="searchTab">
        <SearchTab/>
      </div>
    </div>
  );
}

export default SearchProductFood;