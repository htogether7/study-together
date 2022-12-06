// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var db = require('./config/db');

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");
// const router = require("../router");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;
const mysql = require("mysql");
const { redirect } = require("react-router-dom");
const { areOptionsEqual } = require("@mui/base");
// const { default: StudyEnrollPage } = require("../src/StudyEnrollPage");
const e = require("express");
// const { default: Home } = require("../src/Home");

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kookie12!',
    database : 'study_together'
});

db.connect(function(err) {
    if (err) {
        console.log('db connection error: ' + err + ' ' + err.code);
        return;
    }
    console.log('db connection ok!');
});

// var conn = dbConfig.init();
// dbConfig.connect(conn);

// const PORT = process.env.PORT || 3001;
// const api = require('./routes/index');
// const cors = require('cors');

// 다른 포트 번호를 사용하는 웹페이지에서 데이터에 접근할 때 보안상 같은 출저의 페이지에서만 접근 할 수 있도록 
// 매커니즘이 만들어져 있기 때문에 오류가 난다. => npm install cors --save 로 해결
// cors를 설치하자.
// app.use(cors());
// app.use(bodyParser.json());
// app.use('./api', api);

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../build"))); // react-app/build를 사용하겠다

console.log('debug');

app.get("/api/login", (req, res) => {
    const submitted_id = req.query.id;
    const submitted_pw = req.query.pw;
    const sql = `SELECT * FROM user WHERE user.id = "${submitted_id}" and user.pw = "${submitted_pw}"`;
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        else {
            if (result.length == 0) {
            console.log("다시 확인 해주세요");
            res.json({ login: 0 });
            } else {
            console.log("로그인 성공");
            res.cookie("user", submitted_id, {
                expires: new Date(Date.now() + 900000),
            });
            res.json({ login: 1 });
            }
        }
    });
});
  
app.get("/api/logout", (req, res) => {
    res.clearCookie("user");
    res.json({ logout: 1 });
});

app.get("/api/check", (req, res) => {
    const submittedId = req.query.id;
    const submittedPw = req.query.pw;
    const submittedCheckPw = req.query.checkPw;
    const submittedName = req.query.name;
    const submittedStudentNumber = req.query.studentNumber;
    const submittedTrack = req.query.track;
    const submittedTakeCourse = req.query.takecourse.split(', ');
    const sql = `SELECT * FROM user WHERE user.id = "${submittedId}"`;
    const insertSql = `INSERT INTO user VALUES("${submittedId}", "${submittedPw}", "${submittedName}", "${submittedStudentNumber}", "${submittedTrack}")`;
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        else {
            if (result.length == 0) {
                if (submittedPw != submittedCheckPw) {
                    console.log("비밀번호를 다시 확인해주세요");
                    res.json({ signup: 2 });
                } else {
                    db.query(insertSql, (err, result, fields) => {
                        if (err) throw err;
                        else {
                            console.log("회원가입 완료!");
                            console.log("submittedTakeCourse: ", submittedTakeCourse)
                            // 회원가입한 후에는 courese_member에 추가해야 한다.
                            submittedTakeCourse.map((courseid) => {
                                const insertCourseMemberSql = `INSERT INTO course_member VALUES("${courseid}", "${submittedId}")`;
                                db.query(insertCourseMemberSql, (err, result, fields) => {
                                    if (err) throw err;
                                    else {
                                        console.log("course_member에 추가 완료!");
                                        // return res.json({ signup: 1 });
                                    }
                                });
                            
                            });
                            res.json({ signup: 1 });
                        }
                    });
                    // return res.json({ signup: 4 });
                }
            } else {
                res.json({ signup: 3 });
                console.log("이미 존재하는 아이디");
            }
        }
    });
});
  

/////////////////////////////////////
//////// Home.js에서 호출하는 함수 //////
/////////////////////////////////////

app.get("/api/home", (req, res) => {
    const submittedId = req.query.id;
    const submittedPw = req.query.pw;

    const sql = `SELECT * FROM user WHERE user.id = "${submittedId}" and user.pw = "${submittedPw}"`;
    console.log("here in /api/home");
    console.log("submittedId: ", submittedId);
    const name = "";
    const student_number = "";
    const track = "";
    db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else {
            // console.log("home22: ", result[0]);
            // result[0].forEach((item) => {
            //     console.log("home 3: ", ${item.name});
            // })
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                console.log(row.name);
                console.log(row.student_number);
                // name = row.name;
                // studentNumber = row.student_number;
                res.json({ 
                    name: row.name, 
                    student_number: row.student_number,
                    track: row.track,
                });
            });
            // res.json({ name: name, studentNumber: studentNumber });
        }
    });
});

app.get("/api/study", (req, res) => {

    const submittedId = req.query.id;
    const submittedPw = req.query.pw;

    // const sql = `SELECT * '+ 
    //             'FROM user WHERE user.id = "${submittedId}" and user.pw = "${submittedPw}"`;
    
    const sql = 'SELECT study.study_id, study.name, study.leader_id, study.number_limit, study.course_id, study_introduction ' +
                'FROM study ' +
                'INNER JOIN study_member AS sm ON sm.user_id = ' + mysql.escape(submittedId) + ' AND sm.study_id = study.study_id';

    console.log("here in /api/study");
    db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else {
            // console.log("study: ", result);

            // const study_name = [];
            // const study_leader_id = [];
            // const study_number_limit = [];
            // const study_course_id = [];
            // const info = [];
            const study_id = [];
            const study_name = [];
            const leader_id = [];
            const number_limit = [];
            const course_id = [];
            const study_introduction = [];

            Object.keys(result).forEach(function(key) {
                var row = result[key];

                console.log("key: ", key);
                console.log(row.name);
                console.log(row.leader_id);
                console.log(row.number_limit);
                console.log(row.course_id);
                // temp.push(row.name, row.leader_id, row.number_limit, row.course_id);
                // info.push(temp)
                study_id.push(row.study_id)
                study_name.push(row.name);
                leader_id.push(row.leader_id);
                number_limit.push(row.number_limit);
                course_id.push(row.course_id);
                study_introduction.push(row.study_introduction);
                
                // res.json({ 
                //     study_name: row.name, 
                //     leader_id: row.leader_id,
                //     number_limit: row.number_limit,
                //     course_id: row.course_id
                // });
            });
            // console.log(" /api/study course_id: ", course_id);
            res.json({
                study_id: study_id,
                study_name: study_name,
                leader_id: leader_id,
                number_limit: number_limit,
                course_id: course_id,
                study_introduction: study_introduction
            })
            // res.json({ study: result });
        }
    });
});


app.get('/api/course', (req, res) => {

    const submittedId = req.query.id;
    const submittedPw = req.query.pw;

    const sql = 'SELECT course.course_id, course.course_name, course.professor_name ' +
                'FROM course ' +
                'INNER JOIN course_member AS cm ON cm.user_id = ' + mysql.escape(submittedId) + ' AND cm.course_id = course.course_id';

    console.log("here in /api/course");
    db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else {
    
            const course_id = [];
            const course_name = [];
            const professor_name = [];

            Object.keys(result).forEach(function(key) {
                var row = result[key];

                // console.log("key: ", key);
                console.log(row.course_id);
                console.log(row.course_name);
                console.log(row.professor_name);
                
                course_id.push(row.course_id);
                course_name.push(row.course_name);
                professor_name.push(row.professor_name);
                
            });
            
            res.json({
                course_id: course_id,
                course_name: course_name,
                professor_name: professor_name
            })
            // res.json({ study: result });
        }
    });


});

/////////////////////////////////////
//// CoursePage.js에서 호출하는 함수 ////
/////////////////////////////////////

app.get('/api/coursepage/studylist', (req, res) => {

    const course_id = req.query.course_id;
    const course_name = req.query.course_name;
    const professor_name = req.query.professor_name;

    const sql = 'SELECT study.study_id, study.name, study.leader_id, study.number_limit, study.course_id, study_introduction ' +
                'FROM study ' +
                'INNER JOIN course ON study.course_id = course.course_id AND course.course_id = ' + mysql.escape(course_id);
    console.log("here in /api/coursepage/study 1: ", course_id);
    console.log("here in /api/coursepage/study 2: ", course_name);
    console.log("here in /api/coursepage/study 3: ", professor_name);

    db.query(sql, (err, result, fields) => {
        if(err) throw err;
        else {
    
            const study_id_list = [];
            const study_name_list = [];
            const study_leader_id_list = [];
            const study_number_limit_list = [];
            const study_course_id_list = [];
            const study_introduction_list = [];

            Object.keys(result).forEach(function(key) {
                var row = result[key];

                // console.log("key: ", key);
                console.log(row.name);
                // console.log(row.leader_id);
                // console.log(row.number_limit);

                study_id_list.push(row.study_id);
                study_name_list.push(row.name);
                study_leader_id_list.push(row.leader_id);
                study_number_limit_list.push(row.number_limit);
                study_course_id_list.push(row.course_id);
                study_introduction_list.push(row.study_introduction);

            });
            
            // console.log("study_course_id_list: ", study_course_id_list);
            res.json({
                study_id_list: study_id_list,
                study_name_list: study_name_list,
                study_leader_id_list: study_leader_id_list,
                study_number_limit_list: study_number_limit_list,
                study_course_id_list: study_course_id_list,
                study_introduction_list: study_introduction_list
            })
            // res.json({ study: result });
        }
    });
});


app.get("/api/coursepage/studymembercount", (req, res) => {

    const course_id = req.query.course_id;
    const course_name = req.query.course_name;
    const professor_name = req.query.professor_name;

    const sql = 'SELECT COUNT(study_id) AS count ' +
                'FROM study WHERE study.course_id = ' + mysql.escape(course_id);
    
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        else {
            console.log("studymembercount : ", result[0].count);
            res.json({ studymembercount: result[0].count });
        }
    });
                

});


app.get("/api/coursepage/studyjoin", (req, res) => {
    console.log("api/coursepage/studyjoin");
    const study_id = req.query.study_id;
    const study_name = req.query.study_name;
    const leader_id = req.query.study_leader_id;
    const study_num_limit = req.query.study_num_limit;
    const user_id = req.query.id;
    const student_number = req.query.student_number
    // const flag = '';

    // 1. 먼저 스터디에 인원 제한을 초과하지 않았는지 확인한다.
    const sql_1 = 'SELECT COUNT(user_id) AS count FROM study_member WHERE study_member.study_id = ' + mysql.escape(study_id);

    db.query(sql_1, (err, result, fields) => {
        if (err) throw err;
        else {
            console.log("studyjoin 1: ", result[0].count);
            console.log("studyjoin 2: ", study_num_limit);
            if (result[0].count < study_num_limit) {

                // 2. 스터디에 인원 제한을 초과하지 않았다면, 이미 스터디에 가입했는지 본다.
                const sql_2 = 'SELECT COUNT(user_id) AS count FROM study_member WHERE study_member.study_id = ' + mysql.escape(study_id) + ' AND study_member.user_id = ' + mysql.escape(user_id);
                db.query(sql_2, (err, result, fields) => {
                    if(err) throw err;
                    else {
                    
                        // 3. 스터디에 가입하지 않았다면, 새로 가입한다. 
                        console.log("check: ", result[0].count);
                        if(result[0].count === 0) {
                            const sql_3 = 'INSERT INTO study_member (study_id, user_id) VALUES ( ' + mysql.escape(study_id) + ', ' + mysql.escape(user_id) + ' )';
                            db.query(sql_3, (err, result, fields) => {
                                if (err) throw err;
                                else {
                                    console.log("studyjoin 3 / 가입 성공: ", result);
                                    res.json({ studyjoin: 0 });
                                }
                            });
                        }
                        
                        else{
                            console.log("studyjoin 4 / 이미 가입했음: ", result);
                            res.json({ studyjoin: 1 });
                        }
                    }

                });

                
            }
            else {
                // 3. 스터디에 인원 제한을 초과했다면, 스터디에 가입하지 않는다.
                console.log("studyjoin 5 / 인원초과로 인한 실패: ", result);
                res.json({ studyjoin: 2 });
            }
        }
        console.log("studyjoin 5.5 / 디버그");
    });

    console.log("studyjoin 6 / 디버그");
});



//     // 2. 초과하지 않았다면, 스터디에 가입한다.
//     const sql_2 = 'INSERT INTO study_member (study_id, user_id) VALUES (?, ?)';
//     const params = [study_id, user_id];

//     console.log("studyjoin");
//     db.query
// });

// leader name을 가져오는거 할지말지 고민중
app.get("/api/coursepage/getleadername", (req, res) => {


});

/////////////////////////////////////
// StudyBoardPage.js에서 호출하는 함수 //
/////////////////////////////////////

app.get("/api/studyboardpage/detail", (req, res) => {
    // console.log("study_detail!!");
    // const study_id = parseInt(req.query.id);
    const study_id = req.query.id;
    console.log("/api/studyboardpage/detail: ", study_id);
    // const sql = 'select * from study where study_id=${study_id}';
    const sql = 'select * from study where study_id= ' + mysql.escape(study_id);
    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      else {
        let studyId = "";
        let name = "";
        let leaderId = "";
        let courseId = "";
        let studyIntro = "";
  
        Object.keys(result).forEach(function (key) {
          var row = result[key];
          studyId = row.study_id;
          name = row.name;
          leaderId = row.leader_id;
          courseId = row.course_id;
          studyIntro = row.study_introduction;
        });
        res.json({
          id: studyId,
          name: name,
          leaderId: leaderId,
          courseId: courseId,
          studyIntro: studyIntro,
          data: result[0],
        });
      }
    });
});


app.get("/api/studyboardpage/post", (req, res) => {
    const studyId = req.query.id;
    const sql =
        "select post.post_id, post.post_content, post.user_id from study " +
        "join post on study.study_id = post.study_id " +
        "where study.study_id = " +
        mysql.escape(studyId);
    // `select post.post_id, post.post_content, post.user_id from study
    // join post
    // on study.study_id = post.study_id
    // where post.study_id = ${studyId}`;
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        else {
            let postList = [];
            Object.keys(result).forEach((key) => {
                const row = result[key];
                postList.unshift([row.post_id, row.post_content, row.user_id]);
            });
  
            // postList.sort((a, b) => a[0] - b[0]);
            // postList = postList.reverse();
            res.json({
                postList: postList,
            });
        } 
    });
  });
  

app.get("/api/studyboardpage/delete", (req, res) => {
    const postId = req.query.id;
    const sql = `delete from post where post.post_id = "${postId}"`;
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
    });
});
  

app.get("/api/studyboardpage/edit", (req, res) => {
    const postId = req.query.id;
    const postContent = req.query.content;
    const sql = `update post set post_content = ${postContent} where post_id = ${parseInt(
      postId
    )}`;
    db.query(sql, (err, result, fields) => {
      if (err) throw err;
    });
    // console.log(sql);
    // res.json({ a: 1 });
});


app.get("/api/studyboardpage/make", (req, res) => {
    const studyId = req.query.study_id;
    const postContent = req.query.content;
    const user = req.query.id;
    const sql = `insert into post values (null, "${studyId}", "${postContent}", "${user}")`;
    db.query(sql, (err, result, fields) => {
      if (err) throw err;
    });
});


app.get("/api/studyboardpage/people", (req, res) => {
    const studyId = req.query.id;
    const sql =
        `select COUNT(*) as count` +
        ` from study_member` +
        ` where study_id = ` +
        mysql.escape(studyId) +
        ` group by study_id`;

    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        let people = 0;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            people = row.count;
        });
        res.json({ presentPeople: people });
    });
});
  

app.get("/api/studyboardpage/name", (req, res) => {
    const user_id = req.query.id;
    const sql = "select name from user where id = " + mysql.escape(user_id);
    let name = "";
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            name = row.name;
        });
        res.json({ name: name });
    });
});
  

app.get("/api/studyboardpage/coursename", (req, res) => {
    const course_id = req.query.id;
    const sql =
        "select course_name as name from course where course_id = " +
        mysql.escape(course_id);
    let name = "";
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        Object.keys(result).forEach(function(key) {
            var row = result[key];
            name = row.name;
        });
        res.json({ name: name });
    });
});
  

app.get("/api/studyboardpage/edit", (req, res) => {
    const postId = req.query.id;
    const postContent = req.query.content;
    const sql = `update post set post_content = "${postContent}" where post_id = ${parseInt(
        postId
    )}`;
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
    });
    // console.log(sql);
    // res.json({ a: 1 }); 
});


//////////////////////////////////////
/// StudyEnrollPage.js에 사용되는 함수 ///
//////////////////////////////////////

app.get('/api/studyenrollpage/enroll', (req, res) => {

    console.log("here in api/studyenrollpage/enroll");
    const study_name = req.query.study_name;
    const study_course_id = req.query.study_course_id;
    const study_introduction = req.query.study_introduction;
    const study_number_limit = req.query.study_number_limit;
    const study_leader_id = req.query.study_leader_id;

    let study_id = 0;
    const enroll = -1;

    // 1. study table에 스터디를 등록해야 한다
    const sql = `insert into study values (null, "${study_name}", "${study_leader_id}", "${study_number_limit}", "${study_course_id}", "${study_introduction}")`;
    
    db.query(sql, (err, result, fields) => {
        if (err) throw err;
        else {
            console.log("study table에 스터디 등록 성공");
            // res.json({enroll : 0});

            //2. study_id를 구해와야 한다.
            const sql2 = `select study_id from study where study.name = "${study_name}" and study.leader_id = "${study_leader_id}"`;
            db.query(sql2, (err, result, fields) => {
                if (err) throw err;
                else {
                    console.log("스터디 id 구해오기 성공: ", result[0].study_id);
                    
                    study_id = result[0].study_id;
                    console.log("study_id: ", study_id);
                    // res.json({enroll : 1});
                    console.log("study_id 2: ", study_id);
                    
                    // 3. study_member table에 스터디장을 등록해야 한다
                    const sql3 = `insert into study_member values ("${study_id}", "${study_leader_id}")`;
                    db.query(sql3, (err, result, fields) => {
                        if (err) throw err;
                        else {
                            console.log("스터디장 study member table에 등록 성공");
                            res.json({enroll : 1});
                        }
                    });


                }
            });


        }
    });

    

    // console.log("study_id 2: ", study_id);
    // // 3. study_member table에 스터디장을 등록해야 한다
    // const sql3 = `insert into study_member values ("${study_id}", "${study_leader_id}")`;
    // db.query(sql3, (err, result, fields) => {
    //     if (err) throw err;
    //     else {
    //         console.log("스터디장 study member table에 등록 성공");
    //         res.json({enroll : 1});
    //     }
    // });

    

});




  
  // // 추가 (이게 핵심)
app.get('/api', function (req, res) {
    // res.send('여기로 들어왔지롱~');
    console.log("here into /api");
    var sql = 'SELECT * FROM user';
    db.query(sql, function (err, rows, fields) {
        if(!err) res.send(rows);
        else res.send('query is not excuted. select fail...\n' + err);
        console.log("rows: ", rows);
    });
    // console.log("fields: ", fields);
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});




// // 추가 (이건 그냥 별거 아님)
// app.get('/', function (req, res) {
//     res.send('메인 하이루~');
//     // res.send('하이루');
//     console.log("hello!");
// });

// // // 추가 (이게 핵심)
// app.get('/api', function (req, res) {
//     // res.send('여기로 들어왔지롱~');
//     console.log("here into /api");
//     var sql = 'SELECT * FROM user';
//     db.query(sql, function (err, rows, fields) {
//         if(!err) res.send(rows);
//         else res.send('query is not excuted. select fail...\n' + err);
//         console.log("rows: ", rows);
//     });
//     // console.log("fields: ", fields);
// });

// // app.listen(3000, () => console.log('포트 3000번에서 시작'));
// app.listen(PORT, () => {
//     console.log(`Server On : http://localhost:${PORT}/`);
// })

