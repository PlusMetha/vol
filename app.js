const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const appid ="bde90b1dfab943d7198306364d8f19a9";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric"

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const object = { name: "Plus",food: "Padtai" }
      const des = weatherData.weather[0].description
      const temp = weatherData.main.temp
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(des);
      console.log(temp);
      console.log(JSON.stringify(object));
      console.log(weatherData);
        res.write("<p>  Weather is " + des + " <p>" );
        res.write("<h1> Temperture in "+ query + " is " + temp + " C. <h1>");
        res.write(" <img src= "+imageURL+" > " );
        res.send();
    });
  });
});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
