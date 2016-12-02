var mongoose=require('mongoose');
var config=require('../config');
var ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.connect(config.dbUrl);
mongoose.Promise = Promise;
var PersonScheme=new mongoose.Schema({
    avatar:String,
    username:String,
    password:String,
},{collections:'user'});
var User=mongoose.model('user',PersonScheme);
exports.User=User;
var ArticleScheme=new mongoose.Schema({
    title:String,
    content:String,
    user:{type:ObjectId,ref:'user'},
    createAt:{type:String,default:new Date().toLocaleString()}
},{collections:'Article'});
var Article=mongoose.model('Article',ArticleScheme);
exports.Article=Article;