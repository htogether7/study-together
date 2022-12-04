import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css"
// import { useHistory } from "react-router"; => v6으로 upgrade 하면서 useNavigate가 대체
import image from './dalgu.png';


function Login (props) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [idError, setidError] = useState('');
    const [pwError, setpwError] = useState('');
	const [loginError, setloginError] = useState('');
    const navigate = useNavigate();
    // const history = useHistory();

    const clearInputs = () => {
        setId('');
        setPw('');	  
    };
      
    const clearErrors = () => {
        setidError('');
        setpwError('');	  
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (id === "" && pw === "") {
            setidError("아이디를 입력해주세요");
            setpwError("비밀번호를 입력해주세요");
            return;
        } else if(id === ""){
            setidError("아이디를 입력해주세요");
        } else if(pw === ""){
            setpwError("비밀번호를 입력해주세요");
        } else {
            axios.get(`http://localhost:3001/api/login?id=${id}&pw=${pw}`).then((response) => {
                if (response.data.login == 1) {
                    navigate(
                        "/Home",
                        {state:
                            {id: id,
                            pw: pw}
                        }
                    );
                } else {
                    clearInputs();
                    setloginError("아이디 또는 비밀번호가 일치하지 않습니다");
                    //setidError("아이디를 입력해주세요");
                    // navigate("/");
                }
            });
        }

        // axios.get(`http://localhost:3001/api/login?id=${id}&pw=${pw}`).then((response) => {
        //     if (response.data.login == 1) {
        //         navigate(
        //             "/Home",
        //             {state:
        //                 {id: id,
        //                 pw: pw}
        //             }
        //         );
        //     } else {
        //         navigate("/");
        //     }
        // });
    };

    return (
        <div>
            <div className="header">
                <Link to="/">
                    <h1 className="head">Dgi-study</h1>
                </Link>
                
            </div>

            <div className="login">
                <div className="loginContainer">
                    <div className="text">
                        <img src={ image } width="50" height="50" alt="My Image" />
                        <h1>로그인</h1>
                    </div>
                    <form className="box" onSubmit={handleLogin}>
                        <h2>아이디</h2>
                        <input 
                            id="name" 
                            placeholder="이름을 입력하세요..." 
                            onChange={(e) => setId(e.target.value)}
                            type="text"
                            required
                        />
                        <p className="errorMsg">{idError}</p>
                        <h2>비밀번호</h2>
                        <input 
                            id="password" 
                            placeholder="비밀번호를 입력하세요..." 
                            onChange={(e) => setPw(e.target.value)}
                            type="password"
                            required
                        />
                        <p className="errorMsg">{pwError}</p>
                        <p className="errorMsg">{loginError}</p>
                    </form>

                    <div className="footer">
                        <div className="blank">
                            <button className="btn-submit-form1" onClick={handleLogin}>로그인</button>
                        </div>
                                    
                        <div className="blank">
                            <Link to="/Signup">
                                <button className="btn-submit-form2">회원가입</button>
                            </Link>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default Login;