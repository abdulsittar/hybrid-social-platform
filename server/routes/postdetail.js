{
    const router = require('express').Router();
    const Post = require('../models/Post');
    const User = require('../models/User');
    const SpecialPost = require('../models/specialpost');
    const PostDislike = require('../models/PostDislike');
    const PostLike = require('../models/PostLike');
    const path = require('path');
    const fs = require('fs');
    const PostSurvey = require('../models/PostSurvey');
    const Repost = require('../models/Repost');
    const Viewpost = require('../models/Viewpost');
    const IDStorage = require('../models/IDStorage');
    //var ObjectId = require('mongodb').ObjectID;

    const Comment = require('../models/Comment');
    const Subscription = require('../models/Subscription');
    const webPush = require('web-push');
    const mongoose = require('mongoose');
    const { ObjectId } = require('mongoose').Types;
    const verifyToken = require('../middleware/verifyToken');
    const OpenAI = require("openai");
    
    require('dotenv').config();
 


// POST /api/paraphrase
router.post("/paraphrase", verifyToken, async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Paraphrase this comment: "${text}"` },
      ],
      temperature: 0.7,
    });

    const paraphrasedText = response.choices[0].message.content;
    res.status(200).json({ paraphrasedText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to paraphrase" });
  }
});



    module.exports = router;
}