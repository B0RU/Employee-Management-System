const express = require('express');
const router = express.Router();

router.get ('/', (req, res) => {
    res.render('departments/departmentsPage')
});

module.exports = router;