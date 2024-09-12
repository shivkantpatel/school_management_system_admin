const { body } = require('express-validator');

let validation = [

    body('fee_id').notEmpty().withMessage('Fee ID is required'),
    body('class_code').notEmpty().withMessage('Class Code is required'),
    body('tuition_fee').notEmpty().withMessage('Tuition Fee is required'),
    body('library_fee').notEmpty().withMessage('Library Fee is required'),
    body('sports_fee').notEmpty().withMessage('Sports Fee is required'),
    body('transportation_fee').notEmpty().withMessage('Transportation Fee is required'),
    body('building_fund').notEmpty().withMessage('Building Fund is required'),
    body('extra_curricular_fee').notEmpty().withMessage('Extra Curricular Fee is required'),
    body('total_fee').notEmpty().withMessage('Total Fee is required')
];

module.exports = validation;
