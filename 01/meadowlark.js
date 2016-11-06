var express=require('express');
var app=express();

var fortune=require('./lib/fortune.js');

//设置handlebars视图引擎
var handlebars=require('express-handlebars')
               .create({defaultLayout:'main'});//设置了默认布局为views/layouts/main.handlebars布局
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
   


//指定程序端口，可以在启动服务器前设置环境变量覆盖端口
app.set('port',process.env.PORT||3000);

//添加路由

app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
    //res.type('text/plain');
    res.render('home');
});
app.use(express.static(__dirname+'/public'));
app.get('/about',function(req,res){
    res.render('about',{fortune:fortune.getFortune()});

})

//定制404页面
app.use(function(req,res){
    //res.type('text/plain');
    res.status(404);
    res.render('404');
});

//定制500页面
app.use(function(err,req,res,next){
    console.log(err.stack);
    //res.type('text/plain');
    res.status(500);
    res.render('500');
});




app.listen(app.get('port'),function(){
    console.log("Express started on http://localhost:"+app.get('port')+';press Ctrl-C to termine.');
});