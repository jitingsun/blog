var express=require('express');
var router=express.Router();
var Article=require('../model').Article;
router.get('/',function (req, res) {
    Article.find({}).populate('user').exec(function (err, article) {
        res.render('index',{title:'首页',article});
    });
});
module.exports=router;