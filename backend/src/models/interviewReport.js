const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema({
    question:{                                                                                 
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

},{id:false})

const behaviouralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }

},{id:false})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"skill is required"]

    },
    severity:{
        type:String,
        enum:["low","med","high"],
        required:true
    }
},{
    id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    focus:{
        type:String,
        required:[true,"focus is required"]
    },
    tasks:[{
        type:String,
        required:true
    }]
},{
    id:false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:true
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behaviouralQuestions:[behaviouralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" // change if your model name is different
    },
    title:{
        type:String,
        required:[true,"job title is required"]
    }
},{
    timestamps:true
})

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;