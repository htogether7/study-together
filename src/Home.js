import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"
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

function Home(props){

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [student_number, setstudent_number] = useState("");
    const [track, setTrack] = useState("");

    const [study_id, setstudy_id] = useState("");
    const [study_name, setstudy_name] = useState([]);
    const [leader_id, setleader_id] = useState([]);
    const [number_limit, setnumber_limit] = useState([]);
    const [study_introduction, setstudy_introduction] = useState([]);
    const [course_id, setcourse_id] = useState([]);

    const [take_course_id, settake_course_id] = useState([]);
    const [course_name, setcourse_name] = useState([]);
    const [professor_name, setprofessor_name] = useState([]);

    const [info, setInfo] = useState([
        // {
        //     study_name: "",
        //     study_id: "",
        //     leader_id: "",
        //     course_id: ""
        // }
    ]);

    const location = useLocation();
    const navigate = useNavigate();
    // console.log(props.location.state);

    const setUp = () => {
        console.log("location.state: ", location.state);
        setId(location.state.id);
        setPw(location.state.pw);
        // axios.get(`http://localhost:3001/api/home?id=${id}&pw=${pw}`)
        // .then((response) => {
        //     console.log("response.data: ", response.data);
        //     setName(response.data.name);
        //     setstudent_number(response.data.student_number);
        // });
    };

    const getName = async() => {
        console.log("id: ", id);
        await axios.get(`http://localhost:3001/api/home?id=${id}&pw=${pw}`)
        .then((response) => {
            console.log("response.data: ", response.data);
            setName(response.data.name);
            setstudent_number(response.data.student_number);
            setTrack(response.data.track);
        });
    }

    const getStudy = async() => {
        await axios.get(`http://localhost:3001/api/study?id=${id}&pw=${pw}`)
        .then((response) => {
            // console.log("response.data 22: ", response.data.study_name);
            // console.log("response.data 33: ", response.data.learder_id);
            // console.log("response.data 44: ", response.data.number_limit);
            // console.log("response.data 55: ", response.data.course_id);
            
            setstudy_id(response.data.study_id);
            setstudy_name(response.data.study_name);
            setleader_id(response.data.leader_id);
            setnumber_limit(response.data.number_limit);
            setcourse_id(response.data.course_id);
            setstudy_introduction(response.data.study_introduction);

            // response.data.info.map((item) => {
            //     console.log("item: ", item);
            //     setInfo(info => [...info, item]);
            // });
            // setInfo(response.data.info);
            // Object.keys(response).forEach(function(key){

            //     console.log("key: ", key);
            //     console.log("value: ", response.data.info[key]);
            //     var temp = response.data.info[key];
            //     // var insert_temp = {
            //     //     study_name: temp[0],
            //     //     study_id: temp[1],
            //     //     leader_id: temp[2],
            //     //     course_id: temp[3]
            //     // }
            //     // setInfo([...info, insert_temp]);
            //     // setInfo(info.concat(insert_temp));
            // });
            
            // setInfo([...response.data, response.data]);
            // var temp = response.data;
            // setInfo(temp.concat(temp));
        });
        console.log("study_name: ", study_name);
        console.log("leader_id: ", leader_id);
        console.log("number_limit: ", number_limit);
        console.log("course_id: ", course_id);
        console.log("study_introduction: ", study_introduction);

    };

    const getCourse = async() => {
        await axios.get(`http://localhost:3001/api/course?id=${id}&pw=${pw}`)
        .then((response) => {
            // console.log("response.data: ", response.data);
            settake_course_id(response.data.course_id);
            setcourse_name(response.data.course_name);
            setprofessor_name(response.data.professor_name)
        });


    };


    // course_name[index], current, professor_name[index]
    // "등록된 스터디 보기" 버튼을 누르면 course 화면으로 이동
    const handleCourse = (event, course_name, course_id, professor_name) => {
        event.preventDefault();
        navigate("/CoursePage", {state: {
            id: id, 
            pw: pw, 
            name: name,
            student_number: student_number,
            track: track,
            study_name: study_name, /*스터디 개수를 알기 위해 필요*/ 
            course_id: course_id,
            course_name: course_name,
            professor_name: professor_name
        }});
    };
    // event, study_name_item, leader_id[index], student_number, number_limit[index], study_introduction[index])
    const handleStudy = (event, study_id_item, study_name_item, leader_id_item, course_id_item, student_bumber, number_limit_item, study_introduction) => {
        event.preventDefault();
        navigate("/StudyBoardPage", {state: {
            id: id,
            pw: pw,
            name: name,
            student_number: student_number,
            track: track,
            study_name_list: study_name, /*스터디 개수를 알기 위해 필요*/ 
            study_name: study_name_item,
            study_id: study_id_item,
            student_number: student_number,
            leader_id: leader_id_item,
            course_id: course_id_item,
            number_limit: number_limit_item,
            study_introduction: study_introduction
        }});
    };

    // "스터디 조회" 버튼을 누르면 스터디 조회 화면으로 이동
    const handleSearch = (event) => {
        event.preventDefault();
        const search_study_name = document.getElementById('search_study_name').value;

    };


    useEffect(() => {
        setUp();
        getName();
        getStudy();
        getCourse();
        console.log("useEffect 11");
        // console.log("here info: ", info);
    }, [id, pw, name, student_number]);

    // <CardMedia
    //     component="img"
    //     // width="80"
    //     // height="1080"
    //     sx={{ display: 'flex', alignItems: 'center', height: 100, width: 120}}
    //     image={dalgu}
    //     alt="dalgu"
    // />
    // const darkTheme = createTheme({ palette: { mode: 'dark' } });

    return (
        <div>
            <div className="header">
				<Link to="/Home">
					<h1 className="head">Dgi-study</h1>
				</Link>
			</div>

            <div className="home">
                <div className="homeContainer">
                    <div className="text">
                        <h2> 홈 화면 </h2>
                    </div>
                    <div className="study-box">   
                        <Grid container spacing={8}>
                            <Grid item xs={6} md={8}>
                            <div className="text">
                                <h2>{name}님이 참여하는 스터디</h2>
                            </div>    
                            
                            {
                                (study_name.length == 0) ? <h2> 아직 참가하는 스터디가 없습니다! </h2> :
                               
                                study_name.map((study_name_item, index) => {
                                    // console.log("hello: ", current);
                                    return(
                                        <div className="study-box-box">

                                            <Card sx={{ display: 'flex', minWidth: 200, maxWidth: 210 , minHeight: 250, textAlign: 'left', alignItems: 'left'}}>
                                                <CardActionArea>
                                                    
                                                    <CardContent>
                                                        <Typography variant="h6" component="div">
                                                            {study_name_item}
                                                        </Typography>
                                                        <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                스터디장: {leader_id[index]}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                과목 코드: {course_id[index]}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                인원수: {number_limit[index]}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                내용: {study_introduction[index]}
                                                            </Typography>

                                                            {/* 스터디 페이지 버튼 */}
                                                            
                                                            <div className="btn-space"> 
                                                                <button className="btn-study" onClick={(event => handleStudy(event, study_id[index], study_name_item, leader_id[index], course_id[index], student_number, number_limit[index], study_introduction[index]))}>자세히 보기</button>                                                               
                                                            </div>
                                                            
                                                        </Box>
                                                    </CardContent>
                                                    
                                                </CardActionArea>
                                            </Card>

                                            {/* <h2> {current} </h2>
                                            <div> {leader_id[index]} </div>
                                            <div> {number_limit[index]} </div>
                                            <div> {course_id[index]} </div> */}
                                        </div>
                                    )
                                })
                            }                            


                            </Grid>

                            <Grid item xs={6} md={4}>
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
                                                    학번: {student_number}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    소속: 기초학부
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    트랙: {track}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    스터디 참가: {study_name.length} 개
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                    </CardActionArea>
                                </Card>
                            </Grid>


                            <Grid item xs={6} md={8}>
    
                                <div className="text">
                                    <h2>{name}님이 현재 듣는 과목</h2>
                                </div>   

                                {
                                    (take_course_id.length == 0) ? <h2> 아직 듣는 수업이 없습니다! </h2> :
                                
                                    take_course_id.map((current, index) => {
                                        // console.log("hello: ", current);
                                        return(
                                            <div className="study-box-box">

                                                <Card sx={{ display: 'inline-block', width: 200, height: 180, textAlign: 'left'  }}>
                                                    <CardActionArea>
                                                        
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                {course_name[index]}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                과목 코드: {current}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h7" component="div">
                                                                교수: {professor_name[index]}
                                                            </Typography>
                                                            {/* <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    교수: {professor_name[index]}
                                                                </Typography>
                                                                
                                                            </Box> */}
                                                            {/* 스터디 페이지 버튼 */}
                                                        
                                                            <div className="btn-space">
                                                                <button className="btn-course" onClick={(event) => handleCourse(event, course_name[index], current, professor_name[index])}>등록된 스터디 보기</button>                                                         
                                                            </div>
                                                        </CardContent>
                                                        
                                                    </CardActionArea>
                                                </Card>

                                                {/* <h2> {current} </h2>
                                                <div> {leader_id[index]} </div>
                                                <div> {number_limit[index]} </div>
                                                <div> {course_id[index]} </div> */}
                                            </div>
                                        )
                                    })
                                } 



                            </Grid>
                            <Grid item xs={6} md={4}>

                                <div className="right-box">
                                    
                                    <Card sx={{maxWidth: 250, height: 200, columnGap: 4}}>
                                    
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
                        <Link to="/">
                            <button className="btn-logout">로그아웃</button>
                        </Link>
                    </div>
                </div>


            </div>


        </div>
    );

}

export default Home;