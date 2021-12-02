import React,{useState} from 'react'
import { Navbar,Nav,DropdownMenu,NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink ,UncontrolledDropdown,DropdownToggle,DropdownItem,NavbarText} from 'reactstrap';
import './SearchStyle.scss'
import {BiSearch} from 'react-icons/bi';
import { searchApi } from '../../api';

function SearchPage() {
  const [input,setInput] = useState('');
  const [allergies,setAllergies] = useState([]);
  const [category,setCategory] = useState('');
  const[foodName,setFoodName] = useState('');
  const[manufacturerName,setManufacturerName] = useState('');
  const[order,setOrder] = useState('');
  const [pageNo,setPage] = useState('');
  const [size,setSize] = useState('');
  const [sort,setSort] = useState('');
  
  const onKeyPress=(e) =>{
    if(e.key=='Enter'){
     searchApi.search(allergies,
      category,
      foodName,
      manufacturerName,
      order,
      pageNo,
      size,
      sort)
     .then((response) => {
       console.log("성공")
       console.log(response);
     })
     .catch((e)=>{
       console.log(e)
     })
    }
  }


    return (
        <div className="container">
        <Navbar
          color="white"
          expand="md"
          light
        >
          <NavbarBrand style={{fontWeight:'700', color:'black'}}>
            검색결과 (0)
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck(){}} />
          <Collapse navbar>
            <Nav
              className="me-auto"
              navbar
            >
              <NavItem>
                <NavLink >
                  가나다순
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                  제조사별
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                  식품별
                </NavLink>
              </NavItem>
              <UncontrolledDropdown
                inNavbar
                nav
              >
              </UncontrolledDropdown>
            </Nav>
            <div className="search_group">
                <input className="search_input" onChange={(e)=>{setInput(e.target.value);}}
                onKeyPress={onKeyPress}/>
                <button className="search_button"><BiSearch size="30"/></button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default SearchPage
