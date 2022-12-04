import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeConsumer } from "styled-components";
import "./StudyBoardPage.css"
import dalgu from './dalgu.png';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const StudyBoardPage = ({ match }) => {
    const { study_id } = useParams();
    //   const [studyId, setStudyId] = useState(parseInt(id));
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [track, setTrack] = useState("");
    const [studyNameList, setStudyNameList] = useState([]);

    const [studyName, setStudyName] = useState("");
    // const [studyId, setStudyId] = useState("");
    const [leaderId, setLeaderId] = useState("");
    const [numberLimit, setnumberLimit] = useState("");
    const [leaderName, setLeaderName] = useState("");
    const [courseId, setCourseId] = useState("");
    const [studyIntro, setStudyIntro] = useState("");
    const [postList, setPostList] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    
    const setUp = () => {
        console.log("StudyBoardPage location.state: ", location.state);
        setId(location.state.id);
        setPw(location.state.pw);
        setName(location.state.name);
        setStudentNumber(location.state.student_number);
        setTrack(location.state.track);
        setStudyNameList(location.state.study_name_list);

        setStudyName(location.state.study_name);
        // setStudyId(location.state.study_id);
        setLeaderId(location.state.leader_id);
        setnumberLimit(location.state.number_limit);
        // setLeaderName(location.state.leaderName);
        setCourseId(location.state.course_id);
        setStudyIntro(location.state.study_introduction);

    };

    //   console.log(id);
    const getStudyDetail = () => {
        axios
        .get(`http://localhost:3001/api/studyboardpage/detail?id=${id}`)
        .then((response) => {
            console.log("StudyBoardPage getStudyDetail(): ", response.data);
            // setStudyName(response.data.name);
            // setLeaderId(response.data.leaderId);
            // setCourseId(response.data.courseId);
            // setStudyIntro(response.data.studyIntro);
            // setLeaderName(response.data.leaderName);
        });
    };

    const getPost = () => {
        axios.get(`http://localhost:3001/api/studyboardpage/post?id=${id}`).then((response) => {
        setPostList(response.data.postList.reverse());
        });
    };

    const deletePost = (post_id) => {
        // console.log(post_id);
        axios.get(`http://localhost:3001/api/studyboardpage/delete?id=${post_id}`);
        getPost();
    };

    const editPost = (post_id) => {
        axios.get(`http://localhost:3001/api/studyboardpage/edit?id=${post_id}`);
    };

    // "스터디 조회" 버튼을 누르면 스터디 조회 화면으로 이동
    const handleSearch = (e) => {
        const search_study_name = document.getElementById('search_study_name').value;

    };

    //`http://localhost:3001/api/study?id=${id}&pw=${pw}`
    useEffect(() => {
        setUp();
        getStudyDetail();
        getPost();
        console.log("useEffect in StudyBoardPage");
        // console.log("스터디!");
    }, [id, pw, leaderId, courseId, studyIntro, leaderName]);
    console.log(postList);

    return (
        <div>
            <div className="header">
                <Link to="/Home">
                <h1 className="head">Dgi-study</h1>
                </Link>
            </div>

            <div className="studyboard">
                <div className="studyboardContainer">
                    <div className="text">
                        <h2> 스터디 게시판 </h2>
                    </div>
                    <div className="studyboard-box">
                        <Grid container spacing={8}>
                            <Grid item xs={8}>
                                <div className="text">
                                    <h2>"{studyName}" 스터디 정보</h2>
                                </div>  

                                <div className="left-box">
                                    <h3> 과목: {courseId} </h3>
                                    <h3> 스터디장: {leaderId} </h3>
                                    <h3> 최대인원: {numberLimit} </h3>
                                    <h3> 소개: {studyIntro}</h3>
                                </div>

                                <div className="text">
                                    <h2> 게시글 </h2>
                                    <div className="left-box">

                                        <table>
                                            <th>내용</th>
                                            <th>작성자</th>
                                            {postList.map((arr, ind) => (
                                                <tr>
                                                <td>{arr[1]}</td>
                                                <td>{arr[2]}</td>

                                                {location.state.id == arr[2] ? (
                                                    <button onClick={() => deletePost(arr[0])}>삭제</button>
                                                ) : (
                                                    <></>
                                                )}
                                                {location.state.id == arr[2] ? (
                                                    <button
                                                    onClick={() =>
                                                        navigate(`/edit/${arr[0]}`, {
                                                        state: {
                                                            id: arr[0],
                                                            content: arr[1],
                                                            study_id: id,
                                                            user: arr[2],
                                                        },
                                                        })
                                                    }
                                                    >
                                                    수정
                                                    </button>
                                                ) : (
                                                    <></>
                                                )}
                                                </tr>
                                            ))}
                                        </table>

                                    </div>
                                    

                                </div>  


                            </Grid>
                            <Grid item xs={4}>
                                <Card sx={{ maxWidth: 250 }}>
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
                                                    학번: {studentNumber}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    소속: 기초학부
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    트랙: {track}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    스터디 참가: {studyNameList.length} 개
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







            <h1>{studyName}</h1>
            <div>
                <ul>
                <li>과목 : {courseId}</li>
                <li>스터디장 : {leaderId}</li>
                <li>스터디 소개 : {studyIntro}</li>
                </ul>
            </div>
            <div>
                <div>게시글</div>
                <table>
                <th>내용</th>
                <th>작성자</th>
                {postList.map((arr, ind) => (
                    <tr>
                    <td>{arr[1]}</td>
                    <td>{arr[2]}</td>

                    {location.state.id == arr[2] ? (
                        <button onClick={() => deletePost(arr[0])}>삭제</button>
                    ) : (
                        <></>
                    )}
                    {location.state.id == arr[2] ? (
                        <button
                        onClick={() =>
                            navigate(`/edit/${arr[0]}`, {
                            state: {
                                id: arr[0],
                                content: arr[1],
                                study_id: id,
                                user: arr[2],
                            },
                            })
                        }
                        >
                        수정
                        </button>
                    ) : (
                        <></>
                    )}
                    </tr>
                ))}
                </table>
            </div>
            <button
                onClick={() =>
                navigate(`/make`, {
                    state: {
                    study_id: id,
                    user: location.state.id,
                    },
                })
                }
            >
                게시글 생성
            </button>
        </div>
  );
};

export default StudyBoardPage;