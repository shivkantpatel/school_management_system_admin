
const express = require('express');
const { body, validationResult } = require('express-validator');


const router = express.Router();
const conn = require('../../connection/connection');

router.get('/studentFeeSubmission', (req, res) => {

  
    
    res.render('feesh/monthlyFeesubmit/student_fee_submission')

});



// ----------------------- validation chek student data or studentclass----------------------

let stnChekclassrollno = [
    body('studentrollno').notEmpty().withMessage('Roll No is required'),
    body('studentclass').notEmpty().withMessage('Class is required')
];


router.post('/studentFeeSubmit', stnChekclassrollno, (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        
        return res.json({ errors: errors.array() });
    }

    // Ensure these variables match the keys used in req.body
    const { studentrollno, studentclass ,monthlyFeeFrom , monthlyFeeTo } = req.body;
    

    let query = `
        SELECT 
            sm.student_rollNo, sm.student_name, sm.Class , sm.father_name, 
            fm.tuition_fee, fm.library_fee, fm.sports_fee, 
            fm.transportation_fee, fm.building_fund, 
            fm.extra_curricular_fee, fm.total_fee  
        FROM 
            student_mast AS sm 
        INNER JOIN 
            fee_mast AS fm 
        ON 
            fm.class_code = sm.Class 
        WHERE 
            sm.student_rollNo = ? AND sm.Class = ?
    `;

    conn.query(query, [studentrollno, studentclass], (err, result) => {
        if (err) {
            // Return error details if the query fails
            return res.json({
                error: err
            });
        }

       

        // If the query succeeds and results are found
        return res.json({
            result: result,
            monthlyFeeFrom:monthlyFeeFrom,
            monthlyFeeTo:monthlyFeeTo

        });
    });
});



let paymentOptionValidation = [
    body ('paymentMode').notEmpty().withMessage(' Payment Not Complete ')
]
router.post('/studentfeeSubmitFinal',paymentOptionValidation,(req,res)=>{
    
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        
        return res.json({ errors: errors.array() });
    }


    let now = new Date();
    let formattedDate = now.toLocaleString();
    console.log(formattedDate);
    
    const {Roll_No , stnName , Father_Name , Class ,Tuition_Fee , Library_Fee , Sports_Fee ,Transportation_Fee , Building_Fund  ,Extra_Curricular_fee ,Month_Fee , Penalty ,Total_Fee , afterPenalty  ,paymentMode  } = req.body

    let query = 'insert into monthly_fee_receipt (receipt_date , fee_id ,studentName ,Father_Name ,  class_code , tuition_fee , library_fee , sports_fee , transportation_fee , building_fund , extra_curricular_fee  , paid_by , feemonth , penalty_fee , totalfee) values (? , ? , ?, ? , ? ,? ,? ,? ,? ,?, ? ,? ,? , ? , ? )';

    let queryData = [formattedDate , Roll_No , stnName , Father_Name , Class , Tuition_Fee , Library_Fee , Sports_Fee , Transportation_Fee, Building_Fund , Extra_Curricular_fee ,paymentMode , Month_Fee , Penalty , afterPenalty ];

    conn.query(query,queryData , (err,result)=>{
        if(err){
            res.send (err);

        }

        res.json ({success : 'fee submit succesfuly'})
    })
    
})


module.exports = router