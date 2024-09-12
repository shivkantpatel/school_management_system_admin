const { body, validationResult } = require('express-validator');
let conn = require('../connection/connection');
const validation = [

    body('Student_Roll_No').notEmpty().withMessage('Roll No is required')
    .custom((v)=>{

        return new Promise((resolve,reject)=>{
            let teachervalidation = 'select student_rollNo from student_mast where student_rollNo = ? ';

            conn.query(teachervalidation, [v], (err, result) => {
                if (err) {
                    return reject(new Error('SQL query is wrong'));
                }else if(result.length > 0){
                    return reject (new Error ('Student id already used '))
                }
                resolve(true);
            });
        })
    }),
    body('Student_Name').notEmpty().withMessage('Name is required'),
    body('Father_Name').notEmpty().withMessage('Father\'s Name is required'),
    body('Mother_Name').notEmpty().withMessage('Mother\'s Name is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('Date_OF_Birth').notEmpty().withMessage('Date of Birth is required'),
    body('Class').notEmpty().withMessage('Class is required'),
    body('Section').notEmpty().withMessage('Section is required'),
    body('Email').isEmail().withMessage('Valid Email is required'),
    body('father_mobile_no').notEmpty().withMessage('Father\'s Mobile No is required'),
    body('mother_mobile_no').notEmpty().withMessage('Mother\'s Mobile No is required'),
    body('Password').notEmpty().withMessage('Password is required'),
    body('img').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Image is empty');
        }
        return true;
    })
];



module.exports = validation
