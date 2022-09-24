import React, { useContext } from 'react'
import styled from 'styled-components';
import { Appcontext } from '../App';

const SelectBox = styled.select`
  display:inline-block;
  height: 2rem;
  width: 10rem;
`;
const CategorySelect = () => {
    const {category, setCategories} = useContext(Appcontext);
    const changeCategory = (e) => {
        setCategories(e.target.value);
        console.log(e.target.value);
    }
  return (
    <>
        <SelectBox onChange={changeCategory} className="rounded">
            <option value="">업무 선택</option>
            <option value="교통">교통</option>
            <option value="환경">환경</option>
            <option value="교육">교육</option>
            <option value="복지">복지</option>
            <option value="고용">고용</option>
            <option value="주거">주거</option>
            <option value="기타">기타</option>
        </SelectBox>
    </>
  )
}

export default CategorySelect;