const { body } = require('express-validator');
const moment = require('moment');

let validation = [
    body('student_id').notEmpty().withMessage('Student ID is required'),
    body('class__').notEmpty().withMessage('Class is required'),
    body('attendance_date')
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('Valid Attendance Date is required')
        .custom((value) => {
            const today = moment().format('YYYY-MM-DD');
            if (value !== today) {
                throw new Error('Attendance Date must be today');
            }
            return true;
        }),
    body('status__').notEmpty().withMessage('Status is required'),
    body('narration').notEmpty().withMessage('Narration is required')
];

module.exports = validation;
