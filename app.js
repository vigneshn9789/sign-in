const express = require("express");
const request = require("request");
const bodyParser= require("body-parser");
const https = require("https");
const { status } = require("express/lib/response");
const { options } = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",function (req,res) {
   res.sendFile(__dirname + "/signup.html");
 
})

app.post("/",function (req,res) {

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    
    const data = {
        members: [
            {
            email_address : email,
            status: "subscribed" ,
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }
        ]
    };

    const jasondata= JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4627ad9f9c";
    const options = {
        method:"POST",
        auth : "vicky:4d26f569ef315db807c89f38c5ee7366-us21"
    };

   const request = https.request(url,options,function (responce) {

    if (responce.statusCode == 200 )
    {
        res.sendFile(__dirname + "/success.html")
    }else
    {
        res.sendFile(__dirname + "/failure.html")
    }
    responce.on("data",function (data) {
        console.log( JSON.parse(data) );
    });

});

app.post("/failure",function (req,res) {
    res.redirect("/");
})


request.write(jasondata);
request.end();

});

app.listen( process.env.PORT || 4000 ,function () {
    console.log("server n on 3000");
})


/* b9a2c80f827447efde19835dfe508381-us21  4d26f569ef315db807c89f38c5ee7366-us21 */
/* 4627ad9f9c  ,  4627ad9f9c. process.env.PORT ||*/