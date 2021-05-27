import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './MyAllergies.scss';
import axios from 'axios';
import { setUserAllergyInfo } from 'api';

function MyAllergies() {
  const [allergy, setAllergy] = useState('');
  const [allergyList, setAllergyList] = useState([]);

  console.log('0-0-0-0-0-0-0-0-0-0');
  console.log(allergy);

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      onClick();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setAllergy(e.target.value);
  };

  const onClick = () => {
    //여기서 서버랑 연동해서 해야함
    console.log('여기는 클릭부분에서 나오느 콘솔콘솔코코콘솔');
    console.log(allergy);
    setAllergyList([...allergyList, allergy]);
    console.log('여기서부터는 알러지 리스트 나오는 부분임');
    console.log(allergyList);
  };

  const createAllergy = async () => {
    try {
      await setUserAllergyInfo.setAllergies(allergyList);
      alert('등록되었습니다.');
    } catch (e) {
      alert(e.response.data['error-message']);
    }
  };

  return (
    <div>
      <p>알러지 종류</p>
      <br />
      <p>아몬드 우유 대두 밀 닭고기</p>
      <p>쇠고기 새우 오징어 잣 소고기</p>
      <p>돼지고기 메추리알 토마토 조개류 난류</p>
      <p>호두 복숭아 땅콩 게</p>
      <p>아황산류 메밀 계란</p>
      <hr />
      <p>위의 알러지 종류만 가능합니다.</p>
      <hr />
      <br />
      <div>
        <form className="allergyTable" onSubmit={handleSubmit}>
          <div>
            <label for="inputAllergy">알러지 입력</label>
            <input
              type="text"
              id="inputAllergy"
              placeholder="알러지를 입력하세요"
              // value={allergy}
              onChange={onChange}
              onKeyPress={onKeyPress}
            />
          </div>
          <hr />
          <div>{allergy}</div>
          <hr />
        </form>
        <button onClick={onClick}>
          <MdAdd />
        </button>
        <hr />
        <hr />
        <br />
        <div>{allergyList}</div>
        <hr />
        <hr />
        <p>등록하는부분달거달거달거!!!! ㅎㅎ</p>
        <button onClick={createAllergy}>등록!</button>
      </div>
    </div>
  );
}

export default MyAllergies;

// "allergyList": [
// "string"
//   ],
