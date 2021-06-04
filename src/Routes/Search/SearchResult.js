import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultStyle.scss';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Col } from 'reactstrap';
import ReactPaginate from 'react-paginate';

const SearchResult = ({ loading, result, pageSize, onClickPage, selectedPage }) => {
  const [page, setPage] = useState(selectedPage - 1);

  useEffect(() => {
    console.log(selectedPage);
    setPage(selectedPage - 1);
  }, [selectedPage]);

  const drawStar = (rating) => {
    switch (rating) {
      case '5.00':
        return <div className='rating_star'><AiFillStar size='20' /><AiFillStar size='20' /><AiFillStar
          size='20' /><AiFillStar size='20' /><AiFillStar size='20' /><AiFillStar size='20' /></div>;
      case '4.00':
        return <div className='rating_star'><AiFillStar size='20' /><AiFillStar size='20' /><AiFillStar
          size='20' /><AiFillStar size='20' /><AiOutlineStar size='20' /></div>;
      case '3.00':
        return <div className='rating_star'><AiFillStar size='20' /><AiFillStar size='20' /><AiFillStar
          size='20' /><AiOutlineStar size='20' /><AiOutlineStar size='20' /></div>;
      case '2.00':
        return <div className='rating_star'><AiFillStar size='20' /><AiFillStar size='20' /><AiOutlineStar
          size='20' /><AiOutlineStar size='20' /><AiOutlineStar size='20' /><AiOutlineStar size='20' /></div>;
      case '1.00':
        return <div className='rating_star'><AiFillStar size='20' /><AiOutlineStar size='20' /><AiOutlineStar
          size='20' /><AiOutlineStar size='20' /><AiOutlineStar size='20' /><AiOutlineStar size='20' /></div>;
      case '0.00':
        return <div className='rating_star'><AiOutlineStar size='20' /><AiOutlineStar size='20' /><AiOutlineStar
          size='20' /><AiOutlineStar size='20' /><AiOutlineStar size='20' /></div>;
    }
  };
  return (
    <div className='result'>
      {loading ? <div>Loading...</div> :
        <div className='result__container'>
          {result && result.length > 0 ?
            result.map((result, index) => (
              <div className='card-body'>
                <Link className='card-link' to={`/searchProduct/food/${result.foodId}`}>
                  <img className='foodImg' src={result.foodImageAddress} />
                  <h5 className='card-title'>{result.foodName}</h5>
                  <p className='card-text'>{(result.manufacturerName).split('_')[0]}</p>
                  <div>{drawStar(result.reviewRate)}</div>
                </Link>
              </div>

            )) : <div>No result</div>
          }
        </div>
      }

      <Col md={'12'} className={'pageDiv'}>
        {pageSize > 1 ?
          <ReactPaginate pageCount={pageSize} pageRangeDisplayed={10}
                         marginPagesDisplayed={1}
                         previousLabel={'이전'} nextLabel={'다음'}
                         containerClassName={'foodPaginate'}
                         pageClassName={'foodPage'}
                         activeClassName={'foodSelectedPage'}
                         onPageChange={onClickPage}
                         initialPage={selectedPage - 1}
          /> :
          null}

      </Col>
    </div>
  );
};
export default SearchResult;