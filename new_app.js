const express = require("express");
const app = express();
const request = require("request");
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
  response.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const user = req.body.username;
  const email = req.body.email;
  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : user
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/46648663b9";
  const options = {
    method : "POST",
    auth:"satyavk:003bfc936e551b6d345403fda4f57662-us5"
  };
  const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});
app.post("/failure.html",function(req,res){
  res.redirect("/");
})
app.listen(3000,function(){
  console.log("server is running on port 3000");
})

//003bfc936e551b6d345403fda4f57662-us5
// 46648663b9
//process.env.PORT||
//https://usX.api.mailchimp.com/3.0/lists/
