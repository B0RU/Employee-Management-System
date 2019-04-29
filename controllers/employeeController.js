const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

exports.addEmployee = (req, res)  => {
    var employee = new Employee();
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.address = req.body.address;
    employee.position = req.body.position;
    employee.salary = req.body.salary; 
    employee.department = req.body.department;
    employee.save((err, doc) => {
        
        if (!err){
            res.redirect('employee/employeesList');
        }
        else {
            if (err.name == 'ValidationError') {
                validationError(err, req.body);
                res.render("employee/form", {
                    title: "ADD EMPLOYEE",
                    employee: req.body
                });
            }
            else
                console.log(err);
        }
    });
};


exports.updateEmployee = (req, res) => {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/employeesList'); }
        else {
            if (err.name == 'ValidationError') {
                validationError(err, req.body);
                res.render("employee/form", {
                    title: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log(err);
        }
    });
};


function validationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

