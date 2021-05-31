import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './MyAllergies.scss';
import axios from 'axios';
import { setUserAllergyInfo } from 'api';
import { Link } from 'react-router-dom';
import {
  Col,
  Container,
  Button,
  Card,
  CardText,
  Row,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonToggle,
} from 'reactstrap';
import { getUserAllergyInfo } from '../../api';

function MyAllergies() {
  const [allergy, setAllergy] = useState('');
  const [allergyList, setAllergyList] = useState([]);
  const [data, setData] = useState([]);
  const [allergyLoading, setAllergyLoading] = useState(true);
  const [checkC, setCheckC] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [shownAllergy1, setShownAllergy1] = useState([
    '아몬드',
    '우유',
    '대두',
    '밀',
    '닭고기',
    '쇠고기',
  ]);
  const [shownAllergy2, setShownAllergy2] = useState([
    '새우',
    '오징어',
    '잣',
    '소고기',
    '돼지고기',
    '메추리알',
  ]);
  const [shownAllergy3, setShownAllergy3] = useState([
    '토마토',
    '조개류',
    '난류',
    '호두',
    '복숭아',
    '땅콩',
  ]);
  const [shownAllergy4, setShownAllergy4] = useState([
    '게',
    '아황산류',
    '메밀',
    '계란',
  ]);

  useEffect(() => {
    try {
      gogogetAllergy();
      // setAllergyList([...allergyList, data]);
      console.log(allergyList, 'useEffect 기존 Data 알러지리스트');
    } catch (e) {
      console.log(e);
    }
  }, [!allergyLoading]);

  // const checkSetup = (shownAllergy1, data) => {
  //   setCheckC(checkC.filter((shownAllergy1 === data) {return Boolean});
  //   console.log('checkSetup 작동', checkC);
  // };

  const gogogetAllergy = async () => {
    await getUserAllergyInfo
      .userAllergies()
      .then((response) => {
        const result = response.data.userAllergyMaterials;
        setData(result);
        setAllergyLoading(false);
        console.log(data, '기존 알러지');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      console.log('유즈이펙트', allergy);
      if (allergy == '') {
        console.log('패스');
      } else {
        setAllergyList([...allergyList, allergy]);
        console.log(allergyList);
      }
    } catch (e) {
      console.log(e);
    }
  }, [allergy]);

  const onChange = (e) => {
    if (e.target.checked == true) {
      console.log('온체인지 true', e.target.checked);
      setAllergy(e.target.name);
    } else if (e.target.checked == false) {
      console.log('온체인지 false', e.target.checked);
      onRemove(e.target.name);
    }
  };

  const unCheckAll = () => {
    setAllergyList([]);
    createAllergy();
    window.location.replace('/userAllergyInfo');
  };

  const onRemove = (name) => {
    setAllergyList(allergyList.filter((allergy) => allergy !== name));
    console.log('onRemove 작동', allergyList);
  };

  // const oncc = useEffect(() => {
  //   setAllergyList([...allergyList, allergy]);
  //   console.log('여기는 함수 유즈이펙트', allergy);
  // }, [allergy]);

  // const onClick = (allergy) => {
  //   //여기서 서버랑 연동해서 해야함
  //   console.log('여기는 클릭부분에서 나오느 콘솔콘솔코코콘솔');
  //   console.log('온클릭', allergy);
  //   setAllergyList([...allergyList, allergy]);
  //   console.log('여기서부터는 알러지 리스트 나오는 부분임');
  //   console.log(allergyList);
  // };

  const createAllergy = async () => {
    try {
      await setUserAllergyInfo.setAllergies(allergyList);
      alert('저장되었습니다.');
      window.location.replace('/mypage');
    } catch (e) {
      alert(e.response.data['error-message']);
    }
  };

  return (
    <div className="myAllergies">
      <br />
      <br />
      <Container>
        <div>
          <Row>
            <Col md="10">
              <p className="changeAllergyInfo">알러리 정보 변경하기</p>
            </Col>
            {/* <Col md="2">
              <Button color="primary" size="sm" onClick={unCheckAll}>
                전부해제
              </Button>
            </Col> */}
            <Col md="2">
              <Link to="/mypage">
                <Button color="danger" size="sm">
                  취소하기
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <br />
        <br />
        {!allergyLoading && (
          <div>
            <Form className="checkboxGroup">
              {/* <Row>
                {shownAllergy1
                  .filter((index) => {
                    data.filter((data) => {
                      if (index == data) {
                        setCheckC(true);
                        console.log(checkC, '필터 부분');
                      } else if (index == data) {
                        setCheckC(false);
                        console.log(checkC, '필터 부분');
                      }
                    });
                  })
                  .map((index) => (
                    <Col md="2">
                      <FormGroup check inline>
                        <Label check>
                          <Input
                            type="checkbox"
                            name={index}
                            checked={checkC}
                            onChange={onChange}
                          />
                          {index}
                        </Label>
                      </FormGroup>
                    </Col>
                  ))}
              </Row> */}
              <Row>
                {shownAllergy1.map((index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="checkbox"
                          name={index}
                          onChange={onChange}
                        />
                        {index}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {shownAllergy2.map((index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="checkbox"
                          name={index}
                          onChange={onChange}
                        />
                        {index}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {shownAllergy3.map((index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="checkbox"
                          name={index}
                          onChange={onChange}
                        />
                        {index}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
              <Row>
                {shownAllergy4.map((index) => (
                  <Col md="2">
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="checkbox"
                          name={index}
                          onChange={onChange}
                        />
                        {index}
                      </Label>
                    </FormGroup>
                  </Col>
                ))}
              </Row>
            </Form>
            <Button
              outline
              color="warning"
              size="sm"
              block
              onClick={createAllergy}
            >
              저장하기
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default MyAllergies;

// "allergyList": [
// "string"
//   ],
