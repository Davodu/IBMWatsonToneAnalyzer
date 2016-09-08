var express = require('express');
var analyzer = require('../analyzer');
var fs = require('fs');
var syllable = require('syllable');
var wc = require('wordcount');
var prodFile = './output.json';
var router = express.Router();
var request = require('request');
var grade = require('../grade');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/analyze', function(req, res, next){
    analyzer.analyzeTone(req.body.input).then(function(result){
        var levelScore = grade.score({
          sentence: Math.max(1, req.body.input.split('.').length - 1),
          word: wc(req.body.input),
          syllable: syllable(req.body.input)
        });
        res.render('results', {
            data: {name: "Name", text: "Text", tone: result},
            scoreObj: grade.convertRawScore(levelScore)
        });
    }).catch(function(error){
            res.render('error', {
            message: error.message,
            error: error
        });
    })
});

module.exports = router;
