const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var Student = require("../models/student");



// get all the students 
router.get("/list", function (req, res, next) {
    Student.find({}, (err, result)=>{
      if(err){
        res.send(err)
      } 
      res.send(result)
    })
  });

//   get a student by id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Student.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Student :' + JSON.stringify(err, undefined, 2)); }
    });
});
// create new student
router.post("/insert", (req, res, next) => {
    const std = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };
    const student = new Student({
      firstName: std.firstName,
      lastName: std.lastName,
      email: std.email
    });
    student.save();
    res.send("student added");
  
  });

// edit a student
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var std = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    Student.findByIdAndUpdate(req.params.id, { $set: std }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Student Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
// delete a student
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Student Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports=router;