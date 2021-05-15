import React, { useCallback, useEffect, useState } from 'react';
import {
  MdAdd,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './MyAllergies.scss';

function MyAllergies() {
  const [allergy, setAllergy] = useState([]);

  console.log('0-0-0-0-0-0-0-0-0-0');
  console.log(allergy);

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      onClick();
    }
  };

  const onChange = (e) => {
    setAllergy({
      allergyList: e.target.value,
    });
  };

  const onClick = () => {
    //여기서 서버랑 연동해서 해야함
    console.log('여기는 클릭부분에서 나오느 콘솔콘솔코코콘솔');
    console.log(allergy);
  };

  const checkArray = () => {
    if (allergy == null) {
      <div>입력된 데이터 없음</div>;
    } else {
      <div className="allergyItem">
        <div className="checkBox">
          <MdCheckBoxOutlineBlank />
          <div className="text">여기에 알러지 들어옴</div>
        </div>
        <div className="remove">
          <MdRemoveCircleOutline />
        </div>
      </div>;
    }
  };
  return (
    <div>
      <form className="allergyTable">
        <div>
          <label for="inputAllergy">알러지 입력</label>
          <input
            type="text"
            id="inputAllergy"
            placeholder="알러지를 입력하세요"
            // value={allergy}
            onKeyPress={onKeyPress}
            onChange={onChange}
          />
        </div>
        <button onClick={onClick}>
          <MdAdd />
        </button>
        <hr />
        <div>{allergy}</div>
        <hr />
      </form>
    </div>
  );
}

export default MyAllergies;

// "allergyList": [
// "string"
//   ],
