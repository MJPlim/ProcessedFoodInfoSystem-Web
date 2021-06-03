import { useEffect, useState } from "react/cjs/react.production.min";

const SearchProduct=(props)=>{
  //const [searchTerm,setSearchTerm]=useState(null);

  return (
     <div>
   {props.location.state.searchTerm}
  </div>
  );
 

}
export default SearchProduct;