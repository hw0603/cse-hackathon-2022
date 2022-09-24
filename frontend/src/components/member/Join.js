/* 회원가입 컴포넌트 */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Join() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [email, setEmail] = useState("");
  const [IP, setIP] = useState("");
  const [addr, setAddr] = useState("");
  const navigate = useNavigate();

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const changeCheckPwd = (event) => {
    setCheckPwd(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  /* 아이디 중복 체크 */
  const checkIdDuplicate = async () => {
    await axios
      .get("http://localhost:3000/user", { params: { id: id } })
      .then((resp) => {
        console.log("[Join.js] checkIdDuplicate() success :D");
        console.log(resp.data);

        if (resp.status == 200) {
          alert("사용 가능한 아이디입니다.");
        }
      })
      .catch((err) => {
        console.log("[Join.js] checkIdDuplicate() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status == 400) {
          alert(resp.data);
        }
      });
    // try {
    //   const response = await fetch("http://localhost:3000/user", {
    //     params: { id: id },
    //   });
    //   const json = await response.json();

    //   console.log(response);
    //   console.log(json);

    //   if (response.ok) {
    //     alert("사용 가능한 아이디입니다.");
    //   }
    // } catch (err) {
    //   console.log("error :(");
    //   console.error(err);
    // }
  };

  const getLocation = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    await setIP(data.ip);

    const url = await `http://ip-api.com/json/${IP}`;
    const locationResponse = await fetch(`http://ip-api.com/json/${IP}`);
    const loc = await locationResponse.json();

    const lat = await loc.lat;
    const lon = await loc.lon;

    const reverseGeo = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBLa5MgCfBuccSAx8A-P-7StdANmKKHJic`
    );
    const geoResponse = await reverseGeo.json();

    const address = geoResponse.results[0].address_components;

    console.log(lat, lon);

    console.log(
      address[4].long_name,
      address[3].long_name,
      address[2].long_name
    );
    setAddr([address[3].long_name, address[2].long_name]);
  };

  // const getIP = async () => {

  //   setIP(data.ip);
  // }

  /* 회원가입 */
  const join = async () => {
    const req = {
      id: id,
      name: name,
      pwd: pwd,
      checkPwd: checkPwd,
      email: email,
      addr: addr
    };

    await axios
      .post("http://localhost:3000/user/join", req)
      .then((resp) => {
        console.log("[Join.js] join() success :D");
        console.log(resp.data);

        alert(resp.data.id + "님 회원가입을 축하드립니다 🎊");
        navigate("/login");
      })
      .catch((err) => {
        console.log("[Join.js] join() error :<");
        console.log(err);

        // alert(err.response.data);

        const resp = err.response;
        if (resp.status == 400) {
          alert(resp.data);
        }
      });
  };

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="col-2">아이디</th>
            <td>
              <input type="text" value={id} onChange={changeId} size="50px" />{" "}
              &nbsp; &nbsp;
              <button
                className="btn btn-outline-danger"
                onClick={checkIdDuplicate}
              >
                <i className="fas fa-check"></i> 아이디 중복 확인
              </button>
            </td>
          </tr>

          <tr>
            <th>이름</th>
            <td>
              <input
                type="text"
                value={name}
                onChange={changeName}
                size="50px"
              />
            </td>
          </tr>

          <tr>
            <th>비밀번호</th>
            <td>
              <input
                type="password"
                value={pwd}
                onChange={changePwd}
                size="50px"
              />
            </td>
          </tr>

          <tr>
            <th>비밀번호 확인</th>
            <td>
              <input
                type="password"
                value={checkPwd}
                onChange={changeCheckPwd}
                size="50px"
              />
            </td>
          </tr>

          <tr>
            <th>이메일</th>
            <td>
              <input
                type="text"
                value={email}
                onChange={changeEmail}
                size="100px"
              />
            </td>
          </tr>
          <tr>
            <th>위치 인증</th>
            <td>
              <button className="btn btn-outline-primary" onClick={getLocation}>
                위치 인증하기
              </button>
              &nbsp; &nbsp;
              {addr ? <span className="badge badge-success">
                <i className="fas fa-check" />&nbsp;<span>{addr[0]} {addr[1]}</span>
              </span> : null}
              
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div className="my-3 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={join}>
          <i className="fas fa-user-plus"></i> 회원가입
        </button>
      </div>
    </div>
  );
}

export default Join;
