import React from 'react';
import './MainScreenStyle.scss';
import { Row, Container, Col } from 'reactstrap';
import showImage from '../../image/needcomment.PNG';

function MainScreen() {
  return (
    <div className="mainScreen">
      <Container>
        <Row>
          <Col xs={6} md={12}>
            <img className="showImage" src={showImage} />
          </Col>
        </Row>
        <Row>
          <p>아메리카노</p>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
