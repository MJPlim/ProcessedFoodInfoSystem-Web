import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import './MainScreenStyle.scss';
import {
  Row,
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Col,
  InputGroup,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import showImage from '../../image/needcomment.PNG';

function MainScreen() {
  return (
    <div className="mainScreen">
      <Container>
        <Row>
          <Col xs={6} md={12}>
            <Image className="showImage" src={showImage} rounded />
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
