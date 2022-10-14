var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express();
app.use(bodyParser.json())
app.use(express.static('public'))  //In Public directory we are keeping static html files
app.use(bodyParser.urlencoded({    //
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
useNewUrLParser:true,
useUnifiedTopology:true
});




var db=mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database "))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    var dob=req.body.dob;
    var gender=req.res.gender;
    var data={
        "name":name,
        "email":email,
        "password":password,
        "dob":dob,
        "gender":gender
    }
    db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted successfully");
    });

    return res.redirect('signup_success.html')
})




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })     //Default Route

    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000 ");