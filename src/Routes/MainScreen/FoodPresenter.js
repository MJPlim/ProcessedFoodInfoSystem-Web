import React from "react";
import PropTypes from "prop-types";

function Food({ id, nm, dcnm, dt,raw_nm,report_no }) {
  
  return (
  <div className="foods__info">
      <h4 className="food food__id">{id}</h4>
      <h5 className="food food__nm">{nm}</h5>
      <h5 className="food food__dcnm">{dcnm}</h5>
       <h5 className="food food__dt">{dt}</h5>
        <h5 className="food food__raw_nm">{raw_nm}</h5>
        <h5 className="food food_report_no">{report_no}</h5>
     </div>
  );
}
  Food.propTypes={
    id:PropTypes.number.isRequired,
    nm:PropTypes.string.isRequired,
    dcnm:PropTypes.number.isRequired,
    dt:PropTypes.string.isRequired,
    raw_nm:PropTypes.string.isRequired,
    report_no:PropTypes.arrayOf(PropTypes.string).isRequired
 
};

export default Food;