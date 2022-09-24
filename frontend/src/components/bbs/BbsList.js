import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Appcontext } from "../../App";
import Pagination from "react-js-pagination";
import CitySelect from "../CitySelect";
import CategorySelect from "../CategorySelect";
import styled from "styled-components";

const SelectBox = styled.select`
  display: inline-block;
  height: 2rem;
  width: 10rem;
  margin-right: 5px;
`;

function BbsList() {
  const { articleList } = useContext(Appcontext);
  const [bbsList, setBbsList] = useState([]);

  // 검색용 Hook
  const [choiceVal, setChoiceVal] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // Paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  // Link 용 (함수)
  let navigate = useNavigate();

  const getBbsList = async (choice, search, page) => {
    await axios
      .get("http://localhost:3000/bbs", {
        params: { choice: choice, search: search, page: page },
      })
      .then((resp) => {
        console.log("[BbsList.js] useEffect() success :D");
        console.log(resp.data);

        setBbsList(resp.data.bbsList);
        setTotalCnt(resp.data.pageCnt);
      })
      .catch((err) => {
        console.log("[BbsList.js] useEffect() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    getBbsList("", "", 1);
  }, []);

  const changeChoice = (event) => {
    setChoiceVal(event.target.value);
  };
  const changeSearch = (event) => {
    setSearchVal(event.target.value);
  };
  const search = () => {
    console.log(
      "[BbsList.js searchBtn()] choiceVal=" +
        choiceVal +
        ", searchVal=" +
        searchVal
    );

    navigate("/bbslist");
    getBbsList(choiceVal, searchVal, 1);
  };

  const changePage = (page) => {
    setPage(page);
    getBbsList(choiceVal, searchVal, page);
  };
  return (
    <>
      <div>
        {/* 검색 */}
        <table className="search">
          <tbody>
            <tr>
              
            <td>
                {/* <select
                  className="custom-select"
                  value={choiceVal}
                  onChange={changeChoice}
                >
                  <option>검색 옵션 선택</option>
                  <option value="title">제목</option>
                  <option value="title_content">제목+내용</option>
                </select> */}
                <CategorySelect className="rounded" />
              </td>
              <td>
                {/* <select
                  className="custom-select"
                  value={choiceVal}
                  onChange={changeChoice}
                >
                  <option>구 선택</option>
                  <option value="title">제목</option>
                  <option value="title_content">제목+내용</option>
                </select> */}
                <CitySelect className="rounded" />
              </td>

            </tr>
            <tr>
              <td>
                {/* <select
                  className="custom-select"
                  value={choiceVal}
                  onChange={changeChoice}
                >
                  <option>검색 옵션 선택</option>
                  <option value="title">제목</option>
                  <option value="title_content">제목+내용</option>
                </select> */}
                <SelectBox
                  value={choiceVal}
                  onChange={changeChoice}
                  className="rounded"
                >
                  <option>검색 옵션 선택</option>
                  <option value="title">제목</option>
                  <option value="title_content">제목+내용</option>
                </SelectBox>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="검색어"
                  value={searchVal}
                  onChange={changeSearch}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={search}
                >
                  <i className="fas fa-search"></i> 검색
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <table className="table table-hover">
          <thead>
            <tr>
              <th className="col-md-1">번호</th>
              <th className="col-md-5">제목</th>
              <th className="col-md-1">글쓴이</th>
              <th className="col-md-1">지역</th>
              <th className="col-md-1">업무</th>
              <th className="col-md-1">작성일</th>
              <th className="col-md-1">조회수</th>
              <th className="col-md-1">공감</th>
            </tr>
          </thead>

          <tbody>
            {bbsList.map(function (bbs, idx) {
              return <TableRow obj={bbs} key={idx} cnt={idx + 1} />;
            })}
          </tbody>
        </table>

        <Pagination 
          className="pagination justify-content-center"
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={totalCnt}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={changePage}
        />

        <div className="my-5 d-flex justify-content-left">
          <Link className="btn btn-outline-secondary" to="/bbswrite">
            <i className="fas fa-pen"></i> &nbsp; 글쓰기
          </Link>
        </div>
      </div>
    </>
  );
}

function TableRow(props) {
  const bbs = props.obj;

  return (
    <tr>
      <th>{props.cnt}</th>
      {
        <>
          <td>
            <Arrow depth={bbs.depth}></Arrow> &nbsp; {/* 답글 화살표 */}
            <Link to={{ pathname: `/bbsdetail/${bbs.seq}` }}>
              {" "}
              {/* 게시글 상세 링크 */}
              <span className="underline bbs-title">{bbs.title} </span>{" "}
              {/* 게시글 제목 */}
            </Link>
          </td>
          <td>{bbs.id}</td>
        </>
      }
    </tr>
  );
}

const tap = "\u00A0\u00A0\u00A0\u00A0";
function Arrow(props) {
  const depth = props.depth;

  if (depth === 0) {
    return null;
  }

  const taps = [];
  for (let i = 0; i < depth; i++) {
    taps.push(tap);
  }

  return (
    <>
      {taps} <i className="fas fa-long-arrow-alt-right"></i>
    </>
  );
}

export default BbsList;
