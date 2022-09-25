import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Join() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [checkPwd, setCheckPwd] = useState("");
  const [isIdDupChecked, setIsIdDupChecked] = useState(false);
  const [isPwdSame, setIsPwdSame] = useState(false);
  const [email, setEmail] = useState("");
  const [IP, setIP] = useState("");
  const [addr, setAddr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (pwd === event.target.value) setIsPwdSame(true);
    else setIsPwdSame(false);
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
          setIsIdDupChecked(true);
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
  };

  const getLocation = async () => {
    setIsLoading(true);
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    await setIP(data.ip);

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
    setIsLoading(false);
  };

  const checkContentsFilled = () => {
    if (name === "") alert("별명을 입력하세요.");
    else if (id === "") alert("아이디를 입력하세요.");
    else if (pwd === "") alert("비밀번호를 입력하세요.");
    else if (email === "") alert("이메일을 입력하세요.");
    else if (addr === "") alert("'위치 인증' 버튼을 클릭해 위치를 확인하세요.");
    else if (isPwdSame === false)
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    else if (isIdDupChecked === false) alert("아이디 중복 확인을 해주세요.");
    else return true;

    return false;
  };

  /* 회원가입 */
  const join = async () => {
    if (checkContentsFilled()) {
      if (window.confirm("회원가입 하시겠습니까?")) {
        const req = {
          id: id,
          name: name,
          pwd: pwd,
          checkPwd: checkPwd,
          email: email,
          addr: addr,
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
      }
    }
  };

  return (
    <div>
      <table className="table jointable w-60">
        <tbody>
          <tr>
            <th className="align-middle">별명</th>
            <td>
              <input
                type="text"
                value={name}
                onChange={changeName}
                size="100px"
                className="input-lg"
              />
            </td>
          </tr>

          <tr>
            <th className="align-middle">아이디</th>
            <td>
              <input
                type="text"
                value={id}
                onChange={changeId}
                size="50px"
                className="input-lg"
              />
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
            <th className="align-middle">비밀번호</th>
            <td>
              <input
                type="password"
                value={pwd}
                onChange={changePwd}
                size="100px"
                className="input-lg"
              />
            </td>
          </tr>

          <tr>
            <th className="align-middle ">비밀번호 확인</th>
            <td className="my-auto">
              <input
                type="password"
                value={checkPwd}
                onChange={changeCheckPwd}
                size="100px"
                className="input-lg"
              />
              &nbsp;
              {checkPwd !== "" ? (
                isPwdSame ? (
                  <span class="badge badge-success">
                    <i className="fas fa-check" />
                    비밀번호가 일치합니다.
                  </span>
                ) : (
                  <span className="badge badge-danger my-auto">
                    <i className="fas fa-exclamation-triangle" />
                    &nbsp; 비밀번호가 일치하지 않습니다.
                  </span>
                )
              ) : null}
              {/* {isPwdSame ? (
                <span class="badge badge-success">
                  <i className="fas fa-check" />
                  비밀번호가 일치합니다.
                </span>
              ) : (
                <span className="badge badge-danger my-auto">
                  <i className="fas fa-exclamation-triangle" />
                  &nbsp; 비밀번호가 일치하지 않습니다.
                </span>
              )} */}
            </td>
          </tr>

          <tr>
            <th className="align-middle">이메일</th>
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
            <th className="col-2 align-middle">위치 인증</th>
            <td>
              <button className="btn btn-outline-primary" onClick={getLocation}>
                위치 인증하기
              </button>
              &nbsp; &nbsp;
              {!isLoading && addr ? (
                <span className="badge badge-success">
                  <i className="fas fa-check" />
                  &nbsp;
                  <span>
                    {addr[0]} {addr[1]}
                  </span>
                </span>
              ) : null}
              {isLoading ? (
                <span className="h6">위치 정보 가져오는 중...</span>
              ) : null}
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
