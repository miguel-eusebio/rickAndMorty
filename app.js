const express = require("express");
const https = require("https");

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

let characterInfo = []


app.get("/", (req, res) => {
    res.render('list');
    characterInfo.shift();
});

app.post("/", (req, res) => {
    

    const id =  req.body.characterId;
    const url = `https://rickandmortyapi.com/api/character/${id}`;


    https.get(url, response => {
        response.on("data", data => {
            const character = JSON.parse(data);
            let characterAttributes = {
                "img": character.image,
                "name": character.name,
                "status": character.status,
                "species": character.species,
                "lastLocation": character.location.name
            };

            characterInfo.push(characterAttributes);

            res.render('character', {
                "characterInfo": characterInfo
            });
        });
    });

});


app.listen(3000, () => {
    console.log("Server is runnnig on port 3000");
});
