import React, {useState} from "react";
import {Spinner} from 'reactstrap';
import "./SearchStyle.scss";
import {Link} from "react-router-dom";
import axios from 'axios';
import {foodApi, bsshApi} from "../../api";
import "./SearchStyle.scss";

function SearchProduct() {

    return (
        <div className="SearchProduct">
            <div className="selection">
                <Link to="/searchProduct/food">
                    <button type="button" class="btn btn-outline-warning">음식 찾기</button>
                </Link>
                <Link to="/searchProduct/bssh">
                    <button type="button" class="btn btn-outline-warning">제조사 찾기</button>
                </Link>
            </div>
        </div>
    );
}

export default SearchProduct;