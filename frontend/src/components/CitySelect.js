import React, { useContext } from "react";
import { Appcontext } from "../App";
import styled from "styled-components";

const SelectBox = styled.select`
  display:inline-block;
  height: 2rem;
  width: 10rem;
  margin-right: 5px;
`;

var sub_junggu = [
  "동인동",
  "삼덕동",
  "성내1동",
  "성내2동",
  "성내3동",
  "대신동",
  "남산1동",
  "남산2동",
  "남산3동",
  "남산4동",
  "대봉1동",
  "대봉2동",
];
var sub_donggu = [
  "신암1동",
  "신암2동",
  "신암3동",
  "신암4동",
  "신암5동",
  "신천1·2동",
  "신천3동",
  "신천4동",
  "효목1동",
  "효목2동",
  "도평동",
  "불로·봉무동",
  "지저동",
  "동촌동",
  "방촌동",
  "해안동",
  "안심1동",
  "안심2동",
  "안심3동",
  "안심4동",
  "혁신동",
  "공산동",
];
var sub_seogu = [
  "내당1동",
  "내당2·3동",
  "내당4동",
  "비산1동",
  "비산2·3동",
  "비산4동",
  "비산5동",
  "비산6동",
  "비산7동",
  "평리1동",
  "평리2동",
  "평리3동",
  "평리4동",
  "평리5동",
  "평리6동",
  "상중이동",
  "원대동",
];
var sub_namgu = [
  "이천동",
  "봉덕1동",
  "봉덕2동",
  "봉덕3동",
  "대명1동",
  "대명2동",
  "대명3동",
  "대명4동",
  "대명5동",
  "대명6동",
  "대명9동",
  "대명10동",
  "대명11동",
];
var sub_bukgu = [
  "고성동",
  "칠성동",
  "침산1동",
  "침산2동",
  "침산3동",
  "노원동",
  "산격1동",
  "산격2동",
  "산격3동",
  "산격4동",
  "복현1동",
  "복현2동",
  "대현동",
  "검단동",
  "무태조야동",
  "관문동",
  "태전1동",
  "태전2동",
  "구암동",
  "관음동",
  "읍내동",
  "동천동",
  "국우동",
];
var sub_suseonggu = [
  "범어1동",
  "범어2동",
  "범어3동",
  "범어4동",
  "만촌1동",
  "만촌2동",
  "만촌3동",
  "수성1가동",
  "수성2·3가동",
  "수성4가동",
  "황금1동",
  "황금2동",
  "중동",
  "상동",
  "파동",
  "두산동",
  "지산1동",
  "지산2동",
  "범물1동",
  "범물2동",
  "고산1동",
  "고산2동",
  "고산3동",
];
var sub_dalseogu = [
  "성당동",
  "두류1·2동",
  "두류3동",
  "본리동",
  "감삼동",
  "죽전동",
  "장기동",
  "용산1동",
  "용산2동",
  "이곡1동",
  "이곡2동",
  "신당동",
  "월성1동",
  "월성2동",
  "진천동",
  "상인1동",
  "상인2동",
  "상인3동",
  "도원동",
  "송현1동",
  "송현2동",
  "본동",
];
var sub_dalseonggun = [
  "화원읍",
  "논공읍",
  "다사읍",
  "유가면",
  "옥포면",
  "현풍면",
  "가창면",
  "하빈면",
  "구지면",
];

export default function CitySelect() {
  const { cities, setCities } = useContext(Appcontext);

  const changeCity = (e) => {
    const { value, name } = e.target;
    setCities({ ...cities, [name]: value });
    console.log(cities);
  };

  const categoryChange = (e) => {
    console.log(e.target.value);
    changeCity(e);
    var sub = document.getElementById("sub_city");
    var tmp;
    switch (e.target.value) {
      case "entire":
        sub.disabled = true;
        break;
      case "junggu":
        sub.disabled = false;
        tmp = sub_junggu;
        break;

      case "donggu":
        sub.disabled = false;
        tmp = sub_donggu;
        break;

      case "seogu":
        sub.disabled = false;
        tmp = sub_seogu;
        break;

      case "namgu":
        sub.disabled = false;
        tmp = sub_namgu;
        break;

      case "bukgu":
        sub.disabled = false;
        tmp = sub_bukgu;
        break;

      case "suseonggu":
        sub.disabled = false;
        tmp = sub_suseonggu;
        break;

      case "dalseogu":
        sub.disabled = false;
        tmp = sub_dalseogu;
        break;

      case "dalseonggun":
        sub.disabled = false;
        tmp = sub_dalseonggun;
        break;

      default:
        sub.disabled = true;
    }
    sub.options.length = 0;
    var o = document.createElement("option");
    o.value = "";
    o.innerHTML = "읍/면/동 선택";
    sub.appendChild(o);

    for (var d in tmp) {
      var opt = document.createElement("option");
      opt.value = tmp[d];
      opt.innerHTML = tmp[d];
      sub.appendChild(opt);
    }
  };

  return (
    <>
      <SelectBox name="main_city" id="main_city" onChange={categoryChange} className="rounded">
        <option value="">구/군 선택</option>
        <option value="entire">전체</option>
        <option value="junggu">중구</option>
        <option value="donggu">동구</option>
        <option value="seogu">서구</option>
        <option value="namgu">남구</option>
        <option value="bukgu">북구</option>
        <option value="suseonggu">수성구</option>
        <option value="dalseogu">달서구</option>
        <option value="dalseonggun">달성군</option>
      </SelectBox>

      <SelectBox name="sub_city" id="sub_city" onChange={changeCity} className="rounded">
        <option value="">읍/면/동 선택</option>
      </SelectBox>
    </>
  );
}
