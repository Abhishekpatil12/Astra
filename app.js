const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"));

const { db, ref, get } = require('./db/db');

app.get('/data', async function (req, res) {
    const rootRef = ref(db, '/Astra');
    const data = await get(rootRef);
    res.send(data);
});

app.get('/', function(req, res){
    res.render('index.html');
})

app.listen(3000, function(){
    console.log("Server stated at 3000");
})