const mongoose = require('mongoose');

const PostSurvey = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    q2: { type: String, required: false,},
    q3: { type: String, required: false,},
    q4: { type: String, required: false,},
    q4b: { type: String, required: false,},
    q5: { type: String, required: false,},
    q6: { type: String, required: false,},
    q7: { type: String, required: false,},
    q8: { type: String, required: false,},
    q9: { type: String, required: false,},
    q10: { type: String, required: false,},
    q10_1: { type: String, required: false,},
    q10_2: { type: String, required: false,},
    q10_3: { type: String, required: false,},
    q11: { type: String, required: false,},
    q12: { type: String, required: false,},
    q13_1: { type: String, required: false,},
    q13_2: { type: String, required: false,},
    q13_3: { type: String, required: false,},
    q14: { type: String, required: false,},
    q15: { type: String, required: false,},
    q16: { type: String, required: false,},
    q17: { type: String, required: false,},
    prolific_code: { type: String, required: false,},
    feedback: { type: String, required: false,},
},{
  timestamps: true 
});

module.exports = mongoose.model('PostSurvey', PostSurvey);