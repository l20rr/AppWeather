
import './App.css';
import React,{useState} from 'react'
import SearchBar from './components/Search';
import { searchCity } from './Api';

function App() {


  return (
    <div className="app">
      <SearchBar />
      <searchCity />
    </div>
  );
}

export default App;
