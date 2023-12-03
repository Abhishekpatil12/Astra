const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"));

const { ref, set, get } = require("firebase/database");
const db = require('./db/db');

app.get('/', async function (req, res) {
    const rootRef = ref(db, '/astras');
    const astrasData = await get(rootRef);
    const astrasArray = Object.values(astrasData.val());
    res.render('home', { astras: astrasArray });
});

app.get('/:astraid', async function(req, res){
    try {
        const keyToRetrieve = req.params.astraid.toLowerCase();
        const astraRef = ref(db, `/astras/${keyToRetrieve}`);
        const astraData = await get(astraRef);

        if (astraData.exists()) {
            const astra = astraData.val();
            res.render('astra', {astra});
        } else {
            console.log(`No data found for key: ${keyToRetrieve}`);
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.error('Error retrieving data:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/admin/insert', function(req, res){
    res.render('insert');
})

app.post('/admin/insert', function(req, res){
    const { name, counter_by, deity, used_for} = req.body;
    const id = (name.replace(" ","_")).toLowerCase();    
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