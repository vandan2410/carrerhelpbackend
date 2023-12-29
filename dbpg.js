const {Client} = require('pg');
const express =require('express');
const cors = require('cors');
const app=express();
const session = require('express-session') ;
const cookieParser = require ('cookie-parser')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["POST","GET"],
    credentials:true
}
    
));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie :{
        secure:false,
        maxAge: 1000*60*60*24
    }
}))
const db = new Client ({
    host: 'localhost',
    user: 'postgres',
    port: 8000,
    password: 'Ch@10091968',
    database: 'postgres'
})
db.connect(); 
app.get('/home',(req,res) =>{
    if(req.session.uname){
        return res.json({valid:true,uname:req.session.uname})
    }
    else{
        return res.json({valid:false});
    }
} )
app.post('/Signin' , (req,res)=>
{
    const {username,password}=req.body;
    db.query('INSERT INTO users ( email,password) VALUES ($1, $2) RETURNING *', [ username,password],(err,result)=>{
        if(err) 
        {
            console.log(err);
            return res.status(500).json({Message:"Error in Node"});
        }
        if (result.rowCount > 0) {
            console.log(result);
            return res.status(200).json({ Message: "User inserted successfully" });

          } else {
            // The query didn't insert any rows (handle this according to your logic)
            return res.status(400).json({ Message: "Failed to insert user" });
          }
    })
})
app.post('/Login' , (req,res)=>
{
    const {username,password}=req.body;
    db.query('SELECT * FROM users WHERE email = ($1) AND password = ($2)', [ username,password],(err,result)=>{
        if(err) 
        {
            console.log(err);
            return res.status(500).json({Message:"Error in Node"});
        }
        if (result.rowCount > 0) {
            req.session.uname=username;
            
            return res.json({ login:true });

          } else {
            // The query didn't insert any rows (handle this according to your logic)
            return res.json({ login:false });
          }
    })
})

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})



// client.connect();
// db.query('Select * from users',(err,res)=>{
//     if(res)
//     {
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message);
//     }
// })