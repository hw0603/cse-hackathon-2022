import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";

function BbsDetail() {
  const { auth, setAuth } = useContext(AuthContext);

  const [bbs, setBbs] = useState({});
  const { seq } = useParams(); // 파라미터 가져오기

  const navigate = useNavigate();

  const getBbsDetail = async () => {
    await axios
      .get(`http://localhost:3000/bbs/${seq}`, {
        params: { readerId: auth ? auth : "" },
      })
      .then((resp) => {
        console.log("[BbsDetail.js] getBbsDetail() success :D");
        console.log(resp.data);

        setBbs(resp.data.bbs);
      })
      .catch((err) => {
        // console.log("[BbsDetail.js] getBbsDetail() error :<");
        // console.log(err);
      });
  };

  const deleteBbs = async () => {
    await axios
      .delete(`http://localhost:3000/bbs/${seq}`)
      .then((resp) => {
        console.log("[BbsDetail.js] deleteBbs() success :D");
        console.log(resp.data);

        if (resp.data.deletedRecordCount === 1) {
          alert("게시글을 성공적으로 삭제했습니다 :D");
          navigate("/bbslist");
        }
      })
      .catch((err) => {
        console.log("[BbsDetail.js] deleteBbs() error :<");
        console.log(err);
      });
  };

  useEffect(() => {
    getBbsDetail();
  }, []);

  const updateBbs = {
    seq: bbs.seq,
    id: bbs.id,
    title: bbs.title,
    content: bbs.content,
  };

  const parentBbs = {
    id: bbs.id,
    title: bbs.title,
  };

  return (
    <div>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <div>
          <span class="badge badge-pill badge-primary">수성구</span>&nbsp;
          <span class="badge badge-pill badge-primary">범어1동</span>
          <br />
          <span class="badge badge-pill badge-primary">교통</span>
        </div>
        <div className="my-3">
          &nbsp;
          {
            /* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
            localStorage.getItem("id") == bbs.id ? (
              <>
                <Link
                  className="btn btn-outline-secondary"
                  to="/bbsupdate"
                  state={{ bbs: updateBbs }}
                >
                  <i className="fas fa-edit"></i> 수정
                </Link>
                &nbsp;
                <button className="btn btn-outline-danger" onClick={deleteBbs}>
                  <i className="fas fa-trash-alt"></i> 삭제
                </button>
                &nbsp;
              </>
            ) : null
          }
          <Link className="btn btn-outline-secondary" to="/bbslist">
            <i className="fas fa-list"></i> 글목록
          </Link>
        </div>
      </div>

      <table className="table align-middle m-0">
        <tbody>
          <tr>
            {/* <th className="col-3">작성자</th> */}
            <th>
              <span>제목 들어가는 자리</span>
            </th>
            <td className="text-right">
              <span>2022-09-24</span>
            </td>
          </tr>

          <tr className="border-bottom">
            <th>작성자 들어가는 자리</th>
            <td className="text-right">
              <span>
                <span>공감 0</span> &nbsp;
                <span>조회수 0</span> &nbsp;
                <span>댓글 0</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="border-bottom bbsContent p-3 mb-4">내용</div>
      <div className="text-center">
        <button type="button" className="btn btn-primary btn-lg">
          공감하기
        </button>{" "}
        &nbsp;
        <button type="button" className="btn btn-danger btn-lg">
          반대하기
        </button>
      </div>
      <h4 className="text-center my-4">
        <span>
          <i className="far fa-thumbs-up"></i>0
        </span>&nbsp;&nbsp;
        <span>
          <i className="far fa-thumbs-down"></i>0
        </span>
        </h4>

      {/* 댓글 작성 컴포넌트 */}
      {auth ? ( // 로그인한 사용자만 댓글 작성 가능
        <CommentWrite seq={seq} />
      ) : null}

      {/* 댓글 리스트 컴포넌트 */}
      <CommentList seq={seq} />
    </div>
  );
}

export default BbsDetail;
