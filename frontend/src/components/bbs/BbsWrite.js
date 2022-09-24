import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Appcontext } from "../../App";
import CitySelect from "../CitySelect";
import CategorySelect from "../CategorySelect";

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
  const { articleList, setArticleList, cities, category } = useContext(Appcontext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  var convertedString;

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

  const onSubmit = (e) => {
    e.preventDefault();
    var today = new Date();
    const todayString = dateFormat(today);

    setArticleList(
      articleList.concat({ title, convertedString, todayString, cities, category })
    );
    console.log(title, convertedString, todayString, cities, category);
    setTitle("");
    setContent("");
  };

  // const createBbs = async() => {

  // 	const req = {
  // 		id: localStorage.getItem("id"),
  // 		title: title,
  // 		content: content
  // 	}

  // 	await axios.post("http://localhost:3000/bbs", req, {headers: headers})
  // 	.then((resp) => {
  // 		console.log("[BbsWrite.js] createBbs() success :D");
  // 		console.log(resp.data);

  // 		alert("새로운 게시글을 성공적으로 등록했습니다 :D");
  // 		navigate(`/bbsdetail/${resp.data.seq}`); // 새롭게 등록한 글 상세로 이동
  // 	})
  // 	.catch((err) => {
  // 		console.log("[BbsWrite.js] createBbs() error :<");
  // 		console.log(err);
  // 	});
  // }

  const stringToHTML = function (str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  return (
    <>
      <Bbsdiv>
        <h1>제언 작성</h1>

        <div>
          <CitySelect />
          <CategorySelect />
          </div>

        <TitleInput
          name="title"
          placeholder="제목 입력.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요.",
          }}
          name="content"
          data={content}
          onChange={(event, editor) => {
            const string = editor.getData();
            string &&
              (convertedString =
                stringToHTML(string).querySelector("p").innerText);
          }}
        />
        <button className="btn btn-outline-secondary" onClick={onSubmit}>
          <i className="fas fa-pen"></i> 등록하기
        </button>
      </Bbsdiv>
    </>
  );
}
