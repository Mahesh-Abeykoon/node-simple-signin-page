const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");     
const https = require("https");

const app = express();
const port = 5005;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+ "/signup.html")
})

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    const data = {

        'members':[
          {
            email_address:email,
            status:"subscribed",
            merge_fields:{
              FNAME:firstName,
              LNAME:lastName
            }
          }
        ],
      }
    const jasonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/21bfb2c9e9";

    const options = {
        method: "POST",
        auth: "Mahesh:92fc8f6bf3cfe7efdb91b68db470e3eb-us21"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname +"/public/html/success.html");
        } else {
            res.sendFile(__dirname +"/public/html/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    })

    request.write(jasonData);
    request.end();
    });

    app.post("/failure", function(req, res){
        res.redirect("/")
    })

app.listen(port, function(){
    console.log("Server is Running on port: "+port);
})
