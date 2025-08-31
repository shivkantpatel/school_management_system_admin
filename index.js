const express = require ('express');
const query = require('querystring')
const path = require('path');
const app = express();
const bodyParser = require ('body-parser');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
 const dt= require ('dotenv')
dt.config()
const cors = require('cors')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const publicPath = path.join(__dirname,'public');
app.use(express.static('uploads'));
app.use('/ajaxfile', express.static(path.join(__dirname, 'ajaxfile')));


app.get('/',(req,res)=>{
    res.render('header/headerTop')
})

app.get('/backToHome',(req,res)=>{
    res.render('header/headerBackToHome')
       
});

//--------------------- file handaling start -----------------------------
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },

    filename:function(req,file,cb){
        cb(null,file.originalname)
    }

});

const upload = multer({storage:storage})
//--------------------- file handaling end -----------------------------





// ----------------------database import start----------------

    let conn = require('./connection/connection');

//----------------------database import end---------------------


//---------------------------- teacher section start ------------------------

// teacher validation file import ---------------------------------------
let teacherDataValidation = require('./allFunction/teacherValidataion')
// teacher validation file import ---------------------------------------
  

app.get('/teacherData',(req,res)=>{
    let validationerrData = req.query;
    
    
    res.render('teacher/teacherInsertData',{validationerrData})
});


app.post('/teacherInsertData', upload.single('photo'),teacherDataValidation,(req,res)=>{
    let error = validationResult(req);
    if(!error.isEmpty()){
        let teachervalidation = "";
        error.array().forEach(element=> teachervalidation+= element.path+"="+element.msg+"&"

        );     
        
         return res.redirect('/teacherData?'+teachervalidation)
        
    }
    const {teacher_code,first_name,last_name,gender,qualification,specialization,subject,phone_number,Email,address,permanent_address,hire_date,marital_status,Password}=req.body
   
    const img = req.file.originalname
    
    conn.connect((err)=>{
        if (err) {
            if (err) {
                return res.json({ error: err });
            }
        }
        let teacher_Attendancequery = 'insert into teacher_attendance_mast (teacher_id,attendance_date) values (?,?)';


        conn.query(teacher_Attendancequery,[teacher_code,hire_date],(err,result)=>{
            console.log('successs');
            
        })


        let query = 'INSERT INTO teachers_mast (teacher_code, first_name, last_name, gender, qualification, specialization, subject__, email, phone_number, address, permanent_address, hire_date, marital_status,PWD,photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)';
        let querData = [teacher_code , first_name , last_name , gender ,qualification, specialization , subject , Email , phone_number , address , permanent_address ,hire_date,marital_status,Password,img]
        conn.query(query,querData,(err,result) =>{
            if (err) {
                return res.json({ error: err });
            }

            res.redirect('/teacherAllShow');
        })
    })
    
});


app.get('/teacherAllShow',(req,res)=>{

    let query = 'select * my_local_db.from teachers_mast '
    conn.query(query,(err , result)=>{
        if(err) throw err
        res.render('teacher/teacherAllDataShow' , {result})
        
    });

});

app.post('/teachersearchData',(req,res)=>{

    const  search = req.body.searchInput.trim();

    let query = "select * from teachers_mast where teacher_code like '%"+search+"%' or  first_name like '%"+search+"%' or subject__ like'%"+search+"%' or email like '%"+search+"%'  "

    
   conn.query(query,(err,result)=>{
    if(err) throw err
    res.render('teacher/teacherSearchData',{result})
   })
    
})

//-------------------------------- teacher section end ------------------------


//------------------------------------student data start ---------------------
app.get('/studentData',(req,res)=>{
      
    let errdata = req.query  
   res.render('student/studentInsertData',{errdata})
})

// ------------student form validation importfile start
let studentFormValidation = require('./allFunction/studentFormVali');
const { error, log } = require('console');

// ------------student form validation importfile end

app.post('/studentDataInsert', upload.single('img'),studentFormValidation,(req,res)=>{
  
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let x = "";
        
        errors.array().forEach(er=>
            x += er.path+"="+er.msg+"&");


        return res.redirect ('/studentData?'+x);
       
    }


    console.log(req.file.originalname);
    const {Student_Roll_No , Student_Name , Father_Name , Mother_Name ,gender, Date_OF_Birth , Class , Section , Email , father_mobile_no , mother_mobile_no ,Password} = req.body

    const img = req.file.originalname


    let sqlstudentRollSeccondTable = 'insert into student_attendance_mast (student_id,cla_ss) values (?,?)';

    conn.query(sqlstudentRollSeccondTable,[Student_Roll_No,Class],(err,result)=>{
       
        
    })

    conn.connect((err)=>{
        let query = 'INSERT INTO student_mast (student_rollNo, student_name, father_name, mother_name, gender, date_of_birth, class, section, email, father_mobile_no, mother_mobile_no, photo, PWD) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let querData = [Student_Roll_No , Student_Name , Father_Name , Mother_Name ,gender, Date_OF_Birth , Class , Section , Email , father_mobile_no , mother_mobile_no ,img,Password]
        
        conn.query(query, querData, (err, result) => {
            if (err) throw err;
            console.log("success");
            console.log(`Image name: ${img}`);

            res.redirect('/viewAllStudent');

        });
    })
    

   
});

app.get('/viewAllStudent',(req,res)=>{

    let query = 'select * from student_mast';

    conn.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }

        res.render('student/studentAllDataShow',{result})
        
    })   
   
});


app.post('/StudentsearchData',(req,res)=>{
   
    let searchInput = req.body.searchInput.trim().toUpperCase();
    let query = "select * from student_mast where student_rollNo like '%"+searchInput+"%' or student_name like '%"+searchInput+"%' or father_name like '%"+searchInput+"%' or mother_name like '%"+searchInput+"%' or email like '%"+searchInput+"%' ";

    conn.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.render('student/studentSearchData',{result})
    })
})

app.get('/errPage',(req,res)=>{
    res.render('arr')
})
//----------------------------------------student data end------------------


// ------------------------------------feesh master section start ------------------


// --------------------------feesh validatin --------------------------------------------
let feesValidaionData = require('./allFunction/feesvalidation')
// --------------------------feesh validatin --------------------------------------------

app.get('/feeshMasterPage',(req,res)=>{
    res.render('feesh/feeshMaster')
})



app.post('/feeshMasterInertData',feesValidaionData,(req,res)=>{

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    const {fee_id , class_code , tuition_fee , library_fee ,sports_fee, transportation_fee , building_fund , extra_curricular_fee , total_fee } = req.body

    let query = 'INSERT INTO fee_mast (fee_id, class_code, tuition_fee, library_fee, sports_fee, transportation_fee, building_fund, extra_curricular_fee, total_fee) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let querData = [fee_id , class_code , tuition_fee , library_fee ,sports_fee, transportation_fee , building_fund , extra_curricular_fee , total_fee ]
    conn.query(query,querData,(err,result) =>{
        if (err) {
            return res.json({ error: err });
        }


         return res.json({ success: 'insertadta is success' });

    })
    

   
    
})
// ------------------------------------feesh master section end ------------------


// --------------------------------------teacherAttendance section start-------------------- 




app.get('/teacherAttendanceShow',(req,res)=>{

   let validerrData = req.query;
    conn.connect((err)=>{

        let towTableCombineSqlQuelry = 'select tm.teacher_code , tm.first_name ,ta.st_atus,ta.attendance_date,ta.narration from teachers_mast as tm INNER JOIN teacher_attendance_mast AS ta ON tm.teacher_code = ta.teacher_id';

        conn.query(towTableCombineSqlQuelry,(err,result)=>{
            if(err){
                return res.json({error:err})
            }
            res.render('teacher_attendance/teacherAtt_Show_data',{result,validerrData})
            
        })


    })
    
})

// teacher attendance validation -----------------
let teacher_attendanceValidation = require('./allFunction/teacherAttendance')
// teacher attendance validation -----------------

app.get('/teachersAttForm',(req,res)=>{
    let errValidaion= req.query;
    console.log(errValidaion);
    res.render('teacher_attendance/teacherInsertData',{errValidaion})
})
app.post('/teachersAttFormInsert',teacher_attendanceValidation,(req,res)=>{

    let error = validationResult(req);
    if(!error.isEmpty()){
        let teachervalidation = "";
        error.array().forEach(element=> teachervalidation+= element.path+"="+element.msg+"&"

        );

       return res.redirect('/teachersAttForm?'+teachervalidation)
        
    }

   const  {teacher_id,attendance_date,status__,narration}= req.body

   conn.connect((err)=>{
    if(err){
        return res.json({error:err})
    }
    let query = 'insert into teacher_attendance_mast (teacher_id,attendance_date,status__,narration) values (?,?,?,?)';
    let querData = [teacher_id,attendance_date,status__,narration];
     
    conn.query(query,querData,(err,result)=>{
        if(err){
            return res.json({errors:err})
        }
        res.redirect('/teacherAttendanceShow')
    })
   })
});

//---------------------------------teacher attendance validaion -----------------------
let validaionTeacher = require('./allFunction/teacherAttendance/AttendanceValidation');

app.post('/teacher_attendance',validaionTeacher,(req,res)=>{

    let error = validationResult(req);
    if(!error.isEmpty()){
        let validerrData = "";
        error.errors.forEach((v)=>
            validerrData += v.path+"="+v.msg+"&"
        );

       return res.redirect('/teacherAttendanceShow?'+validerrData);
        
    }
    const { attendance_date}  = req.body;
   
    let query = 'SELECT DISTINCT teacher_id   FROM teacher_attendance_mast ';
    let towTableCombineSqlQuelry = 'select distinct tm.teacher_code , tm.first_name  from teachers_mast as tm INNER JOIN teacher_attendance_mast AS ta ON tm.teacher_code = ta.teacher_id';
    conn.query(towTableCombineSqlQuelry, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.render('teacher_attendance/teacher_Attendance', { result ,attendance_date});
    });

    


});


app.post('/teacherAttendanceSubmit',(req,res)=>{

   const {teacher_id ,attendance_date,narration,status__ } = req.body;

   let array = [];

   for(let i = 0 ; i < teacher_id.length; i++){
       array.push([teacher_id[i],attendance_date[i],narration[i],status__[i] ])
   }
   let query = 'insert into teacher_attendance_mast (teacher_id,attendance_date,narration,st_atus) values ?'
   conn.query(query,[array],(err,result)=>{
       if(err)throw err
       res.redirect('/teacherAttendanceShow')
   })
});


app.post('/teacherSearch',(req,res)=>{
    const {teacher_id} = req.body
   

   let query3  = "select tm.first_name , tam.teacher_id ,tam.attendance_date,tam.st_atus,tam.narration from teachers_mast tm  inner join teacher_attendance_mast tam on tam.teacher_id = tm.teacher_code where tm.first_name like '%"+teacher_id+"%' or tam.teacher_id like '%"+teacher_id+"%' "

   conn.query(query3,(err,result)=>{
    if(err) throw err
    res.render('teacher_attendance/teacherSearch',{result})
   })
  

})



// --------------------------------------teacherAttendance section end-------------------- 

//---------------------------- student_attendance section start ---------------------

app.get('/studentAttendanceShow',(req,res)=>{

    let errData = req.query
    conn.connect((err)=>{
        if(err){
            return res.json({error:err})
        }
        
        let attendancequery = `SELECT sm.student_rollNo , sm.student_name ,sdm.cla_ss , sdm.attendance_date,sdm.st_atus,sdm.narration
        FROM student_mast sm 
        INNER JOIN student_attendance_mast sdm ON sm.student_rollNo = sdm.student_id;
        `
        conn.query(attendancequery,(err,result)=>{
            
            if(err){
                return res.json({error:err})
            }
            res.render('student_attendance/studentAtt_Show_data',{result,errData})
        })
        
    })
    
});




//------------------------------- student attendance validation----
let studentValidation = require ('./allFunction/studentAttendance')
//------------------------------- student attendance validation----

app.get('/studentAttForm',(req,res)=>{
    let attendanceValidation = req.query ; 
    console.log(attendanceValidation)
    res.render('student_attendance/studentInsertData',{attendanceValidation})
});

//--------------------------------------student addendance validation 

let st_udent_attendance = require('./allFunction/studentAttendance/studentValidation');


app.post('/student_attendance',st_udent_attendance,(req,res)=>{

    let error = validationResult(req);
    if(!error.isEmpty()){

        let x = ""
        error.array().forEach((v)=>
            x += v.path+"="+v.msg+"&"
            
        );
         return  res.redirect('/studentAttendanceShow?'+x)
       
    }
    
    const { cla_ss}  = req.body;
    const { attendance_date}  = req.body;
    
    const attendancequery = `
    SELECT DISTINCT sm.student_rollNo, sm.student_name , sdm.cla_ss
    FROM student_mast sm
    INNER JOIN student_attendance_mast sdm ON sm.student_rollNo = sdm.student_id
    WHERE sdm.cla_ss = ?
    `;
    
    conn.query(attendancequery,[cla_ss],(err,result)=>{
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        console.log(result);
        
        res.render('student_attendance/student_Attendance', { result ,attendance_date});
        
        
    })

});


app.post('/studentAttendanceSubmit',(req,res)=>{
    
    const {student_id ,cla_ss,attendance_date,narration,status__ } = req.body;

    let array = [];
       
    for(let i = 0 ; i < req.body.student_id.length; i++){
        array.push([student_id[i],cla_ss[i],attendance_date[i],status__[i],narration[i] ])
    }
    let query = 'insert into student_attendance_mast (student_id,cla_ss,attendance_date,st_atus,narration) values ?'
    conn.query(query,[array],(err,result)=>{
        if(err)throw err
        res.redirect('/studentAttendanceShow')
    })


});


app.post('/searchStudentRollNo',(req,res)=>{
    const {class__,Student_id} = req.body
 
    
   let query2 = "select sm.student_name ,sam.student_id,sam.cla_ss,sam.attendance_date,sam.st_atus,sam.narration  from student_mast sm inner join student_attendance_mast sam on sam.student_id = sm.student_rollNo where sam.Student_id like '%" + Student_id + "%' and sam.cla_ss like '%" + class__ + "%'   ";

   conn.query(query2,(err,result)=>{
    if(err)throw err
    res.render('student_attendance/studentSearch',{result})
    
   })

})

app.post('/studentAttFormInsert',studentValidation,(req,res)=>{

    let error = validationResult(req);
    if(!error.isEmpty()){
        let studentAttendancevalidation = "";
        error.array().forEach(element=> studentAttendancevalidation+= element.path+"="+element.msg+"&"

        );

       return res.redirect('/studentAttForm?'+studentAttendancevalidation)
        
    }
    const  {student_id,class__,attendance_date,status__,narration}= req.body
    
    
    conn.connect((err)=>{
     if(err){
         return res.json({error:err})
     }
     let query = 'insert into student_attendance_mast (student_id,cla_ss,attendance_date,st_atus,narration) values (?,?,?,?,?)';
     let querData = [student_id,class__,attendance_date,status__,narration];
      
     conn.query(query,querData,(err,result)=>{
         if(err){
             return res.json({errors:err})
         }
         res.redirect('/studentAttendanceShow')
     })
    })
 })

//---------------------------- student_attendance section end ---------------------


//------------------------------- student fee submition ------------------------

const studentFeesubmition = require('./router/studentFeeSubmission/studentFeeSubmission');

app.use(studentFeesubmition)

//------------------------------- student fee submition ------------------------


//-----------------------------marks section start-------------------------

const marks = require('./router/marks/marks')

app.use(marks);
//-----------------------------marks section end-------------------------


app.get('/images',(req,res)=>{
    res.sendFile(req.query.fileName);
       
});




let feemiddle = require('./middleware/totalfee')
app.use(feemiddle)

app.get('/headerloginLogout',(req,res)=>{
    res.render('headerLoginLogout/header')
})

app.listen( process.env.PORT || 6100)