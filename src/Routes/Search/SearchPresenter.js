import React from "react";
import {Spinner} from 'reactstrap';
import "./SearchStyle.scss";
const SearchPresenter = ({
  results,
  loading,
  searchTerm,
  handleSubmit,
  error,
  updateTerm
}) => (
  <div>
    <form onSubmit={handleSubmit} className="form">
      <input className="searchTab"
        placeholder="제품명 또는 회사명을 입력하세요"
        value={searchTerm}
        onChange={updateTerm}
      />
      <button className="searchBtn"onClick={handleSubmit}>🔍</button>
    </form>
    <div className="resultSection">
    {loading ? (
      <Spinner color="warning" />
    ) : (
      <>
        {results && results.length > 0 ? (
          <div title="Results" className="results">
            {results.map(result => (
             <div className="item">
                <div className="prdName">{result.PRDLST_NM}</div>
               <div><img className="img" src="image/no-image.png"/></div>
                <div className="bshName">{result.BSSH_NM}</div>
                <div className="rowMaterial">{result.RAWMTRL_NM}</div>
                <div className="prdNum">{result.PRDLST_REPORT_NO}</div>  
                <hr></hr>
            </div>
            ))}
          </div>
        ):<div>검색결과가 없습니다.</div>}
    
     </>
    )}
  </div>
  </div>
);
export default SearchPresenter;