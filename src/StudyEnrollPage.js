import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./StudyEnrollPage.css"
import dalgu from './dalgu.png';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Home from './Home';

function StudyEnrollPage() {

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [student_number, setstudent_number] = useState("");
    const [track, setTrack] = useState("");
    const [user_study_name, setuser_study_name] = useState([]);

    const [course_id, setcourse_id] = useState([]);
    const [course_name, setcourse_name] = useState([]);
    const [professor_name, setprofessor_name] = useState([]);

    // 여기서는 Home.js와 다르다!! 
    const [study_name_list, setstudy_name_list] = useState([]);
    const [study_leader_id_list, setleader_id_list] = useState([]);
    const [study_number_limit_list, setnumber_limit_list] = useState([]);
    const [study_course_id_list, setstudy_course_id_list] = useState([]);
    const [study_introduction_list, setstudy_introduction_list] = useState([]);

    // 에러 메시지
    const [studynameError, setstudynameError] = useState('');
    const [courseidError, setcourseidError] = useState('');
    const [studyintroError, setstudyintroError] = useState('');
    const [memberlimitError, setmemberlimitError] = useState('');
    const [enrollerror, setenrollerror] = useState('');
    var [flag1, flag2, flag3, flag4] = [false, false, false, false];

    const location = useLocation();
    const navigate = useNavigate();

    const setUp = () => {
        console.log("location.state: ", location.state);
        setId(location.state.id);
        setPw(location.state.pw);
        setName(location.state.name);
        setstudent_number(location.state.student_number);
        setTrack(location.state.track);
        setuser_study_name(location.state.user_study_name);

        setcourse_id(location.state.course_id);
        setcourse_name(location.state.course_name);
        setprofessor_name(location.state.professor_name);
    };

    const clearinputs = () => {
		document.getElementById("studyname").value ='';
		document.getElementById("courseid").value ='';
		document.getElementById("studyintro").value ='';
		document.getElementById("memberlimit").value ='';
	};


    const getStudyList = async() => {
        console.log("xibal: ", course_id);
        await axios.get(`http://localhost:3001/api/coursepage/studylist?course_id=${course_id}&course_name=${course_name}&professor_name=${professor_name}`)
        .then((response) => {
            console.log("getStudy: ", response.data);
            if(Object.entries(study_name_list).toString() !== "" && Object.entries(study_name_list).toString() === Object.entries(response.data.study_name_list).toString()) {
                console.log("study_name_list is same");
                console.log("study_name_list: ", study_name_list, " and :", Object.entries(study_name_list).toString());
                console.log("response: ", response.data.study_name_list)
            }
            else{
                console.log("study_name_list is same");
                console.log("study_name_list: ", typeof study_name_list);
                console.log("response: ", typeof response.data.study_name_list)
                console.log("result: ", study_name_list === response.data.study_name_list);
                setstudy_name_list(response.data.study_name_list);
                setleader_id_list(response.data.study_leader_id_list);
                setnumber_limit_list(response.data.study_number_limit_list);
                setstudy_course_id_list(response.data.study_course_id_list);
                setstudy_introduction_list(response.data.study_introduction_list);
            }
            
        });
        // console.log("xibal 2 : ", data);
        // setstudy_name_list(data.study_name_list);
        // setleader_id_list(data.study_leader_id_list);
        // setnumber_limit_list(data.study_number_limit_list);
        // setstudy_course_id_list(data.study_course_id_list);
        // setstudy_introduction_list(data.study_introduction_list);
    }

    // "스터디 조회" 버튼을 누르면 스터디 조회 화면으로 이동
    const handleSearch = (e) => {
        const search_study_name = document.getElementById('search_study_name').value;

    };

    const handleEnroll = async (e) => {
        console.log("in handleEnroll");
        e.preventDefault();

        const _studyname = document.getElementById('studyname').value;
        const _courseid = document.getElementById('courseid').value;
        const _studyintro = document.getElementById('studyintro').value;
        const _memberlimit = document.getElementById('memberlimit').value;
        const _leaderid = id;

        if(_studyname === ''){
            setstudynameError("스터디 이름를 입력해주세요");
        } else {
            setstudynameError("");
            flag1 = true;
        }

        if(_courseid === ''){
            setcourseidError("과목 코드를 입력해주세요");
        } else{
            setcourseidError("");
            flag2 = true;
        }

        if(_studyintro === ''){
            setstudyintroError("스터디 소개를 입력해주세요");
        } else{
            setstudyintroError("");
            flag3 = true;
        }

        if(_memberlimit === ''){
            setmemberlimitError("최대 인원을 입력해주세요");
        } else{
            setmemberlimitError("");
            flag4 = true;
        }
        
        console.log("in handleEnroll 22");
        if(flag1 && flag2 && flag3 && flag4){
            console.log("in handleEnroll 33");
            await axios.get('http://localhost:3001/api/studyenrollpage/enroll', {
                params: {
                    study_name: _studyname,
                    study_course_id: _courseid,
                    study_introduction: _studyintro,
                    study_number_limit: _memberlimit,
                    study_leader_id: id
                }
            }).then((response) => {
                console.log("response: ", response);
                if(response.data.enroll){
                    setenrollerror("스터디 등록에 성공했습니다!");
                    clearinputs();
                    // alert(response.data.enroll);
                    // navigate('/coursepage', {state: {id: id, pw: pw, name: name, student_number: student_number, track: track, user_study_name: user_study_name, course_id: course_id, course_name: course_name, professor_name: professor_name}});
                } else {
                    setenrollerror("스터디 등록에 실패했습니다! 이미 있거나, type 오류입니다.");
                }
            });


        }

    };

    useEffect(() => {
        setUp();
        getStudyList();
        // getStudyList();
        console.log("useEffect 1");
    }, []);

    // 흠 무한루프를 각오하고 여기 study_name_list를 넣을까..
    // id, pw, course_id, course_name, professor_name, study_name_list, study_leader_id_list

    return (
        <div>
            <div className="header">
				<Link to="/Home" state={{ id: id, pw: pw }}>
					<h1 className="head">Dgi-study</h1>
				</Link>
			</div>

            <div className="study-enroll">
                <div className="study-enrollContainer">
                    <div className="text">
                        <h2> 스터디 등록하기 </h2>
                    </div>
                    <div className="study-box">   
                        <Grid container spacing={8}>
                            <Grid item xs={8}>
                            <div className="text">
                                {/* <h2>{course_name} 수업에 등록된 스터디</h2> */}
                            </div>    
                            
                            <div className = "enroll-box">

                                

                                <div className = "enroll-box-box">
                                    <Grid item xs={4}>
                                        <h2> 스터디 이름 </h2>      
                                    </Grid>
                                    <input id="studyname" placeholder="스터디 이름을 적어주세요..." type="text"/>                                  
                                </div>
                                <p className="errorMsg">{studynameError}</p>
                                <div className = "enroll-box-box">
                                    <Grid item xs={4}>
                                        <h2> 과목 코드 </h2>      
                                    </Grid>
                                    <input id="courseid" placeholder="과목 코드를 적어주세요..." type="text"/>
                                    
                                </div>
                                <p className="small">* 컴퓨터공학 트랙/전자공학 트랙</p>
                                <p className="small">* 컴퓨터 알고리즘: CSE301, 딥러닝개론: CSE303, 운영체제: CSE304, 데이터베이스개론: CSE401</p>
                                <p className="small">* 컴퓨터 네트워크: CSE403, 통신의 기초: EE305, 전자소자개론: EE302</p>
                                <p className="errorMsg">{courseidError}</p>
                                <div className = "enroll-box-box">
                                    <Grid item xs={4}>
                                        <h2> 스터디 소개 </h2> 
                                    </Grid>   
                                    <input id="studyintro" placeholder="(200자 이내) 스터디 소개를 적어주세요..." type="text"/>
                                    
                                </div>
                                <p className="errorMsg">{studyintroError}</p>
                                <div className = "enroll-box-box">
                                    <Grid item xs={4}>
                                        <h2> 최대 인원 </h2> 
                                    </Grid>   
                                    <input id="memberlimit" placeholder="최대 인원을 적어주세요..." type="text"/>
                                    
                                </div>
                                <p className="errorMsg">{memberlimitError}</p>
                                <p className="errorMsg">{enrollerror}</p>

                                <button className="btn" onClick={handleEnroll}> 스터디 등록하기 </button>

                            </div>                




                            </Grid>

                            <Grid item xs={4}>
                                
                                <Card sx={{ maxWidth: 250, columnGap: 3}}>
                                    <CardActionArea>
                                        <img src={ dalgu } width="100" height="100" alt="My Image" />
                                    
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {name}님 환영합니다!
                                            </Typography>
                                            <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    아이디: {id}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    학번: {student_number}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    소속: 기초학부
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    트랙: {track}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    스터디 참가: {user_study_name.length} 개
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                    </CardActionArea>
                                </Card>
                                
                                <div className="right-box">
                                    
                                    <Card sx={{maxWidth: 250, height: 180, columnGap: 4}}>
                                    
                                        <div className="text">
                                            <h3> 스터디 조회하기 </h3>
                                        </div>
                                        <div className="input-text-field">
                                            <input id="search_study_name" placeholder="스터디 이름을 입력해주세요..." type="text"/>	
                                            <button className="btn-search" onClick={handleSearch}>스터디 조회</button>
                                            {/* <div className='btn-search'>
                                                <button className="btn-course">등록된 스터디 보기</button>
                                                <Button variant="contained" color="primary" onClick={handleSearch} disableElevation>
                                                    <p>제출하기</p>
                                                </Button>	
                                            </div> */}
                                        
                                        </div>
                                    </Card>

                                    
                                </div>

                            </Grid>

                        </Grid>    
                        
                
                        
                    </div>
                </div>


                {/* 로그아웃 버튼 */}
                <div className="footer">
                    <div className="blank">
                        <Link to="/Home" state={{ id: id, pw: pw }}>
                            <button className="btn-logout">홈 화면</button>
                        </Link>
                        <Link to="/">
                            <button className="btn-logout">로그아웃</button>
                        </Link>
                    </div>
                </div>


            </div>


        </div>
    )

}

export default StudyEnrollPage;