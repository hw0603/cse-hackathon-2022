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
            <option value="transport">교통</option>
            <option value="nature">환경</option>
            <option value="education">교육</option>
            <option value="welfare">복지</option>
            <option value="recruit">고용</option>
            <option value="house">주거</option>
            <option value="etc">기타</option>
        </SelectBox>
    </>
  )
}

export default CategorySelect;