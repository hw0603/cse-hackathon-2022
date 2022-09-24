import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Appcontext } from "../../App";
import CitySelect from "../CitySelect";
import CategorySelect from "../CategorySelect";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

const Bbsdiv = styled.div`
  /* text-align: center; */
  width: 1100px;
  margin: 0 auto;
`;

const TitleInput = styled.input`
  padding: 0;
  height: 2rem;
  width: 1100px;
  margin: 0 auto;
`;

export default function BbsWrite() {
  const { auth, setAuth } = useContext(AuthContext);
  const { headers, setHeaders } = useContext(HttpHeadersContext);

  const { cities, category } = useContext(Appcontext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todayString, setTodayString] = useState("");
  const navigate = useNavigate();

  function dateFormat(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    // hour = hour >= 10 ? hour : '0' + hour;
    // minute = minute >= 10 ? minute : '0' + minute;
    // second = second >= 10 ? second : '0' + second;

    // return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return date.getFullYear() + "-" + month + "-" + day;
  }

  const checkContentsFilled = () => {
    if (cities["main_city"] === "") alert("구를 선택해주세요.");
    else if (cities["main_city"] !== "entire" && cities["sub_city"] === "")
      alert("읍/면/동을 선택해주세요.");
    else if (category === "") alert("업무 카테고리를 선택해주세요.");
    else if (title === "") alert("제목을 입력해주세요.");
    else if (content === "") alert("내용을 입력해주세요.");
    else return true;

    return false;
  };

  const handleSubmit = async () => {
    if (checkContentsFilled()) createBbs();
  };

  const createBbs = async () => {
    const today = new Date();
    setTodayString(dateFormat(today));
    const req = {
      id: localStorage.getItem("id"),
      title: title,
      content: stringToHTML(content).querySelector("p").innerText,
      date: todayString,
      cities: cities,
      category: category,
    };

    await axios
      .post("http://localhost:3000/bbs", req, { headers: headers })
      .then((resp) => {
        console.log("[BbsWrite.js] createBbs() success :D");
        console.log(resp.data);

        alert("새로운 게시글을 성공적으로 등록했습니다 :D");
        navigate(`/bbsdetail/${resp.data.seq}`); // 새롭게 등록한 글 상세로 이동
      })
      .catch((err) => {
        console.log("[BbsWrite.js] createBbs() error :<");
        console.log(err);
      });
  };

  const stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  return (
    <>
      <Bbsdiv>
        <div className="selectbox">
          <CitySelect />
          <CategorySelect />
        </div>

        <TitleInput
          name="title"
          placeholder=" 제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="my-2 rounded"
        />
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder:
              "내용을 입력하세요. 여러분의 소중한 의견을 귀 기울여 듣겠습니다.",
          }}
          name="content"
          data={content}
          onChange={(event, editor) => {
            const string = editor.getData();
            setContent(string);
            console.log(string);
          }}
        />
        <button className="btn btn-outline-secondary" onClick={handleSubmit}>
          <i className="fas fa-pen"></i> 등록하기
        </button>
      </Bbsdiv>
    </>
  );
}
