const express = require('express');

const mongoose = require('mongoose');

const employeeController = require ('../controllers/employeeController')

const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Employee = mongoose.model('Employee');


router.get('/', ensureAuthenticated,(req, res) => {
    res.render("employee/form", {
        title: "ADD EMPLOYEE"
    });
});

router.post('/', ensureAuthenticated,(req, res) => {
    if (req.body._id == ''){
        employeeController.addEmployee(req, res);
    }
        else{
        employeeController.updateEmployee(req, res);
        }
});
 
// GET REQUEST to get all employees in Company.
router.get('/employeesList', ensureAuthenticated,(req, res) => {
    Employee.find((err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                currentRoute: true
            });
        }
        else {
            console.log(err);
        }
    });
});


// GET REQUEST for Employees in Engineering Department
router.get('/engineering', ensureAuthenticated,(req, res) => {
    Employee.find({department:"Engineering"},(err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                engineeringRoute: true
            });
        }
        else {
            console.log(err);
        }
    });
});



// GET REQUEST for Employees in Manufacturing Department

router.get('/manufacture', ensureAuthenticated,(req, res) => {
    Employee.find({department: "Manufacturing"},(err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                manufactureRoute: true
            });
        }
        else {
            console.log(err);
        }
    });
});


// GET REQUEST for Employees in Research & Development Department

router.get('/research', ensureAuthenticated,(req, res) => {
    Employee.find({department:"Research & Development"},(err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                researchRoute: true
            });
        }
        else {
            console.log(err);
        }
    });
});


// GET REQUEST for Employees in IT Department

router.get('/IT', ensureAuthenticated,(req, res) => {
    Employee.find({department:"Information Technology"},(err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                itRoute:true
            });
        }
        else {
            console.log(err);
        }
    });
});


// GET REQUEST for Employees in Sales & Marketing Department

router.get('/sales', ensureAuthenticated,(req, res) => {
    Employee.find({department:"Sales & Marketing"},(err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                salesRoute:true
            });
        }
        else {
            console.log(err);
        }
    });
});


// GET REQUEST for Employees in Operations Department

router.get('/operations', ensureAuthenticated,(req, res) => {
    Employee.find( {department: "Operations"}, (err, contents) => {
        if (!err) {
            res.render("employee/employees", {
                employees: contents,
                operationsRoute:true
            });
        }
        else {
            console.log(err);
        }
    });
});


router.get('/:id', ensureAuthenticated,(req, res) => {
    Employee.findById(req.params.id, (err, content) => {
        if (!err) {
            res.render("employee/form", {
                title: "Update Employee",
                employee: content
            });
        }
    });
});

router.get('/delete/:id', ensureAuthenticated,(req, res) => {
    Employee.findOneAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            const backURL = req.header('Referer');
            res.redirect(backURL);
        }
        else { console.log(err);
         };
    });
});

module.exports = router;