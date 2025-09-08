const PostSurvey = require('../models/PostSurvey');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb+srv://abdulsittar72:2106010991As@cluster0.gsnbbwq.mongodb.net/test?retryWrites=true&w=majority');
const { ObjectId } = require('mongodb');
const IDStorage = require('../models/IDStorage');
const PreSurvey = require('../models/PreSurvey');
const verifyToken = require('../middleware/verifyToken');
const sanitizeHtml = require('sanitize-html');
const logger = require('../logs/logger');

function sanitizeInput(input) {
    return sanitizeHtml(input, {
        allowedTags: [], // No HTML allowed
        allowedAttributes: {} // No attributes allowed
    });
}


function generateSevenDigitRandomNumber() {
    return Math.floor(1000000 + Math.random() * 9000000);
}

// Submit pre survey
router.post('/pstsurvey/:userId', verifyToken, async (req, res) => {
    logger.info('Data received', { data: req.body });
    try{
        console.log("herelkjkl");
        console.log(req.params);
        
        const existingSurvey = await PostSurvey.findOne({ userId: req.params.userId });
        if (existingSurvey) {
            return res.status(400).json({ code: existingSurvey.prolific_code, message: "User has already submitted a post-survey." });
        }
        
        //var gen_code = generateSevenDigitRandomNumber()
        
        const preSurvey = await PreSurvey.findOne({ uniqueId: req.body.uniqueId });

        if (!preSurvey) {
            return res.status(404).json({ message: "PreSurvey not found for the given userId." });
        }

        // Use prolific_Code from PreSurvey
        const gen_code = preSurvey.prolific_Code;
        
        
        const newSurvey = new PostSurvey({
            "userId": req.params.userId,
            "q1": req.body.survey.q1,
            "q2": req.body.survey.q2,
            "q3": req.body.survey.q3,
            "q4": req.body.survey.q4,
            "q4b": req.body.survey.q4b,
            "q5": req.body.survey.q5,
            "q6": req.body.survey.q6,
            "q7": req.body.survey.q7,
            "q8": req.body.survey.q8,
            "q9": req.body.survey.q9,
            "q10": req.body.survey.q10,
            "q10_1": req.body.survey.q10_1,
            "q10_2": req.body.survey.q10_2,
            "q10_3": req.body.survey.q10_3,
            "q11": req.body.survey.q11,
            "q12": req.body.survey.q12,
            "q12_1": req.body.survey.q12_1,
            "q13_1": req.body.survey.q13_1,
            "q13_2": req.body.survey.q13_2,
            "q13_3": req.body.survey.q13_3,
            "q14": req.body.survey.q14,
            "q15": req.body.survey.q15,
            "q16": sanitizeInput(req.body.survey.q16),
            "q17": req.body.survey.q17,
            "prolific_code": gen_code,
            "feedback": sanitizeInput(req.body.survey.feedback)
        });
        console.log("newSurvey");
        console.log(newSurvey)
        // save user and send response
        const survey = await newSurvey.save();
        //console.log(survey)
        res.status(200).json({ message: gen_code });
        return
    
    } catch (err) {
        logger.error('Error saving data', { error: err.message });
        console.log(err)
        res.status(500).json(err);
    }
    });
    
    module.exports = router;