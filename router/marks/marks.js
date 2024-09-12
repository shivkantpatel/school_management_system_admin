const express = require ('express');
const router = express();
const { body, validationResult } = require('express-validator');

let conn = require('../../connection/connection');


router.get('/marks_Master',(req,res)=>{
    res.render('marks/marks_master');
});

router.post('/marks_Master_insert',(req,res)=>{

    const  {mm_id , exam_type ,class_code, examDate } =  req.body

    let query = 'insert into marks_master (mm_id , exam_type ,class_code, dateOfExam) values (? , ? ,? , ? )';

    conn.query(query, [mm_id, exam_type,class_code, examDate], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            
           
        }

        res.send(`
            <div style="background-color: #e0d9d938; width: 100%; height: 100%; color: white; display: flex; justify-content: center; align-items: center;">
                <div style='align-items: center; display: flex; box-shadow: 0px 0 6px 2px #000; max-width: 540px; height: 200px;  background: #fff;  flex-direction: column;  padding: 30px; justify-content: center;'>
                   
                <span style = 'color:#000'>Note this MM Id </span>
                <h1 style = 'color:#000'>MM id is ${mm_id}</h1>
                    
                    <a href="/">Home</a>
                </div>
            </div>
        `);
    })
});











router.get('/subject_Master',(req,res)=>{
    res.render('marks/subject_Master');
});

router.get('/subject_master_fetcAllRecord',(req,res)=>{
    
    conn.query('select * from subject_Master' , (err,result)=>{
        
        if(err){
            console.log(err);
            
        }
        res.json({success:result})
        
    })
});


router.post('/subject_master_insert_',(req,res)=>{
    
    
    const {SubjectCode , subject_name , min_marks ,max_marks} = req.body;
      
    let query = 'insert into subject_Master (subject_code,subject_name,min_marks,max_marks) values(?, ? ,? ,? )';

    conn.query(query,[SubjectCode , subject_name , min_marks , max_marks],(err,result)=>{

        if(err){
            return res.json({insertErr:err})
        }
        return res.json({success:'Insert Record succesful'})
    })
    
});


//--------------------- class_subject_add -------------------




router.get('/class_subject_add',(req,res)=>{

    conn.query('select subject_name from subject_Master',(err,result)=>{
        
        res.render('marks/class_subject_add/class_subject_add',{result});
    })
   

});


router.post('/class_Subject_Insert',(req,res)=>{


    const subject_name = req.body.subject_name;
    const class_code = req.body.class_code;
    let array = []
    
    
    let query = 'INSERT INTO class_subject (class_code, subject_code_name) VALUES ?';
    
    for(let i = 0 ; i <subject_name.length ; i++  ){

        array.push([class_code[i] , subject_name[i] ])
        
    };

    console.log(array);
    

    conn.query(query,[array],(err,result)=>{
       
        if(err){
            res.json({err})
        }
       res.json({success:'submit successful'})

    });

});


//----------------------------marks obtain section 
router.get('/marks_obtain',(req,res)=>{
   
    res.render('marks/marks_obtain/marks_obtain')
});
router.post('/mm_no_search_data', (req, res) => {
    let { mm_no } = req.body;
    
    let mm_No_searchData = 'select * from marks_master where mm_id = ?';
    
    conn.query(mm_No_searchData,[mm_no],(err,result)=>{
        // console.log(result);
        
        if(result.length > 0){
           
            //-----query 
            let studentClass =  result[0].class_code;  
            let studentDataSelect = 'select student_rollNo from student_mast where Class = ?';
            let classCodyWhichSubject = 'select * from class_subject where class_code = ?';

            conn.query(classCodyWhichSubject,[studentClass],(err,classAllsubject)=>{

    
                conn.query(studentDataSelect,[studentClass],(err,studentData)=>{


                    res.json({
                        mm_id : result[0].mm_id,
                        class : result[0].class_code,
                        subject_code_name : classAllsubject,
                        studentRollNo :studentData 
                    });   
                    
                })

            })

            
        }else{
           
            res.json({mm_no_mismatch:'Envalid MM Number'})
            
        }
        
    })



    // conn.query(mm_noIsExistOrnot,[mm_no],(err,result)=>{
    //     if(result.length > 0){
            
    //         conn.query(query1, [class_code], (err1, result1) => {
    //             if (err1) {
    //                 return res.status(500).json({ error: 'Database error', details: err1 });
    //             }
                
    //             conn.query(query2, [class_code], (err2, result2) => {
    //                 if (err2) {
    //                     return res.status(500).json({ error: 'Database error', details: err2 });
    //                 }
                    
    //                 res.json({
    //                     mm_no: mm_no,
    //                     class_code:class_code,
    //                     student_data: result1,
    //                     subject_data: result2
    //                 });
    //             });
    //         });
            
    //     }else{
            
    //         return res.json({ mmNOMismatch: 'MM No is mismatched' });
    //     }
    // })

    
});


router.post('/student_roll_no_Profile_acces',(req,res)=>{

   let stnRollNo = req.body.stnRollNo;
  
   let query = 'select * from student_mast where student_rollNo = ? ';
   
   conn.query(query,[stnRollNo],(err,result)=>{
    
        res.json({result:result});

   })
    
});



//  --------------------- student Mask entry -------------------------------

router.post('/studentMaskEntry',(req,res)=>{
    
   const {rollNo ,result_mm_no ,subject ,marks} = req.body;

   let array = [];
   
    let query = 'insert into marks_obtain (mm_id , roll_no , subject_code , marks) values ?';

   for (let i = 0; i < subject.length; i++) {
        array.push([result_mm_no,rollNo, subject[i] , marks[i]])
        
       
    };

    conn.query(query,[array],(err,result)=>{
        res.json({
            success:'Record Insert Success'
        })
    })
      
 
})


module.exports = router