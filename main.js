var express=require("express");
var fs=require("fs");

const app=express();
var session=require('express-session');

app.use(express.static("loginpage"));
app.use(express.json());


app.use(session({
    secret:'keyboard cat',
    saveUninitialized:true,
}))


app.get("/",function(req,res)
{

    if(req.session.isLoggedIn)
    {
        //var name=req.session.username;
        //res.end("<h1>welcome user"+ name+"</h1>")
        res.sendFile(__dirname+"/home.html");
    }
    else
    {
        res.redirect("/login.html");
    }
    //res.sendFile(__dirname+"/index.html");
    //if(req.session)
})






app.post("/login",function(req,res)
{
    var email=req.body.email;
    var password=req.body.password;
    readUsers(function(err,users)
    {
        if(err)
        {
            res.status(404);
            res.end("users not found");
        }
        else
        {
            var ourUser=users.filter(function(user)
            {
                
                 if(user.email=== email && user.password === password)
                 {
                    return true;
                 }
            })

            if(ourUser.length)
            {
                req.session.isLoggedIn=true;
                //console.log(ourUser[0].password);
                req.session.email=ourUser[0].email;
                req.session.password=ourUser[0].password;
                res.status(200);
                res.end("login success");
            }
            else
            {
                res.status(404);
                res.end("login failed");
            }
        }
    })
})


app.post("/signup",function(req,res)
{
    var username=req.body.username;
    var password=req.body.password;
    fs.readFile("./db2.txt","utf-8",function(err,data)
   {
      var todos=[];
      //console.log(data.length);
      if(data)
      {
        //console.log(data);
        todos=JSON.parse(data);
      }
      var todosSave=[];
      //todosSave.push("atul");
      //todosSave.push("athu");
      req.body.createdby=JSON.stringify(todosSave);
      todos.push(req.body);
      //req.body.createdby.push("atul");
      console.log(todos);

      fs.writeFile("./db2.txt",JSON.stringify(todos),function(err)
      {
        if(err)
        {
            res.status(404);
            res.end("login failed");
        }
        else
        {
            res.status(200);
            res.end("signup success");
        }
      })
   })
    
})



function readUsers(abc)
{
    fs.readFile("./db2.txt","utf-8",function(err,data)
    {
       
        if(err)
        {
            abc(err,null);
        }
        else
        {
            var users=JSON.parse(data);
            console.log(users);
            abc(null,users);
        }
    })
}

app.post("/save",function(req,res)
{
   fs.readFile("./db2.txt","utf-8",function(err,data)
   {
      var todos=[];
      todos=JSON.parse(data);
      
    //   console.log(todos[0]);
    //  console.log(req.session.username);
    //  console.log(req.session.password);
    //  console.log(todos[6].username);
    //  console.log(todos[6].password);

      for(var i=0;i<todos.length;i++)
      {
        //console.log(i);
        if(todos[i].email === req.session.email  && todos[i].password ===req.session.password)
        {
            
            var todosSave=JSON.parse(todos[i].createdby)
            todosSave.push(req.body);
            todos[i].createdby=JSON.stringify(todosSave);
            console.log(todos[i]);
              

        }
      }

      fs.writeFile("./db2.txt",JSON.stringify(todos),function(err)
      {
        if(err)
        {
            res.end("error occured");
        }
        else
        {
            res.end();
        }
      })
   })
})

app.get("/getdata",function(req,res)
{
    fs.readFile("./db2.txt","utf-8",function(err,data)
    {
           var todos=[];
           todos=JSON.parse(data);
           for(var i=0;i<todos.length;i++)
           {
           //console.log(i);
                if(todos[i].email === req.session.email  && todos[i].password ===req.session.password)
                {
            
                  var todosSave=todos[i].createdby
                  res.end(todosSave);
                }
           }
      
    })
})

app.post("/deletethetask",function(req,res)
{
     
     fs.readFile("./db2.txt","utf-8",function(err,data)
     {
        var todos=[];
        todos=JSON.parse(data);
        console.log(req.body.todo);
        for(var i=0;i<todos.length;i++)
        {
           //console.log(i);
                if(todos[i].email === req.session.email  && todos[i].password ===req.session.password)
                {
                  var to=[];
                  var todosSave=JSON.parse(todos[i].createdby)
                  todosSave.forEach(function(value)
                  {
                     if(value.todo===req.body.todo)
                     {
                
                     }
                     else
                     {
                      to.push(value);
                     }
                 })
                 todos[i].createdby=JSON.stringify(to);
                }
        }
        
        fs.writeFile("./db2.txt",JSON.stringify(todos),function(err)
        {
            if(err)
            {
               res.end("error occured");
             }
            else
            {
                res.end();
            }
        })
        
    })
 })

 app.post("/Editthetask",function(req,res)
{
     
     fs.readFile("./db2.txt","utf-8",function(err,data)
     {
        var todos=[];
        todos=JSON.parse(data);
        console.log(req.body.todo);
        for(var i=0;i<todos.length;i++)
        {
           //console.log(i);
                if(todos[i].email === req.session.email  && todos[i].password ===req.session.password)
                {
                  var to=[];
                  var todosSave=JSON.parse(todos[i].createdby)
                  todosSave.forEach(function(value)
                  {
                     if(value.todo===req.body.m)
                     {
                        to.push({todo:req.body.todo});
                     }
                     else
                     {
                      to.push(value);
                     }
                 })
                 //console.log
                 todos[i].createdby=JSON.stringify(to);
                }
        }
        
        fs.writeFile("./db2.txt",JSON.stringify(todos),function(err)
        {
            if(err)
            {
               res.end("error occured");
             }
            else
            {
                res.end();
            }
        })
        
    })
 })


app.get("/logout",function(req,res)
{
     req.session.destroy();
     res.status(200);
     res.end("nhi ho rha");
})

app.listen(3002,function()
{
    console.log("server is live on port 3002");
});