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

function Home(props){

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [studentNumber, setstudentNumber] = useState("");

    const [study_name, setstudy_name] = useState([]);
    const [leader_id, setleader_id] = useState([]);
    const [number_limit, setnumber_limit] = useState([]);
    const [course_id, setcourse_id] = useState([]);

    const [info, setInfo] = useState([
        // {
        //     study_name: "",
        //     study_id: "",
        //     leader_id: "",
        //     course_id: ""
        // }
    ]);

    const location = useLocation();

    // console.log(props.location.state);

    const setUp = () => {
        console.log("location.state: ", location.state);
        setId(location.state.id);
        setPw(location.state.pw);
        // axios.get(`http://localhost:3001/api/home?id=${id}&pw=${pw}`)
        // .then((response) => {
        //     console.log("response.data: ", response.data);
        //     setName(response.data.name);
        //     setstudentNumber(response.data.studentNumber);
        // });
    };

    const getName = () => {
        console.log("id: ", id);
        axios.get(`http://localhost:3001/api/home?id=${id}&pw=${pw}`)
        .then((response) => {
            console.log("response.data: ", response.data);
            setName(response.data.name);
            setstudentNumber(response.data.studentNumber);
        });
    }

    const getStudy = () => {
        axios.get(`http://localhost:3001/api/study?id=${id}&pw=${pw}`)
        .then((response) => {
            // console.log("response.data 22: ", response.data.study_name);
            // console.log("response.data 33: ", response.data.learder_id);
            // console.log("response.data 44: ", response.data.number_limit);
            // console.log("response.data 55: ", response.data.course_id);
            
            setstudy_name(response.data.study_name);
            setleader_id(response.data.leader_id);
            setnumber_limit(response.data.number_limit);
            setcourse_id(response.data.course_id);

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
    };

    useEffect(() => {
        setUp();
        getName();
        getStudy();
        console.log("useEffect 11");
        // console.log("here info: ", info);
    }, [id, pw]);

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
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={8}>
                            <div className="text">
                                <h2>{name}님이 참여하는 스터디</h2>
                            </div>    
                            
                            {
                                (study_name.length == 0) ? <h2> 아직 참가하는 스터디가 없습니다! </h2> :
                               
                                study_name.map((current, index) => {
                                    // console.log("hello: ", current);
                                    return(
                                        <div className="study-box-box">

                                            <Card sx={{ display: 'inline-block', maxWidth: 200, textAlign: 'left' }}>
                                                <CardActionArea>
                                                    
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">
                                                                {current}
                                                            </Typography>
                                                            <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    스터디장: {leader_id[index]}
                                                                </Typography>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    학번: {studentNumber}
                                                                </Typography>
                                                                <Typography gutterBottom variant="h7" component="div">
                                                                    인원수: {number_limit[index]}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    여기는 스터디 소개하는 글~
                                                                </Typography>
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
                                                    학번: {studentNumber}
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    소속: 기초학부
                                                </Typography>
                                                <Typography gutterBottom variant="h7" component="div">
                                                    트랙: 전자공학
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
                                    <h2>{name}님이 듣는 과목</h2>
                                </div>   

                                {
                                    (course_id.length == 0) ? <h2> 아직 듣는 수업이 없습니다! </h2> :
                                
                                    course_id.map((current, index) => {
                                        // console.log("hello: ", current);
                                        return(
                                            <div className="study-box-box">

                                                <Card sx={{ display: 'inline-block', maxWidth: 200, textAlign: 'left' }}>
                                                    <CardActionArea>
                                                        
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h6" component="div">
                                                                    과목 코드: {current}
                                                                </Typography>
                                                                <Box sx={{ alignItems: 'left', pl: 1, pb: 1}}>
                                                                    <Typography gutterBottom variant="h7" component="div">
                                                                        교수: 여기 해야함~
                                                                    </Typography>
                                                                    
                                                                    
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
                                <h2> reservation  </h2>





                            </Grid>
                        </Grid>    
                        
                
                        
                    </div>
                </div>


                {/* 로그아웃 버튼 */}
                <div className="footer">
                    <div className="blank">
                        <Link to="/">
                            <button className="btn-submit-form2">로그아웃</button>
                        </Link>
                    </div>
                </div>


            </div>


        </div>
    );

}

export default Home;