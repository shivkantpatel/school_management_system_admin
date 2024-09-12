

const { body } = require('express-validator');
let conn = require('../connection/connection');


let validation = [
    body('teacher_code').notEmpty().withMessage('Teacher Code is required')
    .custom((v)=>{

        return new Promise((resolve,reject)=>{
            let teachervalidation = 'select teacher_code from teachers_mast where teacher_code = ? ';

            conn.query(teachervalidation, [v], (err, result) => {
                if (err) {
                    return reject(new Error('SQL query is wrong'));
                }else if(result.length > 0){
                    return reject (new Error ('teacher id already used '))
                }
                resolve(true);
            });
        })
    }),
    body('first_name').notEmpty().withMessage('First Name is required'),
    body('last_name').notEmpty().withMessage('Last Name is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Gender is required'),
    body('qualification').notEmpty().withMessage('Qualification is required'),
    body('specialization').notEmpty().withMessage('Specialization is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('Email').isEmail().withMessage('Valid email is required'),
    body('phone_number').isMobilePhone().withMessage('Valid phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('permanent_address').notEmpty().withMessage('Permanent Address is required'),
    body('hire_date').isDate({ format: 'YYYY-MM-DD' }).withMessage('Valid Hire Date is required'),
    body('marital_status').notEmpty().withMessage('Marital Status is required'),
    body('Password').notEmpty().withMessage('PWD is required'),
    body('photo').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Image is empty');
        }
        return true;
    })
      
    
];

module.exports = validation;


