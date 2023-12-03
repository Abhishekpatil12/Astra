const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"));

const { ref, set, get } = require("firebase/database");
const db = require('./db/db');

app.get('/data', async function (req, res) {
    const rootRef = ref(db, '/astras');
    const astrasData = await get(rootRef);
    const astrasArray = Object.values(astrasData.val());
    res.render('show', { astras: astrasArray });
});

app.get('/data/:astraname', async function(req, res){
    const keyToRetrieve = req.params.astraname.toLowerCase();
    const astraRef = ref(db, `/astras/${keyToRetrieve}`);
    const astraData = await get(astraRef);
    const astra = astraData.val();
    res.render('astra', {astra});
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/insert', function(req, res){
    res.render('insert');
})

app.post('/insert', function(req, res){
    const { name, counter_by, deity, used_for} = req.body;
    const id = name.replace(" ","_");
    set( ref(db, `/astras/${id}`) ,{ 
        name, id, counter_by, deity, used_for
    }).then(() => {
    res.send('Data Added');
    }).catch((error) => {
    console.error('Error adding data:', error);
    res.status(500).send('Failed to add data');
    });
})

app.listen(3000, function(){
    console.log("Server stated at 3000");
})