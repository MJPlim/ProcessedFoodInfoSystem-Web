import React from 'react';
import {Button, Col, Container, Jumbotron, Row} from "reactstrap";
import "./FoodDetail.scss"

const FoodDetail = ({match}) => {
    // const []


    const {id} = match.params;
    return (
        <div>
            <Container>

                {/* 타이틀 영역 시작*/}
                <Row>
                    <Col md="10">
                        <p className="title">상품정보</p>
                    </Col>
                    <Col md="2">
                        <p className="offline">오프라인 구매처 찾기</p>
                    </Col>
                </Row>

                <hr className="titleHr"/>
                {/* 타이틀 영역 끝 */}

                <Row>
                    <Col md="6">
                    </Col>

                    <Col md="6">s</Col>
                </Row>
            </Container>

        </div>
    );
};

export default FoodDetail;