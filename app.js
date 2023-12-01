const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"));

app.get('/', function(req, res){
    app.render('index.html');
})

app.listen(3000, function(){
    console.log("Server stated at 3000");
})