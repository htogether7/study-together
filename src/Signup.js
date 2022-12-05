import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"
import image from './dalgu.png';

function Signup() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [checkPw, setCheckPw] = useState("");
    const [name, setName] = useState("");
    const [studentNumber, setStudentNumber] = useState(0);
    const [track, setTrack] = useState('');
    const [takeCourse, setTakeCourse] = useState('');
    const [errMessage, setErrMessage] = useState(0);
    const navigate = useNavigate();
    
    // 에러 메시지
    const [idError, setidError] = useState('');
    const [pwError, setpwError] = useState('');
    const [checkPwError, setcheckPwError] = useState('');
    const [nameError, setnameError] = useState('');
    const [studentNumberError, setstudentNumberError] = useState('');
    const [trackError, settrackError] = useState('');
    const [takecourseError, settakecourseError] = useState('');
    const [signupError, setsignupError] = useState('');


    const clearinputs = () => {
		document.getElementById("id").value ='';
		document.getElementById("pw").value ='';
		document.getElementById("checkPw").value ='';
		document.getElementById("name").value ='';
		document.getElementById("studentNumber").value ='';
        document.getElementById("track").value ='';
        document.getElementById("takecourse").value ='';
	};

    const handleSignUp = async (e) => {
        console.log("in handleSignUp");
        e.preventDefault();

        const _id = document.getElementById("id").value;
        const _pw = document.getElementById("pw").value;
        const _checkPw = document.getElementById("checkPw").value;
        const _name = document.getElementById("name").value;
        const _studentNumber = document.getElementById("studentNumber").value;
        const _track = document.getElementById("track").value;
        const _takecourse = document.getElementById("takecourse").value;
        const _track_list = ['물리학', '화학', '생명과학', '기계공학', '전자공학', '화학공학', '컴퓨터공학', '재료공학'];
        var [flag1, flag2, flag3, flag4, flag5, flag6, flag7] = [false, false, false, false, false, false];

        if(_id === ''){
            setidError("아이디를 입력해주세요");
        } else {
            setidError("");
            flag1 = true;
        }

        if(_pw === ''){
            setpwError("비밀번호를 입력해주세요");
        } else{
            setpwError("");
            flag2 = true;
        }

        if(_checkPw === ''){
            setcheckPwError("비밀번호를 입력해주세요");
        } else if(_pw === _checkPw){
            setcheckPwError("");
            flag3 = true;
        }
        else{
            setcheckPwError("");
            setcheckPwError("비밀번호가 일치하지 않습니다!");
        }

        if(_name === ''){
            setnameError("이름을 입력해주세요");
        } else{
            setnameError("");
            flag4 = true;
        }

        if(_studentNumber === ''){
            setstudentNumberError("학번을 입력해주세요");
        } else{
            setstudentNumberError("");
            flag5 = true;
        }

        if(_track === ''){
            settrackError("트랙을 입력해주세요");
        } else if(_track_list.includes(_track) === false){
            settrackError("존재하지 않는 트랙입니다!");
        } else{
            settrackError("");
            flag6 = true;
        }

        if(_takecourse === ''){
            settakecourseError("수강 과목을 입력해주세요"); 
        } else{
            settakecourseError("");
            flag7 = true;
        }

        console.log("flag: ", flag1, flag2, flag3, flag4, flag5, flag6, flag7);

        if(flag1 && flag2 && flag3 && flag4 && flag5 && flag6 && flag7){
            console.log("in if");
            setId(_id);
            setPw(_pw);
            setCheckPw(_checkPw);
            setName(_name);
            setStudentNumber(_studentNumber);
            setTrack(_track);
            setTakeCourse(_takecourse);
            await axios
                .get(
                    `http://localhost:3001/api/check?id=${_id}&pw=${_pw}&checkPw=${_checkPw}&name=${_name}&studentNumber=${_studentNumber}&track=${_track}&takecourse=${_takecourse}`
                )
                .then((response) => {
                    if (response.data.signup == 1) {
                        setsignupError("성공적으로 회원가입 되었습니다!");
                        clearinputs();
                        // navigate("/");
                    } else if (response.data.signup == 2) {
                        setErrMessage(2);
                        setsignupError("비밀번호를 다시 확인해주세요!");
                        console.log("비밀번호를 다시 확인해주세요");
                    } else if (response.data.signup == 3) {
                        setErrMessage(3);
                        setsignupError("이미 존재하는 아이디입니다!");
                        clearinputs();
                        console.log("이미 존재하는 아이디입니다");
                    }
                });
        }
    };


    return (
        <div>
            <div className="header">
                <Link to="/">
                    <h1 className="head">Dgi-study</h1>
                </Link>
                
            </div>
            
            <div className="signup">
                <div className="signupContainer">
                    <div className="text">
                        <img src={ image } width="50" height="50" alt="My Image" />
                        <h1>회원가입</h1>
                    </div>
                    <div className="box">
                        <h2>아이디</h2>
                        <input id="id" placeholder="사용자 아이디를 적어주세요..." type="text"/>
					    <p className="errorMsg">{idError}</p>

                        <h2>비밀번호</h2>
                        <p className="small">* 최소 네 자리 이상 입력!</p>
                        <input id="pw" placeholder="비밀번호를 적어주세요..." type="password"/>
                        <p className="errorMsg">{pwError}</p>

                        <h2>비밀번호 확인</h2>
                        <input id="checkPw" placeholder="비밀번호를 적어주세요..." type="password"/>
                        <p className="errorMsg">{checkPwError}</p>

                        <h2>이름</h2>
                        <p className="small">* 실제 이름을 입력!</p>
                        <input id="name" placeholder="이름을 적어주세요..." type="text"/>
                        <p className="errorMsg">{nameError}</p>

                        <h2>학번</h2>
                        <input id="studentNumber" placeholder="학번을 적어주세요..." type="text"/>
                        <p className="errorMsg">{studentNumberError}</p>

                        <h2>트랙</h2>
                        <p className="small">* 이학: 물리학, 화학, 생명과학</p>
                        <p className="small">* 공학: 기계공학, 전자공학, 화학공학, 컴퓨터공학, 재료공학</p>
                        <input id="track" placeholder="트랙을 적어주세요..." type="text"/>
                        <p className="errorMsg">{trackError}</p>

                        <h2>수강하고 있는 수업</h2>
                        <p className="small">* 컴퓨터공학 트랙/전자공학 트랙</p>
                        <p className="small">* 컴퓨터 알고리즘: CSE301, 딥러닝개론: CSE303, 운영체제: CSE304, 데이터베이스개론: CSE401</p>
                        <p className="small">* 컴퓨터 네트워크: CSE403, 통신의 기초: EE305, 전자소자개론: EE302</p>
                        <p className="small">* 예시: CSE301, CSE303, CSE401</p>
                        <input id="takecourse" placeholder="수업을 컴마로 구분해서 적어주세요..." type="text"/>
                        <p className="errorMsg">{takecourseError}</p>

                        <p className="errorMsg">{signupError}</p>

                    </div>

                    <div className="footer">
                        <div className="blank">
                            <Link to="/">
                                <button className="btn-submit-form1">로그인 페이지</button>
                            </Link>
                        </div>
                        <div className="blank">
                            <button className="btn-submit-form2" onClick={handleSignUp}>회원가입</button>
                        </div>
                                
                    </div>

                    
                </div>
            </div>


           
        </div>
    );
};

export default Signup;