import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SideBar from "./Components/sidebar/SideBar";
import Content from "./Components/Content/Content";
import Footer from "../src/Components/Footer/Footer"
import "./App.scss";


const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const [searchTerm,setSearchTerm] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const updateInput =(input)=>{
    setSearchTerm(input);
  }
  return (
    <Router>
      <div className="App wrapper" style={{backgroundColor:'white'}}>
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} updateInput={searchTerm}/>
      </div>
      <Footer/>
    </Router>
   

  );
};

export default App;

