var express = require('express');
var User = require('../model').User;
var multer = require('multer');
var auth=require('../auth');
var upload = multer({dest: 'public/'});
//创建一个路由中间件的实例
var router = express.Router();
//里面可以定义很多路由
router.get('/signup',auth.checkNotLogin, function (req, res) {
    res.render('user/signup', {title: '注册'});
});
//处理用户提交的注册表单
router.post('/signup',auth.checkNotLogin, upload.single('avatar'), function (req, res) {
    var user = req.body;
    user.avatar='/'+req.file.filename;
    User.findOne({username: user.username}, function (err, article) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (article) {
                req.session.err = '用户名已被占用';
                res.redirect('back');
            } else {
                // if (data.length == 0) {
                //     res.redirect('back');
                // } else {
                User.create(user, function (err, article) {
                    if (err) {
                        req.session.err =inspect(err);
                        res.redirect('back');
                    } else {
                        req.session.success = '注册成功';
                        res.redirect('/user/signin');
                    }
                })
            }
        }
    });
});
router.get('/signin',auth.checkNotLogin, function (req, res) {
    res.render('user/signin', {title: '登录'});
});
router.post('/signin',auth.checkNotLogin, function (req, res) {
    var user = req.body;
    User.findOne(user, function (err, article) {
        if (err) {
            req.session.err = util.inspect(err);
            res.redirect('back');
        } else {
            if (article) {
                req.session.success = '登录成功';
                req.session.user = article;
                res.redirect('/');
            } else {
                req.session.err = '用户名和密码不正确';
                res.redirect('back');
            }
        }
    });
});
router.get('/signout',auth.checkLogin, function (req, res) {
    req.session.user = null;
    res.redirect('/');
});
module.exports = router;