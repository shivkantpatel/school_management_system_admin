const express = require('express');
const router = express.Router();

router.get('/totalfee', (req, res) => {
    res.send('feeadded');
});
router.get('/totalfee1', (req, res) => {
    res.send('feeadded1');
});
router.get('/totalfee2', (req, res) => {
    res.send('feeadded2');
});

module.exports = router