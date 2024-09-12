const { body } = require('express-validator');
const moment = require('moment');

let validation =  [
    body('attendance_date')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('Valid Attendance Date is required')
    .custom((value)=>{
        const today = moment().format('YYYY-MM-DD');
       
       
        if(value != today ){
                throw new Error('Attendance Date must be today');
            }
            return true
        
    })

   
    
];




module.exports = validation;