const express = require('express');
const mongoose = require('mongoose');


var Student = mongoose.model('Student',{
    firstName : {type:String},
    lastName: {type : String},
    email:{type:String}
});


module.exports = Student ;