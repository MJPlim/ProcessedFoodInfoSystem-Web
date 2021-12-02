import React, { useState,useEffect } from "react";
import {
  Navbar,
  Input,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import { Link } from "react-router-dom";
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import { favouriteApi } from "../../api";
const Topbar = ({ toggleSidebar,sidebarIsOpen}) => {
  
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const [user,setUser] = useState(null);
  const [favList,setFavList] = useState(null);
  const [input,setInput] = useState('');

  const toggleTopbar = () =>  setTopbarOpen(!topbarIsOpen);
  const logout =() => {
    alert("로그아웃")
    localStorage.removeItem("authorization");
    window.location.href = '/'
  }
  const getUser =()=>{
    setUser(localStorage.getItem("authorization"));
    //console.log(user)
  }
  
  const getFavList =async()=>{
   await favouriteApi.myFavourite()
   .then((response) => {
     console.log("즐겨찾기 반환",response.data)
     setFavList(response.data.length)
   }).catch(e => {
   //  console.log(e)
   })
  }

  const onKeyPress=(e) =>{
    if(e.key=='Enter'){
      window.location.href = '/search'
    }
  }

  useEffect(() => {
    getUser()
    getFavList()
  })

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded"
      expand="lg"
      style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}
    >
       <div onClick={toggleSidebar} style={{marginRight:'4rem'}}>
       {sidebarIsOpen ? <AiOutlineArrowLeft size="30" /> : <AiOutlineArrowRight size="30" />}
      </div>
      
      <div>
      <Input placeholder="search.." onChange={
                        (e)=>{
                            setInput(e.target.value);
                        }
                    }
      onKeyPress={onKeyPress}/>
      </div>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
         {user == null ?
        <div style={{display:'flex'}}> 
         <NavItem>
            <NavLink tag={Link} to={"/login"}>
              로그인
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/join"}>
              회원가입
            </NavLink>
            </NavItem>
            </div>
            : 
            <div style={{display:'flex'}}>
            <NavItem>
               <NavLink tag={Link} to={"/mypage"} style={{display:'flex',alignItems:'center'}}>
               마이페이지  <Badge color="primary" pill style={{marginLeft:'0.2rem'}}>{favList}</Badge>
               </NavLink>
             </NavItem>
             <NavItem>
               <NavLink tag={Link} to={"/"} onClick={logout}>
                 로그아웃
               </NavLink>
               </NavItem>
               </div>
          }
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
